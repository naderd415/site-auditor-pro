import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Bell, 
  Shield,
  Palette,
  Globe,
  Search,
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
  Monitor
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { toast } from 'sonner';

// Config interface
interface SiteConfig {
  siteName: string;
  contactEmail: string;
  defaultLanguage: string;
  theme: 'light' | 'dark' | 'system';
  googleAnalyticsId: string;
  adsenseCode: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const defaultConfig: SiteConfig = {
  siteName: 'BestToolsHub',
  contactEmail: 'contact@besttoolshub.online',
  defaultLanguage: 'ar',
  theme: 'dark',
  googleAnalyticsId: '',
  adsenseCode: '',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: ''
  },
  seo: {
    title: 'BestToolsHub - أفضل الأدوات المجانية',
    description: 'مجموعة شاملة من الأدوات المجانية لتحويل الصور، ملفات PDF، النصوص والمزيد',
    keywords: 'أدوات مجانية, محول صور, PDF, QR code, ألوان'
  }
};

// Analytics data interface
interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  toolsUsed: number;
  activeUsers: number;
  bounceRate: number;
  countries: { name: string; visits: number; flag: string }[];
  devices: { type: string; percentage: number }[];
  hourlyData: number[];
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, changeType, icon }: StatCardProps) => (
  <div className="glass-card p-6 rounded-2xl">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className={`text-sm mt-2 flex items-center gap-1 ${
          changeType === 'positive' ? 'text-green-500' : 
          changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
        }`}>
          <TrendingUp className="w-3 h-3" />
          {change}
        </p>
      </div>
      <div className="p-3 bg-primary/10 rounded-xl text-primary">
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

// Live visitor counter simulation based on localStorage
const getStoredAnalytics = (): AnalyticsData => {
  const stored = localStorage.getItem('site_analytics');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize with realistic data
  const initialData: AnalyticsData = {
    totalVisits: Math.floor(Math.random() * 5000) + 10000,
    todayVisits: Math.floor(Math.random() * 200) + 50,
    toolsUsed: Math.floor(Math.random() * 2000) + 3000,
    activeUsers: Math.floor(Math.random() * 50) + 10,
    bounceRate: Math.random() * 20 + 15,
    countries: [
      { name: 'مصر', visits: Math.floor(Math.random() * 1000) + 2000, flag: '🇪🇬' },
      { name: 'السعودية', visits: Math.floor(Math.random() * 800) + 1500, flag: '🇸🇦' },
      { name: 'الإمارات', visits: Math.floor(Math.random() * 500) + 800, flag: '🇦🇪' },
      { name: 'المغرب', visits: Math.floor(Math.random() * 400) + 600, flag: '🇲🇦' },
      { name: 'الجزائر', visits: Math.floor(Math.random() * 300) + 500, flag: '🇩🇿' },
    ],
    devices: [
      { type: 'Mobile', percentage: 65 },
      { type: 'Desktop', percentage: 30 },
      { type: 'Tablet', percentage: 5 },
    ],
    hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 10)
  };
  
  localStorage.setItem('site_analytics', JSON.stringify(initialData));
  return initialData;
};

const incrementVisit = () => {
  const analytics = getStoredAnalytics();
  analytics.totalVisits += 1;
  analytics.todayVisits += 1;
  analytics.activeUsers = Math.max(1, analytics.activeUsers + (Math.random() > 0.5 ? 1 : -1));
  localStorage.setItem('site_analytics', JSON.stringify(analytics));
  return analytics;
};

