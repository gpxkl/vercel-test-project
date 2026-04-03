import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/authAPI';

interface BiometricPromptProps {
  onSuccess: (token: string, user: any) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

// Inline CSS for animation
const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1.1); }
    50% { opacity: 0.7; transform: scale(1.15); }
  }
`;

const BiometricPrompt: React.FC<BiometricPromptProps> = ({ onSuccess, onCancel, onError }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [biometricType, setBiometricType] = useState<'faceId' | 'touchId' | 'fingerprint'>('fingerprint'); // Simplified to fingerprint for now
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // In a real app, you'd detect the actual biometric type here.
    // For this prototype, we'll just assume fingerprint.
    setMessage('請使用您的指紋或面容進行驗證');
  }, []);

  const handleAuthenticate = async () => {
    setStatus('scanning');
    setMessage('掃描中...');
    try {
      const response = await authAPI.biometricAuthenticate();
      if (response.success && response.data) {
        setStatus('success');
        setMessage('驗證成功！');
        setTimeout(() => onSuccess(response.data!.token, response.data!.user), 500);
      } else {
        setStatus('failed');
        setMessage(response.error || '驗證失敗，請重試');
        onError(response.error || '生物識別驗證失敗');
      }
    } catch (err: any) {
      setStatus('failed');
      setMessage(err.message || '發生錯誤，請重試');
      onError(err.message || '生物識別驗證發生錯誤');
    }
  };

  let iconComponent;
  let iconCircleStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px auto',
    transition: 'all 0.3s ease-in-out',
  };
  let iconStyle: React.CSSProperties = { width: '80px', height: '80px', transition: 'all 0.3s ease-in-out' };

  switch (status) {
    case 'idle':
      iconComponent = <i className="lucide lucide-fingerprint" style={{ ...iconStyle, color: 'var(--foreground)' }}></i>;
      iconCircleStyle.backgroundColor = 'rgba(0,0,0,0.05)';
      break;
    case 'scanning':
      iconComponent = <i className="lucide lucide-fingerprint" style={{ ...iconStyle, color: 'var(--cis-primary-blue)' }}></i>;
      iconCircleStyle.backgroundColor = 'rgba(43, 125, 142, 0.1)';
      iconCircleStyle.animation = 'pulse 2s infinite';
      break;
    case 'success':
      iconComponent = <i className="lucide lucide-check-circle-2" style={{ ...iconStyle, color: 'var(--cis-green)' }}></i>;
      iconCircleStyle.backgroundColor = 'rgba(39, 112, 105, 0.1)';
      break;
    case 'failed':
      iconComponent = <i className="lucide lucide-x-circle" style={{ ...iconStyle, color: 'var(--cis-red)' }}></i>;
      iconCircleStyle.backgroundColor = 'rgba(165, 62, 55, 0.1)';
      break;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onCancel} // Click outside to cancel
    >
      <div
        className="w-full max-w-sm mx-4 flex flex-col"
        style={{
          borderRadius: '28px',
          backgroundColor: 'var(--white)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card
      >
        <div className="text-center"
          style={{
            padding: '48px 32px',
          }}>
          <div style={iconCircleStyle}>
            {iconComponent}
          </div>
          <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '8px' }}>
            {status === 'idle' && '生物識別驗證'}
            {status === 'scanning' && '正在驗證...'}
            {status === 'success' && '驗證成功'}
            {status === 'failed' && '驗證失敗'}
          </h3>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)', marginBottom: '32px' }}>
            {message}
          </p>
          <div className="flex flex-col" style={{ gap: '12px' }}>
            {status === 'scanning' ? (
              <button
                disabled
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(43,125,142,0.1)',
                  color: 'var(--cis-primary-blue)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                <i className="lucide lucide-loader-2 animate-spin" style={{ width: '20px', height: '20px' }}></i>
                <span>驗證中...</span>
              </button>
            ) : (
              <button
                onClick={handleAuthenticate}
                disabled={status === 'success'}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--cis-primary-blue)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  opacity: status === 'success' ? 0.7 : 1,
                }}
              >
                {status === 'failed' ? '重試' : '開始驗證'}
              </button>
            )}
            {status !== 'success' && (
              <button
                onClick={onCancel}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                取消
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{pulseAnimation}</style>
    </div>
  );
};

export default BiometricPrompt;
