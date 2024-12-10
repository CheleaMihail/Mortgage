import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ActionType } from "@/services/types";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";

const ActionForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("LoanForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const handleActionSelect = (action: ActionType) => {
    setGlobalState((prevState) => ({
      ...prevState,
      actionType: action,
    }));
  };

  const validateForm = () => {
    return globalState.actionType !== null;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }
    goToNext();
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          What would you like to do?
        </Text>
        <View className="flex-1 flex-row justify-center items-start gap-2 mt-3">
          <TouchableOpacity
            className={`flex-[50%] min-h-[100px] rounded-[20px] px-4 py-6  ${
              globalState.actionType === ActionType.Buy
                ? "border-2 border-blue-500"
                : "border border-gray-400"
            }`}
            onPress={() => handleActionSelect(ActionType.Buy)}
          >
            <MaterialCommunityIcons
              name="home-plus-outline"
              size={24}
              color="#2b6cb0"
            />
            <Text className="font-semibold">Buy a new home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-[50%] min-h-[100px] rounded-[20px] px-4 py-6  ${
              globalState.actionType === ActionType.Refinance
                ? "border-2 border-blue-500"
                : "border border-gray-400"
            }`}
            onPress={() => handleActionSelect(ActionType.Refinance)}
          >
            <MaterialCommunityIcons
              name="home-plus-outline"
              size={24}
              color="#2b6cb0"
            />
            <Text className="font-semibold">Refinance my home loan</Text>
          </TouchableOpacity>
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

export default ActionForm;
