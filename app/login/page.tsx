import { LoginForm } from "@/components/ui/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md px-4 text-center space-y-6">
        <h1 className="text-3xl font-semibold">
          Please enter your email
        </h1>

        <p className="text-muted-foreground">
          You will receive an email with a link to log in.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
