import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function Workflow() {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How ReadSpark Works
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Generate, edit, and manage your documentation in three simple steps
          </p>
          
          <div className="space-y-8">
            <Step 
              number={1}
              title="Connect Your Repository"
              description="Link your GitHub repository or start from scratch"
            />
            <Step 
              number={2}
              title="Generate or Edit"
              description="Use AI to generate content or edit existing READMEs"
            />
            <Step 
              number={3}
              title="Push Changes"
              description="Preview and push your changes directly to GitHub"
            />
          </div>

          <Button asChild className="mt-12" size="lg">
            <Link href="/dashboard">
              Try ReadSpark Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
