import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { SiteConfig } from '@/lib/siteConfig';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Code, 
  Megaphone, 
  Save, 
  ChevronDown, 
  ChevronUp,
  Monitor,
  Smartphone,
  LayoutTemplate,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Maximize2,
  CheckCircle2,
  XCircle,
  Loader2,
  Cloud,
  CloudOff
} from 'lucide-react';
import { toast } from 'sonner';

interface AdsManagerProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  onSave: () => void;
  isSaving?: boolean;
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
}

// Google AdSense recommended banner sizes
const AD_BANNER_SIZES = {
  // Desktop banners
  leaderboard: { 
    width: 728, 
    height: 90, 
    name: 'Leaderboard', 
    nameAr: 'بانر أفقي كبير',
    icon: RectangleHorizontal,
    placement: 'Header, Top of Content',
    placementAr: 'الهيدر، أعلى المحتوى'
  },
  largeRectangle: { 
    width: 336, 
    height: 280, 
    name: 'Large Rectangle', 
    nameAr: 'مستطيل كبير',
    icon: Square,
    placement: 'Sidebar, In-Content',
    placementAr: 'الشريط الجانبي، داخل المحتوى'
  },
  mediumRectangle: { 
    width: 300, 
    height: 250, 
    name: 'Medium Rectangle', 
    nameAr: 'مستطيل متوسط',
    icon: Square,
    placement: 'Sidebar, In-Content',
    placementAr: 'الشريط الجانبي، داخل المحتوى'
  },
  wideSkyscraper: { 
    width: 160, 
    height: 600, 
    name: 'Wide Skyscraper', 
    nameAr: 'برج عريض',
    icon: RectangleVertical,
    placement: 'Sidebar Fixed',
    placementAr: 'الشريط الجانبي الثابت'
  },
  skyscraper: { 
    width: 120, 
    height: 600, 
    name: 'Skyscraper', 
    nameAr: 'برج',
    icon: RectangleVertical,
    placement: 'Sidebar',
    placementAr: 'الشريط الجانبي'
  },
  largeBanner: { 
    width: 970, 
    height: 90, 
    name: 'Large Banner', 
    nameAr: 'بانر عريض',
    icon: RectangleHorizontal,
    placement: 'Header on large screens',
    placementAr: 'الهيدر على الشاشات الكبيرة'
  },
  billboard: { 
    width: 970, 
    height: 250, 
    name: 'Billboard', 
    nameAr: 'لوحة إعلانية',
    icon: Maximize2,
    placement: 'Top of page, Between sections',
    placementAr: 'أعلى الصفحة، بين الأقسام'
  },
  // Mobile banners
  mobileBanner: { 
    width: 320, 
    height: 50, 
    name: 'Mobile Banner', 
    nameAr: 'بانر موبايل',
    icon: Smartphone,
    placement: 'Mobile Header/Footer',
    placementAr: 'هيدر/فوتر الموبايل'
  },
  largeMobileBanner: { 
    width: 320, 
    height: 100, 
    name: 'Large Mobile Banner', 
    nameAr: 'بانر موبايل كبير',
    icon: Smartphone,
    placement: 'Mobile In-Content',
    placementAr: 'داخل محتوى الموبايل'
  },
};

// Ad slot configuration
const AD_SLOTS = [
  { 
    id: 'header', 
    name: 'Header Ad', 
    nameAr: 'إعلان الهيدر',
    description: 'Appears below the navigation bar',
    descriptionAr: 'يظهر أسفل شريط التنقل',
    recommendedSize: 'leaderboard',
    icon: LayoutTemplate,
    color: 'text-blue-500'
  },
  { 
    id: 'sidebar', 
    name: 'Sidebar Ad', 
    nameAr: 'إعلان الشريط الجانبي',
    description: 'Appears on the side of content',
    descriptionAr: 'يظهر بجانب المحتوى',
    recommendedSize: 'mediumRectangle',
    icon: RectangleVertical,
    color: 'text-purple-500'
  },
  { 
    id: 'footer', 
    name: 'Footer Ad', 
    nameAr: 'إعلان الفوتر',
    description: 'Appears above the footer',
    descriptionAr: 'يظهر فوق الفوتر',
    recommendedSize: 'leaderboard',
    icon: RectangleHorizontal,
    color: 'text-green-500'
  },
  { 
    id: 'inContent', 
    name: 'In-Content Ad', 
    nameAr: 'إعلان داخل المحتوى',
    description: 'Appears within tool pages',
    descriptionAr: 'يظهر داخل صفحات الأدوات',
    recommendedSize: 'largeRectangle',
    icon: Square,
    color: 'text-orange-500'
  },
  { 
    id: 'betweenSections', 
    name: 'Between Sections Ad', 
    nameAr: 'إعلان بين الأقسام',
    description: 'Appears between homepage sections',
    descriptionAr: 'يظهر بين أقسام الصفحة الرئيسية',
    recommendedSize: 'billboard',
    icon: Maximize2,
    color: 'text-cyan-500'
  },
  { 
    id: 'mobileTop', 
    name: 'Mobile Top Ad', 
    nameAr: 'إعلان أعلى الموبايل',
    description: 'Appears at top on mobile devices',
    descriptionAr: 'يظهر في الأعلى على الموبايل',
    recommendedSize: 'mobileBanner',
    icon: Smartphone,
    color: 'text-pink-500'
  },
];

