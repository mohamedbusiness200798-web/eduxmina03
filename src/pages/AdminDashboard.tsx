import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS, Registration } from '../contexts/CMSContext';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  Users, BookOpen, Settings, LayoutDashboard, LogOut, 
  Trash2, Edit, Check, X, FileText, Menu, PlaySquare, Plus
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
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'content', label: 'Website Texts', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-brand-text text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-display font-bold text-xl">EduxMina Admin</div>
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
          <div className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded shadow flex items-center justify-center text-sm">E</div>
            Panel
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id 
                    ? 'bg-brand-primary text-white font-medium' 
                    : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Welcome, Miss Amina</h1>
                  <p className="text-slate-500 text-sm mt-1">Here is the summary of your website Activity today.</p>
                </div>
                <a href="/" target="_blank" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium">
                  <PlaySquare size={16} />
                  View Website
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-brand-primary">
                    <Users size={24} />
                    <span className="text-xs font-bold bg-brand-primary/10 px-2 py-1 rounded-md">Total</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">{registrations.length}</div>
                  <div className="text-sm text-slate-500">Student Registrations</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-blue-500">
                     <BookOpen size={24} />
                     <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-md">Active</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">{courses.length}</div>
                  <div className="text-sm text-slate-500">Active Courses</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-green-500">
                    <LayoutDashboard size={24} />
                    <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-md">New</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-slate-900 mb-1">
                    {registrations.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-sm text-slate-500">Pending Approvals</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Recent Registrations</h3>
                </div>
                {registrations.length === 0 ? (
                   <div className="p-8 text-center text-slate-500 text-sm">No registrations yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Course</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Status</th>
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
                                {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
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
                     <label className="block text-sm font-medium text-slate-700 mb-1">About Image URL</label>
                     <input 
                       type="text" 
                       value={content.aboutImage || ''}
                       onChange={(e) => updateContent({ aboutImage: e.target.value })}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary font-medium text-slate-900"
                       placeholder="https://example.com/image.jpg"
                     />
                     <p className="text-xs text-slate-500 mt-1">Paste a link to an image (e.g. from Instagram). Keep empty to use default image.</p>
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
                <h2 className="text-2xl font-bold text-slate-900">Admin Settings</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 text-center text-slate-500">
                  Settings and Profile management would be implemented here.
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
