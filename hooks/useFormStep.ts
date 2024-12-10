import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/context/GlobalProvider";

interface UseFormStepProps<T> {
  initialState: T;
  validate: (state: T) => boolean;
  onContinue: (state: T) => void;
}

const useFormStep = <T extends Record<string, any>>({
  initialState,
  validate,
  onContinue,
}: UseFormStepProps<T>) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useFormStep must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;

  const [localState, setLocalState] = useState<T>(initialState);

  // Sync local state with global state on initial render
  useEffect(() => {
    const updatedState = { ...initialState };
    (Object.keys(initialState) as Array<keyof T>).forEach((key) => {
      if (globalState[key] !== undefined) {
        updatedState[key] = globalState[key];
      }
    });
    setLocalState(updatedState);
  }, []);

  const handleContinue = () => {
    if (!validate(localState)) {
      alert("Please fill out all fields.");
      return;
    }

    setGlobalState((prevState: any) => ({
      ...prevState,
      ...localState,
    }));

    onContinue(localState);
  };

  return {
    localState,
    setLocalState,
    handleContinue,
  };
};

export default useFormStep;
