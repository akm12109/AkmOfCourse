
'use client';

import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Github, Twitter, Linkedin, Facebook, Instagram, Youtube, Loader2 } from 'lucide-react'; 
import type { SocialLink } from '@/types';
import { getSocialLinks } from '@/services/socialLinkService'; 
import { useState, useEffect } from 'react';

const iconComponents: { [key: string]: React.ElementType } = {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
};


const Footer = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        const links = await getSocialLinks();
        setSocialLinks(links);
      } catch (error) {
        console.error("Failed to fetch social links for footer:", error);
        setSocialLinks([ 
            {id: 'fallback_gh', platform: "Github", url: "#", iconName: "Github", order: 1 },
            {id: 'fallback_tw', platform: "Twitter", url: "#", iconName: "Twitter", order: 2 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Empowering individuals with high-quality online courses and resources.
            </p>
            {isLoading ? (
                <div className="mt-6 flex space-x-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            ) : socialLinks.length > 0 ? (
              <div className="mt-6 flex space-x-4">
                {socialLinks.map(link => {
                  const IconComponent = link.iconName ? iconComponents[link.iconName] : null;
                  return (
                    <Link key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.platform}>
                      {IconComponent ? <IconComponent className="h-5 w-5" /> : <span>{link.platform.substring(0,2)}</span>}
                    </Link>
                  );
                })}
              </div>
            ) : (
                <p className="mt-6 text-xs text-muted-foreground">No social links configured.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-semibold text-foreground">Company</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-foreground">Resources</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">All Courses</Link>
                <Link href="/request-course" className="text-muted-foreground hover:text-primary transition-colors">Request a Course</Link>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support Center</Link>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-foreground">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Akm of course. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
