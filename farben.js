// Eine ruhige Graustufen-Variante (Start) und fünf grelle Farbwelten, jeweils Komplementärpaare. Es wird nichts im Browser gespeichert:
// Die gewählte Farbe wird nur über den Link-Zusatz (#0 bis #5) an die Unterseiten weitergegeben.
(function () {
  var paletten = [
    { bg: "#1c1c1e", ink: "#f2f2f2", card: "#2c2c2e", head: "#d9d9d9", accent: "#f2f2f2" }, // Anthrazit / Hellgrau (ruhig)
    { bg: "#0033ff", ink: "#ffffff", card: "#0a1a66", head: "#ffb400", accent: "#ffb400" }, // Knallblau / Gelborange
    { bg: "#ff1f8e", ink: "#ffffff", card: "#5c0a37", head: "#19ff8c", accent: "#19ff8c" }, // Pink / Neongrün
    { bg: "#7a00ff", ink: "#ffffff", card: "#230a4d", head: "#f2ff00", accent: "#f2ff00" }, // Violett / Neongelb
    { bg: "#ff3b00", ink: "#ffffff", card: "#5c1500", head: "#00e5ff", accent: "#00e5ff" }, // Signalrot / Cyan
    { bg: "#ffe600", ink: "#1a0033", card: "#1a0033", head: "#ffe600", accent: "#5a00ff" }  // Gelb / Ultraviolett
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
    logo.addEventListener("click", function () {
      i = (i + 1) % paletten.length;
      anwenden();
    });
  }
})();
