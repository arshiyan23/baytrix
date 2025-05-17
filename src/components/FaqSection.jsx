import React, { useState } from "react";
import "../styles/faq-section.css";
import ProcessHeading from "./ProcessHeading";

const faqs = [
  {
    question: "What services does Baytix offer?",
    answer:
      "Baytix specializes in branding, app design, social media management, marketing ads, and AI integration to help businesses grow and stand out.",
  },
  {
    question: "How is Baytix different from other agencies?",
    answer:
      "We blend creativity with smart tech like AI to deliver unique branding and growth strategies tailored for modern businesses.",
  },
  {
    question: "Can I hire Baytix for a one-time project?",
    answer:
      "Absolutely! While we offer monthly retainers for ongoing support, we also take on standalone projects like logo design, app prototypes, or ad campaigns.",
  },
  {
    question: "How does the AI integration service work?",
    answer:
      "We assess your business needs and implement AI tools to automate workflows, improve customer engagement, or generate smart insights—customized to your operations.",
  },
  {
    question: "How soon can we get started?",
    answer:
      "Once we understand your needs via a discovery call, we can usually begin within 2–3 business days depending on the project scope.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <ProcessHeading
        backgroundText="FAQ"
        foregroundText="KNOW MORE"
        foregroundTextColor='white'
        description="Find answers to the most common questions about our services, processes, and support. If you need more details, our team is always ready to help!"
      />
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div className={`accordion-item ${openIndex === index ? "open" : ""}`} key={index}>
            <div className="accordion-question" onClick={() => toggle(index)}>
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>
            <div className="accordion-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
