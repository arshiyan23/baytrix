import React, { useState } from "react";
import "../styles/faq-section.css";
import ProcessHeading from "./ProcessHeading";
import ScheduleCall from "./ScheduleCall";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showScheduleCall, setShowScheduleCall] = useState(false);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does Baytix offer?",
      answer: (
        <>
          Baytix specializes in branding, app design, social media management, marketing ads, and AI integration to help businesses grow and stand out.
          <br />
          <span> Get in touch with our experts to learn more about our offerings.</span>{" "}
          <button className="faq-contact-button" onClick={() => setShowScheduleCall(true)}>
            Book Now
          </button>
        </>
      ),
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
    {
      question: "How can I get in touch?",
      answer: (
        <>
          You can contact us via email at{" "}
          <a href="mailto:info@baytix.net" target="_blank" rel="noopener noreferrer">
            info@baytix.net
          </a>
          , or chat live on our{" "}
          <a href="/support" target="_blank" rel="noopener noreferrer">
            Support Page
          </a>
          . You can also{" "}
          <a href="/consultation" target="_blank" rel="noopener noreferrer">
            book a free consultation now
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <>
      <div className="faq-section">
        <ProcessHeading
          backgroundText="KNOW MORE"
          foregroundText="FREQUENTLY ASKED QUESTIONS"
          foregroundTextColor="white"
          description="Find answers to the most common questions about our services, processes, and support. If you need more details, our team is always ready to help!"
        />
        <div className="accordion">
          {faqs.map((faq, index) => (
            <div
              className={`accordion-item ${openIndex === index ? "open" : ""}`}
              key={index}
            >
              <div className="accordion-question" onClick={() => toggle(index)}>
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </div>
              <div className="accordion-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      {showScheduleCall && (
        <ScheduleCall onClose={() => setShowScheduleCall(false)} />
      )}
    </>
  );
};

export default FAQSection;
