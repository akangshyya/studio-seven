export type Project = { name: string; tag: string; status: string; features: string[] }

export type Capability = {
  slug: string
  number: string
  title: string
  text: string
  status: string
  projects: Project[]
}

export const capabilities: Capability[] = [
  {
    slug: 'ai-systems',
    number: '01',
    title: 'AI systems',
    status: 'Live now',
    text: 'Applied intelligence woven into products and operations — models, agents, and infrastructure built to think, not just automate.',
    projects: [
      {
        name: 'AI Call & Support System',
        tag: 'Voice agent',
        status: 'Live now',
        features: [
          'Answers every call, 24/7 — no hold music, no missed leads',
          'Understands your FAQs and resolves support questions live',
          'Books, routes, and hands off to a human when it should',
        ],
      },
      {
        name: 'Predictive Inventory Engine',
        tag: 'Forecasting',
        status: 'In development',
        features: [
          'Watches sales velocity and seasonality across every SKU',
          'Flags reorders before shelves actually run out',
          'Cuts both stockouts and dead stock sitting in the warehouse',
        ],
      },
      {
        name: 'Support Copilot',
        tag: 'Customer ops',
        status: 'Concept',
        features: [
          'Drafts replies straight from past tickets and internal docs',
          'Lives inside the inbox the team already works from',
          'Learns tone and edge cases from every reply it sees',
        ],
      },
    ],
  },
  {
    slug: 'branding',
    number: '02',
    title: 'Branding',
    status: 'In development',
    text: 'Identity systems, naming, and visual language that give an idea a voice people remember and trust.',
    projects: [
      {
        name: 'Skyline Coffee Co. Identity',
        tag: 'Identity system',
        status: 'Live now',
        features: [
          'Mark, type, and colour system built to work at any scale',
          'Packaging and store signage designed as one family',
          'Feels handmade at the counter, consistent across the chain',
        ],
      },
      {
        name: 'Verve Fintech Rebrand',
        tag: 'Rebrand',
        status: 'In development',
        features: [
          'Moves away from generic fintech blue without losing trust',
          'Warmer type and colour language across every touchpoint',
          'Built to hold up from app icon to billboard',
        ],
      },
      {
        name: 'Northeast Tourism Board',
        tag: 'Naming & identity',
        status: 'Concept',
        features: [
          'Naming built around the seven states it represents',
          'Visual identity that travels across print, web, and signage',
          'A system flexible enough for every district to make it their own',
        ],
      },
    ],
  },
  {
    slug: 'content-production',
    number: '03',
    title: 'Content production',
    status: 'In development',
    text: 'Film, photography, and campaigns produced with intent — content built to move culture, not just fill a feed.',
    projects: [
      {
        name: 'Monsoon Campaign Film',
        tag: 'Brand film',
        status: 'Live now',
        features: [
          'Shot across three states on a single production run',
          'Built around one emotional beat, not a feature list',
          'Cut for both cinema and a 15-second social version',
        ],
      },
      {
        name: 'Founder Story Series',
        tag: 'Documentary',
        status: 'In development',
        features: [
          'Profiles founders building outside the usual metro hubs',
          'Quiet, observational style — low on gloss, high on trust',
          'Episodic format built to release over several months',
        ],
      },
      {
        name: 'Product Launch Reel',
        tag: 'Social campaign',
        status: 'Concept',
        features: [
          'Built to work muted, vertical, and in the first three seconds',
          'Modular cutdowns for every placement and platform',
          'Designed around the launch date, not around the budget',
        ],
      },
    ],
  },
  {
    slug: 'digital-products',
    number: '04',
    title: 'Digital products',
    status: 'In development',
    text: 'Web and mobile products designed and engineered end to end, from first sketch to shipped release.',
    projects: [
      {
        name: 'Salon Booking Platform',
        tag: 'Web app',
        status: 'Live now',
        features: [
          'Scheduling, staff calendars, and client history in one app',
          'Built for owners who don\u2019t have time to learn software',
          'Syncs with the AI Call & Support System out of the box',
        ],
      },
      {
        name: 'Field Ops Dashboard',
        tag: 'Internal tool',
        status: 'In development',
        features: [
          'Live job status and inventory on one screen',
          'Replaces a stack of spreadsheets field teams update by hand',
          'Built for slow signal, not just office wifi',
        ],
      },
      {
        name: 'Community Marketplace',
        tag: 'Mobile app',
        status: 'Concept',
        features: [
          'Connects local makers with buyers nearby',
          'Designed for spotty connectivity and low-end devices',
          'Payments, messaging, and listings in one lightweight app',
        ],
      },
    ],
  },
]
