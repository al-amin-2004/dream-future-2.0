"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IAccount } from "@/types";

interface AccountContextType {
  accounts: IAccount[];
  activeAccount: IAccount | null;
  setActiveAccount: (acc: IAccount) => void;
  loading: boolean;
  refreshAccounts: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType>({
  accounts: [],
  activeAccount: null,
  setActiveAccount: () => {},
  loading: true,
  refreshAccounts: async () => {},
});

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accounts/me", { cache: "no-store" });
      const data = await res.json();

      if (data.ok && Array.isArray(data.accounts)) {
        setAccounts(data.accounts);
        setActiveAccount((prev) => prev ?? data.accounts[0] ?? null);
      } else {
        setAccounts([]);
        setActiveAccount(null);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      setAccounts([]);
      setActiveAccount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      await refreshAccounts();
    };
    loadAccounts();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        activeAccount,
        setActiveAccount,
        loading,
        refreshAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);
