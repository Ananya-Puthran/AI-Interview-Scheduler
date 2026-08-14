"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  const CreateNewUser = async () => {
    // Get logged-in user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("No authenticated user found");
      return;
    }

    // Check if user already exists
    const { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    if (error) {
      console.error("Error fetching user:", error);
      return;
    }

    console.log("Users:", Users);

    // If user doesn't exist, create new user
    if (!Users || Users.length === 0) {
      const { data, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name: user.user_metadata?.name,
            email: user.email,
            picture: user.user_metadata?.picture,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating user:", insertError);
        return;
      }

      console.log("New user:", data);
      setUser(data);
      return;
    }

    // User already exists
    setUser(Users[0]);
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  return context;
};