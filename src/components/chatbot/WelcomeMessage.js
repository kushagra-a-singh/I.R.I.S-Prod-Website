import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
    return (
        <motion.div
            className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Welcome to IRIS Assistant! 🤖
            </h3>

            <p className="text-sm text-gray-600 mb-4">
                I'm here to help you with information about IRIS, our projects, research, and more.
                Feel free to ask me anything!
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Smart Responses</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Instant Help</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                    <span>Always Learning</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeMessage; 