import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: '300ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" style={{ animationDelay: '600ms' }}></div>
  </div>
);

const ChatWindow = ({ isOpen, messages, onSendMessage, onFeedback }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-96 md:w-[28rem] h-[40rem] bg-white rounded-lg shadow-xl z-40 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">IRIS Assistant</h3>
            <button
              onClick={() => onSendMessage('exit')}
              className="text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-3/4">
                  <div
                    className={`p-3 rounded-lg ${msg.sender === 'user'
                      ? 'bg-purple-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word'
                    }}
                  >
                    {msg.text === '...' ? (
                      <TypingIndicator />
                    ) : (
                      <div className={msg.isNew ? 'typing-text' : ''}>
                        {msg.sender === 'bot' && msg.text !== '...'
                          ? (msg.contains_html
                            ? <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                            : <span dangerouslySetInnerHTML={{ __html: linkify(msg.text) }} />)
                          : msg.text}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'bot' && msg.text !== '...' && onFeedback && (
                    <div className="flex justify-end mt-1 space-x-2">
                      <button
                        onClick={() => onFeedback(index, true)}
                        className="text-xs p-1 rounded text-gray-500 hover:text-green-500"
                        aria-label="Helpful"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onFeedback(index, false)}
                        className="text-xs p-1 rounded text-gray-500 hover:text-red-500"
                        aria-label="Not helpful"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ask me anything..."
              />
              <button
                type="submit"
                className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors"
                disabled={!input.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function to convert URLs in text to clickable links
function linkify(text) {
  if (!text) return '';
  // Improved regex for URLs that avoids trailing unbalanced ')'
  const urlPattern = /(https?:\/\/[^\s\u003c\u003e\"]+?)(?=[.,!?:;\)]?(?:\s|$))/g;
  return text.replace(urlPattern, url => {
    // Remove a trailing ')' if there are more '(' than ')' in the url
    if (url.endsWith(')') && (url.split('(').length - 1) < (url.split(')').length - 1)) {
      url = url.slice(0, -1);
    }
    return `<a href="${url}">${url}</a>`;
  });
}

export default ChatWindow;