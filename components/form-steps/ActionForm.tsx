import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import useFormStep from "@/hooks/useFormStep";
import { ActionType } from "@/services/types";
import CustomButton from "../ui/CustomButton";
import { icons } from "@/constants";

interface ActionFormState {
  actionType: ActionType | null;
}

const ActionForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<ActionFormState>({
      initialState: { actionType: null },
      validate: (state) => state.actionType !== null, // Ensure an action is selected
      onContinue: goToNext,
      stepKey: "actionForm",
    });

  return (
    <View className="px-2 w-full flex-1">
      <Text className="font-semibold text-2xl">
        What would you like to do today?
      </Text>
      <View className="flex-1 flex-row justify-center items-start gap-2 mt-3">
        <TouchableOpacity
          className={`flex-[50%] min-h-[120px] rounded-[20px] px-4 py-6 border ${
            localState.actionType === ActionType.Buy
              ? "border-lightBlue"
              : "border-gray-400"
          }`}
          onPress={() =>
            setLocalState((prevState) => ({
              ...prevState,
              actionType: ActionType.Buy,
            }))
          }
        >
          <Image source={icons.buyIcon} className="w-[32px] h-[32px]" />
          <Text className="font-semibold">Buy a new home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-[50%] min-h-[120px] rounded-[20px] px-4 py-6 border ${
            localState.actionType === ActionType.Refinance
              ? "border-lightBlue"
              : "border-gray-400"
          }`}
          onPress={() =>
            setLocalState((prevState) => ({
              ...prevState,
              actionType: ActionType.Refinance,
            }))
          }
        >
          <Image source={icons.refinanceIcon} className="w-[32px] h-[32px]" />
          <Text className="font-semibold">Refinance my home loan</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        title="Continue"
        containerStyles="bg-lightBlue w-full py-2 mb-5"
        textStyles="text-white font-semibold"
        handlePress={handleContinue}
      />
    </View>
  );
};

export default ActionForm;
