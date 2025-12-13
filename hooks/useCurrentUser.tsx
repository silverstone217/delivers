"use client";
import { getUser } from "@/actions/authAction";
import { UserType } from "@/types/auth";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const cu = await getUser();
      setUser(cu);
    };

    getCurrentUser();
  }, []);

  return user;
};

export default useCurrentUser;
