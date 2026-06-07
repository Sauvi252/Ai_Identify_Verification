
export type Page = 'home' | 'verification' | 'analytics' | 'contact' | 'help';

export interface NavLink {
  name: string;
  page: Page;
}

export interface VerificationResult {
  name: string;
  idNumber: string;
  dob: string;
  docType: string;
  fraudScore: number;
  isTampered: boolean;
  reasoning: string;
  status: 'Verified' | 'Rejected' | 'Manual Review';
}

export interface VerificationLog {
  id: string;
  timestamp: string;
  docType: string;
  status: 'Verified' | 'Rejected' | 'Manual Review';
  fraudScore: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface DashboardStats {
  totalVerified: number;
  fraudDetected: number;
  pendingReview: number;
  accuracyRate: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
