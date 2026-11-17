/* Hidden Sentence: online edition. Content only; app.js draws it.
   SOURCE: Hidden Sentence Training manual (March 2023), program (Aug 2019), slides with virtual tour (Aug 2022),
   training cards, "Supporting children and young people" slides, the visit flowchart.
   "orig" = the course's own wording, shown in a fold-out. "flag" = a review note, shown in Reviewer view. */
window.HS = { modules: [], cases: [], noPhotos: true };
HS.FG = "https://normreed-tas.github.io/field-guide/";
HS.passMark = 6;

HS.modules.push({ id: "welcome", title: "Welcome", short: "What a hidden sentence is", mins: 5, color: "#1B2A3A", icon: "door", blocks: [
  { quote: "It's not just the prisoner that's punished is it? It's the whole family.", who: "Mother, quoted in the Practitioner's Guide" },
  "When a court sends someone to prison, it sentences one person. But a partner, children, parents, brothers and sisters live with that sentence too. Nobody handed it down, and mostly nobody sees it. That is the hidden sentence.",
  "This course is an introduction for anyone in Tasmania whose work brings them into contact with families: teachers, health and family workers, police, corrections staff, chaplains, volunteers.",
  { h: "What it covers" },
  ["the justice system, and who is in Tasmania's prisons", "what imprisonment does to a family and to children", "what a prison visit is like, with a tour of Risdon in photographs", "what support families and children need", "what you can do, and where to send people"],
  { h: "How it works" },
  ["Eight short modules. About an hour and a quarter in all.", "Stop whenever you like. Your place is kept on this device.", "A short knowledge check and a certificate at the end."],
  { tip: "Nothing you type leaves this device. You can clear your progress and notes at any time under About this course." },
  { flag: "The face-to-face day ran 9am to 3.45pm at Risdon Vale, with a tour of Hillside Haven and of the prison. This online edition is an introduction. The Practitioner's Training is the stage after it. Named staff contacts in the manual are left out, because several roles have changed." },
  { orig: "Hidden Sentence Training: The criminal justice system. The impact of imprisonment on family and society. The impact on children. The support needs of family and children. Support services and resources. Support strategies you can implement." }
] });

