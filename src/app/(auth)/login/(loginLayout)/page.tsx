import { LoginForm } from "@/features/auth/login/components/organisms/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full mx-auto">
      {/* Page Header */}
      <div
        className="text-center mb-8 animate-slide-up"
      >
        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm">
          Please Enter Your Details To Log in
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />
    </div>
  );
};