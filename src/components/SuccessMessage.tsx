import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 border border-green-200 rounded-lg p-4"
    >
      <div className="flex items-start">
        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-green-700">{message}</p>
      </div>
    </motion.div>
  );
}