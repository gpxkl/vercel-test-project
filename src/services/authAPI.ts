import { AuthUser } from '../contexts/AuthContext';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Simulate API delay
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  /**
   * Simulate checking for biometric support.
   * In a real app, this would interact with WebAuthn APIs.
   */
  checkBiometricSupport: async (): Promise<ApiResponse<boolean>> => {
    await simulateDelay(500);
    // For now, let's assume biometric is supported on modern devices.
    const isSupported = (window.PublicKeyCredential !== undefined);
    return { success: true, data: isSupported };
  },

  /**
   * Simulate sending an SMS verification code.
   */
  sendSMS: async (phoneNumber: string, countryCode: string): Promise<ApiResponse<{ devCode?: string }>> => {
    await simulateDelay();
    console.log(`Simulating SMS to ${countryCode} ${phoneNumber}`);
    // In a real scenario, a backend would send the code.
    // For development, we can return a dummy code.
    if (phoneNumber === '912345678') {
      return { success: true, data: { devCode: '123456' } }; // Example dev code
    }
    return { success: true, data: {} };
  },

  /**
   * Simulate logging in with phone number and verification code.
   */
  loginWithPhone: async (phoneNumber: string, countryCode: string, code: string): Promise<ApiResponse<{ token: string; user: AuthUser; requiresRegistration?: boolean }>> => {
    await simulateDelay();
    console.log(`Simulating phone login for ${countryCode} ${phoneNumber} with code ${code}`);

    if (code === '123456' && phoneNumber === '912345678') {
      // Simulate existing user
      const user: AuthUser = { id: 'user-123', username: 'testuser', displayName: 'Test User' };
      return { success: true, data: { token: 'mock-token-abc', user } };
    } else if (code === '111222' && phoneNumber === '999888777') {
      // Simulate new user, requiring registration
      return { success: true, data: { token: 'temp-token-xyz', user: { id: 'temp-user', username: 'temp-user' }, requiresRegistration: true } };
    } else if (code === '999999'){
      return { success: false, error: '驗證碼錯誤' };
    }
    return { success: false, error: '無效的電話號碼或驗證碼' };
  },

  /**
   * Simulate new user registration.
   */
  register: async (registerData: {
    phoneNumber: string;
    countryCode: string;
    verificationCode: string;
    username: string;
    displayName?: string;
    pin?: string;
  }): Promise<ApiResponse<{ token: string; user: AuthUser }>> => {
    await simulateDelay();
    console.log('Simulating registration:', registerData);

    if (registerData.username === 'taken') {
      return { success: false, error: '用戶名已被占用' };
    }

    const newUser: AuthUser = { id: 'new-user-' + Date.now(), username: registerData.username, displayName: registerData.displayName };
    return { success: true, data: { token: 'new-user-token', user: newUser } };
  },

  /**
   * Simulate resetting a PIN.
   */
  resetPin: async (phoneNumber: string, countryCode: string, newPin: string): Promise<ApiResponse<boolean>> => {
    await simulateDelay();
    console.log(`Simulating PIN reset for ${countryCode} ${phoneNumber} with new PIN ${newPin}`);
    if (newPin.length !== 6) {
      return { success: false, error: 'PIN 碼必須是 6 位數字' };
    }
    return { success: true, data: true };
  },

  /**
   * Simulate biometric login/registration.
   */
  biometricAuthenticate: async (): Promise<ApiResponse<{ token: string; user: AuthUser }>> => {
    await simulateDelay(1500);
    console.log('Simulating biometric authentication...');

    // Randomly succeed or fail for demo purposes
    if (Math.random() > 0.3) {
      const user: AuthUser = { id: 'bio-user-456', username: 'biometricuser', displayName: 'Biometric User' };
      return { success: true, data: { token: 'bio-token-xyz', user } };
    } else {
      return { success: false, error: '生物識別驗證失敗，請重試' };
    }
  },
};
