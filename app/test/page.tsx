
import getUsers from "@/lib/supabase/data/user";
import Link from "next/link";




export default async function TestPage(){

    const data =await getUsers();
  console.log(data);
  return (
    <div>
    <main className="flex min-h-screen items-center justify-center">
       <Link
        href="/"
        className="absolute left-6 top-6 text-sm text-muted-foreground hover:text-foreground transition"
      >
        ← Back home
      </Link>

      <div>
        
      </div>
    </main>
    </div>
  );
}