const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const root=__dirname,port=process.env.PORT||8080,MF='modules.json';
const T={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.mjs':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8','.woff2':'font/woff2'};
function send(r,c,t,b){r.writeHead(c,{'content-type':t});r.end(b)}
http.createServer(function(q,r){
  var p;try{p=decodeURIComponent(url.parse(q.url).pathname)}catch(e){return send(r,400,'text/plain','Bad request')}
  if(p==='/api/health')return send(r,200,'application/json','{"ok":true}');
  if(p==='/api/manifest'||p==='/api/modules'){try{return send(r,200,'application/json',fs.readFileSync(path.join(root,MF)))}catch(e){return send(r,404,'application/json','{}')}}
  var f=path.join(root,p);
  if(f.indexOf(root)!==0)return send(r,403,'text/plain','Forbidden');
  fs.stat(f,function(e,s){
    if(!e&&s.isDirectory())f=path.join(f,'index.html');
    fs.readFile(f,function(e2,b){
      if(e2)return send(r,404,'text/plain','Not found');
      send(r,200,T[path.extname(f).toLowerCase()]||'application/octet-stream',b)})})
}).listen(port,function(){console.log('http://localhost:'+port)});
