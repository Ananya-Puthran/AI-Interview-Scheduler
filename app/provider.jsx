"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/services/supabaseClient";

const UserDetailContext = createContext(null);

function Provider({ children }) {
  const [user, setUser] = useState(null);

  const CreateNewUser = async () => {
    try {
      console.log("Checking logged-in user...");

      // Get the currently logged-in Supabase user
      const {
        data: { user: supabaseUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user:", userError);
        return;
      }

      // No user logged in
      if (!supabaseUser) {
        console.log("No user logged in");
        return;
      }

      console.log("Supabase user:", supabaseUser);

      // Check if user already exists in Users table
      const { data: users, error: fetchError } = await supabase
        .from("Users")
        .select("*")
        .eq("email", supabaseUser.email);

      if (fetchError) {
        console.error("Error checking Users table:", fetchError);
        return;
      }

      console.log("Existing users:", users);

      // User doesn't exist
      if (!users || users.length === 0) {
        console.log("Creating new user...");

        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              email: supabaseUser.email,
              name: supabaseUser.user_metadata?.full_name,
              picture: supabaseUser.user_metadata?.avatar_url,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user:", insertError);
          return;
        }

        console.log("New user created:", newUser);

        setUser(newUser);
      } else {
        // User already exists
        console.log("User already exists:", users[0]);

        setUser(users[0]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    // Check user when Provider loads
    CreateNewUser();

    // Listen for login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);

      if (session?.user) {
        CreateNewUser();
      } else {
        setUser(null);
      }
    });

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);

  if (!context) {
    throw new Error("useUser must be used inside Provider");
  }

  return context;
};