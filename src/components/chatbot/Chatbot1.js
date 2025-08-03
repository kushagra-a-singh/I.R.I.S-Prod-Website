import { useRef, useState, useEffect } from "react";
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion';

const ChatMessage = ({ message, isDarkMode }) => {
  // Use a linkify function if message is not already HTML
  function linkify(text) {
    if (!text) return '';
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, url =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: ${isDarkMode ? '#ff6b9d' : '#a600ff'}; text-decoration: underline;">${url}</a>`
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        margin: "10px 0",
        padding: "12px 16px",
        borderRadius: "16px",
        backgroundColor: message.sender === "user"
          ? "#a600ff"
          : isDarkMode ? "#2d2d2d" : "#ffffff",
        border: message.sender === "user"
          ? "none"
          : isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
        alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
        maxWidth: "80%",
        fontSize: "14px",
        color: message.sender === "user" ? "#ffffff" : (isDarkMode ? "#ffffff" : "#333333"),
        wordBreak: "break-word",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        boxShadow: message.sender === "user"
          ? "0 4px 12px rgba(166, 0, 255, 0.3)"
          : isDarkMode ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }}
    >
      {message.sender === 'bot' ? (
        message.contains_html ? (
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: linkify(message.text) }} />
        )
      ) : (
        <div style={{ color: "#ffffff", fontWeight: "500" }}>{message.text}</div>
      )}

      <div style={{
        fontSize: "10px",
        opacity: 0.8,
        marginTop: "4px",
        textAlign: message.sender === "user" ? "right" : "left",
        color: message.sender === "user" ? "#ffffff" : (isDarkMode ? "#cccccc" : "#666666")
      }}>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </motion.div>
  );
};

// Enhanced Quick Actions component with dark mode
const QuickActions = ({ questions, onActionClick, isVisible, isDarkMode }) => {
  if (!isVisible || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: "12px",
        background: isDarkMode ? "#1a1a1a" : "#fff",
        borderTop: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}
    >
      {questions.map((question, index) => (
        <motion.button
          key={index}
          onClick={() => onActionClick(question)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          style={{
            padding: "12px 16px",
            background: "linear-gradient(135deg, #a600ff, #ff0084)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            textAlign: "left",
            lineHeight: "1.4",
            wordBreak: "break-word",
            whiteSpace: "normal",
            boxShadow: "0 4px 12px rgba(166, 0, 255, 0.3)",
            transition: "all 0.2s ease",
            width: "100%",
            minHeight: "44px",
            display: "flex",
            alignItems: "center"
          }}
        >
          {question}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Enhanced Welcome Message component with dark mode
const WelcomeMessage = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: "center",
        padding: "20px 16px",
        background: isDarkMode
          ? "linear-gradient(135deg, rgba(166, 0, 255, 0.2), rgba(255, 0, 132, 0.2))"
          : "linear-gradient(135deg, rgba(166, 0, 255, 0.1), rgba(255, 0, 132, 0.1))",
        borderRadius: "16px",
        border: isDarkMode
          ? "1px solid rgba(166, 0, 255, 0.3)"
          : "1px solid rgba(166, 0, 255, 0.2)",
        margin: "16px 12px"
      }}
    >
      <div style={{
        width: "56px",
        height: "56px",
        margin: "0 auto 12px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #a600ff, #ff0084)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(166, 0, 255, 0.3)"
      }}>
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#ffffff" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <h3 style={{
        fontSize: "16px",
        fontWeight: "600",
        color: isDarkMode ? "#ffffff" : "#333333",
        marginBottom: "8px",
        lineHeight: "1.3"
      }}>
        Welcome to IRIS Assistant! 🤖
      </h3>

      <p style={{
        fontSize: "13px",
        color: isDarkMode ? "#cccccc" : "#666666",
        marginBottom: "12px",
        lineHeight: "1.4",
        padding: "0 4px"
      }}>
        I&apos;m here to help you with information about IRIS, our projects, research, and more.
        Feel free to ask me anything!
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6px",
        fontSize: "10px",
        color: isDarkMode ? "#aaaaaa" : "#888888"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }}></span>
          <span>24/7 Available</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }}></span>
          <span>Smart Responses</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#a600ff" }}></span>
          <span>Instant Help</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ff0084" }}></span>
          <span>Always Learning</span>
        </div>
      </div>
    </motion.div>
  );
};

