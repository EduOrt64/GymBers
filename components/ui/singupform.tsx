import { signup } from "@/app/signup/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function SignupForm(){
return (
  <form className="space-y-4">
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="Enter your email"
      required
    />

    <Input
      id="password"
      name="password"
      type="password"
      placeholder="Create a password"
      required
    />

    <Button formAction={signup} className="w-full">
      Create account
    </Button>
  </form>
);

}