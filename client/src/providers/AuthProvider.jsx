import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user using email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sing in user using email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sing in user using google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (user, name, photo) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetUserPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const handleLogout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  };

  // // observer
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => {
  //     return unsubscribe();
  //   };
  // }, []);

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Get and set Token
      if (currentUser) {
        axios
          .post("http://localhost:5000/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setUser(currentUser);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      return unsubscribe;
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    handleLogout,
    signInWithGoogle,
    updateUserProfile,
    resetUserPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
