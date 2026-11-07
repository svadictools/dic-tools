// Builds the DIC Downloads PDFs from the one source in docs/src/.
// Edit docs/src/*.html, then run:  node tools/build-downloads.js
// Needs Playwright (npm i playwright). Output goes to docs/*.pdf.
const {chromium}=require('playwright');const path=require('path');
const root=path.resolve(__dirname,'..');
const jobs=[
 {src:'docs/src/tour-guides.html',only:'ps',out:'docs/Print_Studio_Tour_Overview.pdf'},
 {src:'docs/src/tour-guides.html',only:'lb',out:'docs/DIC_Labs_Studios_Tour_Guide.pdf'},
 {src:'docs/src/copier-registration.html',out:'docs/Copier_Registration.pdf'}];
(async()=>{const b=await chromium.launch();
 for(const j of jobs){const p=await b.newPage();await p.goto('file://'+path.join(root,j.src));
  await p.evaluate(o=>{document.body.className=document.body.className||'dA';if(o){document.querySelectorAll('.guide').forEach(g=>{if(g.id!==o)g.remove();else g.classList.add('on');});}document.querySelectorAll('.top').forEach(e=>e.remove());},j.only||null);
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  await p.pdf({path:path.join(root,j.out),format:'Letter',printBackground:true,preferCSSPageSize:true});console.log('built',j.out);}
 await b.close();})();
