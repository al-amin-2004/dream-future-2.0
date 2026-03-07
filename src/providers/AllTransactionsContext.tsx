"use client";

import { ITransaction } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransactionsContextType {
  allTransactions: ITransaction[];
  loading: boolean;
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType>({
  allTransactions: [],
  loading: true,
  refreshTransactions: async () => {},
});

export const AllTransactionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTransactions = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/transactions", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.ok && Array.isArray(data.transactions)) {
        setAllTransactions(data.transactions);
      } else {
        setAllTransactions([]);
      }
    } catch (error) {
      console.error("fetch transactions failed:", error);
      setAllTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        allTransactions,
        loading,
        refreshTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useAllTransactions = () => useContext(TransactionsContext);
