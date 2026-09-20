export const chatbotKnowledge = [
  {
    intent: 'academy_info',
    keywords: ['nextgen academy', 'about nextgen', 'tell me about nextgen academy', 'who are you', 'academy'],
    answer:
      'NextGen Academy is an AI-powered learning platform focused on helping students and professionals build career-ready skills in software development, AI, data, cloud, and design. Our learning paths are designed to be practical, beginner-friendly, and aligned with modern industry needs.',
  },
  {
    intent: 'all_courses',
    keywords: ['courses', 'what courses do you offer', 'all courses', 'programs', 'course list'],
    answer:
      'We offer 8 career-focused programs: Python with AI, Full Stack Development with AI, Java Full Stack with AI, Data Analytics with AI, AI & Machine Learning, Cloud & DevOps, Software Testing with AI, and UI/UX with AI.',
  },
  {
    intent: 'python_ai',
    keywords: ['python', 'python with ai', 'python ai', 'python course', 'tell me about python', 'python with artificial intelligence'],
    answer:
      'Python with AI focuses on Python fundamentals, AI tools, automation, APIs, data processing, and practical applications of AI in real development workflows. It is a strong starting point for learners who want a blend of programming and AI capability.',
  },
  {
    intent: 'full_stack_ai',
    keywords: ['full stack development with ai', 'full stack ai', 'full stack development', 'web development with ai'],
    answer:
      'Full Stack Development with AI helps learners build modern web applications using front-end and back-end technologies while integrating AI tools to improve productivity, workflows, and product thinking.',
  },
  {
    intent: 'java_full_stack_ai',
    keywords: ['java full stack', 'java full stack with ai', 'java', 'java course'],
    answer:
      'Java Full Stack with AI covers backend development, enterprise applications, APIs, Java frameworks, and practical AI-assisted workflows to help learners build scalable, industry-relevant solutions.',
  },
  {
    intent: 'data_analytics_ai',
    keywords: ['data analytics with ai', 'data analytics', 'analytics', 'data course'],
    answer:
      'Data Analytics with AI focuses on data interpretation, reporting, dashboards, analytics workflows, and AI-driven insights that help learners turn raw data into actionable decisions.',
  },
  {
    intent: 'ai_ml',
    keywords: ['ai and machine learning', 'machine learning', 'ai ml', 'ai course', 'artificial intelligence'],
    answer:
      'AI & Machine Learning introduces learners to core AI concepts, model thinking, data patterns, problem framing, and practical ML workflows that prepare them for modern AI-focused roles.',
  },
  {
    intent: 'cloud_devops',
    keywords: ['cloud and devops', 'cloud devops', 'devops', 'cloud'],
    answer:
      'Cloud & DevOps covers infrastructure basics, deployment workflows, automation, environment management, and modern practices used to keep digital systems reliable and scalable.',
  },
  {
    intent: 'software_testing_ai',
    keywords: ['software testing with ai', 'software testing', 'testing', 'qa with ai'],
    answer:
      'Software Testing with AI helps learners understand quality assurance, automation, testing strategies, and AI-assisted testing workflows used in modern engineering teams.',
  },
  {
    intent: 'uiux_ai',
    keywords: ['uiux with ai', 'ui ux', 'ux ui', 'uiux'],
    answer:
      'UI/UX with AI combines interface design thinking, user research, prototyping, and AI-enabled design productivity to help learners create polished digital experiences.',
  },
  {
    intent: 'beginner',
    keywords: ['which course is best for beginners', 'beginner', 'i am new', 'do i need programming experience', 'can beginners join'],
    answer:
      'Yes, many of our courses are designed to be beginner-friendly. If you are just starting, we recommend beginning with Python with AI or a structured beginner path that introduces the basics before advanced project work.',
  },
  {
    intent: 'course_selection',
    keywords: ['which course should i choose', 'best course', 'what should i learn', 'which course should i join', 'help me choose'],
    answer:
      'The right course depends on your goals. If you want programming and AI together, Python with AI or Full Stack Development with AI is a great starting point. If you are interested in data, choose Data Analytics with AI. If you love design, UI/UX with AI is a strong fit.',
  },
  {
    intent: 'ai_learning',
    keywords: ['do you provide ai integrated courses', 'is ai integrated', 'ai integrated learning', 'how is ai used', 'what skills will i learn'],
    answer:
      'Yes. Our programs are designed to integrate AI tools into real learning workflows, helping students build technical skills while learning how AI can support development, analysis, design, and workflow automation.',
  },
  {
    intent: 'projects',
    keywords: ['are the courses project based', 'projects', 'hands on projects', 'real projects', 'do you do projects'],
    answer:
      'Yes. Our courses emphasize project-based learning so students can apply concepts through practical assignments, real-world problem solving, and portfolio-building work.',
  },
  {
    intent: 'contact',
    keywords: ['contact nextgen academy', 'how can i contact nextgen academy', 'contact', 'reach out'],
    answer:
      'You can contact NextGen Academy through the chat or by reaching out via our official contact information on the website. If you need specific details, please share your email and our team will get back to you.',
  },
  {
    intent: 'duration',
    keywords: ['course duration', 'how long are courses', 'duration', 'how many weeks', 'course length'],
    answer:
      'Most NextGen Academy learning paths run for 8 to 12 weeks, depending on the subject and project depth. Each path combines guided lessons, AI-supported practice, and portfolio projects.',
  },
  {
    intent: 'fees',
    keywords: ['fees', 'fee', 'price', 'cost', 'course fee', 'how much does it cost'],
    answer:
      'Course fees depend on the learning path and current cohort. Share your email through the chat and our team can send the latest fee details and enrollment options.',
  },
  {
    intent: 'certification',
    keywords: ['certificate', 'certification', 'do i get a certificate', 'completion certificate'],
    answer:
      'Learners who complete the required lessons and projects can receive a course completion certificate. The academy team can share the exact requirements for your chosen path.',
  },
  {
    intent: 'placement',
    keywords: ['placement', 'job support', 'career support', 'interview help', 'career guidance'],
    answer:
      'Our career-focused paths include practical projects, portfolio guidance, and interview-oriented preparation. Contact the team to learn which support is available for your chosen course.',
  },
  {
    intent: 'schedule',
    keywords: ['class schedule', 'class timings', 'weekend classes', 'online classes', 'live classes'],
    answer:
      'NextGen Academy is built for flexible online learning with guided sessions and practical work. Contact us to confirm the latest cohort schedule and available timings.',
  },
];