HS.modules.push({ id: "numbers", title: "Prisons, prisoners and families", short: "Eight questions to test what you know", mins: 10, color: "#B8894A", icon: "steps", blocks: [
  "The day always opened with a quiz. Have a go. Nobody is keeping score in this one.",
  { quiz: { id: "n1", q: "On an average day in 2025–26, how many people were in Tasmania's prisons?", options: ["448", "614", "845"], answer: 2, why: "845, up 7.9% on the year before, with a new high of 882 in April 2026 (Department of Justice Annual Report 2025–26). In 2014 the count was 448." } },
  { quiz: { id: "n2", q: "Does Tasmania imprison people at a higher rate than Australia as a whole?", options: ["Yes", "No", "About the same"], answer: 1, why: "No. Tasmania's rate is 169 per 100,000 adults, against 211 nationally (Report on Government Services 2026). But Tasmania's rate has been rising." } },
  { quiz: { id: "n3", q: "What does it cost to keep one person in a Tasmanian prison for a day?", options: ["About $150", "About $300", "About $500"], answer: 2, why: "About $508 a day, against $326 nationally (Report on Government Services 2026). When this course began the figure was $305." } },
  "But what is the real cost of imprisonment?",
  { quiz: { id: "n4", q: "How many people released from Tasmanian prisons are back under sentence within two years?", options: ["About a quarter", "Just under half", "Three quarters"], answer: 1, why: "46.6% (Report on Government Services 2026). It counts returns to prison, not all reoffending." } },
  { quiz: { id: "n5", q: "How many people entering prison have children who depend on them for their basic needs?", options: ["1 in 10", "1 in 3", "2 in 3"], answer: 1, why: "34%, about 1 in 3 (AIHW, The health of people in Australia's prisons 2025). Nobody counts the children themselves: there is no official figure for Tasmania." } },
  { quiz: { id: "n6", q: "How many people entering prison had a parent or carer in prison when they were a child?", options: ["1 in 20", "1 in 5", "1 in 2"], answer: 1, why: "21%, about 1 in 5 (AIHW 2025). A parent's imprisonment is one of the strongest predictors of a child's own offending. Even so, most children with a parent in prison never go to prison themselves." } },
  { quiz: { id: "n7", q: "Children who have a parent in prison are likely to…", options: ["do better at school", "change schools", "see more of their grandparents"], answer: 1, why: "Change schools, often more than once. Care arrangements change, families move to get away from stigma or because the money has gone, and some children drop out." } },
  { quiz: { id: "n8", q: "People in prison who keep in touch with their family are less likely to…", options: ["reoffend", "get parole", "finish their sentence"], answer: 0, why: "Reoffend (Duwe & Clark 2011). Family contact is one of the few things known to help. It matters for the person in prison, and it matters for the child." } },
  { flag: "Figures updated from the course's 2019–2021 numbers to the site's checked figures (justice figures page). Left out: \"75% of prisoners are parents\", \"1093 children in six months, 9% involved with CSS\", \"born overseas\", the cost of community supervision, \"boys are six times more likely\" and \"39% less likely to reoffend\": no current source in hand. To confirm: the source of the school-moves study." },
  { orig: "Ice breaker (match the question with the answer): How many prisoners in Tasmania? What percentage of prisoners in Tasmania were born overseas? What is the rate of imprisonment per 100,000 population in Australia? In Tasmania? How much does it cost to keep one prisoner per day? How much per day does it cost to provide supervision for a community based sentence? What percentage of prisoners are parents? What percentage of prisoners had children who had depended on them for their basic needs? Children who have a parent in prison are likely to… Children who have a parent in prison have an increased risk of… Is a child who has a parent in prison more likely to end up in prison themselves? Prisoners who keep in touch with their family are less likely to…" }
] });

