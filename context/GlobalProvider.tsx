// GlobalContext.tsx
import { ActionType, PropertyType, SituationEnum } from "@/services/types";
import React, { createContext, useState, ReactNode } from "react";

interface GlobalState {
  formStep: number;
  actionType: ActionType | null;

  country: string | null;
  address: string;
  zipCode: string;

  property: PropertyType | null;
  situation: SituationEnum | null;

  monthlyPayment: string;
  interestRate: string;
  reserveAmount: string;
  selectedPeriod: null | string;

  purchaseDate: Date | null;

  price: string;
  sliderValue: number;

  giftFunds: string;
}

interface GlobalContextProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    formStep: 0,

    actionType: null,

    country: null,
    address: "",
    zipCode: "",

    property: null,
    situation: null,

    monthlyPayment: "",
    interestRate: "",
    reserveAmount: "",
    selectedPeriod: null,

    price: "0",
    sliderValue: 0,

    purchaseDate: new Date(),
    giftFunds: "0",
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
