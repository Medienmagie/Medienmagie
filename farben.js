// Start in Gelb/Lila, danach Schwarz mit Weiß und Gelb (gut lesbar), dann Komplementärpaare.
// Die gewählte Farbe wird nur über den Link-Zusatz (#0 bis #5) an die Unterseiten weitergegeben.
(function () {
  var paletten = [
    { bg: "#ffe600", ink: "#1a0033", card: "#1a0033", head: "#ffe600", accent: "#5a00ff" }, // Start: Gelb / Lila (wie die Visitenkarte)
    { bg: "#0a0a0a", ink: "#ffffff", card: "#1c1c1e", head: "#ffe600", accent: "#ffe600" }, // Schwarz mit Weiß und Gelb (gut lesbar)
    { bg: "#0033ff", ink: "#ffffff", card: "#0a1a66", head: "#ffb400", accent: "#ffb400" }, // Knallblau / Gelborange
    { bg: "#ff1f8e", ink: "#ffffff", card: "#5c0a37", head: "#19ff8c", accent: "#19ff8c" }, // Pink / Neongrün
    { bg: "#7a00ff", ink: "#ffffff", card: "#230a4d", head: "#f2ff00", accent: "#f2ff00" }, // Violett / Neongelb
    { bg: "#ff3b00", ink: "#ffffff", card: "#5c1500", head: "#00e5ff", accent: "#00e5ff" }  // Signalrot / Cyan
  ];
  var root = document.documentElement;
  var i = 0;

  var h = parseInt((location.hash || "").replace("#", ""), 10);
  if (h >= 0 && h < paletten.length) { i = h; }

  function meta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement("meta"); m.name = "theme-color"; document.head.appendChild(m); }
    return m;
  }

  function anwenden() {
    var p = paletten[i];
    root.style.setProperty("--bg", p.bg);
    root.style.setProperty("--ink", p.ink);
    root.style.setProperty("--card", p.card);
    root.style.setProperty("--head", p.head);
    root.style.setProperty("--accent", p.accent);
    meta().content = p.bg;
    var links = document.querySelectorAll("a[data-keep]");
    for (var k = 0; k < links.length; k++) {
      links[k].setAttribute("href", links[k].getAttribute("data-keep") + "#" + i);
    }
  }

  document.body.classList.add("keine-anim");
  anwenden();
  setTimeout(function () { document.body.classList.remove("keine-anim"); }, 80);
  var logo = document.getElementById("logo");
  if (logo) {
    var auge = logo.querySelector(".auge");
    var reduziert = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (auge) {
      auge.addEventListener("animationend", function () { auge.classList.remove("blinzeln"); });
    }
    logo.addEventListener("click", function () {
      i = (i + 1) % paletten.length;
      if (!auge || reduziert) { anwenden(); return; }
      // Das Auge schließt sich, die Farbe wechselt bei geschlossenem Auge, dann geht es wieder auf.
      auge.classList.remove("blinzeln");
      void logo.offsetWidth;
      auge.classList.add("blinzeln");
      setTimeout(anwenden, 150);
    });
  }
})();
