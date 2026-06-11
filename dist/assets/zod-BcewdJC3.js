import{c as d}from"./index-CgndfNpO.js";import{a as f,r as v,b as m}from"./vendor-forms-6VdZX11N.js";/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],_=d("eye-off",p);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],x=d("lock",l);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],N=d("mail",k);/**
 * @license lucide-react v1.17.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]],V=d("quote",g);var E=function(s,c){for(var o={};s.length;){var r=s[0],h=r.code,t=r.message,e=r.path.join(".");if(!o[e])if("unionErrors"in r){var a=r.unionErrors[0].errors[0];o[e]={message:a.message,type:a.code}}else o[e]={message:t,type:h};if("unionErrors"in r&&r.unionErrors.forEach(function(u){return u.errors.forEach(function(y){return s.push(y)})}),c){var n=o[e].types,i=n&&n[r.code];o[e]=m(e,c,o,h,i?[].concat(i,r.message):r.message)}s.shift()}return o},q=function(s,c,o){return o===void 0&&(o={}),function(r,h,t){try{return Promise.resolve((function(e,a){try{var n=Promise.resolve(s[o.mode==="sync"?"parse":"parseAsync"](r,c)).then(function(i){return t.shouldUseNativeValidation&&f({},t),{errors:{},values:o.raw?r:i}})}catch(i){return a(i)}return n&&n.then?n.then(void 0,a):n})(0,function(e){if((function(a){return Array.isArray(a?.errors)})(e))return{values:{},errors:v(E(e.errors,!t.shouldUseNativeValidation&&t.criteriaMode==="all"),t)};throw e}))}catch(e){return Promise.reject(e)}}};export{_ as E,x as L,N as M,V as Q,q as t};