HS.modules.push({ id: "hidden", title: "Two fathers", short: "A loss nobody is allowed to mourn", mins: 10, color: "#8A4F7D", icon: "chat", blocks: [
  { h: "A story from a Tasmanian school" },
  "Julie-Anne Toohey was a teacher before she became a criminologist. This is how her research on Kids' Days at Risdon Prison begins.",
  { story: { paras: [
    "The origin of this research project can be attributed to a situation that arose in a school in which the researcher was teaching a number of years ago. The father of a nine year old boy was imprisoned – knowledge of this situation arose via ‘the grapevine’ and general gossip within the school community. The mother of the young boy felt unable to communicate with the school regarding the family’s changed circumstances, and so speculation and conjecture arose, the young boy withdrew into himself, stigmatisation and teasing reared their ugly heads – and very little was done to either acknowledge or address the needs of this vulnerable and confused child. As staff members, we were requested by those in charge at the school to ‘protect’ the boy by avoiding any reference to his situation, to ignore it, and to not speak to him about it.",
    "At around the same time, the father of four of the school’s children, a man of just 35 years of age and an active contributor to the school community, died in rather sudden and unforeseen circumstances. The outpouring of grief within the school and beyond was significant, and much was done to help and support the children and their bereaved mother. Most of the school community attended the funeral service, and the public acknowledgement of the loss to the family of their precious father was considerable. The children, upon returning to school after spending time in the care of extended family, were embraced and nurtured, and knew that at all times there were support mechanisms in place to comfort and guide them when their upsetting state of affairs threatened to overwhelm them.",
    "It became apparent to the researcher that the loss of a father to incarceration evoked a totally different public reaction to that of the loss of a father to death. The school community did not consist of uncaring people – quite the reverse in fact. However, the young boy with the imprisoned father was attempting to deal with a loss that in many ways resembled that of a loved father to death, but he did not have the advantage of public validation of this loss, nor the support of those upon whom he could reasonably be expected to depend, the researcher included.",
    "While the children of the father who died were able to remain in the family home, with the constant attendance and attention of family and friends, the young lad with the imprisoned father was forced to move from his home as his mother’s financial circumstances deteriorated, his peer group distanced themselves, and he became increasingly isolated. I am ashamed to say that the school breathed an almost audible sigh of relief as the change in housing necessitated a change of school, and the young boy moved away to become ‘somebody else’s problem’.",
    "As I re-entered the field of academia and developed an interest in Criminology, thoughts of that young boy returned frequently, and I heartily wished that I could have my time over again to address the mistakes of the past. I often wonder what became of him, and whether he was able to move beyond the stigma and sense of shame that having a parent in prison evoked."
  ], who: "Julie-Anne Toohey, ‘It was almost normal’: The Significance of Kids’ Days at Tasmania’s Risdon Prison in Maintaining Connections Between Children and Their Incarcerated Parents. Master’s thesis, University of Tasmania, 2012. Reproduced with the author’s permission." } },
  "Both boys had lost a father. Only one loss was allowed to be seen.",
  { reflect: { id: "h-two", prompt: "What could that school have done differently, without breaking the family's privacy?", pointsTitle: "Some possibilities", points: ["One trusted adult quietly lets the mother know the school is on her son's side.", "Staff are told to treat him normally, and to notice him: not to avoid him.", "Teasing is dealt with as bullying, whatever it's about.", "Someone asks the boy how he's going, and means it.", "When the family moves, the new school is told enough to help, with the mother's agreement."] } },
  { h: "What changes at home" },
  ["who looks after them", "their house, school and community", "the family's routine", "their relationships", "the money", "their role in the family: some children become carers", "how the adults around them feel and behave"],
  "Add those up and what you have is loss and grief.",
  { quote: "Since dad's been away my grades have dropped dramatically. Just trying to find time to do homework… I'm always running around for everybody else.", who: "Mel, aged 17" },
  { quote: "I was living on the floor of her son's bedroom… and she was like, 'I'm sorry but you're going to have to find somewhere else to live, we don't have the room.'", who: "Erin, aged 15" },
  { h: "It's different for every child" },
  ["their age", "whether the person was someone they depended on for care", "what the offence was", "what life was like before", "what they saw: the arrest, the court, the news", "their own resilience"],
  "And what a child needs changes over time.",
  { h: "What you might see" },
  ["moodiness, aggression, or chattering more than usual", "bullying, or trouble with other children", "seeming withdrawn", "poor concentration, tiredness, losing interest in schoolwork", "hostility to people in authority", "bedwetting, or not wanting to be apart from a carer", "using alcohol or other drugs", "self-harm, or talk of suicide"],
  { warn: "If a child talks about self-harm or suicide, act on it that day. Follow your organisation's procedure. If they're in danger now, call 000." },
  { flag: "The two-fathers story is the opening of Julie-Anne Toohey's Master's thesis (University of Tasmania, 2012), in her own words, as Norm reads it in the face-to-face course. Norm reports she is happy for it to be online (17 Nov 2026) and will send her a link to confirm. Until she has confirmed, treat \"Reproduced with the author's permission\" as pending. The young people's quotes are from the course slides; their published source is to be confirmed." },
  { orig: "Supporting children and young people. Changes to family and home environment: Change in care giver. Change in house, school and community. Change in family routine. Change in relationships. Change in financial wellbeing. Change in role within the family. Change in emotions and behaviours of carers. = Loss and Grief. The impact on children and young people will vary: Age. Was the offender a key attachment figure. Nature of the offence. Resilience. What life was like before the offender was incarcerated. Associated trauma around the crime and the process of the criminal justice system. The impact and what the child needs and / or wants is likely to change over time." }
] });

