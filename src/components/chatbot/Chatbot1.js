import { useRef, useState, useEffect } from "react";
import Image from 'next/image'

// ChatMessage component remains the same
const ChatMessage = ({ message }) => {
  // Use a linkify function if message is not already HTML
  function linkify(text) {
    if (!text) return '';
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, url =>
      `<a href="${url}">${url}</a>`
    );
  }

  return (
    <div style={{
      margin: "10px",
      padding: "8px 12px",
      borderRadius: "8px",
      backgroundColor: message.sender === "user" ? "rgba(201, 64, 101, 0.1)" : "rgba(23, 37, 90, 0.1)",
      border: message.sender === "user" ? "1px solid rgba(201, 64, 101, 0.3)" : "1px solid rgba(23, 37, 90, 0.3)",
      alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%",
      fontSize: "14px",
      color: "#333",
    }}>
      {message.sender === 'bot' ? (
        message.contains_html ? (
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: linkify(message.text) }} />
        )
      ) : (
        message.text
      )}
    </div>
  );
};

const Chatbot1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [showPredefinedQuestions, setShowPredefinedQuestions] = useState(true);
  const [isWaving, setIsWaving] = useState(false);

  // Ref for autoscroll
  const messagesEndRef = useRef(null);

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

  // Utility: Promise with timeout
  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
  }

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    setShowPredefinedQuestions(false);
    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    if (allQuestions.includes(messageText)) {
      setUsedQuestions(prev => [...prev, messageText]);
    }

    // Add typing indicator
    setMessages((prev) => [...prev, { sender: "bot", text: '...', isTyping: true }]);

    let botMessage = { sender: "bot", text: '', contains_html: false };
    try {
      const response = await withTimeout(
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: messageText }),
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

    if (messageText === input) {
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Hide predefined questions when user starts typing
    if (e.target.value.length > 0) {
      setShowPredefinedQuestions(false);
    } else {
      // Show predefined questions only if there are no messages and input is empty
      setShowPredefinedQuestions(messages.length === 0);
    }
  };

  return (
    <div style={{ 
      position: "fixed", 
      bottom: "20px", 
      right: "20px", 
      zIndex: 1000,
      fontFamily: "Arial, sans-serif",
      
    }}>
      {/* Chatbot Button - Updated with animation and no circle */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsWaving(false); // Stop waving when opened
          // Reset predefined questions visibility when opening
          if (!isOpen) {
            setShowPredefinedQuestions(messages.length === 0);
          }
        }}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0",
          transform: isWaving ? "translateY(-5px)" : "translateY(5px)",
          transition: "transform 0.3s ease-in-out",
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
          ':hover': {
            transform: "scale(1.1) rotate(-5deg)",
            filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))"
          }
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
      </button>

      {/* Rest of the chat panel remains the same */}
      {isOpen && (
        <div
          style={{
            width: "350px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            height: "455px",
            maxHeight: "85vh",
            overflow: "hidden"
          }}
        >
          {/* Chat Header with gradient */}
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(to right, rgba(23, 37, 90, 0.9), rgba(201, 64, 101, 0.9))",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifyContent: "space-between"
            }}
          >
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              backdropFilter: "blur(4px)"
            }}>
              <Image 
                src="/images/chatbot.avif" 
                alt="Chatbot" 
                width={42} 
                height={42} 
                style={{ 
                  objectFit: "contain", 
                  borderRadius: "50%" 
                }} 
              />
            </div>
            <div style={{ flex: 1, marginLeft: 8 }}>
              <strong style={{ fontSize: "16px", display: "block" }}>IrisBot</strong>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                padding: "4px 8px",
                marginLeft: "8px",
                lineHeight: 1,
                borderRadius: "4px",
                transition: "background 0.2s",
              }}
              title="Close"
            >
              &#10005;
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              background: "rgba(245, 245, 245, 0.8)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {messages.length === 0 ? (
              <div style={{
                textAlign: "center",
                color: "#666",
                margin: "auto",
                padding: "20px"
              }}>
                Ask me anything about I.R.I.S
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  message={msg} 
                />
              ))
            )}
            {/* Dummy div for autoscroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Predefined Questions - only show when enabled and there are available questions */}
          {showPredefinedQuestions && availableQuestions.length > 0 && (
            <div style={{
              padding: "12px",
              background: "#fff",
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px"
            }}>
              {availableQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(question)}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(23, 37, 90, 0.05)",
                    color: "rgba(23, 37, 90, 0.9)",
                    border: "1px solid rgba(23, 37, 90, 0.15)",
                    borderRadius: "20px",
                    fontSize: "12px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    ':hover': {
                      background: "rgba(23, 37, 90, 0.1)",
                      borderColor: "rgba(23, 37, 90, 0.3)"
                    }
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div style={{ 
            padding: "12px",
            background: "#fff",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid rgba(23, 37, 90, 0.2)",
                borderRadius: "24px",
                outline: "none",
                fontSize: "14px",
                background: "rgba(245, 245, 245, 0.6)",
                transition: "all 0.2s",
                ':focus': {
                  borderColor: "rgba(201, 64, 101, 0.5)",
                  boxShadow: "0 0 0 2px rgba(201, 64, 101, 0.1)"
                }
              }}
              placeholder="Type your message..."
            />
            <button
              onClick={() => sendMessage()}
              style={{
                background: "linear-gradient(135deg, rgba(23, 37, 90, 0.9), rgba(201, 64, 101, 0.9))",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
                ':hover': {
                  transform: "scale(1.05)"
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot1;