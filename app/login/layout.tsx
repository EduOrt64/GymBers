import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Back home button */}
      <Link
        href="/"
        className="absolute left-6 top-6 text-sm text-muted-foreground hover:text-foreground transition"
      >
        ← Back home
      </Link>

      {/* Hero content */}
      <section className="w-full max-w-md px-4">
        {children}
      </section>
    </main>
  );
}
