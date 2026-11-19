// Events open for registration, read live from Wix Events.
// Events are created in the Wix dashboard; nothing here is typed in by hand.
// Registrations go straight to Wix (guest list, contacts).
import { queryEvents, getEventBySlug } from "./wix/wix-events-browse.js";
import { createRsvp } from "./wix/wix-events-registration.js";

const box = document.getElementById("wix-events");
const cbox = document.getElementById("wix-courses");
function listen(type, fn) { [box, cbox].forEach((b) => b && b.addEventListener(type, fn)); }

// Standing online courses. Each is a Wix event with no fixed date; the key is the event's slug in Wix.
// Registering here unlocks the course on this device and supplies the details for the certificate.
const COURSES = {
  "hidden-sentence-online-course": { key: "hidden-sentence", url: "hidden-sentence/index.html" },
  "practitioners-training-online-course": { key: "practitioner-training", url: "practitioner-training/index.html" },
};
function getReg(key) { try { return JSON.parse(localStorage.getItem("onesimus.reg." + key)); } catch (e) { return null; } }
function setReg(key, reg) { try { localStorage.setItem("onesimus.reg." + key, JSON.stringify(reg)); return true; } catch (e) { return false; } }

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---- date, time and place ----------------------------------------------------

function whenParts(ev, weekday) {
  const d = ev.dateAndTimeSettings || {};
  if (d.dateAndTimeTbd || !d.startDate) return null;
  const tz = d.timeZoneId || "Australia/Hobart";
  const start = new Date(d.startDate);
  const day = new Intl.DateTimeFormat("en-AU", { weekday, day: "numeric", month: "long", year: "numeric", timeZone: tz }).format(start);
  const t = (x) => new Intl.DateTimeFormat("en-AU", { hour: "numeric", minute: "2-digit", timeZone: tz }).format(x).replace(":00", "");
  const end = d.endDate ? " to " + t(new Date(d.endDate)) : "";
  return { day, time: t(start) + end };
}

function whenText(ev) {
  const w = whenParts(ev, "short");
  return w ? w.day + "<br>" + w.time : esc((ev.dateAndTimeSettings || {}).dateAndTimeTbdMessage || "Date to be confirmed");
}

// One line, for the details box, the registration form and the confirmation.
function whenLine(ev) {
  const w = whenParts(ev, "long");
  return w ? w.day + ", " + w.time : (ev.dateAndTimeSettings || {}).dateAndTimeTbdMessage || "Date to be confirmed";
}

function whereText(ev) {
  const l = ev.location || {};
  if (l.locationTbd) return esc(l.name || "Venue to be confirmed");
  if (l.type === "ONLINE") return "Online";
  const a = l.address || {};
  return [l.name, a.city].filter(Boolean).map(esc).join(", ");
}

// Venue name and full street address, as plain text.
function whereLine(ev) {
  const l = ev.location || {};
  if (l.locationTbd) return l.name || "Venue to be confirmed";
  if (l.type === "ONLINE") return "Online";
  const a = l.address || {};
  const street = (a.formattedAddress || [a.addressLine, a.city, a.postalCode].filter(Boolean).join(", ")).replace(/,\s*Australia$/, "");
  if (!l.name) return street;
  return street && !street.startsWith(l.name) ? l.name + ", " + street : l.name;
}

function mapLink(ev) {
  const l = ev.location || {};
  const a = (l.address || {}).formattedAddress;
  if (l.locationTbd || l.type === "ONLINE" || !a) return "";
  return ' <a class="ev-map" href="https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(a) + '" target="_blank" rel="noopener">Map</a>';
}

// ---- the event's long description (Wix rich text) ----------------------------

function richText(n) {
  let t = esc((n.textData && n.textData.text) || "").replace(/\n/g, "<br>");
  for (const d of (n.textData && n.textData.decorations) || []) {
    if (d.type === "BOLD") t = "<b>" + t + "</b>";
    else if (d.type === "ITALIC") t = "<i>" + t + "</i>";
    else if (d.type === "LINK") {
      const url = (d.linkData && d.linkData.link && d.linkData.link.url) || "";
      if (/^(https?:|mailto:|tel:)/i.test(url)) t = '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + t + "</a>";
    }
  }
  return t;
}

