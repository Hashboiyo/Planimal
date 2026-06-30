import { Orphanage } from './types';

export const ORPHANAGES: Orphanage[] = [
  {
    id: 'lhr-partner-a',
    name: 'Al-Khidmat Lahore Partner Home',
    city: 'Lahore',
    address: 'Johar Town, Block G3, Lahore, Pakistan',
    capacity: 45,
    description: 'An existing registered partner home housing 35 orphans. Yaran-e-Fuqra supports their educational and nutritional requirements. Visited and verified by our volunteer team. Cost per visit is 1000 PKR per person.',
    contactPerson: 'Brother Tariq Mahmood'
  },
  {
    id: 'lhr-partner-b',
    name: 'Anjuman-e-Sulemania Partner Shelter',
    city: 'Lahore',
    address: 'DHA Phase 5, Block L, Lahore, Pakistan',
    capacity: 60,
    description: 'A dedicated partner sanctuary for underprivileged young boys and girls. Supported with monthly food distributions and Al-Ilm academic scholarships. Cost per visit is 1000 PKR per person.',
    contactPerson: 'Sister Amina Khan'
  },
  {
    id: 'lhr-partner-c',
    name: 'Dar-ul-Aman Lahore Partner Oasis',
    city: 'Lahore',
    address: 'Gulberg III, near Liberty Market, Lahore, Pakistan',
    capacity: 50,
    description: 'A verified local community partner facility caring for orphan children. Yaran-e-Fuqra supplies daily groceries and medical cabinets. Cost per visit is 1000 PKR per person.',
    contactPerson: 'Dr. Sarah Farooq'
  }
];

export const INITIATIVES = [
  {
    id: 'orphan-care',
    title: 'Support Existing Orphanages',
    tagline: 'Empowering local shelters with resources',
    description: 'We dream of supporting existing, registered local partner homes in Lahore, aiming to sponsor their daily expenses, clean bedding, and overall child development instead of running our own shelters.',
    iconName: 'HeartHandshake',
    metric: 'Partner Support',
    colorClass: 'text-rose-500 bg-rose-50/80 border-rose-100'
  },
  {
    id: 'food-distribution',
    title: 'Sustenance & Food Drives',
    tagline: 'Providing healthy food parcels to shelters',
    description: 'We dream to eradicate hunger by aiming to sponsor daily nutritious meals and distribute essential dry-ration kits directly to widow-led households and partner orphan homes across Lahore.',
    iconName: 'UtensilsCrossed',
    metric: 'Food Aid',
    colorClass: 'text-amber-500 bg-amber-50/80 border-amber-100'
  },
  {
    id: 'education',
    title: 'Al-Ilm Scholarships',
    tagline: 'Paying tuition and educational fees',
    description: 'We aim to cover student tuition fees, dream to purchase textbooks and uniforms, and hope to sponsor evening tutoring sessions for orphan children residing in local partner homes.',
    iconName: 'GraduationCap',
    metric: 'Scholarship',
    colorClass: 'text-emerald-500 bg-emerald-50/80 border-emerald-100'
  },
  {
    id: 'mission-goal',
    title: 'Our Mission Goal',
    tagline: 'Bridging the gap with verified transparency',
    description: 'Founded by 4 college friends, Yaran-e-Fuqra is dedicated to bridging the gap between donors and existing orphanages in Lahore. We aim to guarantee 100% transparent support for everyday local kids.',
    iconName: 'Target',
    metric: 'Mission Goal',
    colorClass: 'text-sky-500 bg-sky-50/80 border-sky-100'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Mariam Bibi',
    role: 'Mother of 3, Al-Ilm Beneficiary',
    quote: 'After my husband passed away, I did not know how to feed my children, let alone educate them. Yaran-e-Fuqra took my boys under their wing, funded their school fees, and provided monthly food parcels. My eldest is now entering college.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 't2',
    name: 'Zeeshan Ahmad',
    role: 'Corporate Sponsor & Regular Visitor',
    quote: 'Visiting the partner homes in Lahore opened my eyes. The children are so happy, respectful, and ambitious. The transparency in how they utilize every rupee is what makes them my preferred partner.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  }
];
