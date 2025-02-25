
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext, AuthUser } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          firstName: session.user.user_metadata.first_name,
          lastName: session.user.user_metadata.last_name,
        });
      }
      setLoading(false);
    });

    // Listen for changes on auth state (login, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          firstName: session.user.user_metadata.first_name,
          lastName: session.user.user_metadata.last_name,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
