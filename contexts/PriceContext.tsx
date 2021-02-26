import { createContext, ReactNode, useEffect, useState } from 'react';
import { config } from '../utils';

interface PriceContextProviderProps {
  children: ReactNode
}

interface Frequency {
  id: number;
  user_id: number;
  day_of_week: number;
  week_of_year: number;
  drank: number;
}

interface User {
  id: number;
  name: string;
  total: number;
  price_of_today: number;
  frequency: Frequency[]
}

interface PriceContextData {
  baseUrl: string;
  isLoading: boolean;
  users: User[];
  priceOfToday: number;
  togglePreloader: (value: boolean) => void;
  togglePrice: (value: boolean) => void;
  loadUsers: () => void;
}

export const PriceContext = createContext({} as PriceContextData);

export function PriceContextProvider({ children }: PriceContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [priceOfToday, setPriceOfToday] = useState(0);
  const baseUrl = config.API_URL;

  function togglePreloader(value) {
    setIsLoading(value);
  }

  function togglePrice(value) {
    setPriceOfToday(value);
  }

  async function loadUsers() {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/users`)
    const users = await res.json()
    setUsers(users);
    setIsLoading(false);
  }

  return (
    <PriceContext.Provider value={{
      baseUrl,
      isLoading,
      priceOfToday,
      users,
      loadUsers,
      togglePreloader,
      togglePrice,
    }}>
        {children}
    </PriceContext.Provider>
  )
}