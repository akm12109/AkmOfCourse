import type { Review } from '@/types';
import RatingStars from '@/components/shared/RatingStars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface CourseReviewsListProps {
  reviews?: Review[];
}

const CourseReviewsList: React.FC<CourseReviewsListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="p-6 border rounded-lg bg-card shadow-sm text-center">
        <h3 className="text-2xl font-semibold mb-2">Student Reviews</h3>
        <p className="text-muted-foreground">No reviews yet for this course. Be the first to leave one!</p>
    </div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Student Reviews ({reviews.length})</h3>
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border rounded-lg bg-card shadow-sm">
          <div className="flex items-start space-x-3 mb-2">
            <Avatar className="h-10 w-10">
              {review.avatarUrl && <AvatarImage src={review.avatarUrl} alt={review.userName} data-ai-hint="user avatar" />}
              <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{review.userName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt as string | Date), { addSuffix: true })}
              </p>
            </div>
          </div>
          <RatingStars rating={review.rating} starSize={16} className="mb-1" />
          <p className="text-sm text-foreground/90">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseReviewsList;
