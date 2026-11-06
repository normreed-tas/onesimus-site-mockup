/* Tasmanian Justice Figures — question data and page logic.
   Figures transcribed from: ROGS 2026 (PC), ABS Prisoners in Australia 2025,
   AIHW Youth Justice in Australia 2024-25. Each entry names its source table.
   Shared by two pages: justice-figures.html shows the adult questions, and the
   figures section of youth-justice.html shows those marked age:'youth'. The page
   says which via data-age on #figures. Cross-links between the two open the other
   page at #fig-<id>. */

var YRS8=['2017-18','2018-19','2019-20','2020-21','2021-22','2022-23','2023-24','2024-25'];
var J=['NSW','Vic','Qld','WA','SA','Tas','ACT','NT'];
var ROGS_SRC='Productivity Commission, <em>Report on Government Services 2026</em>, reference year 2024&ndash;25';
var ABS_SRC='Australian Bureau of Statistics, <em>Prisoners in Australia, 2025</em>, count at 30 June 2025';
var ABS_OFF_SRC='Australian Bureau of Statistics, <em>Recorded Crime &ndash; Offenders, 2024&ndash;25</em>, released 18 March 2026';
var AIHW_SRC='Australian Institute of Health and Welfare, <em>Youth Justice in Australia 2024&ndash;25</em>, average day across 2024&ndash;25';

