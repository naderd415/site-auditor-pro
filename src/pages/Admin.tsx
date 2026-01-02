import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Palette,
  Globe,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Lock,
  LogOut,
  Sun,
  Moon,
  Facebook,
  Twitter,
  Instagram,
  Code,
  Save,
  MapPin,
  Smartphone,
  Monitor,
  Download,
  ExternalLink,
  Image,
  Type,
  Megaphone,
  Linkedin,
  Youtube,
  Menu,
  X,
  RefreshCw,
  Snowflake
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { toast } from 'sonner';
import { 
  SiteConfig, 
  getConfig, 
  saveConfig as saveSiteConfig, 
  getStats, 
  downloadConfig,
  VisitorStats 
} from '@/lib/siteConfig';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => (
  <div className="glass-card p-4 sm:p-6 rounded-2xl">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{title}</p>
        <p className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">{value}</p>
        <p className={`text-xs sm:text-sm mt-2 flex items-center gap-1 ${
          changeType === 'positive' ? 'text-green-500' : 
          changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
        }`}>
          <TrendingUp className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{change}</span>
        </p>
      </div>
      <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
        {icon}
      </div>
    </div>
  </div>
);

interface ActivityItemProps {
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const ActivityItem = ({ action, time, status }: ActivityItemProps) => (
  <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
    <div className={`p-2 rounded-full ${
      status === 'success' ? 'bg-green-500/10 text-green-500' :
      status === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
      'bg-blue-500/10 text-blue-500'
    }`}>
      {status === 'success' ? <CheckCircle className="w-4 h-4" /> :
       status === 'warning' ? <AlertCircle className="w-4 h-4" /> :
       <Activity className="w-4 h-4" />}
    </div>
    <div className="flex-1">
      <p className="text-sm text-foreground">{action}</p>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {time}
      </p>
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground" />
  </div>
);

// Sidebar navigation items
const sidebarItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', labelAr: 'الرئيسية' },
  { id: 'content', icon: Type, label: 'Content', labelAr: 'المحتوى' },
  { id: 'ads', icon: Megaphone, label: 'Ads', labelAr: 'الإعلانات' },
  { id: 'seo', icon: Globe, label: 'SEO', labelAr: 'SEO' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics', labelAr: 'التحليلات' },
  { id: 'appearance', icon: Palette, label: 'Appearance', labelAr: 'المظهر' },
  { id: 'integrations', icon: Code, label: 'Integrations', labelAr: 'التكاملات' },
  { id: 'settings', icon: Settings, label: 'Settings', labelAr: 'الإعدادات' },
];

const Admin = () => {
  const { isRTL } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [config, setConfig] = useState<SiteConfig>(getConfig());
  const [stats, setStats] = useState<VisitorStats>(getStats());
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load config from localStorage
  useEffect(() => {
    const savedConfig = getConfig();
    setConfig(savedConfig);
    applyTheme(savedConfig.theme);
  }, []);

  // Refresh stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check auth on mount
  useEffect(() => {
    const authToken = sessionStorage.getItem('admin_auth');
    if (authToken) {
      const tokenData = JSON.parse(authToken);
      if (tokenData.expiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('admin_auth');
      }
    }
  }, []);

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedConfig = getConfig();
    if (password === storedConfig.adminPass) {
      const authToken = {
        authenticated: true,
        expiry: Date.now() + (60 * 60 * 1000)
      };
      sessionStorage.setItem('admin_auth', JSON.stringify(authToken));
      setIsAuthenticated(true);
      toast.success(isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login successful');
    } else {
      toast.error(isRTL ? 'كلمة المرور غير صحيحة' : 'Invalid password');
    }

    setIsLoading(false);
    setPassword('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    toast.success(isRTL ? 'تم تسجيل الخروج' : 'Logged out successfully');
  };

  const handleSaveConfig = () => {
    saveSiteConfig(config);
    applyTheme(config.theme);
    toast.success(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
  };

  const handleDownloadConfig = () => {
    downloadConfig(config);
    toast.success(isRTL ? 'تم تنزيل ملف الإعدادات' : 'Config file downloaded');
  };

  const updatePassword = () => {
    if (currentPassword === config.adminPass && newPassword.length >= 6) {
      const updatedConfig = { ...config, adminPass: newPassword };
      setConfig(updatedConfig);
      saveSiteConfig(updatedConfig);
      toast.success(isRTL ? 'تم تحديث كلمة المرور' : 'Password updated');
      setNewPassword('');
      setCurrentPassword('');
    } else {
      toast.error(isRTL ? 'كلمة المرور الحالية غير صحيحة أو كلمة المرور الجديدة قصيرة جداً' : 'Current password incorrect or new password too short');
    }
  };

  const openGoogleAnalytics = () => {
    window.open('https://analytics.google.com/', '_blank');
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{isRTL ? 'تسجيل الدخول | لوحة التحكم' : 'Login | Admin Dashboard'}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isRTL ? 'أدخل كلمة المرور للمتابعة' : 'Enter password to continue'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">
                    {isRTL ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="mt-2"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isRTL ? 'جاري التحقق...' : 'Verifying...'}
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 me-2" />
                      {isRTL ? 'دخول' : 'Login'}
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                {isRTL 
                  ? 'هذه المنطقة مخصصة للمسؤولين فقط'
                  : 'This area is for administrators only'}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Get top pages from stats
  const topPages = Object.entries(stats.pageViews || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Calculate device percentages
  const totalDevices = stats.devices?.reduce((sum, d) => sum + d.count, 0) || 1;
  const devicePercentages = stats.devices?.map(d => ({
    type: d.type,
    percentage: Math.round((d.count / totalDevices) * 100)
  })) || [];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'لوحة التحكم | BestToolsHub' : 'Admin Dashboard | BestToolsHub'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 start-0 z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen 
            ? 'translate-x-0 w-64' 
            : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}>
          <div className="h-full w-full glass-card rounded-none lg:rounded-e-2xl border-e border-border flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border flex items-center justify-between min-h-[64px]">
              {sidebarOpen && (
                <h1 className="font-bold text-xl text-foreground whitespace-nowrap">
                  {isRTL ? 'لوحة التحكم' : 'Admin'}
                </h1>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground flex-shrink-0"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium text-sm whitespace-nowrap">{isRTL ? item.labelAr : item.label}</span>
                  )}
                </button>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-border">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className={`w-full ${sidebarOpen ? '' : 'px-0 justify-center'}`}
              >
                <LogOut className="w-4 h-4" />
                {sidebarOpen && <span className="ms-2">{isRTL ? 'خروج' : 'Logout'}</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 overflow-auto">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="font-bold text-xl text-foreground">
              {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
            </h1>
            <div className="w-10" />
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'الرئيسية' : 'Dashboard'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setStats(getStats())} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">{isRTL ? 'تحديث' : 'Refresh'}</span>
                  </Button>
                  <Button onClick={openGoogleAnalytics} className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Google Analytics</span>
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card rounded-2xl p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('ads')}
                    className="gap-2"
                  >
                    <Megaphone className="w-4 h-4" />
                    {isRTL ? 'إدارة الإعلانات' : 'Manage Ads'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('seo')}
                    className="gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {isRTL ? 'إعدادات SEO' : 'SEO Settings'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('analytics')}
                    className="gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {isRTL ? 'التحليلات' : 'View Analytics'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('appearance')}
                    className="gap-2"
                  >
                    <Snowflake className="w-4 h-4" />
                    {isRTL ? 'وضع الاحتفالات' : 'Festive Mode'}
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title={isRTL ? 'إجمالي الزيارات' : 'Total Visits'}
                  value={stats.totalVisits.toLocaleString()}
                  change={isRTL ? 'زيارة حقيقية' : 'Real visits'}
                  changeType="positive"
                  icon={<Eye className="w-6 h-6" />}
                />
                <StatCard
                  title={isRTL ? 'زيارات اليوم' : "Today's Visits"}
                  value={stats.todayVisits.toLocaleString()}
                  change={isRTL ? 'اليوم' : 'Today'}
                  changeType="positive"
                  icon={<TrendingUp className="w-6 h-6" />}
                />
                <StatCard
                  title={isRTL ? 'الزوار الفريدون' : 'Unique Visitors'}
                  value={stats.uniqueVisitors.toLocaleString()}
                  change={isRTL ? 'متصفحات مختلفة' : 'Different browsers'}
                  changeType="neutral"
                  icon={<Users className="w-6 h-6" />}
                />
                <StatCard
                  title={isRTL ? 'الصفحات المعروضة' : 'Page Views'}
                  value={Object.values(stats.pageViews || {}).reduce((a, b) => a + b, 0).toLocaleString()}
                  change={isRTL ? 'إجمالي' : 'Total'}
                  changeType="positive"
                  icon={<FileText className="w-6 h-6" />}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hourly Traffic */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'الزيارات بالساعة' : 'Hourly Traffic'}
                  </h3>
                  <div className="flex items-end justify-between h-32 gap-1">
                    {(stats.hourlyData || Array(24).fill(0)).map((value, index) => (
                      <div
                        key={index}
                        className="bg-primary/60 hover:bg-primary rounded-t transition-all duration-200 flex-1 max-w-3"
                        style={{ height: `${Math.max(4, (value / (Math.max(...(stats.hourlyData || [1])) || 1)) * 100)}%` }}
                        title={`${index}:00 - ${value} ${isRTL ? 'زيارة' : 'visits'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>23:00</span>
                  </div>
                </div>

                {/* Devices */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'الأجهزة' : 'Devices'}
                  </h3>
                  <div className="space-y-4">
                    {devicePercentages.length > 0 ? devicePercentages.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {device.type === 'Mobile' ? <Smartphone className="w-4 h-4" /> :
                             device.type === 'Desktop' ? <Monitor className="w-4 h-4" /> :
                             <Monitor className="w-4 h-4" />}
                            <span className="text-foreground">{device.type}</span>
                          </div>
                          <span className="text-muted-foreground">{device.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                      </div>
                    )) : (
                      <p className="text-muted-foreground text-center py-8">
                        {isRTL ? 'لا توجد بيانات بعد' : 'No data yet'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {isRTL ? 'أفضل الصفحات' : 'Top Pages'}
                </h3>
                <div className="space-y-3">
                  {topPages.length > 0 ? topPages.map(([page, views], index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-foreground font-mono">{page}</span>
                      <span className="text-sm text-muted-foreground">{views.toLocaleString()} {isRTL ? 'زيارة' : 'views'}</span>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">
                      {isRTL ? 'لا توجد بيانات بعد' : 'No data yet'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab - Control all text */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'إدارة المحتوى' : 'Content Management'}
                </h2>
                <Button onClick={handleSaveConfig} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
              </div>

              {/* Hero Section */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  {isRTL ? 'قسم البطل (Hero)' : 'Hero Section'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{isRTL ? 'العنوان الرئيسي' : 'Main Title'}</Label>
                    <Input
                      className="mt-2"
                      value={config.content.heroTitle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, heroTitle: e.target.value }
                      }))}
                      placeholder={isRTL ? 'أدواتك المجانية في مكان واحد' : 'Your Free Tools in One Place'}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? 'العنوان الفرعي' : 'Subtitle'}</Label>
                    <Input
                      className="mt-2"
                      value={config.content.heroSubtitle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, heroSubtitle: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                    <Textarea
                      className="mt-2"
                      rows={3}
                      value={config.content.heroDescription}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, heroDescription: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'نص الفوتر' : 'Footer Text'}
                </h3>
                <Input
                  value={config.content.footerText}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    content: { ...prev.content, footerText: e.target.value }
                  }))}
                />
              </div>

              {/* About Section */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'صفحة من نحن' : 'About Page'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>{isRTL ? 'العنوان' : 'Title'}</Label>
                    <Input
                      className="mt-2"
                      value={config.content.aboutTitle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, aboutTitle: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                    <Textarea
                      className="mt-2"
                      rows={5}
                      value={config.content.aboutDescription}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, aboutDescription: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'صفحة التواصل' : 'Contact Page'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>{isRTL ? 'العنوان' : 'Title'}</Label>
                    <Input
                      className="mt-2"
                      value={config.content.contactTitle}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, contactTitle: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                    <Textarea
                      className="mt-2"
                      rows={3}
                      value={config.content.contactDescription}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        content: { ...prev.content, contactDescription: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ads Tab */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'إدارة الإعلانات' : 'Ads Management'}
                </h2>
                <Button onClick={handleSaveConfig} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Header Ad */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    {isRTL ? 'إعلان الهيدر (أعلى الصفحة)' : 'Header Ad (Top of Page)'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'الشركة A - يظهر أسفل القائمة مباشرة' : 'Company A - Appears directly below navbar'}
                  </p>
                  <Textarea
                    rows={8}
                    className="font-mono text-sm"
                    placeholder="<!-- Paste your ad code here -->"
                    value={config.ads.headerAdCode}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      ads: { ...prev.ads, headerAdCode: e.target.value }
                    }))}
                  />
                </div>

                {/* Sidebar Ad */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-secondary" />
                    {isRTL ? 'إعلان الشريط الجانبي' : 'Sidebar Ad'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'الشركة B - يظهر في الجانب' : 'Company B - Appears on the side'}
                  </p>
                  <Textarea
                    rows={8}
                    className="font-mono text-sm"
                    placeholder="<!-- Paste your ad code here -->"
                    value={config.ads.sidebarAdCode}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      ads: { ...prev.ads, sidebarAdCode: e.target.value }
                    }))}
                  />
                </div>

                {/* Footer Ad */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-accent" />
                    {isRTL ? 'إعلان الفوتر' : 'Footer Ad'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'يظهر أسفل الصفحة قبل الفوتر' : 'Appears at the bottom before footer'}
                  </p>
                  <Textarea
                    rows={8}
                    className="font-mono text-sm"
                    placeholder="<!-- Paste your ad code here -->"
                    value={config.ads.footerAdCode}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      ads: { ...prev.ads, footerAdCode: e.target.value }
                    }))}
                  />
                </div>

                {/* In-Content Ad */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-warning" />
                    {isRTL ? 'إعلان داخل المحتوى' : 'In-Content Ad'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'يظهر داخل صفحات الأدوات' : 'Appears within tool pages'}
                  </p>
                  <Textarea
                    rows={8}
                    className="font-mono text-sm"
                    placeholder="<!-- Paste your ad code here -->"
                    value={config.ads.inContentAdCode}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      ads: { ...prev.ads, inContentAdCode: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'إعدادات SEO' : 'SEO Settings'}
                </h2>
                <Button onClick={handleSaveConfig} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
              </div>

              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div>
                  <Label>{isRTL ? 'عنوان الموقع (Title Tag)' : 'Site Title (Title Tag)'}</Label>
                  <Input
                    className="mt-2"
                    value={config.globalSEO.title}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSEO: { ...prev.globalSEO, title: e.target.value }
                    }))}
                    placeholder="BestToolsHub - Free Online Tools"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'يظهر في تاب المتصفح ونتائج البحث' : 'Appears in browser tab and search results'}
                  </p>
                </div>

                <div>
                  <Label>{isRTL ? 'وصف الموقع (Meta Description)' : 'Site Description (Meta Description)'}</Label>
                  <Textarea
                    className="mt-2"
                    rows={3}
                    value={config.globalSEO.description}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSEO: { ...prev.globalSEO, description: e.target.value }
                    }))}
                    placeholder="Free online tools for PDF, images, QR codes, and more..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {config.globalSEO.description.length}/160 {isRTL ? 'حرف' : 'characters'}
                  </p>
                </div>

                <div>
                  <Label>{isRTL ? 'الكلمات المفتاحية' : 'Keywords'}</Label>
                  <Textarea
                    className="mt-2"
                    rows={2}
                    value={config.globalSEO.keywords}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      globalSEO: { ...prev.globalSEO, keywords: e.target.value }
                    }))}
                    placeholder="free tools, pdf converter, image compressor, qr generator"
                  />
                </div>
              </div>

              {/* Social Links for SEO */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Facebook className="w-4 h-4" /> Facebook
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.facebook}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                      }))}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" /> Twitter / X
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.twitter}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                      }))}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" /> Instagram
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.instagram}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                      }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.linkedin}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" /> YouTube
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.youtube}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                      }))}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      TikTok
                    </Label>
                    <Input
                      className="mt-2"
                      value={config.socialLinks.tiktok}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, tiktok: e.target.value }
                      }))}
                      placeholder="https://tiktok.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'التحليلات التفصيلية' : 'Detailed Analytics'}
              </h2>

              {/* Browser Stats */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'المتصفحات' : 'Browsers'}
                </h3>
                <div className="space-y-3">
                  {stats.browsers?.length > 0 ? stats.browsers.map((browser, index) => {
                    const totalBrowsers = stats.browsers.reduce((sum, b) => sum + b.count, 0);
                    const percentage = Math.round((browser.count / totalBrowsers) * 100);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{browser.name}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-muted-foreground text-center py-8">
                      {isRTL ? 'لا توجد بيانات بعد' : 'No data yet'}
                    </p>
                  )}
                </div>
              </div>

              {/* Daily Trend */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'الزيارات اليومية (آخر 30 يوم)' : 'Daily Visits (Last 30 days)'}
                </h3>
                <div className="space-y-2">
                  {stats.dailyData?.length > 0 ? stats.dailyData.slice(-7).map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm text-foreground">{day.date}</span>
                      <span className="text-sm text-muted-foreground">{day.visits} {isRTL ? 'زيارة' : 'visits'}</span>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">
                      {isRTL ? 'سيتم جمع البيانات مع مرور الوقت' : 'Data will be collected over time'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'إعدادات المظهر' : 'Appearance Settings'}
                </h2>
                <Button onClick={handleSaveConfig} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
              </div>

              {/* Site Identity */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  {isRTL ? 'هوية الموقع' : 'Site Identity'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{isRTL ? 'اسم الموقع' : 'Site Name'}</Label>
                    <Input
                      className="mt-2"
                      value={config.siteIdentity.siteName}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        siteIdentity: { ...prev.siteIdentity, siteName: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? 'رابط اللوجو أو رفع صورة' : 'Logo URL or Upload Image'}</Label>
                    <Input
                      className="mt-2"
                      value={config.siteIdentity.logoUrl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        siteIdentity: { ...prev.siteIdentity, logoUrl: e.target.value }
                      }))}
                      placeholder="https://..."
                    />
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="logo-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setConfig(prev => ({
                                ...prev,
                                siteIdentity: { ...prev.siteIdentity, logoUrl: reader.result as string }
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors text-sm"
                      >
                        <Image className="w-4 h-4" />
                        {isRTL ? 'رفع صورة' : 'Upload Image'}
                      </label>
                    </div>
                    {config.siteIdentity.logoUrl && (
                      <div className="mt-2 p-4 bg-muted rounded-lg">
                        <img 
                          src={config.siteIdentity.logoUrl} 
                          alt="Logo Preview" 
                          className="max-h-16 object-contain"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>{isRTL ? 'رابط الأيقونة (Favicon)' : 'Favicon URL'}</Label>
                    <Input
                      className="mt-2"
                      value={config.siteIdentity.faviconUrl}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        siteIdentity: { ...prev.siteIdentity, faviconUrl: e.target.value }
                      }))}
                      placeholder="https://..."
                    />
                    {config.siteIdentity.faviconUrl && (
                      <div className="mt-2 p-4 bg-muted rounded-lg">
                        <img 
                          src={config.siteIdentity.faviconUrl} 
                          alt="Favicon Preview" 
                          className="w-8 h-8 object-contain"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'السمة العامة' : 'Site Theme'}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, theme: 'light' }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.theme === 'light' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">
                      {isRTL ? 'فاتح' : 'Light'}
                    </span>
                  </button>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, theme: 'dark' }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.theme === 'dark' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Moon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">
                      {isRTL ? 'داكن' : 'Dark'}
                    </span>
                  </button>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, theme: 'system' }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      config.theme === 'system' 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Monitor className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {isRTL ? 'تلقائي' : 'System'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Christmas Mode */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Snowflake className="w-5 h-5 text-blue-400" />
                  {isRTL ? 'وضع الكريسماس/رأس السنة 🎄' : 'Christmas/New Year Mode 🎄'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL 
                    ? 'تفعيل تأثيرات الثلج والاحتفالات على الموقع'
                    : 'Enable snow effects and festive decorations on the site'}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, christmasMode: !prev.christmasMode }))}
                    className={`relative w-14 h-7 rounded-full transition-all ${
                      config.christmasMode 
                        ? 'bg-gradient-to-r from-red-500 to-green-500' 
                        : 'bg-muted'
                    }`}
                  >
                    <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${
                      config.christmasMode ? 'end-1' : 'start-1'
                    }`} />
                  </button>
                  <span className="text-sm text-foreground">
                    {config.christmasMode 
                      ? (isRTL ? 'مفعّل 🎄❄️' : 'Enabled 🎄❄️') 
                      : (isRTL ? 'معطّل' : 'Disabled')}
                  </span>
                </div>
              </div>

              {/* Language Selection */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'اللغة الافتراضية' : 'Default Language'}
                </h3>
                <select 
                  className="w-full p-3 bg-muted rounded-lg border border-border text-foreground"
                  value={config.language}
                  onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value as 'ar' | 'en' | 'fr' }))}
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'التكاملات' : 'Integrations'}
                </h2>
                <Button onClick={handleSaveConfig} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
              </div>

              {/* Google Analytics */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Google Analytics
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL ? 'أدخل معرف Google Analytics لتتبع الزوار' : 'Enter your Google Analytics ID to track visitors'}
                </p>
                <Input
                  value={config.analytics.googleId}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    analytics: { ...prev.analytics, googleId: e.target.value }
                  }))}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              {/* Google AdSense Global Script */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-500" />
                  {isRTL ? 'كود Google AdSense العام' : 'Google AdSense Global Script'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL ? 'سيتم إضافة هذا الكود إلى رأس الصفحة' : 'This code will be added to the page head'}
                </p>
                <Textarea
                  rows={6}
                  className="font-mono text-sm"
                  placeholder="<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX' crossorigin='anonymous'></script>"
                />
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'الإعدادات' : 'Settings'}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleDownloadConfig} className="gap-2">
                    <Download className="w-4 h-4" />
                    {isRTL ? 'تنزيل config.js' : 'Download config.js'}
                  </Button>
                  <Button onClick={handleSaveConfig} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>

              {/* Change Password */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                </h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label>{isRTL ? 'كلمة المرور الحالية' : 'Current Password'}</Label>
                    <Input
                      type="password"
                      className="mt-2"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                    <Input
                      type="password"
                      className="mt-2"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <Button onClick={updatePassword} variant="outline" className="gap-2">
                    <Lock className="w-4 h-4" />
                    {isRTL ? 'تحديث كلمة المرور' : 'Update Password'}
                  </Button>
                </div>
              </div>

              {/* Export/Import */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {isRTL ? 'تصدير الإعدادات' : 'Export Settings'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL 
                    ? 'قم بتنزيل ملف config.js للاحتفاظ بنسخة احتياطية من إعداداتك'
                    : 'Download config.js file to backup your settings'}
                </p>
                <Button onClick={handleDownloadConfig} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'تنزيل الإعدادات' : 'Download Settings'}
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
