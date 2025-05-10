
"use client";

import SvgLoadingAnimation from './SvgLoadingAnimation';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number; // Tailwind size unit, e.g., 12 for h-12 w-12 (3rem)
  className?: string; // For the outer flex container
  spinnerContainerClassName?: string; // For the div that directly wraps the SVG animation
  fullPage?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 12,
  className,
  spinnerContainerClassName,
  fullPage = false,
  text,
}) => {
  // Dynamically create Tailwind-like class string for size.
  // Important: For Tailwind JIT to work, full class names must be present.
  // This approach generates them dynamically, which is fine for style attributes or if a utility handles it.
  // However, if this dynamic class (`h-${size} w-${size}`) is meant for Tailwind's direct processing,
  // it might not work as expected unless Tailwind is configured to scan for these patterns or they are safelisted.
  // For direct style manipulation or components that can take h/w as props, this is fine.
  // Given it's `cn(spinnerSizeClass, ...)`, it implies it's for CSS class usage.
  // A safer bet for Tailwind is to have predefined sizes or pass the full class string.
  // For this case, we'll assume `h-X` and `w-X` are available in the project's Tailwind setup (e.g. via safelisting or common use).
  const spinnerSizeClass = `h-${size} w-${size}`; 

  if (fullPage) {
    return (
      <div className={cn("flex flex-col min-h-screen items-center justify-center", className)}>
        <div className={cn(spinnerSizeClass, spinnerContainerClassName)}>
          <SvgLoadingAnimation /> {/* SVG has 100% width/height, fills this div */}
        </div>
        {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
      </div>
    );
  }

  return (
     <div className={cn("flex flex-col items-center justify-center", className)}>
        <div className={cn(spinnerSizeClass, spinnerContainerClassName)}>
          <SvgLoadingAnimation />
        </div>
        {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
