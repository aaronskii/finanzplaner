'use strict';
/* Lokaler Tresor: zufälliger Datenschlüssel, AES-256-GCM, getrennte Schlüsselhüllen.
   Eine PIN besitzt nur 1 Mio. Möglichkeiten; PBKDF2 verzögert Offline-Angriffe,
   ersetzt aber weder Geräteschutz noch ein langes Passwort. Keine Fremdbibliotheken. */
(() => {
 const enc=new TextEncoder(),dec=new TextDecoder(),ITERATIONS=600000;
 const random=n=>crypto.getRandomValues(new Uint8Array(n));
 const b64=bytes=>{let s='';for(const b of new Uint8Array(bytes))s+=String.fromCharCode(b);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
 const unb64=s=>{if(typeof s!=='string'||!/^[A-Za-z0-9_-]+$/.test(s)||s.length>4000000)throw Error('Ungültige Verschlüsselungsdaten.');return Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0))};
 const pinOK=pin=>typeof pin==='string'&&/^\d{6}$/.test(pin);
 const recoveryCode=()=>Array.from(random(32),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase().match(/.{8}/g).join('-');
 function normalizeRecovery(code){const s=String(code).replace(/[\s-]/g,'').toUpperCase();if(!/^[A-F0-9]{64}$/.test(s))throw Error('Bitte den vollständigen Wiederherstellungscode eingeben.');return s}
 const key=bytes=>crypto.subtle.importKey('raw',bytes,{name:'AES-GCM'},false,['encrypt','decrypt']);
 async function derive(secret,salt,iterations=ITERATIONS){
  if(iterations!==ITERATIONS)throw Error('Unbekannte Schlüsselableitung.');
  if(unb64(salt).length!==16)throw Error('Ungültiger Salt.');
  const material=await crypto.subtle.importKey('raw',enc.encode(secret),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:unb64(salt),iterations},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
 }
 async function seal(k,bytes,label){const iv=random(12);return {iv:b64(iv),cipher:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode('vermoegensaufbau:'+label)},k,bytes))}}
 async function open(k,box,label){if(!box||unb64(box.iv).length!==12)throw Error('Ungültiger verschlüsselter Inhalt.');return new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(box.iv),additionalData:enc.encode('vermoegensaufbau:'+label)},k,unb64(box.cipher)))}
 async function wrap(secret,bytes,label){const salt=b64(random(16));return {salt,...await seal(await derive(secret,salt),bytes,label)}}
 async function unwrap(secret,box,label){return open(await derive(secret,box.salt),box,label)}
 function validate(record){
  if(!record||record.type!=='vermoegensaufbau-vault'||record.version!==1||record.iterations!==ITERATIONS||typeof record.revision!=='string'||!record.pin||!record.recovery||!record.data)throw Error('Der geschützte Plan ist beschädigt oder verwendet ein unbekanntes Format. Es wurde nichts überschrieben.');
  for(const box of [record.pin,record.recovery,record.data]){if(unb64(box.iv).length!==12||unb64(box.cipher).length<16)throw Error('Ungültiger verschlüsselter Plan.');}
  for(const box of [record.pin,record.recovery])if(unb64(box.salt).length!==16)throw Error('Ungültige Schlüsselhülle.');
  if(record.passkey&&(!record.passkey.id||unb64(record.passkey.salt).length!==32||unb64(record.passkey.box.iv).length!==12))throw Error('Ungültige Passkey-Verknüpfung.');
  return record;
 }
 async function encryptPlan(bytes,plan){return seal(await key(bytes),enc.encode(JSON.stringify(plan)),'plan-v1')}
 async function decryptPlan(bytes,record){validate(record);return JSON.parse(dec.decode(await open(await key(bytes),record.data,'plan-v1')))}
 async function create(pin,plan){
  if(!pinOK(pin))throw Error('Die PIN muss aus genau sechs Ziffern bestehen.');
  const bytes=random(32),recovery=recoveryCode();
  const record={type:'vermoegensaufbau-vault',version:1,iterations:ITERATIONS,revision:b64(random(16)),pin:await wrap(pin,bytes,'pin-v1'),recovery:await wrap(normalizeRecovery(recovery),bytes,'recovery-v1'),data:await encryptPlan(bytes,plan)};
  return {record,bytes,recovery};
 }
 async function unlock(pin,record){validate(record);if(!pinOK(pin))throw Error('Die PIN muss aus genau sechs Ziffern bestehen.');const bytes=await unwrap(pin,record.pin,'pin-v1');return {bytes,plan:await decryptPlan(bytes,record)}}
 async function recover(code,record){validate(record);const bytes=await unwrap(normalizeRecovery(code),record.recovery,'recovery-v1');return {bytes,plan:await decryptPlan(bytes,record)}}
 async function changePin(bytes,pin){if(!pinOK(pin))throw Error('Die PIN muss aus genau sechs Ziffern bestehen.');return wrap(pin,bytes,'pin-v1')}
 async function passkeyKey(prf){const material=await crypto.subtle.importKey('raw',prf,'HKDF',false,['deriveKey']);return crypto.subtle.deriveKey({name:'HKDF',hash:'SHA-256',salt:enc.encode('vermoegensaufbau-vault-v1'),info:enc.encode('passkey-wrap')},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
 async function wrapPasskey(prf,bytes){return seal(await passkeyKey(prf),bytes,'passkey-v1')}
 async function unwrapPasskey(prf,record){const bytes=await open(await passkeyKey(prf),record.passkey.box,'passkey-v1');return {bytes,plan:await decryptPlan(bytes,record)}}
 async function exportBackup(plan,password){if(typeof password!=='string'||password.length<12)throw Error('Das Sicherungspasswort muss mindestens zwölf Zeichen haben.');const salt=b64(random(16));return {type:'vermoegensaufbau-backup',version:1,iterations:ITERATIONS,salt,data:await seal(await derive(password,salt),enc.encode(JSON.stringify(plan)),'backup-v1')}}
 async function importBackup(record,password){if(record.type!=='vermoegensaufbau-backup'||record.version!==1||record.iterations!==ITERATIONS)throw Error('Unbekanntes Sicherungsformat.');return JSON.parse(dec.decode(await open(await derive(password,record.salt),record.data,'backup-v1')))}
 globalThis.VaultCrypto={random,b64,unb64,pinOK,normalizeRecovery,key,create,validate,unlock,recover,changePin,encryptPlan,decryptPlan,wrapPasskey,unwrapPasskey,exportBackup,importBackup};
})();
