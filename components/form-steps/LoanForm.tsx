import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NumberInput from "../ui/NumberInput";
import CustomButton from "@/components/ui/CustomButton";
import { GlobalContext } from "@/context/GlobalProvider";
import useFormStep from "@/hooks/useFormStep";

interface LoanFormState {
  monthlyPayment: string;
  interestRate: string;
  reserveAmount: string;
  selectedPeriod: string | null;
}

const LoanForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<LoanFormState>({
      initialState: {
        monthlyPayment: "",
        interestRate: "",
        reserveAmount: "",
        selectedPeriod: null,
      },
      validate: (state) =>
        state.monthlyPayment.trim() !== "" &&
        state.interestRate.trim() !== "" &&
        state.reserveAmount.trim() !== "" &&
        state.selectedPeriod !== null,
      onContinue: () => goToNext(),
    });

  const onPickerChange = (itemValue: any) => {
    setLocalState((prevState) => ({
      ...prevState,
      selectedPeriod: itemValue,
    }));
  };

  const onMonthlyPaymentChange = (value: string) => {
    setLocalState((prevState) => ({ ...prevState, monthlyPayment: value }));
  };
  const onInterestRateChange = (value: string) => {
    setLocalState((prevState) => ({ ...prevState, interestRate: value }));
  };
  const onReserveAmountChange = (value: string) => {
    setLocalState((prevState) => ({ ...prevState, reserveAmount: value }));
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl mb-5">
          We really want you to have the best deal possible. Do you have any
          targets you'd like to meet?
        </Text>
        <View>
          <View className="w-full border border-gray-300 rounded-md">
            <Picker
              selectedValue={localState.selectedPeriod}
              onValueChange={onPickerChange}
            >
              <Picker.Item label="Select Period" value={null} />
              <Picker.Item label="1 Year" value="1 Year" />
              <Picker.Item label="5 Years" value="5 Years" />
              <Picker.Item label="10 Years" value="10 Years" />
              <Picker.Item label="15 Years" value="15 Years" />
              <Picker.Item label="20 Years" value="20 Years" />
            </Picker>
          </View>
          <NumberInput
            label="Monthly Payment"
            value={localState.monthlyPayment}
            onChange={onMonthlyPaymentChange}
          />
          <NumberInput
            label="Rate %"
            value={localState.interestRate}
            onChange={onInterestRateChange}
          />
          <NumberInput
            label="Reserve Amount"
            value={localState.reserveAmount}
            onChange={onReserveAmountChange}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Continue"
        containerStyles="bg-blue-700 w-full py-2 mb-5"
        textStyles="text-white"
        handlePress={handleContinue}
      />
    </View>
  );
};

export default LoanForm;
