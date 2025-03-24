import { FileText, Github, Sparkles, RefreshCcw, Upload } from 'lucide-react';

export function Features() {
  return (
    <section className="py-20 px-4  bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Supercharge Your Documentation Workflow
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Github className="w-8 h-8" />}
            title="GitHub Integration"
            description="Seamlessly connect with your repositories. Fetch and push READMEs directly from GitHub."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI-Powered Generation"
            description="Leverage Gemini AI to generate professional documentation in seconds."
          />
          <FeatureCard
            icon={<RefreshCcw className="w-8 h-8" />}
            title="Real-time Preview"
            description="Edit and preview your markdown in real-time with our modern editor."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }:any) {
  return (
    <div className="p-6 rounded-2xl bg-card border hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}