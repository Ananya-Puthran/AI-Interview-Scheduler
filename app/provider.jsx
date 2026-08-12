"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }) {
  const [user,setUser] = useState(null);
  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      // check if user already exists
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      // if not, create new user
      console.log(Users);

      if (Users?.length === 0) {
        const { data, error } = await supabase
          .from("Users")
          .insert([
            {
              name: user?.user_metadata?.name,
              email: user?.email,
              picture: user?.user_metadata?.picture,
            },
          ]);

        console.log(data);
        setUser(data);
        return;
      }
      setUser(Users[0]);
    });
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return(
  <UserDetailContext.Provider value={{ user, setUser }}>
  <div>{children}</div>
  </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  return context;
} 