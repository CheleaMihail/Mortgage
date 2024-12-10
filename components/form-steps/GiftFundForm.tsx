import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NumberInput from "../ui/NumberInput";
import { icons } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";

const GiftFundForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("GiftFundForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const [giftFunds, setGiftFunds] = useState("");

  // Initialize local state from global state
  useEffect(() => {
    setGiftFunds(globalState.giftFunds || "0");
  }, []);

  const validateForm = () => {
    return giftFunds.trim() !== "";
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }

    setGlobalState((prevState: any) => ({
      ...prevState,
      giftFunds,
    }));

    goToNext();
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          Tell us if you have Gift Funds you'd like to use towards your purchase
        </Text>
        <NumberInput
          value={giftFunds}
          onChange={setGiftFunds}
          icon={icons.dollarIcon}
          iconStyle="h-[16px] w-[16px]"
        />
      </ScrollView>
      <CustomButton
        title="Continue"
        containerStyles="bg-blue-700 w-full py-2 mt-5"
        textStyles="text-white"
        handlePress={handleContinue}
      />
    </View>
  );
};

export default GiftFundForm;
