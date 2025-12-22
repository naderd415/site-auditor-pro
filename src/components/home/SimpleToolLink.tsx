import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { LucideIcon } from 'lucide-react';

export interface ToolLinkItem {
  id: string;
  nameKey: string;
  icon: LucideIcon;
  href: string;
  color: 'cyan' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow';
}

interface SimpleToolLinkProps {
  tool: ToolLinkItem;
}

const colorClasses = {
  cyan: 'text-[hsl(180,100%,50%)] hover:text-[hsl(180,100%,60%)]',
  purple: 'text-[hsl(280,100%,60%)] hover:text-[hsl(280,100%,70%)]',
  green: 'text-[hsl(145,80%,50%)] hover:text-[hsl(145,80%,60%)]',
  pink: 'text-[hsl(330,100%,60%)] hover:text-[hsl(330,100%,70%)]',
  orange: 'text-[hsl(25,100%,55%)] hover:text-[hsl(25,100%,65%)]',
  yellow: 'text-[hsl(55,100%,55%)] hover:text-[hsl(55,100%,65%)]',
};

export function SimpleToolLink({ tool }: SimpleToolLinkProps) {
  const { t } = useLanguage();
  const IconComponent = tool.icon;
  const colorClass = colorClasses[tool.color];

  const getToolText = (key: string) => {
    const keys = key.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <Link 
      to={tool.href} 
      className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/50 group ${colorClass}`}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
        {getToolText(tool.nameKey)}
      </span>
    </Link>
  );
}
