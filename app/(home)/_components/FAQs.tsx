'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/constants';
import { FaQuestionCircle } from 'react-icons/fa';

export default function FAQ() {
  return (
    <>
      <h2 className="text-lg sm:text-xl flex md:text-4xl font-bold text-center mb-4 sm:mb-6">
        <FaQuestionCircle className="text-4xl mr-3 dark:text-white text-black" />{' '}
        Frequently Asked Questions
      </h2>
      <div className="w-full max-w-4xl mx-auto">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="dark:text-white/75 text-black/75"
            >
              <AccordionTrigger>
                {index + 1 + '. ' + faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
