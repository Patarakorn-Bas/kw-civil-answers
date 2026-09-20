const V='kw-1789922891';
const CORE=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "fonts/sarabun-latin-400-normal.woff2", "fonts/sarabun-latin-600-normal.woff2", "fonts/sarabun-latin-700-normal.woff2", "fonts/sarabun-thai-400-normal.woff2", "fonts/sarabun-thai-600-normal.woff2", "fonts/sarabun-thai-700-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(caches.open(V).then(async c=>{
    const hit=await c.match(r);
    const net=fetch(r).then(res=>{ if(res&&res.ok) c.put(r,res.clone()); return res; }).catch(()=>hit);
    return hit||net;
  }));
});
