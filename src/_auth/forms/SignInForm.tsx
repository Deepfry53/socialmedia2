import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

// import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignInValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/React-query/quriesAndMutation";
import Loader from "@/components/shared/Loader";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isSigningInUser } = useUserContext();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Queries
  
  const { mutateAsync: signInAccount } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignInValidation>) => {
   
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
 
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign in to your Account 
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome Back! please enter your deatils.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
         
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            { isSigningInUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have a Account
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;