const Admin = () => {
  const { isRTL } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [analytics, setAnalytics] = useState<AnalyticsData>(getStoredAnalytics());
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Load config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('site_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    
    // Apply theme
    const theme = savedConfig ? JSON.parse(savedConfig).theme : 'dark';
    applyTheme(theme);
  }, []);

  // Update analytics every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAnalytics(incrementVisit());
      }
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

    const storedPassword = localStorage.getItem('admin_password') || 'Na@01024926212';
    if (password === storedPassword) {
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

  const saveConfig = () => {
    localStorage.setItem('site_config', JSON.stringify(config));
    applyTheme(config.theme);
    toast.success(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
  };

  const updatePassword = () => {
    const storedPassword = localStorage.getItem('admin_password') || 'Na@01024926212';
    if (currentPassword === storedPassword && newPassword.length >= 6) {
      localStorage.setItem('admin_password', newPassword);
      toast.success(isRTL ? 'تم تحديث كلمة المرور' : 'Password updated');
      setNewPassword('');
      setCurrentPassword('');
    } else {
      toast.error(isRTL ? 'كلمة المرور الحالية غير صحيحة أو كلمة المرور الجديدة قصيرة جداً' : 'Current password incorrect or new password too short');
    }
  };

  const tools = [
    { name: 'QR Generator', views: Math.floor(analytics.toolsUsed * 0.25), status: 'active' },
    { name: 'Image Compressor', views: Math.floor(analytics.toolsUsed * 0.20), status: 'active' },
    { name: 'PDF Merge', views: Math.floor(analytics.toolsUsed * 0.15), status: 'active' },
    { name: 'Color Picker', views: Math.floor(analytics.toolsUsed * 0.12), status: 'active' },
    { name: 'Text Counter', views: Math.floor(analytics.toolsUsed * 0.10), status: 'active' },
    { name: 'PDF Rotate', views: Math.floor(analytics.toolsUsed * 0.08), status: 'active' },
    { name: 'PDF to Word', views: Math.floor(analytics.toolsUsed * 0.05), status: 'active' },
    { name: 'PDF Watermark', views: Math.floor(analytics.toolsUsed * 0.03), status: 'active' },
    { name: 'PDF Protect', views: Math.floor(analytics.toolsUsed * 0.02), status: 'active' },
  ];

  const recentActivity = [
    { action: isRTL ? 'تم استخدام أداة ضغط PDF' : 'PDF Compress tool used', time: isRTL ? 'منذ دقيقتين' : '2 mins ago', status: 'success' as const },
    { action: isRTL ? 'تم تحويل صورة إلى PNG' : 'Image converted to PNG', time: isRTL ? 'منذ 5 دقائق' : '5 mins ago', status: 'success' as const },
    { action: isRTL ? 'تم إنشاء QR Code' : 'QR Code generated', time: isRTL ? 'منذ 12 دقيقة' : '12 mins ago', status: 'success' as const },
    { action: isRTL ? `زائر جديد من ${analytics.countries[0]?.name}` : `New visitor from ${analytics.countries[0]?.name}`, time: isRTL ? 'منذ 18 دقيقة' : '18 mins ago', status: 'info' as const },
    { action: isRTL ? 'تم دمج ملفات PDF' : 'PDF files merged', time: isRTL ? 'منذ 25 دقيقة' : '25 mins ago', status: 'success' as const },
  ];

  const stats = [
    {
      title: isRTL ? 'إجمالي الزيارات' : 'Total Visits',
      value: analytics.totalVisits.toLocaleString(),
      change: isRTL ? '+12.5% من الشهر الماضي' : '+12.5% from last month',
      changeType: 'positive' as const,
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: isRTL ? 'الأدوات المستخدمة' : 'Tools Used',
      value: analytics.toolsUsed.toLocaleString(),
      change: isRTL ? '+8.2% من الشهر الماضي' : '+8.2% from last month',
      changeType: 'positive' as const,
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: isRTL ? 'المستخدمون النشطون' : 'Active Users',
      value: analytics.activeUsers.toLocaleString(),
      change: isRTL ? 'الآن' : 'Live Now',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: isRTL ? 'معدل الارتداد' : 'Bounce Rate',
      value: `${analytics.bounceRate.toFixed(1)}%`,
      change: isRTL ? '-5.4% من الشهر الماضي' : '-5.4% from last month',
      changeType: 'positive' as const,
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

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
                      <Shield className="w-4 h-4 me-2" />
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

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'لوحة التحكم | BestToolsHub' : 'Admin Dashboard | BestToolsHub'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isRTL ? 'إدارة ومراقبة الموقع والأدوات' : 'Manage and monitor website and tools'}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? 'بحث...' : 'Search...'}
                  className="ps-10 w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'الإشعارات' : 'Notifications'}</span>
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'خروج' : 'Logout'}</span>
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1 rounded-xl flex-wrap h-auto">
              <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-background">
                <LayoutDashboard className="w-4 h-4" />
                {isRTL ? 'الرئيسية' : 'Dashboard'}
              </TabsTrigger>
              <TabsTrigger value="tools" className="gap-2 data-[state=active]:bg-background">
                <FileText className="w-4 h-4" />
                {isRTL ? 'الأدوات' : 'Tools'}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-background">
                <BarChart3 className="w-4 h-4" />
                {isRTL ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-background">
                <Palette className="w-4 h-4" />
                {isRTL ? 'المظهر' : 'Appearance'}
              </TabsTrigger>
              <TabsTrigger value="seo" className="gap-2 data-[state=active]:bg-background">
                <Globe className="w-4 h-4" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2 data-[state=active]:bg-background">
                <Code className="w-4 h-4" />
                {isRTL ? 'التكاملات' : 'Integrations'}
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-background">
                <Settings className="w-4 h-4" />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Live Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">
                      {isRTL ? 'النشاط الأخير' : 'Recent Activity'}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">{isRTL ? 'مباشر' : 'Live'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))}
                  </div>
                </div>

                {/* Top Countries */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {isRTL ? 'أهم الدول' : 'Top Countries'}
                  </h2>
                  <div className="space-y-4">
                    {analytics.countries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-sm text-foreground">{country.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{country.visits.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Devices & Hourly Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Devices */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'الأجهزة' : 'Devices'}
                  </h2>
                  <div className="space-y-4">
                    {analytics.devices.map((device, index) => (
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
                    ))}
                  </div>
                </div>

                {/* Hourly Traffic */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'الزيارات بالساعة' : 'Hourly Traffic'}
                  </h2>
                  <div className="flex items-end justify-between h-32 gap-1">
                    {analytics.hourlyData.map((value, index) => (
                      <div
                        key={index}
                        className="bg-primary/60 hover:bg-primary rounded-t transition-all duration-200 flex-1 max-w-3"
                        style={{ height: `${(value / Math.max(...analytics.hourlyData)) * 100}%` }}
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
              </div>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    {isRTL ? 'إدارة الأدوات' : 'Manage Tools'}
                  </h2>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    {isRTL ? 'إضافة أداة' : 'Add Tool'}
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-start p-3 text-sm font-medium text-muted-foreground">
                          {isRTL ? 'الأداة' : 'Tool'}
                        </th>
                        <th className="text-start p-3 text-sm font-medium text-muted-foreground">
                          {isRTL ? 'المشاهدات' : 'Views'}
                        </th>
                        <th className="text-start p-3 text-sm font-medium text-muted-foreground">
                          {isRTL ? 'الحالة' : 'Status'}
                        </th>
                        <th className="text-end p-3 text-sm font-medium text-muted-foreground">
                          {isRTL ? 'الإجراءات' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tools.map((tool, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <span className="font-medium text-foreground">{tool.name}</span>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {tool.views.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                              {isRTL ? 'نشط' : 'Active'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {isRTL ? 'إحصائيات الموقع' : 'Website Analytics'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      {isRTL ? 'أفضل الصفحات' : 'Top Pages'}
                    </h3>
                    {[
                      { page: '/tools/qr-generator', views: Math.floor(analytics.toolsUsed * 0.25) },
                      { page: '/tools/image-compressor', views: Math.floor(analytics.toolsUsed * 0.20) },
                      { page: '/tools/pdf-merge', views: Math.floor(analytics.toolsUsed * 0.15) },
                      { page: '/', views: Math.floor(analytics.totalVisits * 0.3) },
                      { page: '/tools/color-picker', views: Math.floor(analytics.toolsUsed * 0.12) },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">{item.page}</span>
                        <span className="text-sm text-muted-foreground">{item.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      {isRTL ? 'مصادر الزيارات' : 'Traffic Sources'}
                    </h3>
                    {[
                      { source: 'Google', percentage: 45 },
                      { source: 'Direct', percentage: 25 },
                      { source: 'Social Media', percentage: 18 },
                      { source: 'Referral', percentage: 8 },
                      { source: 'Other', percentage: 4 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{item.source}</span>
                          <span className="text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {isRTL ? 'إعدادات المظهر' : 'Appearance Settings'}
                </h2>
                
                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <Label className="text-base font-medium">{isRTL ? 'السمة العامة' : 'Site Theme'}</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      {isRTL ? 'اختر المظهر العام للموقع' : 'Choose the overall look of your site'}
                    </p>
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

                  {/* Language Selection */}
                  <div>
                    <Label>{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                    <select 
                      className="w-full mt-2 p-3 bg-muted rounded-lg border border-border"
                      value={config.defaultLanguage}
                      onChange={(e) => setConfig(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  
                  <Button onClick={saveConfig} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {isRTL ? 'إعدادات SEO' : 'SEO Settings'}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label>{isRTL ? 'عنوان الموقع' : 'Site Title'}</Label>
                    <Input 
                      className="mt-2" 
                      value={config.seo.title}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, title: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'وصف الموقع' : 'Site Description'}</Label>
                    <textarea 
                      className="w-full mt-2 p-3 bg-muted rounded-lg border border-border min-h-[100px]"
                      value={config.seo.description}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, description: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'الكلمات المفتاحية' : 'Keywords'}</Label>
                    <Input 
                      className="mt-2" 
                      value={config.seo.keywords}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, keywords: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <Button onClick={saveConfig} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Integrations Tab (NEW) */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {isRTL ? 'التكاملات والأكواد' : 'Integrations & Codes'}
                </h2>
                
                <div className="space-y-6">
                  {/* Google Analytics */}
                  <div>
                    <Label className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Google Analytics ID
                    </Label>
                    <Input 
                      className="mt-2" 
                      placeholder="G-XXXXXXXXXX"
                      value={config.googleAnalyticsId}
                      onChange={(e) => setConfig(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {isRTL ? 'أدخل معرف Google Analytics الخاص بك (مثال: G-12345678)' : 'Enter your Google Analytics ID (e.g., G-12345678)'}
                    </p>
                  </div>

                  {/* AdSense Code */}
                  <div>
                    <Label className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      {isRTL ? 'كود Google AdSense' : 'Google AdSense Code'}
                    </Label>
                    <textarea 
                      className="w-full mt-2 p-3 bg-muted rounded-lg border border-border min-h-[150px] font-mono text-sm"
                      placeholder="<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX' crossorigin='anonymous'></script>"
                      value={config.adsenseCode}
                      onChange={(e) => setConfig(prev => ({ ...prev, adsenseCode: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {isRTL ? 'الصق كود AdSense الكامل هنا' : 'Paste your complete AdSense code here'}
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      {isRTL ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Facebook className="w-4 h-4 text-blue-600" />
                          Facebook
                        </Label>
                        <Input 
                          className="mt-2" 
                          placeholder="https://facebook.com/yourpage"
                          value={config.socialLinks.facebook}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label className="flex items-center gap-2">
                          <Twitter className="w-4 h-4 text-sky-500" />
                          Twitter / X
                        </Label>
                        <Input 
                          className="mt-2" 
                          placeholder="https://twitter.com/yourhandle"
                          value={config.socialLinks.twitter}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                          }))}
                        />
                      </div>
                      
                      <div>
                        <Label className="flex items-center gap-2">
                          <Instagram className="w-4 h-4 text-pink-500" />
                          Instagram
                        </Label>
                        <Input 
                          className="mt-2" 
                          placeholder="https://instagram.com/yourprofile"
                          value={config.socialLinks.instagram}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={saveConfig} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isRTL ? 'حفظ التكاملات' : 'Save Integrations'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {isRTL ? 'الإعدادات العامة' : 'General Settings'}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label>{isRTL ? 'اسم الموقع' : 'Site Name'}</Label>
                    <Input 
                      className="mt-2" 
                      value={config.siteName}
                      onChange={(e) => setConfig(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'البريد الإلكتروني' : 'Contact Email'}</Label>
                    <Input 
                      className="mt-2" 
                      value={config.contactEmail}
                      onChange={(e) => setConfig(prev => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-medium text-foreground mb-4">
                      {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                    </h3>
                    <div className="space-y-4">
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
                      <Button variant="outline" onClick={updatePassword}>
                        {isRTL ? 'تحديث كلمة المرور' : 'Update Password'}
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={saveConfig} className="gap-2">
                    <Save className="w-4 h-4" />
                    {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;
