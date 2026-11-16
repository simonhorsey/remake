// ─────────────────────────────────────────────────────────────────────────────
// All site copy lives here. Edit this file to change words, prices and links.
//
// DRAFT MODE: while `draft` is true, anything still waiting on you shows a small
// "Draft" tag on the page so nothing unconfirmed can be mistaken for final copy.
// Fill a value in (replace `null`) and its tag disappears. Set `draft: false`
// before launch — anything still `null` is then hidden instead of tagged.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  draft: true,
  name: 'LearningForSuccess',
  programme: 'Essentials for Learning',
  // The one place the web address is set.
  url: 'https://www.learning-for-success.com',
  title: 'LearningForSuccess | Learn How to Learn. Watch Your Grades Follow.',
  description:
    'Study skills and exam revision courses for the age of AI: learn how to understand, remember and think for yourself, and watch your grades follow.',
  locale: 'en-GB',

  // Where the forms send to. null = not connected yet (form shows a notice).
  forms: {
    leadMagnetAction: null, // e.g. your email provider's form endpoint
    contactAction: null,
  },
  contactEmail: null, // e.g. 'hello@learning-for-success.com'
  social: [], // e.g. [{ label: 'Instagram', href: 'https://…' }]
};

// ── Header navigation ───────────────────────────────────────────────────────
export const nav = [
  {
    label: 'Courses',
    items: [
      { label: 'GradeBoost', note: 'The full study skills course, one unit a week', href: '/gradeboost/' },
      { label: 'ExamX Revision', note: 'A clear plan for the run-up to exams', href: '/exam-revision/' },
    ],
  },
  {
    label: 'For Schools',
    items: [
      { label: 'Bring It to Your School', note: 'Study skills for a whole year group', href: '/schools/' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Free Quick Wins Guide', note: 'Five techniques to use tonight', href: '/free-guide/' },
      { label: 'Meet Your Guide', note: 'The teacher behind the courses', href: '/about/' },
      { label: 'Contact', note: 'Ask a question', href: '/contact/' },
    ],
  },
];

export const primaryCta = { label: 'Choose Your Course', href: '/#paths' };

// ── Home: hero ──────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'Essentials for Learning',
  heading: 'Learn How to Learn. Then Watch Your Grades Follow.',
  problem:
    'AI can hand you an answer in seconds. It cannot understand it, remember it or judge it for you — and in the exam hall, that part is all yours.',
  solution:
    'Our courses teach the techniques that build real knowledge, from active recall to a revision plan you will stick to. It takes effort. The effort is where the learning happens.',
  secondaryCta: { label: 'Get the Free Guide', href: '/free-guide/' },
};

// Strip under the hero: the techniques the courses teach.
export const trust = {
  label: 'Techniques you will learn',
  items: ['Active recall', 'Cornell notes', 'SQ3R', 'Mind maps', 'Memory systems', 'Pomodoro', 'Time boxing'],
};

// ── Home: the three paths ───────────────────────────────────────────────────
export const paths = {
  eyebrow: 'Ways to Learn With Us',
  heading: 'Choose the Path That Fits Where You Are Right Now',
  items: [
    {
      slug: 'gradeboost',
      audience: 'For students who want better grades all year',
      title: 'GradeBoost',
      text: 'Seven units that take you from note-taking to memory to beating procrastination. Take one a week and build habits that last through school and beyond.',
      price: 'Opening soon',
      priceLabel: 'Enrolment',
      cta: 'Explore GradeBoost',
      short: 'Build the study habits that lift your grades in every subject.',
      href: '/gradeboost/',
    },
    {
      slug: 'exam-revision',
      audience: 'For students with exams on the way',
      title: 'ExamX Revision',
      text: 'Work out which subjects need you most, build a revision plan that survives real life, and use the quick-win techniques that make knowledge stick.',
      price: 'Opening soon',
      priceLabel: 'Enrolment',
      cta: 'Explore ExamX Revision',
      short: 'Turn the weeks before your exams into a plan you can follow.',
      href: '/exam-revision/',
    },
    {
      slug: 'schools',
      audience: 'For schools and teachers',
      title: 'Essentials for Learning in Your School',
      text: 'Give a whole year group the same clear method for studying and revising, with materials your staff can pick up and use.',
      price: 'Pricing on request',
      priceLabel: 'Whole-cohort access',
      cta: 'Talk to Us About Schools',
      short: 'One shared method for studying and revising, across a year group.',
      href: '/schools/',
    },
  ],
  aside: { text: 'Not sure where to start?', label: 'Get the free Quick Wins guide', href: '/free-guide/' },
};

