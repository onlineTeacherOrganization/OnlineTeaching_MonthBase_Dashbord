"use strict";(self.webpackChunkdashboard=self.webpackChunkdashboard||[]).push([[429],{8583:()=>{const te=globalThis;function ee(t){return(te.__Zone_symbol_prefix||"__zone_symbol__")+t}const ke=Object.getOwnPropertyDescriptor,Ne=Object.defineProperty,Le=Object.getPrototypeOf,_t=Object.create,Et=Array.prototype.slice,Ie="addEventListener",Me="removeEventListener",Ze=ee(Ie),Ae=ee(Me),ae="true",le="false",ve=ee("");function je(t,r){return Zone.current.wrap(t,r)}function He(t,r,i,n,s){return Zone.current.scheduleMacroTask(t,r,i,n,s)}const H=ee,we=typeof window<"u",Ee=we?window:void 0,$=we&&Ee||globalThis,Tt="removeAttribute";function xe(t,r){for(let i=t.length-1;i>=0;i--)"function"==typeof t[i]&&(t[i]=je(t[i],r+"_"+i));return t}function We(t){return!t||!1!==t.writable&&!("function"==typeof t.get&&typeof t.set>"u")}const qe=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Re=!("nw"in $)&&typeof $.process<"u"&&"[object process]"===$.process.toString(),Ve=!Re&&!qe&&!(!we||!Ee.HTMLElement),Xe=typeof $.process<"u"&&"[object process]"===$.process.toString()&&!qe&&!(!we||!Ee.HTMLElement),Ce={},yt=H("enable_beforeunload"),Ye=function(t){if(!(t=t||$.event))return;let r=Ce[t.type];r||(r=Ce[t.type]=H("ON_PROPERTY"+t.type));const i=this||t.target||$,n=i[r];let s;return Ve&&i===Ee&&"error"===t.type?(s=n&&n.call(this,t.message,t.filename,t.lineno,t.colno,t.error),!0===s&&t.preventDefault()):(s=n&&n.apply(this,arguments),"beforeunload"===t.type&&$[yt]&&"string"==typeof s?t.returnValue=s:null!=s&&!s&&t.preventDefault()),s};function $e(t,r,i){let n=ke(t,r);if(!n&&i&&ke(i,r)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;const s=H("on"+r+"patched");if(t.hasOwnProperty(s)&&t[s])return;delete n.writable,delete n.value;const f=n.get,T=n.set,g=r.slice(2);let p=Ce[g];p||(p=Ce[g]=H("ON_PROPERTY"+g)),n.set=function(C){let E=this;!E&&t===$&&(E=$),E&&("function"==typeof E[p]&&E.removeEventListener(g,Ye),T&&T.call(E,null),E[p]=C,"function"==typeof C&&E.addEventListener(g,Ye,!1))},n.get=function(){let C=this;if(!C&&t===$&&(C=$),!C)return null;const E=C[p];if(E)return E;if(f){let P=f.call(this);if(P)return n.set.call(this,P),"function"==typeof C[Tt]&&C.removeAttribute(r),P}return null},Ne(t,r,n),t[s]=!0}function Je(t,r,i){if(r)for(let n=0;n<r.length;n++)$e(t,"on"+r[n],i);else{const n=[];for(const s in t)"on"==s.slice(0,2)&&n.push(s);for(let s=0;s<n.length;s++)$e(t,n[s],i)}}const re=H("originalInstance");function be(t){const r=$[t];if(!r)return;$[H(t)]=r,$[t]=function(){const s=xe(arguments,t);switch(s.length){case 0:this[re]=new r;break;case 1:this[re]=new r(s[0]);break;case 2:this[re]=new r(s[0],s[1]);break;case 3:this[re]=new r(s[0],s[1],s[2]);break;case 4:this[re]=new r(s[0],s[1],s[2],s[3]);break;default:throw new Error("Arg list too long.")}},fe($[t],r);const i=new r(function(){});let n;for(n in i)"XMLHttpRequest"===t&&"responseBlob"===n||function(s){"function"==typeof i[s]?$[t].prototype[s]=function(){return this[re][s].apply(this[re],arguments)}:Ne($[t].prototype,s,{set:function(f){"function"==typeof f?(this[re][s]=je(f,t+"."+s),fe(this[re][s],f)):this[re][s]=f},get:function(){return this[re][s]}})}(n);for(n in r)"prototype"!==n&&r.hasOwnProperty(n)&&($[t][n]=r[n])}function ue(t,r,i){let n=t;for(;n&&!n.hasOwnProperty(r);)n=Le(n);!n&&t[r]&&(n=t);const s=H(r);let f=null;if(n&&(!(f=n[s])||!n.hasOwnProperty(s))&&(f=n[s]=n[r],We(n&&ke(n,r)))){const g=i(f,s,r);n[r]=function(){return g(this,arguments)},fe(n[r],f)}return f}function mt(t,r,i){let n=null;function s(f){const T=f.data;return T.args[T.cbIdx]=function(){f.invoke.apply(this,arguments)},n.apply(T.target,T.args),f}n=ue(t,r,f=>function(T,g){const p=i(T,g);return p.cbIdx>=0&&"function"==typeof g[p.cbIdx]?He(p.name,g[p.cbIdx],p,s):f.apply(T,g)})}function fe(t,r){t[H("OriginalDelegate")]=r}let Ke=!1,Ge=!1;function kt(){if(Ke)return Ge;Ke=!0;try{const t=Ee.navigator.userAgent;(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/")||-1!==t.indexOf("Edge/"))&&(Ge=!0)}catch{}return Ge}function Qe(t){return"function"==typeof t}function et(t){return"number"==typeof t}let Te=!1;if(typeof window<"u")try{const t=Object.defineProperty({},"passive",{get:function(){Te=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{Te=!1}const vt={useG:!0},ne={},tt={},nt=new RegExp("^"+ve+"(\\w+)(true|false)$"),rt=H("propagationStopped");function ot(t,r){const i=(r?r(t):t)+le,n=(r?r(t):t)+ae,s=ve+i,f=ve+n;ne[t]={},ne[t][le]=s,ne[t][ae]=f}function bt(t,r,i,n){const s=n&&n.add||Ie,f=n&&n.rm||Me,T=n&&n.listeners||"eventListeners",g=n&&n.rmAll||"removeAllListeners",p=H(s),C="."+s+":",E="prependListener",P="."+E+":",j=function(k,h,x){if(k.isRemoved)return;const G=k.callback;let Y;"object"==typeof G&&G.handleEvent&&(k.callback=y=>G.handleEvent(y),k.originalDelegate=G);try{k.invoke(k,h,[x])}catch(y){Y=y}const F=k.options;return F&&"object"==typeof F&&F.once&&h[f].call(h,x.type,k.originalDelegate?k.originalDelegate:k.callback,F),Y};function V(k,h,x){if(!(h=h||t.event))return;const G=k||h.target||t,Y=G[ne[h.type][x?ae:le]];if(Y){const F=[];if(1===Y.length){const y=j(Y[0],G,h);y&&F.push(y)}else{const y=Y.slice();for(let W=0;W<y.length&&(!h||!0!==h[rt]);W++){const L=j(y[W],G,h);L&&F.push(L)}}if(1===F.length)throw F[0];for(let y=0;y<F.length;y++){const W=F[y];r.nativeScheduleMicroTask(()=>{throw W})}}}const z=function(k){return V(this,k,!1)},J=function(k){return V(this,k,!0)};function K(k,h){if(!k)return!1;let x=!0;h&&void 0!==h.useG&&(x=h.useG);const G=h&&h.vh;let Y=!0;h&&void 0!==h.chkDup&&(Y=h.chkDup);let F=!1;h&&void 0!==h.rt&&(F=h.rt);let y=k;for(;y&&!y.hasOwnProperty(s);)y=Le(y);if(!y&&k[s]&&(y=k),!y||y[p])return!1;const W=h&&h.eventNameToString,L={},w=y[p]=y[s],b=y[H(f)]=y[f],S=y[H(T)]=y[T],Q=y[H(g)]=y[g];let q;h&&h.prepend&&(q=y[H(h.prepend)]=y[h.prepend]);const N=x?function(o){if(!L.isExisting)return w.call(L.target,L.eventName,L.capture?J:z,L.options)}:function(o){return w.call(L.target,L.eventName,o.invoke,L.options)},D=x?function(o){if(!o.isRemoved){const u=ne[o.eventName];let v;u&&(v=u[o.capture?ae:le]);const R=v&&o.target[v];if(R)for(let m=0;m<R.length;m++)if(R[m]===o){R.splice(m,1),o.isRemoved=!0,o.removeAbortListener&&(o.removeAbortListener(),o.removeAbortListener=null),0===R.length&&(o.allRemoved=!0,o.target[v]=null);break}}if(o.allRemoved)return b.call(o.target,o.eventName,o.capture?J:z,o.options)}:function(o){return b.call(o.target,o.eventName,o.invoke,o.options)},he=h&&h.diff?h.diff:function(o,u){const v=typeof u;return"function"===v&&o.callback===u||"object"===v&&o.originalDelegate===u},oe=Zone[H("UNPATCHED_EVENTS")],ye=t[H("PASSIVE_EVENTS")],a=function(o,u,v,R,m=!1,I=!1){return function(){const Z=this||t;let A=arguments[0];h&&h.transferEventName&&(A=h.transferEventName(A));let B=arguments[1];if(!B)return o.apply(this,arguments);if(Re&&"uncaughtException"===A)return o.apply(this,arguments);let U=!1;if("function"!=typeof B){if(!B.handleEvent)return o.apply(this,arguments);U=!0}if(G&&!G(o,B,Z,arguments))return;const de=Te&&!!ye&&-1!==ye.indexOf(A),ie=function l(o){if("object"==typeof o&&null!==o){const u={...o};return o.signal&&(u.signal=o.signal),u}return o}(function M(o,u){return!Te&&"object"==typeof o&&o?!!o.capture:Te&&u?"boolean"==typeof o?{capture:o,passive:!0}:o?"object"==typeof o&&!1!==o.passive?{...o,passive:!0}:o:{passive:!0}:o}(arguments[2],de)),me=ie?.signal;if(me?.aborted)return;if(oe)for(let ce=0;ce<oe.length;ce++)if(A===oe[ce])return de?o.call(Z,A,B,ie):o.apply(this,arguments);const Be=!!ie&&("boolean"==typeof ie||ie.capture),lt=!(!ie||"object"!=typeof ie)&&ie.once,At=Zone.current;let Ue=ne[A];Ue||(ot(A,W),Ue=ne[A]);const ut=Ue[Be?ae:le];let Se,pe=Z[ut],ft=!1;if(pe){if(ft=!0,Y)for(let ce=0;ce<pe.length;ce++)if(he(pe[ce],B))return}else pe=Z[ut]=[];const ht=Z.constructor.name,dt=tt[ht];dt&&(Se=dt[A]),Se||(Se=ht+u+(W?W(A):A)),L.options=ie,lt&&(L.options.once=!1),L.target=Z,L.capture=Be,L.eventName=A,L.isExisting=ft;const Pe=x?vt:void 0;Pe&&(Pe.taskData=L),me&&(L.options.signal=void 0);const se=At.scheduleEventTask(Se,B,Pe,v,R);if(me){L.options.signal=me;const ce=()=>se.zone.cancelTask(se);o.call(me,"abort",ce,{once:!0}),se.removeAbortListener=()=>me.removeEventListener("abort",ce)}return L.target=null,Pe&&(Pe.taskData=null),lt&&(L.options.once=!0),!Te&&"boolean"==typeof se.options||(se.options=ie),se.target=Z,se.capture=Be,se.eventName=A,U&&(se.originalDelegate=B),I?pe.unshift(se):pe.push(se),m?Z:void 0}};return y[s]=a(w,C,N,D,F),q&&(y[E]=a(q,P,function(o){return q.call(L.target,L.eventName,o.invoke,L.options)},D,F,!0)),y[f]=function(){const o=this||t;let u=arguments[0];h&&h.transferEventName&&(u=h.transferEventName(u));const v=arguments[2],R=!!v&&("boolean"==typeof v||v.capture),m=arguments[1];if(!m)return b.apply(this,arguments);if(G&&!G(b,m,o,arguments))return;const I=ne[u];let Z;I&&(Z=I[R?ae:le]);const A=Z&&o[Z];if(A)for(let B=0;B<A.length;B++){const U=A[B];if(he(U,m))return A.splice(B,1),U.isRemoved=!0,0!==A.length||(U.allRemoved=!0,o[Z]=null,R||"string"!=typeof u)||(o[ve+"ON_PROPERTY"+u]=null),U.zone.cancelTask(U),F?o:void 0}return b.apply(this,arguments)},y[T]=function(){const o=this||t;let u=arguments[0];h&&h.transferEventName&&(u=h.transferEventName(u));const v=[],R=st(o,W?W(u):u);for(let m=0;m<R.length;m++){const I=R[m];v.push(I.originalDelegate?I.originalDelegate:I.callback)}return v},y[g]=function(){const o=this||t;let u=arguments[0];if(u){h&&h.transferEventName&&(u=h.transferEventName(u));const v=ne[u];if(v){const I=o[v[le]],Z=o[v[ae]];if(I){const A=I.slice();for(let B=0;B<A.length;B++){const U=A[B];this[f].call(this,u,U.originalDelegate?U.originalDelegate:U.callback,U.options)}}if(Z){const A=Z.slice();for(let B=0;B<A.length;B++){const U=A[B];this[f].call(this,u,U.originalDelegate?U.originalDelegate:U.callback,U.options)}}}}else{const v=Object.keys(o);for(let R=0;R<v.length;R++){const I=nt.exec(v[R]);let Z=I&&I[1];Z&&"removeListener"!==Z&&this[g].call(this,Z)}this[g].call(this,"removeListener")}if(F)return this},fe(y[s],w),fe(y[f],b),Q&&fe(y[g],Q),S&&fe(y[T],S),!0}let X=[];for(let k=0;k<i.length;k++)X[k]=K(i[k],n);return X}function st(t,r){if(!r){const f=[];for(let T in t){const g=nt.exec(T);let p=g&&g[1];if(p&&(!r||p===r)){const C=t[T];if(C)for(let E=0;E<C.length;E++)f.push(C[E])}}return f}let i=ne[r];i||(ot(r),i=ne[r]);const n=t[i[le]],s=t[i[ae]];return n?s?n.concat(s):n.slice():s?s.slice():[]}function Pt(t,r){const i=t.Event;i&&i.prototype&&r.patchMethod(i.prototype,"stopImmediatePropagation",n=>function(s,f){s[rt]=!0,n&&n.apply(s,f)})}const De=H("zoneTask");function ge(t,r,i,n){let s=null,f=null;i+=n;const T={};function g(C){const E=C.data;E.args[0]=function(){return C.invoke.apply(this,arguments)};const P=s.apply(t,E.args);return et(P)?E.handleId=P:(E.handle=P,E.isRefreshable=Qe(P.refresh)),C}function p(C){const{handle:E,handleId:P}=C.data;return f.call(t,E??P)}s=ue(t,r+=n,C=>function(E,P){if(Qe(P[0])){const j={isRefreshable:!1,isPeriodic:"Interval"===n,delay:"Timeout"===n||"Interval"===n?P[1]||0:void 0,args:P},V=P[0];P[0]=function(){try{return V.apply(this,arguments)}finally{const{handle:x,handleId:G,isPeriodic:Y,isRefreshable:F}=j;!Y&&!F&&(G?delete T[G]:x&&(x[De]=null))}};const z=He(r,P[0],j,g,p);if(!z)return z;const{handleId:J,handle:K,isRefreshable:X,isPeriodic:k}=z.data;if(J)T[J]=z;else if(K&&(K[De]=z,X&&!k)){const h=K.refresh;K.refresh=function(){const{zone:x,state:G}=z;return"notScheduled"===G?(z._state="scheduled",x._updateTaskCount(z,1)):"running"===G&&(z._state="scheduling"),h.call(this)}}return K??J??z}return C.apply(t,P)}),f=ue(t,i,C=>function(E,P){const j=P[0];let V;et(j)?(V=T[j],delete T[j]):(V=j?.[De],V?j[De]=null:V=j),V?.type?V.cancelFn&&V.zone.cancelTask(V):C.apply(t,P)})}function it(t,r,i){if(!i||0===i.length)return r;const n=i.filter(f=>f.target===t);if(!n||0===n.length)return r;const s=n[0].ignoreProperties;return r.filter(f=>-1===s.indexOf(f))}function ct(t,r,i,n){t&&Je(t,it(t,r,i),n)}function Fe(t){return Object.getOwnPropertyNames(t).filter(r=>r.startsWith("on")&&r.length>2).map(r=>r.substring(2))}function It(t,r,i,n,s){const f=Zone.__symbol__(n);if(r[f])return;const T=r[f]=r[n];r[n]=function(g,p,C){return p&&p.prototype&&s.forEach(function(E){const P=`${i}.${n}::`+E,j=p.prototype;try{if(j.hasOwnProperty(E)){const V=t.ObjectGetOwnPropertyDescriptor(j,E);V&&V.value?(V.value=t.wrapWithCurrentZone(V.value,P),t._redefineProperty(p.prototype,E,V)):j[E]&&(j[E]=t.wrapWithCurrentZone(j[E],P))}else j[E]&&(j[E]=t.wrapWithCurrentZone(j[E],P))}catch{}}),T.call(r,g,p,C)},t.attachOriginToPatched(r[n],T)}const at=function Oe(){const t=globalThis,r=!0===t[ee("forceDuplicateZoneCheck")];if(t.Zone&&(r||"function"!=typeof t.Zone.__symbol__))throw new Error("Zone already loaded.");return t.Zone??=function ze(){const t=te.performance;function r(M){t&&t.mark&&t.mark(M)}function i(M,_){t&&t.measure&&t.measure(M,_)}r("Zone");let n=(()=>{const _=class{static assertZonePatched(){if(te.Promise!==L.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let e=_.current;for(;e.parent;)e=e.parent;return e}static get current(){return b.zone}static get currentTask(){return S}static __load_patch(e,d,O=!1){if(L.hasOwnProperty(e)){const N=!0===te[ee("forceDuplicateZoneCheck")];if(!O&&N)throw Error("Already loaded patch: "+e)}else if(!te["__Zone_disable_"+e]){const N="Zone:"+e;r(N),L[e]=d(te,_,w),i(N,N)}}get parent(){return this._parent}get name(){return this._name}constructor(e,d){this._parent=e,this._name=d?d.name||"unnamed":"<root>",this._properties=d&&d.properties||{},this._zoneDelegate=new f(this,this._parent&&this._parent._zoneDelegate,d)}get(e){const d=this.getZoneWith(e);if(d)return d._properties[e]}getZoneWith(e){let d=this;for(;d;){if(d._properties.hasOwnProperty(e))return d;d=d._parent}return null}fork(e){if(!e)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,e)}wrap(e,d){if("function"!=typeof e)throw new Error("Expecting function got: "+e);const O=this._zoneDelegate.intercept(this,e,d),N=this;return function(){return N.runGuarded(O,this,arguments,d)}}run(e,d,O,N){b={parent:b,zone:this};try{return this._zoneDelegate.invoke(this,e,d,O,N)}finally{b=b.parent}}runGuarded(e,d=null,O,N){b={parent:b,zone:this};try{try{return this._zoneDelegate.invoke(this,e,d,O,N)}catch(D){if(this._zoneDelegate.handleError(this,D))throw D}}finally{b=b.parent}}runTask(e,d,O){if(e.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(e.zone||K).name+"; Execution: "+this.name+")");const N=e,{type:D,data:{isPeriodic:_e=!1,isRefreshable:he=!1}={}}=e;if(e.state===X&&(D===W||D===y))return;const oe=e.state!=x;oe&&N._transitionTo(x,h);const ye=S;S=N,b={parent:b,zone:this};try{D==y&&e.data&&!_e&&!he&&(e.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,N,d,O)}catch(l){if(this._zoneDelegate.handleError(this,l))throw l}}finally{const l=e.state;if(l!==X&&l!==Y)if(D==W||_e||he&&l===k)oe&&N._transitionTo(h,x,k);else{const a=N._zoneDelegates;this._updateTaskCount(N,-1),oe&&N._transitionTo(X,x,X),he&&(N._zoneDelegates=a)}b=b.parent,S=ye}}scheduleTask(e){if(e.zone&&e.zone!==this){let O=this;for(;O;){if(O===e.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);O=O.parent}}e._transitionTo(k,X);const d=[];e._zoneDelegates=d,e._zone=this;try{e=this._zoneDelegate.scheduleTask(this,e)}catch(O){throw e._transitionTo(Y,k,X),this._zoneDelegate.handleError(this,O),O}return e._zoneDelegates===d&&this._updateTaskCount(e,1),e.state==k&&e._transitionTo(h,k),e}scheduleMicroTask(e,d,O,N){return this.scheduleTask(new T(F,e,d,O,N,void 0))}scheduleMacroTask(e,d,O,N,D){return this.scheduleTask(new T(y,e,d,O,N,D))}scheduleEventTask(e,d,O,N,D){return this.scheduleTask(new T(W,e,d,O,N,D))}cancelTask(e){if(e.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(e.zone||K).name+"; Execution: "+this.name+")");if(e.state===h||e.state===x){e._transitionTo(G,h,x);try{this._zoneDelegate.cancelTask(this,e)}catch(d){throw e._transitionTo(Y,G),this._zoneDelegate.handleError(this,d),d}return this._updateTaskCount(e,-1),e._transitionTo(X,G),e.runCount=-1,e}}_updateTaskCount(e,d){const O=e._zoneDelegates;-1==d&&(e._zoneDelegates=null);for(let N=0;N<O.length;N++)O[N]._updateTaskCount(e.type,d)}};let M=_;return _.__symbol__=ee,M})();const s={name:"",onHasTask:(M,_,c,e)=>M.hasTask(c,e),onScheduleTask:(M,_,c,e)=>M.scheduleTask(c,e),onInvokeTask:(M,_,c,e,d,O)=>M.invokeTask(c,e,d,O),onCancelTask:(M,_,c,e)=>M.cancelTask(c,e)};class f{get zone(){return this._zone}constructor(_,c,e){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=_,this._parentDelegate=c,this._forkZS=e&&(e&&e.onFork?e:c._forkZS),this._forkDlgt=e&&(e.onFork?c:c._forkDlgt),this._forkCurrZone=e&&(e.onFork?this._zone:c._forkCurrZone),this._interceptZS=e&&(e.onIntercept?e:c._interceptZS),this._interceptDlgt=e&&(e.onIntercept?c:c._interceptDlgt),this._interceptCurrZone=e&&(e.onIntercept?this._zone:c._interceptCurrZone),this._invokeZS=e&&(e.onInvoke?e:c._invokeZS),this._invokeDlgt=e&&(e.onInvoke?c:c._invokeDlgt),this._invokeCurrZone=e&&(e.onInvoke?this._zone:c._invokeCurrZone),this._handleErrorZS=e&&(e.onHandleError?e:c._handleErrorZS),this._handleErrorDlgt=e&&(e.onHandleError?c:c._handleErrorDlgt),this._handleErrorCurrZone=e&&(e.onHandleError?this._zone:c._handleErrorCurrZone),this._scheduleTaskZS=e&&(e.onScheduleTask?e:c._scheduleTaskZS),this._scheduleTaskDlgt=e&&(e.onScheduleTask?c:c._scheduleTaskDlgt),this._scheduleTaskCurrZone=e&&(e.onScheduleTask?this._zone:c._scheduleTaskCurrZone),this._invokeTaskZS=e&&(e.onInvokeTask?e:c._invokeTaskZS),this._invokeTaskDlgt=e&&(e.onInvokeTask?c:c._invokeTaskDlgt),this._invokeTaskCurrZone=e&&(e.onInvokeTask?this._zone:c._invokeTaskCurrZone),this._cancelTaskZS=e&&(e.onCancelTask?e:c._cancelTaskZS),this._cancelTaskDlgt=e&&(e.onCancelTask?c:c._cancelTaskDlgt),this._cancelTaskCurrZone=e&&(e.onCancelTask?this._zone:c._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const d=e&&e.onHasTask;(d||c&&c._hasTaskZS)&&(this._hasTaskZS=d?e:s,this._hasTaskDlgt=c,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,e.onScheduleTask||(this._scheduleTaskZS=s,this._scheduleTaskDlgt=c,this._scheduleTaskCurrZone=this._zone),e.onInvokeTask||(this._invokeTaskZS=s,this._invokeTaskDlgt=c,this._invokeTaskCurrZone=this._zone),e.onCancelTask||(this._cancelTaskZS=s,this._cancelTaskDlgt=c,this._cancelTaskCurrZone=this._zone))}fork(_,c){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,_,c):new n(_,c)}intercept(_,c,e){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,_,c,e):c}invoke(_,c,e,d,O){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,_,c,e,d,O):c.apply(e,d)}handleError(_,c){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,_,c)}scheduleTask(_,c){let e=c;if(this._scheduleTaskZS)this._hasTaskZS&&e._zoneDelegates.push(this._hasTaskDlgtOwner),e=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,_,c),e||(e=c);else if(c.scheduleFn)c.scheduleFn(c);else{if(c.type!=F)throw new Error("Task is missing scheduleFn.");z(c)}return e}invokeTask(_,c,e,d){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,_,c,e,d):c.callback.apply(e,d)}cancelTask(_,c){let e;if(this._cancelTaskZS)e=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,_,c);else{if(!c.cancelFn)throw Error("Task is not cancelable");e=c.cancelFn(c)}return e}hasTask(_,c){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,_,c)}catch(e){this.handleError(_,e)}}_updateTaskCount(_,c){const e=this._taskCounts,d=e[_],O=e[_]=d+c;if(O<0)throw new Error("More tasks executed then were scheduled.");0!=d&&0!=O||this.hasTask(this._zone,{microTask:e.microTask>0,macroTask:e.macroTask>0,eventTask:e.eventTask>0,change:_})}}class T{constructor(_,c,e,d,O,N){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=_,this.source=c,this.data=d,this.scheduleFn=O,this.cancelFn=N,!e)throw new Error("callback is not defined");this.callback=e;const D=this;this.invoke=_===W&&d&&d.useG?T.invokeTask:function(){return T.invokeTask.call(te,D,this,arguments)}}static invokeTask(_,c,e){_||(_=this),Q++;try{return _.runCount++,_.zone.runTask(_,c,e)}finally{1==Q&&J(),Q--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(X,k)}_transitionTo(_,c,e){if(this._state!==c&&this._state!==e)throw new Error(`${this.type} '${this.source}': can not transition to '${_}', expecting state '${c}'${e?" or '"+e+"'":""}, was '${this._state}'.`);this._state=_,_==X&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const g=ee("setTimeout"),p=ee("Promise"),C=ee("then");let j,E=[],P=!1;function V(M){if(j||te[p]&&(j=te[p].resolve(0)),j){let _=j[C];_||(_=j.then),_.call(j,M)}else te[g](M,0)}function z(M){0===Q&&0===E.length&&V(J),M&&E.push(M)}function J(){if(!P){for(P=!0;E.length;){const M=E;E=[];for(let _=0;_<M.length;_++){const c=M[_];try{c.zone.runTask(c,null,null)}catch(e){w.onUnhandledError(e)}}}w.microtaskDrainDone(),P=!1}}const K={name:"NO ZONE"},X="notScheduled",k="scheduling",h="scheduled",x="running",G="canceling",Y="unknown",F="microTask",y="macroTask",W="eventTask",L={},w={symbol:ee,currentZoneFrame:()=>b,onUnhandledError:q,microtaskDrainDone:q,scheduleMicroTask:z,showUncaughtError:()=>!n[ee("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:q,patchMethod:()=>q,bindArguments:()=>[],patchThen:()=>q,patchMacroTask:()=>q,patchEventPrototype:()=>q,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>q,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>q,wrapWithCurrentZone:()=>q,filterProperties:()=>[],attachOriginToPatched:()=>q,_redefineProperty:()=>q,patchCallbacks:()=>q,nativeScheduleMicroTask:V};let b={parent:null,zone:new n(null,null)},S=null,Q=0;function q(){}return i("Zone","Zone"),n}(),t.Zone}();(function Zt(t){(function Nt(t){t.__load_patch("ZoneAwarePromise",(r,i,n)=>{const s=Object.getOwnPropertyDescriptor,f=Object.defineProperty,g=n.symbol,p=[],C=!1!==r[g("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],E=g("Promise"),P=g("then"),j="__creationTrace__";n.onUnhandledError=l=>{if(n.showUncaughtError()){const a=l&&l.rejection;a?console.error("Unhandled Promise rejection:",a instanceof Error?a.message:a,"; Zone:",l.zone.name,"; Task:",l.task&&l.task.source,"; Value:",a,a instanceof Error?a.stack:void 0):console.error(l)}},n.microtaskDrainDone=()=>{for(;p.length;){const l=p.shift();try{l.zone.runGuarded(()=>{throw l.throwOriginal?l.rejection:l})}catch(a){z(a)}}};const V=g("unhandledPromiseRejectionHandler");function z(l){n.onUnhandledError(l);try{const a=i[V];"function"==typeof a&&a.call(this,l)}catch{}}function J(l){return l&&l.then}function K(l){return l}function X(l){return D.reject(l)}const k=g("state"),h=g("value"),x=g("finally"),G=g("parentPromiseValue"),Y=g("parentPromiseState"),F="Promise.then",y=null,W=!0,L=!1,w=0;function b(l,a){return o=>{try{M(l,a,o)}catch(u){M(l,!1,u)}}}const S=function(){let l=!1;return function(o){return function(){l||(l=!0,o.apply(null,arguments))}}},Q="Promise resolved with itself",q=g("currentTaskTrace");function M(l,a,o){const u=S();if(l===o)throw new TypeError(Q);if(l[k]===y){let v=null;try{("object"==typeof o||"function"==typeof o)&&(v=o&&o.then)}catch(R){return u(()=>{M(l,!1,R)})(),l}if(a!==L&&o instanceof D&&o.hasOwnProperty(k)&&o.hasOwnProperty(h)&&o[k]!==y)c(o),M(l,o[k],o[h]);else if(a!==L&&"function"==typeof v)try{v.call(o,u(b(l,a)),u(b(l,!1)))}catch(R){u(()=>{M(l,!1,R)})()}else{l[k]=a;const R=l[h];if(l[h]=o,l[x]===x&&a===W&&(l[k]=l[Y],l[h]=l[G]),a===L&&o instanceof Error){const m=i.currentTask&&i.currentTask.data&&i.currentTask.data[j];m&&f(o,q,{configurable:!0,enumerable:!1,writable:!0,value:m})}for(let m=0;m<R.length;)e(l,R[m++],R[m++],R[m++],R[m++]);if(0==R.length&&a==L){l[k]=w;let m=o;try{throw new Error("Uncaught (in promise): "+function T(l){return l&&l.toString===Object.prototype.toString?(l.constructor&&l.constructor.name||"")+": "+JSON.stringify(l):l?l.toString():Object.prototype.toString.call(l)}(o)+(o&&o.stack?"\n"+o.stack:""))}catch(I){m=I}C&&(m.throwOriginal=!0),m.rejection=o,m.promise=l,m.zone=i.current,m.task=i.currentTask,p.push(m),n.scheduleMicroTask()}}}return l}const _=g("rejectionHandledHandler");function c(l){if(l[k]===w){try{const a=i[_];a&&"function"==typeof a&&a.call(this,{rejection:l[h],promise:l})}catch{}l[k]=L;for(let a=0;a<p.length;a++)l===p[a].promise&&p.splice(a,1)}}function e(l,a,o,u,v){c(l);const R=l[k],m=R?"function"==typeof u?u:K:"function"==typeof v?v:X;a.scheduleMicroTask(F,()=>{try{const I=l[h],Z=!!o&&x===o[x];Z&&(o[G]=I,o[Y]=R);const A=a.run(m,void 0,Z&&m!==X&&m!==K?[]:[I]);M(o,!0,A)}catch(I){M(o,!1,I)}},o)}const O=function(){},N=r.AggregateError;class D{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(a){return a instanceof D?a:M(new this(null),W,a)}static reject(a){return M(new this(null),L,a)}static withResolvers(){const a={};return a.promise=new D((o,u)=>{a.resolve=o,a.reject=u}),a}static any(a){if(!a||"function"!=typeof a[Symbol.iterator])return Promise.reject(new N([],"All promises were rejected"));const o=[];let u=0;try{for(let m of a)u++,o.push(D.resolve(m))}catch{return Promise.reject(new N([],"All promises were rejected"))}if(0===u)return Promise.reject(new N([],"All promises were rejected"));let v=!1;const R=[];return new D((m,I)=>{for(let Z=0;Z<o.length;Z++)o[Z].then(A=>{v||(v=!0,m(A))},A=>{R.push(A),u--,0===u&&(v=!0,I(new N(R,"All promises were rejected")))})})}static race(a){let o,u,v=new this((I,Z)=>{o=I,u=Z});function R(I){o(I)}function m(I){u(I)}for(let I of a)J(I)||(I=this.resolve(I)),I.then(R,m);return v}static all(a){return D.allWithCallback(a)}static allSettled(a){return(this&&this.prototype instanceof D?this:D).allWithCallback(a,{thenCallback:u=>({status:"fulfilled",value:u}),errorCallback:u=>({status:"rejected",reason:u})})}static allWithCallback(a,o){let u,v,R=new this((A,B)=>{u=A,v=B}),m=2,I=0;const Z=[];for(let A of a){J(A)||(A=this.resolve(A));const B=I;try{A.then(U=>{Z[B]=o?o.thenCallback(U):U,m--,0===m&&u(Z)},U=>{o?(Z[B]=o.errorCallback(U),m--,0===m&&u(Z)):v(U)})}catch(U){v(U)}m++,I++}return m-=2,0===m&&u(Z),R}constructor(a){const o=this;if(!(o instanceof D))throw new Error("Must be an instanceof Promise.");o[k]=y,o[h]=[];try{const u=S();a&&a(u(b(o,W)),u(b(o,L)))}catch(u){M(o,!1,u)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return D}then(a,o){let u=this.constructor?.[Symbol.species];(!u||"function"!=typeof u)&&(u=this.constructor||D);const v=new u(O),R=i.current;return this[k]==y?this[h].push(R,v,a,o):e(this,R,v,a,o),v}catch(a){return this.then(null,a)}finally(a){let o=this.constructor?.[Symbol.species];(!o||"function"!=typeof o)&&(o=D);const u=new o(O);u[x]=x;const v=i.current;return this[k]==y?this[h].push(v,u,a,a):e(this,v,u,a,a),u}}D.resolve=D.resolve,D.reject=D.reject,D.race=D.race,D.all=D.all;const _e=r[E]=r.Promise;r.Promise=D;const he=g("thenPatched");function oe(l){const a=l.prototype,o=s(a,"then");if(o&&(!1===o.writable||!o.configurable))return;const u=a.then;a[P]=u,l.prototype.then=function(v,R){return new D((I,Z)=>{u.call(this,I,Z)}).then(v,R)},l[he]=!0}return n.patchThen=oe,_e&&(oe(_e),ue(r,"fetch",l=>function ye(l){return function(a,o){let u=l.apply(a,o);if(u instanceof D)return u;let v=u.constructor;return v[he]||oe(v),u}}(l))),Promise[i.__symbol__("uncaughtPromiseErrors")]=p,D})})(t),function Lt(t){t.__load_patch("toString",r=>{const i=Function.prototype.toString,n=H("OriginalDelegate"),s=H("Promise"),f=H("Error"),T=function(){if("function"==typeof this){const E=this[n];if(E)return"function"==typeof E?i.call(E):Object.prototype.toString.call(E);if(this===Promise){const P=r[s];if(P)return i.call(P)}if(this===Error){const P=r[f];if(P)return i.call(P)}}return i.call(this)};T[n]=i,Function.prototype.toString=T;const g=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":g.call(this)}})}(t),function Mt(t){t.__load_patch("util",(r,i,n)=>{const s=Fe(r);n.patchOnProperties=Je,n.patchMethod=ue,n.bindArguments=xe,n.patchMacroTask=mt;const f=i.__symbol__("BLACK_LISTED_EVENTS"),T=i.__symbol__("UNPATCHED_EVENTS");r[T]&&(r[f]=r[T]),r[f]&&(i[f]=i[T]=r[f]),n.patchEventPrototype=Pt,n.patchEventTarget=bt,n.isIEOrEdge=kt,n.ObjectDefineProperty=Ne,n.ObjectGetOwnPropertyDescriptor=ke,n.ObjectCreate=_t,n.ArraySlice=Et,n.patchClass=be,n.wrapWithCurrentZone=je,n.filterProperties=it,n.attachOriginToPatched=fe,n._redefineProperty=Object.defineProperty,n.patchCallbacks=It,n.getGlobalObjects=()=>({globalSources:tt,zoneSymbolEventNames:ne,eventNames:s,isBrowser:Ve,isMix:Xe,isNode:Re,TRUE_STR:ae,FALSE_STR:le,ZONE_SYMBOL_PREFIX:ve,ADD_EVENT_LISTENER_STR:Ie,REMOVE_EVENT_LISTENER_STR:Me})})}(t)})(at),function Ot(t){t.__load_patch("legacy",r=>{const i=r[t.__symbol__("legacyPatch")];i&&i()}),t.__load_patch("timers",r=>{const i="set",n="clear";ge(r,i,n,"Timeout"),ge(r,i,n,"Interval"),ge(r,i,n,"Immediate")}),t.__load_patch("requestAnimationFrame",r=>{ge(r,"request","cancel","AnimationFrame"),ge(r,"mozRequest","mozCancel","AnimationFrame"),ge(r,"webkitRequest","webkitCancel","AnimationFrame")}),t.__load_patch("blocking",(r,i)=>{const n=["alert","prompt","confirm"];for(let s=0;s<n.length;s++)ue(r,n[s],(T,g,p)=>function(C,E){return i.current.run(T,r,E,p)})}),t.__load_patch("EventTarget",(r,i,n)=>{(function Dt(t,r){r.patchEventPrototype(t,r)})(r,n),function Ct(t,r){if(Zone[r.symbol("patchEventTarget")])return;const{eventNames:i,zoneSymbolEventNames:n,TRUE_STR:s,FALSE_STR:f,ZONE_SYMBOL_PREFIX:T}=r.getGlobalObjects();for(let p=0;p<i.length;p++){const C=i[p],j=T+(C+f),V=T+(C+s);n[C]={},n[C][f]=j,n[C][s]=V}const g=t.EventTarget;g&&g.prototype&&r.patchEventTarget(t,r,[g&&g.prototype])}(r,n);const s=r.XMLHttpRequestEventTarget;s&&s.prototype&&n.patchEventTarget(r,n,[s.prototype])}),t.__load_patch("MutationObserver",(r,i,n)=>{be("MutationObserver"),be("WebKitMutationObserver")}),t.__load_patch("IntersectionObserver",(r,i,n)=>{be("IntersectionObserver")}),t.__load_patch("FileReader",(r,i,n)=>{be("FileReader")}),t.__load_patch("on_property",(r,i,n)=>{!function St(t,r){if(Re&&!Xe||Zone[t.symbol("patchEvents")])return;const i=r.__Zone_ignore_on_properties;let n=[];if(Ve){const s=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);const f=function pt(){try{const t=Ee.navigator.userAgent;if(-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:s,ignoreProperties:["error"]}]:[];ct(s,Fe(s),i&&i.concat(f),Le(s))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let s=0;s<n.length;s++){const f=r[n[s]];f&&f.prototype&&ct(f.prototype,Fe(f.prototype),i)}}(n,r)}),t.__load_patch("customElements",(r,i,n)=>{!function Rt(t,r){const{isBrowser:i,isMix:n}=r.getGlobalObjects();(i||n)&&t.customElements&&"customElements"in t&&r.patchCallbacks(r,t.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"])}(r,n)}),t.__load_patch("XHR",(r,i)=>{!function C(E){const P=E.XMLHttpRequest;if(!P)return;const j=P.prototype;let z=j[Ze],J=j[Ae];if(!z){const w=E.XMLHttpRequestEventTarget;if(w){const b=w.prototype;z=b[Ze],J=b[Ae]}}const K="readystatechange",X="scheduled";function k(w){const b=w.data,S=b.target;S[T]=!1,S[p]=!1;const Q=S[f];z||(z=S[Ze],J=S[Ae]),Q&&J.call(S,K,Q);const q=S[f]=()=>{if(S.readyState===S.DONE)if(!b.aborted&&S[T]&&w.state===X){const _=S[i.__symbol__("loadfalse")];if(0!==S.status&&_&&_.length>0){const c=w.invoke;w.invoke=function(){const e=S[i.__symbol__("loadfalse")];for(let d=0;d<e.length;d++)e[d]===w&&e.splice(d,1);!b.aborted&&w.state===X&&c.call(w)},_.push(w)}else w.invoke()}else!b.aborted&&!1===S[T]&&(S[p]=!0)};return z.call(S,K,q),S[n]||(S[n]=w),W.apply(S,b.args),S[T]=!0,w}function h(){}function x(w){const b=w.data;return b.aborted=!0,L.apply(b.target,b.args)}const G=ue(j,"open",()=>function(w,b){return w[s]=0==b[2],w[g]=b[1],G.apply(w,b)}),F=H("fetchTaskAborting"),y=H("fetchTaskScheduling"),W=ue(j,"send",()=>function(w,b){if(!0===i.current[y]||w[s])return W.apply(w,b);{const S={target:w,url:w[g],isPeriodic:!1,args:b,aborted:!1},Q=He("XMLHttpRequest.send",h,S,k,x);w&&!0===w[p]&&!S.aborted&&Q.state===X&&Q.invoke()}}),L=ue(j,"abort",()=>function(w,b){const S=function V(w){return w[n]}(w);if(S&&"string"==typeof S.type){if(null==S.cancelFn||S.data&&S.data.aborted)return;S.zone.cancelTask(S)}else if(!0===i.current[F])return L.apply(w,b)})}(r);const n=H("xhrTask"),s=H("xhrSync"),f=H("xhrListener"),T=H("xhrScheduled"),g=H("xhrURL"),p=H("xhrErrorBeforeScheduled")}),t.__load_patch("geolocation",r=>{r.navigator&&r.navigator.geolocation&&function gt(t,r){const i=t.constructor.name;for(let n=0;n<r.length;n++){const s=r[n],f=t[s];if(f){if(!We(ke(t,s)))continue;t[s]=(g=>{const p=function(){return g.apply(this,xe(arguments,i+"."+s))};return fe(p,g),p})(f)}}}(r.navigator.geolocation,["getCurrentPosition","watchPosition"])}),t.__load_patch("PromiseRejectionEvent",(r,i)=>{function n(s){return function(f){st(r,s).forEach(g=>{const p=r.PromiseRejectionEvent;if(p){const C=new p(s,{promise:f.promise,reason:f.rejection});g.invoke(C)}})}}r.PromiseRejectionEvent&&(i[H("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),i[H("rejectionHandledHandler")]=n("rejectionhandled"))}),t.__load_patch("queueMicrotask",(r,i,n)=>{!function wt(t,r){r.patchMethod(t,"queueMicrotask",i=>function(n,s){Zone.current.scheduleMicroTask("queueMicrotask",s[0])})}(r,n)})}(at)}},te=>{te(te.s=8583)}]);