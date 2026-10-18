'use strict';
(() => {
 const C=VaultCrypto,MAIN='vermoegensaufbau-v1',KEY='vermoegensaufbau-vault-v1';
 const shell=document.getElementById('app-shell'),root=document.getElementById('security-root');
 let record=null,bytes=null,initial=null,loaded=false,queue=Promise.resolve(),busy=false,prompting=false,prepared=null,pendingCredential=null,importResolve=null,returnFocus=null;
 let lockPromise=Promise.resolve(),epoch=0,failed=0,retryAt=0,fatal=false,loadPromise=null;
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const supported=()=>!!(window.isSecureContext&&crypto?.subtle);
 const pin=(name,label)=>'<div class="field"><label for="'+name+'">'+label+'</label><input id="'+name+'" name="'+name+'" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" autocomplete="off" required placeholder="6 Ziffern"></div>';
 const passwords=()=>pin('newpin','Neue sechsstellige PIN')+pin('repeatpin','PIN wiederholen');
 function gate(on){shell.hidden=on;shell.inert=on;document.getElementById('modalroot').inert=on;document.documentElement.classList.toggle('security-gated',on)}
 function error(message){const el=document.getElementById('security-error');if(el)el.textContent=message}
 function panel(title,body,closable=false){
  returnFocus=document.activeElement;root.hidden=false;shell.inert=true;document.getElementById('modalroot').inert=true;
  root.innerHTML='<div class="security-back"><section class="security-dialog" role="dialog" aria-modal="true" aria-labelledby="security-title"><div class="security-heading"><span class="security-mark" aria-hidden="true">'+(record?'●':'◇')+'</span>'+(closable?'<button type="button" class="editbtn" data-security="close" aria-label="Schließen">✕</button>':'')+'</div><p class="eyebrow">Vermögensaufbau · Version 3.3</p><h2 id="security-title">'+title+'</h2>'+body+'<p id="security-error" class="formerror" role="alert"></p></section></div>';
  root.querySelector('input,button')?.focus();
 }
 function close(){if(Vault.locked)return;prepared?.bytes.fill(0);prepared=null;pendingCredential=null;root.innerHTML='';root.hidden=true;shell.inert=false;document.getElementById('modalroot').inert=false;returnFocus?.focus()}
 function cleanupPlain(){
  const names=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k===MAIN||k?.startsWith('vermoegensaufbau-backup-'))names.push(k)}
  for(const k of names){localStorage.removeItem(k);if(localStorage.getItem(k)!==null)throw Error('Eine alte unverschlüsselte Kopie konnte nicht entfernt werden. Bitte Sicherung exportieren und Website-Speicher prüfen.')}
 }
 function current(){const raw=localStorage.getItem(KEY);return raw?C.validate(JSON.parse(raw)):null}
 function ensureRevision(expected){if(current()?.revision!==expected)throw Error('Der Plan wurde in einem anderen Fenster geändert. Bitte diese App neu laden.')}
 function commit(next,expected){ensureRevision(expected);next={...next,revision:C.b64(C.random(16))};localStorage.setItem(KEY,JSON.stringify(next));record=next;return next}
 async function metadata(update){await queue;ensureRevision(record.revision);return commit(update,record.revision)}
 const Vault=window.Vault={
  locked:true,bootError:null,
  get protected(){return !!record},get modalOpen(){return !root.hidden},
  read(){return record?initial:localStorage.getItem(MAIN)},
  write(json){
   if(Vault.locked)return Promise.reject(Error('Die App ist gesperrt.'));
   if(!record){try{if(localStorage.getItem(KEY))throw Error('Schutz wurde in einem anderen Fenster aktiviert. Bitte neu laden.');localStorage.setItem(MAIN,json);return queue=Promise.resolve()}catch(e){return queue=Promise.reject(e)}}
   const secret=bytes?.slice();if(!secret)return Promise.reject(Error('Kein Entschlüsselungsschlüssel.'));
   const plan=JSON.parse(json);
   const task=queue.catch(()=>{}).then(async()=>{try{const data=await C.encryptPlan(secret,plan);commit({...record,data},record.revision)}finally{secret.fill(0)}});
   queue=task;return task;
  },
  async drain(){await queue},
  openSettings,
  async importFile(file){
   const data=JSON.parse(await file.text());if(data?.type!=='vermoegensaufbau-backup')return data;
   if(importResolve)throw Error('Ein Import ist bereits geöffnet.');
   panel('Sicherung entsperren','<p class="subtitle">Gib das Passwort dieser Sicherungsdatei ein. Dein aktueller Plan wird erst nach der anschließenden Bestätigung ersetzt.</p><form id="security-import"><div class="field"><label for="backup-password">Sicherungspasswort</label><input id="backup-password" name="password" type="password" autocomplete="off" required></div><button class="primary" type="submit">Sicherung öffnen</button><button class="secondary" type="button" data-security="cancel-import">Abbrechen</button></form>');
   return new Promise((resolve,reject)=>{importResolve={resolve,reject,data}});
  }
 };
 function lockScreen(message=''){
  panel('Dein Plan ist gesperrt','<p class="subtitle">Entsperre deine Planung mit deiner sechsstelligen PIN'+(record?.passkey?' oder deinem Passkey.':'.')+'</p><form id="security-unlock">'+pin('unlockpin','Deine PIN')+'<button class="primary" type="submit">Entsperren</button></form>'+(record?.passkey?'<button class="secondary security-wide" data-security="face-unlock" type="button">Mit Face ID / Passkey entsperren</button>':'')+'<button class="textbtn security-wide" data-security="recover" type="button">PIN vergessen? Wiederherstellungscode verwenden</button>');error(message);
 }
 async function loadApp(){
  if(loaded)return;if(loadPromise)return loadPromise;
  loadPromise=(async()=>{for(const file of ['model-v3.js','app.js','ui-v3.js'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='./'+file;script.onload=resolve;script.onerror=()=>reject(Error('App-Dateien konnten nicht geladen werden. Bitte Verbindung und vollständiges Update prüfen.'));document.head.appendChild(script)});loaded=true;if(Vault.bootError)throw Vault.bootError})();
  return loadPromise;
 }
 async function accept(result){
  const token=epoch;bytes=result?.bytes||null;initial=result?JSON.stringify(result.plan):null;Vault.locked=false;
  try{await loadApp();if(result)window.appVaultRestore(result.plan);if(Vault.bootError)throw Vault.bootError;await queue;if(token!==epoch||(record&&document.visibilityState==='hidden')){await lock(false,true);return}initial=null;gate(false);root.hidden=true;root.innerHTML='';document.getElementById('security-button').title=record?'App-Schutz verwalten':'App-Schutz einrichten'}
  catch(e){Vault.locked=true;bytes?.fill(0);bytes=null;initial=null;window.appVaultClear?.();gate(true);throw e}
 }
 async function lock(external=false,background=false){
  if(Vault.locked||(!record&&!external))return;
  if(!external)window.appVaultBeforeLock?.();
  if(!external&&!background){try{await queue}catch{throw Error('Die letzte Änderung ist noch nicht gespeichert. Bitte zuerst eine Sicherung exportieren.')}if(Vault.locked)return}
  Vault.locked=true;epoch++;gate(true);prepared?.bytes.fill(0);prepared=null;pendingCredential=null;
  if(importResolve){importResolve.reject(Error('App gesperrt. Import abgebrochen.'));importResolve=null}
  window.appVaultClear?.();bytes?.fill(0);bytes=null;initial=null;lockScreen('Wird gesperrt …');
  lockPromise=(async()=>{let warning='';try{await queue}catch{warning='Die letzte Änderung konnte nicht gespeichert werden. Der zuletzt gespeicherte Stand bleibt erhalten.'}try{record=current();if(record)lockScreen(warning);else panel('App neu laden','<p class="subtitle">Die Schutzeinstellungen wurden geändert. Lade die App neu, um den aktuellen Stand zu öffnen.</p><button class="primary" type="button" data-security="reload">Neu laden</button>')}catch(e){fatal=true;panel('Geschützter Plan nicht lesbar','<p class="subtitle">'+safe(e.message)+'</p>')}})();await lockPromise;
 }
 function openSettings(){
  if(Vault.locked)return;window.appVaultBeforeLock?.();
  if(!record){panel('Dein privater App-Schutz','<p class="subtitle">Mit einer sechsstelligen PIN werden deine Finanzdaten auf diesem Gerät verschlüsselt. Beim Verlassen der App wird sie automatisch gesperrt.</p><form id="security-setup">'+passwords()+'<p class="info">Bewahre den anschließend angezeigten Wiederherstellungscode getrennt von deinem Gerät auf. Eine kurze PIN bietet weniger Schutz gegen systematisches Ausprobieren als ein langes Passwort.</p><button class="primary" type="submit" '+(!supported()?'disabled':'')+'>Schutz einrichten</button></form>'+(!supported()?'<p class="formerror">Verschlüsselung benötigt einen aktuellen Browser und HTTPS.</p>':''),true);return}
  panel('App-Schutz ist aktiv','<p class="subtitle">Sechsstellige PIN · verschlüsselte Speicherung · automatische Sperre beim Verlassen.</p><div class="security-actions"><button class="primary" type="button" data-security="lock">Jetzt sperren</button><button class="secondary" type="button" data-security="change-pin">PIN ändern</button>'+(!record.passkey?'<button class="secondary" type="button" data-security="face-create">Face ID / Passkey einrichten</button>':'<p class="status">Face ID / Passkey ist verknüpft.</p><button class="secondary" type="button" data-security="face-remove">Passkey-Verknüpfung entfernen</button>')+'<button class="textbtn" type="button" data-security="disable-form">Schutz ausschalten</button></div><p class="info">Face ID ist abhängig von iOS und dem Passwortmanager. iOS kann stattdessen den Gerätecode anbieten. Deine PIN bleibt immer verfügbar. Nicht gespeicherte Formulare werden beim Sperren geschlossen.</p>',true);
 }
 function checkPins(form){const a=form.get('newpin'),b=form.get('repeatpin');if(!C.pinOK(a))throw Error('Die PIN muss aus genau sechs Ziffern bestehen.');if(a!==b)throw Error('Die beiden PIN-Eingaben stimmen nicht überein.');return a}
 function download(data,name){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000)}
 function backupPanel(){window.appVaultBeforeLock?.();panel('Deine Sicherung','<p class="subtitle">Eine verschlüsselte Sicherung schützt deinen Plan auch außerhalb der App. Sie benötigt ein eigenes Passwort mit mindestens zwölf Zeichen.</p><form id="security-export"><div class="field"><label for="exportpassword">Sicherungspasswort</label><input id="exportpassword" name="password" type="password" minlength="12" autocomplete="new-password" required></div><div class="field"><label for="exportrepeat">Passwort wiederholen</label><input id="exportrepeat" name="repeat" type="password" minlength="12" autocomplete="new-password" required></div><button class="primary" type="submit">Verschlüsselt exportieren</button></form><details><summary class="settingssummary">Unverschlüsselte JSON-Datei</summary><p class="info">Diese Datei enthält alle Finanzdaten im Klartext. Die App-PIN schützt sie nicht.</p><button type="button" class="secondary security-wide" data-security="export-plain">Unverschlüsselt exportieren</button></details>',true)}
 function assertion(credential,challenge,type){
  if(!credential)throw Error('Keine Passkey-Antwort erhalten.');
  const client=JSON.parse(new TextDecoder().decode(credential.response.clientDataJSON));
  if(client.type!==type||client.origin!==location.origin||client.challenge!==C.b64(challenge))throw Error('Ungültige Passkey-Antwort.');
  if(type==='webauthn.get'&&!(new Uint8Array(credential.response.authenticatorData)[32]&4))throw Error('Die Benutzerbestätigung fehlt.');
 }
 async function getPrf(info){
  const challenge=C.random(32);prompting=true;
  try{const credential=await navigator.credentials.get({publicKey:{challenge,rpId:location.hostname,allowCredentials:[{type:'public-key',id:C.unb64(info.id)}],userVerification:'required',extensions:{prf:{eval:{first:C.unb64(info.salt)}}},timeout:60000}});assertion(credential,challenge,'webauthn.get');if(C.b64(credential.rawId)!==info.id)throw Error('Falscher Passkey.');const prf=credential.getClientExtensionResults()?.prf?.results?.first;if(!prf)throw Error('Dieser Browser oder Passwortmanager unterstützt keine Passkey-Verschlüsselung. Bitte die PIN verwenden.');return prf}finally{prompting=false}
 }
 async function createPasskey(){
  if(!window.PublicKeyCredential||!navigator.credentials||!await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())throw Error('Auf diesem Gerät ist kein geeigneter Passkey-Authentifikator verfügbar. Die PIN funktioniert weiterhin.');
  const challenge=C.random(32),salt=C.b64(C.random(32));prompting=true;
  try{const credential=await navigator.credentials.create({publicKey:{challenge,rp:{id:location.hostname,name:'Vermögensaufbau'},user:{id:C.random(32),name:'Privater Budgetplan',displayName:'Vermögensaufbau – lokaler Plan'},pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],authenticatorSelection:{authenticatorAttachment:'platform',residentKey:'required',userVerification:'required'},attestation:'none',extensions:{prf:{}},timeout:60000}});assertion(credential,challenge,'webauthn.create');if(!credential.getClientExtensionResults()?.prf?.enabled)throw Error('Der erstellte Passkey unterstützt keine Verschlüsselung. Der App-Schutz bleibt unverändert; verwende die PIN. Ein eventuell angelegter Passkey kann in der Passwörter-App entfernt werden.');pendingCredential={id:C.b64(credential.rawId),salt};panel('Passkey bestätigen','<p class="subtitle">Bestätige deinen neuen Passkey ein zweites Mal. Erst danach wird er mit dem verschlüsselten Plan verknüpft.</p><button class="primary security-wide" type="button" data-security="face-confirm">Verknüpfung bestätigen</button><button class="textbtn security-wide" type="button" data-security="settings">Abbrechen</button>',true)}finally{prompting=false}
 }
 // Eingaben in Sicherheitsdialogen erreichen keine alten App-Ereignisse.
 for(const kind of ['click','submit','change','input','keydown'])document.addEventListener(kind,e=>{
  if(!root.contains(e.target))return;
  e.stopImmediatePropagation();
  if(kind==='keydown'){
   if(e.key==='Escape'&&!busy&&!Vault.locked&&!importResolve){close();return}
   if(e.key==='Tab'){const list=[...root.querySelectorAll('input,button,summary')].filter(x=>!x.disabled&&x.offsetParent!==null),first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
  }
  if(kind==='submit'){e.preventDefault();if(!busy)perform(()=>submit(e.target))}
  if(kind==='click'){const b=e.target.closest('button[data-security]');if(b){e.preventDefault();if(!busy)perform(()=>action(b.dataset.security))}}
 },true);
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.id==='security-button'||b.dataset.action==='export'){e.preventDefault();e.stopImmediatePropagation();if(!Vault.locked){if(b.id==='security-button')openSettings();else backupPanel()}}
 },true);
 async function perform(fn){
  busy=true;const token=epoch;root.setAttribute('aria-busy','true');root.querySelectorAll('button').forEach(b=>b.disabled=true);
  try{await fn()}catch(e){if(token===epoch)error(e.name==='NotAllowedError'?'Passkey-Vorgang abgebrochen oder nicht verfügbar. Deine PIN bleibt nutzbar.':e.name==='OperationError'?'PIN, Wiederherstellungscode oder Sicherungspasswort ist falsch – oder die Datei wurde verändert.':e.message)}
  finally{busy=false;root.removeAttribute('aria-busy');root.querySelectorAll('button').forEach(b=>b.disabled=false);if(record&&!Vault.locked&&document.visibilityState==='hidden')await lock(false,true)}
 }
 async function submit(form){
  const data=new FormData(form),token=epoch;
  if(form.id==='security-unlock'){
   if(Date.now()<retryAt)throw Error('Zu viele Versuche. Bitte in '+Math.ceil((retryAt-Date.now())/1000)+' Sekunden erneut versuchen.');
   await lockPromise;record=current();let result;try{result=await C.unlock(data.get('unlockpin'),record)}catch(e){if(++failed>=5){retryAt=Date.now()+30000;failed=0}throw e}failed=0;retryAt=0;await accept(result);return;
  }
  if(form.id==='security-setup'){
   if(window.appVaultHasError())throw Error('Bitte den vorhandenen Plan zuerst sichern oder eine gültige Sicherung importieren.');
   if(!supported())throw Error('HTTPS und Web Crypto werden benötigt.');
   const pinValue=checkPins(data);await queue;prepared=await C.create(pinValue,window.appVaultSnapshot());
   if(token!==epoch){prepared.bytes.fill(0);prepared=null;return}
   panel('Dein Wiederherstellungscode','<p class="subtitle">Speichere diesen Code sicher außerhalb der App. Er kann deinen Plan entsperren und die PIN zurücksetzen.</p><p class="recovery-code">'+prepared.recovery+'</p><p class="info">Ohne PIN, funktionierenden Passkey oder diesen Code lässt sich der geschützte Plan nicht wieder öffnen. Bereits exportierte unverschlüsselte Dateien werden durch den App-Schutz nicht nachträglich geschützt.</p><label class="switchrow"><span>Ich habe den Code sicher aufbewahrt.</span><input id="recovery-saved" type="checkbox"></label><button class="primary security-wide" type="button" data-security="activate">Schutz aktivieren</button>',true);return;
  }
  if(form.id==='security-pin-change'){
   const newPin=checkPins(data);await queue;const verified=await C.unlock(data.get('oldpin'),record);verified.bytes.fill(0);const next={...record,pin:await C.changePin(bytes,newPin)};if(token!==epoch)return;await metadata(next);openSettings();return;
  }
  if(form.id==='security-recover'){
   const newPin=checkPins(data);await lockPromise;record=current();const result=await C.recover(data.get('recovery'),record);try{const next={...record,pin:await C.changePin(result.bytes,newPin)};if(token!==epoch)return;commit(next,record.revision);await accept(result)}finally{if(Vault.locked)result.bytes.fill(0)}return;
  }
  if(form.id==='security-disable'){
   await queue;const verified=await C.unlock(data.get('oldpin'),record);verified.bytes.fill(0);if(token!==epoch)return;
   ensureRevision(record.revision);localStorage.setItem(MAIN,JSON.stringify(window.appVaultSnapshot()));try{localStorage.removeItem(KEY);if(localStorage.getItem(KEY))throw Error('Schutz konnte nicht ausgeschaltet werden.')}catch(e){localStorage.removeItem(MAIN);throw e}
   record=null;bytes?.fill(0);bytes=null;close();window.appVaultRefresh();return;
  }
  if(form.id==='security-export'){
   const password=data.get('password');if(password!==data.get('repeat'))throw Error('Die Sicherungspasswörter stimmen nicht überein.');const plan=window.appVaultSnapshot();const backup=await C.exportBackup(plan,password);if(token!==epoch)return;download(backup,'Vermoegensaufbau-geschuetzt-'+new Date().toISOString().slice(0,10)+'.json');close();return;
  }
  if(form.id==='security-import'){
   const pending=importResolve;if(!pending)return;const plan=await C.importBackup(pending.data,data.get('password'));if(token!==epoch)return;importResolve=null;close();pending.resolve(plan);
  }
 }
 async function action(name){
  if(name==='reload'){location.reload();return}
  if(name==='close'){close();return}
  if(name==='settings'){pendingCredential=null;openSettings();return}
  if(name==='activate'){
   if(!document.getElementById('recovery-saved')?.checked)throw Error('Bitte zuerst bestätigen, dass du den Wiederherstellungscode aufbewahrt hast.');
   if(!prepared)throw Error('Bitte die Einrichtung erneut starten.');await queue;
   prepared.record.data=await C.encryptPlan(prepared.bytes,window.appVaultSnapshot());commit(prepared.record,undefined);bytes=prepared.bytes;prepared=null;cleanupPlain();openSettings();window.appVaultRefresh();return;
  }
  if(name==='lock'){await lock();return}
  if(name==='recover'){panel('PIN wiederherstellen','<p class="subtitle">Mit deinem Wiederherstellungscode kannst du eine neue sechsstellige PIN setzen. Deine Planung bleibt erhalten.</p><form id="security-recover"><div class="field"><label for="recovery">Wiederherstellungscode</label><textarea id="recovery" name="recovery" rows="3" autocomplete="off" spellcheck="false" required></textarea></div>'+passwords()+'<button class="primary" type="submit">Neue PIN setzen und entsperren</button></form><button class="textbtn security-wide" type="button" data-security="back-lock">Zurück</button>');return}
  if(name==='back-lock'){lockScreen();return}
  if(name==='change-pin'){panel('PIN ändern','<form id="security-pin-change">'+pin('oldpin','Bisherige PIN')+passwords()+'<button class="primary" type="submit">Neue PIN speichern</button></form>',true);return}
  if(name==='disable-form'){panel('App-Schutz ausschalten','<p class="subtitle">Danach werden deine Finanzdaten wieder unverschlüsselt in diesem Browser gespeichert. Die Passkey-Verknüpfung wird entfernt.</p><form id="security-disable">'+pin('oldpin','Mit deiner PIN bestätigen')+'<button class="dangerbtn security-wide" type="submit">Schutz ausschalten</button></form>',true);return}
  if(name==='face-create'){await createPasskey();return}
  if(name==='face-confirm'){
   if(!pendingCredential)throw Error('Bitte den Passkey erneut einrichten.');const token=epoch,info=pendingCredential,prf=await getPrf(info);await queue;if(token!==epoch)return;const box=await C.wrapPasskey(prf,bytes);if(token!==epoch)return;await metadata({...record,passkey:{...info,box}});pendingCredential=null;openSettings();return;
  }
  if(name==='face-unlock'){await lockPromise;record=current();const token=epoch,prf=await getPrf(record.passkey),result=await C.unwrapPasskey(prf,record);if(token!==epoch){result.bytes.fill(0);return}await accept(result);return}
  if(name==='face-remove'){await queue;const next={...record};delete next.passkey;await metadata(next);openSettings();return}
  if(name==='export-plain'){download(window.appVaultSnapshot(),'Vermoegensaufbau-'+new Date().toISOString().slice(0,10)+'.json');close();return}
  if(name==='cancel-import'){const pending=importResolve;importResolve=null;close();pending?.reject(Error('Import abgebrochen.'));return}
 }
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&record&&!prompting)lock(false,true)});
 window.addEventListener('pagehide',()=>{if(record)lock(false,true)});
 window.addEventListener('pageshow',()=>{if(record&&Vault.locked&&!fatal)lockScreen()});
 window.addEventListener('storage',e=>{if(e.key===KEY){if(!Vault.locked)lock(true);else{try{record=current();if(record)lockScreen()}catch{}}}});
 // Fail closed: Ein vorhandener Tresor führt niemals zum Laden von Klartextdaten.
 (async()=>{gate(true);try{record=current();if(record){cleanupPlain();if(!supported())throw Error('Zum Entsperren wird ein aktueller Browser mit HTTPS und Web Crypto benötigt.');lockScreen()}else{panel('Dein Plan wird geladen','<p class="subtitle">Einen Moment …</p>');await accept(null)}}catch(e){fatal=true;Vault.locked=true;gate(true);panel('Plan konnte nicht geöffnet werden','<p class="subtitle">'+safe(e.message)+'</p><p class="info">Vorhandene Daten werden nicht überschrieben. Bitte vollständige Website-Dateien und Browser prüfen.</p><button class="secondary security-wide" type="button" data-security="reload">Erneut laden</button>')}})();
})();
