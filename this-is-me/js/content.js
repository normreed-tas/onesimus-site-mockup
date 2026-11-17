/* "This is me" phone guide: a concept for the Prison Reform Trust's Child Impact Assessment framework.
   IMPORTANT: every prompt and note here is stand-in wording written by Onesimus to show how the guide works.
   It follows the structure of PRT's documents but is not their text. PRT's own wording would replace it. */
window.CIA = {};
CIA.PRT = "https://prisonreformtrust.org.uk/project/women-the-criminal-justice-system/child-impact-assessment-project/";
CIA.docs = {
  mum: ["Child Impact Assessment: mum", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Child-Impact-Assessment-for-children-with-a-mum-in-the-justice-system-2511.pdf"],
  mumNotes: ["Accompanying notes: mother", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Accompanying-notes-for-anyone-supporting-a-child-with-a-mother-in-the-justice-system-2511.pdf"],
  dad: ["Child Impact Assessment: dad", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Child-Impact-Assessment-for-children-with-a-dad-in-the-justice-system-2511.pdf"],
  dadNotes: ["Accompanying notes: father", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Accompanying-notes-for-anyone-supporting-a-child-with-a-father-in-the-justice-system-2511.pdf"],
  brother: ["Child Impact Assessment: brother", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Child-Impact-Assessment-for-children-with-a-brother-in-the-justice-system-2511.pdf"],
  brotherNotes: ["Accompanying notes: brother", "https://prisonreformtrust.org.uk/wp-content/uploads/2025/11/Accompanying-notes-for-anyone-supporting-a-child-with-a-brother-in-the-justice-system-2511.pdf"],
  toolkit: ["\"This is me\" toolkit", "https://prisonreformtrust.org.uk/child-impact-assessment-toolkit/"],
  principles: ["Guiding principles", "https://prisonreformtrust.org.uk/wp-content/uploads/2022/11/CIA-Guiding-Principles.pdf"],
  faqs: ["Framework FAQs", "https://prisonreformtrust.org.uk/wp-content/uploads/2024/04/Child-Impact-Assessment-Framework-FAQs-FINAL.pdf"],
  training: ["Training and useful resources", "https://prisonreformtrust.org.uk/wp-content/uploads/2022/03/Training-and-useful-resources-July-2025-update.pdf"],
  phase3: ["Phase three report (November 2026)", "https://prisonreformtrust.org.uk/child-impact-assessment-report-of-phase-three-activities/"],
  podcast: ["Podcast with young people", "https://youtu.be/zRFQE45fdI4"],
  talk: ["Narrated presentation", "https://youtu.be/aGvHObdLcy0"]
};

CIA.who = [
  { id: "mum", word: "mum", their: "her", they: "she", carer: "the person looking after me", doc: "mum", notes: "mumNotes" },
  { id: "dad", word: "dad", their: "his", they: "he", carer: "my mum or the person looking after me", doc: "dad", notes: "dadNotes" },
  { id: "brother", word: "brother", their: "his", they: "he", carer: "my mum, dad or the person looking after me", doc: "brother", notes: "brotherNotes" }
];

CIA.stages = [
  { id: "arrest", t: "Arrested", line: "The police have taken my {w} away", extra: [] },
  { id: "court", t: "Going to court", line: "My {w} has to go to court", extra: ["What I'd like the court to know about me and my family"] },
  { id: "community", t: "A sentence in the community", line: "My {w} is at home, with rules to follow", extra: ["Words I'd like explained, like \"tag\" or \"curfew\""] },
  { id: "prison", t: "In prison", line: "My {w} is in prison", extra: ["What I'd like to know about where my {w} is", "How I'd like to keep in touch, if I want to"] },
  { id: "release", t: "Coming out", line: "My {w} is coming out of prison", extra: ["What I'm looking forward to", "What I'm worried about"] }
];
/* The prompts every stage shares. {w} = mum / dad / brother. */
CIA.core = ["How I feel about what has happened", "Questions I have", "People who help me"];
CIA.coreAfter = ["Something I'd like my {w} to know", "Something I'd like {c} to know", "Anything else I want to say"];

CIA.aboutMe = ["What makes me happy", "Things I like doing", "Someone I trust, who knows me well", "What I hope for"];
CIA.aboutThem = ["My {w} is…", "What I like about my {w}", "What is hard", "What other people have said about my {w}"];

/* Notes for the helper, by stage. Stand-in summaries of PRT's accompanying notes. */
CIA.notes = {
  arrest: { feel: ["Fright, nightmares, or going over what they saw.", "Not trusting the police.", "Not knowing where their parent or brother has gone."], do: ["Let them talk through the arrest, at their pace.", "With consent, let the school know.", "If they want it, help arrange a calm conversation with the police.", "Think about a referral for therapy if the distress stays."] },
  court: { feel: ["Confusion about the words and what happens.", "Wanting the person deciding to know about them."], do: ["Answer their questions, or find out together.", "Offer a visit to see an empty court room.", "Help them write to the people making the decision."] },
  community: { feel: ["Mixed feelings.", "Questions about tags and curfews.", "Contact that has changed."], do: ["Explain the rules that now apply at home.", "Look again at how and when they see the person.", "Help them write a letter if things are hard to say."] },
  prison: { feel: ["Worry about how the person is.", "Worry about visits: the travel, the searches, the building.", "Relief, and guilt about feeling relieved."], do: ["Find out together what daily life in prison is like.", "Explain the kinds of visit, including video calls.", "Come back to decisions about visiting. A no today can be a yes later."] },
  release: { feel: ["Excitement and fear together.", "Hopes that may be bigger than what's likely.", "Getting used to the family changing again."], do: ["Talk about fears as well as hopes.", "Help them write to the person before release.", "Plan the support that carries on afterwards."] }
};

CIA.principles = [
  "Every child deserves support in their own right, whatever their parent or brother is accused or convicted of.",
  "Listen without judging, and without assuming what is best for them.",
  "Where it's suitable, children take a real part in decisions that affect them.",
  "A child can change their mind.",
  "A child can say no to support now, and yes later.",
  "Be gentle. Keep in mind what the child may have been through.",
  "Brothers and sisters are separate people. Each may need, and choose, something different.",
  "Every child has the potential to flourish."
];

CIA.faqs = [
  ["Do we need to be part of an official pilot?", "No. Any practitioner working with a child who has a parent in the justice system can use it."],
  ["Who can use it?", "Anyone supporting children: health, education, social work, specialist charities."],
  ["How do I raise it with a family?", "Gently, as an offer. Families may feel ashamed, and a child can say no."],
  ["Should I follow up?", "Give the family time, and come back to it gently if that seems right."],
  ["What if the child wants to work with someone else?", "The child chooses who helps them. Point them to that person or organisation."],
  ["What if the person the child chooses has no training?", "Kindness and not judging matter most. The toolkit lists training."],
  ["What if that person doesn't know about the justice involvement?", "Make sure the child understands this. With their permission, help with a first conversation."],
  ["Can a family use it without a practitioner?", "Yes. Families have found it useful, including for talking with a parent in prison."],
  ["Is a parent's consent needed?", "Check the framework's own answer for your setting. It depends on consent your organisation already holds, and on data protection rules for younger children."],
  ["What if the child wants it and a parent says no?", "Children have a right to give their views. Find out what worries the parent, and explain that this isn't a statutory process."],
  ["Does every section have to be filled in?", "No. Choose the parts that fit, across the stages."],
  ["Does it have to be done on a screen?", "No. It can be printed and written by hand, drawn, or talked through."],
  ["Can it be used with babies or children who don't use words?", "The questions aren't written for them, but the spirit applies: watch, and use creative ways in."],
  ["How are agreed actions recorded?", "In the child's own words. They can keep a copy."],
  ["How do we know it made a difference?", "The child is the best judge. The toolkit has an evaluation form."],
  ["What if a safeguarding concern comes up?", "Follow your organisation's safeguarding policy. A parent being in the justice system is not, in itself, a child protection concern."],
  ["Is what the child says shared?", "Not without telling the child. If there's a safeguarding concern, tell the child and pass it to those responsible."],
  ["Do we have to report back to the Prison Reform Trust?", "No, but feedback is welcome."]
];

CIA.stories = [
  ["Brad", "A teenager's frightening experience of his mother's arrest, and how it could have gone."],
  ["Carly and Leah", "Two sisters left alone after an arrest."],
  ["Kai", "A sentence that split a family."],
  ["Alena", "A girl who stopped wanting to visit her mother, and found her way back."],
  ["Cooper", "A boy who found prison visits very hard."],
  ["Jade", "A girl worried by her mother's community sentence."],
  ["Leon, Dawson and Callie", "Brothers and a sister getting ready for their mother's release."],
  ["Amari", "A toddler whose contact stopped while his mother was in prison."]
];

CIA.help = [
  { name: "Emergency", num: "999", about: "If you or someone else is in danger right now." },
  { name: "Childline", num: "0800 1111", about: "Free and private, for anyone under 19 in the UK. Any time, about anything." },
  { name: "Prisoners' Families Helpline", num: "0808 808 2003", about: "Free and confidential, for anyone with a family member in the justice system in England and Wales. Monday to Friday 9am to 8pm, weekends 10am to 3pm." }
];
