import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, type AuthUser } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:5000/api/guest/me", { withCredentials: true })
      .then((response) => {
        if (isMounted) {
          setUser(response.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>;
}