// ── Home: the plan ──────────────────────────────────────────────────────────
export const plan = {
  heading: 'Better Grades in Three Simple Steps',
  steps: [
    {
      title: 'Choose Your Course',
      text: 'Pick GradeBoost to build study skills for the long run, or ExamX Revision when exams are getting close. Start today with the free guide.',
    },
    {
      title: 'Learn the Method',
      text: 'Watch a short video lesson, then try the technique straight away on your own work. Every unit ends with something to do, not just something to know.',
    },
    {
      title: 'Watch Your Grades Follow',
      text: 'Keep using the techniques in every subject. Results improve and, because your technique is good, the work gets lighter.',
    },
  ],
};

// ── Home: what's on offer (the numbered showcase) ───────────────────────────
export const showcase = {
  eyebrow: 'Inside LearningForSuccess',
  heading: 'Everything You Need to Study With Confidence',
  intro: 'Two courses, a free guide and support for schools — all built on techniques that work.',
  items: [
    {
      tag: 'Course',
      tab: 'GradeBoost',
      title: 'GradeBoost',
      meta: 'Seven units · one a week',
      text: 'Cornell notes, SQ3R reading, study guides, memory systems, time management and looking after your brain. Each unit gives you one skill to master before you move on.',
      cta: 'See the GradeBoost Course',
      href: '/gradeboost/',
      art: 'steps',
    },
    {
      tag: 'Course',
      tab: 'ExamX Revision',
      title: 'ExamX Revision',
      meta: 'For the run-up to your exams',
      text: 'Sort your subjects by urgency and importance, plan your sessions around real life, then revise with active recall, past papers and memory techniques.',
      cta: 'See ExamX Revision',
      href: '/exam-revision/',
      art: 'calendar',
    },
    {
      tag: 'Free Download',
      tab: 'Free Guide',
      title: 'Quick Wins: Five Study Techniques AI Cannot Do for You',
      meta: 'A nine-page guide you can use tonight',
      text: 'Why highlighters fool you, how to summarise in three steps, the SQ3R reading method, the 25-minute timer and how to sit a past paper properly. Yours free.',
      cta: 'Get the Free Guide',
      href: '/free-guide/',
      art: 'guide',
    },
    {
      tag: 'For Schools',
      tab: 'Schools',
      title: 'Essentials for Learning in Your School',
      meta: 'For year groups and tutor programmes',
      text: 'Teachers know students need study skills, yet the timetable rarely leaves room. Give your cohort one shared method they can use in every lesson.',
      cta: 'Talk to Us About Your School',
      href: '/schools/',
      art: 'school',
    },
    {
      tag: 'Your Guide',
      tab: 'Meet Simon',
      title: 'Taught by a Teacher Who Has Seen What Works',
      meta: 'Simon Horsey · teacher and author',
      text: 'Simon leads Arts and Technology at a British international school and wrote Practice Makes Perfect, a book on how to practise well. These courses bring that same thinking to every subject you study.',
      cta: 'Meet Your Guide',
      href: '/about/',
      art: 'guideperson',
    },
  ],
};

// ── Home: lead magnet ───────────────────────────────────────────────────────
export const leadMagnet = {
  eyebrow: 'Free Download',
  heading: 'Five Study Techniques AI Cannot Do for You. A Free Guide.',
  text: 'AI can serve up an answer. Only you can learn it. Get five quick wins from the courses that make your brain do the work — and start tonight.',
  button: 'Send Me the Guide',
  guideTitle: 'Quick Wins',
  guideSubtitle: 'Five study techniques AI cannot do for you',
  // The PDF is built from guide/guide.html with `npm run guide`. Link to this
  // address from the welcome email your email provider sends.
  pdfUrl: '/downloads/quick-wins-study-guide.pdf',
  points: [
    'Put the highlighter down, and what to do with your pen instead',
    'Read, close, write: the three-step summary that makes you recall',
    'SQ3R: how to read a chapter so it stays read',
    'The 25-minute timer that gets you started when you would rather not',
    'How to sit a past paper so it shows you what to revise next',
  ],
  needsReview: 'The guide is drafted in your name — read it through, then connect this form to your email provider so sign-ups receive it.',
};