function rich(nodes, inList) {
  return (nodes || []).map((n) => {
    const inner = () => rich(n.nodes, inList);
    switch (n.type) {
      case "TEXT": return richText(n);
      case "PARAGRAPH": { const h = inner(); return inList ? h : h ? "<p>" + h + "</p>" : ""; }
      case "HEADING": return "<h4>" + inner() + "</h4>";
      case "BULLETED_LIST": return "<ul>" + inner() + "</ul>";
      case "ORDERED_LIST": return "<ol>" + inner() + "</ol>";
      case "LIST_ITEM": return "<li>" + rich(n.nodes, true) + "</li>";
      default: return inner();
    }
  }).join("");
}

// ---- rows, details and form --------------------------------------------------

function rowHtml(ev) {
  const reg = ev.registration || {};
  const open = reg.type === "RSVP" && /^OPEN/.test(reg.status || "");
  let action;
  if (open) action = '<button type="button" class="ev-rsvp reg-open" data-id="' + esc(ev.id) + '">Register</button>';
  else if (reg.type === "EXTERNAL" && reg.external && reg.external.url) action = '<a class="ev-rsvp" href="' + esc(reg.external.url) + '" target="_blank" rel="noopener">Register</a>';
  else action = '<span class="ev-rsvp full">Registration closed</span>';
  const course = COURSES[ev.slug];
  if (course && getReg(course.key)) action = '<a class="ev-rsvp ev-go" href="' + course.url + '">Continue the course</a>';
  return (
    '<div class="ev-row" data-row="' + esc(ev.id) + '">' +
    '<div class="ev-cadence">' + whenText(ev) + "</div>" +
    '<div><div class="ev-name">' + esc(ev.title) + "</div>" +
    (ev.shortDescription ? '<p class="ev-desc">' + esc(ev.shortDescription) + "</p>" : "") +
    '<button type="button" class="ev-more" data-id="' + esc(ev.id) + '" aria-expanded="false" aria-controls="det-' + esc(ev.id) + '">' + (course ? "About this course" : "Date, place and details") + "</button></div>" +
    '<div class="ev-cadence">' + whereText(ev) + "</div>" +
    action +
    "</div>" +
    '<div class="ev-details" id="det-' + esc(ev.id) + '" hidden></div>' +
    '<div class="reg-panel" id="reg-' + esc(ev.id) + '" hidden></div>'
  );
}

function detailsHtml(ev, full) {
  const about = full && full.description ? rich(full.description.nodes) : "";
  return (
    '<dl class="ev-facts">' +
    "<dt>When</dt><dd>" + esc(whenLine(ev)) + "</dd>" +
    "<dt>Where</dt><dd>" + esc(whereLine(ev)) + mapLink(ev) + "</dd>" +
    "<dt>Cost</dt><dd>Free. Registration is needed.</dd>" +
    "</dl>" +
    (about ? '<div class="ev-about"><h3>' + (COURSES[ev.slug] ? "About this course" : "About this event") + "</h3>" + about + "</div>" : "")
  );
}

// Extra questions come from the event's own form in Wix (Events > the event > Registration form),
// so a question added or removed there shows up here without touching this page.
function extraControls(full) {
  const controls = (full && full.form && full.form.controls) || [];
  return controls
    .filter((c) => !c.system && !c.deleted && ["INPUT", "TEXTAREA", "RADIO", "DROPDOWN", "CHECKBOX"].includes(c.type))
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
}

function extraHtml(c) {
  const i = (c.inputs || [])[0];
  if (!i) return "";
  const name = "x:" + esc(i.name);
  const req = i.mandatory ? " required" : "";
  const label = "<span>" + esc(i.label) + (i.mandatory ? "" : ' <span class="reg-opt">(optional)</span>') + "</span>";
  const max = i.maxLength ? ' maxlength="' + Number(i.maxLength) + '"' : "";
  if (c.type === "INPUT") return '<label class="wide">' + label + '<input name="' + name + '"' + max + req + "></label>";
  if (c.type === "TEXTAREA") return '<label class="wide">' + label + '<textarea name="' + name + '" rows="3"' + max + req + "></textarea></label>";
  if (c.type === "DROPDOWN")
    return '<label class="wide">' + label + '<select name="' + name + '"' + req + '><option value="">Please choose</option>' +
      (i.options || []).map((o) => '<option value="' + esc(o) + '">' + esc(o) + "</option>").join("") + "</select></label>";
  const kind = c.type === "RADIO" ? "radio" : "checkbox";
  return '<fieldset class="reg-choice wide" data-kind="' + kind + '" data-name="' + esc(i.name) + '"' + (i.mandatory ? ' data-required="1"' : "") + "><legend>" + label + "</legend>" +
    (i.options || []).map((o) => '<label><input type="' + kind + '" name="' + name + '" value="' + esc(o) + '"> ' + esc(o) + "</label>").join("") + "</fieldset>";
}

