import React, { useEffect } from 'react';
import '../styles/better-than-ai.css';
import ProcessHeading from './ProcessHeading';

const sections = [
  {
    id: 'emotions',
    icon: '/assets/confused.png',
    title: 'AI Doesn\'t Understand Human Emotions',
    desc: 'AI doesn’t clearly understand emotions – it cannot generate results specific to how a certain demographic, meaning the audience that you are targeting, reacts to your product since AI gives general results.',
    example: 'A luxury skincare brand targeting women aged 35–50 may need emotionally resonant messaging, which AI often fails to personalize at that depth.',
  },
  {
    id: 'prompts',
    icon: '/assets/think.png',
    title: 'You wouldn\'t know what prompts to use',
    desc: 'You wouldn’t know what prompts you need to write in order to generate required results, so for that, you would need to learn AI – and even then, you couldn’t get consistent results.',
    example: 'A startup running Facebook ads for eco-friendly water bottles might waste time and budget testing prompts without guaranteed outcomes.',
  },
  {
    id: 'brand-personality',
    icon: '/assets/personality.png',
    title: 'AI doesn\'t understand brand personality',
    desc: 'AI doesn’t understand brand personality – what your exact requirements are – meaning it cannot fathom what your client requirements are based on a specific demographic.',
    example: 'A boutique coffee brand that markets with humor and sarcasm might find AI-generated copy too generic or off-tone.',
  },
  {
    id: 'consistency',
    icon: '/assets/graph.png',
    title: 'Lacks consistency',
    desc: 'Lacks consistency – major flaw: meaning no two results of the same prompt are the same ever.',
    example: 'An e-commerce fashion store generating multiple product descriptions may struggle with maintaining a consistent tone or structure using AI alone.',
  },
  {
    id: 'pricing',
    icon: '/assets/dollar.png',
    title: 'AI isn’t free – so why not invest in real experts?',
    desc: 'It isn’t free, so if you pay AI, why don’t you pay us instead? We take all of this burden from you and guarantee results.',
    example: 'A digital marketing agency can offer tailored campaign strategies and execution, unlike a subscription to an AI tool that still requires manual input.',
  },
  {
    id: 'support',
    icon: '/assets/support.png',
    title: 'No after-sales support from AI',
    desc: 'It cannot give you after-sales support for the products/results that it has generated.',
    example: 'A real estate company using AI to draft client proposals may still need human edits and support to adjust based on feedback or legal considerations.',
  },
  {
    id: 'tool-vs-solution',
    icon: '/assets/tool.png',
    title: 'AI is a tool, not a complete solution',
    desc: 'So at the moment, AI can only be used as a tool that aids in your work/ability – not a solution as a whole – making it better for small tasks but not for a project as a whole.',
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
    <div className="btai-wrapper">
      <ProcessHeading
        backgroundText="REASONS"
        foregroundText="WHY WE ARE BETTER THAN AI"
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
          {sections.map(({ id, title, desc, icon }) => (
            <section id={id} key={id} className="btai-card">
              <h2 className="btai-card-heading">
                <img src={icon} alt="" className="btai-card-icon" />
                {title}
              </h2>
              <p>{desc}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetterThanAi;