import { Button } from '@/components/ui/button';
import { FaArrowRight, FaFileAlt, FaUsers, FaBolt } from 'react-icons/fa';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-6">
          <FaFileAlt className="h-6 w-6" />
          <span className="text-sm font-medium">Welcome to Neotion</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Your connected workspace for
          <span className="block text-primary mt-2">brilliant ideas</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Write, plan, organize, and collaborate. Neotion is the all-in-one
          workspace where your best work comes together, beautifully.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/documents" className="flex items-center">
              Start writing for free
              <FaArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="#features">Explore features</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <FaUsers className="h-4 w-4" />
            <span>Team collaboration</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBolt className="h-4 w-4" />
            <span>Real-time sync</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaFileAlt className="h-4 w-4" />
            <span>Rich content</span>
          </div>
        </div>
      </div>
    </div>
  );
};
