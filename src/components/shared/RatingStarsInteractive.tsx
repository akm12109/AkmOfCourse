'use client';

import type React from 'react';

interface RatingStarsInteractiveProps {
  rating: number;
  setRating: (rating: number) => void;
  starSize?: number;
}

const RatingStarsInteractive: React.FC<RatingStarsInteractiveProps> = ({
  rating,
  setRating,
  starSize = 24,
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer ${
            star <= rating ? 'text-accent' : 'text-muted-foreground opacity-50'
          }`}
          fill="currentColor"
          width={starSize}
          height={starSize}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.966-7.417 3.966 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};

export default RatingStarsInteractive;
