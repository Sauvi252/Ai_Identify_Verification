
import { NavLink, DashboardStats, VerificationLog } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Identity Verification', page: 'verification' },
  { name: 'Fraud Analytics', page: 'analytics' },
  { name: 'Support', page: 'contact' },
];

export const MOCK_STATS: DashboardStats = {
  totalVerified: 12543,
  fraudDetected: 342,
  pendingReview: 15,
  accuracyRate: '99.8%'
};

export const RECENT_LOGS: VerificationLog[] = [
  { id: 'REQ-8823', timestamp: '2 mins ago', docType: 'Aadhaar Card', status: 'Verified', fraudScore: 2 },
  { id: 'REQ-8822', timestamp: '15 mins ago', docType: 'PAN Card', status: 'Rejected', fraudScore: 88 },
  { id: 'REQ-8821', timestamp: '1 hour ago', docType: 'Driving License', status: 'Verified', fraudScore: 5 },
  { id: 'REQ-8820', timestamp: '2 hours ago', docType: 'Aadhaar Card', status: 'Manual Review', fraudScore: 45 },
  { id: 'REQ-8819', timestamp: '3 hours ago', docType: 'Passport', status: 'Verified', fraudScore: 0 },
];
