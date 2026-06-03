import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { useAdminStore } from "./admin-store";

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=BeeAdmin";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out admin:", error);
    throw error;
  }
};

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAdminStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        // Map Firebase user to our AdminUser type
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "Admin",
          email: firebaseUser.email || "",
          role: "admin",
          avatar: firebaseUser.photoURL || DEFAULT_AVATAR
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  return { user, loading };
};
