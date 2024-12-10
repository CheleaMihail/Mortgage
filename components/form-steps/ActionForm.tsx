import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useFormStep from "@/hooks/useFormStep";
import { ActionType } from "@/services/types";
import CustomButton from "../ui/CustomButton";

interface ActionFormState {
  actionType: ActionType | null;
}

const ActionForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<ActionFormState>({
      initialState: { actionType: null },
      validate: (state) => state.actionType !== null, // Ensure an action is selected
      onContinue: goToNext,
    });

  return (
    <View className="px-2 w-full flex-1">
      <Text className="font-semibold text-2xl">What would you like to do?</Text>
      <View className="flex-1 flex-row justify-center items-start gap-2 mt-3">
        <TouchableOpacity
          className={`flex-[50%] min-h-[100px] rounded-[20px] px-4 py-6 ${
            localState.actionType === ActionType.Buy
              ? "border-2 border-blue-500"
              : "border border-gray-400"
          }`}
          onPress={() =>
            setLocalState((prevState) => ({
              ...prevState,
              actionType: ActionType.Buy,
            }))
          }
        >
          <MaterialCommunityIcons
            name="home-plus-outline"
            size={24}
            color="#2b6cb0"
          />
          <Text className="font-semibold">Buy a new home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-[50%] min-h-[100px] rounded-[20px] px-4 py-6 ${
            localState.actionType === ActionType.Refinance
              ? "border-2 border-blue-500"
              : "border border-gray-400"
          }`}
          onPress={() =>
            setLocalState((prevState) => ({
              ...prevState,
              actionType: ActionType.Refinance,
            }))
          }
        >
          <MaterialCommunityIcons
            name="home-plus-outline"
            size={24}
            color="#2b6cb0"
          />
          <Text className="font-semibold">Refinance my home loan</Text>
        </TouchableOpacity>
      </View>
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
