import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aminaouar6@gmail.com');
  const [password, setPassword] = useState('missaminawebsite');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      // If user doesn't exist or invalid credentials, for this demo we'll try to auto-create it
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/admin');
      } catch (createErr: any) {
        console.error("Firebase Auth Create Error:", createErr);
        console.dir(createErr);
        if (createErr.code === 'auth/email-already-in-use') {
          setError('الحساب موجود مسبقاً، الرجاء التأكد من كلمة المرور القديمة أو استخدام حساب جديد.');
        } else if (createErr.code === 'auth/operation-not-allowed') {
          setError('عذراً، يجب تفعيل تسجيل الدخول بالبريد الإلكتروني من إعدادات Firebase Authentication أولاً.');
        } else {
          setError(`خطأ: ${createErr.message || 'فشل تسجيل الدخول'}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center text-2xl font-bold font-display">
            E
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-display font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to manage your educational platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-xl border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl bg-brand-text px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary transition-colors"
              >
                {loading ? 'Authenticating...' : 'Sign in to Dashboard'}
              </button>
            </div>
            
            <div className="text-xs text-center text-slate-500 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
               Uses Firebase Authentication. First login will create the account automatically.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
