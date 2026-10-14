import sys,os
out=sys.argv[1]
T={'booking':'Workshop Booking','classroom':'Classroom Lookup','schedule':'Student Worker Schedule','calculator':'Print Studio Calculator','pricechart':'Price Chart','consumables':'Consumables','dashboard':'Workshop Dashboard'}
for n,t in T.items():
    os.makedirs(os.path.join(out,n),exist_ok=True)
    html=('<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'
      '<title>'+t+' | DIC Tools &amp; Resources</title>'
      '<style>html,body{margin:0;background:#fff}</style></head><body>'
      '<script>(function(){var P="'+n+'";'
      'fetch("../index.html",{cache:"no-cache"}).then(function(r){if(!r.ok)throw 0;return r.text();}).then(function(h){'
      'h=h.replace("<head>","<head><script>window.DIC_PAGE=\\""+P+"\\";<\\/script>");'
      'document.open();document.write(h);document.close();'
      '}).catch(function(){location.replace("../");});})();</script>'
      '<noscript><p style="font-family:sans-serif;padding:24px">Please turn on JavaScript, or open <a href="../">DIC Tools &amp; Resources</a>.</p></noscript>'
      '</body></html>\n')
    open(os.path.join(out,n,'index.html'),'w').write(html)
print('done')