// ── Home: testimonials ──────────────────────────────────────────────────────
// Add real quotes here. Until then the page shows clearly labelled blanks.
// { quote: '…', name: 'First name L.', role: 'Year 11 student', group: 'Student' }
export const testimonials = {
  eyebrow: 'What Students and Parents Say',
  heading: 'Students Trust the Method Because It Works',
  intro: 'When students know how to learn, the change shows up in their confidence first — and then in their grades.',
  items: [],
  placeholderGroups: ['Student', 'Parent', 'Teacher'],
};

// ── Home: closing call to action ────────────────────────────────────────────
export const closing = {
  eyebrow: 'Your Next Step',
  heading: 'Stop Hoping the Work Pays Off. Know That It Will.',
  text: 'Pick the path that fits you and we will show you what to do next.',
};

// ── Course pages ────────────────────────────────────────────────────────────
// Unit lists and wording are taken from the course slide decks.
// `enrolUrl: null` means checkout is not connected yet, so the button says
// "Register Your Interest" and points to the contact page.
export const courses = {
  gradeboost: {
    slug: 'gradeboost',
    name: 'GradeBoost',
    audience: 'For students who want better grades all year',
    title: 'GradeBoost — The Study Skills Course | LearningForSuccess',
    description:
      'GradeBoost is a seven-unit study skills course: note-taking, reading, study guides, memory, time management and looking after your brain.',
    heading: 'Learn the Techniques Once. Use Them in Every Subject.',
    lead: 'Reading the chapter and thinking you have learned it will not cut it. GradeBoost gives you seven units of techniques that do — and over time you end up doing less work, because your technique is good.',
    price: null,
    enrolUrl: null, // add the checkout link here when the course opens
    stakes: {
      heading: 'Hard Work With Poor Technique Is Wasted Work',
      text: 'Ever wonder why some students seem to have more free time than you, with the same amount to study? They are not cleverer. They have better habits.',
      items: [
        'Cramming everything into the night before the exam',
        'Highlighting so much that nothing stands out',
        'Studying with your phone, the TV or music competing for attention',
        'Long sessions with no breaks, and little to show for them',
        'Putting it off until there is no time left to do it well',
      ],
    },
    learn: {
      heading: 'Seven Units. One Skill at a Time.',
      items: [
        { title: 'Use Every Way You Learn', text: 'You are not just a "visual learner". See it, say it and do it — using all three is the key.' },
        { title: 'Take Notes Worth Keeping', text: 'Cornell notes, the read–close–write summary and the SQ3R reading method turn pages into understanding.' },
        { title: 'Build Your Own Study Guides', text: 'Topic summaries, chapter reviews, mind maps and past papers that show you exactly what you do not know yet.' },
        { title: 'Remember More', text: 'Test your memory, then train it with the link system, pegs, mnemonics and chunking.' },
        { title: 'Take Control of Your Time', text: 'Audit your habits, then use Pomodoro, time boxing and a set of steps for beating procrastination.' },
        { title: 'Look After Your Brain', text: 'Food, water, exercise, sleep and stress all change how well you learn. Small habits make a big difference.' },
      ],
      includes: [
        'Short video lessons you can pause and replay',
        'A quick quiz at the end of each unit to help it stick',
        'A study spreadsheet to track what you have covered and when to review it',
        'Downloads such as the procrastination log',
        'A private group for sharing what is working',
      ],
      includesReview: 'These come from your slides — confirm each one will be part of the finished course.',
    },
    steps: [
      { title: 'Join the Waiting List', text: 'The course opens soon. Add your name and you will hear first.' },
      { title: 'Take One Unit a Week', text: 'Watch the lesson, then spend the week using the technique on your own school work.' },
      { title: 'Use It Everywhere', text: 'Carry each technique into every subject, and build a streak you will not want to break.' },
    ],
    faqs: [
      { q: 'Who is GradeBoost for?', a: 'Students who work hard and want that work to show in their grades. The techniques apply to any subject, with examples from maths, science, history and languages.' },
      { q: 'How much time does it take?', a: 'There are seven units. Spend a week on each one: learn the technique, then practise it on your real school work until it becomes a habit.' },
      { q: 'My exams are only a few weeks away. Is this the right course?', a: 'Start with ExamX Revision, which is built for the run-up to exams. Come back to GradeBoost afterwards and you should never be in that position again.' },
      { q: 'How do I get access?', a: 'GradeBoost is being finished now. Join the waiting list and you will be among the first to know when it opens.' },
    ],
    closing: 'Good Technique Beats Long Hours',
  },

  'exam-revision': {
    slug: 'exam-revision',
    name: 'ExamX Revision',
    audience: 'For students with exams on the way',
    title: 'ExamX Revision — Revise With a Plan | LearningForSuccess',
    description:
      'ExamX Revision helps you prioritise your subjects, build a revision plan that survives real life and revise with techniques that make knowledge stick.',
    heading: 'Walk Into Your Exams Knowing You Are Ready',
    lead: 'Not every subject needs the same amount of revision. ExamX Revision shows you where your time should go, then gives you the techniques to make every session count.',
    price: null,
    enrolUrl: null, // add the checkout link here when the course opens
    stakes: {
      heading: 'A Timetable Is Not a Plan',
      text: 'Most revision timetables collapse the first time football runs to extra time. Then it feels like there is no point starting at all.',
      items: [
        'Giving every subject the same time, whether it needs it or not',
        'Going back over the topics you already know',
        'Highlighting the textbook and calling it revision',
        'Leaving past papers until it is too late to act on them',
        'Waiting to feel motivated before you begin',
      ],
    },
    learn: {
      heading: 'What You Will Do',
      items: [
        { title: 'Decide What Matters Most', text: 'Use your results, your teachers and the priority matrix to sort subjects by urgency and importance.' },
        { title: 'Make a Plan That Bends', text: 'Schedule 40-minute sessions around real life, keep the plan separate from the schedule, and track what you have covered.' },
        { title: 'Get Quick Wins', text: 'Survey, question, read, recite, review. SQ3R turns a chapter you struggled with into one you understand.' },
        { title: 'Condense Your Notes', text: 'Cornell notes, mind maps and half-page topic summaries — and why you should put the highlighter down.' },
        { title: 'Practise Like It Is Real', text: 'Sit past papers under exam conditions, then use the mark scheme to find the gaps and go back to fill them.' },
        { title: 'Remember and Stay Fresh', text: 'Links, pegs, mnemonics and chunking for memory. Pomodoro and time boxing so you keep going without burning out.' },
      ],
      includes: [
        'Short video lessons, each ending with one action to take',
        'A priority matrix for sorting your subjects',
        'Spreadsheet templates for your revision plan and tracker',
        'Worked examples from history, science, maths and languages',
      ],
      includesReview: 'These come from your slides — confirm each one will be part of the finished course.',
    },
    steps: [
      { title: 'Join the Waiting List', text: 'The course opens soon. Add your name and you will hear first.' },
      { title: 'Build Your Plan', text: 'Prioritise your subjects, break them into topics and set your revision times.' },
      { title: 'Follow It to Exam Day', text: 'Show up each day, track what you cover, and let consistency do what motivation cannot.' },
    ],
    faqs: [
      { q: 'When should I start?', a: 'As soon as you know your exam dates. The earlier you start, the lighter each week feels — and the more times you can review each topic.' },
      { q: 'Which exams does it work for?', a: 'Any exam where you need to understand and recall what you have been taught. The examples come from subjects such as history, science, maths and languages.' },
      { q: 'What is the single most important technique?', a: 'Active recall: closing the book and bringing the information back from memory. It takes more effort than rereading, and that effort is what makes it work.' },
      { q: 'How do I get access?', a: 'ExamX Revision is being finished now. Join the waiting list and you will be among the first to know when it opens.' },
    ],
    closing: 'Consistency Beats Motivation. Start Today.',
  },
};

