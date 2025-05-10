import type { CourseModule } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlayCircle, Download, Lock } from 'lucide-react';

interface CurriculumSectionProps {
  curriculum?: CourseModule[];
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ curriculum }) => {
  if (!curriculum || curriculum.length === 0) {
    return <p>Curriculum details are not available for this course.</p>;
  }

  const totalLessons = curriculum.reduce((sum, module) => sum + module.lessons.length, 0);
  // Placeholder for total duration calculation
  const totalDuration = curriculum.reduce((sum, module) => {
    return sum + module.lessons.reduce((lessonSum, lesson) => {
      const mins = parseInt(lesson.duration); // Assuming format "15min"
      return lessonSum + (isNaN(mins) ? 0 : mins);
    }, 0);
  }, 0);
  const totalHours = (totalDuration / 60).toFixed(1);


  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Course Content</h3>
        <span className="text-sm text-muted-foreground">
            {curriculum.length} modules &bull; {totalLessons} lessons &bull; ~{totalHours}h total
        </span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {curriculum.map((module, moduleIndex) => (
          <AccordionItem value={`module-${module.id}`} key={module.id}>
            <AccordionTrigger className="text-lg hover:no-underline">
              <div className="flex justify-between w-full pr-2">
                <span>{moduleIndex + 1}. {module.title}</span>
                <span className="text-sm font-normal text-muted-foreground">{module.lessons.length} lessons</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pl-2 pt-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lesson.id} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary/70 transition-colors">
                    <div className="flex items-center">
                      {lesson.isVideo ? (
                        <PlayCircle className="h-5 w-5 mr-3 text-primary" />
                      ) : (
                        <Download className="h-5 w-5 mr-3 text-primary" />
                      )}
                      <span className="text-sm">{lessonIndex + 1}. {lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {lesson.previewUrl ? (
                             <a href={lesson.previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Preview</a>
                        ) : (
                            <Lock className="h-4 w-4 text-muted-foreground/50" title="Locked content"/>
                        )}
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        {lesson.isDownloadable && <Download className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" title="Downloadable"/>}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CurriculumSection;
