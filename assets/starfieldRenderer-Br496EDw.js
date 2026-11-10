import{W as pe,a as ve,S as $,P as fe,b as ee,c as de,G as me,C as te,B as he,d as V,A as le,e as ge,f as be,g as xe,h as we,i as ye,V as Ce,M as ce,j as Se}from"./celestialBodies-B8i51H_M.js";import"./index-CmxQxeFt.js";function Me(f,d,a,n,u){if(!n||!u)return;const r=u/720;f.setViewOffset(n,u,-d*r,-a*r,n,u)}const Pe=`
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_PointSize = clamp(aSize * uPixelRatio * (1100.0 / -p.z), 1.0, 15.0);
  vColor = aColor;
  vAlpha = 0.65 + 0.25 * sin(uTime * 0.65 + aPhase);
}`,ze=`
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float glow = exp(-r * r * 25.0);
  float core = exp(-r * r * 230.0);
  gl_FragColor = vec4(vColor * (0.65 + core), (glow * 0.5 + core) * vAlpha);
}`,Ae=`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uDrift;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
 vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p) {
 float n=0.0, a=0.5;
 for(int i=0;i<5;i++){ n+=a*noise(p); p=mat2(1.6,1.2,-1.2,1.6)*p+12.1; a*=0.5; }
 return n;
}
void main(){
 vec2 uv = vUv + uDrift * 0.04;
 vec2 p = uv * vec2(5.0,4.0);
 float t=uTime*0.004;
 float cloud=fbm(p+vec2(fbm(p+2.3+t),fbm(p-1.5-t))*2.1);
 float detail=fbm(p*4.3+cloud*2.0);
 float river=exp(-pow((uv.y-0.24-uv.x*0.52+(cloud-0.5)*0.62)*4.8,2.0));
 float strands=pow(max(0.0,cloud*1.65-0.48),2.0)*river;
 vec3 gold=vec3(0.22,0.20,0.12), blue=vec3(0.09,0.20,0.17), violet=vec3(0.16,0.20,0.18);
 vec3 hue=mix(gold,blue,smoothstep(0.05,0.62,uv.x));
 hue=mix(hue,violet,smoothstep(0.60,1.0,uv.x));
 vec3 color=vec3(0.055,0.095,0.082)+hue*(strands*0.85+detail*river*0.09);
 float dark=fbm(p*2.0+8.1);
 color*=0.5+smoothstep(0.18,0.75,dark);
 float dust=pow(hash(floor(uv*vec2(1800.0,1400.0))),95.0)*river*detail;
 color+=vec3(0.54,0.48,0.32)*dust*0.22;
 gl_FragColor=vec4(color,1.0);
}`;function Te(f){const d=document.createElement("canvas");d.width=d.height=128;const a=d.getContext("2d");if(!a)throw new Error("Canvas texture unavailable");const n=a.createRadialGradient(64,64,0,64,64,64);if(n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.035,"rgba(255,255,255,1)"),n.addColorStop(.1,"rgba(244,240,220,.55)"),n.addColorStop(.22,"rgba(221,225,205,.10)"),n.addColorStop(.5,"rgba(208,221,201,.015)"),n.addColorStop(1,"rgba(200,220,255,0)"),a.fillStyle=n,a.fillRect(0,0,128,128),f==="flare"||f==="giant"){const r=a.createLinearGradient(0,0,128,0);r.addColorStop(0,"transparent"),r.addColorStop(.46,"rgba(255,255,255,.12)"),r.addColorStop(.5,"rgba(244,240,220,.35)"),r.addColorStop(.54,"rgba(255,255,255,.12)"),r.addColorStop(1,"transparent"),a.save(),a.translate(64,64),a.rotate(.18),a.translate(-64,-64),a.fillStyle=r,a.fillRect(0,63.3,128,1.4),a.translate(64,64),a.rotate(Math.PI/2),a.translate(-64,-64),a.fillRect(0,63.5,128,1),a.restore()}const u=new Se(d);return u.colorSpace=de,u}function Ee(f,d,a,n){const u=matchMedia("(max-width: 700px)").matches,r=u?1200:2800,o=new pe({alpha:!0,antialias:!1,powerPreference:"low-power"}),l=[()=>{o.domElement.remove(),o.dispose()}];try{let S=function(){if(!(G||!h||!g)){if(o.autoClear=!0,(U||y-ne>.2)&&(o.setRenderTarget(P),o.render(ie,p),o.setRenderTarget(null),U=!1,ne=y),o.setViewport(0,0,h,g),o.render(se,p),o.autoClear=!1,o.setViewport(0,0,h,g),_)for(const e of F)e.body.update(y,p);o.render(oe,p)}},A=function(e){if(s=0,!(G||!L||!B||!W)){if(e-z>=32){const t=z?Math.min((e-z)/1e3,.1):0;y+=t,z=e,R.uniforms.uTime.value=y,M.uniforms.uTime.value=y,S(),D++,C||(C=e),e-C>=1500&&(a({fps:Math.round(D*1e3/(e-C)),particles:r,mode:"WebGL"}),C=e,D=0)}s=requestAnimationFrame(A)}},T=function(){!s&&!G&&L&&B&&W&&(z=0,C=0,D=0,s=requestAnimationFrame(A))};o.setPixelRatio(Math.min(devicePixelRatio||1,u?1.25:1.5)),o.setClearColor(2375223,0),o.outputColorSpace=de,o.domElement.setAttribute("aria-hidden","true"),f.appendChild(o.domElement);const oe=new $,p=new fe(2*Math.atan(360/1050)*180/Math.PI,900/720,1,5e3);p.position.z=1050;const m=new me;oe.add(m);let I=14810;const i=()=>(I=1664525*I+1013904223>>>0,I/4294967296),k=new Float32Array(r*3),j=new Float32Array(r),ae=new Float32Array(r),O=new Float32Array(r*3),v=new te;for(let e=0;e<r;e++){const t=(i()-.5)*2400,c=i()<.68;k.set([t,c?t*.38+(i()-.5)*540:(i()-.5)*1800,-(i()*1500+80)],e*3),j[e]=i()<.035?5+i()*3:1.2+Math.pow(i(),3)*3.6,ae[e]=i()*Math.PI*2,v.setHSL(.53+i()*.13,i()*.28,.55+i()*.4),i()<.2&&v.set("#e8c79b"),O.set([v.r,v.g,v.b],e*3)}const X=d.filter(e=>e.star.form==="nebula");for(let e=0;e<Math.min(r*.18,X.length*150);e++){const t=X[e%X.length],c=i()*Math.PI*2,x=Math.pow(i(),1.7)*70;k.set([t.position.x+Math.cos(c)*x,-t.position.y+Math.sin(c)*x*.4,-t.position.z-8-i()*20],e*3),v.set(t.star.color),O.set([v.r*.65,v.g*.65,v.b*.65],e*3),j[e]=.8+i()*1.7}const w=new he;l.push(()=>w.dispose()),w.setAttribute("position",new V(k,3)),w.setAttribute("aSize",new V(j,1)),w.setAttribute("aPhase",new V(ae,1)),w.setAttribute("aColor",new V(O,3));const R=new ee({vertexShader:Pe,fragmentShader:ze,uniforms:{uTime:{value:0},uPixelRatio:{value:o.getPixelRatio()}},transparent:!0,depthWrite:!1,blending:le});l.push(()=>R.dispose()),m.add(new ge(w,R));const Y=new Map,re=d.map(e=>{let t=Y.get(e.star.form);if(!t){t=Te(e.star.form);const ue=t;l.push(()=>ue.dispose()),Y.set(e.star.form,t)}const c=new be({map:t,color:new te(e.star.color).lerp(new te("#d9d7be"),.36),transparent:!0,blending:le,depthWrite:!1});l.push(()=>c.dispose());const x=new xe(c);return x.position.set(e.position.x,-e.position.y,-e.position.z),m.add(x),{id:e.id,sprite:x,mat:c,size:e.star.size}}),F=d.flatMap(e=>{const t=we(e.name);return t?(l.push(()=>t.dispose()),t.group.position.set(e.position.x,-e.position.y,-e.position.z),m.add(t.group),[{id:e.id,body:t,size:e.star.size}]):[]}),ie=new $,E=new ye(2,2);l.push(()=>E.dispose());const M=new ee({vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}",fragmentShader:Ae,depthTest:!1,depthWrite:!1,uniforms:{uTime:{value:0},uDrift:{value:new Ce}}});l.push(()=>M.dispose()),ie.add(new ce(E,M));const P=new ve(640,512,{depthBuffer:!1,stencilBuffer:!1});l.push(()=>P.dispose());const se=new $,q=new ee({uniforms:{uCloud:{value:P.texture}},depthTest:!1,depthWrite:!1,transparent:!0,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:"varying vec2 vUv;uniform sampler2D uCloud;void main(){vec3 c=texture2D(uCloud,vUv).rgb;float edge=smoothstep(0.,.17,vUv.x)*smoothstep(0.,.17,1.-vUv.x)*smoothstep(0.,.15,vUv.y)*smoothstep(0.,.15,1.-vUv.y);gl_FragColor=vec4(c,edge*.34);}"});l.push(()=>q.dispose()),se.add(new ce(E,q));let U=!0,ne=-1,h=0,g=0,s=0,G=!1,L=!0,W=!0,B=!document.hidden,y=0,z=0,C=0,D=0,b={yaw:0,pitch:-.08,zoom:1,panX:0,panY:0},H,_=!0;const Z=()=>{m.rotation.set(b.pitch,-b.yaw,0,"XYZ"),m.scale.x=1,m.position.x=0,m.position.y=5,p.zoom=b.zoom,Me(p,b.panX,b.panY,h,g);for(const e of re){const t=48*e.size*(e.id===H?1.3:1);e.sprite.scale.set(t,t,1),e.mat.opacity=_&&F.some(c=>c.id===e.id)?.05:.62}for(const e of F){e.body.group.visible=_;const t=10*e.size*(e.id===H?1.2:1);e.body.group.scale.set(t,t,t)}M.uniforms.uDrift.value.set(b.yaw,b.pitch),U=!0},J=new ResizeObserver(e=>{h=e[0].contentRect.width,g=e[0].contentRect.height,p.aspect=h/g,p.updateProjectionMatrix(),Z(),o.setSize(h,g,!1),P.setSize(Math.max(1,Math.round(Math.min(h,1e3)*.7)),Math.max(1,Math.round(Math.min(g,800)*.7))),U=!0,S()});l.push(()=>J.disconnect()),J.observe(f);const K=new IntersectionObserver(e=>{L=e[0].isIntersecting,!L&&s&&(cancelAnimationFrame(s),s=0),T()});K.observe(f),l.push(()=>K.disconnect());const N=()=>{B=!document.hidden,!B&&s&&(cancelAnimationFrame(s),s=0),T()},Q=e=>{e.preventDefault(),n()};return document.addEventListener("visibilitychange",N),o.domElement.addEventListener("webglcontextlost",Q),l.push(()=>{cancelAnimationFrame(s),document.removeEventListener("visibilitychange",N),o.domElement.removeEventListener("webglcontextlost",Q)}),Z(),T(),a({fps:0,particles:r,mode:"WebGL"}),{update(e,t,c,x=!0){b=e,H=t,W=c,_=x,Z(),S(),!W&&s&&(cancelAnimationFrame(s),s=0),T()},dispose(){G=!0,cancelAnimationFrame(s),J.disconnect(),K.disconnect(),document.removeEventListener("visibilitychange",N),o.domElement.removeEventListener("webglcontextlost",Q),w.dispose(),R.dispose(),E.dispose(),M.dispose(),P.dispose(),q.dispose();for(const e of re)e.mat.dispose();for(const e of Y.values())e.dispose();for(const e of F)e.body.dispose();o.dispose(),o.domElement.remove()}}}catch(S){for(const A of l.reverse())try{A()}catch{}throw S}}export{Ee as createStarfield};
