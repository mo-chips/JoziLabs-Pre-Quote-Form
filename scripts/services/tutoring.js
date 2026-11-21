/**
 * JoziLabs – Service Discovery Module: Code Tutoring & Technical Education
 * scripts/services/tutoring.js
 *
 * Covers JoziLabs' "Teach" service pillar from jozilabs.tech/services:
 * Practical 1-on-1 and small-group programming lessons in Java, Python,
 * Web Development, and Computer Science for university students, school learners,
 * career switchers, and corporate teams.
 */

export const tutoringService = {
  id: 'tutoring',
  title: 'Code Tutoring & Training',
  shortTitle: 'Tutoring',
  categoryBadge: 'TEACH · 1-ON-1 & GROUP',
  tagline: 'Hands-On Java, Python, Web Dev & Computer Science Tutoring',
  description:
    'Practical 1-on-1 and small-group coding lessons taught by computer science practitioners for university students, high school learners, and beginners.',
  startingPriceNote: '1-on-1 & Small-Group · Monthly Lesson Packs',
  estimatedTime: '~1.5 min discovery',
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  highlights: [
    'Python & Java Programming',
    'HTML, CSS & JavaScript Web Dev',
    'University CS & High School IT',
    '1-on-1 or Small-Group Sessions'
  ],

  step1Config: {
    orgLabel: 'University, school or company name (if applicable)',
    orgPlaceholder: 'e.g. University of Johannesburg (UJ), Wits, UNISA, or Self-study',
    orgRequired: false,
    summaryLabel: 'What is the main goal you want to achieve with tutoring?',
    summaryPlaceholder: 'e.g. Pass my 1st-year Java OOP exam and understand data structures practically.'
  },

  stepsMeta: {
    2: {
      shortTitle: '2. Subject & Level',
      title: 'Who Is Learning & What Topics?',
      subtitle: 'Tell us about the learner, programming languages needed, and whether this is for academic coursework or practical skills.'
    },
    3: {
      shortTitle: '3. Format & Schedule',
      title: 'Experience Level, Lesson Format & Schedule',
      subtitle: 'Choose between live online or Johannesburg in-person lessons, 1-on-1 vs small group, and your preferred times.'
    },
    4: {
      shortTitle: '4. Package & Start',
      title: 'Lesson Package, Timeline & Budget',
      subtitle: 'Select how frequently you want lessons, your target start or exam date, and budget ballpark.'
    }
  },

  defaults: {
    learnerProfile: '',
    tutoringSubjects: [],
    academicInstitution: '',
    academicFocusAreas: ['Understand core concepts & write code confidently', 'Exam & test preparation (Past papers)'],
    practicalCareerGoals: ['Build a real-world portfolio project from scratch'],
    tutoringCustomNotes: '',
    codingExperienceLevel: 'Know a few basics — get stuck writing code on my own',
    lessonDeliveryFormat: 'Live Online 1-on-1 (Google Meet / Zoom + Screen-Share)',
    lessonFrequency: '2 sessions per week (Recommended for steady progress)',
    preferredTimeSlots: ['Weekday afternoons / evenings'],
    tutoringLaptopReady: 'Yes — laptop & internet ready to go',
    ongoingServicePreference: 'Weekly Recurring Tutoring Plan (Monthly Pack)',
    estimatedBudget: '',
    timelinePreference: 'Start within 1 – 2 weeks',
    desiredLaunchDate: '',
    milestoneDetails: ''
  },

  options: {
    learnerProfiles: [
      {
        value: 'university',
        label: 'University / College Student',
        description: 'Computer Science, IT, or Engineering modules (e.g. UJ, Wits, UP, UNISA, Rosebank, Richfield, Eduvos).'
      },
      {
        value: 'high_school',
        label: 'High School Learner (Grades 8 – 12)',
        description: 'CAPS or IEB Information Technology (IT), CAT, PAT practical projects, or foundational coding.'
      },
      {
        value: 'beginner_career',
        label: 'Adult Beginner / Career Switcher',
        description: 'Learning programming from scratch to build real apps, automate work, or transition into tech.'
      },
      {
        value: 'team_workshop',
        label: 'Small Group / Company Team Upskilling',
        description: '2–8 classmates or colleagues learning Python, Web Dev, SQL, or AI literacy together.'
      }
    ],
    tutoringSubjects: [
      {
        value: 'java',
        label: 'Java & Object-Oriented Programming (OOP)',
        description: 'Classes, inheritance, polymorphism, arrays, collections, GUI/JavaFX, and university CS coursework.'
      },
      {
        value: 'python',
        label: 'Python Programming & Automation',
        description: 'Fundamentals, functions, file handling, data structures, scripting, and practical problem solving.'
      },
      {
        value: 'web_dev',
        label: 'Web Development (HTML, CSS, JavaScript & React)',
        description: 'Build responsive websites, interactive frontends, DOM manipulation, APIs, and full-stack projects.'
      },
      {
        value: 'cs_databases',
        label: 'CS Fundamentals, Algorithms, SQL & Git',
        description: 'Data structures, algorithm logic, relational databases (SQL), Git/GitHub, and debugging.'
      }
    ],
    academicFocusAreas: [
      'Understand core concepts & write code confidently',
      'Exam & test preparation (Past papers)',
      'Practical assignment / PAT project guidance',
      'Catch up after falling behind in lectures',
      'Debugging & reading error messages without panic'
    ],
    practicalCareerGoals: [
      'Build a real-world portfolio project from scratch',
      'Learn coding fundamentals step-by-step from zero',
      'Automate repetitive spreadsheets or work tasks with Python',
      'Prepare for technical coding interviews',
      'Launch my own website or app idea while learning'
    ],
    codingExperienceLevels: [
      {
        value: 'Complete beginner — never written code before',
        label: 'Complete Beginner',
        description: 'Starting from zero — no prior coding experience required.'
      },
      {
        value: 'Know a few basics — get stuck writing code on my own',
        label: 'Beginner / Struggling with Practicals',
        description: 'I follow lectures or tutorials, but freeze when facing a blank screen or assignment.'
      },
      {
        value: 'Intermediate — need help with specific advanced topics',
        label: 'Intermediate Learner',
        description: 'Comfortable with basics; need targeted coaching on OOP, data structures, or full-stack projects.'
      }
    ],
    lessonDeliveryFormats: [
      'Live Online 1-on-1 (Google Meet / Zoom + Screen-Share)',
      'Small-Group Online (2–4 friends/classmates — split the rate)',
      'In-Person in Johannesburg (Auckland Park / Campus / Agreed Hub)',
      'Hybrid (Online weekly + In-person before major exams)'
    ],
    lessonFrequencies: [
      '1 session per week (1.5 – 2 hours)',
      '2 sessions per week (Recommended for steady progress)',
      'Intensive exam crash-course (3+ sessions in a short window)',
      'Flexible / As needed'
    ],
    preferredTimeSlots: [
      'Weekday mornings',
      'Weekday afternoons / evenings',
      'Saturday mornings / afternoons',
      'Sunday sessions'
    ],
    tutoringSetupOptions: [
      { value: 'Yes — laptop & internet ready to go', label: 'Yes, laptop & internet ready' },
      { value: 'Have a laptop, but need help installing Java / Python / VS Code', label: 'Need help installing the coding tools in Lesson 1' }
    ],
    ongoingSupportOptions: [
      {
        value: 'Weekly Recurring Tutoring Plan (Monthly Pack)',
        label: 'Monthly Lesson Package (Recommended)',
        description: 'Structured weekly sessions, practice exercises between lessons, and WhatsApp Q&A support.'
      },
      {
        value: 'Short-Term Exam / Assignment Prep Sprint',
        label: 'Once-Off Exam or Project Sprint (2 – 6 Sessions)',
        description: 'Focused sessions targeting an upcoming test, semester exam, or practical milestone.'
      },
      {
        value: 'Start with a single trial session first',
        label: 'Book 1 Trial Session First',
        description: 'Try an introductory 1-hour session to assess your level and map out a study plan.'
      }
    ],
    budgetRanges: [
      {
        value: 'R300 – R750 (Trial / 1–2 Sessions)',
        label: 'R300 – R750',
        note: 'Single trial lesson or quick 2-hour exam Q&A',
        tiers: ['trial_pack']
      },
      {
        value: 'R800 – R1,600 / month',
        label: 'R800 – R1,600 / pm',
        note: 'Standard monthly pack (~4 to 6 hours of 1-on-1 or group tutoring)',
        tiers: ['standard_pack']
      },
      {
        value: 'R1,600 – R3,200 / month',
        label: 'R1,600 – R3,200 / pm',
        note: 'Intensive pack (8+ hours / twice-weekly lessons & exam prep)',
        tiers: ['intensive_pack']
      },
      {
        value: 'R3,500+ (Group / Corporate / Full Bootcamp)',
        label: 'R3,500+',
        note: 'Full semester mentorship or small-team training workshop',
        tiers: ['team_pack']
      }
    ],
    timelineOptions: [
      { value: 'Urgent — Test or assignment due this week!', label: 'Urgent (Test / Exam very soon)' },
      { value: 'Start within 1 – 2 weeks', label: 'Within 1 – 2 weeks' },
      { value: 'Start at the beginning of next term / semester', label: 'Next term / semester' },
      { value: 'Specific launch date / event', label: 'Specific exam or deadline date' }
    ]
  },

  getFlowState(data) {
    const isAcademic =
      data.learnerProfile === 'university' || data.learnerProfile === 'high_school';
    const isPractical =
      data.learnerProfile === 'beginner_career' || data.learnerProfile === 'team_workshop';
    const hasPickedProfile = isAcademic || isPractical;

    let budgetRecommendation = {
      text: 'Select the lesson package or monthly budget range that works best for you.',
      highlightTier: 'standard_pack'
    };

    if (data.ongoingServicePreference === 'Start with a single trial session first') {
      budgetRecommendation = {
        text: 'Typical range for a single trial session or 2-hour topic review: R300 – R750.',
        highlightTier: 'trial_pack'
      };
    } else if (data.learnerProfile === 'team_workshop') {
      budgetRecommendation = {
        text: 'Typical range for small-group or team coding workshops: R1,600 – R3,500+.',
        highlightTier: 'team_pack'
      };
    } else if ((data.lessonFrequency || '').startsWith('Intensive') || (data.lessonFrequency || '').startsWith('2 ')) {
      budgetRecommendation = {
        text: 'Typical range for twice-weekly lessons or intensive exam prep: R1,600 – R3,200 / month.',
        highlightTier: 'intensive_pack'
      };
    } else if (hasPickedProfile) {
      budgetRecommendation = {
        text: 'Typical range for weekly 1-on-1 or small-group coding lessons: R800 – R1,600 / month.',
        highlightTier: 'standard_pack'
      };
    }

    return {
      isAcademic,
      isPractical,
      hasPickedProfile,
      showSpecificDateInput: data.timelinePreference === 'Specific launch date / event',
      budgetRecommendation
    };
  },

  getRequiredFields(stepId) {
    if (stepId === 2) {
      return ['learnerProfile', 'tutoringSubjects'];
    }
    if (stepId === 4) {
      return ['estimatedBudget'];
    }
    return [];
  },

  validateField(fieldName, data) {
    switch (fieldName) {
      case 'learnerProfile':
        if (!data.learnerProfile) {
          return 'Please select who the tutoring lessons are for.';
        }
        return null;
      case 'tutoringSubjects':
        if (!Array.isArray(data.tutoringSubjects) || data.tutoringSubjects.length === 0) {
          return 'Please select at least one programming language or topic to learn.';
        }
        return null;
      case 'estimatedBudget':
        if (!data.estimatedBudget) {
          return 'Please select a lesson package / budget range.';
        }
        return null;
      default:
        return null;
    }
  },

  buildReview(data, flow) {
    const profileLabel =
      this.options.learnerProfiles.find((p) => p.value === data.learnerProfile)?.label ||
      data.learnerProfile;
    const subjectLabels = (data.tutoringSubjects || []).map(
      (val) => this.options.tutoringSubjects.find((s) => s.value === val)?.label || val
    );

    const step2Items = [
      { label: 'Learner Profile', value: profileLabel },
      { label: 'Programming Topics', tags: subjectLabels, fullSpan: true }
    ];

    if (flow.isAcademic) {
      step2Items.push(
        { label: 'Institution / Module Code', value: data.academicInstitution || 'Not specified' },
        { label: 'Academic Focus', tags: data.academicFocusAreas, fullSpan: true }
      );
    }

    if (flow.isPractical) {
      step2Items.push({
        label: 'Practical Learning Outcomes',
        tags: data.practicalCareerGoals,
        fullSpan: true
      });
    }

    if (data.tutoringCustomNotes) {
      step2Items.push({ label: 'Specific Topics / Notes', value: data.tutoringCustomNotes, fullSpan: true });
    }

    const step3Items = [
      { label: 'Current Coding Level', value: data.codingExperienceLevel },
      { label: 'Lesson Format', value: data.lessonDeliveryFormat },
      { label: 'Session Frequency', value: data.lessonFrequency },
      { label: 'Preferred Time Slots', tags: data.preferredTimeSlots }
    ];

    const step4Items = [
      { label: 'Package / Budget (ZAR)', value: data.estimatedBudget },
      {
        label: 'Target Start / Exam Date',
        value:
          flow.showSpecificDateInput && data.desiredLaunchDate
            ? `${data.desiredLaunchDate}${data.milestoneDetails ? ` (${data.milestoneDetails})` : ''}`
            : data.timelinePreference
      },
      { label: 'Equipment Readiness', value: data.tutoringLaptopReady },
      { label: 'Lesson Plan Structure', value: data.ongoingServicePreference, fullSpan: true }
    ];

    return [
      { stepId: 2, title: 'Learner Profile & Programming Topics', items: step2Items },
      { stepId: 3, title: 'Experience Level, Format & Schedule', items: step3Items },
      { stepId: 4, title: 'Lesson Package, Timeline & Budget', items: step4Items }
    ];
  },

  buildPayload(data, flow) {
    return {
      serviceScope: {
        learnerProfile: data.learnerProfile,
        subjects: data.tutoringSubjects,
        academicContext: flow.isAcademic
          ? {
              institutionOrModule: (data.academicInstitution || '').trim() || null,
              focusAreas: data.academicFocusAreas
            }
          : null,
        practicalContext: flow.isPractical
          ? {
              careerOrProjectGoals: data.practicalCareerGoals
            }
          : null,
        specificTopicsNotes: (data.tutoringCustomNotes || '').trim() || null
      },
      technicalAndDeliverables: {
        codingExperienceLevel: data.codingExperienceLevel,
        lessonDeliveryFormat: data.lessonDeliveryFormat,
        lessonFrequency: data.lessonFrequency,
        preferredTimeSlots: data.preferredTimeSlots
      },
      setupBudgetAndTimeline: {
        laptopAndSoftwareReadiness: data.tutoringLaptopReady,
        ongoingServicePreference: data.ongoingServicePreference,
        estimatedBudget: data.estimatedBudget,
        timelinePreference: data.timelinePreference,
        desiredLaunchDate: flow.showSpecificDateInput ? data.desiredLaunchDate || null : null,
        milestoneDetails: flow.showSpecificDateInput ? (data.milestoneDetails || '').trim() || null : null
      }
    };
  },

  buildTextSummary(payload) {
    const p = payload.serviceScope;
    const d = payload.technicalAndDeliverables;
    const t = payload.setupBudgetAndTimeline;

    const lines = [
      '2. CODE TUTORING & EDUCATION SCOPE',
      `   • Learner Profile:   ${p.learnerProfile}`,
      `   • Subjects/Topics:   ${(p.subjects || []).join(', ')}`
    ];

    if (p.academicContext) {
      lines.push(
        `   • [Institution]:     ${p.academicContext.institutionOrModule || 'Not specified'}`,
        `   • [Academic Focus]:  ${(p.academicContext.focusAreas || []).join(', ')}`
      );
    }
    if (p.practicalContext) {
      lines.push(`   • [Practical Goals]: ${(p.practicalContext.careerOrProjectGoals || []).join(', ')}`);
    }
    if (p.specificTopicsNotes) {
      lines.push(`   • Specific Topics:   ${p.specificTopicsNotes}`);
    }

    lines.push(
      '',
      '3. EXPERIENCE LEVEL, FORMAT & SCHEDULE',
      `   • Experience Level:  ${d.codingExperienceLevel}`,
      `   • Lesson Format:     ${d.lessonDeliveryFormat}`,
      `   • Frequency:         ${d.lessonFrequency}`,
      `   • Preferred Times:   ${(d.preferredTimeSlots || []).join(', ')}`,
      '',
      '4. LESSON PACKAGE, TIMELINE & BUDGET',
      `   • Package / Budget:  ${t.estimatedBudget}`,
      `   • Start / Exam Date: ${t.timelinePreference}${
        t.desiredLaunchDate ? ` (${t.desiredLaunchDate} - ${t.milestoneDetails || ''})` : ''
      }`,
      `   • Laptop Readiness:  ${t.laptopAndSoftwareReadiness}`,
      `   • Plan Structure:    ${t.ongoingServicePreference}`
    );

    return lines;
  }
};

export default tutoringService;
