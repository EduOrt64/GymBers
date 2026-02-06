import { SignupForm } from "@/components/ui/singupform";
import { TypographyH2 } from "@/components/tipographyh2";


export default function SingUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md px-4 text-center space-y-6">
       <TypographyH2>
  Get started with your training
</TypographyH2>

<p className="text-muted-foreground">
  Create your account using your email and password.
  You’ll be up and running in just a moment.
</p>

        <SignupForm/>
      </section>
    </main>
  );
}