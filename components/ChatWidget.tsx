import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { CursorType, Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { PROFILE_DATA } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Greetings! I am the AI assistant for ${PROFILE_DATA.name}. Ask me about his semiconductor research or web development projects.`, timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setCursorType } = useCursor();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
        const history = messages.map(m => ({ role: m.role, text: m.text }));
        const responseText = await sendMessageToGemini(history, userMsg.text);

        const aiMsg: Message = { role: 'model', text: responseText, timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'model', text: "I seem to be experiencing some interference. Please ensure the API Key is connected.", timestamp: Date.now() }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setCursorType(CursorType.BUTTON)}
          onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
          className="bg-accent text-black p-4 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center relative group"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-[90vw] md:w-[400px] h-[500px] glass-card rounded-3xl flex flex-col z-40 overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <h3 className="font-bold text-sm text-white">Lumina AI</h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-black rounded-br-none font-medium'
                        : 'bg-white/10 text-gray-200 rounded-bl-none backdrop-blur-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                        <Loader2 className="animate-spin w-4 h-4 text-accent" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5 focus-within:border-accent/50 transition-colors"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500 text-white"
                  onMouseEnter={() => setCursorType(CursorType.TEXT)}
                  onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="text-gray-400 disabled:opacity-50 hover:text-accent transition-colors"
                  onMouseEnter={() => setCursorType(CursorType.BUTTON)}
                  onMouseLeave={() => setCursorType(CursorType.DEFAULT)}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;