HS.modules.push({ id: "system", title: "The justice system", short: "Five stages, and what families face at each", mins: 10, color: "#2F6F73", icon: "shield", blocks: [
  "You don't need to be an expert. You need enough of a map to explain what's happening, and to know where to send people for the rest.",
  { h: "1. Arrest" }, "Tasmania Police, and sometimes Child Safety. Shock, or relief. Children may have seen it. Without bail, the person usually goes first to Hobart or Launceston Reception Prison.",
  { h: "2. Court and remand" }, "Courts, lawyers, often Legal Aid. Confusing words, long waits, dates that move, news reports. A person on remand has not been found guilty.",
  { h: "3. In prison" }, "The Tasmania Prison Service. Long trips to Risdon Vale, limited contact, pressure to send money, strained visits.",
  { h: "4. Release" }, "The Prison Service, Community Corrections, the Parole Board. Hope and worry at once. Most support goes to the person leaving. Some families fear the release.",
  { h: "5. Back in the community" }, "Community Corrections and other services. Learning to live together again, under new rules, with worries about money, housing and reoffending.",
  { h: "Who is where at Risdon" },
  ["Risdon Prison Complex: maximum and medium security, men", "Ron Barwick Prison: minimum security, men", "Mary Hutchinson Women's Prison", "Southern Remand Centre: men on remand", "The Visitor Reception Centre: where every visit starts"],
  { quiz: { id: "s1", q: "A mother tells you her partner is \"on remand\". What does that mean?", options: ["He has been found guilty and is waiting for his sentence to start.", "He is being held in prison while his case goes through court. He hasn't been found guilty.", "He is on parole."], answer: 1, why: "Remand means held while the case is before the court. It can last months, and nobody can tell the family how it will end. That uncertainty is its own strain." } },
  { tip: "When you don't know, say so. Send families to the Tasmania Prison Service's own pages for visits and contact, and to Tasmania Legal Aid for legal questions." },
  { links: [["The stages in the Field Guide", HS.FG + "#stages"], ["Where to get help", HS.FG + "#help"]] },
  { flag: "The day's session \"The Criminal Justice System\" had no slides in the files. This module follows Chapter 2.2 of the Practitioner's Guide. To confirm with TPS: the list of facilities at Risdon and how each is described." }
] });