export const suggestedQuestions = [
  'What courses do you offer?',
  'Tell me about Python with AI.',
  'Which course is best for beginners?',
];

export const suggestedQuestionsByIntent = {
  academy_info: ['What courses do you offer?', 'Which course is best for beginners?', 'How does AI fit into learning?'],
  all_courses: ['Tell me about Python with AI.', 'Which course is best for beginners?', 'How can I choose the right course?'],
  python_ai: ['What projects will I build with Python?', 'Is Python with AI beginner-friendly?', 'How long is the Python course?'],
  full_stack_ai: ['What technologies are covered in Full Stack Development?', 'What projects will I build?', 'Is the full stack course beginner-friendly?'],
  java_full_stack_ai: ['What technologies are covered in Java Full Stack?', 'What projects will I build?', 'How long is the Java course?'],
  data_analytics_ai: ['What tools will I learn in Data Analytics?', 'What projects will I build?', 'Is data analytics beginner-friendly?'],
  ai_ml: ['What topics are covered in AI and Machine Learning?', 'Is AI and ML beginner-friendly?', 'What projects will I build?'],
  cloud_devops: ['What cloud tools will I learn?', 'What Cloud and DevOps projects will I build?', 'How long is the Cloud and DevOps course?'],
  software_testing_ai: ['What testing tools will I learn?', 'What Software Testing projects will I build?', 'Is software testing beginner-friendly?'],
  uiux_ai: ['What design tools will I learn in UI/UX?', 'What UI/UX projects will I build?', 'Is UI/UX beginner-friendly?'],
  beginner: ['Tell me about Python with AI.', 'How can I choose the right course?', 'Do you offer project-based learning?'],
  course_selection: ['What courses do you offer?', 'Which course is best for beginners?', 'Can I get career support?'],
  ai_learning: ['What courses include AI?', 'What projects will I build?', 'Which course is best for beginners?'],
  projects: ['Which course has the most projects?', 'What projects will I build with Python?', 'Do you provide career support?'],
  contact: ['What are the course fees?', 'How long are the courses?', 'Do you provide career support?'],
  duration: ['What are the course fees?', 'Which course is best for beginners?', 'Do you provide career support?'],
  fees: ['How long are the courses?', 'Which course is best for beginners?', 'How can I contact NextGen Academy?'],
  certification: ['What are the course fees?', 'How long are the courses?', 'Do you provide career support?'],
  placement: ['Which course is best for beginners?', 'What projects will I build?', 'How can I contact NextGen Academy?'],
  schedule: ['What are the course fees?', 'How long are the courses?', 'How can I contact NextGen Academy?'],
};

