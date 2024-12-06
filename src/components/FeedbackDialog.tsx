import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeedbackDialogProps {
  onSubmit: (feedback: { rating: number; comment: string }) => void;
  onClose: () => void;
}

export function FeedbackDialog({ onSubmit, onClose }: FeedbackDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Votre avis compte</h3>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`${
                  value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience (optionnel)"
          className="w-full p-3 border rounded-lg mb-4 h-32"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={() => onSubmit({ rating, comment })}
            className="px-4 py-2 bg-[#1C3F7C] text-white rounded-lg hover:bg-opacity-90"
          >
            Envoyer
          </button>
        </div>
      </div>
    </motion.div>
  );
}