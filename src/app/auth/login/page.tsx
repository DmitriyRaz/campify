// app/auth/login/page.tsx
'use client';

import { LoginForm } from '@/domains/auth/components';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <LoginForm />
    </div>
  );
}
