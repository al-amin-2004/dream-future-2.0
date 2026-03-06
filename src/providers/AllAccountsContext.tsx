"use client";

import { IAccount } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AllAccountsContextType {
  allAccounts: IAccount[];
  loading: boolean;
  refreshAllAccounts: () => Promise<void>;
}

const AllAccountsContext = createContext<AllAccountsContextType>({
  allAccounts: [],
  loading: true,
  refreshAllAccounts: async () => {},
});

export const AllAccountsProvider = ({ children }: { children: ReactNode }) => {
  const [allAccounts, setAllAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAllAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accounts", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.ok && Array.isArray(data.accounts)) {
        setAllAccounts(data.accounts);
      } else {
        setAllAccounts([]);
      }
    } catch (err) {
      console.error("fetch all accounts failed", err);
      setAllAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllAccounts();
  }, []);

  return (
    <AllAccountsContext.Provider
      value={{ allAccounts, loading, refreshAllAccounts }}
    >
      {children}
    </AllAccountsContext.Provider>
  );
};

export const useAllAccounts = () => useContext(AllAccountsContext);
