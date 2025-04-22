import { useState, useEffect } from "react";

// ChatMessage component remains the same
const ChatMessage = ({ message }) => {
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
      {message.contains_html ? (
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
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

  // Add waving animation effect
  useEffect(() => {
    if (!isOpen) {
      const waveInterval = setInterval(() => {
        setIsWaving(prev => !prev);
      }, 900);
      
      return () => clearInterval(waveInterval);
    }
  }, [isOpen]);

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

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    // Hide predefined questions when sending any message
    setShowPredefinedQuestions(false);

    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);

    // Mark this question as used if it's one of our predefined ones
    if (allQuestions.includes(messageText)) {
      setUsedQuestions(prev => [...prev, messageText]);
    }

    // Send the query to the backend API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: messageText }),
    });

    const data = await response.json();

    // Add bot response to the chat
    setMessages((prev) => [...prev, { 
      sender: "bot", 
      text: data.response,
      contains_html: data.contains_html || false 
    }]);

    // Clear the input if it was from the input field
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
      fontFamily: "Arial, sans-serif"
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
          transform: isWaving ? "translateX(-5px)" : "translateX(5px)",
          transition: "transform 0.3s ease-in-out",
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
          ':hover': {
            transform: "scale(1.1) rotate(-5deg)",
            filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))"
          }
        }}
      >
        <img 
          src="/images/chatbot1.png" 
          alt="Chatbot" 
          style={{ 
            width: "60px", 
            height: "60px", 
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
            height: "500px",
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
              gap: "12px"
            }}
          >
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              backdropFilter: "blur(4px)"
            }}>
              <img 
                src="/images/chatbot.avif" 
                alt="Chatbot" 
                style={{ width: "60%", height: "60%", objectFit: "contain", borderRadius: "50%" }} 
              />
            </div>
            <div>
              <strong style={{ fontSize: "16px", display: "block" }}>IrisBot</strong>
            </div>
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