import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-b-2">
            <AccordionTrigger className="text-xl font-medium py-4">
              How does the AI generation work?
            </AccordionTrigger>
            <AccordionContent className="text-lg pb-4 text-muted-foreground">
              ReadSpark uses Google's Gemini AI to analyze your project and generate professional documentation. It understands your code structure and creates relevant, accurate documentation.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-b-2">
            <AccordionTrigger className="text-xl font-medium py-4">
              Can I use it with private repositories?
            </AccordionTrigger>
            <AccordionContent className="text-lg pb-4 text-muted-foreground">
              Yes! ReadSpark securely integrates with your GitHub account and can access both public and private repositories with your permission.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-b-2">
            <AccordionTrigger className="text-xl font-medium py-4">
              What makes ReadSpark different?
            </AccordionTrigger>
            <AccordionContent className="text-lg pb-4 text-muted-foreground">
              ReadSpark combines AI-powered generation, direct GitHub integration, and real-time editing in one seamless platform, making documentation management effortless.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}