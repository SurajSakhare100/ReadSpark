import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-4 pt-20 overflow-hidden bg-secondary">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-800/20 dark:to-purple-600/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-400/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Content */}
      <div className="relative">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground max-w-5xl animate-fade-in">
          Focus on your Projects,{' '}
          <span className="text-blue-600 dark:text-blue-500">not the ReadMe</span>
        </h1>
        
        <p className="mt-6 text-2xl text-center text-muted-foreground max-w-5xl animate-fade-in-delay">
          Effortlessly craft stunning READMEs with our built-in templates
        </p>

        <Button 
          asChild
          size="xl"
          className="mt-8  py-3 animate-fade-in-delay-2 bg-blue-600 dark:text-white text-lg"
        >
          <Link href="/dashboard">
            Start Editing Your README.md now
            <ArrowRight className="w-8 h-8 ml-2 text-2xl" />
          </Link>
        </Button>
      </div>
    </section>
  );
}