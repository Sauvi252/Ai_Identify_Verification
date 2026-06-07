import { VerificationResult } from '../types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const createSyntheticResult = (base64Image: string): VerificationResult => {
  const isSuspicious = base64Image.length % 2 !== 0;
  return {
    name: 'Rahul Sharma',
    idNumber: isSuspicious ? 'XXXX-XXXX-8921' : 'XXXX-XXXX-8920',
    dob: '12/08/1998',
    docType: 'Aadhaar Card (Synthetic)',
    fraudScore: isSuspicious ? 88 : 12,
    isTampered: isSuspicious,
    reasoning: isSuspicious
      ? 'DEMO: High risk detected. The document contains synthetic anomalies and font inconsistencies.'
      : 'DEMO: Document appears consistent with expected identity verification patterns.',
    status: isSuspicious ? 'Rejected' : 'Verified'
  };
};

export const verifyDocument = async (base64Image: string): Promise<VerificationResult> => {
  if (!GEMINI_API_KEY) {
    return createSyntheticResult(base64Image);
  }

  // Real Gemini integration is not enabled in this browser demo.
  // A server-side implementation is required for production use.
  return createSyntheticResult(base64Image);
};

interface DemoChat {
  sendMessageStream: (options: { message: string }) => AsyncIterable<{ text: string }>;
}

export const createChat = (): DemoChat => {
  return {
    async *sendMessageStream({ message }) {
      const normalized = message.toLowerCase();
      let text = 'VeriSecure Demo Assistant is ready to help. Upload a document or ask about KYC and fraud detection.';

      if (normalized.includes('fraud') || normalized.includes('risk')) {
        text = 'This demo assistant explains how VeriSecure detects suspicious documents, fraud signals, and identity manipulation in a simulated environment.';
      } else if (normalized.includes('aadhar') || normalized.includes('aadhaar') || normalized.includes('pan')) {
        text = 'The demo uses synthetic rules for Aadhaar-like and PAN-like identity data, but it does not connect to UIDAI or any real government service.';
      }

      yield { text };
    }
  };
};
