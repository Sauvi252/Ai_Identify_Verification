
import React, { useState, useRef, useEffect } from 'react';
import { createChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons';

interface DemoChat {
  sendMessageStream: (options: { message: string }) => AsyncIterable<{ text: string }>;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I'm the VeriSecure Demo Assistant. I can explain how this fraud detection demo works or answer general questions about KYC." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<DemoChat | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current) return;

    const userInput: ChatMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userInput]);
    setInput('');
    setIsTyping(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: userInput.text });
      
      let botResponse = '';
      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = botResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, the AI service is currently unavailable in this demo environment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white rounded-full p-4 shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:scale-110 transition-all duration-300 z-50"
        aria-label="Toggle Support Chat"
      >
        {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right z-50 border border-slate-700">
          <header className="bg-slate-900/80 p-4 rounded-t-2xl border-b border-slate-700 flex items-center space-x-3">
             <div className="bg-emerald-500/20 p-2 rounded-lg">
                <ChatBubbleIcon className="h-5 w-5 text-emerald-400" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-slate-100">AI Assistant (Demo)</h2>
                <p className="text-xs text-emerald-400 font-medium">● Online</p>
             </div>
          </header>

          <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 rounded-2xl rounded-bl-none p-3">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this demo..."
              className="flex-1 w-full px-4 py-2 bg-slate-700 text-white border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isTyping}
            />
            <button type="submit" className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors" disabled={!input.trim() || isTyping}>
                <SendIcon className="h-5 w-5"/>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
