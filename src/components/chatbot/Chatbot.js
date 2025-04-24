import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/universal-sentence-encoder';
import localforage from 'localforage';
import { createClient } from '@supabase/supabase-js';
import ChatbotButton from './ChatbotButton';
import ChatWindow from './ChatWindow';

// Import base knowledge
import staticKnowledgeBase from './knowledgeBase.json';

// Initialize Supabase client (add your project URL and anon key in your .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize the storage
const chatbotStore = localforage.createInstance({
  name: 'chatbot-store'
});

// Predefined responses for common questions
const baseKnowledgeBase = [
  { 
    questions: ['what is iris', 'who are you', 'about iris'],
    answer: 'I am the IRIS Assistant! IRIS is the Innovation, Research, Incubation, and Startup team at MIT WPU. We focus on research, innovation, and entrepreneurship.'
  },
  {
    questions: ['contact', 'how to contact', 'contact information'],
    answer: 'You can find our contact information on the Contact page. We have various team members you can reach out to for different inquiries.'
  },
  {
    questions: ['events', 'upcoming events', 'what events'],
    answer: 'We host various events throughout the year including hackathons, workshops, and tech talks. Check our Events page for the latest information.'
  },
  {
    questions: ['projects', 'what projects', 'research projects'],
    answer: 'IRIS works on various innovative projects in fields like AI, robotics, and more. You can explore our Projects page to learn about our current and past projects.'
  },
  {
    questions: ['blog', 'articles', 'research papers'],
    answer: 'Our blog features articles on various tech topics, research findings, and event recaps. Visit the Blog section to read our latest posts.'
  },
  {
    questions: ['team', 'members', 'who works'],
    answer: 'Our team consists of students, faculty, and industry experts. You can learn more about our members on the About page.'
  }
];

// Merge knowledge bases
const mergeKnowledgeBase = () => {
  const mergedKB = [...baseKnowledgeBase];
  
  staticKnowledgeBase.forEach(item => {
    mergedKB.push({
      questions: item.questions,
      answer: `${item.content.substring(0, 200)}... [This information is from the ${item.route} page]`
    });
  });
  
  return mergedKB;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m the IRIS Assistant. How can I help you today?', isNew: true }
  ]);
  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);

  // Initialize knowledge base
  useEffect(() => {
    setKnowledgeBase(mergeKnowledgeBase());
  }, []);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!model && !modelLoading) {
      loadModel();
    }
  };

  // Load the NLP model
  const loadModel = async () => {
    try {
      setModelLoading(true);
      const loadedModel = await load();
      setModel(loadedModel);
      setModelLoading(false);
    } catch (error) {
      console.error('Error loading model:', error);
      setModelLoading(false);
      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: 'I\'m having trouble loading my brain. Please try again in a moment!', isNew: true }
      ]);
    }
  };

  // Calculate similarity between two sentences
  const calculateSimilarity = async (sentence1, sentence2) => {
    if (!model) return 0;
    
    try {
      const embeddings = await model.embed([sentence1.toLowerCase(), sentence2.toLowerCase()]);
      const embed1 = embeddings.slice([0, 0], [1, -1]);
      const embed2 = embeddings.slice([1, 0], [1, -1]);
      
      const dotProduct = embed1.matMul(embed2, false, true);
      const norm1 = embed1.norm();
      const norm2 = embed2.norm();
      
      const similarity = dotProduct.div(norm1.mul(norm2));
      return similarity.dataSync()[0];
    } catch (error) {
      console.error('Error calculating similarity:', error);
      return 0;
    }
  };

  // Find the best match for a user query
  const findBestResponse = async (query) => {
    if (query.toLowerCase() === 'exit') {
      setIsOpen(false);
      return '';
    }
    
    let bestMatch = null;
    let highestSimilarity = 0;
    
    for (const item of knowledgeBase) {
      for (const question of item.questions) {
        const similarity = await calculateSimilarity(query, question);
        if (similarity > highestSimilarity && similarity > 0.5) {
          highestSimilarity = similarity;
          bestMatch = item.answer;
        }
      }
    }
    
    // Log this interaction to Supabase for analytics
    try {
      await supabase.from('chatbot_interactions').insert([
        { query, best_match: bestMatch, similarity_score: highestSimilarity, timestamp: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error('Error logging interaction:', error);
    }
    
    if (bestMatch) {
      return bestMatch;
    }
    
    return "I'm not sure about that. Can you try asking something about our projects, events, or team?";
  };

  // Handle sending a message
  const handleSendMessage = async (text) => {
    if (text === 'exit') {
      setIsOpen(false);
      return;
    }

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text, isNew: true }]);

    // Add typing indicator
    setMessages(prev => [...prev, { sender: 'bot', text: '...' }]);

    // --- FLASK API CALL START ---
    let responseText = "Sorry, I couldn't get a response.";
    let containsHtml = false;
    try {
      const res = await fetch('http://localhost:5800/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      console.log("Chatbot API response:", data); // DEBUG LOG
      responseText = data.response || responseText;
      containsHtml = data.contains_html || false;
    } catch (error) {
      responseText = "Sorry, there was a problem contacting the server.";
      console.error("Chatbot API error:", error);
    }
    // --- FLASK API CALL END ---

    // Replace typing indicator with actual response
    setMessages(prev => [
      ...prev.slice(0, prev.length - 1),
      { sender: 'bot', text: responseText, isNew: true, contains_html: containsHtml }
    ]);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg => msg.isNew ? { ...msg, isNew: false } : msg)
      );
    }, 1000);
  };

  // Handle feedback
  const handleFeedback = async (messageIndex, isPositive) => {
    if (messages[messageIndex].sender !== 'bot') return;
    
    // Get the user query (should be the message before this one)
    const userQuery = messageIndex > 0 && messages[messageIndex - 1].sender === 'user' 
      ? messages[messageIndex - 1].text 
      : '';
      
    try {
      await supabase.from('chatbot_feedback').insert([
        {
          message_index: messageIndex,
          bot_response: messages[messageIndex].text,
          user_query: userQuery,
          is_positive: isPositive,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  // Save/load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const savedMessages = await chatbotStore.getItem('chatHistory');
        if (savedMessages && savedMessages.length) {
          setMessages(savedMessages);
        }
      } catch (err) {
        console.error('Failed to load chat history', err);
      }
    };
    
    loadChatHistory();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      chatbotStore.setItem('chatHistory', messages).catch(err => {
        console.error('Failed to save chat history', err);
      });
    }
  }, [messages]);

  return (
    <>
      <ChatbotButton isOpen={isOpen} toggleChat={toggleChat} isLoading={modelLoading} />
      <ChatWindow 
        isOpen={isOpen} 
        messages={messages} 
        onSendMessage={handleSendMessage}
        onFeedback={handleFeedback}
      />
    </>
  );
};

export default Chatbot;