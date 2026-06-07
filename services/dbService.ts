
import { VerificationResult, VerificationLog, ContactMessage } from '../types';

// DEMO DATABASE SERVICE
// Simulates a secure backend database with encryption.

const DB_KEY = 'verisecure_demo_db';
const MSG_KEY = 'verisecure_messages';

// Simple demo encryption (Base64) - In production, use AES-256
const encrypt = (text: string): string => {
  try {
    return btoa(text);
  } catch (e) {
    return text;
  }
};

// Simple demo decryption
const decrypt = (cipher: string): string => {
  try {
    return atob(cipher);
  } catch (e) {
    return cipher;
  }
};

export const dbService = {
  saveRecord: async (result: VerificationResult): Promise<void> => {
    // 1. Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Encrypt Sensitive Data
    const encryptedRecord = {
      ...result,
      name: encrypt(result.name),
      idNumber: encrypt(result.idNumber),
      dob: encrypt(result.dob),
      timestamp: new Date().toISOString(),
      id: `REQ-${Math.floor(Math.random() * 10000)}` // Generate unique ID
    };

    // 3. Store in "Database" (LocalStorage)
    const currentData = await dbService.getAllRecords();
    const newData = [encryptedRecord, ...currentData].slice(0, 50); // Keep last 50
    localStorage.setItem(DB_KEY, JSON.stringify(newData));
  },

  getAllRecords: async (): Promise<any[]> => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  getRecentLogs: async (): Promise<VerificationLog[]> => {
    const records = await dbService.getAllRecords();
    
    return records.map(rec => ({
      id: rec.id,
      timestamp: new Date(rec.timestamp).toLocaleTimeString(),
      docType: rec.docType,
      status: rec.status,
      fraudScore: rec.fraudScore
    }));
  },

  saveContactMessage: async (msg: Omit<ContactMessage, 'timestamp'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const msgs = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
    msgs.push({ ...msg, timestamp: new Date().toISOString() });
    localStorage.setItem(MSG_KEY, JSON.stringify(msgs));
  }
};
