import { useLanguage } from '@/lib/i18n';
import { DynamicAdSlot } from '@/components/DynamicAdSlot';

interface AdSpaceProps {
  type?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

export function AdSpace({ type = 'horizontal', className = '' }: AdSpaceProps) {
  const { t } = useLanguage();

  // Map to dynamic slot types
  const slotMapping = {
    horizontal: 'header' as const,
    vertical: 'sidebar' as const,
    square: 'inContent' as const,
  };

  const typeClasses = {
    horizontal: 'ad-space-horizontal min-h-[90px]',
    vertical: 'ad-space-vertical min-h-[250px]',
    square: 'ad-space-square min-h-[250px]',
  };

  return (
    <div className={`w-full flex justify-center ${typeClasses[type]} ${className}`}>
      {/* Try to render dynamic ad first */}
      <DynamicAdSlot type={slotMapping[type]} className="w-full" />
    </div>
  );
}
