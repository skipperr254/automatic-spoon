import React, { useState, createContext, useEffect, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: Error | null; data: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null; data: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: {
    full_name?: string;
    avatar_url?: string;
  }) => Promise<{ error: Error | null; data: any }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // listen for auth state change
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: data.user.id, full_name: fullName, email });

      if (profileError) {
        return { error: new Error(profileError.message), data: null };
      }
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (profileData: {
    full_name?: string;
    avatar_url?: string;
  }) => {
    if (!user)
      return { error: new Error("User must be authenticated"), data: null };

    const { error: authError } = await supabase.auth.updateUser({
      data: profileData,
    });

    if (authError) {
      return { error: authError, data: null };
    }

    // update profile in the profiles table
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", user.id)
      .select();

    return { data, error };
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