HS.modules.push({ id: "gate", title: "Inside the gate", short: "A tour of Risdon in photographs", mins: 15, color: "#4B7A5E", icon: "door", blocks: [
  "On the training day, everyone walked through the prison as a visitor would. This is that walk in photographs. As you go, picture doing it for the first time, holding a child's hand.",
  { h: "Before you arrive" },
  ["Visits are booked ahead through the Visitor Reception Centre.", "The adult needs photo ID. Each child needs a Medicare, Healthcare or concession card.", "Up to three visitors at a time, children included.", "Arrive early. You check in before the visit.", "Nothing in, nothing out. Everything goes in a locker.", "There are rules about what you can wear."],
  { tip: "The photographs for this tour are still to come. Onesimus is arranging with the Tasmania Prison Service for new ones to be taken. Until then, each stop on the walk is described in words." },
  { h: "The complex from the air" },
  "Tap a numbered pin, or a name in the list, to see what each part of the prison is.",
  { map: { src: "../prison-map/?embed=1", full: "../prison-map/", title: "Aerial map of the Risdon Prison Complex" } },
  { h: "The walk in" },
  { tour: [
    { h: "Arriving" },
    { src: "t25", cap: "The road in. The first thing a family sees is a sign." },
    { src: "t26", cap: "\"Notice to all visitors.\" The sign says you are about to enter prison property, and what that means." },
    { src: "t27", cap: "The entrance to the Risdon Prison Complex." },
    { src: "t28", cap: "The fence line. For a child, this is often the moment it becomes real." },
    { h: "The Visitor Reception Centre", p: "Every visit starts here." },
    { src: "t30", cap: "The Visitor Reception Centre." },
    { src: "t31", cap: "The waiting area, where families check in and wait to be called." },
    { src: "t32", cap: "Lockers. Bags, phones, keys and toys all stay here. In these photographs a soft toy shows what a child will meet." },
    { src: "t33", cap: "Checking in at the scanner." },
    { src: "t34", cap: "A detection dog. Children can be told beforehand that the dog is doing its job, and that it's friendly." },
    { h: "The gatehouse", p: "Security, as at an airport." },
    { src: "t36", cap: "The X-ray machine." },
    { src: "t38", cap: "The hand-held metal detector." },
    { src: "t39", cap: "Looking across the complex." },
    { src: "t40", cap: "The way in." },
    { h: "The visit" },
    { src: "t42", cap: "The contact visits room. Tables and seats are fixed to the floor." },
    { src: "t43", cap: "Families sit together at a table. There is a fenced play corner for small children." },
    { src: "t44", cap: "The officers' station in the visits room." },
    { src: "t45", cap: "An outdoor visits area." },
    { src: "t46", cap: "A closed, or \"box\", visit. The visitor and the person in prison are separated by a screen." },
    { h: "Where people live", p: "Children ask: what is his bedroom like? Is he safe? What does he eat?" },
    { src: "t48", cap: "The walkway, known as the spine." },
    { src: "t49", cap: "A cell." },
    { src: "t50", cap: "A day room, where people in a unit eat and spend time." },
    { src: "t52", cap: "Inside a unit." },
    { h: "Family visits at Ron Barwick", p: "Minimum security." },
    { src: "t56", cap: "An outdoor area for family visits." },
    { src: "t57", cap: "A playroom for children." },
    { src: "t59", cap: "The playground." },
    { h: "The Southern Remand Centre" },
    { src: "t62", cap: "The Southern Remand Centre." },
    { src: "t67", cap: "Inside a unit." },
    { src: "t69", cap: "A cell." }
  ] },
  { reflect: { id: "g-tour", prompt: "Which part of that walk would be hardest for a six-year-old? What could an adult tell them beforehand?", pointsTitle: "What people said on the day", points: ["The dog, the scanner and the uniforms, if nobody has explained them.", "Leaving a favourite toy in the locker.", "Sitting at a fixed table for a long time with nothing to do.", "A closed visit: seeing Dad and not being able to touch him.", "Saying goodbye, and walking back out the same way."] } },
  { links: [["Tasmania Prison Service: visiting", "https://www.justice.tas.gov.au/prisonservice/contact-and-visits/visiting"], ["Taking a child to visit: the steps", HS.FG + "#visit"]] },
  { flag: "PHOTOGRAPHS: NONE IN THIS BUILD. The 2022 tour photographs are held back because they show security areas and are not cleared for release. Norm is talking with the Tasmania Prison Service about fresh photographs (17 Nov 2026). When they arrive: put them in img/ named as in js/content.js (t25.jpg and so on, or rename the src values), correct the captions, and remove noPhotos from the first line of content.js. To confirm with TPS: booking window (the slides say up to one week ahead), check-in time (the slides say at least half an hour before), clothing rules, and whether the photos still match the site." },
  { orig: "Virtual Prison Tour. Visitor Reception Centre: Visits can be booked up to one week ahead. Must check in at least half an hour before scheduled visit. Security checks for contraband. Nothing in / nothing out. Clothing restrictions. RPC Gate House. RPC Visits. Closed (Box) Visit. RPC Accommodation. Walk way or 'spine'. Ron Barwick Minimum Security Prison Family Visits. Southern Remand Centre." }
] });

