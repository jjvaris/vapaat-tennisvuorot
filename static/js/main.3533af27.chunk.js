(this["webpackJsonpvapaat-tennisvuorot"]=this["webpackJsonpvapaat-tennisvuorot"]||[]).push([[0],{103:function(e,t,a){},194:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(49),l=a.n(o),i=(a(103),a(32)),u=a(64),c=(a(104),a(124)),s=a(195),m=a(96),v=a.n(m),d=a(200),p=a(203),f=a(17),h=["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"],y=function(e){var t=e.onChange,a=e.from,n=e.to,o=r.a.useState(a),l=Object(i.a)(o,2),u=l[0],c=l[1],s=r.a.useState(n),m=Object(i.a)(s,2),v=m[0],y=m[1];return r.a.useEffect((function(){t([u,v])}),[u,v,t]),r.a.createElement(d.a,{align:"center",justify:"center",w:"240px"},r.a.createElement(p.a,{size:"sm",value:u,onChange:function(e){return c(e.target.value)},iconSize:"0",w:"55px",p:"0.1rem",style:{textAlignLast:"center"}},h.slice(0,-1).filter((function(e){return e<v})).map((function(e){return r.a.createElement("option",{value:e,key:e},e)}))),r.a.createElement(f.a,{mx:"5px"},"-"),r.a.createElement(p.a,{size:"sm",value:v,onChange:function(e){return y(e.target.value)},iconSize:"0",w:"55px",p:"0.1rem",style:{textAlignLast:"center"}},h.slice(1).filter((function(e){return e>u})).map((function(e){return r.a.createElement("option",{value:e,key:e},e)}))))},E=a(204),b=a(201),g=a(202),k=a(95),w=a.n(k).a.create({timeout:5e3}),j=new URLSearchParams(window.location.search),x=j.get("start"),I=j.get("end"),O=j.get("date")&&Object(c.default)(j.get("date"));var S=function(){var e=r.a.useState(),t=Object(i.a)(e,2),a=t[0],n=t[1],o=r.a.useState(function(e){var t=new Date;return e?e<t?t:e:t}(O)),l=Object(i.a)(o,2),c=l[0],m=l[1],d=r.a.useState([x||"06:00",I||"22:00"]),p=Object(i.a)(d,2),h=Object(i.a)(p[0],2),k=h[0],j=h[1],S=p[1],C=r.a.useState([]),H=Object(i.a)(C,2),z=H[0],D=H[1];r.a.useEffect((function(){w.get("https://pelivuorot.herokuapp.com/api/available-hours").then((function(e){return n(e.data)}))}),[]),r.a.useEffect((function(){D(function(e,t){if(!e)return[];var a=e.availableHours.reduce((function(e,t){return e[t.day]?(e[t.day]=[].concat(Object(u.a)(e[t.day]),[t]),e):(e[t.day]=[t],e)}),{})[Object(s.default)(t,"yyyy-MM-dd")];if(!a)return[];var n=a.filter((function(e){return["INSIDE","INFLATED"].includes(e.courtType)&&!e.thirtyMinutes})).reduce((function(t,a){return t[a.hallId]?(t[a.hallId].availableHours=Object(u.a)(new Set([].concat(Object(u.a)(t[a.hallId].availableHours),[a.hour]))),t):(t[a.hallId]={name:e.halls.find((function(e){return e.id===a.hallId})).name,availableHours:[a.hour],link:a.link},t)}),{});return e.halls.slice().sort((function(e,t){var a=e.name.toUpperCase(),n=t.name.toUpperCase();return a<n?-1:a>n?1:0})).map((function(e){var t,a,r,o;return{name:e.name,availableHours:null!==(t=null===(a=n[e.id])||void 0===a?void 0:a.availableHours)&&void 0!==t?t:[],link:null!==(r=null===(o=n[e.id])||void 0===o?void 0:o.link)&&void 0!==r?r:e.link}}))}(a,c))}),[D,c,a]),r.a.useEffect((function(){var e;window.history.pushState("","","/vapaat-tennisvuorot/?date=".concat((e=c,Object(s.default)(e,"yyyy-MM-dd")),"&start=").concat(k,"&end=").concat(j))}),[c,k,j]);var L=r.a.useCallback((function(e){return S(e)}),[]);return r.a.createElement("div",{style:{maxWidth:"100%",padding:"10px"}},r.a.createElement(E.a,{mb:"2rem"},r.a.createElement(E.b,null),"Vapaat tennisvuorot l\xf6ytyy nyt osoitteesta"," ",r.a.createElement(b.a,{ml:"10px",href:"https://pelivuorot.com",isExternal:!0},"www.pelivuorot.com")),r.a.createElement(g.a,{mb:"2rem"},"Vapaat tennisvuorot"),r.a.createElement(v.a,{selected:c,onChange:function(e){m(e),D([])},minDate:new Date,inline:!0}),r.a.createElement(y,{onChange:L,from:k,to:j}),z.length>0?z.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement("a",{href:e.link,target:"_blank",rel:"noopener noreferrer"},r.a.createElement(g.a,{size:"sm",my:"1rem"},e.name)),e.error?r.a.createElement("h2",null,"Virhe vuorojen latauksessa."):function(e,t,a){var n=e.availableHours.filter((function(e){return parseInt(e)>=parseInt(t)&&parseInt(e)<=parseInt(a)})).map((function(t){return r.a.createElement("a",{href:e.link,key:t,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("span",{style:{display:"inline-block",margin:"5px",border:"solid",borderWidth:"1px",padding:"3px"}},t))}));return n.length>0?n:r.a.createElement(f.a,null,"Ei vapaita vuoroja.")}(e,k,j))})):r.a.createElement("div",{style:{marginTop:"20px"}},r.a.createElement("h2",null,a?"Valittu p\xe4iv\xe4m\xe4\xe4r\xe4 ylitt\xe4\xe4 kaksi viikkoa nykyhetkest\xe4, katso vapaat ajat hallien sivuilta":"Ladataan vapaita vuoroja...")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=a(60),H=a(205);l.a.render(r.a.createElement(C.a,null,r.a.createElement(H.a,null),r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},98:function(e,t,a){e.exports=a(194)}},[[98,1,2]]]);
//# sourceMappingURL=main.3533af27.chunk.js.map