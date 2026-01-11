import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  category: 'image' | 'pdf' | 'text' | 'color' | 'calculator' | 'qr' | 'seo';
  href: string;
  color: 'cyan' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow';
}

interface ToolCardProps {
  tool: Tool;
}

const colorClasses = {
  cyan: {
    icon: 'tool-icon-cyan',
    text: 'text-neon-cyan',
  },
  purple: {
    icon: 'tool-icon-purple',
    text: 'text-neon-purple',
  },
  green: {
    icon: 'tool-icon-green',
    text: 'text-neon-green',
  },
  pink: {
    icon: 'tool-icon-pink',
    text: 'text-[hsl(330,100%,60%)]',
  },
  orange: {
    icon: 'tool-icon-orange',
    text: 'text-[hsl(25,100%,55%)]',
  },
  yellow: {
    icon: 'tool-icon-yellow',
    text: 'text-[hsl(45,100%,55%)]',
  },
};

export function ToolCard({ tool }: ToolCardProps) {
  const { t } = useLanguage();
  const IconComponent = tool.icon;
  const colors = colorClasses[tool.color];

  // Get tool name and description from translations
  const getToolText = (key: string) => {
    const keys = key.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <Link to={tool.href} className="tool-card block group">
      {/* Mobile: horizontal layout with icon + text side by side */}
      <div className="flex items-start gap-3 sm:block">
        <div className={`${colors.icon} relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 sm:mb-4`}>
          <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors relative z-10 text-sm sm:text-base">
            {getToolText(tool.nameKey)}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 relative z-10">
            {getToolText(tool.descriptionKey)}
          </p>
        </div>
      </div>
    </Link>
  );
}