export const getSuggestedQuestions = (intent) =>
  suggestedQuestionsByIntent[intent] || suggestedQuestions;

export const courseCatalog = [
  {
    name: 'Python with AI',
    icon: '🐍',
    description: 'Learn Python programming while exploring AI tools, automation, APIs, data processing and practical AI applications.',
    topics: ['Python', 'AI APIs', 'Automation', 'Data Processing', 'AI Applications'],
  },
  {
    name: 'Full Stack Development with AI',
    icon: '🌐',
    description: 'Build modern web applications with front-end and back-end technologies while using AI to improve product and workflow efficiency.',
    topics: ['React', 'Node.js', 'Databases', 'API Design', 'AI-assisted Dev'],
  },
  {
    name: 'Java Full Stack with AI',
    icon: '☕',
    description: 'Develop enterprise-grade Java applications with backend architecture, modern tooling, and practical AI-enhanced workflows.',
    topics: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'AI Workflow'],
  },
  {
    name: 'Data Analytics with AI',
    icon: '📊',
    description: 'Understand data interpretation, dashboards, insights, and AI-powered analytics strategies for real-world business decisions.',
    topics: ['SQL', 'Power BI', 'Analytics', 'Insights', 'AI Tools'],
  },
  {
    name: 'AI & Machine Learning',
    icon: '🤖',
    description: 'Gain practical exposure to machine learning concepts, model thinking, workflows, and AI problem-solving approaches.',
    topics: ['ML Concepts', 'Data Patterns', 'Modeling', 'AI Strategy', 'Problem Solving'],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    description: 'Learn how cloud infrastructure, deployment automation, and DevOps practices support modern digital products and systems.',
    topics: ['Cloud Basics', 'Deployment', 'Automation', 'Monitoring', 'CI/CD'],
  },
  {
    name: 'Software Testing with AI',
    icon: '🧪',
    description: 'Discover test strategy, automation frameworks, and AI-assisted quality practices that improve reliability in product releases.',
    topics: ['Testing', 'Automation', 'QA', 'Bug Analysis', 'AI Testing'],
  },
  {
    name: 'UI/UX with AI',
    icon: '🎨',
    description: 'Create engaging user experiences through design systems, prototyping, UX thinking, and AI-assisted product design workflows.',
    topics: ['UX Research', 'Wireframes', 'Prototyping', 'Design Systems', 'AI Design'],
  },
];

export const appInfo = {
  name: 'NextGen Academy',
  tagline: 'Learn Today. Build Tomorrow.',
};