HS.modules.push({ id: "visit", title: "To visit, or not to visit", short: "A child's first visit, and how to help", mins: 10, color: "#2E6CA4", icon: "child", blocks: [
  { h: "A visit through a child's eyes" },
  "The training day showed a film here, The Space In Between, in which children talk about visiting a parent in prison. A new film is being made for this course. Until it's ready, here is the story it will tell.",
  { ol: ["The night before. Clothes laid out. \"Mum says we're going to see Dad. I don't know what it looks like.\"", "The drive. A long road, and the questions a child carries: is he safe, what does he eat, will he be different?", "The Visitor Reception Centre. Mum shows her ID. Everything goes in a locker.", "Security. The scanner, the uniforms, the doors.", "The wait. A room of other families. \"I didn't know other kids did this.\"", "The visit. Dad walks in.", "Goodbye. The hardest part is the door.", "The drive home, and Monday. A teacher who knows asks how the weekend was."] },
  { h: "Should a child visit?" },
  "For most children, seeing the person helps. It answers the questions they've been carrying. But it isn't right for every child, and no child should be made to go.",
  { ol: ["Does the child want to visit? Talk about their wishes and fears. Don't promise anything yet.", "Is the child allowed to visit? For safety reasons, some people in prison can't have children visit.", "Is there an adult to take them? Under-18s must be with an adult.", "Has the person in prison agreed? They have to add each visitor to their list before you can book.", "Book the visit.", "Plan the trip, and think about whether to tell the school.", "Prepare the child: what they'll see, who will be there, what they can and can't take.", "Afterwards, check in. Children are often tired and upset after a visit, even a good one."] },
  { warn: "Few workers can take a child on a visit. Workers from the Department for Education, Children and Young People can, but special arrangements have to be made with the prison first." },
  "If a child can't visit, or doesn't want to, there are other ways to stay in touch: letters, drawings sent by post, and phone calls.",
  { quiz: { id: "v1", q: "An eight-year-old says she doesn't want to visit her father this time. Her grandmother asks you what to do. What do you suggest?", options: ["Take her anyway. Her father needs to see her.", "Don't force her. Ask what's worrying her, offer another way to stay in touch, and ask again another time.", "Stop the visits altogether."], answer: 1, why: "A child who doesn't want to visit shouldn't be made to. But a no today isn't a no for ever. Find out what's behind it, keep contact going another way, and come back to it." } },
  { links: [["Taking a child to visit: the full steps", HS.FG + "#visit"], ["Tools for talking with children", HS.FG + "#kidtools"]] },
  { flag: "FILM: The Space In Between is to be replaced by a new film (storyboard above; the children's lines are placeholders). The visit steps follow the course's flowchart, with the rule on workers accompanying children corrected (Norm, 16 Nov 2026)." },
  { orig: "Supporting a child to visit a prison: A Professionals' Flowchart. Does the child want to visit? Children who don't want to visit should not be forced to. Talk to the child about their wishes, feelings and any fears. Don't make any promises at this stage if you are unsure if a visit will be possible. Is the child allowed to visit? Do they have an adult to take them? Discuss the visit with the prisoner. Book the visit. Organise the visit. Inform the school. Prepare the child for the visit. During the visit. After the visit." }
] });

HS.modules.push({ id: "advise", title: "What would you advise?", short: "Six families, six questions", mins: 15, color: "#9A3B2E", icon: "help", blocks: [
  "Children and young people may need help to:",
  ["name, share and manage their feelings", "get honest information that answers their worries", "keep in contact with the person in prison, where that's right for them", "cope with changes at home", "manage what their friends know", "manage their own behaviour"],
  "On the day, groups worked through six short situations. Write what you'd say, then compare.",
  { reflect: { id: "a1", prompt: "Drew has been sent to prison. Theresa isn't sure whether to tell the children. Jemma is eight and Tom is four. What would you advise her?", pointsTitle: "Course notes", points: ["It's Theresa's decision. Help her think it through.", "Children usually know something is wrong, and may hear it from someone else.", "Tell them the truth in words that fit their age. Jemma and Tom need different amounts.", "Tell them it isn't their fault, and that Dad still loves them."] } },
  { reflect: { id: "a2", prompt: "Davinia is visiting Pete for the first time and is taking the children. How can you help them prepare?", pointsTitle: "Course notes", points: ["Walk them through what they'll see: the reception centre, the lockers, security, the visits room.", "Check the Prison Service's visiting page for ID and what can't be taken in.", "Help the children think of things to tell Dad.", "Plan something gentle for afterwards."] } },
  { reflect: { id: "a3", prompt: "Tom is ten. Since his mother Sharon went to prison, his behaviour has got worse at school and at home. He picks fights. What would be your approach?", pointsTitle: "Course notes", points: ["See the behaviour as grief and worry, not just naughtiness.", "Give him one adult he can talk to, and a way to say how he feels.", "Ask what he knows, and what he's worried about.", "Work with whoever is caring for him, and with the school."] } },
  { reflect: { id: "a4", prompt: "Judy wants to take Frank, who is eight, out of school to visit his Dad in prison. What advice can you give her?", pointsTitle: "Course notes", points: ["Visits matter. Missing a day of school for one can be worth it.", "If she tells the school, the absence can be recorded as approved, and a teacher can look out for Frank afterwards.", "It's her choice whether to tell them. Respect it."] } },
  { reflect: { id: "a5", prompt: "Ian is due for release in three months. His partner Robyn is worried about how she and the children will cope when he's back in the house. How can you help her prepare?", pointsTitle: "Course notes", points: ["Take the worry seriously. Release is hard for many families.", "Ask, gently, whether she and the children feel safe.", "Talk about what has changed while he's been away: routines, who decides what.", "Find out who is planning his release, and what support there is for her."] } },
  { reflect: { id: "a6", prompt: "Wendy has just been sentenced to three months. Her parents are looking after her two young children and need help. What can you suggest?", pointsTitle: "Course notes", points: ["Money first: Centrelink payments for carers, and help with the cost of visiting.", "Support for grandparents raising children.", "Tell the children's school or childcare, if the family agrees.", "Three months is short. Keep the children in touch with their mother."] } },
  { links: [["Where to get help: checked Tasmanian services", HS.FG + "#help"], ["Telling the children", HS.FG + "#telling"]] },
  { flag: "The six situations are word for word from the course slides (\"Judy… to visit her Dad\" corrected to \"his Dad\"). The course notes under each are new, written for this edition: the day relied on the facilitators here. They need Norm's review." }
] });

