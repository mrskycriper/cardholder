(function(){"use strict";self.onmessage=async g=>{const i=await(await navigator.storage.getDirectory()).getDirectoryHandle("default",{create:!0}),o=[];for await(const[l,t]of i.entries()){let s;const n=await(await t.getFileHandle("pass.json")).getFile(),c=JSON.parse(await n.text());s={id:l,objects:{pass:c},files:{}};let e;try{e=await t.getFileHandle("logo.png")}catch{}try{e=await t.getFileHandle("logo@2x.png")}catch{}try{e=await t.getFileHandle("logo@3x.png")}catch{}if(e!==void 0){const a=await e.getFile();s.files.logo=a}o.push(s)}self.postMessage(o)}})();
