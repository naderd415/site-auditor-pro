import { useLanguage } from '@/lib/i18n';

interface AdSpaceProps {
  type?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

export function AdSpace({ type = 'horizontal', className = '' }: AdSpaceProps) {
  const { t } = useLanguage();

  const typeClasses = {
    horizontal: 'ad-space-horizontal',
    vertical: 'ad-space-vertical',
    square: 'ad-space-square',
  };

  return (
    <div className={`${typeClasses[type]} ${className}`}>
      <span className="opacity-60">{t.ads.placeholder}</span>
    </div>
  );
}
