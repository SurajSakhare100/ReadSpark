import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  return (
    <section className="py-24 px-4  bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Loved by Developers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Alex Chen"
            role="Full Stack Developer"
            image="/avatars/alex.png"
            quote="ReadSpark has completely transformed how I handle project documentation. The AI suggestions are incredibly accurate!"
          />
          <TestimonialCard
            name="Sarah Miller"
            role="Open Source Maintainer"
            image="/avatars/sarah.png"
            quote="Managing documentation for multiple repositories has never been easier. The GitHub integration is seamless."
          />
          <TestimonialCard
            name="James Wilson"
            role="Tech Lead"
            image="/avatars/james.png"
            quote="The real-time preview and AI assistance have significantly improved our team's documentation workflow."
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, image, quote }:any) {
  return (
    <div className="p-6 rounded-xl bg-card border">
      <blockquote className="text-muted-foreground mb-6">"{quote}"</blockquote>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
}