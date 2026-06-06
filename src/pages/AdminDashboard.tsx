import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS, Registration } from '../contexts/CMSContext';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, updatePassword } from 'firebase/auth';
import { 
  Users, BookOpen, Settings, LayoutDashboard, LogOut, 
  Trash2, Edit, Check, X, FileText, Menu, PlaySquare, Plus,
  Upload, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const { 
    content, updateContent, 
    courses, addCourse, updateCourse, deleteCourse,
    registrations, updateRegistrationStatus, deleteRegistration 
  } = useCMS();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Teacher Image upload states and handler
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let file: File | undefined;
    
    if (e.type === 'change') {
      file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
    } else {
      e.preventDefault();
      file = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files?.[0];
    }
    
    if (!file) return;
    setImageError('');
    setImageUploading(true);

    if (!file.type.startsWith('image/')) {
      setImageError('الرجاء اختيار ملف صورة صالح (PNG, JPG, JPEG)');
      setImageUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // High quality but low footprint resize (800px max)
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          try {
            // Compress with high but efficient 0.85 quality
            const base64 = canvas.toDataURL('image/jpeg', 0.85);
            
            // Create a media item entry
            const newItem = {
              id: `uploaded-${Date.now()}`,
              name: `صورة محملة في ${new Date().toLocaleDateString('ar-DZ')}`,
              url: base64,
              isDefault: false,
              createdAt: Date.now()
            };

            const updatedGallery = [newItem, ...(content.mediaGallery || [])];
            updateContent({ 
              aboutImage: base64,
              mediaGallery: updatedGallery 
            });
          } catch (err) {
            console.error("Canvas toDataURL failed:", err);
            setImageError('فشل ضغط الصورة. الرجاء محاولة صورة أخرى.');
          }
        } else {
          setImageError('فشل معالجة الصورة.');
        }
        setImageUploading(false);
      };
      img.onerror = () => {
        setImageError('فشل تحميل ملف الصورة.');
        setImageUploading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setImageError('فشل قراءة الملف.');
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    if (newPassword.length < 6) {
      setPasswordError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('كلمتا المرور غير متطابقتين.');
      return;
    }

    setPasswordLoading('جاري تحديث كلمة المرور...');
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setPasswordSuccess('تم تغيير كلمة المرور بنجاح!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError('لم يتم العثور على مستخدم مسجل الدخول.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setPasswordError('لتغيير كلمة المرور، يرجى تسجيل الخروج ثم تسجيل الدخول مجدداً ومحاولة التغيير فوراً لأسباب أمنية.');
      } else {
        setPasswordError(`خطأ أثناء التحديث: ${err.message || 'حدث خطأ غير متوقع'}`);
      }
    } finally {
      setPasswordLoading('');
    }
  };

  useEffect(() => {
    // Firebase auth check
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setAuthChecking(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (authChecking) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <div className="text-slate-500 flex flex-col items-center">
         <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
         Loading dashboard...
      </div>
    </div>;
  }

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم والإحصاءات', icon: LayoutDashboard },
    { id: 'registrations', label: 'طلبات التسجيل الجديدة', icon: Users },
    { id: 'courses', label: 'إدارة الدورات', icon: BookOpen },
    { id: 'content', label: 'محتوى وصور الموقع', icon: FileText },
    { id: 'settings', label: 'إعدادات الحساب', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans" dir="rtl">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-brand-text text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-display font-bold text-xl">لوحة الإدارة - EduxMina</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} md:block
        w-full md:w-64 bg-brand-text text-slate-300 flex-shrink-0 flex flex-col md:sticky md:h-screen md:top-0 z-40
      `}>
        <div className="p-6 hidden md:block">
          <div className="font-display font-bold text-2xl text-white flex items-center gap-2 justify-start">
            <div className="w-8 h-8 bg-brand-primary rounded shadow flex items-center justify-center text-sm font-sans">E</div>
            <span>لوحة الإدارة</span>
          </div>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id 
                    ? 'bg-brand-primary text-white font-medium' 
                    : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto text-right">
        <div className="max-w-5xl mx-auto">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 font-display">مرحباً بكِ، الأستاذة أمينة 👋</h1>
                  <p className="text-slate-500 text-sm mt-1">إليكِ ملخص النشاط اليوم، ويمكنكِ تحديث صورتكِ بكل بساطة أدناه.</p>
                </div>
                <a href="/" target="_blank" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium">
                  <PlaySquare size={16} />
                  <span>عرض الموقع الرئيسي</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-brand-primary">
                    <Users size={24} />
                    <span className="text-xs font-bold bg-brand-primary/10 px-2 py-1 rounded-md">الإجمالي</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">{registrations.length}</div>
                  <div className="text-sm text-slate-500">إجمالي طلبات التسجيل للطلاب</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-blue-500">
                     <BookOpen size={24} />
                     <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-md">نشطة</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">{courses.length}</div>
                  <div className="text-sm text-slate-500">الدورات المفعلة عالموقع</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-green-500">
                    <Users size={24} />
                    <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-md">قيد المعالجة</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">
                    {registrations.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-sm text-slate-500">طلبات جديدة بانتظار الموافقة</div>
                </div>
              </div>

              {/* Unified Media Library & Image Manager */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      <BookOpen className="text-brand-primary" size={22} />
                      <span>مكتبة الصور والوسائط الخاصة بكِ (Media Library)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      يمكنكِ التبديل فوراً وعرض مظهر الأستاذة المفضل لديكِ. ارفعي صوراً جديدة من جهازكِ أو اختاري من رسوماتنا وبورتريهاتنا الفاخرة لتفعيلها فوراً.
                    </p>
                  </div>
                </div>

                {/* Grid for Selector and Uploader */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Direct File Drag & Drop */}
                  <div className="lg:col-span-1 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <span className="text-xs text-slate-600 font-bold mb-1 block">رفع صورة جديدة محليًا</span>
                    
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => { e.preventDefault(); setDragActive(false); handleImageUpload(e); }}
                      className={`relative border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center transition-all min-h-[160px] cursor-pointer bg-white ${
                        dragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 hover:border-brand-primary/40'
                      }`}
                      onClick={() => document.getElementById('teacher-image-quick')?.click()}
                    >
                      <input 
                        type="file" 
                        id="teacher-image-quick"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden" 
                      />
                      <Upload className="text-slate-400 mb-2" size={28} />
                      <span className="text-xs font-bold text-slate-800">اسحبي صورة هنا أو تصفحي جهازكِ</span>
                      <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG (سيتم ضغطها تلقائيًا لسرعة تحميل الموقع)</span>

                      {imageUploading && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                          <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                          <span className="text-xs font-semibold text-brand-primary">جاري المعالجة والرفع...</span>
                        </div>
                      )}
                    </div>

                    {imageError && (
                      <p className="text-xs text-red-500 mt-2 font-medium bg-red-50 p-2 rounded-lg border border-red-100">{imageError}</p>
                    )}

                    {/* Active Image Quick Stats */}
                    <div className="pt-2 border-t border-slate-200/60 mt-2">
                      <span className="text-xs text-slate-500 block">الصورة المفعّلة حالياً بالهيدر:</span>
                      <div className="flex items-center gap-3 mt-2 bg-white p-2 rounded-xl border border-slate-200/50">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                          {content.aboutImage ? (
                            <img src={content.aboutImage} alt="Active Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full bg-slate-100" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-800 tracking-tight line-clamp-1">مفعّلة على الواجهة</p>
                          <span className="text-[10px] text-brand-primary font-bold">✓ متصل ومباشر</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Library Items Grid */}
                  <div className="lg:col-span-2 space-y-3">
                    <span className="text-xs text-slate-600 font-bold block">مكتبة الصور المتوفرة لديكِ (تصحّفي واختاري للنشر فوريًا)</span>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[360px] overflow-y-auto pr-1">
                      {(content.mediaGallery || []).map((item: any) => {
                        const isActive = content.aboutImage === item.url;
                        return (
                          <div 
                            key={item.id} 
                            onClick={() => updateContent({ aboutImage: item.url })}
                            className={`group relative rounded-xl border-2 overflow-hidden bg-slate-50 transition-all cursor-pointer ${
                              isActive 
                                ? 'border-brand-primary shadow-md ring-2 ring-brand-primary/10 bg-white' 
                                : 'border-slate-200 hover:border-slate-300 hover:bg-white'
                            }`}
                          >
                            {/* Image aspect-square container */}
                            <div className="aspect-[4/3] relative w-full overflow-hidden flex items-center justify-center bg-slate-100 border-b border-slate-100">
                              <img 
                                src={item.url} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />

                              {/* Active state overlay badge */}
                              {isActive && (
                                <div className="absolute top-2 right-2 bg-brand-primary text-white p-1 rounded-full shadow-md z-10">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              )}

                              {/* Non-default delete button */}
                              {!item.isDefault && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const updated = (content.mediaGallery || []).filter((g: any) => g.id !== item.id);
                                    const newActive = isActive 
                                      ? (updated[0]?.url || '') 
                                      : content.aboutImage;
                                    updateContent({ 
                                      mediaGallery: updated,
                                      aboutImage: newActive
                                    });
                                  }}
                                  className="absolute top-2 left-2 bg-red-500/90 hover:bg-red-650 text-white p-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                  title="حذف الصورة من المكتبة"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>

                            {/* Details */}
                            <div className="p-2 text-right">
                              <p className="text-[11px] font-bold text-slate-800 line-clamp-1" title={item.name}>
                                {item.name}
                              </p>
                              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-100 mt-1">
                                <span className={`text-[9px] font-bold px-1 py-0.2 rounded ${
                                  isActive ? 'text-brand-primary bg-brand-primary/10' : 'text-slate-500 bg-slate-100'
                                }`}>
                                  {isActive ? 'نشطة ومتصلة' : 'معطّلة'}
                                </span>
                                <span className="text-[8px] text-slate-400 font-medium">
                                  {item.isDefault ? "نظامية" : "مرفوعة"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">أحدث طلبات التسجيل</h3>
                </div>
                {registrations.length === 0 ? (
                   <div className="p-8 text-center text-slate-500 text-sm">لا توجد طلبات تسجيل حتى الآن.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm whitespace-nowrap" dir="rtl">
                      <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                          <th className="px-6 py-3 text-right">الاسم</th>
                          <th className="px-6 py-3 text-right">الدورة</th>
                          <th className="px-6 py-3 text-right">التاريخ</th>
                          <th className="px-6 py-3 text-right">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {registrations.slice(0, 5).map(reg => (
                          <tr key={reg.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-medium text-slate-700">{reg.fullName}</td>
                            <td className="px-6 py-4 text-slate-600">{reg.courseSelection}</td>
                            <td className="px-6 py-4 text-slate-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                reg.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {reg.status === 'pending' ? 'انتظار' : reg.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Registrations Tab */}
          {activeTab === 'registrations' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Student Registrations</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                          <th className="px-6 py-4">Contact Details</th>
                          <th className="px-6 py-4">Course Info</th>
                          <th className="px-6 py-4">Message</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {registrations.map(reg => (
                          <tr key={reg.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-800">{reg.fullName} <span className="font-normal text-slate-400 text-xs">({reg.age}yo)</span></div>
                              <div className="text-slate-500 mt-1">{reg.phone}</div>
                              {reg.email && <div className="text-slate-500">{reg.email}</div>}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-brand-primary">{reg.courseSelection}</div>
                              <div className="text-slate-500 mt-1 text-xs uppercase tracking-wide">Level: {reg.englishLevel}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">
                              {reg.message || '-'}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 flex w-fit rounded-full text-xs font-bold ${
                                reg.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                reg.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {reg.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-end gap-2">
                                {reg.status === 'pending' && (
                                  <>
                                    <button onClick={() => updateRegistrationStatus(reg.id, 'accepted')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Accept">
                                      <Check size={16} />
                                    </button>
                                    <button onClick={() => updateRegistrationStatus(reg.id, 'rejected')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Reject">
                                      <X size={16} />
                                    </button>
                                  </>
                                )}
                                <button onClick={() => deleteRegistration(reg.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2" title="Delete">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {registrations.length === 0 && (
                          <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No applications received yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
          )}

          {/* Courses Tab (Simplified CMS Demo) */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-slate-900">Manage Courses</h2>
                 <button className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 flex items-center gap-2">
                   <Plus size={16} /> New Course
                 </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {courses.map((course) => (
                    <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                       <button onClick={() => deleteCourse(course.id)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                         <Trash2 size={18} />
                       </button>
                       <h3 className="text-lg font-bold text-slate-900 mb-4 pr-10">{course.title}</h3>
                       <div className="space-y-2">
                         {course.features.map((f, i) => (
                           <div key={i} className="text-sm text-slate-600 flex items-start gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0"></div>
                             {f}
                           </div>
                         ))}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {/* Content Settings Tab */}
          {activeTab === 'content' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-slate-900">Website Content Editor</h2>
               <p className="text-slate-500 mb-6">Modify the main text elements displayed on your landing page. Changes are saved automatically.</p>
               
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
                 
                 <div className="space-y-4">
                   <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-2">Hero Section</h3>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Headline Text</label>
                     <input 
                       type="text" 
                       value={content.heroTitle}
                       onChange={(e) => updateContent({ heroTitle: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium text-slate-900"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Subheadline Description</label>
                     <textarea 
                       rows={3}
                       value={content.heroSubtitle}
                       onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 resize-none"
                     ></textarea>
                   </div>
                 </div>

                 <div className="space-y-4 pt-6">
                   <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-2">About Section</h3>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">About Title</label>
                     <input 
                       type="text" 
                       value={content.aboutTitle}
                       onChange={(e) => updateContent({ aboutTitle: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium text-slate-900"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">About Description</label>
                     <textarea 
                       rows={4}
                       value={content.aboutText}
                       onChange={(e) => updateContent({ aboutText: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-slate-700 resize-y"
                     ></textarea>
                   </div>
                   <div>
                     <label className="hidden"></label>
                      <div className="space-y-4 pt-2">
                        <label className="block text-sm font-semibold text-slate-800">صورة الأستاذة الحالية والجديدة (Teacher Image Manager)</label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {/* Current Image Preview Column */}
                          <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                            <span className="text-xs text-slate-500 mb-2 font-medium">الصورة الحالية (Preview)</span>
                            <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50 flex items-center justify-center">
                              {content.aboutImage ? (
                                <img 
                                  src={content.aboutImage} 
                                  alt="Amina Preview" 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span className="text-slate-400 text-xs text-center p-2">لا توجد صورة مخصصة</span>
                              )}
                            </div>
                            {content.aboutImage && (
                              <button
                                type="button"
                                onClick={() => updateContent({ aboutImage: '' })}
                                className="mt-3 text-xs text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1.5"
                              >
                                <RefreshCw size={12} />
                                <span>إعادة تعيين للافتراضية</span>
                              </button>
                            )}
                          </div>

                          {/* File Upload Dropzone Column */}
                          <div className="md:col-span-2">
                            <span className="text-xs text-slate-600 font-semibold mb-1 block">تحميل ملف صورة جديد (Direct Upload File)</span>
                            <div 
                              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                              onDragLeave={() => setDragActive(false)}
                              onDrop={(e) => { e.preventDefault(); setDragActive(false); handleImageUpload(e); }}
                              className={`relative border-2 border-dashed rounded-xl p-5 text-center flex flex-col items-center justify-center transition-all ${
                                dragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-200 bg-white hover:border-brand-primary/60'
                              }`}
                            >
                              <input 
                                type="file" 
                                id="teacher-image-file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden" 
                              />
                              <label 
                                htmlFor="teacher-image-file" 
                                className="cursor-pointer flex flex-col items-center justify-center space-y-1 w-full h-full"
                              >
                                <Upload className="text-slate-400 mb-1" size={24} />
                                <span className="text-sm font-medium text-slate-800">اضغط هنا أو اسحب الصورة لرفعها</span>
                                <span className="text-xs text-slate-400">تنسيقات مدعومة: JPG، PNG، JPEG (تحت 10 ميجا)</span>
                              </label>

                              {imageUploading && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
                                  <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                                  <span className="text-xs font-semibold text-brand-primary">جاري تحميل وتحديث الصورة...</span>
                                </div>
                              )}
                            </div>
                            {imageError && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{imageError}</p>
                            )}
                          </div>
                        </div>

                        {/* Direct Url Field */}
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">أو كتابة رابط صورة مباشر (Or Direct URL)</label>
                          <input 
                            type="text" 
                            value={content.aboutImage || ''}
                            onChange={(e) => updateContent({ aboutImage: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-mono text-xs text-slate-800"
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="text-[11px] text-slate-400 mt-0.5">يمكنك أيضاً وضع أي رابط خارجي مباشرة وسيتم عرضه في الصفحة الرئيسية.</p>
                        </div>
                      </div>
                      <div className="hidden">
                     <input 
                       type="text" 
                       value={content.aboutImage || ''}
                       onChange={(e) => updateContent({ aboutImage: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium text-slate-900"
                       placeholder="https://example.com/image.jpg"
                     />
                     <p className="text-xs text-slate-500 mt-1">يمكنك رفع صورة مباشرة أو إدخال عنوان الصورة المباشر في الحقل أدناه ليتم تغيير صورة الأستاذة الحالية على الموقع فوراً.</p></div>
                   </div>
                 </div>
                 
                 <div className="space-y-4 pt-6">
                   <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-2">Contact & Footer</h3>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instagram Link</label>
                        <input 
                          type="text" 
                          value={content.instagramUrl}
                          onChange={(e) => updateContent({ instagramUrl: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-medium text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Location Address</label>
                        <input 
                          type="text" 
                          value={content.contactLocation}
                          onChange={(e) => updateContent({ contactLocation: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-medium text-slate-900"
                        />
                      </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Footer Motivational Quote</label>
                     <input 
                       type="text" 
                       value={content.footerQuote}
                       onChange={(e) => updateContent({ footerQuote: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium text-slate-900"
                     />
                   </div>
                 </div>

               </div>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex justify-between items-center">
                  <span>إعدادات لوحة التحكم</span>
                  <span className="text-sm font-normal text-slate-500">Admin Settings</span>
                </h2>
                
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 max-w-xl">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex justify-between items-center">
                    <span>تغيير كلمة المرور (Change Password)</span>
                    <Settings className="text-slate-400" size={20} />
                  </h3>
                  
                  <form onSubmit={handleChangePassword} className="space-y-5">
                    {passwordError && (
                      <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 text-right font-medium flex items-center justify-between gap-3">
                        <span className="text-left font-mono">⚠️</span>
                        <span>{passwordError}</span>
                      </div>
                    )}
                    
                    {passwordSuccess && (
                      <div className="bg-emerald-50 text-emerald-600 text-sm p-4 rounded-xl border border-emerald-100 text-right font-medium flex items-center justify-between gap-3">
                        <span className="text-left">✓</span>
                        <span>{passwordSuccess}</span>
                      </div>
                    )}

                    <div className="text-right">
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        البريد الإلكتروني الحالي للمسؤول (Admin Email)
                      </label>
                      <input 
                        type="text" 
                        disabled
                        value={auth.currentUser?.email || 'aminaouar6@gmail.com'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-left font-mono text-sm font-medium"
                      />
                    </div>

                    <div className="text-right">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        كلمة المرور الجديدة (New Password)
                      </label>
                      <input 
                        type="password" 
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="أدخل كلمة مرور جديدة جديدة (6 أحرف على الأقل)"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-slate-900 text-left font-medium"
                      />
                    </div>

                    <div className="text-right">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        تأكيد كلمة المرور الجديدة (Confirm New Password)
                      </label>
                      <input 
                        type="password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="أعد كتابة كلمة المرور لتأكيدها"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-slate-900 text-left font-medium"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!!passwordLoading}
                        className="w-full bg-brand-text text-white py-3.5 px-4 rounded-xl font-semibold shadow-sm hover:bg-slate-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                      >
                        {passwordLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{passwordLoading}</span>
                          </>
                        ) : (
                          <span>حفظ كلمة المرور الجديدة</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
