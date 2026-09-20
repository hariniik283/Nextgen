import { chatbotKnowledge } from '../data/chatbotKnowledge.js';

const API_BASE = '/api';

const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const matchKnowledgeLocally = (message) => {
  const normalized = normalizeText(message);

  if (!normalized) {
    return {
      type: 'unknown',
      answer: "I'm not able to answer that accurately right now.",
    };
  }

  const greetingPatterns = [
    'hi', 'hii', 'hello', 'hey', 'hey there', 'good morning', 'good evening', 'good afternoon',
    'how are you', 'how are you doing', 'namaste', 'hello there',
  ];

  if (greetingPatterns.some((pattern) => normalized.includes(pattern))) {
    return {
      type: 'greeting',
      answer: "Hi there! 👋 I’m here to help you with our courses, admissions, fees, and career guidance. May I know what you need?",
    };
  }

  const friendlyFallbackPatterns = [
    'thanks', 'thank you', 'okay', 'ok', 'fine', 'help me', 'need help', 'i need help', 'can you help',
  ];

  if (friendlyFallbackPatterns.some((pattern) => normalized.includes(pattern))) {
    return {
      type: 'support',
      answer: "Absolutely! 😊 I can help you explore the right course, understand the fees, timings, or career support. Tell me what you are looking for and I’ll guide you.",
    };
  }

  const match = chatbotKnowledge
    .flatMap((item) => item.keywords.map((keyword) => ({ item, keyword: normalizeText(keyword) })))
    .filter(({ keyword }) => keyword && normalized.includes(keyword))
    .sort((first, second) => second.keyword.length - first.keyword.length)[0];

  if (match) {
    return { type: 'knowledge', answer: match.item.answer, matchedIntent: match.item.intent };
  }

  return {
    type: 'lead_capture',
    answer: "I'm not able to answer that accurately right now.",
  };
};

const readStoredLeads = () => {
  try {
    const stored = localStorage.getItem('nextgen_leads');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeStoredLeads = (leads) => {
  localStorage.setItem('nextgen_leads', JSON.stringify(leads));
};

export const api = {
  async chat(message) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (!response.ok) {
        return matchKnowledgeLocally(message);
      }

      return data;
    } catch (error) {
      return matchKnowledgeLocally(message);
    }
  },

  async submitLead(email, question, chatHistory = []) {
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, question, chatHistory }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit your request right now.');
      }

      const lead = data.lead || {
        _id: `local-${Date.now()}`,
        email,
        question,
        chatHistory,
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'website-chatbot',
      };

      if (!data.lead) {
        const current = readStoredLeads();
        writeStoredLeads([lead, ...current]);
      }
      return { ...data, lead };
    } catch (error) {
      const lead = {
        _id: `local-${Date.now()}`,
        email,
        question,
        chatHistory,
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'website-chatbot',
      };

      const current = readStoredLeads();
      writeStoredLeads([lead, ...current]);
      return {
        success: true,
        message: 'Your request has been submitted successfully.',
        lead,
      };
    }
  },

  async getAdminLeads(token) {
    try {
      const response = await fetch(`${API_BASE}/admin/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to load leads.');
      }

      return data;
    } catch (error) {
      return { leads: readStoredLeads() };
    }
  },

  async updateLeadStatus(token, id, status) {
    try {
      const response = await fetch(`${API_BASE}/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to update lead status.');
      }

      return data;
    } catch (error) {
      const leads = readStoredLeads().map((lead) =>
        String(lead._id) === String(id) ? { ...lead, status } : lead,
      );
      writeStoredLeads(leads);
      return { success: true, lead: { _id: id, status } };
    }
  },

  async loginAdmin(email, password) {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Invalid admin credentials.');
    }

    return data;
  },
};
