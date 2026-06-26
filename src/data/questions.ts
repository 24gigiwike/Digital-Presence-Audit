import { Question } from '../types';

export const AUDIT_QUESTIONS: Question[] = [
  // ==================== SECTION 1: BRAND CLARITY ====================
  {
    id: 'bc_1',
    category: 'brandClarity',
    categoryName: 'Brand Clarity',
    title: 'Can someone understand what you do within 5 seconds of seeing your profile?',
    subtitle: 'First impressions dictate whether high-value prospects stay or bounce.',
    type: 'choice',
    options: [
      {
        label: 'Yes, my service and unique value are immediately clear',
        points: 10,
      },
      {
        label: 'They understand my skill (e.g. design), but not my difference',
        points: 6,
        recommendationIfChosen: 'Your positioning is commoditized. You must articulate your unique mechanism or specialty so you stand out from thousands of generalist freelancers.'
      },
      {
        label: 'I usually have to explain what I do during messages or calls',
        points: 2,
        recommendationIfChosen: 'Critical clarity gap. If prospects cannot decode your offer instantly, they assume you cannot solve their specific problem.'
      }
    ]
  },
  {
    id: 'bc_2',
    category: 'brandClarity',
    categoryName: 'Brand Clarity',
    title: 'Is your ideal client clearly defined across your digital headlines?',
    subtitle: 'When you speak to everyone, you convert no one.',
    type: 'choice',
    options: [
      {
        label: 'Yes, I know exactly who I serve and name them explicitly',
        points: 10,
      },
      {
        label: 'I have a general target audience (e.g. "small businesses")',
        points: 6,
        recommendationIfChosen: 'Niche down your messaging. Premium retainers are awarded to specialists who solve costly industry-specific problems.'
      },
      {
        label: 'I serve anyone who needs my skill and is willing to pay',
        points: 2,
        recommendationIfChosen: 'Desperation positioning. Without a defined target avatar, you will constantly compete on price rather than value.'
      }
    ]
  },
  {
    id: 'bc_3',
    category: 'brandClarity',
    categoryName: 'Brand Clarity',
    title: 'Does your messaging focus more on tangible business outcomes than just technical services?',
    subtitle: 'Clients buy financial or emotional transformations, not software deliverables.',
    type: 'choice',
    options: [
      {
        label: 'Yes, I lead with ROI, revenue growth, time savings, or brand equity',
        points: 10,
      },
      {
        label: 'Sometimes, but I mostly list deliverables (e.g. "5 pages, Figma file")',
        points: 6,
        recommendationIfChosen: 'Shift your copy from features to transformations. Instead of selling "Website Design", sell "A 24/7 Silent Salesperson That Books Qualified Leads".'
      },
      {
        label: 'Mostly technical features, software tools, and skill tags',
        points: 2,
        recommendationIfChosen: 'Clients do not care about your stack; they care about their bank account. Elevate your narrative to executive outcomes.'
      }
    ]
  },

  // ==================== SECTION 2: TRUST & CREDIBILITY ====================
  {
    id: 'tc_1',
    category: 'trustCredibility',
    categoryName: 'Trust & Credibility',
    title: 'When someone discovers you online, what primary anchor builds their trust?',
    subtitle: 'Trust is the currency of high-ticket digital service contracts.',
    type: 'choice',
    options: [
      {
        label: 'Verified client results, ROI metrics, and executive case studies',
        points: 10,
      },
      {
        label: 'My extensive visual portfolio and aesthetic craftsmanship',
        points: 8,
      },
      {
        label: 'My years of industry experience and personal authority brand',
        points: 7,
      },
      {
        label: 'I am still building public credibility assets and social proof',
        points: 2,
        recommendationIfChosen: 'You are operating on high friction. Without visible third-party validation, every sales pitch feels like an uphill battle.'
      }
    ]
  },
  {
    id: 'tc_2',
    category: 'trustCredibility',
    categoryName: 'Trust & Credibility',
    title: 'Which trust assets do you currently showcase publicly online?',
    subtitle: 'Select all credibility triggers active on your primary platform.',
    type: 'checklist',
    options: [
      { label: 'Curated professional portfolio with context', points: 2 },
      { label: 'Video or detailed written client testimonials', points: 2 },
      { label: 'Deep-dive case studies showing Problem → Solution → Result', points: 2 },
      { label: 'Verified client logos or roster highlights', points: 2 },
      { label: 'Professional founder bio, headshot, and agency ethos', points: 2 },
    ]
  },
  {
    id: 'tc_3',
    category: 'trustCredibility',
    categoryName: 'Trust & Credibility',
    title: 'Are your case studies structured to prove measurable business impact?',
    subtitle: 'Pretty mockups without numbers look like student exercises.',
    type: 'choice',
    options: [
      {
        label: 'Yes, every major project highlights concrete KPIs or client wins',
        points: 10,
      },
      {
        label: 'Somewhat, I explain the design process but lack hard data',
        points: 6,
        recommendationIfChosen: 'Follow up with past clients to extract quantifiable wins (conversion rate lifts, faster load times, increased sales). Put numbers front and center.'
      },
      {
        label: 'No, I display visual screenshots without narrative breakdown',
        points: 2,
        recommendationIfChosen: 'Transform your static gallery into strategic proof. Explain the strategic challenge behind each piece of work.'
      }
    ]
  },

  // ==================== SECTION 3: VISUAL EXPERIENCE ====================
  {
    id: 've_1',
    category: 'visualExperience',
    categoryName: 'Visual Experience',
    title: 'Does your online digital presence truly represent the quality of your actual work?',
    subtitle: 'The shoemaker\'s children often go barefoot. Is your presence lagging behind your talent?',
    type: 'choice',
    options: [
      {
        label: 'Strong — My digital presence is luxury, immaculate, and high-converting',
        points: 10,
      },
      {
        label: 'Average — It looks fine, but feels like standard template design',
        points: 6,
        recommendationIfChosen: 'Upgrade your visual containers. In premium markets, clients judge your operational competence by the polish of your typography and spacing.'
      },
      {
        label: 'Needs Improvement — My work is great, but my personal site/profile is outdated',
        points: 2,
        recommendationIfChosen: 'Severe cognitive dissonance. When a talented designer or agency has a cluttered or broken digital presence, prospects assume lack of attention to detail.'
      }
    ]
  },
  {
    id: 've_2',
    category: 'visualExperience',
    categoryName: 'Visual Experience',
    title: 'Evaluate your current visual standard across these 5 luxury checkpoints:',
    subtitle: 'Select all standards you execute flawlessly.',
    type: 'checklist',
    options: [
      { label: '100% unified branding consistency across web & social', points: 2 },
      { label: 'High-end editorial typography and intentional negative space', points: 2 },
      { label: 'Clean, high-resolution content presentation without clutter', points: 2 },
      { label: 'Immaculate profile layout and bio formatting', points: 2 },
      { label: 'Lightning-fast mobile website responsiveness (< 2s load)', points: 2 },
    ]
  },
  {
    id: 've_3',
    category: 'visualExperience',
    categoryName: 'Visual Experience',
    title: 'How distinctive is your visual aesthetic compared to your direct competitors?',
    subtitle: 'Blending in is the fastest way to get ignored.',
    type: 'choice',
    options: [
      {
        label: 'Highly distinctive — We have a signature look that feels like a top studio',
        points: 10,
      },
      {
        label: 'Standard modern — Clean and safe, but similar to others in my field',
        points: 6,
        recommendationIfChosen: 'Inject bespoke brand personality. Use subtle micro-interactions, dark glassmorphism, or bold editorial typography to create memory retention.'
      },
      {
        label: 'Generic corporate or unstyled basic layouts',
        points: 2,
        recommendationIfChosen: 'Eliminate corporate questionnaire energy. Your digital presence must feel like an exclusive bespoke experience.'
      }
    ]
  },

  // ==================== SECTION 4: CONVERSION SYSTEM ====================
  {
    id: 'cs_1',
    category: 'conversionSystem',
    categoryName: 'Conversion System',
    title: 'Is it completely obvious what a visitor should do immediately after finding you?',
    subtitle: 'Confusion kills conversions. Friction loses retainers.',
    type: 'choice',
    options: [
      {
        label: 'Yes — There is one dominant, undeniable primary CTA on every view',
        points: 10,
      },
      {
        label: 'Somewhat — I have several links or social icons competing for attention',
        points: 6,
        recommendationIfChosen: 'Streamline your conversion hierarchy. Eliminate link trees with 15 random options; guide visitors down a single high-intent pathway.'
      },
      {
        label: 'No — Visitors have to hunt for my email or DM me without guidance',
        points: 2,
        recommendationIfChosen: 'You are losing warm leads at the finish line. Implement an unequivocal "Book Strategy Call" or "Start Inquiry" button.'
      }
    ]
  },
  {
    id: 'cs_2',
    category: 'conversionSystem',
    categoryName: 'Conversion System',
    title: 'Which conversion mechanisms are currently active and frictionless in your business?',
    subtitle: 'Select all active revenue capture systems.',
    type: 'checklist',
    options: [
      { label: 'Prominent, action-oriented primary CTA button', points: 2 },
      { label: 'Frictionless qualifying contact form (takes < 60 seconds)', points: 2 },
      { label: 'Automated calendar booking system (Calendly/Cal.com)', points: 2 },
      { label: 'Transparent service structure or investment expectations', points: 2 },
      { label: 'High-value lead magnet capture (audit, guide, or checklist)', points: 2 },
    ]
  },
  {
    id: 'cs_3',
    category: 'conversionSystem',
    categoryName: 'Conversion System',
    title: 'What happens immediately after a qualified lead submits an inquiry?',
    subtitle: 'Speed to lead determines contract closing rates.',
    type: 'choice',
    options: [
      {
        label: 'Instant confirmation email with next steps, expectations, and booking link',
        points: 10,
      },
      {
        label: 'I manually reply whenever I check my inbox (within 12-24 hours)',
        points: 6,
        recommendationIfChosen: 'Set up automated instant acknowledgment. While you sleep or design, your system should warm up the prospect with a welcome video or brochure.'
      },
      {
        label: 'Sporadic response times depending on my workload',
        points: 2,
        recommendationIfChosen: 'High-paying clients interpret slow inquiry responses as foreshadowing slow project delivery. Automate your intake pipeline.'
      }
    ]
  },

  // ==================== SECTION 5: GROWTH FOUNDATION ====================
  {
    id: 'gf_1',
    category: 'growthFoundation',
    categoryName: 'Growth Foundation',
    title: 'Do you consistently publish thought leadership or authority content?',
    subtitle: 'Authority content warms up prospects before they ever get on a sales call.',
    type: 'choice',
    options: [
      {
        label: 'Yes — I publish strategic insights weekly across LinkedIn, X, or YouTube',
        points: 10,
      },
      {
        label: 'Occasionally — When I have free time between client projects',
        points: 6,
        recommendationIfChosen: 'Batch create your content. Consistent visibility builds compound organic trust that decouples your lead flow from paid ads or cold outreach.'
      },
      {
        label: 'Rarely or never — I rely almost entirely on word-of-mouth and referrals',
        points: 2,
        recommendationIfChosen: 'Referrals are great until they dry up. You must build an independent organic discovery engine.'
      }
    ]
  },
  {
    id: 'gf_2',
    category: 'growthFoundation',
    categoryName: 'Growth Foundation',
    title: 'Which scalable growth foundations do you actively maintain?',
    subtitle: 'Select all compounding business assets.',
    type: 'checklist',
    options: [
      { label: 'Consistent authority content publishing schedule', points: 2 },
      { label: 'Active audience building across target client channels', points: 2 },
      { label: 'Owned email newsletter list asset collection', points: 2 },
      { label: 'Predictable outbound or inbound client acquisition system', points: 2 },
      { label: 'Strategic referral partnerships with non-competing agencies', points: 2 },
    ]
  },
  {
    id: 'gf_3',
    category: 'growthFoundation',
    categoryName: 'Growth Foundation',
    title: 'If your primary social account or referral source vanished today, how resilient is your revenue?',
    subtitle: 'True sovereignty is owning your audience distribution.',
    type: 'choice',
    options: [
      {
        label: '100% resilient — I own an active email list and CRM of warm prospects',
        points: 10,
      },
      {
        label: 'Somewhat vulnerable — I have past client contacts, but no structured list',
        points: 6,
        recommendationIfChosen: 'Start capturing emails on your assessment or contact page immediately. Convert rented algorithm followers into owned subscriber assets.'
      },
      {
        label: 'Highly vulnerable — My business would halt without platform algorithms',
        points: 2,
        recommendationIfChosen: 'Critical fragility. Implement a lead magnet funnel (like this exact Audit tool) to build a proprietary database of potential clients.'
      }
    ]
  }
];

export const MICROCOPY_PROMPTS: { [key: number]: string } = {
  1: "Let's establish your foundational positioning.",
  3: "Great. Now let's examine how prospects perceive your credibility.",
  6: "Excellent progress. Let's look at your visual container standard.",
  9: "You're halfway there. Let's evaluate your revenue conversion architecture.",
  12: "Almost done. Let's inspect your long-term scalable growth foundation.",
  14: "Final question. Your personalized Digital Presence Score™ is being calculated."
};