var Q=[
/* ============ ROGS — adults ============ */
{src:'rogs',id:'rate',topic:'Comparison',q:'Does Tasmania lock up more people than other states?',
 fig:'169.4',unit:'people in prison per 100,000 adults — below the national rate of 210.8',
 plain:'No. Tasmania imprisons at a lower rate than the national average and lower than every mainland state except Victoria. But the Tasmanian rate has risen about 15 per cent in two years, from 147.8 in 2022–23, while the national rate rose about 4 per cent over the same period.',
 series:{years:YRS8,tas:[146.4,151.9,151.2,143.1,141.1,147.8,166.5,169.4],aust:[217.0,220.3,216.1,210.4,204.8,201.9,202.9,210.8],ylabel:'Per 100,000 adults'},
 bars:{vals:[194.4,110.1,250.5,343.0,223.9,169.4,107.8,1325.1],label:'Imprisonment rate per 100,000 adults, 2024–25',fmt:function(v){return v.toFixed(1)}},
 counts:'The average daily prisoner population divided by the adult population, per 100,000 adults. This is the crude rate; ROGS also publishes an age-standardised rate adjusting for differently aged populations between states.',
 caveats:['The Northern Territory figure of 1,325 is genuine, not an error. It compresses the scale of the chart and makes the other jurisdictions look closer together than they are.','A lower imprisonment rate is not the same as less crime, fewer victims, or a better system. It reflects policing, bail, sentencing and parole practice as much as offending.'],
 xref:'The ABS reports 172 per 100,000 for Tasmania on the same broad measure, because it counts one night rather than a yearly average. Both are right.',gotoId:'absrate',
 table:'8A.5, 8A.8'},

{src:'rogs',id:'pop',topic:'Prisons',q:'How many people are in prison in Tasmania?',
 fig:'784',unit:'people in prison on an average day across 2024–25',
 plain:'On an average day in 2024–25 there were 784 people in Tasmanian prisons — 710 men and 74 women. The number has risen by about 170 since 2017–18, and about 140 of that rise has come since 2021–22.',
 series:{years:YRS8,tas:[613,653,664,640,642,676,767,784],aust:null,ylabel:'People'},
 bars:{vals:[13112,6102,11011,8078,3388,784,412,2639],label:'People in prison, average day 2024–25',fmt:function(v){return v.toLocaleString()}},
 counts:'The average number held across the whole year, including people on remand who have not been sentenced. Tasmania operates five prisons, all government-run, with an average capacity of 899 places.',
 caveats:['Raw counts cannot be compared between states of different sizes. For that, use the imprisonment rate.','The ABS headcount for 30 June 2025 is 797. The gap between the two is the difference between an average and a snapshot, not an error in either.'],
 xref:'The ABS counts the same population a different way: a headcount of 797 on one night, with what people are held for and how many have not yet been sentenced.',gotoId:'absnight',
 table:'8A.4, 8A.5'},

{src:'rogs',id:'cost',topic:'Money',q:'What does it cost to keep someone in prison for a day?',
 fig:'$507.67',unit:'net operating cost per prisoner per day in Tasmania, against $326.43 nationally',
 plain:'Tasmania spends about $508 a day on each person in prison — the second-highest in the country after the ACT, and more than half again the national average. Add capital costs and the figure reaches $635 a day.',
 series:{years:['2022-23','2023-24','2024-25'],tas:[525.56,489.91,507.67],aust:[331.71,331.30,326.43],ylabel:'$ per day'},
 bars:{vals:[318.66,483.89,295.84,301.09,239.20,507.67,573.76,225.68],label:'Net operating expenditure per prisoner per day, 2024–25',fmt:function(v){return '$'+v.toFixed(0)}},
 counts:'Net operating expenditure divided by prisoner days. It excludes payroll tax, prisoner health costs and transport where those can be separated out, so states with different administrative arrangements can be compared. Capital costs are counted separately. All figures are in 2024–25 dollars.',
 caveats:['Small systems cost more per head. A prison needs a perimeter, a control room and a minimum roster whether it holds 200 people or 2,000. The ACT, with the smallest system, is the most expensive in the country.','Tasmania cannot separate prisoner transport costs from general prison operating expenditure, so some transport cost sits inside this figure where other states report it outside.','A high daily cost is not by itself evidence of waste or of good care. It says what is spent, not what is achieved.'],
 xref:'Youth detention costs roughly ten times as much per day — $5,121 against $508.',gotoId:'ycost',
 table:'8A.19'},

{src:'rogs',id:'recid',topic:'Returns',q:'How many people return to prison after being released?',
 fig:'46.6%',unit:'of adults released from Tasmanian prisons returned under sentence within two years',
 plain:'Just under half of people released from a Tasmanian prison are back under a new sentence within two years. On the wider measure — returning to prison or to a community corrections order — the figure is 55.6 per cent. Both sit above the national average.',
 series:{years:YRS8,tas:[46.3,47.1,47.1,50.4,51.1,52.0,51.3,46.6],aust:[44.8,45.7,44.2,44.4,42.7,42.5,43.0,44.5],ylabel:'Per cent returning'},
 bars:{vals:[50.2,36.8,44.3,36.2,29.8,46.6,37.1,59.5],label:'Returned to prison within two years, 2024–25',fmt:function(v){return v.toFixed(1)+'%'}},
 counts:'People released after a sentence who return to prison with a new sentence within two years. It counts returns, not reoffending: someone who offends but is not imprisoned does not appear, and someone returned for breaching parole does. This is why "recidivism" figures from different sources disagree so widely — they measure different events.',
 caveats:['Tasmania changed how it classifies imprisonment episodes and release reasons in 2024–25. The Productivity Commission states the 2024–25 figure is not directly comparable with earlier years. The apparent five-point fall may be a change in counting rather than in outcomes.','States use two different counting methods. Tasmania requires the person to be sentenced within the two years; Western Australia and the ACT use a method that also captures remand, which tends to produce slightly higher rates.','The two-year window is a convention, not a natural boundary. It tells you nothing about year three.'],
 xref:'The ABS asks a related question from the other direction: what share of people currently in prison have been imprisoned before. That is a different measure, not a check on this one.',gotoId:'prior',
 table:'CA.4'},

{src:'rogs',id:'cells',topic:'Conditions',q:'How much time do prisoners spend out of their cells?',
 fig:'7.0',unit:'hours a day out of cells on average — the lowest of any jurisdiction',
 plain:'People in Tasmanian prisons spend an average of seven hours a day out of their cells, meaning around seventeen hours locked in. This is the lowest figure in the country, down from 8.6 hours in 2017–18. In secure custody it is 6.8 hours.',
 series:{years:YRS8,tas:[8.6,7.9,7.1,8.0,7.7,7.3,7.5,7.0],aust:[9.9,9.7,9.6,9.4,8.7,8.8,9.0,8.9],ylabel:'Hours per day'},
 bars:{vals:[8.0,10.1,8.2,9.3,9.0,7.0,8.8,12.1],label:'Average hours out of cells per day, 2024–25',fmt:function(v){return v.toFixed(1)+' hr'}},
 counts:'The average hours per day prisoners are not confined to their cells, across open and secure custody combined. It is the measure most closely tied to daily lived experience, and is affected by staffing, lockdowns and infrastructure.',
 caveats:['Tasmania holds 97.9 per cent of its prisoners in secure custody — the highest proportion in the country apart from the ACT. Secure custody always produces lower out-of-cell hours, so part of this gap reflects the mix of custody types rather than how any one prison is run.','The figure is an average across the year and across all prisoners. It conceals both better and considerably worse individual experience.'],
 table:'8A.13'},

{src:'rogs',id:'indig',topic:'Equity',q:'Are Aboriginal Tasmanians over-represented in prison?',
 fig:'6.7×',unit:'the imprisonment rate of non-Indigenous Tasmanians',
 plain:'Yes. Aboriginal and Torres Strait Islander adults in Tasmania are imprisoned at 871 per 100,000, against 130 for non-Indigenous adults — a ratio of 6.7 to one. That is the lowest over-representation of any Australian jurisdiction, where the national ratio is 18.8 to one, but it is still substantial and has widened since 2021–22.',
 series:{years:['2021-22','2022-23','2023-24','2024-25'],tas:[6.6,6.1,6.1,6.7],aust:[14.7,15.7,17.3,18.8],ylabel:'Ratio to non-Indigenous rate'},
 bars:{vals:[14.2,16.3,15.5,23.3,16.5,6.7,25.4,21.1],label:'Indigenous to non-Indigenous imprisonment ratio, 2024–25',fmt:function(v){return v.toFixed(1)+'×'}},
 counts:'Crude imprisonment rates per 100,000 relevant adults, divided one by the other. Population denominators come from ABS estimates, which are sensitive to how many people identify as Aboriginal at each Census — a factor that can move the ratio without any change in who is in prison.',
 caveats:['Tasmania having the lowest ratio in the country is not a result to rest on. It still means an Aboriginal Tasmanian is almost seven times as likely to be imprisoned as a non-Aboriginal Tasmanian.','197 Aboriginal people were in Tasmanian prisons on an average day in 2024–25, up from 152 two years earlier. At these numbers the ratio moves readily.','Identification practices differ between the prison record and the Census. Both ends of this calculation carry uncertainty.'],
 xref:'The ABS counted 206 Aboriginal and Torres Strait Islander people in Tasmanian prisons on 30 June 2025, an age-standardised rate of 907 per 100,000.',gotoId:'absindig',
 table:'8A.5, 8A.8'},

{src:'rogs',id:'cap',topic:'Prisons',q:'How full are Tasmania’s prisons?',
 fig:'87.2%',unit:'of average prison capacity in use across 2024–25',
 plain:'Tasmanian prisons ran at 87 per cent of capacity in 2024–25, up from 76 per cent two years earlier. Secure custody is tighter at 88 per cent, while open custody sits at 54 per cent.',
 series:{years:['2022-23','2023-24','2024-25'],tas:[75.7,85.5,87.2],aust:null,ylabel:'Per cent of capacity'},
 bars:{vals:[86.0,72.4,96.6,97.3,100.0,87.2,93.8,92.7],label:'Prison capacity utilisation, 2024–25',fmt:function(v){return v.toFixed(1)+'%'}},
 counts:'Average daily prisoner population measured against average available capacity. Capacity is what the system reports as usable, which is not the same as the design capacity of the buildings and can be adjusted.',
 caveats:['The indicator changed for the 2024 edition of the report. Figures before 2022–23 are measured differently and are not shown.','Utilisation near capacity constrains everything else — classification, programs, out-of-cell hours, and the ability to separate people who should be kept apart.','No national average is published, because each jurisdiction defines its own capacity.'],
 table:'8A.3, 8A.15'},

{src:'rogs',id:'cc',topic:'Community',q:'How many people are serving sentences in the community?',
 fig:'2,098',unit:'people on community corrections orders on an average day',
 plain:'Nearly 2,100 Tasmanians were under community corrections supervision on an average day in 2024–25 — around two and a half times the number in prison. The rate of 454 per 100,000 adults is above the national average of 388.',
 series:{years:YRS8,tas:[462.5,471.9,463.5,435.3,458.3,428.1,417.9,453.6],aust:[360.9,384.4,416.5,392.6,398.7,390.2,389.9,387.7],ylabel:'Per 100,000 adults'},
 bars:{vals:[545.8,161.4,424.5,284.8,527.9,453.6,223.4,838.4],label:'Community corrections rate per 100,000 adults, 2024–25',fmt:function(v){return v.toFixed(1)}},
 counts:'People subject to supervision, reparation or restricted-movement orders managed by community corrections. A person can hold more than one order; in Tasmania those with both reparation and supervision conditions are counted in each category, so categories sum to more than the total.',
 caveats:['Tasmania changed its counting method in 2017–18 to include offenders with one or more active orders. Earlier figures are on a different basis.','Community corrections costs $29.10 per offender per day, against $507.67 per prisoner per day. The two cover very different levels of supervision and are not substitutes for one another.'],
 table:'8A.6, 8A.7'},

{src:'rogs',id:'edu',topic:'Programs',q:'How many prisoners take part in education?',
 fig:'17.6%',unit:'of eligible prisoners in education or training, against 24.0% nationally',
 plain:'Fewer than one in five eligible Tasmanian prisoners were enrolled in education or training in 2024–25 — well below the national figure and down from over a quarter in 2017–18. Most of that participation is vocational training.',
 series:{years:YRS8,tas:[25.1,24.8,19.4,19.8,17.6,21.5,21.7,17.6],aust:[34.0,35.1,32.2,29.9,23.9,26.0,25.7,24.0],ylabel:'Per cent of eligible prisoners'},
 bars:{vals:[14.8,28.7,31.9,15.8,48.3,17.6,41.8,12.9],label:'Prisoners in education and training, 2024–25',fmt:function(v){return v.toFixed(1)+'%'}},
 counts:'The share of eligible prisoners enrolled in pre-certificate, secondary, vocational or higher education. Tasmania calculates this as an average of monthly participation over ten months, excluding December and January.',
 caveats:['Tasmania changed its data collection method in 2024–25, and the Commission states the figure is not directly comparable with earlier years. The apparent four-point fall should not be read as a real decline.','The Commission advises this measure is not comparable across jurisdictions at all, because eligibility is defined differently in each. The state-by-state chart shows the spread, not a ranking.','Participation says nothing about completion, or about whether the course led anywhere.'],
 table:'8A.11'},

{src:'rogs',id:'work',topic:'Programs',q:'How many prisoners are employed?',
 fig:'85.5%',unit:'of eligible prisoners in prison employment, above the national 80.4%',
 plain:'Most eligible Tasmanian prisoners are employed, chiefly in service industries within the prison. The reported figure jumped from 69 per cent to 85.5 per cent in one year.',
 series:{years:YRS8,tas:[69.7,64.1,53.8,55.6,60.7,70.3,69.0,85.5],aust:[80.5,80.3,81.4,80.7,80.1,81.4,79.1,80.4],ylabel:'Per cent of eligible prisoners'},
 bars:{vals:[85.7,91.5,65.9,81.4,77.6,85.5,90.1,78.5],label:'Prisoners employed, 2024–25',fmt:function(v){return v.toFixed(1)+'%'}},
 counts:'The share of eligible prisoners in prison employment, counted as a monthly average on the first business day of each month against the average prisoner population. Of those employed in Tasmania, two-thirds are in service industries and about a fifth in commercial industries.',
 caveats:['Tasmania changed its data collection method in 2024–25 and the figure is not directly comparable with earlier years. A sixteen-point rise in one year is far more likely to reflect that change than a transformation in prison industry.','"Employment" here includes unpaid or token-rate work inside the prison. It is not employment in the ordinary sense and is not a measure of job readiness.'],
 table:'8A.12'},

{src:'rogs',id:'spend',topic:'Money',q:'How much does Tasmania spend on justice per person?',
 fig:'$1,105',unit:'per Tasmanian per year across the justice sector, against $967 nationally',
 plain:'Tasmania spends about $1,105 per resident per year on police, courts and corrections combined — the second-highest of the states after Western Australia. Corrective services account for $310 of that, against a national average of $256.',
 series:null,
 bars:{vals:[240,202,274,342,207,310,257,1033],label:'Corrective services expenditure per person, 2024–25',fmt:function(v){return '$'+v}},
 counts:'Real recurrent expenditure less revenue from own sources, divided by the total population of all ages — not by the adult population. Figures are in 2024–25 dollars and include depreciation but exclude payroll tax and the user cost of capital.',
 caveats:['Spending per resident is driven as much by the fixed cost of running a small jurisdiction as by policy choices. Tasmania also spends more per person on police ($724 against $625 nationally).','This measure says what is spent, not what is delivered or achieved. Pairing it with an outcome measure is the reader’s job, and the pairing is rarely straightforward.'],
 table:'CA.1, CA.2'},

{src:'rogs',id:'cwork',topic:'Community',q:'Do people complete their community work orders?',
 fig:'82.4%',unit:'of imposed unpaid community work hours were worked off — the highest in the country',
 plain:'Tasmania discharges a higher share of imposed community work hours than any other jurisdiction, at 82.4 per cent against a national 72.2 per cent. The figure has improved steadily since 2020–21.',
 series:{years:['2019-20','2020-21','2021-22','2022-23','2023-24','2024-25'],tas:[79.5,72.5,78.8,78.5,78.4,82.4],aust:[65.6,77.0,72.2,67.6,69.6,72.2],ylabel:'Per cent of hours acquitted'},
 bars:{vals:[74.2,67.9,80.3,59.2,62.4,82.4,80.4,65.1],label:'Community work hours acquitted, 2024–25',fmt:function(v){return v.toFixed(1)+'%'}},
 counts:'For orders discharged during the year, the proportion of imposed unpaid community work hours actually worked. It covers only orders that reached discharge, so it does not capture orders breached and revoked part-way through.',
 caveats:['Because it counts only discharged orders, a jurisdiction that revokes failing orders early can show a better completion rate than one that persists with them.','This is one of the few measures where Tasmania leads the country. Worth understanding why before assuming it generalises.'],
 xref:'The nearest youth measure counts orders completed rather than hours worked, and runs the other way: Tasmania completes 77.6 per cent of community-based youth orders against a national 88.1 per cent.',gotoId:'yorders',
 table:'8A.14'},

{src:'rogs',id:'deaths',topic:'Conditions',q:'How many people have died in Tasmanian prisons?',
 fig:'0',unit:'deaths from apparent unnatural causes in Tasmanian prisons in 2024–25',
 plain:'There were no deaths from apparent unnatural causes in Tasmanian prisons in 2024–25. Across the decade to 2024–25, three such deaths are recorded — two in 2021–22 and one in 2018–19. Nationally there were 26 in 2024–25.',
 series:null,
 bars:{vals:[6,4,3,11,2,0,0,0],label:'Deaths from apparent unnatural causes, 2024–25',fmt:function(v){return String(v)}},
 counts:'Deaths assessed as resulting from unnatural causes, excluding those recorded as "unknown cause" where a coroner has not yet determined the matter. Figures for past years are revised as coronial findings are handed down, so an earlier year’s number can change in a later edition.',
 caveats:['Deaths from natural causes are not counted here, and in an ageing prison population they are the larger number.','At these counts a rate per 100 prisoners is close to meaningless for a jurisdiction of Tasmania’s size. A single death would move it substantially.','A zero in one year carries no information about the following year.'],
 table:'8A.16'},

/* ============ ROGS — young people (Section 17) ============ */
{src:'rogs',age:'youth',id:'ycost',topic:'Money',q:'What does it cost to hold a young person in detention?',
 fig:'$5,121',unit:'per young person per day in Tasmanian youth detention, against $3,635 nationally',
 plain:'Tasmania spends about $5,121 a day on each young person in detention — roughly ten times the $508 a day it spends on an adult prisoner, and some 40 per cent above the national youth figure. Community-based youth supervision costs $256 a day.',
 series:{years:YRS8,tas:[3697.34,3853.31,3339.49,5198.09,5504.27,4156.11,4508.45,5120.55],aust:[1769.46,1979.50,2296.14,2926.62,3076.23,3083.61,3438.44,3634.90],ylabel:'$ per day'},
 counts:'Total real recurrent expenditure on detention divided by the average daily number of young people detained, in 2024–25 dollars. Youth detention is intensive by design — high staff ratios, schooling, health and case management — so it is always far more expensive per head than adult imprisonment.',
 caveats:['Tasmania funds 24 detention beds and has done for a decade, while the average nightly population was 15.4. A facility is largely a fixed cost: the fewer young people held in it, the higher the cost per head rises. This figure partly measures spare capacity, not extravagance.','The Productivity Commission states this table is not comparable across jurisdictions, and for some jurisdictions not comparable over time.','Tasmania’s total youth justice expenditure rose from $36.0 million to $43.5 million in a single year.'],
 xref:'The adult equivalent is $507.67 per prisoner per day. The two systems differ by roughly a factor of ten.',gotoId:'cost',
 table:'17A.10, 17A.20, 17A.21'},

{src:'rogs',age:'youth',id:'ysuper',topic:'Supervision',q:'How many young Tasmanians are under youth justice supervision?',
 fig:'20.4',unit:'per 10,000 young people aged 10–17 — the highest rate in the country',
 plain:'On an average day, 110 young Tasmanians aged 10 to 17 were under youth justice supervision: 96 on community-based orders and 14 in detention. At 20.4 per 10,000 that is the highest supervision rate of any jurisdiction, against a national 11.9 — but it is lower than Tasmania’s own rate of 23.4 in 2018–19.',
 series:{years:YRS8,tas:[20.5,23.4,22.0,15.2,12.2,14.7,17.3,20.4],aust:null,ylabel:'Per 10,000 aged 10–17'},
 breakdown:{label:'Young people under supervision on an average day, Tasmania, 2024–25',total:110,nopct:true,
   rows:[['Community-based supervision',96],['Detention',14],['Total (not the sum)',110]]},
 counts:'The average number of young people aged 10 to 17 under supervision on any given day. The total is not the sum of the two categories, because a young person can be under both on the same day. Being an average, a young person supervised for part of the year counts as a fraction.',
 caveats:['Tasmania’s rate is high because of community-based supervision, not detention. Its detention rate of 2.6 is at the national average of 2.7.','The rate fell sharply to 12.2 in 2021–22 and has climbed since. A series that moves this much in a jurisdiction this small should be read as a band, not a line.','The Report explicitly names Tasmania as a jurisdiction whose rates should be used with caution because of small population numbers, and does not calculate rates where a cell is under five.','The national figure excludes the Northern Territory, which did not supply community supervision data.'],
 xref:'Tasmania’s adult imprisonment rate runs below the national average, while its youth supervision rate is the highest in the country. The two systems are not pointing the same way.',gotoId:'rate',
 table:'17A.1'},

{src:'rogs',age:'youth',id:'ycap',topic:'Detention',q:'How full is Tasmania’s youth detention centre?',
 fig:'64.3%',unit:'of funded youth detention beds in use, against 58.2% nationally',
 plain:'Tasmania funds 24 youth detention beds and held an average of 15.4 young people a night in 2024–25 — a utilisation rate of 64 per cent. The bed number has not changed in a decade, while the nightly population has ranged from 9.0 to 15.9.',
 series:{years:YRS8,tas:[47.3,47.7,64.3,38.3,37.4,55.2,66.3,64.3],aust:null,ylabel:'Per cent of funded beds'},
 breakdown:{label:'Youth detention, Tasmania, 2024–25',total:24,nopct:true,
   rows:[['Permanently funded beds',24],['Average nightly population',15.4]]},
 counts:'Average nightly population measured against permanently funded bed capacity. Unlike the adult prison measure, this is reported against funded beds rather than usable capacity, so it reflects what the system is resourced to hold.',
 caveats:['Low utilisation in a small facility is not slack to be taken up. Young people must be separated by age, sex, legal status and risk, so a centre can be operationally full well below its nominal capacity.','This measure is a large part of why the daily cost per young person is so high: the same fixed establishment is spread across fewer young people.','Of the 5,640 custody nights in 2024–25, 2,100 were served by Aboriginal and Torres Strait Islander young people.'],
 table:'17A.2, 17A.18'},

{src:'rogs',age:'youth',id:'yreturn',topic:'Returns',q:'Do young people come back into the youth justice system?',
 fig:'63.9%',unit:'returned to sentenced supervision within 12 months — against 56.7% nationally',
 plain:'Of young Tasmanians released from sentenced supervision in 2022–23, almost two-thirds were back under sentenced supervision within a year. That is well above the national rate, and a sharp rise on Tasmania’s own 50.0 per cent the year before.',
 series:{years:['2015-16','2016-17','2017-18','2018-19','2019-20','2020-21','2021-22','2022-23'],tas:[57.7,51.8,58.3,53.3,49.2,51.1,50.0,63.9],aust:[56.5,56.5,59.1,54.9,50.8,57.9,57.0,56.7],ylabel:'Per cent returning'},
 counts:'Young people released from sentenced supervision who return to sentenced supervision within 12 months. The twelve-month window is much shorter than the two years used for adults, and supervision includes community orders as well as detention, so this figure is not comparable with the adult recidivism rate.',
 caveats:['The most recent cohort is 2022–23, not 2024–25. Following people forward for twelve months means the measure always lags the rest of the report by two years.','A fourteen-point jump in one year, in a jurisdiction with this few young people, may reflect the composition of one small release cohort rather than a change in how the system performs.','The Commission flags this table as not comparable across jurisdictions and incomplete for the current period.'],
 xref:'The adult measure follows released prisoners for two years rather than one, and stands at 46.6 per cent.',gotoId:'recid',
 table:'17A.26'},

{src:'rogs',age:'youth',id:'yorders',topic:'Community',q:'Do young people complete their community orders?',
 fig:'77.6%',unit:'of community-based supervised orders completed successfully, against 88.1% nationally',
 plain:'About three-quarters of young Tasmanians completed their community-based orders successfully in 2024–25 — 180 of 232. The national figure is 88 per cent, and the gap between Tasmania and the rest of the country has widened over the past decade.',
 series:{years:YRS8,tas:[76.1,84.1,79.5,81.7,80.1,78.9,72.1,77.6],aust:[79.9,80.7,82.9,84.7,85.0,84.8,86.1,88.1],ylabel:'Per cent completed successfully'},
 breakdown:{label:'Community-based supervised orders, Tasmania, 2024–25',total:232,
   rows:[['Completed successfully',180],['Completed unsuccessfully',52]]},
 counts:'Orders that reached completion, divided between those completed successfully and those that did not. An unsuccessful completion generally means the order was breached and revoked.',
 caveats:['The Tasmanian footnote records possible inconsistencies in how breaches are handled and recorded across the state. A jurisdiction that breaches more readily will record more unsuccessful completions without any difference in young people’s behaviour.','Tasmania leads the country on adult community work at 82.4 per cent, but that measures hours worked off, not orders completed. The two cannot be set against each other as better and worse results.'],
 xref:'The nearest adult measure — the share of community work hours actually worked off, a different measure from orders completed — has Tasmania highest in the country.',gotoId:'cwork',
 table:'17A.25'},

{src:'rogs',age:'youth',id:'ycase',topic:'Programs',q:'Do young people get a case plan?',
 fig:'50.9%',unit:'of sentenced community orders had a case plan within six weeks, against 77.1% nationally',
 plain:'Just over half of young Tasmanians on a sentenced community order had a case plan within six weeks of starting it — 58 of 114. For those in sentenced detention the figure was 5 of 8. Both sit well below national practice, where 95 per cent of detention orders have a plan in place.',
 series:null,
 breakdown:{label:'Case plan within six weeks of commencing a sentenced order, 2024–25',total:100,nopct:true,
   rows:[['Tasmania, community orders',50.9],['Australia, community orders',77.1],['Tasmania, detention orders',62.5],['Australia, detention orders',95.3]]},
 counts:'The share of young people who had a case plan prepared within six weeks of a sentenced order commencing. A case plan is the document that sets out what the supervision is meant to achieve, so it is a reasonable proxy for whether supervision is purposeful rather than merely administered.',
 caveats:['Tasmania notes that for 2024–25 the custodial figure was compiled by hand from commencement dates, because the dates plans were completed or reviewed were unavailable. The Report records this as a break in series.','Tasmania also notes that plans not visible in the system may be undercounted, and that completion was lower in 2023–24 because of workforce pressures.','Eight sentenced detention orders is a very small base. Five of eight is 62.5 per cent, but one case either way moves it more than twelve points.'],
 table:'17A.13'},

{src:'rogs',age:'youth',id:'yindig',topic:'Equity',q:'Are Aboriginal young people over-represented in youth justice?',
 fig:'3.9×',unit:'the detention rate of non-Indigenous young Tasmanians, against 23.1× nationally',
 plain:'Yes, but far less sharply than anywhere else in Australia. Aboriginal young Tasmanians are detained at 3.9 times the non-Indigenous rate and supervised in the community at 5.2 times. The national detention ratio is 23.1 to one.',
 series:{years:YRS8,tas:[4.3,5.3,4.3,5.8,5.1,3.4,3.7,3.9],aust:[19.9,20.4,16.4,16.1,21.2,23.9,26.9,23.1],ylabel:'Ratio to non-Indigenous rate'},
 breakdown:{label:'Young people under supervision on an average day, Tasmania, 2024–25',total:110,nopct:true,
   rows:[['Aboriginal, community-based',38],['Non-Indigenous, community-based',58],['Aboriginal, detention',5],['Non-Indigenous, detention',10]]},
 counts:'Rates per 10,000 relevant young people, divided one by the other. The Aboriginal youth detention rate in Tasmania is 7.8 per 10,000 against 2.0 for non-Indigenous young people.',
 caveats:['These ratios rest on five Aboriginal young people in detention on an average day. At that scale the ratio is extremely sensitive: one or two young people moves it by a full point.','The series starts at 2017–18 because ABS Aboriginal population estimates were re-based between the 2016 and 2021 Censuses. Earlier figures in previous editions are not comparable.','Tasmania’s ratio being the lowest in the country does not make it acceptable. It still means an Aboriginal young person is about four times as likely to be in detention.'],
 xref:'Among adults the Tasmanian ratio is 6.7 to one — also the lowest in the country, but higher than the youth figure.',gotoId:'indig',
 table:'17A.5, 17A.6, 17A.7, 17A.8'},

{src:'rogs',age:'youth',id:'yescape',topic:'Detention',q:'Do young people escape from Tasmanian detention?',
 fig:'5',unit:'escapes from Tasmanian youth detention in 2024–25, out of eight nationally',
 plain:'Five of the eight escapes from youth detention recorded across Australia in 2024–25 happened in Tasmania. Expressed against custody nights, Tasmania’s rate was 8.9 per 10,000 against a national 0.3. There were no escapes from the 270 escorted movements undertaken.',
 series:null,
 breakdown:{label:'Escapes from youth detention, 2024–25',total:8,nopct:true,
   rows:[['Tasmania',5],['Rest of Australia',3]]},
 counts:'Escapes from a youth detention centre, counted as incidents rather than as individual young people, with a rate per 10,000 custody nights. Escapes from escorted movements outside the centre are counted separately and were nil for Tasmania.',
 caveats:['Five incidents is a very small number carrying a very large share. With only 5,640 custody nights in the year, Tasmania’s rate is high principally because its denominator is small. One or two fewer incidents would change the national picture.','Tasmania recorded three escapes in 2023–24, a suppressed figure in 2022–23 and nil in 2021–22. There is no stable trend in a series this short and this small.','The Indigenous breakdown is suppressed under Tasmania’s small-number policy.','An escape is a failure of physical security. It is not a measure of how young people are treated or of whether detention is achieving anything.'],
 table:'17A.23'},

{src:'rogs',age:'youth',id:'yharm',topic:'Conditions',q:'Do young people self-harm in Tasmanian detention?',
 fig:'9',unit:'incidents of self-harm or attempted suicide receiving treatment in 2024–25',
 plain:'Nine incidents of self-harm or attempted suicide in Tasmanian youth detention required psychological or medical treatment in 2024–25 — three involving Aboriginal young people and six involving non-Indigenous young people. No incident required hospitalisation, and no young person required hospitalisation.',
 series:null,
 breakdown:{label:'Self-harm and attempted suicide in Tasmanian youth detention, 2024–25',total:9,nopct:true,
   rows:[['Incidents requiring treatment',9],['Incidents requiring hospitalisation',0]]},
 counts:'Incidents recorded in youth detention, divided between those requiring hospitalisation and those receiving psychological or medical treatment without hospitalisation. The rate is expressed per 10,000 custody nights, at 16.0 for Tasmania overall.',
 caveats:['The Productivity Commission publishes no Australian total for this measure, so Tasmania cannot be compared with the national picture.','These are counts of incidents, not of young people. A small number of young people may account for several incidents, and the figure says nothing about how many individuals were involved.','Against 5,640 custody nights and an average of about fifteen young people, nine incidents is not a small number. The figure covers only incidents recorded under the reporting rules.'],
 support:'If this is affecting you or someone you know, Lifeline is available 24 hours a day on 13 11 14, and Kids Helpline on 1800 55 1800.',
 table:'17A.19'},

{src:'rogs',age:'youth',id:'ydeaths',topic:'Conditions',q:'Have any young people died in Tasmanian youth detention?',
 fig:'0',unit:'deaths in Tasmanian youth detention in every year of the past decade',
 plain:'There have been no deaths in Tasmanian youth detention in any year from 2015–16 to 2024–25. Nationally there has been one death in each of the last two years, after eight years with none.',
 series:null,
 counts:'Deaths of young people in youth detention. The Productivity Commission flags this as one of the few youth justice measures that is comparable across jurisdictions and over time, and complete for the current period.',
 caveats:['A decade of nil results in a system holding fifteen young people a night tells you less than the same result would in a larger jurisdiction. It is reassuring, not conclusive.'],
 xref:'The Report separately records incidents of self-harm and attempted suicide in custody, which did occur.',gotoId:'yharm',
 table:'17A.15'},

/* ============ ABS — adults, one night ============ */
{src:'abs',id:'offence',topic:'Offences',q:'What are people in Tasmanian prisons actually in for?',
 fig:'37%',unit:'were held for acts intended to cause injury — the largest single category',
 plain:'On 30 June 2025, violence of some kind accounted for most of the Tasmanian prison population. Acts intended to cause injury covered 297 people, sexual assault and related offences a further 142. Illicit drug offences accounted for 65.',
 series:null,
 breakdown:{label:'Most serious offence or charge, Tasmania, 30 June 2025',total:797,
   rows:[['Acts intended to cause injury',297],['Sexual assault and related',142],['Illicit drug offences',65],['All other offences',293]]},
 counts:'Each person is counted once, under their single most serious offence or charge. Someone held on several charges appears only under the gravest, so this understates how often the other offence types occur. For unsentenced prisoners it is the most serious charge, which may not be what they are eventually convicted of — or they may not be convicted at all.',
 caveats:['"All other offences" is a residual calculated from the published categories, not a category the ABS reports. It covers everything from burglary and theft to driving and justice-procedure offences.','Because only the most serious offence is counted, this cannot tell you how many people in prison have a drug problem, or how many offences were committed in a family violence context.','The ABS adjusts small cell counts slightly to protect confidentiality, so published components need not sum exactly to the total.'],
 table:'Prisoners in Australia 2025, Tasmania'},

{src:'abs',id:'remand',topic:'Remand',q:'How many people in Tasmanian prisons have not been sentenced?',
 fig:'343',unit:'people on remand at 30 June 2025 — about 43 per cent of the prison population',
 plain:'More than two in five people in Tasmanian prisons had not been sentenced. The remand population rose by 14 people over the year while the sentenced population fell by 16 — so the prison held slightly fewer people overall, but a higher share of them were awaiting the outcome of their case.',
 series:null,
 breakdown:{label:'Sentenced and unsentenced prisoners, Tasmania, 30 June 2025',total:798,
   rows:[['Sentenced',455],['Unsentenced (remand)',343]]},
 counts:'Unsentenced prisoners are those held in custody awaiting the outcome of their matter — not yet convicted, or convicted but not yet sentenced. Those not yet convicted are presumed innocent; those awaiting sentence have already been found guilty. The ABS does not split the two groups in this count.',
 caveats:['People on remand generally have limited access to programs, education and work, because those are usually structured around a known sentence length. A rising remand share therefore changes what a prison can do, not just who is in it.','This is one night’s count. Remand populations move faster than sentenced ones, so a single night can sit above or below the year’s typical level.','The published sentenced and unsentenced figures sum to 798 against a reported total of 797, a result of the small adjustments the ABS makes to protect confidentiality.'],
 xref:'Among young people in Tasmanian detention the unsentenced share is roughly double this, at about 85 per cent.',gotoId:'yremand',
 table:'Prisoners in Australia 2025, Tasmania'},

{src:'abs',id:'absnight',topic:'Headcount',q:'How many people were in prison on one night in Tasmania?',
 fig:'797',unit:'people in Tasmanian prisons on the night of 30 June 2025',
 plain:'The ABS counted 797 people in Tasmanian custody on 30 June 2025, four fewer than a year earlier — the first fall after several years of increase. Of those, 68 were women, a number that rose 11 per cent over the year while the male population fell slightly.',
 series:null,
 breakdown:{label:'Tasmanian prison population by sex, 30 June 2025',total:799,
   rows:[['Men',731],['Women',68]]},
 counts:'A headcount of adult prisoners held by corrective services on a single night — not people in police cells, youth detention or immigration detention — taken on the same night in every state so the national picture is consistent. It is a snapshot, not an average, and it captures whatever was true of that particular night.',
 caveats:['ROGS reports 784 for 2024–25 as an average across the year. The difference between the two figures is a difference of method, not a discrepancy to be resolved.','A fall of four people is well within ordinary movement for a system this size and should not be read as a turning point.','The sex breakdown sums to 799 against a total of 797, reflecting the small adjustments the ABS makes to protect confidentiality in low counts.'],
 xref:'ROGS gives the yearly average for the same population — 784 — along with the imprisonment rate used for interstate comparison and what the system costs to run.',gotoId:'pop',
 table:'Prisoners in Australia 2025, Tasmania'},

{src:'abs',id:'absrate',topic:'Comparison',q:'What is Tasmania’s imprisonment rate on the ABS count?',
 fig:'172',unit:'people in prison per 100,000 adults at 30 June 2025, down from 174',
 plain:'On the ABS snapshot measure Tasmania imprisoned 172 adults per 100,000 — slightly down on the previous year. The equivalent ROGS figure, averaged across the year, is 169.4.',
 series:null,
 counts:'The 30 June headcount divided by the adult population, per 100,000. Because it is a single night rather than a yearly average, it sits a little above or below the ROGS rate from year to year without either being wrong.',
 caveats:['A three-point difference between the two sources is entirely explained by method. Quoting whichever is higher or lower to support an argument is the error this page exists to prevent.','Nationally, prisoner numbers rose 6 per cent in 2025. Tasmania did not follow that national movement, which is worth noting but is a single year.'],
 xref:'For comparing Tasmania against other states over time, ROGS is the series built for that purpose — it puts the rate at 169.4.',gotoId:'rate',
 table:'Prisoners in Australia 2025, Tasmania'},

{src:'abs',id:'absindig',topic:'Equity',q:'How many Aboriginal Tasmanians were in prison on the ABS count?',
 fig:'206',unit:'Aboriginal and Torres Strait Islander people in Tasmanian prisons at 30 June 2025',
 plain:'The ABS counted 206 Aboriginal and Torres Strait Islander people in Tasmanian custody, twelve more than a year earlier. Their age-standardised imprisonment rate was 907 per 100,000 Aboriginal adults, up from 873.',
 series:null,
 counts:'An age-standardised rate adjusts for the fact that the Aboriginal population is younger on average than the non-Indigenous population, and younger people are imprisoned more often. Without that adjustment the comparison would partly measure age rather than justice outcomes.',
 caveats:['Identification is recorded by the prison at reception and compared against ABS population estimates built from Census responses. Changes in how people identify at either end can move the rate without any change in who is in custody.','206 people is a small enough number that a change of a dozen, as happened this year, shifts the rate by over 30 points.'],
 xref:'ROGS expresses the same concern as a ratio: Aboriginal Tasmanians are imprisoned at 6.7 times the non-Indigenous rate, the lowest ratio in the country.',gotoId:'indig',
 table:'Prisoners in Australia 2025, Tasmania'},

{src:'abs',id:'prior',topic:'Returns',q:'How many prisoners have been in prison before?',
 fig:'60%',unit:'of Australian prisoners had served a previous adult sentence — national figure',
 plain:'Three in five people in Australian prisons have been imprisoned as an adult before. The ABS publishes this nationally; a separate Tasmanian figure was not available from the summary release and would need to be drawn from the detailed data tables.',
 series:null,
 counts:'The share of prisoners with a known prior adult imprisonment under sentence. It is a stock measure — it describes the people in prison right now — and is a different thing from the ROGS recidivism rate, which follows a group of released people forward in time.',
 caveats:['This is a national figure, not a Tasmanian one. It is included to show what the ABS can answer, and the Tasmanian equivalent should be sourced before the page is published.','Prior imprisonment as a juvenile is not counted. Nor is a prior conviction that did not result in a prison sentence.','Stock measures over-represent people serving long sentences and those who cycle in and out frequently. They are not a measure of how often release succeeds.'],
 xref:'For the forward-looking measure — what share of released people return — ROGS follows released prisoners for two years.',gotoId:'recid',
 table:'Prisoners in Australia 2025, Australia'},

{src:'abs',pub:'offenders',age:'youth',id:'oyouth',topic:'Young people',q:'How many young Tasmanians come to police attention?',
 fig:'1,018',unit:'people aged 10–17 proceeded against by police in Tasmania during 2024–25',
 plain:'Just over a thousand young Tasmanians were proceeded against by police in 2024–25, a rate of 1,884 per 100,000 young people — about 13 per cent above the national rate of 1,660. They made up 13 per cent of all Tasmanian offenders. By comparison, about fourteen young people were in detention on an average day.',
 series:null,
 breakdown:{label:'Young Tasmanians at each stage, 2024–25',total:1018,nopct:true,
   rows:[['Proceeded against by police',1018],['Under supervision during the year',266],['Under supervision on an average day',110],['In detention on an average day',14]]},
 counts:'A person aged 10 to 17 whom police dealt with formally during the year, whether by charge, caution, conference or another method. One person is counted once, no matter how many times police proceeded against them. Coming to police attention is not a finding of guilt.',
 caveats:['The four figures above show the scale at each stage, not a path. They come from three different publications and three different counting bases — a year-long count of individuals aged 10–17, a year-long count of individuals of all ages, and two average-day counts. The records are not linked, so they cannot tell you how many of the 1,018 went on to supervision or detention. Do not subtract one from another.','Tasmania’s youth offender rate sits above the national rate while the national rate fell. Policing practice, cautioning policy and recording habits all affect this measure, not only what young people do.'],
 xref:'Across the same year, 266 young people came under youth justice supervision at some point — a separate count, not a subset of the 1,018.',gotoId:'yyear',
 table:'Recorded Crime – Offenders 2024–25, Tasmania'},

{src:'abs',pub:'offenders',age:'youth',id:'ooffence',topic:'Young people',q:'What do young Tasmanians get into trouble with police for?',
 fig:'29%',unit:'of young Tasmanian offenders were proceeded against for acts intended to cause injury',
 plain:'For young Tasmanians dealt with by police in 2024–25, the two leading offence categories were acts intended to cause injury at 295 young people and theft at 253. Together those account for more than half.',
 series:null,
 breakdown:{label:'Principal offence, young Tasmanian offenders aged 10–17, 2024–25',total:1018,
   rows:[['Acts intended to cause injury',295],['Theft',253],['All other offences',470]]},
 counts:'Each young person is counted once, under their principal offence — the most serious one police proceeded against them for in that year. A young person dealt with for several things appears only under the gravest.',
 caveats:['"All other offences" is a residual worked out from the published categories, not a category the ABS reports.','Among all Tasmanian offenders of every age the same two categories lead, with acts intended to cause injury at 2,355 and theft at 1,045. The youth pattern is not unusual for Tasmania; theft simply looms larger.','Principal-offence counting hides everything else a person was dealt with for, so this cannot tell you how common any particular offence is overall.'],
 table:'Recorded Crime – Offenders 2024–25, Tasmania'},

{src:'abs',pub:'offenders',id:'oall',topic:'All offenders',q:'How many Tasmanians are dealt with by police each year?',
 fig:'8,077',unit:'people proceeded against by police in Tasmania during 2024–25, up 6 per cent',
 plain:'Police formally dealt with 8,077 Tasmanians in 2024–25 — a rate of 1,564 per 100,000 people aged 10 and over, up from 1,482 the year before. Men accounted for 5,898 of them, at a rate nearly three times the rate for women.',
 series:null,
 breakdown:{label:'Tasmanian offender rate per 100,000 aged 10 and over, 2024–25',total:2314,nopct:true,
   rows:[['Men',2314],['All people',1564],['Women',830]]},
 counts:'People whom police proceeded against during the year, counted once each regardless of how many times. A proceeding can be a charge, a caution, a conference or another formal action. It records what police did, not what a court decided.',
 caveats:['This is the widest measure on the page, and the furthest from imprisonment. Most of these 8,077 people will never see the inside of a prison.','A rising offender rate can reflect more offending, more police activity, or a change in how proceedings are recorded. The figure alone does not separate them.','ROGS reports a related measure: in 2023–24 about 67 per cent of Tasmanian offenders were proceeded against only once in the year, while 6.9 per cent were proceeded against five times or more.'],
 table:'Recorded Crime – Offenders 2024–25, Tasmania'},

/* ============ AIHW — young people ============ */
{src:'aihw',age:'youth',id:'yremand',topic:'Remand',q:'How many young Tasmanians in detention have not been sentenced?',
 fig:'85%',unit:'of young people in Tasmanian detention were unsentenced — 13.4 of 15.8 on an average day',
 plain:'The great majority of young people held in Tasmanian detention have not been sentenced. On an average day 13.4 were on remand and 2.7 were serving a sentence. The remand figure has doubled in five years while the sentenced figure has fallen.',
 series:{years:['2020-21','2021-22','2022-23','2023-24','2024-25'],tas:[6.7,6.9,11.7,13.1,13.4],aust:null,ylabel:'Unsentenced, average day'},
 breakdown:{label:'Young people in detention by legal status, Tasmania, average day 2024–25',total:16.1,
   rows:[['Unsentenced (remand)',13.4],['Sentenced',2.7]]},
 counts:'Young people held in detention awaiting the outcome of their matter, as against those serving a sentence. The AIHW notes the two may not sum to the total, because a young person can change legal status during the same day.',
 caveats:['The AIHW attaches a specific warning to the Tasmanian figures here: they should be read with caution because of potential issues recording and updating custodial order details in Tasmania. That caution applies to the trend as well as the single year.','Detention is the most expensive and most disruptive part of the system, and five-sixths of it is being used on young people who have not been found guilty. That is the finding; what should follow from it is a policy argument, not a statistical one.','These are averages of a very small population. Thirteen young people is a number that moves.'],
 xref:'Among adults, 43 per cent of the Tasmanian prison population was unsentenced. The youth proportion is roughly double that.',gotoId:'remand',
 table:'Tables S108a, S114a, S120a'},

{src:'aihw',age:'youth',id:'ylength',topic:'Supervision',q:'How long do young people spend under supervision?',
 fig:'223',unit:'days on average in Tasmania, against 177 nationally',
 plain:'Young Tasmanians spend an average of 223 days under youth justice supervision during the year, well above the national 177. Time in detention averages 80 days against a national 66. Why Tasmanian supervision runs longer is not yet established from published sources.',
 series:null,
 breakdown:{label:'Average days under supervision during the year, 2024–25',total:223,nopct:true,
   rows:[['Tasmania, all supervision',223.1],['Australia, all supervision',176.9],['Tasmania, detention only',80.2],['Australia, detention only',66.1]]},
 counts:'The average number of days a young person spent under supervision across the year.',
 caveats:['One possible explanation is that Tasmanian courts commonly set youth community orders to run for twelve months. We have not yet confirmed this from a published source, so treat it as a question to ask, not a finding.','Longer supervision is not straightforwardly good or bad. It can mean more sustained support, or more prolonged exposure to the system. The number alone does not say which.','The AIHW also reports the median length of supervision periods completed in 2024–25: 269 days in Tasmania, the longest in the country, against 84 days nationally. For community-based supervision alone the Tasmanian median is 168 days. These count completed periods, not days supervised within the year, so they cannot be set directly against the 223-day average.'],
 xref:'Longer supervision periods raise the number of young people under supervision on any given day, which is part of why Tasmania’s supervision rate is the highest in the country.',gotoId:'ysuper',
 table:'Tables S29, S30, S101, S102'},

{src:'aihw',age:'youth',id:'yyear',topic:'Through the year',q:'How many young Tasmanians go through the youth justice system in a year?',
 fig:'266',unit:'young people under supervision at some point during 2024–25',
 plain:'Although only about 163 young people are under supervision on an average day, 266 passed through the system at some point during the year — 257 under community supervision and 70 in detention. The average-day figure substantially understates how many young people are affected.',
 series:null,
 breakdown:{label:'Tasmania, 2024–25: average day against during the year',total:266,nopct:true,
   rows:[['Under supervision, during the year',266],['Under supervision, average day',162.5],['In detention, during the year',70],['In detention, average day',15.8]]},
 counts:'Counts of distinct young people, all ages, supervised at any time in the year, as against the average number under supervision on a single day. The gap between the two is a measure of turnover: many supervision periods are short, so far more individuals are touched by the system than any single day suggests.',
 caveats:['The detention contrast is the striking one: an average of 16 young people in detention on any day, but 70 individuals passing through across the year.','The during-the-year figures include young people aged 18 and over. Tasmania’s count of 18-plus young people in detention during the year is suppressed because the numbers are too small to publish.','The AIHW changed how it counts receptions from 2024–25, so reception figures are not comparable with earlier years.'],
 table:'Tables S1b, S34b, S72b'},

{src:'aihw',age:'youth',id:'yage',topic:'Age',q:'How old are the young people under supervision?',
 fig:'44',unit:'of the 110 young Tasmanians supervised on an average day were aged 17',
 plain:'Youth justice supervision in Tasmania is concentrated at the older end. On an average day, 17-year-olds accounted for 44 of the 110 supervised young people aged 10 to 17, and 16-year-olds a further 33. Children aged 13 and under accounted for fewer than four.',
 series:null,
 breakdown:{label:'Young people under supervision on an average day by age, Tasmania, 2024–25',total:110.2,
   rows:[['Age 17',44.4],['Age 16',32.5],['Age 15',21.1],['Age 14',8.6],['Age 10–13',3.7]]},
 counts:'Average daily numbers by single year of age. Age is calculated day by day, so a young person who has a birthday during a supervision period contributes to both ages. A further 52 young people aged 18 and over were under supervision, having entered the system as children.',
 caveats:['Because age is calculated day by day, these figures are not comparable with AIHW releases before 2019–20.','The AIHW does not publish rates where there were fewer than five young people, which is why the youngest ages appear only in grouped form.','The concentration at 16 and 17 matters for program design, and it also means a change in how 17-year-olds are handled would move the Tasmanian totals substantially.'],
 table:'Tables S1a, S7a, S137a'},

{src:'aihw',age:'youth',id:'yfn',topic:'Equity',q:'How many Aboriginal young Tasmanians are under supervision?',
 fig:'70.1',unit:'per 10,000 Aboriginal young people aged 10–17, against 14.0 for non-Indigenous',
 plain:'On an average day, 42.7 Aboriginal young Tasmanians aged 10 to 17 were under supervision, a rate of 70.1 per 10,000 against 14.0 for non-Indigenous young people. Across the whole year the Aboriginal rate reaches 131.4 per 10,000. The Aboriginal supervision rate has risen by more than half in five years.',
 series:{years:['2020-21','2021-22','2022-23','2023-24','2024-25'],tas:[45.1,38.8,39.5,54.4,70.1],aust:null,ylabel:'Per 10,000 Aboriginal 10–17'},
 breakdown:{label:'Supervision rate per 10,000 aged 10–17, Tasmania, average day 2024–25',total:70.1,nopct:true,
   rows:[['Aboriginal young people',70.1],['Non-Indigenous young people',14.0],['All young people',20.4]]},
 counts:'Average daily numbers of Aboriginal and Torres Strait Islander young people under supervision, expressed per 10,000 Aboriginal young people aged 10 to 17. The AIHW publishes the two rates side by side and does not calculate a ratio between them.',
 caveats:['The rise from 45.1 to 70.1 over five years is steep, and steeper than the equivalent non-Indigenous rise from 11.0 to 14.0. The gap is widening.','These rates rest on roughly 43 young people. The AIHW does not publish rates where fewer than five young people are involved, and at this scale a small change in the count moves the rate noticeably.','Aboriginal population denominators come from ABS estimates that are sensitive to Census identification. Changes at either end can move a rate without any change in who is supervised.'],
 xref:'ROGS expresses the same concern as a ratio: 3.9 to one in detention, the lowest in the country.',gotoId:'yindig',
 table:'Tables S3a, S4a, S4b, S12a'}
];

/* ---------- charts ---------- */
function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}

function lineChart(s){
  var W=620,H=240,L=56,R=14,T=16,B=38;
  var all=s.tas.concat(s.aust?s.aust:[]);
  var lo=Math.min.apply(null,all),hi=Math.max.apply(null,all);
  var pad=((hi-lo)||hi||1)*0.18; lo=Math.max(0,lo-pad); hi=hi+pad;
  var x=function(i){return L+i*(W-L-R)/Math.max(1,s.years.length-1);};
  var y=function(v){return T+(hi-v)/(hi-lo)*(H-T-B);};
  var ink=css('--ink'),brass=css('--brass'),line=css('--line'),slate=css('--slate');
  var g='',k,v,yy;
  for(k=0;k<=4;k++){
    v=lo+(hi-lo)*k/4; yy=y(v);
    g+='<line x1="'+L+'" y1="'+yy.toFixed(1)+'" x2="'+(W-R)+'" y2="'+yy.toFixed(1)+'" stroke="'+line+'" stroke-width="1"/>';
    g+='<text x="'+(L-8)+'" y="'+(yy+4).toFixed(1)+'" text-anchor="end" fill="'+slate+'" font-family="IBM Plex Mono, monospace" font-size="10">'+(v>=1000?Math.round(v).toLocaleString():((hi-lo)>20?Math.round(v):v.toFixed(1)))+'</text>';
  }
  s.years.forEach(function(yr,i){
    if(s.years.length>6&&i%2===1&&i!==s.years.length-1)return;
    g+='<text x="'+x(i).toFixed(1)+'" y="'+(H-16)+'" text-anchor="middle" fill="'+slate+'" font-family="IBM Plex Mono, monospace" font-size="10">'+yr+'</text>';
  });
  var path=function(a){return a.map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+','+y(v).toFixed(1);}).join(' ');};
  if(s.aust){
    g+='<path d="'+path(s.aust)+'" fill="none" stroke="'+ink+'" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round"/>';
    s.aust.forEach(function(v,i){g+='<circle cx="'+x(i).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="2.5" fill="'+ink+'"/>';});
  }
  g+='<path d="'+path(s.tas)+'" fill="none" stroke="'+brass+'" stroke-width="2.6" stroke-linejoin="round"/>';
  s.tas.forEach(function(v,i){g+='<circle cx="'+x(i).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="'+(i===s.tas.length-1?4.5:3)+'" fill="'+brass+'"/>';});
  g+='<text x="4" y="'+(T+4)+'" fill="'+slate+'" font-family="IBM Plex Mono, monospace" font-size="9">'+s.ylabel+'</text>';
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Trend over time">'+g+'</svg>';
}

function barChart(b){
  var rowH=26,W=620,L=40,R=74,T=6;
  var H=T+J.length*rowH+6;
  var max=Math.max.apply(null,b.vals);
  var ink=css('--ink'),brass=css('--brass'),slate=css('--slate'),line=css('--line'),sage=css('--sage');
  var g='<line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+(T+J.length*rowH)+'" stroke="'+line+'" stroke-width="1"/>';
  J.forEach(function(name,i){
    var v=b.vals[i],isTas=name==='Tas';
    var w=Math.max(1,(v/max)*(W-L-R));
    var yy=T+i*rowH;
    g+='<text x="'+(L-8)+'" y="'+(yy+16)+'" text-anchor="end" fill="'+(isTas?brass:slate)+'" font-family="IBM Plex Mono, monospace" font-size="11">'+name+'</text>';
    g+='<rect x="'+L+'" y="'+(yy+5)+'" width="'+w.toFixed(1)+'" height="14" fill="'+(isTas?brass:sage)+'" opacity="'+(isTas?1:0.4)+'" rx="1"/>';
    g+='<text x="'+(L+w+8).toFixed(1)+'" y="'+(yy+16)+'" fill="'+(isTas?brass:slate)+'" font-family="IBM Plex Mono, monospace" font-size="11">'+b.fmt(v)+'</text>';
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+b.label+'">'+g+'</svg>';
}

function breakdownChart(b){
  var rowH=40,W=620,L=4,R=4,T=6;
  var H=T+b.rows.length*rowH+4;
  var max=Math.max.apply(null,b.rows.map(function(r){return r[1];}));
  var brass=css('--brass'),sage=css('--sage'),slate=css('--slate'),ink=css('--ink');
  var g='';
  b.rows.forEach(function(r,i){
    var name=r[0],v=r[1],yy=T+i*rowH;
    var w=Math.max(2,(v/max)*(W-L-R));
    var tail=b.nopct?String(v):v+' · '+(v/b.total*100).toFixed(0)+'%';
    g+='<text x="'+L+'" y="'+(yy+13)+'" fill="'+ink+'" font-family="Inter, sans-serif" font-size="12.5">'+name+'</text>';
    g+='<text x="'+(W-R)+'" y="'+(yy+13)+'" text-anchor="end" fill="'+slate+'" font-family="IBM Plex Mono, monospace" font-size="11.5">'+tail+'</text>';
    g+='<rect x="'+L+'" y="'+(yy+19)+'" width="'+w.toFixed(1)+'" height="13" fill="'+(i===0?brass:sage)+'" opacity="'+(i===0?1:0.42)+'" rx="1"/>';
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+b.label+'">'+g+'</svg>';
}

/* ---------- render ---------- */
var list=document.getElementById('qlist'),box=document.getElementById('q'),
    sheet=document.getElementById('sheet'),nomatch=document.getElementById('nomatch'),
    tabs=Array.prototype.slice.call(document.querySelectorAll('.tab'));
var AGE=document.getElementById('figures').dataset.age==='youth'?'youth':'adult';
var OTHERPAGE={adult:'youth-justice.html',youth:'justice-figures.html'};
var FIRST={adult:'rate',youth:'ysuper'};
var SRC=tabs[0].dataset.src;
var SRCNAME={rogs:'ROGS',abs:'ABS',aihw:'AIHW'};
var SRCHEAD={
  rogs:'Answer · Report on Government Services 2026',
  abs:'Answer · Australian Bureau of Statistics',
  aihw:'Answer · AIHW Youth Justice in Australia 2024–25'
};
var SRCLINE={
  rogs:function(d){return ROGS_SRC+', data table <code>'+d.table+'</code>. Check the original at <a href="https://www.pc.gov.au/ongoing/report-on-government-services" target="_blank" rel="noopener">pc.gov.au/rogs</a>.';},
  abs:function(d){return d.pub==='offenders'
      ? ABS_OFF_SRC+'. Check the original at <a href="https://www.abs.gov.au/statistics/people/crime-and-justice/recorded-crime-offenders/latest-release" target="_blank" rel="noopener">abs.gov.au</a>.'
      : ABS_SRC+'. Check the original at <a href="https://www.abs.gov.au/statistics/people/crime-and-justice/prisoners-australia/latest-release" target="_blank" rel="noopener">abs.gov.au</a>.';},
  aihw:function(d){return AIHW_SRC+', <code>'+d.table+'</code>. Check the original at <a href="https://www.aihw.gov.au/reports/youth-justice/youth-justice-in-australia-2024-25" target="_blank" rel="noopener">aihw.gov.au</a>.';}
};

function ageOf(d){return d.age==='youth'?'youth':'adult';}
function find(id){return Q.filter(function(x){return x.id===id;})[0];}
function pool(){return Q.filter(function(d){return d.src===SRC&&ageOf(d)===AGE;});}

function renderList(filter){
  var f=(filter||'').trim().toLowerCase();
  var hits=f?pool().filter(function(d){return (d.q+' '+d.topic+' '+d.plain+' '+d.counts).toLowerCase().indexOf(f)>-1;}):pool();
  var row=function(d){return '<li><button type="button" data-id="'+d.id+'"><span class="topic">'+d.topic+'</span><span>'+d.q+'</span></button></li>';};
  var html;
  if(SRC==='abs'&&AGE==='adult'){
    var prison=hits.filter(function(d){return d.pub!=='offenders';}),off=hits.filter(function(d){return d.pub==='offenders';});
    html=(prison.length?'<li class="grouphead">In prison on one night — Prisoners in Australia</li>'+prison.map(row).join(''):'')
        +(off.length?'<li class="grouphead">Dealt with by police across the year — Recorded Crime</li>'+off.map(row).join(''):'');
  }else{ html=hits.map(row).join(''); }
  list.innerHTML=html;
  var none=hits.length===0;
  list.hidden=none; nomatch.hidden=!none;
  if(none)nomatch.textContent='Nothing matches "'+filter.trim()+'" in the '+SRCNAME[SRC]+' questions. Try another source, or clear the box to see them all.';
}

function gotoButton(id){
  var t=find(id); if(!t)return '';
  if(ageOf(t)!==AGE)
    return '<a class="goto" href="'+OTHERPAGE[AGE]+'#fig-'+id+'">See the '+(AGE==='adult'?'youth':'adult')+' figure →</a>';
  return '<button type="button" data-goto="'+id+'">See the '+SRCNAME[t.src]+' answer →</button>';
}

function renderSheet(id,scroll){
  var d=find(id); if(!d||ageOf(d)!==AGE)return;
  if(d.src!==SRC){
    SRC=d.src;
    tabs.forEach(function(o){o.setAttribute('aria-pressed',String(o.dataset.src===SRC));});
    box.value=''; renderList('');
  }
  var charts=[];
  if(d.series)charts.push('<div class="chart"><h3>Tasmania over time</h3><p class="sub">'+(d.series.aust?'Tasmania against the national figure':'Tasmania only — no national series is shown for this measure')+'</p><div class="chart-scroll">'+lineChart(d.series)+'</div><div class="key"><span><i class="swatch" style="background:var(--brass)"></i>Tasmania</span>'+(d.series.aust?'<span><i class="swatch" style="background:var(--ink)"></i>Australia</span>':'')+'</div></div>');
  if(d.breakdown)charts.push('<div class="chart"><h3>The breakdown</h3><p class="sub">'+d.breakdown.label+'</p><div class="chart-scroll">'+breakdownChart(d.breakdown)+'</div></div>');
  if(d.bars)charts.push('<div class="chart"><h3>Across the jurisdictions</h3><p class="sub">'+d.bars.label+'</p><div class="chart-scroll">'+barChart(d.bars)+'</div></div>');
  sheet.innerHTML=
    '<div class="sheet">'
    +'<span class="eyebrow">'+SRCHEAD[d.src]+'</span>'
    +'<h2>'+d.q+'</h2>'
    +'<div class="headline"><span class="figure">'+d.fig+'</span><span class="figure-unit">'+d.unit+'</span></div>'
    +'<p class="plain">'+d.plain+'</p>'
    +(charts.length?'<div class="charts">'+charts.join('')+'</div>':'')
    +'<div class="block"><span class="eyebrow">What this number counts</span><p class="counts">'+d.counts+'</p></div>'
    +'<div class="block"><span class="eyebrow">Read it carefully</span><ul class="caveats">'+d.caveats.map(function(c){return '<li>'+c+'</li>';}).join('')+'</ul></div>'
    +(d.support?'<p class="support">'+d.support+'</p>':'')
    +(d.xref?'<div class="xref"><span class="eyebrow">Compare across sources</span><p>'+d.xref+'</p>'+(d.gotoId?gotoButton(d.gotoId):'')+'</div>':'')
    +'<p class="source">Source: '+SRCLINE[d.src](d)+'</p>'
    +'</div>';
  if(scroll!==false)sheet.scrollIntoView({behavior:'smooth',block:'start'});
}

/* A link from the other page arrives as #fig-<id>; otherwise open the first question without scrolling. */
function openFromHash(){
  var m=/^#fig-([a-z0-9]+)$/.exec(location.hash), d=m&&find(m[1]);
  if(d&&ageOf(d)===AGE){renderSheet(d.id);return true;}
  return false;
}

tabs.forEach(function(t){t.addEventListener('click',function(){
  SRC=t.dataset.src;
  tabs.forEach(function(o){o.setAttribute('aria-pressed',String(o===t));});
  box.value='';
  renderList('');
  renderSheet(pool()[0].id);
});});
list.addEventListener('click',function(e){var b=e.target.closest('button[data-id]');if(b)renderSheet(b.dataset.id);});
sheet.addEventListener('click',function(e){var b=e.target.closest('button[data-goto]');if(b)renderSheet(b.dataset.goto);});
box.addEventListener('input',function(){renderList(box.value);});
window.addEventListener('hashchange',openFromHash);
renderList('');
if(!openFromHash())renderSheet(FIRST[AGE],false);
