import React, { useState, useEffect } from 'react';

interface PinPadProps {
  length?: number;
  onComplete: (pin: string) => void;
  onCancel?: () => void;
  mode?: 'set' | 'confirm' | 'reset'; // 'set' for initial setup, 'confirm' to re-enter, 'reset' for forgot pin
  initialPin?: string; // Used in 'confirm' mode to check against
}

const NumpadButton: React.FC<{ value: string | number; onClick: (value: string) => void; disabled?: boolean; isDelete?: boolean; isCancel?: boolean }>
  = ({ value, onClick, disabled, isDelete, isCancel }) => (
  <button
    onClick={() => onClick(String(value))}
    disabled={disabled}
    style={{
      width: '80px',
      height: '80px',
      borderRadius: '16px',
      backgroundColor: isCancel ? 'rgba(0,0,0,0.08)' : 'var(--input-background)',
      border: isCancel ? 'none' : '1px solid var(--border)',
      fontSize: isDelete ? 'inherit' : 'var(--text-h2)',
      fontWeight: 'var(--font-weight-medium)',
      color: isCancel ? 'var(--foreground)' : 'var(--foreground)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      // ":hover": { backgroundColor: isCancel ? 'rgba(0,0,0,0.12)' : 'var(--cis-green)', color: isCancel ? 'inherit' : 'var(--white)' },
      // ":active": { transform: "scale(0.95)" },
      // ":disabled": { opacity: 0.5 },
    }}
  >
    {isDelete ? <i className="lucide lucide-delete" style={{ width: '24px', height: '24px' }}></i> : value}
  </button>
);

const PinPad: React.FC<PinPadProps> = ({
  length = 6,
  onComplete,
  onCancel,
  mode = 'set',
  initialPin = '',
}) => {
  const [pin, setPin] = useState<string>('');
  const [firstPin, setFirstPin] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    if (shake) {
      const timer = setTimeout(() => setShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  useEffect(() => {
    if (mode === 'confirm' && initialPin && !isConfirming) {
      setIsConfirming(true);
      setFirstPin(initialPin);
    } else if (mode === 'reset' && !isConfirming) {
      setIsConfirming(false);
      setFirstPin('');
    }
  }, [mode, initialPin, isConfirming]);

  const handlePinInput = (digit: string) => {
    if (pin.length < length) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === length) {
        setTimeout(() => {
          if (mode === 'set' || mode === 'reset') {
            setFirstPin(newPin);
            setIsConfirming(true);
            setPin(''); // Clear for confirmation
          } else if (mode === 'confirm') {
            if (newPin === firstPin) {
              onComplete(newPin);
            } else {
              setError('兩次輸入的 PIN 碼不一致');
              setShake(true);
              setPin('');
              setFirstPin(''); // Reset both for re-entry
              setIsConfirming(false);
              // For reset mode, we might want to go back to initial reset step
              // For now, let's just make it re-enter.
              if (mode === 'reset') {
                // If it's reset mode, and they fail confirmation, restart the reset process
                setError('PIN 碼不一致，請重新設定');
                setShake(true);
                setPin('');
                setFirstPin('');
                setIsConfirming(false);
              }
            }
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const handleCancel = () => {
    if (isConfirming && (mode === 'set' || mode === 'reset')) {
      setIsConfirming(false);
      setFirstPin('');
      setPin('');
      setError('');
    } else {
      onCancel?.();
    }
  };

  let title = '';
  let subtitle = '';
  if (mode === 'set') {
    title = isConfirming ? '確認 PIN 碼' : '設置 PIN 碼';
    subtitle = isConfirming ? '請再次輸入 PIN 碼以確認' : '請輸入新的 6 位數字 PIN 碼';
  } else if (mode === 'confirm') {
    title = '確認 PIN 碼';
    subtitle = '請輸入您的 6 位數字 PIN 碼';
  } else if (mode === 'reset') {
    title = isConfirming ? '確認新 PIN 碼' : '重置 PIN 碼';
    subtitle = isConfirming ? '請再次輸入新 PIN 碼以確認' : '請輸入新的 6 位數字 PIN 碼';
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
          {title}
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
          {subtitle}
        </p>
      </div>

      {/* PIN Dots */}
      <div className={`flex gap-3 mb-8 min-h-[60px] ${shake ? 'shake-animation' : ''}`}>
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${error ? 'var(--cis-red)' : (pin.length > i ? 'var(--cis-green)' : 'var(--border)')}`,
              backgroundColor: pin.length > i && !error ? 'var(--cis-green)' : 'var(--input-background)',
              transition: 'all 0.2s ease-in-out',
              transform: pin.length - 1 === i && !shake ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {pin.length > i && !error && (
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--white)',
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div
          style={{
            backgroundColor: 'rgba(165, 62, 55, 0.08)',
            color: 'var(--cis-red)',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            fontSize: 'var(--text-label)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          <i className="lucide lucide-info" style={{ width: '16px', height: '16px' }}></i>
          <span>{error}</span>
        </div>
      )}

      {/* Numpad Grid */}
      <div className="grid grid-cols-3 gap-4" style={{ maxWidth: '300px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <NumpadButton key={num} value={num} onClick={handlePinInput} disabled={loading} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4" style={{ maxWidth: '300px', marginTop: '16px' }}>
        {onCancel ? <NumpadButton value="取消" onClick={handleCancel} disabled={loading} isCancel /> : <div style={{width: '80px', height: '80px'}}></div> /* Spacer */}
        <NumpadButton value={0} onClick={handlePinInput} disabled={loading} />
        <NumpadButton value="delete" onClick={handleDelete} disabled={loading || pin.length === 0} isDelete />
      </div>

      {/* Inline style for shake animation (can be moved to CSS file) */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .shake-animation {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default PinPad;
