"use client";

import { IRequest } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AllRequestsContextType {
  allRequests: IRequest[];
  loading: boolean;
  refreshRequests: () => Promise<void>;
}

const AllRequestsContext = createContext<AllRequestsContextType>({
  allRequests: [],
  loading: true,
  refreshRequests: async () => {},
});

export const AllRequestsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allRequests, setAllRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.ok && Array.isArray(data.requests)) {
        setAllRequests(data.requests);
      } else {
        setAllRequests([]);
      }
    } catch (error) {
      console.error("fetch requests failed:", error);
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRequests();
  }, []);

  return (
    <AllRequestsContext.Provider
      value={{
        allRequests,
        loading,
        refreshRequests,
      }}
    >
      {children}
    </AllRequestsContext.Provider>
  );
};

export const useAllRequests = () => useContext(AllRequestsContext);
