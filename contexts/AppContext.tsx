import { ContextProviderProps, ContextProviderValue } from "@/types/context";
import { createContext, useEffect, useState } from "react";

import { User } from "@/types/user";
import { toast } from "sonner";
import { fetchEnhanced } from "@/utils/request";
import useMessage from "@/hooks/useMessage";

export const AppContext = createContext({} as ContextProviderValue);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { showMessage, contextHolder } = useMessage();

  const fetchUserInfo = async () => {
    try {
      const resp = await fetchEnhanced("/api/getUserInfo", { method: "POST" });

      if (resp?.data) {
        if (resp.data) {
          setUser(resp.data);
          return;
        }
      }

      setUser(null);
    } catch (e) {
      setUser(null);
      // toast.error("Get user info failed");
      showMessage.error("Get user info failed");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider value={{ user, fetchUserInfo }}>
      {children}
      {contextHolder}
    </AppContext.Provider>
  );
};
