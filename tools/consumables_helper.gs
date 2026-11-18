/**
 * DIC Consumables helper for the DIC Tools site (GitHub).
 * Keeps supply counts in the "Consumables" tab of the DIC Workshop Signups sheet.
 * Separate project: it never touches the other tabs or the booking script.
 * Only answers when the correct DIC staff password is sent.
 */
var HASH = '92f9e6ecb15fb09bd522a810ef257740c6ef851dbe37a9c70b2c25bc8ebca678';
var SHEET_ID = '1Zfzr12N-v0iZ2_1TbmP7Vpa1d31Qq7S-qEmp-ztYj8U'; // DIC Workshop Signups
var TAB = 'Consumables';
var LOG_TAB = 'Consumables Log';
var COLS = ["id", "category", "name", "subtitle", "unit", "haveNow", "wantToKeep", "reorderAt", "haveNowUpdated"];
var EDITABLE = ['haveNow', 'wantToKeep', 'reorderAt', 'haveNowUpdated'];

function doGet() {
  return out_({ ok: true, service: 'DIC Consumables' });
}

function doPost(e) {
  var res;
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!okKey_(req.key)) {
      res = { ok: false, error: 'password' };
    } else if (req.action === 'get') {
      res = { ok: true, items: read_() };
    } else if (req.action === 'save') {
      var lock = LockService.getScriptLock();
      lock.waitLock(20000);
      try { write_(req.changes || []); res = { ok: true, items: read_() }; }
      finally { lock.releaseLock(); }
    } else {
      res = { ok: false, error: 'action' };
    }
  } catch (err) {
    res = { ok: false, error: String(err) };
  }
  return out_(res);
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function okKey_(k) {
  if (!k) return false;
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(k).trim(), Utilities.Charset.UTF_8);
  var h = d.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
  return h === HASH;
}

function book_() {
  return SpreadsheetApp.openById(SHEET_ID);
}

function sheet_() {
  return book_().getSheetByName(TAB);
}

function read_() {
  var v = sheet_().getDataRange().getValues();
  var head = v.shift();
  return v.filter(function (r) { return r[0]; }).map(function (r) {
    var o = {};
    head.forEach(function (h, i) {
      var x = r[i];
      if (x === '') x = null;
      if (x instanceof Date) x = x.toISOString();
      o[h] = x;
    });
    return o;
  });
}

function write_(changes) {
  var s = sheet_();
  var v = s.getDataRange().getValues();
  var head = v[0], row = {};
  for (var i = 1; i < v.length; i++) row[v[i][0]] = i + 1;
  var log = book_().getSheetByName(LOG_TAB);
  changes.forEach(function (c) {
    var r = row[c.id];
    if (!r) return;
    EDITABLE.forEach(function (f) {
      if (!(f in c)) return;
      var col = head.indexOf(f) + 1;
      if (col < 1) return;
      var val = (c[f] === null || c[f] === undefined) ? '' : c[f];
      s.getRange(r, col).setValue(val);
    });
    if (log) log.appendRow([new Date(), c.id, c.haveNow, c.wantToKeep]);
  });
}

/** Run once from the editor: builds the Items and Log tabs with the current counts. */
function setup() {
  var ss = book_();
  var s = ss.getSheetByName(TAB) || ss.insertSheet(TAB, ss.getSheets().length);
  if (s.getLastRow() > 1) { Logger.log('Consumables tab already has data. Nothing changed.'); return; }
  var rows = [] /* item list is added privately */;
  s.getRange(1, 1, 1, COLS.length).setValues([COLS]).setFontWeight('bold');
  if (rows.length) s.getRange(2, 1, rows.length, COLS.length).setValues(rows.map(function (r) {
    return r.map(function (x) { return x === null ? '' : x; });
  }));
  s.setFrozenRows(1);
  var log = ss.getSheetByName(LOG_TAB) || ss.insertSheet(LOG_TAB, ss.getSheets().length);
  if (log.getLastRow() === 0) log.appendRow(['When', 'Item', 'Have now', 'Want to keep']);
  Logger.log('Set up ' + rows.length + ' items.');
}