function formHtml(ev, extras) {
  const id = esc(ev.id);
  return (
    '<form class="reg-form" data-id="' + id + '" novalidate>' +
    '<p class="reg-title">Register for: <b>' + esc(ev.title) + "</b></p>" +
    '<p class="reg-when">' + esc(whenLine(ev)) + "<br>" + esc(whereLine(ev)) + "</p>" +
    '<div class="reg-fields">' +
    '<label>First name<input name="firstName" autocomplete="given-name" required></label>' +
    '<label>Last name<input name="lastName" autocomplete="family-name" required></label>' +
    '<label class="wide">Email<input name="email" type="email" autocomplete="email" required></label>' +
    extras.map(extraHtml).join("") +
    "</div>" +
    '<p class="reg-msg" role="alert" hidden></p>' +
    '<div class="reg-actions"><button type="submit" class="reg-submit">Send registration</button>' +
    '<button type="button" class="reg-cancel">Cancel</button></div>' +
    '<p class="reg-small">Registration is free. We use your details only for this event and to let you know about it.</p>' +
    "</form>"
  );
}

function friendly(err) {
  const text = (err && err.message) || "";
  if (/already|duplicate|exists/i.test(text)) return "This email address is already registered for this event.";
  if (/closed|not open/i.test(text)) return "Registration for this event has closed.";
  if (/limit|full|capacity/i.test(text)) return "Sorry, this event is full.";
  if (/email/i.test(text)) return "Please check the email address and try again.";
  return "Sorry, that did not go through. Please try again, or phone 0401 690 954.";
}

let events = [];
const fullCache = new Map();

// The full event (long description and registration questions) is fetched once, when first needed.
function getFull(ev) {
  if (!fullCache.has(ev.id)) fullCache.set(ev.id, getEventBySlug(ev.slug));
  return fullCache.get(ev.id);
}

async function load() {
  try {
    const res = await queryEvents({ limit: 20 });
    events = res.events || [];
  } catch (e) {
    box.innerHTML = '<p class="reg-empty">The list of events could not be loaded just now. Please try again later, or phone 0401 690 954.</p>';
    if (cbox) cbox.innerHTML = '<p class="reg-empty">The online courses could not be loaded just now. Please try again later, or phone 0401 690 954.</p>';
    return;
  }
  const dated = events.filter((e) => !COURSES[e.slug]);
  const order = Object.keys(COURSES);
  const courses = events.filter((e) => COURSES[e.slug]).sort((x, y) => order.indexOf(x.slug) - order.indexOf(y.slug));
  box.innerHTML = dated.length ? dated.map(rowHtml).join("") : '<p class="reg-empty">No events are open for registration at the moment.</p>';
  if (cbox) cbox.innerHTML = courses.length ? courses.map(rowHtml).join("") : '<p class="reg-empty">The online courses are not open for registration at the moment.</p>';
}

listen("click", async (e) => {
  const moreBtn = e.target.closest(".ev-more");
  if (moreBtn) {
    const ev = events.find((x) => x.id === moreBtn.dataset.id);
    const panel = document.getElementById("det-" + ev.id);
    if (!panel.hidden) {
      panel.hidden = true;
      moreBtn.setAttribute("aria-expanded", "false");
      return;
    }
    moreBtn.setAttribute("aria-expanded", "true");
    panel.innerHTML = detailsHtml(ev, null);
    panel.hidden = false;
    const full = await getFull(ev);
    if (full) panel.innerHTML = detailsHtml(ev, full);
    else fullCache.delete(ev.id);
    return;
  }
  const openBtn = e.target.closest(".reg-open");
  if (openBtn) {
    const ev = events.find((x) => x.id === openBtn.dataset.id);
    const panel = document.getElementById("reg-" + ev.id);
    if (!panel.hidden) return;
    panel.innerHTML = '<p class="reg-small" style="margin:0;">Loading the form…</p>';
    panel.hidden = false;
    const full = await getFull(ev);
    if (panel.hidden) return;
    if (!full) {
      fullCache.delete(ev.id);
      panel.innerHTML = '<p class="reg-msg" role="alert" style="margin:0;">The registration form could not be loaded just now. Please try again, or phone 0401 690 954.</p>';
      return;
    }
    panel.innerHTML = formHtml(ev, extraControls(full));
    panel.querySelector("input").focus();
    return;
  }
  if (e.target.closest(".reg-cancel")) {
    const panel = e.target.closest(".reg-panel");
    panel.hidden = true;
    panel.innerHTML = "";
  }
});

