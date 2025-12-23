import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  LogOut
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { toast } from 'sonner';

// تحذير أمني: هذه الحماية للعرض فقط وليست آمنة للإنتاج
// للإنتاج الحقيقي، يجب استخدام نظام مصادقة خلفي مثل Supabase Auth
const ADMIN_PASSWORD_HASH = 'a3f5b2c8d1e9f4a6b7c8d9e0f1a2b3c4'; // Hash وهمي للعرض

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

const Admin = () => {
  const { isRTL } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // التحقق من حالة تسجيل الدخول عند التحميل
  useEffect(() => {
    const authToken = sessionStorage.getItem('admin_auth');
    if (authToken) {
      // التحقق من صلاحية الجلسة (تنتهي بعد ساعة)
      const tokenData = JSON.parse(authToken);
      if (tokenData.expiry > Date.now()) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('admin_auth');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 500));

    // تحذير: هذه كلمة مرور للعرض فقط
    // للإنتاج الحقيقي، استخدم نظام مصادقة خلفي
    if (password === 'Na@01024926212') {
      const authToken = {
        authenticated: true,
        expiry: Date.now() + (60 * 60 * 1000) // ساعة واحدة
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

  const stats = [
    {
      title: isRTL ? 'إجمالي الزيارات' : 'Total Visits',
      value: '45,231',
      change: isRTL ? '+12.5% من الشهر الماضي' : '+12.5% from last month',
      changeType: 'positive' as const,
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: isRTL ? 'الأدوات المستخدمة' : 'Tools Used',
      value: '12,847',
      change: isRTL ? '+8.2% من الشهر الماضي' : '+8.2% from last month',
      changeType: 'positive' as const,
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: isRTL ? 'المستخدمون النشطون' : 'Active Users',
      value: '3,721',
      change: isRTL ? '+23.1% من الشهر الماضي' : '+23.1% from last month',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: isRTL ? 'معدل الارتداد' : 'Bounce Rate',
      value: '24.3%',
      change: isRTL ? '-5.4% من الشهر الماضي' : '-5.4% from last month',
      changeType: 'positive' as const,
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  const recentActivity = [
    { action: isRTL ? 'تم استخدام أداة ضغط PDF' : 'PDF Compress tool used', time: isRTL ? 'منذ دقيقتين' : '2 mins ago', status: 'success' as const },
    { action: isRTL ? 'تم تحويل صورة إلى PNG' : 'Image converted to PNG', time: isRTL ? 'منذ 5 دقائق' : '5 mins ago', status: 'success' as const },
    { action: isRTL ? 'فشل في إزالة الخلفية' : 'Background removal failed', time: isRTL ? 'منذ 12 دقيقة' : '12 mins ago', status: 'warning' as const },
    { action: isRTL ? 'تم إنشاء QR Code' : 'QR Code generated', time: isRTL ? 'منذ 18 دقيقة' : '18 mins ago', status: 'success' as const },
    { action: isRTL ? 'زائر جديد من مصر' : 'New visitor from Egypt', time: isRTL ? 'منذ 25 دقيقة' : '25 mins ago', status: 'info' as const },
  ];

  const tools = [
    { name: 'QR Generator', views: 8234, status: 'active' },
    { name: 'Image Compressor', views: 6721, status: 'active' },
    { name: 'PDF Merge', views: 5432, status: 'active' },
    { name: 'Background Remover', views: 4521, status: 'active' },
    { name: 'Color Picker', views: 3892, status: 'active' },
    { name: 'Text Counter', views: 3201, status: 'active' },
    { name: 'PDF Rotate', views: 2890, status: 'active' },
    { name: 'PDF to Word', views: 2654, status: 'active' },
    { name: 'PDF Watermark', views: 2341, status: 'active' },
    { name: 'PDF Protect', views: 2100, status: 'active' },
  ];

  // صفحة تسجيل الدخول
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
              <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-background">
                <Settings className="w-4 h-4" />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Grid */}
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
                    <Button variant="ghost" size="sm">
                      {isRTL ? 'عرض الكل' : 'View All'}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))}
                  </div>
                </div>

                {/* Top Tools */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {isRTL ? 'أفضل الأدوات' : 'Top Tools'}
                  </h2>
                  <div className="space-y-4">
                    {tools.slice(0, 5).map((tool, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold rounded-full">
                            {index + 1}
                          </span>
                          <span className="text-sm text-foreground">{tool.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{tool.views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Plus className="w-5 h-5" />
                    <span className="text-xs">{isRTL ? 'إضافة أداة' : 'Add Tool'}</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Edit className="w-5 h-5" />
                    <span className="text-xs">{isRTL ? 'تعديل المحتوى' : 'Edit Content'}</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-xs">{isRTL ? 'الأمان' : 'Security'}</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-xs">{isRTL ? 'التقارير' : 'Reports'}</span>
                  </Button>
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
                      { page: '/tools/qr-generator', views: 8234 },
                      { page: '/tools/image-compressor', views: 6721 },
                      { page: '/tools/pdf-merge', views: 5432 },
                      { page: '/', views: 4521 },
                      { page: '/tools/color-picker', views: 3892 },
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
                  <div>
                    <Label>{isRTL ? 'اللون الأساسي' : 'Primary Color'}</Label>
                    <div className="flex gap-3 mt-2">
                      {['#00bcd4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'الخط' : 'Font Family'}</Label>
                    <select className="w-full mt-2 p-3 bg-muted rounded-lg border border-border">
                      <option>Cairo</option>
                      <option>Inter</option>
                      <option>Roboto</option>
                    </select>
                  </div>
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
                      defaultValue="BestToolsHub - أفضل الأدوات المجانية"
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'وصف الموقع' : 'Site Description'}</Label>
                    <textarea 
                      className="w-full mt-2 p-3 bg-muted rounded-lg border border-border min-h-[100px]"
                      defaultValue="مجموعة شاملة من الأدوات المجانية لتحويل الصور، ملفات PDF، النصوص والمزيد - كل شيء يعمل مباشرة من متصفحك"
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'الكلمات المفتاحية' : 'Keywords'}</Label>
                    <Input 
                      className="mt-2" 
                      defaultValue="أدوات مجانية, محول صور, PDF, QR code, ألوان"
                    />
                  </div>
                  
                  <Button>{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</Button>
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
                    <Input className="mt-2" defaultValue="BestToolsHub" />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'البريد الإلكتروني' : 'Contact Email'}</Label>
                    <Input className="mt-2" defaultValue="contact@besttoolshub.com" />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                    <select className="w-full mt-2 p-3 bg-muted rounded-lg border border-border">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-medium text-foreground mb-4">
                      {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>{isRTL ? 'كلمة المرور الحالية' : 'Current Password'}</Label>
                        <Input type="password" className="mt-2" />
                      </div>
                      <div>
                        <Label>{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                        <Input type="password" className="mt-2" />
                      </div>
                      <Button variant="outline">
                        {isRTL ? 'تحديث كلمة المرور' : 'Update Password'}
                      </Button>
                    </div>
                  </div>
                  
                  <Button>{isRTL ? 'حفظ الإعدادات' : 'Save Settings'}</Button>
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