// ── Schools page ────────────────────────────────────────────────────────────
export const schools = {
  title: 'For Schools — Essentials for Learning | LearningForSuccess',
  description: 'Give a whole year group one clear method for studying and revising, with materials teachers can pick up and use.',
  audience: 'For schools and teachers',
  heading: 'Give Every Student in the Year Group a Method for Learning',
  lead: 'Your students are told to revise. Few are shown how. Essentials for Learning gives your cohort one shared approach they can use in every subject.',
  stakes: {
    heading: 'Study Skills Fall Through the Gaps in the Timetable',
    text: 'Every teacher values study skills, and every scheme of work is already full. So students are left to work it out alone.',
    items: [
      'Capable students who underperform in exams',
      'Revision advice that changes from one classroom to the next',
      'Tutor time with no ready-made programme',
      'Parents asking how they can help at home',
    ],
  },
  offer: {
    heading: 'What Your School Gets',
    needsReview: 'Draft offer — confirm what the schools package includes.',
    items: [
      { title: 'Access for the Whole Cohort', text: 'GradeBoost and ExamX Revision for every student in the year group.' },
      { title: 'Ready-to-Use Materials', text: 'Lessons and handouts that fit into tutor time or study skills sessions.' },
      { title: 'One Shared Language', text: 'Staff, students and parents all talking about revision in the same way.' },
    ],
  },
  steps: [
    { title: 'Get in Touch', text: 'Tell us about your school and the year groups you have in mind.' },
    { title: 'Agree a Plan', text: 'We work out access and timing that suits your calendar.' },
    { title: 'Launch With Your Students', text: 'Your cohort starts using the method straight away.' },
  ],
  closing: 'Bring Essentials for Learning to Your School',
  cta: { label: 'Talk to Us About Your School', href: '/contact/?about=schools' },
};

