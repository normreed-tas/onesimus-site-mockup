/* Practitioner's Training: online edition. No build step.
   Storage: localStorage with the "pt." prefix only. The course itself sends nothing. Registration is made on the Events page. */
(function () {
  var PT = HS, MODS = PT.modules, byId = {}, app = document.getElementById("app");
  MODS.forEach(function (m, i) { byId[m.id] = m; m.n = i + 1; });
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem("hs." + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("hs." + k, JSON.stringify(v)); } catch (e) {} },
    clear: function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf("hs.") === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} }
  };
  var S = { done: LS.get("done", {}), notes: LS.get("notes", {}), ans: LS.get("ans", {}), sort: LS.get("sort", {}), cards: LS.get("cards", {}), kase: LS.get("case", null), plans: LS.get("plans", {}), check: LS.get("check", {}), name: LS.get("name", "") };
  function save(k) { LS.set(k === "kase" ? "case" : k, S[k]); }
  /* Registration is made on the Onesimus Events page (a standing event in Wix) and kept on this device.
     It opens the course and supplies the name and organisation for the certificate. */
  var REG = (function () { try { return JSON.parse(localStorage.getItem("onesimus.reg.hidden-sentence")); } catch (e) { return null; } })();
  if (REG && !S.name) S.name = [REG.firstName, REG.lastName].filter(Boolean).join(" ");
  function regLine() { var t = REG ? [REG.position, REG.organisation].filter(Boolean).join(", ") : ""; return t ? '<p class="cs">' + esc(t) + "</p>" : ""; }
  /* Completion is reported to Onesimus once, as an entry in the "Online course completions" form in Wix.
     If it cannot be sent (no connection), it is tried again the next time the course is opened. */
  function reportDone() {
    if (!REG || !REG.email || LS.get("reported", false) || !canCert()) return;
    var v = { course_k3v8qd: "Hidden Sentence", completed_on_p7m2xa: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }), first_name_c7k2m9: REG.firstName || "", last_name_h4t9wz: REG.lastName || "", email_r6n1yb: REG.email };
    if (REG.organisation) v.organisation_d2f5jc = REG.organisation;
    if (REG.position) v.position_u8s3le = REG.position;
    if (REG.paidOrVolunteer) v.paid_or_volunteer_g5q7hn = REG.paidOrVolunteer;
    try {
      import(new URL("../js/wix/wix-client.js", location.href).href)
        .then(function (m) { return m.wixApiRequest("/form-submission-service/v4/submissions", { method: "POST", body: { submission: { formId: "63a9cc79-cc87-40ba-bf38-47cc70e0fb16", submissions: v } } }); })
        .then(function () { LS.set("reported", true); })
        .catch(function () {});
    } catch (e) {}
  }
  function gate() {
    return '<div class="wrap"><section class="intro" style="padding-top:24px"><h1 class="ah">Register to start</h1>' +
      "<p>This course is free, but you need to register before you begin. It takes a minute.</p>" +
      "<p>The name and organisation you give when you register appear on your certificate.</p>" +
      '<p><a class="btn" href="../events.html#online-training">Register on the Onesimus Events page</a></p>' +
      '<p class="note">Already registered on another phone or computer? Register again here with the same email address and the course will open.</p></section></div>';
  }

  var P = {
    door: '<path d="M6 21V4h10v17"/><path d="M4 21h16"/><circle cx="13" cy="12.5" r=".8"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/><path d="M9 12.5 11 15l4-4.5"/>',
    steps: '<path d="M4 20h4v-4h4v-4h4V8h4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    child: '<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 11l4-2 4 2M10 21l2-6 2 6"/>',
    wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v18M3 12h18"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17v.01"/>',
    print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
    tick: '<path d="M5 12.5 10 17l9-10"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
  };
  function ico(n, cls) { return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || "") + "</svg>"; }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function doneCount() { return MODS.filter(function (m) { return S.done[m.id]; }).length; }
  function kase() { return PT.cases.filter(function (c) { return c.id === S.kase; })[0]; }
  function checkScore() { var qs = byId.finish.blocks.filter(function (b) { return b.check; })[0].check, n = 0, a = 0; qs.forEach(function (q, i) { if (S.check[i] != null) { a++; if (S.check[i] === q.answer) n++; } }); return { right: n, answered: a, total: qs.length }; }
  function canCert() { return checkScore().right >= PT.passMark && MODS.every(function (m) { return m.final || S.done[m.id]; }); }

  /* ---------- blocks ---------- */
  function quizHtml(q, id, picked, group) {
    var h = '<div class="quiz" data-quiz="' + esc(id) + '"' + (group ? ' data-group="1"' : "") + '><p class="qq">' + esc(q.q) + "</p>";
    q.options.forEach(function (o, i) {
      var cls = "opt" + (picked != null ? (i === q.answer ? " right" : (i === picked ? " wrong" : "")) : "");
      h += '<button type="button" class="' + cls + '" data-i="' + i + '"' + (picked === i ? ' aria-pressed="true"' : "") + ">" + esc(o) + "</button>";
    });
    if (picked != null) h += '<p class="fb ' + (picked === q.answer ? "ok" : "no") + '"><b>' + (picked === q.answer ? "That's it." : "Not quite.") + "</b> " + esc(q.why || ("The answer is: " + q.options[q.answer])) + "</p>";
    return h + "</div>";
  }
  function reflectHtml(r) {
    var v = S.notes[r.id] || "";
    return '<div class="reflect"><label for="' + r.id + '">' + esc(r.prompt) + '</label><textarea id="' + r.id + '" data-note="' + r.id + '" rows="4" placeholder="Your notes. They stay on this device.">' + esc(v) + "</textarea>" +
      (r.points ? '<details class="reveal"><summary>' + esc(r.pointsTitle || "Compare with the course notes") + "</summary><ul>" + r.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></details>" : "") + "</div>";
  }
  function sortHtml(s) {
    var st = S.sort[s.id] || {}, n = Object.keys(st).length;
    var h = '<div class="sort" data-sort="' + s.id + '"><p class="note" aria-live="polite">' + n + " of " + s.items.length + " placed</p>";
    s.items.forEach(function (it, i) {
      var p = st[i];
      h += '<div class="sitem' + (p != null ? " placed" : "") + '"><p>' + esc(it.t) + "</p>";
      if (p == null) h += '<div class="bins">' + s.bins.map(function (b, j) { return '<button type="button" class="bin" data-i="' + i + '" data-j="' + j + '">' + esc(b) + "</button>"; }).join("") + "</div>";
      else h += '<p class="fb ' + (p === it.bin ? "ok" : "no") + '">' + (p === it.bin ? "<b>" + esc(s.bins[it.bin]) + ".</b> The guide puts it there too." : "You chose <b>" + esc(s.bins[p]) + "</b>. The guide puts this under <b>" + esc(s.bins[it.bin]) + "</b>. Many of these touch more than one level.") + "</p>";
      h += "</div>";
    });
    return h + "</div>";
  }
  function cardsHtml(c) {
    var n = S.cards[c.id] || 0, h = '<div class="pcards" data-cards="' + c.id + '">';
    h += '<p class="note" aria-live="polite">Card ' + Math.min(n + (n < c.items.length ? 1 : 0), c.items.length) + " of " + c.items.length + "</p>";
    if (n < c.items.length) h += '<div class="pcard"><p>' + esc(c.items[n]) + '</p></div><button type="button" class="btn" data-next="1">' + (n === c.items.length - 1 ? "Finish" : "Next card") + "</button>";
    else h += '<p class="tip">' + esc(c.end) + '</p><button type="button" class="btn ghost" data-reset="1">Start again</button>';
    if (n) h += '<ol class="pile">' + c.items.slice(0, n).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ol>";
    return h + "</div>";
  }
  function origHtml(t) { return '<details class="orig"><summary>Workshop wording</summary><p class="otext">' + esc(t) + "</p></details>"; }
  function casesHtml() {
    var k = kase(), h = '<div class="cases">';
    h += PT.cases.map(function (c) { return '<button type="button" class="casebtn' + (k && k.id === c.id ? " on" : "") + '" data-case="' + c.id + '" aria-pressed="' + (k && k.id === c.id) + '"><b>' + esc(c.name) + "</b><span>" + esc(c.line) + "</span></button>"; }).join("") + "</div>";
    if (!k) return h + '<p class="note">Choose a family to continue.</p>';
    h += '<section class="topic"><h2>' + esc(k.name) + "</h2><p>" + esc(k.text) + "</p>" + origHtml(k.orig) + "</section>";
    h += '<section class="topic"><h2>Three questions</h2>' +
      reflectHtml({ id: "a-who-" + k.id, prompt: "Who is in the family?" }) +
      reflectHtml({ id: "a-ag-" + k.id, prompt: "Which agencies might already be involved?" }) +
      reflectHtml({ id: "a-sn-" + k.id, prompt: "What strengths and needs does each family member have?" }) + "</section>";
    h += '<section class="topic"><h2>Now hear from the family</h2><p>Later in the workshop, each group is handed extra cards. They show what an assessment on paper can miss.</p>' +
      '<details class="reveal"><summary>Turn over the cards</summary>' + k.extra.map(function (e) { return '<blockquote class="quote"><q>' + esc(e[1]) + "</q><cite>" + esc(e[0]) + "</cite></blockquote>"; }).join("") + "</details>" +
      reflectHtml({ id: "a-more-" + k.id, prompt: "What changes, now that you've heard this?", pointsTitle: "Course notes on this family", points: k.notes }) + "</section>";
    return h;
  }
  function caserefHtml(text) {
    var k = kase();
    if (!k) return '<p class="warn">You haven\'t chosen a family yet. <a href="#assess">Go to Assessing needs</a> first.</p>';
    return '<div class="caseref"><p class="note">Your family</p><p><b>' + esc(k.name) + ".</b> " + esc(k.line) + '. <a href="#assess">Read their story again</a></p></div><p>' + esc(text) + "</p>";
  }
  function planHtml(p) {
    var rows = S.plans[p.id] || [["", "", "", "", ""], ["", "", "", "", ""]], heads = ["Area of support", "Outcome to achieve", "Action(s)", "By whom?", "When / where"];
    var h = '<div class="planx" data-plan="' + p.id + '"><div class="prow ex"><p class="note">Example</p>' + heads.map(function (hd, j) { return "<p><b>" + hd + ":</b> " + esc(p.example[j]) + "</p>"; }).join("") + "</div>";
    rows.forEach(function (r, i) {
      h += '<div class="prow"><p class="note">Step ' + (i + 1) + "</p>" + heads.map(function (hd, j) { return '<label>' + hd + '<textarea rows="' + (j === 2 ? 3 : 1) + '" data-r="' + i + '" data-c="' + j + '">' + esc(r[j]) + "</textarea></label>"; }).join("") + "</div>";
    });
    return h + '<div class="wactions"><button type="button" class="btn ghost" data-print="1">' + ico("print") + "Print this plan</button></div></div>";
  }
  function checkHtml(qs) {
    var sc = checkScore(), h = '<div class="check">';
    qs.forEach(function (q, i) { h += quizHtml({ q: (i + 1) + ". " + q.q, options: q.options, answer: q.answer, why: "" }, "check-" + i, S.check[i], true); });
    h += '<p class="score ' + (sc.right >= PT.passMark ? "ok" : "") + '" aria-live="polite"><b>' + sc.right + " of " + sc.total + "</b> correct" + (sc.answered < sc.total ? " so far." : sc.right >= PT.passMark ? ". You've passed." : ". You need " + PT.passMark + ".") + "</p>";
    if (sc.answered) h += '<button type="button" class="btn ghost" data-retry="1">Try again</button>';
    return h + "</div>";
  }
  function certGate() {
    var left = MODS.filter(function (m) { return !m.final && !S.done[m.id]; });
    var h = '<section class="topic" id="cert-gate"><h2>Your certificate</h2>';
    if (canCert()) h += '<p>Well done. Check your name is as you want it to appear, then open your certificate to print or save as a PDF.</p><label class="certname">Your name<input type="text" id="cert-name" autocomplete="name" value="' + esc(S.name) + '"></label><a class="btn" href="#certificate">' + ico("print") + "Open my certificate</a><p class=\"note\">Your certificate is made on this device. Onesimus is told that you have completed the course.</p>";
    else {
      h += "<p>To unlock your certificate:</p><ul>";
      if (left.length) h += "<li>Finish " + left.map(function (m) { return '<a href="#' + m.id + '">' + esc(m.title) + "</a>"; }).join(", ") + ".</li>";
      if (checkScore().right < PT.passMark) h += "<li>Get " + PT.passMark + " of " + checkScore().total + " in the knowledge check.</li>";
      h += "</ul>";
    }
    return h + "</section>";
  }
  function blocks(list, m) {
    return (list || []).map(function (b) {
      if (typeof b === "string") return "<p>" + esc(b) + "</p>";
      if (Array.isArray(b)) return "<ul>" + b.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
      if (b.h) return "<h2 class=\"mh\">" + esc(b.h) + "</h2>";
      if (b.tip) return '<p class="tip">' + esc(b.tip) + "</p>";
      if (b.warn) return '<p class="warn">' + esc(b.warn) + "</p>";
      if (b.quote) return '<blockquote class="quote"><q>' + esc(b.quote) + "</q>" + (b.who ? "<cite>" + esc(b.who) + "</cite>" : "") + "</blockquote>";
      if (b.ol) return '<ol class="olist">' + b.ol.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ol>";
      if (b.video) return '<a class="video" href="' + esc(b.video.url) + '" target="_blank" rel="noopener">' + ico("play") + "<span><b>" + esc(b.video.title) + "</b><span>" + esc(b.video.by) + (b.video.mins ? " · about " + b.video.mins + " minutes" : "") + " · opens in a new tab</span><span>" + esc(b.video.note) + "</span></span></a>" + (b.video.credit ? '<p class="note credit">' + esc(b.video.credit) + "</p>" : "");
      if (b.links) return '<p class="linkrow">' + b.links.map(function (l) { return '<a class="btn ghost" href="' + esc(l[1]) + '"' + (/^https?:/.test(l[1]) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l[0]) + " &rarr;</a>"; }).join("") + "</p>";
      if (b.map) return window.PrisonMap ? window.PrisonMap.html(-1) : '<p class="note">The map could not be loaded.</p>';
      if (b.tour) return '<div class="tour">' + b.tour.map(function (s) { return s.h ? '<h3 class="th">' + esc(s.h) + "</h3>" + (s.p ? "<p>" + esc(s.p) + "</p>" : "") : (PT.noPhotos ? '<figure><div class="ph" role="img" aria-label="Photograph to come"><span>Photograph to come</span></div><figcaption>' + esc(s.cap) + "</figcaption></figure>" : '<figure><img loading="lazy" src="img/' + s.src + '.jpg" alt="' + esc(s.alt || s.cap) + '"><figcaption>' + esc(s.cap) + "</figcaption></figure>"); }).join("") + "</div>";
      if (b.story) return '<blockquote class="story">' + b.story.paras.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") + "<cite>" + esc(b.story.who) + "</cite></blockquote>";
      if (b.reflect) return reflectHtml(b.reflect);
      if (b.quiz) return quizHtml(b.quiz, b.quiz.id, S.ans[b.quiz.id]);
      if (b.sort) return sortHtml(b.sort);
      if (b.cards) return cardsHtml(b.cards);
      if (b.cases) return casesHtml();
      if (b.caseref) return caserefHtml(b.caseref);
      if (b.plan) return planHtml(b.plan);
      if (b.check) return checkHtml(b.check);
      if (b.cert) return certGate();
      if (b.flag) return '<p class="flag"><b>Review note:</b> ' + esc(b.flag) + "</p>";
      if (b.orig) return origHtml(b.orig);
      return "";
    }).join("");
  }

  /* ---------- views ---------- */
  function home() {
    var d = doneCount(), next = MODS.filter(function (m) { return !S.done[m.id]; })[0];
    var list = MODS.map(function (m) {
      return '<a class="mod' + (S.done[m.id] ? " done" : "") + '" style="--c:' + m.color + '" href="#' + m.id + '"><span class="mn">' + (S.done[m.id] ? ico("tick") : m.n) + "</span><span><b>" + esc(m.title) + "</b><span>" + esc(m.short) + " · " + m.mins + " min</span></span></a>";
    }).join("");
    return '<div class="wrap"><section class="hero"><p class="kicker">Onesimus Foundation</p><h1>Hidden Sentence</h1><p class="sub">When someone goes to prison, their family serves a sentence too. An introductory course for anyone in Tasmania whose work brings them into contact with those families.</p>' +
      '<p class="heroact"><a class="btn light" href="#' + (next ? next.id : "finish") + '">' + (d === 0 ? "Start the course" : next ? "Continue: " + esc(next.title) : "Go to your certificate") + " &rarr;</a></p></section>" +
      '<div class="prog" role="img" aria-label="' + d + " of " + MODS.length + ' modules complete"><div style="width:' + Math.round(d / MODS.length * 100) + '%"></div></div><p class="note">' + d + " of " + MODS.length + " modules complete · about an hour and a quarter in all</p>" +
      '<p class="hlabel">Modules</p><nav class="mods" aria-label="Modules">' + list + "</nav>" +
      '<p class="note homefoot">Your place and your notes are kept on this device only. <a href="#about">About this course</a></p></div>';
  }
  function moduleView(m) {
    var prev = MODS[m.n - 2], next = MODS[m.n];
    var h = '<header class="band" style="--c:' + m.color + '"><div class="wrap"><a class="crumb" href="#home">&larr; All modules</a><p class="modno">Module ' + m.n + " of " + MODS.length + " · about " + m.mins + " minutes</p><h1>" + esc(m.title) + "</h1></div></header>";
    h += '<div class="wrap module" style="--c:' + m.color + '">' + blocks(m.blocks, m);
    h += '<div class="modend">';
    if (!m.final) h += S.done[m.id] ? '<p class="fb ok"><b>Module complete.</b></p>' : '<button type="button" class="btn" id="mark-done">' + ico("tick") + "Mark this module complete</button>";
    h += '<p class="linkrow">' + (prev ? '<a class="btn ghost" href="#' + prev.id + '">&larr; ' + esc(prev.title) + "</a>" : "") + (next ? '<a class="btn' + (S.done[m.id] ? "" : " ghost") + '" href="#' + next.id + '">' + esc(next.title) + " &rarr;</a>" : "") + "</p></div></div>";
    return h;
  }
  function certificate() {
    if (!canCert()) return '<div class="wrap"><section class="intro" style="padding-top:24px"><h1 class="ah">Certificate</h1><p>Your certificate unlocks when you have finished every module and passed the knowledge check.</p><p><a class="btn" href="#finish">Go to Next steps</a></p></section></div>';
    var d = new Date(), date = d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
    return '<div class="wrap"><div class="wactions" style="margin-top:18px"><button type="button" class="btn" data-print="1">' + ico("print") + 'Print or save as PDF</button><a class="btn ghost" href="#finish">Back</a></div>' +
      '<section class="cert"><p class="ck">Onesimus Foundation</p><p class="ct">Certificate of completion</p><p class="cs">This certifies that</p><p class="cn">' + esc(S.name || "(your name)") + "</p>" + regLine() + '<p class="cs">has completed the online course</p><p class="cc">Hidden Sentence: An introduction to supporting families when someone is in prison</p><p class="cs">Eight modules, including a knowledge check. About an hour and a quarter of self-paced study.</p><p class="cd">' + date + '</p><p class="cf">Onesimus Foundation Ltd · 550 East Derwent Highway, Risdon Vale, Tasmania · onesimus.org.au<br>Generated by the participant on completing the course. Onesimus is told of the completion.</p></section></div>';
  }
  function about() {
    return '<div class="wrap"><section class="intro" style="padding-top:24px"><h1 class="ah">About this course</h1>' +
      "<p>Hidden Sentence is Onesimus&rsquo;s introductory training on what a prison sentence does to the family left outside. It ran as a full day at Risdon Vale from 2017, with the Tasmania Prison Service, the Department of Education and Child Safety, and included a walk through the prison. This is its online edition.</p>" +
      "<p><b>What&rsquo;s kept.</b> The opening quiz, the young people&rsquo;s voices, the prison tour (here in photographs), the visit flowchart and the &ldquo;what would you advise?&rdquo; scenarios.</p>" +
      "<p><b>What&rsquo;s changed.</b> The figures are current. The film <i>The Space In Between</i> is being replaced with a new one. The visiting rules follow the Prison Service&rsquo;s current page.</p>" +
      "<p><b>What is collected.</b> Your registration (name, email, organisation, position, and whether you are paid or a volunteer) goes to Onesimus, and Onesimus is told when you complete the course. Nothing else is sent: there is no tracking, and your progress and notes are kept in this browser only.</p>" +
      '<p><button type="button" class="btn ghost" id="clear-all">Clear my progress and notes</button></p>' +
      "<p><b>Draft for review.</b> Reviewer view (below) shows what is still to confirm.</p></section></div>";
  }

  /* ---------- events ---------- */
  function rerender(keepScroll) { var y = window.scrollY; render(true); if (keepScroll) window.scrollTo(0, y); }
  function findBlock(kind, id) { var out; MODS.forEach(function (m) { m.blocks.forEach(function (b) { if (b[kind] && b[kind].id === id) out = b[kind]; }); }); return out; }
  app.addEventListener("click", function (e) {
    var t = e.target.closest("button, a"); if (!t) return;
    var q = t.closest("[data-quiz]");
    if (q && t.classList.contains("opt")) {
      var id = q.dataset.quiz, i = +t.dataset.i;
      if (q.dataset.group) { var n = +id.split("-")[1]; if (S.check[n] != null) return; S.check[n] = i; save("check"); }
      else { if (S.ans[id] != null) return; S.ans[id] = i; save("ans"); }
      return rerender(true);
    }
    if (t.classList.contains("bin")) { var sid = t.closest("[data-sort]").dataset.sort; S.sort[sid] = S.sort[sid] || {}; S.sort[sid][t.dataset.i] = +t.dataset.j; save("sort"); return rerender(true); }
    var pc = t.closest("[data-cards]");
    if (pc && t.dataset.next) { S.cards[pc.dataset.cards] = (S.cards[pc.dataset.cards] || 0) + 1; save("cards"); return rerender(true); }
    if (pc && t.dataset.reset) { S.cards[pc.dataset.cards] = 0; save("cards"); return rerender(true); }
    if (t.dataset.case) { S.kase = t.dataset.case; save("kase"); return rerender(true); }
    if (t.dataset.retry) { S.check = {}; save("check"); return rerender(true); }
    if (t.dataset.print) { try { window.print(); } catch (err) {} return; }
    if (t.id === "mark-done") { var m = byId[document.body.dataset.view]; S.done[m.id] = true; save("done"); var nx = MODS[m.n]; if (nx) location.hash = "#" + nx.id; else rerender(true); return; }
    if (t.id === "clear-all") {
      if (t.dataset.sure) { LS.clear(); location.hash = "#home"; location.reload(); }
      else { t.dataset.sure = "1"; t.textContent = "Tap again to clear everything"; }
    }
  });
  app.addEventListener("input", function (e) {
    var t = e.target;
    if (t.dataset.note) { S.notes[t.dataset.note] = t.value; save("notes"); }
    else if (t.id === "cert-name") { S.name = t.value; save("name"); }
    else if (t.dataset.r != null) { var id = t.closest("[data-plan]").dataset.plan; S.plans[id] = S.plans[id] || [["", "", "", "", ""], ["", "", "", "", ""]]; S.plans[id][+t.dataset.r][+t.dataset.c] = t.value; save("plans"); }
  });

  /* ---------- router ---------- */
  function render(soft) {
    if (!REG) { app.innerHTML = gate(); document.body.dataset.view = "gate"; window.scrollTo(0, 0); return; }
    reportDone();
    var view = (location.hash || "#home").slice(1).split(".")[0];
    if (view === "about") app.innerHTML = about();
    else if (view === "certificate") app.innerHTML = certificate();
    else if (byId[view]) { app.innerHTML = moduleView(byId[view]); if (byId[view].final && !S.done.finish && canCert()) { S.done.finish = true; save("done"); } }
    else { view = "home"; app.innerHTML = home(); }
    document.title = (byId[view] ? byId[view].title + " · " : "") + "Hidden Sentence · Onesimus";
    document.body.dataset.view = view;
    document.getElementById("progchip").textContent = doneCount() + " of " + MODS.length;
    if (!soft) window.scrollTo(0, 0);
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
