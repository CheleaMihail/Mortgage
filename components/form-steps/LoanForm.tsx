import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NumberInput from "../ui/NumberInput";
import CustomButton from "@/components/CustomButton";
import { GlobalContext } from "@/context/GlobalProvider";

const LoanForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("LoanForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [reserveAmount, setReserveAmount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  // Initialize local state from global state
  useEffect(() => {
    setMonthlyPayment(globalState.monthlyPayment || "");
    setInterestRate(globalState.interestRate || "");
    setReserveAmount(globalState.reserveAmount || "");
    setSelectedPeriod(globalState.selectedPeriod || null);
  }, []);

  const validateForm = () => {
    return (
      monthlyPayment.trim() !== "" &&
      interestRate.trim() !== "" &&
      reserveAmount.trim() !== "" &&
      selectedPeriod !== null
    );
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }

    setGlobalState((prevState: any) => ({
      ...prevState,
      monthlyPayment,
      interestRate,
      reserveAmount,
      selectedPeriod,
    }));

    goToNext(); // Call the goToNext function
  };

  return (
    <View className="px-2 w-full flex-1">
      <Text className="font-semibold text-2xl mb-5">
        We really want you to have the best deal possible. Do you have any
        targets you'd like to meet?
      </Text>
      <View>
        <View className="w-full border border-gray-300 rounded-md">
          <Picker
            selectedValue={selectedPeriod}
            onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
          >
            <Picker.Item label="Select Period" value={null} />
            <Picker.Item label="5 Years" value="5 Years" />
            <Picker.Item label="10 Years" value="10 Years" />
            <Picker.Item label="15 Years" value="15 Years" />
          </Picker>
        </View>
        <NumberInput
          label="Monthly Payment"
          value={monthlyPayment}
          onChange={setMonthlyPayment}
        />
        <NumberInput
          label="Rate %"
          value={interestRate}
          onChange={setInterestRate}
        />
        <NumberInput
          label="Reserve Amount"
          value={reserveAmount}
          onChange={setReserveAmount}
        />
      </View>
      <CustomButton
        title="Continue"
        containerStyles="bg-blue-700 w-full py-2 mt-5"
        textStyles="text-white"
        handlePress={handleContinue}
      />
    </View>
  );
};

export default LoanForm;
