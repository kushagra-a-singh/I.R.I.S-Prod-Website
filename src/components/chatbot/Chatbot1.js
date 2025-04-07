import { useState } from "react";

// ChatMessage component
const ChatMessage = ({ message }) => {
  return (
    <div style={{
      marginBottom: "10px",
      textAlign: message.sender === "user" ? "right" : "left",
    }}>
      <strong>{message.sender}:</strong> 
      {message.contains_html ? (
        <div 
          dangerouslySetInnerHTML={{ __html: message.text }}
          style={{
            display: "inline-block",
            marginLeft: "5px",
          }}
        />
      ) : (
        <span style={{ marginLeft: "5px" }}>{message.text}</span>
      )}
    </div>
  );
};

const Chatbot1 = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat panel
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(""); // State to store user input

  // Function to send a message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Send the query to the backend API
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();

    // Add bot response to the chat
    setMessages((prev) => [...prev, { 
      sender: "bot", 
      text: data.response,
      contains_html: data.contains_html || false 
    }]);

    // Clear the input
    setInput("");
  };

  return (
    <div style={{ 
      position: "fixed", 
      bottom: "20px", 
      right: "20px", 
      zIndex: 1000 
    }}>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        💬
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            width: "300px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "10px",
              background: "#0070f3",
              color: "#fff",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <strong>Chatbot</strong>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              height: "200px",
              overflowY: "scroll",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {messages.map((msg, index) => (
              <ChatMessage 
                key={index} 
                message={msg} 
              />
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: "10px", display: "flex" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginRight: "10px",
              }}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot1;