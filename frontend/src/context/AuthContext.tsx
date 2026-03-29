import React, { createContext, useContext, ReactNode } from 'react';

export interface OrderHistoryItem {
  orderId: string;
  date: string;
  items: { productId: number; name: string; quantity: number; price: number }[];
  totalAmount: number;
  shippingAddress: Record<string, string>;
}

const AuthContext = createContext<undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
);

export const useAuth = () => useContext(AuthContext);
