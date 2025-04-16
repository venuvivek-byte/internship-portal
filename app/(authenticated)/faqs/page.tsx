import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I apply for an internship?",
    answer: "To apply for an internship, navigate to the internship details page and click the 'Apply Now' button. You'll need to provide a cover letter, resume link, and any additional information requested by the company.",
  },
  {
    question: "Can I save internships for later?",
    answer: "Yes! When browsing internships, you can click the bookmark icon to save an internship to your saved list. You can view all your saved internships in the 'Saved' section.",
  },
  {
    question: "How can I track my applications?",
    answer: "All your submitted applications are visible in your dashboard. You can see their status (pending, accepted, or rejected) and when you applied.",
  },
  {
    question: "What should I include in my cover letter?",
    answer: "Your cover letter should explain why you're interested in the internship and what makes you a good fit. Include relevant skills, experiences, and your enthusiasm for the role and company.",
  },
  {
    question: "How do I update my profile?",
    answer: "Click on your avatar in the top-right corner and select 'Profile' from the dropdown menu. There you can update your personal information, skills, and other details.",
  },
  {
    question: "What happens after I submit an application?",
    answer: "After submission, your application status will be 'pending'. The company will review your application and may contact you for further steps. You can track the status in your dashboard.",
  },
  {
    question: "Can I edit my application after submitting?",
    answer: "No, applications cannot be edited after submission. Make sure to review all information carefully before submitting.",
  },
  {
    question: "How will I be notified about application updates?",
    answer: "You'll receive email notifications when there are updates to your applications. You can also check your dashboard regularly for the latest status.",
  },
];

export default function FAQsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions about using the Internship Portal
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
} 