export interface Orphanage {
  id: string;
  name: string;
  city: string;
  address: string;
  capacity: number;
  description: string;
  contactPerson: string;
}

export interface VisitRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  orphanageId: string;
  orphanageName: string;
  visitorCount: number;
  purpose: 'gifts' | 'meal' | 'teaching' | 'general';
  notes?: string;
  registeredAt: string;
  status: 'pending' | 'confirmed';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  isAnonymous: boolean;
  frequency: 'once' | 'monthly' | 'yearly';
  program: 'orphan' | 'food' | 'education' | 'medical' | 'general';
  donatedAt: string;
  paymentMethod: string;
}