// Dark Mode Toggle Component
const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        border: "2px solid rgba(255, 255, 255, 0.3)",
        color: "#fff",
        cursor: "pointer",
        padding: "8px 12px",
        borderRadius: "20px",
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginRight: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        fontSize: "12px",
        fontWeight: "500",
        minWidth: "80px",
        justifyContent: "center"
      }}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span>Light</span>
        </>
      ) : (
        <>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span>Dark</span>
        </>
      )}
    </motion.button>
  );
};

const Chatbot1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);
  const [isWaving, setIsWaving] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ref for autoscroll
  const messagesEndRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('chatbot-dark-mode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('chatbot-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Add waving animation effect
  useEffect(() => {
    if (!isOpen) {
      const waveInterval = setInterval(() => {
        setIsWaving(prev => !prev);
      }, 900);

      return () => clearInterval(waveInterval);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Check if bot is typing
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    setIsTyping(lastMessage?.text === '...');
  }, [messages]);

  // All possible questions (not filtered yet)
  const allQuestions = [
    "What is I.R.I.S?",
    "What is the recruitment process?",
    "What are the current projects in I.R.I.S?"
  ];

  // Filter out used questions
  const availableQuestions = allQuestions.filter(
    question => !usedQuestions.includes(question)
  );

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
  }

  const sendMessage = async (messageText) => {
    const textToSend = messageText || input;

    if (!textToSend.trim()) return;

    setShowPredefinedQuestions(false);
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);

    if (!messageText) {
      setInput("");
    }

    if (allQuestions.includes(textToSend)) {
      setUsedQuestions(prev => [...prev, textToSend]);
    }

    // Add typing indicator
    setMessages((prev) => [...prev, { sender: "bot", text: '...', isTyping: true }]);

    let botMessage = { sender: "bot", text: '', contains_html: false };
    try {
      const response = await withTimeout(
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: textToSend }),
        }),
        10000 // 10 seconds
      );
      const data = await response.json();
      botMessage = {
        sender: "bot",
        text: data.response,
        contains_html: data.contains_html || false
      };
    } catch (error) {
      botMessage = {
        sender: "bot",
        text: "We're facing connectivity issues. Please try again in a moment.",
        contains_html: false
      };
    }

    // Remove typing indicator and add bot message
    setMessages((prev) => {
      const msgs = prev.filter(m => !m.isTyping);
      return [...msgs, botMessage];
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setShowPredefinedQuestions(false);
    } else {
      setShowPredefinedQuestions(messages.length === 0);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <style jsx global>{`
        .chatbot-panel {
          height: min(700px, 85vh) !important;
          max-height: 85vh !important;
        }
        @media (max-width: 768px) {
          .chatbot-panel {
            right: 50% !important;
            transform: translateX(50%) !important;
            width: min(520px, calc(100vw - 20px)) !important;
            height: 82vh !important;
            max-height: 82vh !important;
            min-height: 82vh !important;
          }
        }
        @media (max-width: 480px) {
          .chatbot-panel {
            width: calc(100vw - 10px) !important;
            min-width: 300px !important;
            height: 80vh !important;
            max-height: 80vh !important;
            min-height: 80vh !important;
          }
        }
      `}</style>
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        left: "20px",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}>
        {!isOpen && (
          <motion.div
            animate={{
              y: isWaving ? -12 : 0,
              rotate: isWaving ? 3 : -3,
              scale: isWaving ? 1.05 : 1
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))"
            }}
          >
            <motion.button
              onClick={() => {
                setIsOpen(!isOpen);
                setIsWaving(false);
                if (!isOpen) {
                  setShowPredefinedQuestions(messages.length === 0);
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0"
              }}
            >
              <Image
                src="/images/chatbot1.png"
                alt="Chatbot"
                width={80}
                height={80}
                style={{
                  objectFit: "contain",
                  transition: "transform 0.2s",
                }}
              />
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="chatbot-panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "min(480px, calc(100vw - 40px))",
                maxWidth: "480px",
                minWidth: "320px",
                background: isDarkMode ? "#1a1a1a" : "#fff",
                borderRadius: "16px",
                boxShadow: isDarkMode
                  ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                  : "0 8px 32px rgba(0, 0, 0, 0.15)",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: isDarkMode
                  ? "1px solid rgba(166, 0, 255, 0.2)"
                  : "1px solid rgba(166, 0, 255, 0.1)",
                position: "absolute",
                right: "0",
                bottom: "0",
                zIndex: 1000,
                ...(isMobile ? {
                  right: "50%",
                  transform: "translateX(50%)",
                  width: window.innerWidth <= 480 ? "calc(100vw - 10px)" : "min(520px, calc(100vw - 20px))",
                  height: window.innerWidth <= 480 ? "80vh" : "82vh",
                  maxHeight: window.innerWidth <= 480 ? "80vh" : "82vh",
                  minHeight: window.innerWidth <= 480 ? "80vh" : "82vh",
                } : {
                  height: "min(700px, 85vh)",
                  maxHeight: "85vh",
                })
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background: "linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(75, 1, 64) 50%, rgb(54, 1, 75) 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "space-between",
                  borderRadius: "16px 16px 0 0"
                }}
              >
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backdropFilter: "blur(4px)"
                }}>
                  <Image
                    src="/images/chatbot.avif"
                    alt="Chatbot"
                    width={36}
                    height={36}
                    style={{
                      objectFit: "contain",
                      borderRadius: "50%"
                    }}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <strong style={{ fontSize: "15px", display: "block" }}>IRIS Assistant</strong>
                  <small style={{ fontSize: "11px", opacity: 0.8 }}>
                    {isTyping ? 'Typing...' : 'Online'}
                  </small>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close chat"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "none",
                      color: "#fff",
                      fontSize: "16px",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "50%",
                      transition: "all 0.2s",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "32px"
                    }}
                    title="Close"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "12px",
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(45, 45, 45, 0.8), rgba(26, 26, 26, 0.9))"
                    : "linear-gradient(135deg, rgba(245, 245, 245, 0.8), rgba(255, 255, 255, 0.9))",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {messages.length === 0 ? (
                  <WelcomeMessage isDarkMode={isDarkMode} />
                ) : (
                  messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      message={msg}
                      isDarkMode={isDarkMode}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <QuickActions
                questions={availableQuestions}
                onActionClick={sendMessage}
                isVisible={showPredefinedQuestions}
                isDarkMode={isDarkMode}
              />

              <div style={{
                padding: "12px 16px",
                background: isDarkMode ? "#1a1a1a" : "#fff",
                borderTop: isDarkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isTyping}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: isDarkMode
                        ? "1px solid rgba(166, 0, 255, 0.3)"
                        : "1px solid rgba(166, 0, 255, 0.2)",
                      borderRadius: "20px",
                      outline: "none",
                      fontSize: "14px",
                      background: isDarkMode ? "#2d2d2d" : "#fff",
                      color: isDarkMode ? "#fff" : "#333",
                      minHeight: "40px"
                    }}
                    placeholder="Type anything..."
                  />
                </div>
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: input.trim() && !isTyping
                      ? "linear-gradient(135deg, #a600ff, #ff0084)"
                      : isDarkMode ? "#444" : "#ccc",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    boxShadow: input.trim() && !isTyping
                      ? "0 4px 12px rgba(166, 0, 255, 0.3)"
                      : "none"
                  }}
                >
                  {isTyping ? (
                    <div style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid transparent",
                      borderTop: "2px solid #fff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }} />
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#fff", transform: "rotate(90deg)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chatbot1;