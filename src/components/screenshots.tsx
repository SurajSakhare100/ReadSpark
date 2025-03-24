import Image from 'next/image';

export function Screenshots() {
  return (
    <section className="py-24 px-4 overflow-hidden bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Powerful Features, Simple Interface
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Create, edit, and manage your documentation with our intuitive interface
        </p>
        
        <div className="relative rounded-xl overflow-hidden border bg-card shadow-2xl">
          <Image
            src="/dashboard-preview.png"
            alt="ReadSpark Dashboard"
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}