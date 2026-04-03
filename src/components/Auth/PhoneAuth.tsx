import React, { useState, useEffect, useRef } from 'react';
import { authAPI } from '../../services/authAPI';

interface PhoneAuthProps {
  onSuccess: (token: string, user: any, phoneNumber: string, countryCode: string, verificationCode: string) => void;
  onNeedRegister: (phoneNumber: string, countryCode: string, verificationCode: string) => void;
  onBack?: () => void; // Optional back button handler, used for forgot password flow
  initialPhoneNumber?: string;
  initialCountryCode?: string;
  mode?: 'login' | 'forgot';
}

const RESEND_TIMER_SECONDS = 60;

const PhoneAuth: React.FC<PhoneAuthProps> = ({
  onSuccess,
  onNeedRegister,
  onBack,
  initialPhoneNumber = '',
  initialCountryCode = '+886',
  mode = 'login',
}) => {
  const [step, setStep] = useState<'phone' | 'code'>(initialPhoneNumber ? 'code' : 'phone');
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  const [countryCode, setCountryCode] = useState<string>(initialCountryCode);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [devCode, setDevCode] = useState<string | null>(null); // For displaying dev code in development

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(RESEND_TIMER_SECONDS);
  };

  const handleSendSMS = async () => {
    setError('');
    if (!phoneNumber) {
      setError('請輸入手機號碼');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.sendSMS(phoneNumber, countryCode);
      if (response.success) {
        setDevCode(response.data?.devCode || null);
        startCountdown();
        setStep('code');
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err: any) {
      setError(err.message || '發送驗證碼失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    if (verificationCode.length !== 6) {
      setError('請輸入完整的6位驗證碼');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await authAPI.loginWithPhone(phoneNumber, countryCode, verificationCode);
        if (response.success && response.data) {
          if (response.data.requiresRegistration) {
            onNeedRegister(phoneNumber, countryCode, verificationCode);
          } else {
            onSuccess(response.data.token, response.data.user, phoneNumber, countryCode, verificationCode);
          }
        } else if (response.error) {
          setError(response.error);
        }
      } else if (mode === 'forgot') {
        // For forgot password flow, we would have a different API call here
        // Simulate success and transition to reset PIN step in AuthView
        onSuccess('', {}, phoneNumber, countryCode, verificationCode); // token and user are not relevant for this transition
      }
    } catch (err: any) {
      setError(err.message || '驗證失敗');
    } finally {
      setLoading(false);
    }
  };

  const displayPhoneNumber = `${countryCode} ${phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')}`;

  return (
    <div className="flex flex-col" style={{ gap: '16px' }}>
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

      {step === 'phone' && (
        <>
          <label htmlFor="phoneNumberInput" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>手機號碼</label>
          <div className="flex" style={{ gap: '12px' }}>
            {/* Country Code Selector */}
            <div
              className="flex items-center" // Using a div to simulate select styling
              style={{
                width: '120px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--input-background)',
                border: '1px solid var(--border)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
              onClick={() => setError('國家代碼選擇功能尚未實作')}
            >
              <span>🇹🇼 {countryCode}</span>
              <i className="lucide lucide-chevron-down" style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)', marginLeft: 'auto' }}></i>
            </div>

            {/* Phone Input */}
            <div className="flex-1 relative">
              <i className="lucide lucide-smartphone"
                 style={{
                   position: 'absolute',
                   left: '16px',
                   top: '50%',
                   transform: 'translateY(-50%)',
                   width: '20px',
                   height: '20px',
                   color: 'var(--muted-foreground)',
                 }}></i>
              <input
                type="tel"
                id="phoneNumberInput"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="912 345 678"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--input-background)',
                  border: '1px solid var(--border)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--foreground)',
                }}
              />
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-regular)', color: 'var(--muted-foreground)' }}>我們將發送驗證碼到此號碼</p>

          {/* Submit Btn */}
          <button
            onClick={handleSendSMS}
            disabled={loading}
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
              marginTop: '16px',
            //   ":active": { transform: "scale(0.98)" },
            //   ":disabled": { opacity: 0.5 },
            }}
          >
            發送驗證碼
            {loading ? <i className="lucide lucide-loader-2 animate-spin" style={{ width: '20px', height: '20px' }}></i> : <i className="lucide lucide-arrow-right" style={{ width: '20px', height: '20px' }}></i>}
          </button>
        </>
      )}

      {step === 'code' && (
        <>
          {onBack && (
            <button
              onClick={() => {
                setStep('phone');
                onBack();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--cis-green)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                marginBottom: '8px',
              }}
            >
              <i className="lucide lucide-arrow-left" style={{ width: '16px', height: '16px' }}></i>
              {mode === 'login' ? '修改手機號碼' : '修改手機號碼'}
            </button>
          )}
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-regular)', color: 'var(--muted-foreground)', marginBottom: '16px' }}>
            已發送驗證碼到 {displayPhoneNumber}
          </p>

          <label htmlFor="verificationCodeInput" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>驗證碼</label>
          <input
            type="text"
            id="verificationCodeInput"
            value={verificationCode.replace(/\s/g, '').split('').join(' ')}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, '');
              if (value.length <= 6) {
                setVerificationCode(value);
              }
            }}
            maxLength={11} // 6 digits + 5 spaces
            placeholder="1 2 3 4 5 6"
            autoFocus
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              backgroundColor: 'var(--input-background)',
              border: `2px solid ${verificationCode.length === 6 ? 'var(--cis-green)' : 'var(--border)'}`,
              fontSize: 'var(--text-h3)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              textAlign: 'center',
              letterSpacing: '0.5em',
              // For development purposes, allow quick input
              // For production, consider using a separate input for each digit or careful masking.
            }}
          />
          {devCode && (
            <div
              style={{
                marginTop: '12px',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                border: '1px dashed #FFD700',
                color: '#DAA520',
                fontSize: 'var(--text-label)',
              }}
            >
              開發模式驗證碼: <strong>{devCode}</strong> (僅供測試)
            </div>
          )}

          <p style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-regular)', color: 'var(--muted-foreground)', textAlign: 'center', marginTop: '16px' }}>
            {countdown > 0 ? `${countdown} 秒後可重新發送` : (
              <button
                onClick={handleSendSMS}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--cis-primary-blue)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                重新發送驗證碼
              </button>
            )}
          </p>

          {/* Verify Btn */}
          <button
            onClick={handleVerifyCode}
            disabled={loading || verificationCode.length !== 6}
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
              marginTop: '16px',
            //   ":active": { transform: "scale(0.98)" },
            //   ":disabled": { opacity: 0.5 },
            }}
          >
            {mode === 'login' ? '驗證並登入' : '驗證並重置'}
            {loading ? <i className="lucide lucide-loader-2 animate-spin" style={{ width: '20px', height: '20px' }}></i> : <i className="lucide lucide-check-circle-2" style={{ width: '20px', height: '20px' }}></i>}
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneAuth;
