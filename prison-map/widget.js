/* Risdon Prison Complex map: one fixed aerial image with numbered pins laid over it.
   Shared by the map's own page (prison-map/) and Hidden Sentence module 5.
   Needs places.js first. Set PrisonMap.base to the folder that holds the image.
   Pin positions are fractions of the image: x from the left edge, y from the top (0 to 1). */
(function () {
  var CSS = ".pm{margin:14px 0;}" +
    ".pm-fig{position:relative; margin:0; line-height:0; border:1px solid rgba(27,42,58,.2); border-radius:8px; overflow:hidden; background:#22303d;}" +
    ".pm-fig img{display:block; width:100%; height:auto;}" +
    ".pm-pin{position:absolute; transform:translate(-50%,-50%); width:28px; height:28px; padding:0; border-radius:50%; background:#B8894A; color:#fff; border:2px solid #fff; box-shadow:0 1px 5px rgba(0,0,0,.6); font:700 12px Inter,system-ui,sans-serif; line-height:1; cursor:pointer;}" +
    ".pm-pin[aria-pressed=true]{background:#4B7A5E; width:34px; height:34px; font-size:14px; z-index:2;}" +
    ".pm-credit{font-size:.74rem; color:#5A6672; margin:6px 0 0; line-height:1.4;}" +
    ".pm-detail{border-left:4px solid #4B7A5E; background:#EEF3EE; padding:12px 14px; border-radius:0 6px 6px 0; margin:12px 0; min-height:56px; line-height:1.5;}" +
    ".pm-detail h3{margin:0 0 4px; font-size:1.05rem;}" +
    ".pm-detail p{margin:0; font-size:.93rem; white-space:pre-wrap;}" +
    ".pm-list{list-style:none; margin:0; padding:0; display:grid; gap:6px;}" +
    ".pm-list button{width:100%; text-align:left; display:flex; gap:10px; align-items:center; background:#F6F3ED; border:1px solid #DDD6C8; border-radius:6px; padding:9px 10px; font:inherit; color:inherit; cursor:pointer; line-height:1.4;}" +
    ".pm-list button[aria-current=true]{border-color:#4B7A5E; background:#EEF3EE;}" +
    ".pm-n{flex:none; width:26px; height:26px; border-radius:50%; background:#1B2A3A; color:#fff; font-size:.78rem; font-weight:700; display:flex; align-items:center; justify-content:center;}" +
    ".pm-muted{color:#5A6672; font-size:.9rem;}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function detail(p) { return p ? "<h3>" + esc(p.name || "(no name yet)") + "</h3><p>" + esc(p.about || "") + "</p>" : '<p class="pm-muted">Nothing selected yet.</p>'; }

  var PM = window.PrisonMap = {
    base: "",
    places: window.PRISON_PLACES || [],
    credit: "Aerial photograph: Tasmania State Orthophoto, from theLIST © State of Tasmania, CC BY-NC-ND 3.0 AU. Shown unaltered. Labels by the Onesimus Foundation.",
    html: function (sel) {
      var ps = PM.places;
      return '<div class="pm"><figure class="pm-fig"><img src="' + PM.base + 'risdon-aerial.jpg" width="1800" height="2335" alt="Aerial photograph of the Risdon Prison Complex">' +
        ps.map(function (p, i) { return '<button type="button" class="pm-pin" data-pm-i="' + i + '" aria-pressed="' + (i === sel) + '" aria-label="' + esc((i + 1) + ". " + (p.name || "no name yet")) + '" style="left:' + (p.x * 100).toFixed(2) + "%;top:" + (p.y * 100).toFixed(2) + '%">' + (i + 1) + "</button>"; }).join("") +
        '</figure><p class="pm-credit">' + esc(PM.credit) + '</p><div class="pm-detail" aria-live="polite">' + detail(ps[sel]) + '</div><ol class="pm-list">' +
        (ps.map(function (p, i) { return '<li><button type="button" data-pm-i="' + i + '"' + (i === sel ? ' aria-current="true"' : "") + '><span class="pm-n">' + (i + 1) + "</span><span>" + esc(p.name || "(no name yet)") + "</span></button></li>"; }).join("") || '<li class="pm-muted">No facilities labelled yet.</li>') + "</ol></div>";
    },
    select: function (root, i) {
      root.querySelectorAll(".pm-pin").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.pmI === i); });
      root.querySelectorAll(".pm-list button").forEach(function (b) { if (+b.dataset.pmI === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
      root.querySelector(".pm-detail").innerHTML = detail(PM.places[i]);
      if (PM.onselect) PM.onselect(i);
    }
  };
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-pm-i]"); if (!b) return;
    var root = b.closest(".pm"); if (!root) return;
    PM.select(root, +b.dataset.pmI);
    if (b.closest(".pm-list")) { var f = root.querySelector(".pm-fig"); if (f && f.scrollIntoView) f.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  });
})();
