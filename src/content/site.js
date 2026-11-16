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
  // The one place the web address is set. If it changes, also update public/_redirects.
  url: 'https://www.learning-for-success.com',
  title: 'LearningForSuccess | Learn How to Learn. Watch Your Grades Follow.',
  description:
    'Study skills and exam revision courses that show students exactly how to learn, so the effort they put in shows up in their grades.',
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
      { label: 'GradeBoost', note: 'Study skills for better grades all year', href: '/gradeboost/' },
      { label: 'Exam Revision', note: 'A clear plan for the weeks before exams', href: '/exam-revision/' },
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
      { label: 'Free Revision Guide', note: 'Start revising smarter tonight', href: '/free-guide/' },
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
    'Nobody teaches you how to study. So you reread, highlight and hope — and your grades never quite match the hours you put in.',
  solution:
    'LearningForSuccess courses give you a simple, repeatable way to study and revise, so your effort finally shows up in your results.',
  secondaryCta: { label: 'Get the Free Guide', href: '/free-guide/' },
};

// Trust strip under the hero. Text only — no logos we have no right to use.
export const trust = {
  label: 'Built for students working towards',
  items: ['GCSE', 'IGCSE', 'A Level', 'IB Diploma'],
  needsReview: 'Confirm which qualifications the courses are aimed at.',
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
      text: 'The study skills school never quite gets round to teaching. Learn how to organise your work, make it stick and stop leaving marks behind.',
      price: null, // e.g. '£49'
      priceLabel: 'Course fee',
      cta: 'Explore GradeBoost',
      short: 'Build the study habits that lift your grades in every subject.',
      href: '/gradeboost/',
    },
    {
      slug: 'exam-revision',
      audience: 'For students with exams on the way',
      title: 'Exam Revision Course',
      text: 'Rate your confidence topic by topic, build a revision timetable around what needs the most work, and walk into the exam hall prepared.',
      price: null,
      priceLabel: 'Course fee',
      cta: 'Explore Exam Revision',
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
  aside: { text: 'Not sure where to start?', label: 'Get the free revision guide', href: '/free-guide/' },
};

// ── Home: the plan ──────────────────────────────────────────────────────────
export const plan = {
  heading: 'Better Grades in Three Simple Steps',
  steps: [
    {
      title: 'Choose Your Course',
      text: 'Pick GradeBoost for year-round study skills, or the Exam Revision Course when exams are getting close.',
    },
    {
      title: 'Learn the Method',
      text: 'Work through short, practical lessons and handouts that show you exactly what to do each time you sit down to study.',
    },
    {
      title: 'Watch Your Grades Follow',
      text: 'Use the method in every subject. When you know how to learn, the effort you put in starts to show in your results.',
    },
  ],
};

// ── Home: what's on offer (the numbered showcase) ───────────────────────────
export const showcase = {
  eyebrow: 'Inside LearningForSuccess',
  heading: 'Everything You Need to Study With Confidence',
  intro: 'Courses, a free guide and support for schools — all built around one clear method.',
  items: [
    {
      tag: 'Course',
      tab: 'GradeBoost',
      title: 'GradeBoost',
      meta: 'Study skills for the whole school year',
      text: 'Stop guessing how to study. GradeBoost shows you how to plan your time, take notes that are worth having and remember what you learn.',
      cta: 'See the GradeBoost Course',
      href: '/gradeboost/',
      art: 'steps',
    },
    {
      tag: 'Course',
      tab: 'Exam Revision',
      title: 'Exam Revision Course',
      meta: 'For the weeks before your exams',
      text: 'Find out which topics need the most work, build a timetable around them and revise in a way that makes the knowledge stay put.',
      cta: 'See the Exam Revision Course',
      href: '/exam-revision/',
      art: 'calendar',
    },
    {
      tag: 'Free Download',
      tab: 'Free Guide',
      title: 'The Free Revision Guide',
      meta: 'A short read you can use tonight',
      text: 'A quick guide to the revision habits that waste your time, and what to do in their place. Yours free.',
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
      text: 'Simon leads Arts and Technology at a British international school and wrote Practice Makes Perfect, a book on how to practise well. These courses bring that same thinking to every subject.',
      cta: 'Meet Your Guide',
      href: '/about/',
      art: 'guideperson',
    },
  ],
};

