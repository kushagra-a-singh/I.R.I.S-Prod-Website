import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickActions from './QuickActions';
import WelcomeMessage from './WelcomeMessage';

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
  </div>
);

const MessageAvatar = ({ sender, isTyping = false }) => {
  if (sender === 'user') {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
        U
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
      {isTyping ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )}
    </div>
  );
};

const ChatWindow = ({ isOpen, messages, onSendMessage, onFeedback }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleQuickAction = (actionText) => {
    onSendMessage(actionText);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if bot is typing
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    setIsTyping(lastMessage?.text === '...');
  }, [messages]);

  if (!isOpen) return null;

  const formatTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Show quick actions only if there are no messages or only the welcome message
  const showQuickActions = messages.length <= 1;
  const showWelcome = messages.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-96 md:w-[28rem] h-[40rem] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-purple-100"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">IRIS Assistant</h3>
                <p className="text-xs text-purple-200">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSendMessage('exit')}
              className="text-white hover:text-purple-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white chat-window">
            {/* Welcome Message */}
            {showWelcome && <WelcomeMessage />}

            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
              >
                {msg.sender === 'bot' && (
                  <MessageAvatar sender={msg.sender} isTyping={msg.text === '...'} />
                )}

                <div className="max-w-[75%]">
                  <div
                    className={`p-4 rounded-2xl shadow-sm message-bubble ${msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
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

                  {/* Timestamp */}
                  <div className={`text-xs text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime()}
                  </div>

                  {/* Feedback buttons for bot messages */}
                  {msg.sender === 'bot' && msg.text !== '...' && onFeedback && (
                    <motion.div
                      className="flex justify-start mt-2 space-x-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button
                        onClick={() => onFeedback(index, true)}
                        className="text-xs p-2 rounded-full text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                        aria-label="Helpful"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onFeedback(index, false)}
                        className="text-xs p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        aria-label="Not helpful"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <MessageAvatar sender={msg.sender} />
                )}
              </motion.div>
            ))}

            {/* Quick Actions */}
            {showQuickActions && (
              <QuickActions onActionClick={handleQuickAction} />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 chat-input"
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                />
                {input && (
                  <button
                    type="button"
                    onClick={() => setInput('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-3 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim() || isTyping}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
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
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-800 underline">${url}</a>`;
  });
}

export default ChatWindow;