// ── About page ──────────────────────────────────────────────────────────────
export const about = {
  title: 'Meet Your Guide — Simon Horsey | LearningForSuccess',
  description: 'Simon Horsey is a teacher and author who has spent years working out how students learn best.',
  heading: 'A Teacher Who Has Watched Hard-Working Students Fall Short — and Knows Why',
  lead: 'Bright, hard-working students miss the grades they deserve every year. It is rarely about ability. Almost always, nobody showed them how to study.',
  body: [
    'I am Simon Horsey. I am Head of Arts and Technology at a British international school, and I have seen the same pattern in classroom after classroom: students told to "go and revise" with no idea what that means.',
    'My background is in music, where everyone knows that how you practise matters more than how long. I wrote Practice Makes Perfect: The Keys to Success on Any Musical Instrument about exactly that. Essentials for Learning takes the same idea and applies it to every subject.',
    'It matters more now than it ever has. AI is an amazing tool, but the more answers are served up to us, the more we need knowledge of our own: to check what we are told, to think critically and to be creative. That takes productive struggle, and these courses show you how to struggle well.',
    'The courses are short, practical and built for real students with real timetables. Learn the techniques once, and you can use them for the rest of your education.',
  ],
  credentials: [
    'Head of Arts and Technology at a British international school',
    'Author of Practice Makes Perfect: The Keys to Success on Any Musical Instrument',
    'Author of Essentials for Music Theory, Volume 1',
  ],
  needsReview: 'Draft biography written from your profile — please check every line and add a photo.',
};

// ── Footer ──────────────────────────────────────────────────────────────────
export const footer = {
  tagline: 'Learn how to learn. Then watch your grades follow.',
  columns: [
    {
      label: 'Courses',
      links: [
        { label: 'GradeBoost', href: '/gradeboost/' },
        { label: 'ExamX Revision', href: '/exam-revision/' },
        { label: 'For Schools', href: '/schools/' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { label: 'Free Quick Wins Guide', href: '/free-guide/' },
        { label: 'Meet Your Guide', href: '/about/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
    {
      label: 'Also by Simon Horsey',
      links: [
        { label: 'Essential Music Practice', href: 'https://www.essential-music-practice.com' },
        { label: 'Essential Music Theory', href: 'https://www.essential-music-theory.com' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Use', href: '/terms/' },
  ],
  owner: 'Simon Horsey',
};
