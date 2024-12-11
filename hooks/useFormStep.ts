import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalProvider";

interface UseFormStepProps<T> {
  initialState: T;
  validate: (state: T) => boolean;
  onContinue: () => void;
  stepKey: string; // Unique key to store this step's data in global state
}

const useFormStep = <T extends Record<string, any>>({
  initialState,
  validate,
  onContinue,
  stepKey,
}: UseFormStepProps<T>) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useFormStep must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;

  // Initialize local state from global state or fallback to initial state
  const [localState, setLocalState] = useState<T>(
    (globalState[stepKey] as T) || initialState
  );

  const handleContinue = () => {
    if (!validate(localState)) {
      alert("Please fill out all required fields.");
      return;
    }
    //Save current data in global state before continue
    setGlobalState((prevState) => ({
      ...prevState,
      [stepKey]: localState,
    }));
    onContinue(); // Proceed to the next step
  };

  return {
    localState,
    setLocalState,
    handleContinue,
  };
};

export default useFormStep;
