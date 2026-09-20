import mongoose from 'mongoose';
import ChatLead from '../models/ChatLead.js';

const getInMemoryLeads = () => {
  global.chatbotLeads = global.chatbotLeads || [];
  return global.chatbotLeads;
};

const normalizeLead = (lead) => ({
  ...lead,
  _id: lead._id?.toString?.() || lead.id || `lead-${Math.random().toString(16).slice(2)}`,
  timestamp: lead.timestamp || new Date().toISOString(),
});

export const submitLead = async (req, res) => {
  const { email, question, chatHistory = [] } = req.body || {};

  if (!email || !question) {
    return res.status(400).json({ message: 'Email and question are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    const normalizedHistory = Array.isArray(chatHistory)
      ? chatHistory
        .filter((message) => message && ['user', 'ai'].includes(message.sender) && message.text)
        .map((message) => ({ sender: message.sender, text: String(message.text), time: message.time || new Date().toLocaleTimeString() }))
      : [];

    if (mongoose.connection.readyState !== 1) {
      const leads = getInMemoryLeads();
      const newLead = normalizeLead({
        id: `lead-${Date.now()}`,
        email,
        question,
        chatHistory: normalizedHistory,
        status: 'new',
        source: 'website-chatbot',
        timestamp: new Date().toISOString(),
      });
      leads.unshift(newLead);
      return res.status(201).json({ success: true, message: 'Your request has been submitted successfully.', lead: newLead });
    }

    const lead = new ChatLead({ email, question, chatHistory: normalizedHistory, status: 'new', source: 'website-chatbot' });
    await lead.save();
    return res.status(201).json({ success: true, message: 'Your request has been submitted successfully.', lead });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again in a moment.' });
  }
};

export const getLeads = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const leads = getInMemoryLeads().slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return res.json({ leads });
    }

    const leads = await ChatLead.find().sort({ timestamp: -1 });
    return res.json({ leads });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch lead data.' });
  }
};

export const updateLeadStatus = async (req, res) => {
  const { status } = req.body || {};
  const validStatuses = ['new', 'contacted', 'resolved'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      const leads = getInMemoryLeads();
      const leadIndex = leads.findIndex((lead) => String(lead._id) === String(req.params.id));
      if (leadIndex === -1) {
        return res.status(404).json({ message: 'Lead not found.' });
      }
      leads[leadIndex].status = status;
      return res.json({ success: true, lead: leads[leadIndex] });
    }

    const lead = await ChatLead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    return res.json({ success: true, lead });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update lead status.' });
  }
};
