import type { Course } from '@/types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  if (courses.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No courses found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
