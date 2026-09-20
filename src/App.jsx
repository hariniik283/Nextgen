import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bell, Bot, BrainCircuit, BookOpenText, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Download, GraduationCap, LoaderCircle, Mail, MapPin, Maximize2, Menu, MessageSquareText, Minimize2, Moon, Phone, Send, Sparkles, Sun, UserRound, X } from 'lucide-react';
import { courseCatalog, getSuggestedQuestions, suggestedQuestions } from './data/chatbotKnowledge';
import { api } from './services/api';

const navItems = ['Home', 'Courses', 'Why Us', 'About', 'Contact'];

const stats = [
  { value: '8+', label: 'Career-Focused Courses' },
  { value: 'AI', label: 'AI-Integrated Learning' },
  { value: 'Industry', label: 'Industry-Oriented Curriculum' },
  { value: 'Beginner', label: 'Beginner-Friendly Programs' },
];

const whyUs = [
  {
    
    title: 'AI-Integrated Learning',
    description: 'Learn how modern AI tools are used in real-world technology workflows.',
  },
  {
    
    title: 'Practical Projects',
    description: 'Focus on hands-on projects instead of only theoretical learning.',
  },
  {
    
    title: 'Career-Focused Curriculum',
    description: 'Courses are designed around practical and industry-relevant skills.',
  },
  {
    
    title: 'Beginner Friendly',
    description: 'Structured learning paths suitable for students and beginners.',
  },
  {
    
    title: 'Future-Ready Skills',
    description: 'Build skills across development, analytics, cloud, AI and design.',
  },
];

const steps = [
  'Choose Your Course',
  'Learn With AI',
  'Build Real Projects',
  'Prepare for Your Career',
];

const learnerOutcomes = [
  { value: '40+', label: 'Portfolio-ready projects' },
  { value: '8', label: 'Career learning paths' },
  { value: '1:1', label: 'Guidance-focused support' },
  { value: '100%', label: 'Practical project emphasis' },
];

const testimonials = [
  {
    quote: 'The project-first structure helped me understand what to build, not just what to memorize.',
    name: 'Aarav Mehta',
    role: 'Python with AI learner',
  },
  {
    quote: 'The AI workflow guidance made the Full Stack path feel current and connected to real product work.',
    name: 'Nisha Patel',
    role: 'Full Stack learner',
  },
  {
    quote: 'I could compare paths clearly and choose a course that matched my interest in analytics.',
    name: 'Rohan Kumar',
    role: 'Data Analytics learner',
  },
];

const faqs = [
  {
    question: 'Are the courses suitable for beginners?',
    answer: 'Yes. The learning paths start with fundamentals and gradually move into practical projects. Python with AI is a strong starting point for learners who are new to technology.',
  },
  {
    question: 'How does AI fit into the learning experience?',
    answer: 'AI is used as a practical learning partner for research, debugging, analysis, design exploration, automation, and productivity while learners still build the underlying skills themselves.',
  },
  {
    question: 'Will I build projects during the course?',
    answer: 'Yes. Each path emphasizes hands-on work and portfolio-ready outcomes so learners can demonstrate what they know through practical assignments.',
  },
  {
    question: 'Can I get help choosing the right course?',
    answer: 'Absolutely. Use the AI Assistant or contact the academy team with your goals, background, and interests. We can help you compare the best-fit learning paths.',
  },
];

const careerQuestions = [
  { key: 'interest', label: 'What are you most interested in?', options: ['Coding', 'Data', 'Design', 'Cloud', 'AI'] },
  { key: 'level', label: 'What is your current skill level?', options: ['I am completely new', 'I know the basics', 'I have built a few projects'] },
  { key: 'time', label: 'How much time can you spend learning each week?', options: ['2-4 hours', '5-8 hours', '9+ hours'] },
  { key: 'goal', label: 'What is your career goal?', options: ['Start a technology career', 'Build products', 'Move into analytics', 'Become an AI specialist', 'Grow in my current role'] },
];

const careerPaths = {
  Coding: ['Python with AI', 'Full Stack Development with AI', 'AI & Machine Learning'],
  Data: ['Python with AI', 'Data Analytics with AI', 'AI & Machine Learning'],
  Design: ['UI/UX with AI', 'Full Stack Development with AI'],
  Cloud: ['Python with AI', 'Cloud & DevOps', 'Full Stack Development with AI'],
  AI: ['Python with AI', 'Data Analytics with AI', 'AI & Machine Learning'],
};

function HumanAssistantIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 via-blue-500/10 to-indigo-500/20 shadow-inner shadow-cyan-300/10"
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" className="h-[4.75rem] w-[4.75rem]" role="presentation">
        <defs>
          <linearGradient id="support-jacket" x1="25" y1="60" x2="70" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#4f46e5" /></linearGradient>
          <linearGradient id="support-shirt" x1="39" y1="52" x2="58" y2="78" gradientUnits="userSpaceOnUse"><stop stopColor="#f8fafc" /><stop offset="1" stopColor="#cbd5e1" /></linearGradient>
        </defs>
        <ellipse cx="48" cy="88" rx="25" ry="4" fill="#0f172a" opacity=".28" />
        <path d="M20 87c2-16 11-26 28-26s26 10 28 26H20Z" fill="url(#support-jacket)" />
        <path d="m38 62 10 14 10-14-4-5H42l-4 5Z" fill="url(#support-shirt)" />
        <path d="m48 76 4 11h-8l4-11Z" fill="#1e40af" opacity=".75" />
        <rect x="57" y="72" width="8" height="11" rx="2" fill="#e0f2fe" opacity=".9" />
        <path d="M59 75h4M59 78h3" stroke="#2563eb" strokeLinecap="round" strokeWidth="1" />
        <rect x="34" y="21" width="28" height="31" rx="14" fill="#f2c39f" />
        <path d="M34 34c-1-12 5-21 16-21 8 0 14 5 15 15-5-1-9-4-12-8-4 7-10 11-19 11v3Z" fill="#172554" />
        <path d="M34 34c-2 1-3 4-1 7 1 2 2 3 4 3v-9l-3-1ZM62 34c2 1 3 4 1 7-1 2-2 3-4 3v-9l3-1Z" fill="none" stroke="#38bdf8" strokeLinecap="round" strokeWidth="2" />
        <path d="M34 37c-5 0-7 3-7 7 0 3 2 5 5 5" fill="none" stroke="#38bdf8" strokeLinecap="round" strokeWidth="2" />
        <circle cx="41.5" cy="37" r="1.5" fill="#172554" /><circle cx="54.5" cy="37" r="1.5" fill="#172554" />
        <path d="M43 44c3 2 7 2 10 0" fill="none" stroke="#a45c4d" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M48 47v3" stroke="#d99c7e" strokeLinecap="round" strokeWidth="1.5" />
        <circle cx="29" cy="44" r="2" fill="#67e8f9" />
      </svg>
    </motion.div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nextgen_theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! 👋 Welcome to NextGen Academy.\n\nI\'m your AI Assistant. I can help you explore our courses, learning paths, curriculum, and general academy information.\n\nWhat would you like to know?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [chatSuggestions, setChatSuggestions] = useState(suggestedQuestions);
  const [typing, setTyping] = useState(false);
  const [leadForm, setLeadForm] = useState({ email: '', question: '', isOpen: false, isSubmitted: false, isSubmitting: false });
  const [adminMode, setAdminMode] = useState(false);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('nextgen_admin_token') || '');
  const [loginForm, setLoginForm] = useState({ email: 'admin@nextgenacademy.com', password: 'admin123' });
  const [leadData, setLeadData] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMinimized, setChatMinimized] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(courseCatalog[0]);
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [leadSort, setLeadSort] = useState('newest');
  const [leadPage, setLeadPage] = useState(1);
  const [selectedLeadHistory, setSelectedLeadHistory] = useState(null);
  const [careerFinderOpen, setCareerFinderOpen] = useState(false);
  const [careerStep, setCareerStep] = useState(0);
  const [careerAnswers, setCareerAnswers] = useState({});
  const [careerResult, setCareerResult] = useState(null);
  const [chatContext, setChatContext] = useState(null);
  const [dismissedHandoffIds, setDismissedHandoffIds] = useState([]);
  const [activeHandoffId, setActiveHandoffId] = useState(null);
  const chatEndRef = useRef(null);
  const leadPageSize = 6;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('nextgen_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, typing]);

  useEffect(() => {
    if (adminToken) {
      loadLeads();
    }
  }, [adminToken]);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const filteredLeads = useMemo(() => {
    const filtered = leadData.filter((lead) => {
      const matchesStatus = statusFilter === 'all' ? true : lead.status === statusFilter;
      const matchesSearch = `${lead.email} ${lead.question}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    return filtered.sort((first, second) => {
      const firstDate = new Date(first.timestamp).getTime();
      const secondDate = new Date(second.timestamp).getTime();
      return leadSort === 'oldest' ? firstDate - secondDate : secondDate - firstDate;
    });
  }, [leadData, leadSort, searchQuery, statusFilter]);

  const pagedLeads = filteredLeads.slice((leadPage - 1) * leadPageSize, leadPage * leadPageSize);
  const totalLeadPages = Math.max(1, Math.ceil(filteredLeads.length / leadPageSize));

  const getLeadHistory = (lead) =>
    lead.chatHistory?.length
      ? lead.chatHistory
      : [{ sender: 'user', text: lead.question, time: new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];

  const appendAssistantMessage = (text) => {
    setChatMessages((prev) => [...prev, {
      id: Date.now(),
      sender: 'ai',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const openChat = ({ course = null, mode = 'question' } = {}) => {
    setChatOpen(true);
    setChatMinimized(false);
    if (course) {
      setChatContext(course.name);
      setChatSuggestions(['Curriculum', 'Career scope', 'Projects', 'Is it beginner friendly?']);
      appendAssistantMessage(`👋 I see you are interested in ${course.name}.\n\nWhat would you like to know?`);
    }
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatMinimized(false);
  };

  const getDynamicSuggestions = (message = '', matchedIntent = null) => {
    const askedQuestions = new Set(
      chatMessages
        .filter((item) => item.sender === 'user')
        .map((item) => item.text.trim().toLowerCase()),
    );

    const baseSuggestions = matchedIntent ? getSuggestedQuestions(matchedIntent) : suggestedQuestions;
    const cleanedSuggestions = baseSuggestions.filter(
      (item) => item.trim().toLowerCase() !== message.trim().toLowerCase() && !askedQuestions.has(item.trim().toLowerCase()),
    );

    return [...new Set(cleanedSuggestions.length ? cleanedSuggestions : baseSuggestions)].slice(0, 3);
  };

  const resetChat = () => {
    setChatMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: 'Hello! 👋 Welcome to NextGen Academy.\n\nI\'m your AI Assistant. I can help you explore our courses, learning paths, curriculum, and general academy information.\n\nWhat would you like to know?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatSuggestions(suggestedQuestions.slice(0, 3));
    setChatContext(null);
    setDismissedHandoffIds([]);
    setActiveHandoffId(null);
    setLeadForm({ email: '', question: '', isOpen: false, isSubmitted: false, isSubmitting: false });
  };

  const openCareerFinder = () => {
    setCareerStep(0);
    setCareerAnswers({});
    setCareerResult(null);
    setCareerFinderOpen(true);
    document.getElementById('career-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const chooseCareerAnswer = (answer) => {
    const question = careerQuestions[careerStep];
    const nextAnswers = { ...careerAnswers, [question.key]: answer };
    setCareerAnswers(nextAnswers);
    if (careerStep < careerQuestions.length - 1) {
      setCareerStep((step) => step + 1);
      return;
    }
    const path = careerPaths[nextAnswers.interest] || careerPaths.AI;
    setCareerResult({ path, interest: nextAnswers.interest, level: nextAnswers.level, goal: nextAnswers.goal });
  };

  const askAboutCareerPath = () => {
    setCareerFinderOpen(false);
    openChat({ mode: 'finder' });
    appendAssistantMessage(`Based on your answers, I recommend: ${careerResult.path.join(' -> ')}. Ask me about any step and I will help you plan it.`);
  };

  const refreshSuggestions = (message = '', matchedIntent = null) => {
    const nextSuggestions = getDynamicSuggestions(message, matchedIntent);
    setChatSuggestions(nextSuggestions);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleCourseOpen = (course) => {
    setSelectedCourse(course);
    setCourseDetailsOpen(true);
  };

  const exportLeads = () => {
    const rows = [
      ['Email', 'Question', 'Status', 'Source', 'Date'],
      ...filteredLeads.map((lead) => [lead.email, lead.question, lead.status, lead.source || 'website-chatbot', lead.timestamp]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value || '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nextgen-chatbot-leads.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Lead report exported successfully.', 'success');
  };

  const handleSendMessage = async (customMessage) => {
    const messageToSend = (customMessage ?? input).trim();
    if (!messageToSend) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput('');
    setTyping(true);

    try {
      const result = await api.chat(messageToSend);
      const botReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: result.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: result.type,
      };

      setChatMessages((prev) => [...prev, botReply]);
      refreshSuggestions(messageToSend, result.matchedIntent);

      if (result.type === 'lead_capture') {
        setDismissedHandoffIds((prev) => prev.filter((id) => id !== botReply.id));
        setActiveHandoffId(botReply.id);
        setLeadForm({ email: '', question: messageToSend, isOpen: false, isSubmitted: false, isSubmitting: false });
      }
    } catch (error) {
      const fallbackMessage = 'Something went wrong. Please try again in a moment.';
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'ai',
          text: fallbackMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      refreshSuggestions(messageToSend, null);
    } finally {
      setTyping(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadForm.email.trim()) {
      showToast('❌ Please enter a valid email address.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadForm.email.trim())) {
      showToast('❌ Please enter a valid email address.', 'error');
      return;
    }

    setLeadForm((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const result = await api.submitLead(leadForm.email.trim(), leadForm.question || 'Unknown question', chatMessages);
      const incomingLead = result.lead || {
        _id: `temp-${Date.now()}`,
        email: leadForm.email.trim(),
        question: leadForm.question || 'Unknown question',
        timestamp: new Date().toISOString(),
        status: 'new',
      };

      setLeadData((prev) => [incomingLead, ...prev]);
      setLeadForm((prev) => ({ ...prev, isOpen: false, email: '', isSubmitted: true, isSubmitting: false }));
      showToast('✅ Your question was submitted successfully.', 'success');
    } catch (error) {
      showToast(error.message || 'Something went wrong. Please try again in a moment.', 'error');
      setLeadForm((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const loadLeads = async () => {
    if (!adminToken) return;
    setLoadingLeads(true);
    try {
      const result = await api.getAdminLeads(adminToken);
      setLeadData(result.leads || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await api.loginAdmin(loginForm.email, loginForm.password);
      setAdminToken(result.token);
      localStorage.setItem('nextgen_admin_token', result.token);
      setAdminMode(true);
      await loadLeads();
      showToast('✅ Admin login successful.', 'success');
    } catch (error) {
      showToast(error.message || 'Invalid admin credentials.', 'error');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateLeadStatus(adminToken, id, status);
      await loadLeads();
      showToast(`✅ Lead marked as ${status}.`, 'success');
    } catch (error) {
      showToast(error.message || 'Unable to update status.', 'error');
    }
  };

  const handleLogout = () => {
    setAdminToken('');
    localStorage.removeItem('nextgen_admin_token');
    setAdminMode(false);
    setLeadData([]);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      showToast('Please complete all contact fields.', 'error');
      return;
    }

    showToast('Thanks! Our team will contact you shortly.', 'success');
    setContactForm({ name: '', email: '', message: '' });
  };

  const courseDetails = selectedCourse ? {
    duration: selectedCourse.name.includes('Full Stack') ? '12 weeks' : selectedCourse.name.includes('Data') ? '10 weeks' : selectedCourse.name.includes('AI & Machine Learning') ? '12 weeks' : selectedCourse.name.includes('Cloud') ? '8 weeks' : selectedCourse.name.includes('UI/UX') ? '8 weeks' : '10 weeks',
    level: selectedCourse.name.includes('Python') ? 'Beginner to intermediate' : 'Beginner-friendly',
    outcome: selectedCourse.name.includes('Python')
      ? 'Build AI-assisted Python projects and automate workflows.'
      : selectedCourse.name.includes('Full Stack') && !selectedCourse.name.includes('Java')
        ? 'Create full-stack web apps and ship polished digital products.'
        : selectedCourse.name.includes('Java')
          ? 'Develop enterprise-ready Java applications and APIs.'
          : selectedCourse.name.includes('Data')
            ? 'Turn raw data into insights using analytics and AI tools.'
            : selectedCourse.name.includes('AI & Machine Learning')
              ? 'Understand AI workflows, model thinking, and practical ML solutions.'
              : selectedCourse.name.includes('Cloud')
                ? 'Deploy, monitor and scale projects with modern DevOps workflows.'
                : selectedCourse.name.includes('Software Testing')
                  ? 'Improve release quality with smarter QA and automation.'
                  : 'Design usable products with research, prototyping and AI-enhanced UX workflows.',
    format: 'Live guided learning + projects',
  } : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            className={`fixed left-1/2 top-5 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-2xl ${
              toast.type === 'error'
                ? 'border-red-400/30 bg-red-500/15 text-red-100'
                : 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-3 font-bold tracking-tight text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg">NextGen Academy</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(' ', '-')}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 text-slate-200 transition hover:border-cyan-400/50 hover:text-white md:flex" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button className="rounded-xl border border-white/10 p-2 md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
            <div className="section-shell flex flex-col gap-4 py-4">
              {navItems.map((item) => (
                <a key={item} href={item === 'Home' ? '#home' : `#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-200" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="secondary-button justify-start" onClick={toggleTheme}><span className="mr-2">{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
              <button className="primary-button mt-2" onClick={openChat}>Talk to AI</button>
            </div>
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-grid bg-[size:60px_60px] opacity-30" />
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="section-shell relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
                <Sparkles className="h-4 w-4" />
                AI-powered future-ready learning
              </div>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build Your Future with AI-Powered Learning
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Master in-demand technology skills with industry-focused courses designed for the next generation of developers, analysts, designers and AI professionals.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#courses" className="primary-button">Explore Courses <ArrowRight className="ml-2 h-4 w-4" /></a>
                <button className="secondary-button" onClick={openCareerFinder}>Let AI find my path</button>
              </div>
              <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2"><BookOpenText className="h-4 w-4 text-blue-400" /> 8+ cutting-edge paths</div>
                <div className="flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-purple-400" /> Real AI integration</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
              <div className="glass-panel relative overflow-hidden rounded-[28px] p-6">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />
                <div className="absolute -bottom-8 left-8 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
                <div className="relative rounded-[22px] border border-white/10 bg-slate-900/70 p-5">
                  <div className="mb-5 flex items-center justify-between text-sm text-slate-300">
                    <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> AI Learning Lab</span>
                    <span>Live cohort</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {['Python', 'Data', 'Cloud', 'Design'].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-slate-800/80 p-4">
                        <div className="text-lg font-semibold">{item}</div>
                        <div className="mt-1 text-sm text-slate-400">Practical learning track</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                    <div className="flex items-center justify-between text-sm text-blue-100">
                      <span>Career momentum</span>
                      <span className="font-semibold">+AI</span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-slate-800">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="section-shell grid gap-6 py-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="career-finder" className="border-y border-cyan-400/10 bg-cyan-950/20">
          <div className="section-shell grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Personalized guidance</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Not sure what to learn? Let AI find your path.</h2>
              <p className="mt-4 leading-7 text-slate-300">Answer four quick questions about your interests, level, time, and goals. Get a progressive route built around your next move.</p>
              {!careerFinderOpen && <button className="primary-button mt-7" onClick={openCareerFinder}>Find my AI career path <Sparkles className="ml-2 h-4 w-4" /></button>}
            </div>

            {careerFinderOpen ? (
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 sm:p-7">
                {!careerResult ? (
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400"><span>Question {careerStep + 1} of {careerQuestions.length}</span><span>{Math.round((careerStep / careerQuestions.length) * 100)}% complete</span></div>
                    <div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${((careerStep + 1) / careerQuestions.length) * 100}%` }} /></div>
                    <h3 className="mt-7 text-xl font-semibold text-white">{careerQuestions[careerStep].label}</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {careerQuestions[careerStep].options.map((option) => <button key={option} className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/10" onClick={() => chooseCareerAnswer(option)}>{option}</button>)}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Your AI career path</p>
                    <h3 className="mt-3 text-2xl font-bold text-white">Recommended Path</h3>
                    <div className="mt-6 space-y-3">
                      {careerResult.path.map((course, index) => <div key={course} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-bold text-cyan-200">0{index + 1}</span><span className="flex-1 rounded-xl border border-white/10 bg-slate-900/80 p-3 font-semibold text-white">{course}</span>{index < careerResult.path.length - 1 && <span className="hidden text-cyan-300 sm:block">↓</span>}</div>)}
                    </div>
                    <p className="mt-6 text-sm leading-6 text-slate-300">✓ Matches your interest in {careerResult.interest}<br />✓ Suitable for your current level: {careerResult.level}<br />✓ Builds progressively toward {careerResult.goal.toLowerCase()}</p>
                    <div className="mt-6 flex flex-wrap gap-3"><button className="primary-button" onClick={askAboutCareerPath}>Ask AI about this path</button><button className="secondary-button" onClick={openCareerFinder}>Start over</button></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-3xl border border-cyan-400/15 bg-slate-950/60 p-6"><div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Example route</div><div className="mt-5 space-y-3">{careerPaths.AI.map((course, index) => <div key={course} className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-bold text-cyan-200">0{index + 1}</span><span className="font-semibold text-white">{course}</span></div>)}</div></div>
            )}
          </div>
        </section>

        <section id="courses" className="section-shell py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Courses</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Explore Our AI-Powered Courses</h2>
            <p className="mt-4 text-slate-300">Choose a career path and learn the skills that matter in today&apos;s technology industry.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {courseCatalog.map((course) => (
              <motion.article whileHover={{ y: -6 }} key={course.name} className="group rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20 transition">
                <div className="flex items-start justify-end">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-cyan-200">AI Integrated</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{course.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{course.description}</p>
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span key={topic} className="rounded-full border border-white/10 bg-slate-800 px-2 py-1 text-xs text-slate-200">{topic}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button className="secondary-button flex-1 px-3 py-2.5 text-sm" onClick={() => handleCourseOpen(course)}>Explore Course</button>
                  <button className="primary-button flex-1 px-3 py-2.5 text-sm" onClick={() => openChat({ course })}>Ask AI</button>
                </div>
              </motion.article>
            ))}
          </div>

          {selectedCourse && courseDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 overflow-hidden rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-6 shadow-2xl shadow-blue-950/30"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Course Overview</p>
                  <h3 className="mt-3 text-3xl font-bold text-white">{selectedCourse.name}</h3>
                  <p className="mt-3 max-w-2xl text-slate-300">{selectedCourse.description}</p>
                </div>
                <div className="text-5xl">{selectedCourse.icon}</div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-400">Duration</div>
                  <div className="mt-2 text-lg font-semibold text-white">{courseDetails.duration}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-400">Level</div>
                  <div className="mt-2 text-lg font-semibold text-white">{courseDetails.level}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-400">Format</div>
                  <div className="mt-2 text-lg font-semibold text-white">{courseDetails.format}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">What you will learn</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.topics.map((topic) => (
                      <span key={topic} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-100">{topic}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Outcome</div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{courseDetails.outcome}</p>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {courseDetailsOpen && selectedCourse && (
              <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCourseDetailsOpen(false)}>
                <motion.div role="dialog" aria-modal="true" aria-labelledby="course-dialog-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-blue-400/20 bg-slate-950 p-6 shadow-2xl shadow-blue-950/40 sm:p-8" initial={{ y: 24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: 0.97 }} onClick={(event) => event.stopPropagation()}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-5xl">{selectedCourse.icon}</div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Course pathway</p>
                      <h3 id="course-dialog-title" className="mt-2 text-3xl font-bold text-white">{selectedCourse.name}</h3>
                    </div>
                    <button onClick={() => setCourseDetailsOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-300 transition hover:border-red-400/50 hover:text-white" aria-label="Close course details"><X className="h-5 w-5" /></button>
                  </div>
                  <p className="mt-5 max-w-2xl leading-7 text-slate-300">{selectedCourse.description}</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[['Duration', courseDetails.duration], ['Level', courseDetails.level], ['Format', courseDetails.format]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><div className="text-xs uppercase tracking-[0.15em] text-slate-400">{label}</div><div className="mt-2 font-semibold text-white">{value}</div></div>)}
                  </div>
                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div><h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">Syllabus highlights</h4><div className="mt-4 space-y-3">{selectedCourse.topics.map((topic, index) => <div key={topic} className="flex items-center gap-3 text-slate-200"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-xs text-blue-200">0{index + 1}</span>{topic}</div>)}</div></div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5"><h4 className="font-semibold text-white">What you will achieve</h4><p className="mt-3 text-sm leading-6 text-slate-300">{courseDetails.outcome}</p><button className="primary-button mt-6 w-full" onClick={() => openChat({ course: selectedCourse })}>Ask about this course <ArrowRight className="ml-2 h-4 w-4" /></button></div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section id="why-us" className="border-y border-white/10 bg-slate-900/60">
          <div className="section-shell py-20">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Why NextGen Academy</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">AI-powered learning built for the next generation</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {whyUs.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-shell py-20">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">How It Works</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">A clear path to your future</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-white">{step}</h3>
                <p className="mt-3 text-sm text-slate-300">A practical learning path designed to help learners move from curiosity to career confidence.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/50">
          <div className="section-shell py-20">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Built for momentum</p>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Leave every course with something real.</h2>
                <p className="mt-4 max-w-xl leading-7 text-slate-300">NextGen Academy connects guided learning with practical output. The goal is not only to finish lessons, but to build confidence, a portfolio, and a clear next step.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {learnerOutcomes.map((outcome) => (
                  <div key={outcome.label} className="card-glow rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                    <div className="relative text-3xl font-bold text-white">{outcome.value}</div>
                    <div className="relative mt-2 text-sm text-slate-300">{outcome.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                  <div className="text-lg tracking-widest text-cyan-300">★★★★★</div>
                  <blockquote className="mt-5 leading-7 text-slate-200">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4"><div className="font-semibold text-white">{testimonial.name}</div><div className="mt-1 text-sm text-slate-400">{testimonial.role}</div></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Frequently Asked Questions</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Everything you need to choose confidently.</h2>
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 open:border-blue-400/30 open:bg-slate-900">
                <summary className="cursor-pointer list-none pr-8 font-semibold text-white marker:hidden">{faq.question}<span className="float-right text-xl text-blue-300 transition group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-3xl leading-7 text-slate-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 bg-slate-900/50">
          <div className="section-shell grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Contact Us</p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Let&apos;s plan your next step.</h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">Have questions about course selection, learning paths, or enrollment? Share a few details and the NextGen Academy team will help you find the right direction.</p>
              <div className="mt-8 space-y-4">
                <a href="mailto:hello@nextgenacademy.com" className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-300"><Mail className="h-5 w-5 text-cyan-300" /> hello@nextgenacademy.com</a>
                <a href="tel:+15550142664" className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-300"><Phone className="h-5 w-5 text-cyan-300" /> +1 (555) 014-2664</a>
                <div className="flex items-center gap-3 text-slate-200"><MapPin className="h-5 w-5 text-cyan-300" /> Online learning, available worldwide</div>
                <div className="flex items-center gap-3 text-slate-200"><Clock3 className="h-5 w-5 text-cyan-300" /> Monday - Saturday, 9:00 AM - 6:00 PM</div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30">
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={contactForm.name} onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Your name" className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Your name" />
                <input type="email" value={contactForm.email} onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email address" className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Email address" />
              </div>
              <textarea value={contactForm.message} onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))} placeholder="How can we help?" rows="5" className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Your message" />
              <button type="submit" className="primary-button mt-4 w-full sm:w-auto">Send Message <Send className="ml-2 h-4 w-4" /></button>
            </form>
          </div>
          <div className="section-shell border-t border-white/10 py-6 text-sm text-slate-400">NextGen Academy <span className="mx-2 text-slate-600">|</span> Learn Today. Build Tomorrow.</div>
        </section>
      </main>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {!chatOpen && (
          <button
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl shadow-2xl shadow-blue-500/30 transition hover:scale-105"
            onClick={openChat}
            aria-label="Open AI Assistant"
          >
            <Bot className="h-8 w-8 text-white" />
          </button>
        )}

        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`glass-panel relative flex ${chatMinimized ? 'h-auto' : 'h-[min(80vh,680px)]'} max-h-[calc(100dvh-1.5rem)] w-[min(92vw,360px)] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/95`}
          >
            {chatMinimized ? (
              <div className="flex shrink-0 items-center justify-between bg-slate-900/95 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"><Bot className="h-5 w-5" /></div>
                  <div className="text-sm font-semibold text-white">NextGen AI Assistant</div>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-200 shadow-md shadow-slate-950/40 transition hover:border-blue-400/50 hover:text-white" aria-label="Maximize chat" title="Maximize chat" onClick={() => setChatMinimized(false)}><Maximize2 className="h-4 w-4" /></button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-sm font-semibold text-slate-200 shadow-md shadow-slate-950/40 transition hover:border-red-400/50 hover:text-white" aria-label="Close chat" onClick={closeChat}>✕</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/95 px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"><Bot className="h-5 w-5" /></div>
                    <div>
                      <div className="font-semibold text-white">NextGen AI Assistant</div>
                      <div className="text-xs text-slate-300">{chatContext ? `Focused on ${chatContext}` : 'Ask me about our courses'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" title="Online" />
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-200 shadow-md shadow-slate-950/40 transition hover:border-blue-400/50 hover:text-white" aria-label="Minimize chat" title="Minimize chat" onClick={() => setChatMinimized(true)}><Minimize2 className="h-4 w-4" /></button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-sm font-semibold text-slate-200 shadow-md shadow-slate-950/40 transition hover:border-red-400/50 hover:text-white" aria-label="Close chat" onClick={closeChat}>✕</button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/50 px-3 py-2">
                  <button className="text-xs text-slate-300" onClick={resetChat}>Clear chat</button>
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.type === 'lead_capture' && !dismissedHandoffIds.includes(msg.id) && activeHandoffId !== msg.id ? (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-[95%] rounded-2xl border border-cyan-400/20 bg-white/5 p-3 shadow-lg backdrop-blur-sm">
                          <button type="button" className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white" onClick={() => setDismissedHandoffIds((prev) => [...prev, msg.id])} aria-label="Close human handoff"><X className="h-4 w-4" /></button>
                          <div className="flex items-start gap-3"><HumanAssistantIllustration /><div className="min-w-0 flex-1"><p className="pr-5 text-sm font-semibold leading-5 text-white">I&apos;m not able to answer that accurately right now.</p><p className="mt-1 text-xs leading-5 text-slate-300">Would you like to speak with our team?</p></div></div>
                          {leadForm.isSubmitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-center"><CheckCircle2 className="mx-auto h-6 w-6 text-emerald-300" /><p className="mt-2 text-sm font-semibold text-white">✓ Request Received!</p><p className="mt-1 text-xs leading-5 text-slate-300">Thanks! Our academy team has received your question and will get back to you soon.</p></motion.div>
                          ) : leadForm.isOpen ? (
                            <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleLeadSubmit} className="mt-3 border-t border-white/10 pt-3">
                              <p className="text-xs leading-5 text-slate-300">Leave your email and our academy team will get back to you.</p>
                              <input type="email" required value={leadForm.email} onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="your@email.com" className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Email for follow-up" />
                              <button type="submit" disabled={leadForm.isSubmitting} className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">{leadForm.isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}{leadForm.isSubmitting ? 'Connecting...' : 'Connect with Our Team'}</button>
                            </motion.form>
                          ) : (
                            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20" onClick={() => setLeadForm((prev) => ({ ...prev, isOpen: true }))}><UserRound className="h-4 w-4" /> Talk to a Human</motion.button>
                          )}
                        </motion.div>
                      ) : msg.type === 'lead_capture' ? null : (
                        <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'border border-white/10 bg-slate-900 text-slate-100'}`}><p className="whitespace-pre-line">{msg.text}</p><div className={`mt-2 text-[10px] ${msg.sender === 'user' ? 'text-blue-100/80' : 'text-slate-400'}`}>{msg.time}</div></div>
                      )}
                    </div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-300 shadow-lg">
                        <span className="flex items-center gap-2"><Bot className="h-4 w-4 text-blue-300" /> AI Assistant is typing...</span>
                        <div className="mt-2 flex gap-1">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} aria-hidden="true" />
                </div>

                <div className="shrink-0 border-t border-white/10 bg-slate-900/95 p-2.5">
                  <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                    {chatSuggestions.map((question) => (
                      <button key={question} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[11px] text-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-500/20" onClick={() => handleQuickQuestion(question)}>
                        {question}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about courses, fees, duration, curriculum..."
                      className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                      aria-label="Type your question"
                    />
                    <button type="submit" className="shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">Send</button>
                  </form>
                </div>

                <AnimatePresence>
                  {activeHandoffId && !dismissedHandoffIds.includes(activeHandoffId) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-[2px]"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="human-handoff-title"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="relative w-full max-w-[320px] overflow-hidden rounded-3xl border border-cyan-300/40 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-4 shadow-[0_0_45px_rgba(34,211,238,0.28)]"
                      >
                        <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />
                        <button type="button" className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white" onClick={() => { setDismissedHandoffIds((prev) => [...prev, activeHandoffId]); setActiveHandoffId(null); }} aria-label="Close human handoff"><X className="h-4 w-4" /></button>
                        <div className="relative flex flex-col items-center text-center">
                          <HumanAssistantIllustration />
                          <h3 id="human-handoff-title" className="mt-4 text-base font-semibold leading-6 text-white">I&apos;m not able to answer that accurately right now.</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-300">Would you like to speak with our team?</p>
                        </div>
                        {leadForm.isSubmitted ? (
                          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-center"><CheckCircle2 className="mx-auto h-7 w-7 text-emerald-300" /><p className="mt-2 text-sm font-semibold text-white">✓ Request Received!</p><p className="mt-1 text-xs leading-5 text-slate-300">Thanks! Our academy team has received your question and will get back to you soon.</p></motion.div>
                        ) : leadForm.isOpen ? (
                          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} onSubmit={handleLeadSubmit} className="relative mt-4 border-t border-white/10 pt-4">
                            <p className="text-xs leading-5 text-slate-300">Leave your email and our academy team will get back to you.</p>
                            <input type="email" required value={leadForm.email} onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="your@email.com" className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" aria-label="Email for follow-up" />
                            <button type="submit" disabled={leadForm.isSubmitting} className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">{leadForm.isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}{leadForm.isSubmitting ? 'Connecting...' : 'Connect with Our Team'}</button>
                          </motion.form>
                        ) : (
                          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="relative mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/15 px-4 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/25" onClick={() => setLeadForm((prev) => ({ ...prev, isOpen: true }))}><UserRound className="h-4 w-4" /> Talk to a Human</motion.button>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </div>

      {adminMode && (
        <div className="section-shell py-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-blue-300">Admin Dashboard</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Chatbot Leads</h2>
            </div>
            <div className="flex items-center gap-3">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lead..."
                className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-400"
              />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white">
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
              <select value={leadSort} onChange={(e) => { setLeadSort(e.target.value); setLeadPage(1); }} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white" aria-label="Sort leads">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <button onClick={exportLeads} className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm"><Download className="h-4 w-4" /> Export</button>
              <button onClick={handleLogout} className="secondary-button px-4 py-2.5 text-sm">Logout</button>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {[
              { label: 'Total Questions', value: leadData.length },
              { label: 'New', value: leadData.filter((lead) => lead.status === 'new').length },
              { label: 'Contacted', value: leadData.filter((lead) => lead.status === 'contacted').length },
              { label: 'Resolved', value: leadData.filter((lead) => lead.status === 'resolved').length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="mt-2 text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {loadingLeads ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-slate-300">Loading leads...</div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-800/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Question</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedLeads.map((lead) => (
                    <tr key={lead._id} className="border-t border-white/10">
                      <td className="px-4 py-3"><a className="text-blue-300 underline" href={`mailto:${lead.email}`}>{lead.email}</a></td>
                      <td className="px-4 py-3 max-w-md">{lead.question}</td>
                      <td className="px-4 py-3">{new Date(lead.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border border-white/10 bg-slate-800 px-2 py-1 text-xs capitalize">{lead.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <select value={lead.status} onChange={(e) => handleStatusUpdate(lead._id, e.target.value)} className="rounded-lg border border-white/10 bg-slate-800 px-2 py-1 text-xs text-white">
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <button onClick={() => setSelectedLeadHistory(lead)} className="inline-flex items-center gap-1 rounded-lg border border-blue-400/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-100 transition hover:bg-blue-500/20" title="View chat history">
                            <MessageSquareText className="h-3.5 w-3.5" /> View chat
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-slate-400">
                <span>{filteredLeads.length} matching lead{filteredLeads.length === 1 ? '' : 's'}</span>
                <div className="flex items-center gap-2"><button disabled={leadPage === 1} onClick={() => setLeadPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-white/10 p-2 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button><span>Page {leadPage} of {totalLeadPages}</span><button disabled={leadPage === totalLeadPages} onClick={() => setLeadPage((page) => Math.min(totalLeadPages, page + 1))} className="rounded-lg border border-white/10 p-2 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button></div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedLeadHistory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="chat-history-title">
          <div className="max-h-[min(80vh,680px)] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/70">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 id="chat-history-title" className="text-lg font-semibold text-white">Chat history</h3>
                <a className="text-sm text-blue-300 underline" href={`mailto:${selectedLeadHistory.email}`}>{selectedLeadHistory.email}</a>
              </div>
              <button onClick={() => setSelectedLeadHistory(null)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-red-400/50 hover:text-white" aria-label="Close chat history">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[calc(min(80vh,680px)-80px)] space-y-3 overflow-y-auto p-5">
              {getLeadHistory(selectedLeadHistory).length > 0 ? getLeadHistory(selectedLeadHistory).map((message, index) => (
                <div key={`${message.time}-${index}`} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'border border-white/10 bg-slate-950 text-slate-200'}`}>
                    <div className="mb-1 text-[10px] uppercase tracking-wide opacity-70">{message.sender === 'user' ? 'User' : 'Assistant'}</div>
                    <p className="whitespace-pre-line">{message.text}</p>
                    <div className="mt-2 text-[10px] opacity-60">{message.time}</div>
                  </div>
                </div>
              )) : <p className="text-sm text-slate-400">No chat history was saved for this lead.</p>}
            </div>
          </div>
        </div>
      )}

      {!adminMode && (
        <div className="section-shell py-12">
          <div className="glass-panel mx-auto max-w-lg rounded-3xl p-6">
            <h3 className="text-2xl font-bold text-white">Admin Login</h3>
            <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
              <input
                value={loginForm.email}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                type="email"
                placeholder="admin@nextgenacademy.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              <input
                value={loginForm.password}
                onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-3 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              <button type="submit" className="primary-button w-full">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
