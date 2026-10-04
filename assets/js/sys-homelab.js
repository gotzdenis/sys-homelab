/* ==========================================================================
   SYS-HOMELAB — shared script
   Loaded on every page. Every block below checks the element exists first,
   so it's safe to include on pages that don't have that widget.
   ========================================================================== */

/* ---------------- MOBILE NAV ---------------- */
(function(){
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navlinks');
  if(burger && links){
    burger.addEventListener('click', function(){
      links.classList.toggle('open');
    });
  }
  // touch-friendly dropdown toggle (desktop uses :hover, this adds tap support)
  document.querySelectorAll('.dropdown-toggle').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      btn.parentElement.classList.toggle('open');
      btn.setAttribute('aria-expanded', btn.parentElement.classList.contains('open') ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.dropdown.open').forEach(function(d){ d.classList.remove('open'); var btn=d.querySelector('.dropdown-toggle'); if(btn) btn.setAttribute('aria-expanded','false'); });
  });
})();

/* ---------------- CLOCK ---------------- */
(function(){
  var timeEl = document.getElementById('clockTime');
  var dateEl = document.getElementById('clockDate');
  if(!timeEl && !dateEl) return;
  function tick(){
    var d = new Date();
    if(timeEl) timeEl.textContent = d.toLocaleTimeString('de-DE');
    if(dateEl) dateEl.textContent = d.toLocaleDateString('de-DE');
  }
  tick();
  setInterval(tick, 1000);
})();

/* ---------------- LIVE-ISH STATS (dashboard.html) ----------------
   Purely cosmetic simulation of small fluctuations around a realistic
   idle-server baseline — this homelab is freshly installed, so values
   stay low on purpose rather than pretending services are already busy. */
(function(){
  var cpuVal = document.getElementById('cpuVal');
  var ramVal = document.getElementById('ramVal');
  var tempVal = document.getElementById('tempVal');
  if(!cpuVal && !ramVal && !tempVal) return;

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function setGauge(circleId, percent, circ){
    var el = document.getElementById(circleId);
    if(!el) return;
    var offset = circ - (percent / 100 * circ);
    el.style.strokeDashoffset = offset.toFixed(1);
  }

  function tick(){
    if(cpuVal){
      var cpu = rand(2, 7);
      cpuVal.textContent = cpu.toFixed(0) + '%';
      setGauge('gaugeCpu', cpu, 226.19);
    }
    if(ramVal){
      var ramPct = rand(4, 7);
      ramVal.textContent = (16 * ramPct / 100).toFixed(1) + ' GB';
      setGauge('gaugeRam', ramPct, 226.19);
    }
    if(tempVal){
      var t = rand(32, 37);
      tempVal.textContent = t.toFixed(0) + '°C';
    }
  }
  tick();
  setInterval(tick, 3000);
})();

/* ---------------- UPTIME COUNTER (cosmetic, ticks seconds live) ---------------- */
(function(){
  var el = document.getElementById('uptimeLive');
  if(!el) return;
  var base = 1 * 86400 + 6 * 3600 + 12 * 60; // 1 Tag, 6 Std, 12 Min baseline
  var start = Date.now();
  function fmt(totalSeconds){
    var d = Math.floor(totalSeconds / 86400);
    var h = Math.floor((totalSeconds % 86400) / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    return d + 'T ' + h + 'Std ' + m + 'Min';
  }
  function tick(){
    var elapsed = Math.floor((Date.now() - start) / 1000);
    el.textContent = fmt(base + elapsed);
  }
  tick();
  setInterval(tick, 30000);
})();

/* ---------------- ROTATING HOMELAB WISDOM (dashboard.html) ---------------- */
(function(){
  var quoteEl = document.getElementById('wisdomText');
  var sourceEl = document.getElementById('wisdomSource');
  var nextButton = document.getElementById('wisdomNext');
  if(!quoteEl || !sourceEl) return;

  var quotes = [
    'Ein stabiles System entsteht durch kleine, überprüfbare Schritte.',
    'Was du dokumentierst, musst du beim nächsten Mal nicht neu erraten.',
    'Automatisierung beginnt mit einem Ablauf, den du verstanden hast.',
    'Sicherheit wächst aus vielen guten Entscheidungen.',
    'Fehler zeigen, wo dein System noch eine Frage offenlässt.',
    'Ein Backup beruhigt erst, wenn die Wiederherstellung funktioniert.',
    'Messen statt raten — besonders bei Infrastruktur.',
    'Gute Technik darf komplex sein; ihre Bedienung sollte klar bleiben.',
    'Kleine Änderungen lassen sich leichter nachvollziehen.',
    'Ein Homelab wächst mit dem Wissen, nicht nur mit der Hardware.',
    'Ein sauberer Netzwerkplan spart Zeit, wenn es darauf ankommt.',
    'Erst verstehen, dann automatisieren.'
  ];
  var storageKey = 'sysHomelabLastWisdom';
  var storedIndex = null;
  try { storedIndex = window.localStorage.getItem(storageKey); } catch(e) {}
  var previous = storedIndex === null ? -1 : Number(storedIndex);
  if(!Number.isInteger(previous) || previous < 0 || previous >= quotes.length) previous = -1;

  function showNext(){
    var next;
    if(previous < 0){
      next = Math.floor(Math.random() * quotes.length);
    } else {
      next = (previous + 1 + Math.floor(Math.random() * (quotes.length - 1))) % quotes.length;
    }
    previous = next;
    quoteEl.textContent = '„' + quotes[next] + '”';
    sourceEl.textContent = '— SYS-HOMELAB';
    try { window.localStorage.setItem(storageKey, String(next)); } catch(e) {}
  }

  showNext();
  if(nextButton) nextButton.addEventListener('click', showNext);
})();
