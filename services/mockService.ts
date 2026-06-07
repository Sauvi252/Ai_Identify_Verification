
import { VerificationResult } from '../types';

// SIMULATED AI SERVICE FOR STUDENT DEMO
// This file mimics what a real AI would do, using synthetic data to ensure privacy and safety.

export const simulateOCR = async (file: File): Promise<VerificationResult> => {
  return new Promise((resolve) => {
    // Simulate a 2-second processing delay
    setTimeout(() => {
        // SYNTHETIC DATA GENERATION
        // We generate data based on the file name length to allow users to see different outcomes (Verified vs Suspicious)
        
        const isSuspicious = file.name.length % 2 !== 0; // Simple rule: Odd filename length = Suspicious
        
        const syntheticData = {
            name: "Rahul Sharma",
            dob: "12/08/1998",
            idNumber: isSuspicious ? "XXXX-XXXX-8921" : "XXXX-XXXX-8920", // 8921 (Odd) vs 8920 (Even)
            docType: "Aadhaar Card (Synthetic)",
            fraudScore: isSuspicious ? 88 : 12, // High score if suspicious
            isTampered: isSuspicious,
            status: isSuspicious ? 'Rejected' : 'Verified',
            reasoning: isSuspicious 
                ? "DEMO: High Risk detected. The ID number format does not match the standard algorithm for this document type. Potential digital alteration observed." 
                : "DEMO: Low Risk. All security holograms and fonts match the standard reference database.",
        };

        resolve(syntheticData as VerificationResult);
    }, 2000);
  });
};
