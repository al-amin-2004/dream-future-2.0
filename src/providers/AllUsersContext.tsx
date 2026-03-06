"use client";

import { IUser } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UsersContextType {
  allUsers: IUser[];
  loading: boolean;
  refreshUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType>({
  allUsers: [],
  loading: true,
  refreshUsers: async () => {},
});

export const AllUsersProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.ok) setAllUsers(data.users);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ allUsers, loading, refreshUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(UsersContext);
