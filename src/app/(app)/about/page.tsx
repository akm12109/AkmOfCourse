
import { Users, Lightbulb, Target, Building, Brain, ShieldCheck, Gamepad2, Palette, Code, Briefcase, UserCheck, Heart, Gem } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

const divisions = [
  {
    name: "AkmTech official",
    description: "Provide Solutions for every possible tech Querys.",
    icon: Brain,
    dataAiHint: "tech solutions"
  },
  {
    name: "Akm Public service",
    description: "Public's demand and query handle this division.",
    icon: Users,
    dataAiHint: "public service"
  },
  {
    name: "Akm Of Course",
    description: "Provide 99% of courses across the internet including Graphic design, Web Development, Coding, AI, Machine Learning, and many others you can't think of.",
    icon: Lightbulb,
    dataAiHint: "online courses"
  },
  {
    name: "Akm* -Mine",
    description: "Gives money to those people who share their Minecraft's world with us. Play and earn money. Monetize your creativity in Mine.",
    icon: Gamepad2,
    dataAiHint: "minecraft gaming"
  },
  {
    name: "AkmXstar",
    description: "Provide Life Style, Wallpapers, Graphic Designs and many Daily Life Tasks with ease.",
    icon: Palette,
    dataAiHint: "lifestyle design"
  },
  {
    name: "DevXAkm",
    description: "Designs Website And Apps for the world.",
    icon: Code,
    dataAiHint: "web development app"
  }
];

const teamMembers = [
  { name: "Akash Akm", role: "C.E.O, Developer, Designer, Hacker", avatarSeed: "akash" },
  { name: "Deepak Akm", role: "Brand Partner, Web Developer", avatarSeed: "deepak" },
  { name: "Manas Akm", role: "Brand Member, Investor, Promoter", avatarSeed: "manas" },
  { name: "Kanishk J", role: "Team managment cyber security", avatarSeed: "kanishk" },
  { name: "Prince Kumar", role: "X HElper", avatarSeed: "prince" }
];

const investors = [
  { name: "Dipika Akm", avatarSeed: "dipika" },
  { name: "Muskan Akm", avatarSeed: "muskan" }
];

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <Building className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">About Akm*Tech Multi-Division Research & Solutions</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          A Tech Company started in 2019, dedicated to providing innovative solutions and fostering growth across multiple sectors.
        </p>
      </header>

      <section className="mb-12 md:mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Divisions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division) => (
            <Card key={division.name} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <division.icon className="h-10 w-10 text-primary mr-3" />
                  <CardTitle className="text-xl">{division.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{division.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-12 md:mb-16 bg-secondary/30 py-12 rounded-lg">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl font-semibold mb-6 text-center md:text-left flex items-center justify-center md:justify-start">
                        <UserCheck className="h-10 w-10 text-primary mr-3" /> Leadership
                    </h2>
                    <Card className="shadow-md">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Image src={`https://picsum.photos/seed/ceoAkash/100/100`} alt="Akash Akm" width={80} height={80} className="rounded-full" data-ai-hint="ceo portrait" />
                                <div>
                                    <CardTitle className="text-2xl">Akash Akm</CardTitle>
                                    <CardDescription>CEO & Founder</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Email: <a href="mailto:akmpublicservice@gmail.com" className="text-primary hover:underline">akmpublicservice@gmail.com</a>
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-6 text-center md:text-left flex items-center justify-center md:justify-start">
                        <Heart className="h-10 w-10 text-destructive mr-3" /> Heartly Investors
                    </h2>
                    <div className="space-y-4">
                        {investors.map(investor => (
                            <Card key={investor.name} className="shadow-sm">
                                <CardContent className="p-4 flex items-center space-x-3">
                                     <Image src={`https://picsum.photos/seed/${investor.avatarSeed}/60/60`} alt={investor.name} width={50} height={50} className="rounded-full" data-ai-hint="investor portrait" />
                                    <p className="font-medium text-lg">{investor.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>


      <section className="mb-12 md:mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10 flex items-center justify-center">
          <Gem className="h-10 w-10 text-primary mr-3" /> Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Image 
                    src={`https://picsum.photos/seed/${member.avatarSeed}/100/100`} 
                    alt={member.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full mx-auto mb-4" 
                    data-ai-hint="team member"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We are constantly innovating and expanding. If you're passionate about technology and making a difference, explore how you can be a part of Akm*Tech.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}
