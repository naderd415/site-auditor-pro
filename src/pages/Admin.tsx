import { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      title: isRTL ? 'إجمالي الزيارات' : 'Total Visits',
      value: '45,231',
      change: '+12.5% من الشهر الماضي',
      changeType: 'positive' as const,
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: isRTL ? 'الأدوات المستخدمة' : 'Tools Used',
      value: '12,847',
      change: '+8.2% من الشهر الماضي',
      changeType: 'positive' as const,
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: isRTL ? 'المستخدمون النشطون' : 'Active Users',
      value: '3,721',
      change: '+23.1% من الشهر الماضي',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: isRTL ? 'معدل الارتداد' : 'Bounce Rate',
      value: '24.3%',
      change: '-5.4% من الشهر الماضي',
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
  ];

  return (
    <>
      <Helmet>
        <title>{isRTL ? 'لوحة التحكم | ToolVerse' : 'Admin Dashboard | ToolVerse'}</title>
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
              <Button className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">{isRTL ? 'الإشعارات' : 'Notifications'}</span>
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
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'اللون الرئيسي' : 'Primary Color'}</Label>
                    <div className="flex gap-3">
                      {['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-foreground/50 transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{isRTL ? 'شعار الموقع' : 'Site Logo'}</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Button variant="outline">
                        {isRTL ? 'رفع شعار جديد' : 'Upload New Logo'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الخط الافتراضي' : 'Default Font'}</Label>
                    <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                      <option>Inter</option>
                      <option>Cairo</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
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
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'عنوان الموقع' : 'Site Title'}</Label>
                    <Input defaultValue="ToolVerse - أدوات مجانية عبر الإنترنت" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{isRTL ? 'وصف الموقع' : 'Site Description'}</Label>
                    <textarea 
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground min-h-[100px]"
                      defaultValue="مجموعة شاملة من الأدوات المجانية عبر الإنترنت - تحويل الصور، PDF، الألوان، والمزيد"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الكلمات المفتاحية' : 'Keywords'}</Label>
                    <Input defaultValue="أدوات مجانية, تحويل PDF, تحويل الصور, QR code" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Google Analytics ID</Label>
                    <Input placeholder="UA-XXXXXXXXX-X" />
                  </div>
                  
                  <Button className="w-fit">
                    {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    {isRTL ? 'إعدادات عامة' : 'General Settings'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{isRTL ? 'اسم الموقع' : 'Site Name'}</Label>
                      <Input defaultValue="ToolVerse" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                      <Input defaultValue="admin@toolverse.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                      <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    {isRTL ? 'الأمان' : 'Security'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          {isRTL ? 'المصادقة الثنائية' : 'Two-Factor Auth'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'حماية إضافية للحساب' : 'Extra account protection'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {isRTL ? 'تفعيل' : 'Enable'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'آخر تغيير: منذ 30 يوماً' : 'Last changed: 30 days ago'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {isRTL ? 'تغيير' : 'Change'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">
                          {isRTL ? 'سجل الدخول' : 'Login History'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'عرض سجل تسجيلات الدخول' : 'View login records'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                    </div>
                  </div>
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