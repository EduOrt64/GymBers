import { login } from "@/app/login/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />


      <Button formAction={login} className="w-full">
        Log in
      </Button>
    </form>
  );
}
