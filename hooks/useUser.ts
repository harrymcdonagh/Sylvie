import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface ApiUser {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

export function useUser() {
  const { status, data: session } = useSession();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(null);
    setError(null);

    if (status === "authenticated" && session?.user.id) {
      setLoading(true);

      fetch(`/api/user?userId=${session.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error fetching user data");
          return res.json();
        })
        .then((data) => {
          setUser({
            id: session.user.id,
            name: data.name,
            email: data.email,
            image: data.image,
            createdAt: data.createdAt,
          });
        })
        .catch((err: Error) => {
          console.error(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [status, session?.user.id]);

  return { user, loading, error };
}
