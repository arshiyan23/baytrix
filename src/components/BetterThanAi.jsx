import React, { useEffect } from 'react';
import '../styles/better-than-ai.css';
import ProcessHeading from './ProcessHeading';

const sections = [
  {
    id: 'consistency',
    icon: '/assets/graph.png',
    title: 'Lacks consistency',
    desc: 'Lacks consistency – MAJOR FLAW: meaning no two results of the same prompt are the same ever. It lacks consistency no matter how efficient your prompt is. And let’s say you found the best AI in the world that makes the best and most accurate app designs — but again, you would still require skills to develop it, host it, maintain its SEO, and so on.',
    example: 'A travel agency producing social media reels, promotional videos, and destination pictures may find it challenging to maintain visual and tonal consistency across campaigns when relying solely on AI-generated content.',
  },
  {
    id: 'prompts',
    icon: '/assets/think.png',
    title: 'You wouldn\'t know what prompts to use',
    desc: 'You wouldn’t know what prompts you need to write in order to generate required results, so for that, you would need to learn AI – and even then, you couldn’t get consistent results.',
    example: 'A doctor running a medical clinic who wants to build a mobile app for appointment scheduling, viewing patient reports, and sending health reminders would first need to research the right AI tools, then learn how to use them effectively with the right prompts—essentially requiring technical training or background before even starting the actual project.',
  },
  {
    id: 'accuracy',
    icon: '/assets/warning.png',
    title: 'AI comes with disclaimers — we deliver guaranteed results',
    desc: 'Every AI tool comes with a disclaimer: "This product may make mistakes." And that’s the truth — AI outputs can be inaccurate, inconsistent, or misaligned with your goals. We don’t make mistakes. We provide tailored solutions, refined through human expertise, with consistent quality and guaranteed results — something AI still fails to achieve.',
    example: 'A legal consultancy firm cannot afford AI-generated documents with even the smallest inaccuracies. With our team, every piece of content is reviewed, customized, and delivered with full confidence in accuracy and compliance — no disclaimers needed.',
  },
  {
    id: 'emotions',
    icon: '/assets/confused.png',
    title: 'AI Doesn\'t Understand Human Emotions',
    desc: 'AI doesn’t clearly understand emotions – it cannot generate results specific to how a certain demographic, meaning the audience that you are targeting, reacts to your product since AI gives general results.',
    example: 'A boutique coffee brand that markets with humor and sarcasm might find AI-generated copy too generic or off-tone.',
  },
  {
    id: 'research',
    icon: '/assets/research.png',
    title: 'AI cannot conduct company-specific research',
    desc: 'AI cannot do tailored research for your company – such as analyzing your direct competitors, industry positioning, audience behavior, or market gaps – because it lacks access to real-time, specific, and often proprietary data. It only provides generalized insights based on what it’s been trained on or what you manually input.',
    example: 'A fintech startup looking to position itself against local competitors offering similar budgeting apps would need a human-led research team to dig into user reviews, product features, and pricing strategies – something AI cannot autonomously research or validate in a reliable, strategic way.',
  },

  {
    id: 'brand-personality',
    icon: '/assets/personality.png',
    title: 'AI doesn\'t understand brand personality',
    desc: 'AI doesn’t understand brand personality – what your exact requirements are – meaning it cannot fathom what your client requirements are based on a specific demographic.',
    example: 'A luxury skincare brand targeting women in Italy would require research from a team that understands how Italian women emotionally respond to specific colors, typography, and cultural cues in branding — something AI often fails to personalize at that depth, as it tends to produce generic content.',

  },
  {
    id: 'support',
    icon: '/assets/support.png',
    title: 'No after-sales support from AI',
    desc: 'It cannot give you after-sales support for the products/results that it has generated.',
    example: 'A real estate company using AI to draft client proposals may still need human edits and support to adjust based on real-time feedback and considerations.',
  },
  {
    id: 'pricing',
    icon: '/assets/dollar.png',
    title: 'AI isn’t free – So why not invest in Real Experts?',
    desc: 'It isn’t free, so if you pay AI, why don’t you pay us instead? We take all of this burden from you and guarantee results.',
    example: 'A digital marketing agency can offer tailored campaign strategies and execution, unlike a subscription to an AI tool that still requires manual input.',
  },

  {
    id: 'tool-vs-solution',
    icon: '/assets/tool.png',
    title: 'AI is a tool, not a complete solution',
    desc: 'In conclusion, as of now AI can only be used as a tool that aids in your work/ability – not a solution as a whole – making it better for small tasks but not for a project as a whole.',
    example: 'A branding agency may use AI to brainstorm tagline ideas, but full brand strategy still requires human creativity and client-specific insights.',
  },
];

const BetterThanAi = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const sidebarEl = document.querySelector(`.btai-sidebar li[data-id="${id}"]`);

          if (sidebarEl) {
            if (entry.isIntersecting) {
              sidebarEl.classList.add('active');
            } else {
              sidebarEl.classList.remove('active');
            }
          }

          // Mobile animation logic
          if (isMobile) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
            }
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0.25,
      }
    );

    document.querySelectorAll('.btai-card').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="btai-wrapper" id='better-than-ai'>
      <ProcessHeading
        backgroundText="REASONS"
        foregroundText="WHY WE ARE BETTER THAN AI"
        description='This section is a must-read for anyone considering AI for their business. 
        Discover the critical gaps AI leaves behind — and why choosing us means choosing guaranteed results, 
        human creativity, and tailored solutions that no AI can match.'
      />
      <div className="btai-container">
        <div className="btai-sidebar">
          <ul>
            {sections.map((section, idx) => (
              <li key={section.id} data-id={section.id}>
                <img
                  src={section.icon}
                  alt=""
                  className="btai-icon"
                />
                <strong>
                  {idx + 1}. {section.title}
                </strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="btai-content">
          {sections.map(({ id, title, desc, icon, example }) => (
            <section id={id} key={id} className="btai-card">
              <h2 className="btai-card-heading">
                <img src={icon} alt="" className="btai-card-icon" />
                {title}
              </h2>
              <p>{desc}</p> <br />
              <p style={{ fontSize: "14px", color: "#7349ac", fontStyle: "italic" }}>Example – {example}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetterThanAi;