"use client";

import Image from "next/image";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";

function Login() {
  /**
   * Sign in with Google
   */
  const signInWithGoogle = async () => {
    console.log("Google button clicked");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    console.log("OAuth data:", data);
    console.log("OAuth error:", error);

    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center">
          <Image
            src="/logo2.png"
            alt="AIRecruiter logo"
            width={400}
            height={100}
            className="w-[190px]"
          />
        </div>

        <div className="mt-4 flex flex-col items-center justify-center">
          <Image
            src="/login.jpg"
            alt="Login"
            width={400}
            height={400}
            className="h-[250px] w-[400px] object-cover"
            priority
          />

          <h2 className="mt-4 text-center text-2xl font-bold">
            Welcome to AIRecruiter
          </h2>

          <p className="text-center text-gray-500">
            Sign in with Google authentication
          </p>

          <Button
            className="mt-7 w-full bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;