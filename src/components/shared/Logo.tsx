import Link from 'next/link';
import { GraduationCap } from 'lucide-react'; 

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-bold ${className}`}>
      <GraduationCap className="h-8 w-8 text-primary" /> 
      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Akm of course
      </span>
    </Link>
  );
};

export default Logo;
