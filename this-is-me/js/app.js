/* "This is me" phone guide concept. No build step. A child's answers are held in memory only:
   nothing is saved or sent, and leaving the page clears them. Only display settings use storage ("cia." prefix). */
(function () {
  var app = document.getElementById("app");
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem("cia." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("cia." + k, JSON.stringify(v)); } catch (e) {} }
  };
  var A = fresh();
  function fresh() { return { who: null, stage: null, t: {}, rate: null, actions: [["", "", ""], ["", "", ""], ["", "", ""]], drawn: false }; }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function who() { return CIA.who.filter(function (w) { return w.id === A.who; })[0]; }
  function fill(s) { var w = who(); return s.replace(/\{w\}/g, w.word).replace(/\{c\}/g, w.carer); }
  function ext(d) { return '<a class="btn ghost" href="' + esc(d[1]) + '" target="_blank" rel="noopener">' + esc(d[0]) + " &rarr;</a>"; }
  function band(title, color) { return '<header class="band" style="--c:' + color + '"><div class="wrap"><a class="crumb" href="#home">&larr; This is me</a><h1>' + esc(title) + "</h1></div></header>"; }
  function ta(key, label, rows) { return '<label class="fld">' + esc(label) + '<textarea rows="' + (rows || 2) + '" data-t="' + esc(key) + '">' + esc(A.t[key] || "") + "</textarea></label>"; }
  function inp(key, label) { return '<label class="fld">' + esc(label) + '<input type="text" data-t="' + esc(key) + '" value="' + esc(A.t[key] || "") + '"></label>'; }
  var TILES = [
    ["assess", "Start with a child", "The assessment, for a child with a mum, dad or brother in the justice system", "#2F5D7C"],
    ["notes", "Notes for the helper", "What a child may be feeling at each stage, and what you can do", "#4B7A5E"],
    ["principles", "Guiding principles", "Eight things to hold on to", "#B8894A"],
    ["faqs", "Questions people ask", "Consent, sharing, who can use it", "#8A4F7D"],
    ["stories", "Children's stories", "Eight case studies from the toolkit", "#9A3B2E"],
    ["more", "From the Prison Reform Trust", "The documents, films and training behind this guide", "#1B2A3A"]
  ];

  function home() {
    return '<div class="wrap"><section class="hero" style="background:#2F5D7C"><p class="kicker">Child Impact Assessment</p><h1>This is me</h1><p class="sub">For a child whose mum, dad or brother has been arrested, is going to court, or is in prison. A way to say how you feel and what would help, with an adult you trust.</p></section>' +
      '<p class="hlabel">In this guide</p><nav class="tiles" aria-label="Sections">' + TILES.map(function (t) { return '<a class="tile" style="--c:' + t[3] + '" href="#' + t[0] + '"><span><b>' + esc(t[1]) + "</b><span>" + esc(t[2]) + "</span></span></a>"; }).join("") + "</nav>" +
      '<p class="note homefoot">A concept by the Onesimus Foundation, built on the Prison Reform Trust&rsquo;s Child Impact Assessment framework. <a href="#about">About this concept</a></p></div>';
  }

  function assess() {
    var h = band("This is me", "#2F5D7C") + '<div class="wrap module" style="--c:#2F5D7C">';
    h += '<p class="privacy"><b>Private.</b> Nothing you write here is saved or sent anywhere. If you leave this page it is gone. Print it if you want to keep it.</p>';
    h += '<h2 class="mh">Who is this about?</h2><div class="pick">' + CIA.who.map(function (w) { return '<button type="button" class="opt' + (A.who === w.id ? " on" : "") + '" data-who="' + w.id + '" aria-pressed="' + (A.who === w.id) + '">My ' + w.word + "</button>"; }).join("") + "</div>";
    if (!A.who) return h + '<p class="note">Choose one to begin. You can do this with an adult you trust.</p></div>';
    var w = who();
    h += '<p class="tip">There is no right or wrong way to feel. What has happened is not your fault. You are not the only one: lots of children have a ' + w.word + " in this situation. You don&rsquo;t have to answer everything, and you can change your answers another day.</p>";
    h += '<h2 class="mh">About me</h2>' + inp("name", "My name") + inp("called", "What I like to be called") + inp("helper", "The person helping me with this") + CIA.aboutMe.map(function (p, i) { return ta("me" + i, p); }).join("");
    h += '<h2 class="mh">Me and my ' + w.word + "</h2>" + CIA.aboutThem.map(function (p, i) { return ta("them" + i, fill(p)); }).join("");
    h += '<h2 class="mh">What has happened</h2><p>Choose what is happening now. You can come back and choose another one later.</p><div class="pick col">' + CIA.stages.map(function (s) { return '<button type="button" class="opt' + (A.stage === s.id ? " on" : "") + '" data-stage="' + s.id + '" aria-pressed="' + (A.stage === s.id) + '"><b>' + esc(s.t) + "</b><span>" + esc(fill(s.line)) + "</span></button>"; }).join("") + "</div>";
    if (A.stage) {
      var s = CIA.stages.filter(function (x) { return x.id === A.stage; })[0];
      h += CIA.core.map(function (p, i) { return ta(s.id + "c" + i, p, 3); }).join("");
      h += '<div class="fld"><span id="rate-l">How I am doing right now</span><div class="rate10" role="radiogroup" aria-labelledby="rate-l">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return '<button type="button" class="r10' + (A.rate === n ? " on" : "") + '" role="radio" aria-checked="' + (A.rate === n) + '" data-rate="' + n + '">' + n + "</button>"; }).join("") + '</div><span class="note">1 = things are very hard &nbsp;·&nbsp; 10 = I am doing well</span></div>';
      h += s.extra.map(function (p, i) { return ta(s.id + "x" + i, fill(p), 3); }).join("") + CIA.coreAfter.map(function (p, i) { return ta(s.id + "a" + i, fill(p), 3); }).join("");
      h += '<p class="seealso"><a href="#notes.' + s.id + '">For the helper: notes on this stage &rarr;</a></p>';
    }
    h += '<h2 class="mh">Draw or write</h2><p>If you&rsquo;d like to, draw a picture, or write a story or poem, about how things are.</p><canvas id="pad" width="640" height="420" aria-label="Drawing space"></canvas><div class="wactions"><button type="button" class="btn ghost" id="pad-clear">Clear the drawing</button></div>' + ta("story", "Or write here", 3);
    h += '<h2 class="mh">What we&rsquo;ve agreed</h2><p>With your helper, write down what will happen next. Use your own words.</p>';
    A.actions.forEach(function (r, i) {
      h += '<div class="prow"><p class="note">Action ' + (i + 1) + '</p>' + ["What will happen", "Who will do it", "By when"].map(function (l, j) { return '<label class="fld">' + l + '<textarea rows="' + (j ? 1 : 2) + '" data-r="' + i + '" data-c="' + j + '">' + esc(r[j]) + "</textarea></label>"; }).join("") + "</div>";
    });
    h += '<div class="wactions"><button type="button" class="btn" id="do-print">Print or save as PDF</button><button type="button" class="btn ghost" id="reset">Start again</button></div>';
    h += '<p class="flag"><b>Review note:</b> The prompts are stand-in wording by Onesimus that follows the structure of the Prison Reform Trust&rsquo;s assessment (' + esc(CIA.docs[w.doc][0]) + '). PRT&rsquo;s own wording would replace it. Left off this phone version, for privacy: address, date of birth, gender, school, and the names and contact details of adults and other children at home. To decide: whether a helper needs those, and where they should be kept.</p>';
    h += '<p class="linkrow">' + ext(CIA.docs[w.doc]) + "</p></div>";
    return h;
  }

  function notes() {
    var h = band("Notes for the helper", "#4B7A5E") + '<div class="wrap" style="--c:#4B7A5E"><div class="intro"><p>The assessment is about the child, not the parent. Ideally the helper is an adult the child already trusts. You don&rsquo;t need special training to begin: kindness and not judging matter most.</p>' +
      "<ul><li>Brothers and sisters may each need their own.</li><li>Feelings change. Come back to it.</li><li>Follow your safeguarding policy. A parent being in the justice system is not, in itself, a child protection concern.</li><li>Go gently. The child may have seen or heard frightening things.</li><li>Be open about what you write down and who will see it.</li></ul></div>" +
      '<nav class="chips" aria-label="Stages">' + CIA.stages.map(function (s) { return '<a href="#notes.' + s.id + '">' + esc(s.t) + "</a>"; }).join("") + "</nav>";
    CIA.stages.forEach(function (s) {
      var n = CIA.notes[s.id];
      h += '<section class="topic" id="notes.' + s.id + '"><h2>' + esc(s.t) + '</h2><p class="sub2"><b>What a child may be feeling</b></p><ul>' + n.feel.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="sub2"><b>What you could do</b></p><ul>' + n.do.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>";
    });
    h += '<section class="topic"><h2>At every stage</h2><ul><li>Specialist family support.</li><li>A referral for therapy, where the child wants it.</li><li>Resources the child can use on their own.</li></ul><p class="warn">If a child says they are thinking about hurting themselves, act that day. Follow your safeguarding policy. In an emergency call 999.</p></section>';
    h += '<p class="flag"><b>Review note:</b> These are short stand-in summaries, not the Prison Reform Trust&rsquo;s text. The full notes differ for a mother, a father and a brother.</p><p class="linkrow">' + ext(CIA.docs.mumNotes) + ext(CIA.docs.dadNotes) + ext(CIA.docs.brotherNotes) + "</p></div>";
    return h;
  }
  function principles() {
    return band("Guiding principles", "#B8894A") + '<div class="wrap" style="--c:#B8894A"><div class="intro"><p>Eight principles sit under every Child Impact Assessment.</p></div><ol class="olist big">' + CIA.principles.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + '</ol><p class="flag"><b>Review note:</b> Paraphrased. The Prison Reform Trust&rsquo;s own wording would replace this.</p><p class="linkrow" style="margin-top:16px">' + ext(CIA.docs.principles) + "</p></div>";
  }
  function faqs() {
    return band("Questions people ask", "#8A4F7D") + '<div class="wrap" style="--c:#8A4F7D"><div class="intro"><p>Short answers. The framework&rsquo;s own FAQs give the full ones.</p></div>' + CIA.faqs.map(function (f) { return '<div class="qa"><p class="qq">' + esc(f[0]) + "</p><p>" + esc(f[1]) + "</p></div>"; }).join("") + '<p class="linkrow" style="margin-top:16px">' + ext(CIA.docs.faqs) + "</p></div>";
  }
  function stories() {
    return band("Children's stories", "#9A3B2E") + '<div class="wrap" style="--c:#9A3B2E"><div class="intro"><p>The toolkit tells eight children&rsquo;s stories: what happened, and what could have happened with a Child Impact Assessment. Read them in the toolkit itself.</p></div>' + CIA.stories.map(function (s) { return '<div class="qa"><p class="qq">' + esc(s[0]) + "</p><p>" + esc(s[1]) + "</p></div>"; }).join("") + '<p class="linkrow" style="margin-top:16px">' + ext(CIA.docs.toolkit) + "</p></div>";
  }
  function more() {
    var d = CIA.docs;
    function grp(t, ks) { return '<section class="topic"><h2>' + t + '</h2><p class="linkrow col">' + ks.map(function (k) { return ext(d[k]); }).join("") + "</p></section>"; }
    return band("From the Prison Reform Trust", "#1B2A3A") + '<div class="wrap"><div class="intro"><p>Everything in this guide comes from the Child Impact Assessment project, led by Sarah Beresford OBE for the Prison Reform Trust. The resources are free to download and use. The Trust updates them, so these links go to its own pages.</p><p class="linkrow"><a class="btn" href="' + CIA.PRT + '" target="_blank" rel="noopener">The Child Impact Assessment project &rarr;</a></p></div>' +
      grp("The assessments", ["mum", "dad", "brother"]) + grp("Notes for helpers", ["mumNotes", "dadNotes", "brotherNotes"]) + grp("The framework", ["toolkit", "principles", "faqs", "phase3"]) + grp("Hear and learn more", ["podcast", "talk", "training"]) + "</div>";
  }
  function helpnow() {
    return band("Help now", "#9A3B2E") + '<div class="wrap"><div class="svcs" style="margin-top:18px">' + CIA.help.map(function (s) { return '<article class="svc"><h3>' + esc(s.name) + "</h3><p>" + esc(s.about) + '</p><div class="calls"><a class="call" href="tel:' + s.num.replace(/\s/g, "") + '"><span class="num">' + esc(s.num) + "</span></a></div>" + (s.flag ? '<p class="flag"><b>Review note:</b> ' + esc(s.flag) + "</p>" : "") + "</article>"; }).join("") + '</div><p class="note" style="margin-top:14px">UK numbers. A Tasmanian edition would carry Tasmanian services.</p></div>';
  }
  function about() {
    return '<div class="wrap"><section class="intro" style="padding-top:24px"><h1 class="ah">About this concept</h1>' +
      "<p>This is a working sketch of how the Child Impact Assessment could sit on a phone: something a child and a trusted adult can open anywhere, fill in together, and print. It was prepared by the Onesimus Foundation in Tasmania, which builds phone guides of this kind for families and practitioners.</p>" +
      "<p><b>Whose work it is.</b> The Child Impact Assessment framework and the <i>&ldquo;This is me&rdquo;</i> toolkit were written by Sarah Beresford for the Prison Reform Trust. This concept is offered to them to use, change or set aside. It is not a Prison Reform Trust publication and is not endorsed by the Trust.</p>" +
      "<p><b>The wording is a stand-in.</b> Prompts and notes here follow the structure of the Trust&rsquo;s documents but are not its text. The Trust&rsquo;s own wording would replace them.</p>" +
      "<p><b>Nothing is collected.</b> No accounts, no tracking. A child&rsquo;s answers are never saved or sent. Leave the page and they are gone.</p>" +
      "<p><b>How it&rsquo;s built.</b> Plain web files with no build step. It works offline once opened, and the wording lives in one file that anyone can edit.</p></section></div>";
  }

  /* ---------- drawing pad ---------- */
  var padData = null;
  function bindPad() {
    var c = document.getElementById("pad"); if (!c) return;
    var x = c.getContext("2d"); x.lineWidth = 4; x.lineCap = "round"; x.strokeStyle = "#1B2A3A";
    if (padData) { var im = new Image(); im.onload = function () { x.drawImage(im, 0, 0); }; im.src = padData; }
    var down = false;
    function pos(e) { var r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; }
    c.addEventListener("pointerdown", function (e) { down = true; var p = pos(e); x.beginPath(); x.moveTo(p[0], p[1]); c.setPointerCapture(e.pointerId); e.preventDefault(); });
    c.addEventListener("pointermove", function (e) { if (!down) return; var p = pos(e); x.lineTo(p[0], p[1]); x.stroke(); });
    function up() { if (down) { down = false; try { padData = c.toDataURL(); } catch (e) {} } }
    c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    document.getElementById("pad-clear").addEventListener("click", function () { x.clearRect(0, 0, c.width, c.height); padData = null; });
  }

  app.addEventListener("click", function (e) {
    var t = e.target.closest("button"); if (!t) return;
    if (t.dataset.who) { A.who = t.dataset.who; return render(true); }
    if (t.dataset.stage) { A.stage = t.dataset.stage; A.rate = null; return render(true); }
    if (t.dataset.rate) { A.rate = +t.dataset.rate; app.querySelectorAll(".r10").forEach(function (b) { var on = +b.dataset.rate === A.rate; b.classList.toggle("on", on); b.setAttribute("aria-checked", on); }); return; }
    if (t.id === "do-print") { try { window.print(); } catch (err) {} return; }
    if (t.id === "reset") { if (t.dataset.sure) { A = fresh(); padData = null; render(); } else { t.dataset.sure = "1"; t.textContent = "Tap again to clear everything"; } }
  });
  app.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.t) A.t[t.dataset.t] = t.value;
    else if (t.dataset.r != null) A.actions[+t.dataset.r][+t.dataset.c] = t.value;
  });

  var VIEWS = { assess: assess, notes: notes, principles: principles, faqs: faqs, stories: stories, more: more, helpnow: helpnow, about: about };
  function render(soft) {
    var y = window.scrollY, parts = (location.hash || "#home").slice(1).split("."), view = parts[0];
    app.innerHTML = (VIEWS[view] || home)();
    document.body.dataset.view = VIEWS[view] ? view : "home";
    if (view === "assess") bindPad();
    if (soft === true) { window.scrollTo(0, y); return; }
    if (parts[1]) { var el = document.getElementById(view + "." + parts[1]); if (el) { el.scrollIntoView(); return; } }
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", function () { render(); });
  var root = document.documentElement;
  if (LS.get("big", false)) root.classList.add("big");
  if (LS.get("review", false)) root.classList.add("review");
  [["t-big", "big"], ["t-review", "review"]].forEach(function (p) {
    var b = document.getElementById(p[0]);
    b.setAttribute("aria-pressed", root.classList.contains(p[1]));
    b.addEventListener("click", function () { var on = root.classList.toggle(p[1]); LS.set(p[1], on); b.setAttribute("aria-pressed", on); });
  });
  render();
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(function () {});
})();
