
import { verifyDocument } from './geminiService';
import { dbService } from './dbService';
import { VerificationResult, VerificationLog, ContactMessage } from '../types';

// API LAYER
// This module exposes the "Backend" functionality to the frontend.

export const api = {
  // AI Module: Document Verification
  verifyIdentity: async (base64Image: string): Promise<VerificationResult> => {
    // Call the AI Model
    return await verifyDocument(base64Image);
  },

  // Database Module: Store Results
  saveVerification: async (data: VerificationResult): Promise<void> => {
    // Save to secured DB
    await dbService.saveRecord(data);
  },

  checkAadhaarNumber: async (aadhaarNumber: string): Promise<{ status: VerificationResult['status']; fraudScore: number; message: string }> => {
    const normalized = aadhaarNumber.replace(/\D/g, '');

    if (normalized.length !== 12) {
      return {
        status: 'Rejected',
        fraudScore: 100,
        message: 'Invalid Aadhaar format. Aadhaar must contain exactly 12 digits.'
      };
    }

    if (/^(\d)\1{11}$/.test(normalized)) {
      return {
        status: 'Rejected',
        fraudScore: 95,
        message: 'This number appears to be a repeated or synthetic pattern, which is not valid in a real Aadhaar check.'
      };
    }

    if (/^[01]/.test(normalized)) {
      return {
        status: 'Rejected',
        fraudScore: 90,
        message: 'Valid Aadhaar numbers do not start with 0 or 1 in this demo dataset.'
      };
    }

    const digits = normalized.split('').map(Number);
    const sum = digits.reduce((total, digit) => total + digit, 0);
    const fraudScore = Math.min(90, Math.max(10, sum % 83 + 10));
    let status: VerificationResult['status'] = 'Verified';
    let message = 'The Aadhaar number format looks consistent with the demo validation rules.';

    if (fraudScore >= 70) {
      status = 'Rejected';
      message = 'Demo alert: This number has several risk signals and should be reviewed manually by an authorized verifier.';
    } else if (fraudScore >= 40) {
      status = 'Manual Review';
      message = 'Demo caution: This number is unusual and may require further investigation in a real system.';
    }

    return { status, fraudScore, message };
  },

  // Database Module: Fetch Analytics
  fetchRecentLogs: async (): Promise<VerificationLog[]> => {
    return await dbService.getRecentLogs();
  },

  // User Module: Contact Support
  submitContactForm: async (data: Omit<ContactMessage, 'timestamp'>): Promise<void> => {
    await dbService.saveContactMessage(data);
  }
};
