import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  starSize?: number;
  className?: string;
  showText?: boolean;
  reviewCount?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  starSize = 16,
  className,
  showText = false,
  reviewCount,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="text-accent" style={{ width: starSize, height: starSize }} />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" fill="currentColor" className="text-accent" style={{ width: starSize, height: starSize }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-accent/50" style={{ width: starSize, height: starSize }} />
      ))}
      {showText && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
