import { chatbotKnowledge } from '../../src/data/chatbotKnowledge.js';

const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const matchKnowledge = (message) => {
  const normalized = normalizeText(message);

  if (!normalized) {
    return { type: 'unknown', answer: "I'm not able to answer that accurately right now." };
  }

  const greetingPatterns = [
    'hi',
    'hii',
    'hello',
    'hey',
    'hey there',
    'good morning',
    'good evening',
    'good afternoon',
    'how are you',
    'how are you doing',
    'namaste',
    'hello there',
  ];

  if (greetingPatterns.some((pattern) => normalized.includes(pattern))) {
    return {
      type: 'greeting',
      answer: "Hi there! 👋 I’m here to help you with our courses, admissions, fees, and career guidance. May I know what you need?",
    };
  }

  const friendlyFallbackPatterns = [
    'thanks',
    'thank you',
    'okay',
    'ok',
    'fine',
    'help me',
    'need help',
    'i need help',
    'can you help',
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

export const handleChat = (req, res) => {
  const { message } = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Please enter a valid question.' });
  }

  const match = matchKnowledge(message);
  return res.json({ ...match, matchedIntent: match.matchedIntent || null });
};
