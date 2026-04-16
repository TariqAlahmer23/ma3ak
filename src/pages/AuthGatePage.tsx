import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useAppStore } from '@/store/useAppStore';

export function AuthGatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authGate = useAppStore((s) => s.authGate);
  const loginMock = useAppStore((s) => s.loginMock);
  const closeAuthGate = useAppStore((s) => s.closeAuthGate);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('1111');

  const submit = () => {
    if (!phone || !code) return;
    loginMock();
    const redirect = authGate?.redirectTo ?? '/home';
    closeAuthGate();
    navigate(redirect);
  };

  return (
    <BottomSheet open onClose={() => navigate(-1)} title={t('loginToContinue')}>
      <p className="mb-4 text-sm text-muted">{t('otpHint')}</p>
      <div className="space-y-3">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t('phone')}
          className="premium-input w-full rounded-2xl px-3 py-2 text-sm"
        />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t('code')}
          className="premium-input w-full rounded-2xl px-3 py-2 text-sm"
        />
        <button onClick={submit} className="premium-btn w-full rounded-2xl px-4 py-2 text-sm font-semibold">
          {t('verifyAndContinue')}
        </button>
      </div>
    </BottomSheet>
  );
}