// ── Home: lead magnet ───────────────────────────────────────────────────────
export const leadMagnet = {
  eyebrow: 'Free Download',
  heading: 'Start Revising Smarter Tonight. A Free Guide.',
  text: 'Find out which common revision habits waste your time, and what to do in their place. Enter your email and the guide is yours.',
  button: 'Send Me the Guide',
  guideTitle: 'The Free Revision Guide',
  guideSubtitle: 'Simple changes that make revision stick',
  needsReview: 'Confirm the free guide exists (title, PDF) and connect the sign-up form to your email provider.',
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
// `enrolUrl: null` means checkout is not connected yet, so the button says
// "Register Your Interest" and points to the contact page.
export const courses = {
  gradeboost: {
    slug: 'gradeboost',
    name: 'GradeBoost',
    audience: 'For students who want better grades all year',
    title: 'GradeBoost — Study Skills for Better Grades | LearningForSuccess',
    description:
      'GradeBoost teaches students the study skills school rarely has time for: planning, note-making and remembering what they learn.',
    heading: 'Work Smarter in Every Subject, All Year Round',
    lead: 'You are putting the hours in. GradeBoost makes sure those hours count, with a clear method for planning, learning and remembering.',
    price: null,
    enrolUrl: null,
    stakes: {
      heading: 'Effort Alone Is Not Enough',
      text: 'Without a method, studying turns into rereading and hoping. That costs you more than marks.',
      items: [
        'Hours of homework that do not move your grades',
        'Notes you never look at again',
        'Topics you understood in class and forgot by the test',
        'That sinking feeling of not knowing where to start',
      ],
    },
    learn: {
      heading: 'What You Will Learn',
      needsReview: 'Draft unit list — replace with the real GradeBoost units.',
      items: [
        { title: 'Plan Your Week', text: 'Set up a routine that fits around school, so study time stops being a daily negotiation.' },
        { title: 'Make Notes Worth Keeping', text: 'Turn lessons into short, clear notes you will be glad to have later.' },
        { title: 'Make It Stick', text: 'Use simple memory techniques so what you learn today is still there next month.' },
        { title: 'Check What You Know', text: 'Test yourself the right way and find the gaps before your teacher does.' },
        { title: 'Beat Putting It Off', text: 'Get started quickly, stay focused and finish with time to spare.' },
        { title: 'Keep It Going', text: 'Build habits that carry you through the year without burning out.' },
      ],
    },
    steps: [
      { title: 'Join the Course', text: 'Sign up and get everything you need in one place.' },
      { title: 'Follow the Lessons', text: 'Short lessons and handouts you can use the same evening.' },
      { title: 'Use It Everywhere', text: 'Apply the method in every subject and watch the difference build.' },
    ],
    faqs: [
      { q: 'Who is GradeBoost for?', a: 'Students who work hard and want that work to show in their grades. Parents often join in for the first few lessons.' },
      { q: 'How much time does it take?', a: null },
      { q: 'How do I get access?', a: null },
    ],
    closing: 'Give Your Hard Work a Method',
  },

  'exam-revision': {
    slug: 'exam-revision',
    name: 'Exam Revision Course',
    audience: 'For students with exams on the way',
    title: 'Exam Revision Course — Revise With a Plan | LearningForSuccess',
    description:
      'Rate your confidence topic by topic, build a revision timetable around what matters most and walk into your exams prepared.',
    heading: 'Walk Into Your Exams Knowing You Are Ready',
    lead: 'Exams are close and the pile of topics is big. This course turns it into a timetable you can follow, one session at a time.',
    price: null,
    enrolUrl: null,
    stakes: {
      heading: 'Revising Without a Plan Wastes the Time You Have Left',
      text: 'Most students revise what they already know, because it feels good. The marks are hiding in the topics they avoid.',
      items: [
        'Starting too late because the job feels too big',
        'Going over favourite topics again and again',
        'Late nights that leave you tired for the exam itself',
        'Walking in unsure what is going to come up',
      ],
    },
    learn: {
      heading: 'What You Will Do',
      needsReview: 'Draft unit list — replace with the real Revision Course units.',
      items: [
        { title: 'List Every Topic', text: 'See the whole job on one page, subject by subject.' },
        { title: 'Rate Your Confidence', text: 'Score each topic so you know exactly where the marks are waiting.' },
        { title: 'Build Your Timetable', text: 'Give the most time to the topics that need it, and fit it around real life.' },
        { title: 'Revise So It Sticks', text: 'Swap rereading for techniques that make you recall and use what you know.' },
        { title: 'Practise Under Exam Conditions', text: 'Use past questions to get used to the clock and the mark scheme.' },
        { title: 'Arrive Calm', text: 'Plan the final week, the night before and the morning of the exam.' },
      ],
    },
    steps: [
      { title: 'Join the Course', text: 'Sign up and get the lessons and handouts straight away.' },
      { title: 'Build Your Plan', text: 'Rate your topics and create a timetable that is yours.' },
      { title: 'Follow It to Exam Day', text: 'Tick off each session and watch your confidence grow.' },
    ],
    faqs: [
      { q: 'When should I start?', a: 'As soon as you know your exam dates. The earlier you start, the lighter each week feels — but the course still helps if time is short.' },
      { q: 'Which exams does it work for?', a: null },
      { q: 'How do I get access?', a: null },
    ],
    closing: 'Turn the Weeks You Have Into a Plan',
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
      { title: 'Access for the Whole Cohort', text: 'GradeBoost and the Exam Revision Course for every student in the year group.' },
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
    'The courses here are short, practical and built for real students with real timetables. Learn the method once, and you can use it for the rest of your education.',
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
        { label: 'Exam Revision Course', href: '/exam-revision/' },
        { label: 'For Schools', href: '/schools/' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { label: 'Free Revision Guide', href: '/free-guide/' },
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
