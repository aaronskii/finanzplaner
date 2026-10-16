'use strict';
(() => {
  const status = document.getElementById('offline-status');
  const retry = document.getElementById('offline-retry');
  const update = document.getElementById('update-button');
  let registration, ready = false, requestedUpdate = false, booting = false;
  function show() {
    status.textContent = ready
      ? (navigator.onLine ? 'Offline bereit · auch ohne Internet nutzbar' : 'Du bist offline · dein Plan funktioniert weiter')
      : (navigator.onLine ? 'Offline-Nutzung wird vorbereitet …' : 'Offline-Version noch nicht vollständig geladen. Bitte einmal online öffnen.');
  }
  function check() {
    const worker = registration?.active;
    if (!worker) return;
    const channel = new MessageChannel();
    const timer = setTimeout(() => {
      channel.port1.close();
      if (!ready) { status.textContent = 'Offline-Bereitschaft konnte nicht bestätigt werden.'; retry.classList.remove('hidden'); }
    }, 6000);
    channel.port1.onmessage = event => {
      clearTimeout(timer); channel.port1.close();
      ready = event.data?.ready === true;
      show(); retry.classList.toggle('hidden', ready);
    };
    worker.postMessage({ type: 'CHECK_OFFLINE' }, [channel.port2]);
  }
  function offerUpdate() {
    if (registration?.waiting) { update.textContent = 'Update laden'; update.classList.remove('hidden'); }
  }
  async function boot() {
    if (booting) return;
    if (!('serviceWorker' in navigator) || !window.isSecureContext || location.protocol === 'file:') {
      status.textContent = 'Offline-Funktion: diese App einmal über ihre HTTPS-Website öffnen.';
      return;
    }
    booting = true; retry.classList.add('hidden'); show();
    try {
      registration = await navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' });
      offerUpdate();
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        installing?.addEventListener('statechange', () => {
          if (installing.state === 'installed') { offerUpdate(); check(); }
          if (installing.state === 'redundant' && !ready) {
            status.textContent = 'Offline-Vorbereitung fehlgeschlagen. Bitte online erneut versuchen.';
            retry.classList.remove('hidden');
          }
        });
      });
      // Bei der ersten Installation muss Aktivierung abgewartet werden.
      navigator.serviceWorker.ready.then(reg => { registration = reg; check(); });
      check();
    } catch (error) {
      status.textContent = 'Offline-Vorbereitung nicht möglich. Prüfe Verbindung und Website-Dateien.';
      retry.classList.remove('hidden');
    } finally { booting = false; }
  }
  navigator.serviceWorker?.addEventListener('controllerchange', () => {
    if (requestedUpdate) location.reload();
    else check();
  });
  update.addEventListener('click', () => {
    if (document.querySelector('.modal')) { toast('Bitte zuerst deinen geöffneten Eintrag speichern oder schließen.'); return; }
    flushEdits();
    if (!storageOK) { toast('Bitte vor dem Update deine Eingaben exportieren.'); return; }
    if (!registration?.waiting) { location.reload(); return; }
    requestedUpdate = true;
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  });
  retry.addEventListener('click', () => { boot(); registration?.update().catch(() => {}); check(); });
  window.addEventListener('online', () => { show(); boot(); registration?.update().catch(() => {}); check(); });
  window.addEventListener('offline', show);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { check(); if (navigator.onLine) registration?.update().catch(() => {}); }
  });
  // Persistente Speicherung anfragen; eine Ablehnung beeinträchtigt die App nicht.
  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  boot();
})();
