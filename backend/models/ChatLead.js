import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ['user', 'ai'], required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
  },
  { _id: false },
);

const leadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    question: { type: String, required: true },
    chatHistory: { type: [chatMessageSchema], default: [] },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
    source: { type: String, default: 'website-chatbot' },
  },
  { collection: 'chatbot_leads' },
);

const ChatLead = mongoose.models.ChatLead || mongoose.model('ChatLead', leadSchema);
export default ChatLead;