listen("submit", async (e) => {
  const form = e.target.closest(".reg-form");
  if (!form) return;
  e.preventDefault();
  const msg = form.querySelector(".reg-msg");
  const fd = new FormData(form);
  const firstName = fd.get("firstName").trim(), lastName = fd.get("lastName").trim(), email = fd.get("email").trim();
  msg.hidden = true;
  if (!firstName || !lastName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    msg.textContent = "Please fill in your first name, last name and a valid email address.";
    msg.hidden = false;
    return;
  }
  // Answers to the event's extra questions; unanswered optional ones are left out.
  const extraFields = {};
  const answers = {};
  let missing = "";
  for (const el of form.querySelectorAll('.reg-fields [name^="x:"]')) {
    const key = el.name.slice(2);
    if (el.type === "radio" || el.type === "checkbox") continue;
    const v = el.value.trim();
    if (v) { extraFields[key] = v; answers[el.closest("label").firstChild.textContent.replace("(optional)", "").trim()] = v; }
    else if (el.required && !missing) missing = el.closest("label").firstChild.textContent.trim();
  }
  for (const set of form.querySelectorAll(".reg-choice")) {
    const picked = [...set.querySelectorAll("input:checked")].map((x) => x.value);
    if (picked.length) extraFields[set.dataset.name] = set.dataset.kind === "radio" ? picked[0] : picked;
    else if (set.dataset.required && !missing) missing = set.querySelector("legend").firstChild.textContent.trim();
  }
  if (missing) {
    msg.textContent = "Please answer: " + missing + ".";
    msg.hidden = false;
    return;
  }
  const btn = form.querySelector(".reg-submit");
  btn.disabled = true;
  btn.textContent = "Sending…";
  const ev = events.find((x) => x.id === form.dataset.id);
  const course = COURSES[ev.slug];
  // A course registration is kept on this device: it unlocks the course and fills in the certificate.
  const courseDone = (again) => {
    const pick = (re) => { const k = Object.keys(answers).find((x) => re.test(x)); return k ? answers[k] : ""; };
    const kept = setReg(course.key, { firstName, lastName, email, organisation: pick(/^organisation/i), position: pick(/position/i), paidOrVolunteer: pick(/paid/i), registered: new Date().toISOString() });
    form.parentElement.innerHTML =
      '<div class="reg-done" role="status"><b>' + (again ? "You were already registered." : "You are registered.") + "</b> Thank you, " + esc(firstName) + ". " +
      (kept ? "You can start the course now. Your name and organisation will appear on your certificate." +
          '<p style="margin:14px 0 0;"><a class="reg-submit" style="display:inline-block; text-decoration:none;" href="' + course.url + '">Start the course &rarr;</a></p>'
        : "This browser would not save your registration, so the course cannot open here. Please allow site data (or leave private browsing) and register again.") +
      "</div>";
    const btn0 = document.querySelector('.ev-row[data-row="' + ev.id + '"] .reg-open');
    if (kept && btn0) btn0.outerHTML = '<a class="ev-rsvp ev-go" href="' + course.url + '">Continue the course</a>';
  };
  try {
    const rsvp = await createRsvp(form.dataset.id, { firstName, lastName, email, extraFields });
    if (course) return courseDone(false);
    const waitlist = rsvp && rsvp.status === "WAITLIST";
    form.parentElement.innerHTML =
      '<div class="reg-done" role="status"><b>' + (waitlist ? "You are on the waiting list." : "You are registered.") + "</b> " +
      (waitlist ? "This event is full. We will be in touch if a place opens up." : "Thank you, " + esc(firstName) + ". We have your registration for " + esc(ev.title) + ".") +
      '<p class="reg-when" style="margin:10px 0 0;">' + esc(whenLine(ev)) + "<br>" + esc(whereLine(ev)) + "</p>" +
      "</div>";
  } catch (err) {
    // Someone who registered before (say, on another device) is let straight in.
    if (course && /already|duplicate|exists/i.test((err && err.message) || "")) return courseDone(true);
    msg.textContent = friendly(err);
    msg.hidden = false;
    btn.disabled = false;
    btn.textContent = "Send registration";
  }
});

load();