export function AdsManager({ config, setConfig, onSave, isSaving = false, saveStatus = 'idle' }: AdsManagerProps) {
  const { isRTL } = useLanguage();
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  // Get selected size for a slot
  const getSlotSize = (slotId: string): string => {
    const slotData = (config.ads as any)[`${slotId}Ad`];
    return slotData?.size || AD_SLOTS.find(s => s.id === slotId)?.recommendedSize || 'mediumRectangle';
  };

  // Update slot size
  const updateSlotSize = (slotId: string, size: string) => {
    setConfig(prev => {
      const newAds = { ...prev.ads };
      const key = `${slotId}Ad`;
      (newAds as any)[key] = { ...(newAds as any)[key], size };
      return { ...prev, ads: newAds };
    });
  };

  const getSlotConfig = (slotId: string) => {
    switch (slotId) {
      case 'header':
        return { code: config.ads.headerAd?.code || config.ads.headerAdCode || '', enabled: config.ads.headerAd?.enabled ?? false };
      case 'sidebar':
        return { code: config.ads.sidebarAd?.code || config.ads.sidebarAdCode || '', enabled: config.ads.sidebarAd?.enabled ?? false };
      case 'footer':
        return { code: config.ads.footerAd?.code || config.ads.footerAdCode || '', enabled: config.ads.footerAd?.enabled ?? false };
      case 'inContent':
        return { code: config.ads.inContentAd?.code || config.ads.inContentAdCode || '', enabled: config.ads.inContentAd?.enabled ?? false };
      case 'betweenSections':
        return { code: (config.ads as any).betweenSectionsAd?.code || '', enabled: (config.ads as any).betweenSectionsAd?.enabled ?? false };
      case 'mobileTop':
        return { code: (config.ads as any).mobileTopAd?.code || '', enabled: (config.ads as any).mobileTopAd?.enabled ?? false };
      default:
        return { code: '', enabled: false };
    }
  };

  const updateSlotConfig = (slotId: string, field: 'code' | 'enabled', value: string | boolean) => {
    setConfig(prev => {
      const newAds = { ...prev.ads };
      
      switch (slotId) {
        case 'header':
          newAds.headerAd = { ...newAds.headerAd, [field]: value };
          if (field === 'code') newAds.headerAdCode = value as string;
          break;
        case 'sidebar':
          newAds.sidebarAd = { ...newAds.sidebarAd, [field]: value };
          if (field === 'code') newAds.sidebarAdCode = value as string;
          break;
        case 'footer':
          newAds.footerAd = { ...newAds.footerAd, [field]: value };
          if (field === 'code') newAds.footerAdCode = value as string;
          break;
        case 'inContent':
          newAds.inContentAd = { ...newAds.inContentAd, [field]: value };
          if (field === 'code') newAds.inContentAdCode = value as string;
          break;
        case 'betweenSections':
          (newAds as any).betweenSectionsAd = { ...(newAds as any).betweenSectionsAd, [field]: value };
          break;
        case 'mobileTop':
          (newAds as any).mobileTopAd = { ...(newAds as any).mobileTopAd, [field]: value };
          break;
      }
      
      return { ...prev, ads: newAds };
    });
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
        enabled ? 'bg-green-500' : 'bg-muted'
      }`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
        enabled ? 'translate-x-7' : 'translate-x-1'
      }`} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'نظام إدارة الإعلانات المتقدم' : 'Advanced Ads Management'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL 
              ? 'قم بتكوين أماكن الإعلانات مع أحجام Google الموصى بها'
              : 'Configure ad placements with Google recommended sizes'}
          </p>
        </div>
        <Button onClick={onSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saveStatus === 'saved' ? (
            <Cloud className="w-4 h-4 text-green-500" />
          ) : saveStatus === 'error' ? (
            <CloudOff className="w-4 h-4 text-red-500" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving 
            ? (isRTL ? 'جاري الحفظ...' : 'Saving...') 
            : saveStatus === 'saved'
              ? (isRTL ? 'تم الحفظ للموقع كله ✓' : 'Saved to Cloud ✓')
              : (isRTL ? 'حفظ للموقع كله' : 'Save to Cloud')}
        </Button>
      </div>

      {/* Google AdSense Primary */}
      <div className="glass-card rounded-2xl p-6 border-2 border-primary/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Google AdSense
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'المزود الأساسي للإعلانات' : 'Primary Ad Provider'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${config.ads.googleAdsenseEnabled ? 'text-green-500' : 'text-muted-foreground'}`}>
              {config.ads.googleAdsenseEnabled 
                ? (isRTL ? 'مفعّل' : 'Enabled') 
                : (isRTL ? 'معطّل' : 'Disabled')}
            </span>
            <ToggleSwitch 
              enabled={config.ads.googleAdsenseEnabled}
              onToggle={() => setConfig(prev => ({
                ...prev,
                ads: { ...prev.ads, googleAdsenseEnabled: !prev.ads.googleAdsenseEnabled }
              }))}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>{isRTL ? 'معرف العميل (Client ID)' : 'Client ID'}</Label>
          <Input
            className="font-mono"
            placeholder="ca-pub-8664475420161580"
            value={config.ads.googleAdsenseClientId || ''}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              ads: { ...prev.ads, googleAdsenseClientId: e.target.value }
            }))}
          />
          <p className="text-xs text-muted-foreground">
            {isRTL 
              ? 'الصيغة: ca-pub-XXXXXXXXXXXXXXXX (16 رقم)'
              : 'Format: ca-pub-XXXXXXXXXXXXXXXX (16 digits)'}
          </p>
        </div>
      </div>

      {/* Adsterra Quick Toggles */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-secondary" />
          {isRTL ? 'إعلانات Adsterra' : 'Adsterra Ads'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <span className="font-medium text-foreground">
                {isRTL ? 'بانر أعلى الصفحة' : 'Top Banner'}
              </span>
              <p className="text-xs text-muted-foreground">728x90</p>
            </div>
            <div className="flex items-center gap-2">
              {config.ads.adsterraTopEnabled ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground" />
              )}
              <ToggleSwitch 
                enabled={config.ads.adsterraTopEnabled}
                onToggle={() => setConfig(prev => ({
                  ...prev,
                  ads: { ...prev.ads, adsterraTopEnabled: !prev.ads.adsterraTopEnabled }
                }))}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <span className="font-medium text-foreground">
                {isRTL ? 'الشريط الجانبي' : 'Sidebar'}
              </span>
              <p className="text-xs text-muted-foreground">300x250</p>
            </div>
            <div className="flex items-center gap-2">
              {config.ads.adsterraSidebarEnabled ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground" />
              )}
              <ToggleSwitch 
                enabled={config.ads.adsterraSidebarEnabled}
                onToggle={() => setConfig(prev => ({
                  ...prev,
                  ads: { ...prev.ads, adsterraSidebarEnabled: !prev.ads.adsterraSidebarEnabled }
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Banner Size Reference */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          {isRTL ? 'أحجام البانرات الموصى بها من Google' : 'Google Recommended Banner Sizes'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(AD_BANNER_SIZES).map(([key, size]) => {
            const Icon = size.icon;
            return (
              <div key={key} className="p-3 bg-muted/30 rounded-lg text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm text-foreground">
                  {isRTL ? size.nameAr : size.name}
                </p>
                <p className="text-xs text-primary font-mono">{size.width}x{size.height}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isRTL ? size.placementAr : size.placement}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Ad Slots */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">
          {isRTL ? 'أماكن الإعلانات المخصصة' : 'Custom Ad Placements'}
        </h3>
        
        {AD_SLOTS.map((slot) => {
          const slotConfig = getSlotConfig(slot.id);
          const recommendedSize = AD_BANNER_SIZES[slot.recommendedSize as keyof typeof AD_BANNER_SIZES];
          const Icon = slot.icon;
          const isExpanded = expandedSlot === slot.id;
          
          return (
            <div 
              key={slot.id} 
              className={`glass-card rounded-2xl overflow-hidden transition-all ${
                slotConfig.enabled ? 'border-2 border-green-500/30' : ''
              }`}
            >
              {/* Slot Header */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setExpandedSlot(isExpanded ? null : slot.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted/50 ${slot.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground">
                        {isRTL ? slot.nameAr : slot.name}
                      </h4>
                      {slotConfig.code && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {isRTL ? 'يحتوي كود' : 'Has Code'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? slot.descriptionAr : slot.description} • 
                      <span className="font-mono text-xs ms-1">
                        {recommendedSize.width}x{recommendedSize.height}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className={`text-xs font-medium ${slotConfig.enabled ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {slotConfig.enabled ? (isRTL ? 'مفعّل' : 'ON') : (isRTL ? 'معطّل' : 'OFF')}
                    </span>
                    <ToggleSwitch 
                      enabled={slotConfig.enabled}
                      onToggle={() => updateSlotConfig(slot.id, 'enabled', !slotConfig.enabled)}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {/* Slot Details */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-border">
                  <div className="mt-4 space-y-4">
                    {/* Size Selector */}
                    <div className="space-y-2">
                      <Label>{isRTL ? 'اختر حجم الإعلان' : 'Select Ad Size'}</Label>
                      <Select
                        value={getSlotSize(slot.id)}
                        onValueChange={(value) => updateSlotSize(slot.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={isRTL ? 'اختر الحجم' : 'Select size'} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(AD_BANNER_SIZES).map(([key, size]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-primary">
                                  {size.width}x{size.height}
                                </span>
                                <span>-</span>
                                <span>{isRTL ? size.nameAr : size.name}</span>
                                {key === slot.recommendedSize && (
                                  <span className="text-xs text-green-500 ms-1">
                                    ({isRTL ? 'موصى به' : 'Recommended'})
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {isRTL 
                          ? `الحجم المحدد: ${AD_BANNER_SIZES[getSlotSize(slot.id) as keyof typeof AD_BANNER_SIZES]?.width || recommendedSize.width}x${AD_BANNER_SIZES[getSlotSize(slot.id) as keyof typeof AD_BANNER_SIZES]?.height || recommendedSize.height}`
                          : `Selected size: ${AD_BANNER_SIZES[getSlotSize(slot.id) as keyof typeof AD_BANNER_SIZES]?.width || recommendedSize.width}x${AD_BANNER_SIZES[getSlotSize(slot.id) as keyof typeof AD_BANNER_SIZES]?.height || recommendedSize.height}`}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">
                        {isRTL ? 'كود الإعلان' : 'Ad Code'}
                      </Label>
                      <Textarea
                        rows={6}
                        className="font-mono text-sm"
                        placeholder={isRTL 
                          ? '<!-- الصق كود الإعلان هنا -->' 
                          : '<!-- Paste your ad code here -->'}
                        value={slotConfig.code}
                        onChange={(e) => updateSlotConfig(slot.id, 'code', e.target.value)}
                      />
                    </div>
                    
                    {slotConfig.code && (
                      <div className="flex items-center gap-2 text-sm text-green-500">
                        <CheckCircle2 className="w-4 h-4" />
                        {isRTL ? 'تم إضافة كود الإعلان بنجاح' : 'Ad code added successfully'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="text-lg font-bold text-foreground mb-3">
          💡 {isRTL ? 'نصائح لتحسين الإعلانات' : 'Ad Optimization Tips'}
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            {isRTL 
              ? 'استخدم حجم 300x250 للشريط الجانبي - الأكثر شيوعاً وأعلى أداء'
              : 'Use 300x250 for sidebar - most common and highest performing'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            {isRTL 
              ? 'بانر 728x90 مثالي للهيدر على سطح المكتب'
              : '728x90 leaderboard is ideal for desktop headers'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            {isRTL 
              ? 'استخدم 320x50 أو 320x100 للموبايل فقط'
              : 'Use 320x50 or 320x100 for mobile only'}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            {isRTL 
              ? 'لا تضع أكثر من 3 إعلانات في الصفحة الواحدة'
              : "Don't place more than 3 ads per page"}
          </li>
        </ul>
      </div>
    </div>
  );
}
