import React from 'react';
import { motion } from 'framer-motion';

const ChatbotButton = ({ isOpen, toggleChat, isLoading }) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white flex items-center justify-center shadow-2xl z-50 border-2 border-white/20 hover:border-white/30 transition-all duration-300"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleChat}
      aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

      {isLoading ? (
        <motion.svg
          className="h-7 w-7 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </motion.svg>
      ) : isOpen ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 relative z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ rotate: 0 }}
          animate={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 relative z-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </motion.svg>
      )}

      {/* Pulse animation for the button */}
      {!isOpen && !isLoading && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Tooltip */}
      {!isOpen && !isLoading && (
        <motion.div
          className="absolute -top-16 right-0 bg-white text-gray-800 px-4 py-3 rounded-xl shadow-xl whitespace-nowrap border border-gray-100"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
            <p className="text-sm font-medium">Need help?</p>
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-100"></div>
        </motion.div>
      )}

      {/* Notification badge */}
      {!isOpen && !isLoading && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
        >
          <span className="text-xs text-white font-bold">!</span>
        </motion.div>
      )}
    </motion.button>
  );
};

export default ChatbotButton;
