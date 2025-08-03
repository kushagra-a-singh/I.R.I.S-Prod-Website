import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = ({ onActionClick, isVisible = true }) => {
    const quickActions = [
        {
            id: 'help',
            text: 'How can you help me?',
            icon: '🤔',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'features',
            text: 'What are your features?',
            icon: '✨',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'contact',
            text: 'How to contact support?',
            icon: '📞',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'about',
            text: 'Tell me about IRIS',
            icon: 'ℹ️',
            color: 'from-pink-500 to-pink-600'
        }
    ];

    if (!isVisible) return null;

    return (
        <motion.div
            className="flex flex-wrap gap-2 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {quickActions.map((action, index) => (
                <motion.button
                    key={action.id}
                    onClick={() => onActionClick(action.text)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${action.color} text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <span className="text-lg">{action.icon}</span>
                    <span>{action.text}</span>
                </motion.button>
            ))}
        </motion.div>
    );
};

export default QuickActions; 