import { useState, useContext } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import ApiService from "@/services/api";

interface UseFormStepProps<T> {
  initialState: T;
  validate: (state: T) => boolean;
  onContinue: () => void;
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

  // Submit form to mock API
  const submitForm = async () => {
    try {
      const response = await ApiService.post("/submitForm", globalState); // Send the global state
      if (response.status === 200) {
        console.log("Form submission successful:", response.message);
        console.log("Submitted data:", response.data);
      } else {
        console.error("Form submission failed:", response.message);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  // Continue to the next step, save to global state, and submit the form
  const handleContinue = () => {
    if (!validate(localState)) {
      alert("Please fill out all required fields.");
      return;
    }

    // Save local state to global state
    setGlobalState((prevState: any) => ({
      ...prevState,
      ...localState,
    }));

    // Submit the form data after saving
    submitForm();

    // Call the onContinue function for next step
    onContinue();
  };

  return {
    localState,
    setLocalState,
    handleContinue,
  };
};

export default useFormStep;
