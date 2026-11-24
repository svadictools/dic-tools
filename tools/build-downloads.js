// Builds the DIC Downloads PDFs from the one source in docs/src/.
// Edit docs/src/*.html, then run:  node tools/build-downloads.js   (or add a name, e.g. DIC_Studio, to build one)
// GitHub also rebuilds these PDFs by itself whenever docs/src/ changes (.github/workflows/build-downloads.yml).
// Needs Playwright (npm i playwright). Output goes to docs/*.pdf.
const {chromium}=require('playwright');const path=require('path');
const root=path.resolve(__dirname,'..');
const ONLY=process.argv[2]||'';
const jobs=[
 {src:'docs/src/tour-guides.html',only:'ps',out:'docs/Print_Studio_Tour_Overview.pdf'},
 {src:'docs/src/tour-guides.html',only:'lb',out:'docs/DIC_Labs_Studios_Tour_Guide.pdf'},
 {src:'docs/src/copier-registration.html',out:'docs/Copier_Registration.pdf'},
 {src:'docs/src/dic-studio-guide.html',out:'docs/DIC_Studio_Guide.pdf'}];
(async()=>{const b=await chromium.launch();
 for(const j of jobs.filter(j=>!ONLY||j.out.includes(ONLY))){const p=await b.newPage();await p.goto('file://'+path.join(root,j.src));
  await p.evaluate(o=>{document.body.className=document.body.className||'dA';if(o){document.querySelectorAll('.guide').forEach(g=>{if(g.id!==o)g.remove();else g.classList.add('on');});}document.querySelectorAll('.top').forEach(e=>e.remove());},j.only||null);
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  await p.pdf({path:path.join(root,j.out),format:'Letter',printBackground:true,preferCSSPageSize:true});console.log('built',j.out);}
 await b.close();})();