HS.modules.push({ id: "finish", title: "What's next", short: "A short check, your certificate, and where to go from here", mins: 5, color: "#1B2A3A", icon: "print", final: true, blocks: [
  { h: "Knowledge check" },
  "Eight questions. You need six to unlock your certificate. Try again as often as you like.",
  { check: [
    { q: "A \"hidden sentence\" is…", options: ["a sentence served in the community", "what a family lives through when someone goes to prison", "a suspended sentence"], answer: 1 },
    { q: "About how many people entering prison have children who depend on them?", options: ["1 in 3", "1 in 20", "Almost all"], answer: 0 },
    { q: "A person \"on remand\" is…", options: ["on parole", "held while their case goes through court, not yet found guilty", "serving a short sentence"], answer: 1 },
    { q: "A child whose parent is in prison often grieves in silence because…", options: ["children don't feel loss the way adults do", "the loss carries a stigma, so nobody acknowledges it", "they are told everything"], answer: 1 },
    { q: "Before a prison visit, a family should expect…", options: ["to take presents in", "to leave belongings in a locker and go through security", "to walk straight in"], answer: 1 },
    { q: "A child doesn't want to visit. You…", options: ["make them go", "don't force them, find out why, and keep contact going another way", "tell the parent in prison to ring them"], answer: 1 },
    { q: "Who decides what children are told?", options: ["The parent or carer", "The worker", "The prison"], answer: 0 },
    { q: "Keeping in touch with family makes a person in prison…", options: ["more likely to reoffend", "less likely to reoffend", "no different"], answer: 1 }
  ] },
  { cert: true },
  { h: "Where to go from here" },
  "This course is the first stage. The second is the Practitioner's Training: assessing what a family needs, building a support plan with a parent and with a child, and working through five family case studies.",
  { links: [["Go to the Practitioner's Training", "../practitioner-training/"]] },
  { h: "Keep these on your phone" },
  { links: [["The Field Guide", HS.FG], ["Where to get help", HS.FG + "#help"]] },
  { h: "Tell us what you thought" },
  { links: [["Email your feedback to Onesimus", "mailto:info@onesimus.org.au?subject=Hidden%20Sentence%20online%20feedback"]] },
  { flag: "To settle with the Wix arrangement: registration through a standing event, and collecting the certificate there. The Practitioner's Training link assumes the two courses sit side by side (../practitioner-training/). The certificate is made in the browser for now." }
] });
