import React, { useState, useEffect } from 'react';
import { AuthStep, useAuth, AuthUser } from '../../contexts/AuthContext';
import { authAPI } from '../../services/authAPI';
import PhoneAuth from './PhoneAuth';
import PinPad from './PinPad';
import BiometricPrompt from './BiometricPrompt';

interface RegisterData {
  phoneNumber: string;
  countryCode: string;
  verificationCode: string;
}

const AuthView: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [step, setStep] = useState<AuthStep>('methods');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [biometricSupported, setBiometricSupported] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const [forgotPhone, setForgotPhone] = useState<string>('');
  const [forgotCountryCode, setForgotCountryCode] = useState<string>('+886');
  const [forgotVerificationCode, setForgotVerificationCode] = useState<string>('');

  const [username, setUsername] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [pinToSet, setPinToSet] = useState<string | null>(null);

  // Check biometric support on component mount
  useEffect(() => {
    const checkSupport = async () => {
      const response = await authAPI.checkBiometricSupport();
      if (response.success && response.data) {
        setBiometricSupported(response.data);
      }
    };
    checkSupport();
  }, []);

  const handleLoginSuccess = (token: string, user: AuthUser) => {
    login(token, user);
    setLoading(false);
    setError('');
    // Optionally redirect or close AuthView
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate Google OAuth flow
      const mockUser: AuthUser = { id: 'google-user', username: 'googleuser', displayName: 'Google User' };
      handleLoginSuccess('google-mock-token', mockUser);
    } catch (err: any) {
      setError(err.message || 'Google 登入失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate Apple OAuth flow
      const mockUser: AuthUser = { id: 'apple-user', username: 'appleuser', displayName: 'Apple User' };
      handleLoginSuccess('apple-mock-token', mockUser);
    } catch (err: any) {
      setError(err.message || 'Apple 登入失敗');
    } finally {
      setLoading(false);
    }
  };

  // Modified to trigger BiometricPrompt modal
  const handleBiometricLoginClick = () => {
    setStep('biometric');
    setError('');
  };

  const handleBiometricPromptSuccess = (token: string, user: AuthUser) => {
    handleLoginSuccess(token, user);
    setStep('methods'); // Go back to methods or main app
  };

  const handleBiometricPromptCancel = () => {
    setStep('methods');
    setError('');
  };

  const handleBiometricPromptError = (message: string) => {
    setError(message);
    setStep('methods'); // Go back to methods to show error
  };

  const handlePhoneAuthSuccess = (token: string, user: AuthUser, phoneNumber: string, countryCode: string, verificationCode: string) => {
    if (step === 'forgot-verify') {
      setForgotVerificationCode(verificationCode);
      setStep('forgot-reset');
    } else {
      handleLoginSuccess(token, user);
    }
  };

  const handlePhoneAuthNeedRegister = (phoneNumber: string, countryCode: string, verificationCode: string) => {
    setRegisterData({ phoneNumber, countryCode, verificationCode });
    setStep('register');
  };

  const handleForgotPhoneSubmit = (token: string, user: AuthUser, phoneNumber: string, countryCode: string, verificationCode: string) => {
    setForgotPhone(phoneNumber);
    setForgotCountryCode(countryCode);
    setStep('forgot-verify');
  };

  const handleRegisterSubmit = async () => {
    if (!registerData || !username) {
      setError('請填寫用戶名並完成手機驗證');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.register({
        ...registerData,
        username,
        displayName: displayName || undefined,
        pin: pinToSet || undefined,
      });

      if (response.success && response.data) {
        handleLoginSuccess(response.data.token, response.data.user);
        // Clear registration data
        setRegisterData(null);
        setUsername('');
        setDisplayName('');
        setPinToSet(null);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message || '註冊失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPinComplete = async (newPin: string) => {
    if (!forgotPhone || !forgotCountryCode || !forgotVerificationCode) {
      setError('遺失忘記密碼流程資訊，請重新開始');
      setStep('methods'); // Go back to start
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.resetPin(forgotPhone, forgotCountryCode, newPin);
      if (response.success) {
        setError('PIN 碼已成功重置！');
        // Optionally, log the user in directly or ask them to log in again
        // For now, let's just go back to methods.
        setStep('methods');
        setForgotPhone('');
        setForgotCountryCode('+886');
        setForgotVerificationCode('');
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message || '重置 PIN 碼失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'var(--auth-bg)',
      }}
    >
      <div
        className="w-full max-w-md overflow-hidden flex flex-col"
        style={{
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)', // For Safari support
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo Section */}
        <div
          className="flex flex-col items-center justify-center"
          style={{
            padding: '64px 32px 32px 32px',
          }}
        >
          {/* Logo Box */}
          <div
            className="flex items-center justify-center"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '16px',
              backgroundColor: 'var(--cis-primary-blue)',
              boxShadow: '0 4px 16px rgba(43, 125, 142, 0.12)',
            }}
          >
            <i
              className="lucide lucide-message-square"
              style={{
                width: '64px',
                height: '64px',
                color: 'var(--white)',
              }}
            ></i>
          </div>

          {/* Title Wrap */}
          <div
            className="flex flex-col items-center"
            style={{
              paddingTop: '32px',
              gap: '6px',
            }}
          >
            <h1
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                letterSpacing: '-0.5px',
              }}
            >
              GP AI CHATOR
            </h1>
            <p
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.5',
              }}
            >
              你我的對話，引領時代的共鳴
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 flex flex-col"
          style={{
            padding: '0 24px 32px 24px',
            gap: '12px',
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(165, 62, 55, 0.08)',
                color: 'var(--cis-red)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <i className="lucide lucide-triangle-alert" style={{ width: '16px', height: '16px' }}></i>
              <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>{error}</p>
            </div>
          )}

          {step === 'methods' && (
            <div className="flex flex-col" style={{ gap: '24px' }}>
              {/* Phone Login Btn */}
              <button
                onClick={() => setStep('phone')}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--cis-primary-blue)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '-0.2px',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <i className="lucide lucide-smartphone" style={{ width: '20px', height: '20px', opacity: 0.95 }}></i>
                <span style={{ flex: 1, textAlign: 'left' }}>手機號碼登入</span>
              </button>

              {/* Divider */}
              <div className="flex items-center" style={{ gap: '12px', padding: '16px 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }}></div>
                <span style={{ fontSize: 'var(--text-label)', color: 'var(--muted-foreground)' }}>或使用</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.08)' }}></div>
              </div>

              {/* Google Login Btn */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '-0.2px',
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'var(--font-weight-bold)', color: '#4285F4' }}>G</span>
                <span style={{ flex: 1, textAlign: 'left' }}>使用 Google 繼續</span>
              </button>

              {/* Apple Login Btn */}
              <button
                onClick={handleAppleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--black)',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '-0.2px', // Normalize letterSpacing
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <i className="lucide lucide-apple" style={{ width: '20px', height: '20px' }}></i>
                <span style={{ flex: 1, textAlign: 'left' }}>使用 Apple 繼續</span>
              </button>

              {/* Biometric Login Btn (Conditional) */}
              {biometricSupported && (
                <button
                  onClick={handleBiometricLoginClick}
                  disabled={loading}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 20px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(43,125,142,0.06)',
                    border: '0.5px solid rgba(43,125,142,0.2)',
                    color: 'var(--cis-primary-blue)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    letterSpacing: '-0.2px',
                    transition: 'all 0.15s ease-in-out',
                    cursor: 'pointer',
                  }}
                >
                  <i className="lucide lucide-fingerprint" style={{ width: '20px', height: '20px' }}></i>
                  <span style={{ flex: 1, textAlign: 'left' }}>使用生物識別</span>
                </button>
              )}

              {/* Security Notice */}
              <div
                style={{
                  marginTop: '24px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(39, 112, 105, 0.04)',
                  border: '0.5px solid rgba(39, 112, 105, 0.1)',
                }}
              >
                <i className="lucide lucide-shield" style={{ width: '16px', height: '16px', color: 'var(--cis-green)', opacity: 0.7, marginTop: '2px' }}></i>
                <p
                  style={{
                    fontSize: 'var(--text-label)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--muted-foreground)',
                    lineHeight: '1.4',
                    flex: 1,
                  }}
                >
                  您的資料受到端對端加密保護，我們不會儲存您的密碼
                </p>
              </div>

              {/* Forgot password link */}
              <button
                onClick={() => setStep('forgot-phone')}
                className="w-full text-center"
                style={{
                  marginTop: '12px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--cis-primary-blue)',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: '8px',
                }}
              >
                忘記密碼？
              </button>
            </div>
          )}

          {(step === 'phone' || step === 'forgot-phone') && (
            <PhoneAuth
              onSuccess={step === 'phone' ? handlePhoneAuthSuccess : handleForgotPhoneSubmit}
              onNeedRegister={handlePhoneAuthNeedRegister}
              onBack={() => setStep('methods')}
              mode={step === 'forgot-phone' ? 'forgot' : 'login'}
              initialPhoneNumber={step === 'forgot-phone' ? forgotPhone : ''}
              initialCountryCode={step === 'forgot-phone' ? forgotCountryCode : '+886'}
            />
          )}

          {step === 'forgot-verify' && (
            <PhoneAuth
              onSuccess={handlePhoneAuthSuccess} // This will transition to forgot-reset
              onNeedRegister={handlePhoneAuthNeedRegister} // Should not be called in forgot flow
              onBack={() => setStep('forgot-phone')}
              mode='forgot'
              initialPhoneNumber={forgotPhone}
              initialCountryCode={forgotCountryCode}
            />
          )}

          {step === 'register' && registerData && (
            <div className="flex flex-col" style={{ gap: '24px' }}>
              <div className="text-center">
                <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>完成註冊</h3>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>手機號碼：{registerData.countryCode} {registerData.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}</p>
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="usernameInput" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '8px', display: 'block' }}>用戶名 *</label>
                <input
                  type="text"
                  id="usernameInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="請輸入用戶名"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--input-background)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              {/* Display Name Field */}
              <div>
                <label htmlFor="displayNameInput" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', marginBottom: '8px', display: 'block' }}>顯示名稱（可選）</label>
                <input
                  type="text"
                  id="displayNameInput"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="請輸入顯示名稱"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--input-background)',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              {/* PIN Setup Card */}
              <div
                onClick={() => setStep('pin')}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(43,125,142,0.05)',
                  border: '1px solid var(--cis-primary-blue)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                <div className="flex items-center" style={{ gap: '12px' }}>
                  <i className="lucide lucide-lock" style={{ width: '20px', height: '20px', color: 'var(--cis-primary-blue)' }}></i>
                  <div className="flex flex-col">
                    <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>設置 PIN 碼（推薦）</span>
                    <span style={{ fontSize: 'var(--text-label)', color: 'var(--muted-foreground)' }}>{pinToSet ? '已設置 ✓' : '快速登入您的帳號'}</span>
                  </div>
                </div>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--cis-primary-blue)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    cursor: 'pointer',
                  }}
                >
                  {pinToSet ? '重新設置' : '設置'}
                </button>
              </div>

              {/* Error Alert (same as main error) */}
              {error && (
                <div
                  style={{
                    backgroundColor: 'rgba(165, 62, 55, 0.08)',
                    color: 'var(--cis-red)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <i className="lucide lucide-triangle-alert" style={{ width: '16px', height: '16px' }}></i>
                  <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>{error}</p>
                </div>
              )}

              {/* Back Btn */}
              <button
                onClick={() => setStep('phone')}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--cis-primary-blue)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <i className="lucide lucide-arrow-left" style={{ width: '20px', height: '20px' }}></i>
                <span style={{ flex: 1, textAlign: 'center' }}>返回手機號碼驗證</span>
              </button>

              {/* Submit Btn */}
              <button
                onClick={handleRegisterSubmit}
                disabled={loading || !username}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--cis-green)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.15s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                {loading ? <i className="lucide lucide-loader-2 animate-spin" style={{ width: '20px', height: '20px' }}></i> : <i className="lucide lucide-check-circle-2" style={{ width: '20px', height: '20px' }}></i>}
                <span style={{ flex: 1, textAlign: 'center' }}>完成註冊</span>
              </button>
            </div>
          )}

          {step === 'pin' && (
            <PinPad
              mode='set'
              onComplete={(pin) => {
                setPinToSet(pin);
                setStep('register');
              }}
              onCancel={() => setStep('register')}
            />
          )}

          {step === 'forgot-reset' && (
            <PinPad
              mode='reset'
              onComplete={handleResetPinComplete}
              onCancel={() => setStep('methods')}
            />
          )}

        </div>

        {/* Footer */}
        <div
          className="flex flex-col items-center"
          style={{
            padding: '20px 32px',
            borderTop: '0.5px solid rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--muted-foreground)',
              textAlign: 'center',
              lineHeight: '1.4',
            }}
          >
            登入即表示您同意我們的 <a href="#" style={{ color: 'var(--cis-primary-blue)', textDecoration: 'none' }}>服務條款</a> 和 <a href="#" style={{ color: 'var(--cis-primary-blue)', textDecoration: 'none' }}>隱私政策</a>
          </p>
        </div>
      </div>

      {step === 'biometric' && (
        <BiometricPrompt
          onSuccess={handleBiometricPromptSuccess}
          onCancel={handleBiometricPromptCancel}
          onError={handleBiometricPromptError}
        />
      )}
    </div>
  );
};

export default AuthView;
