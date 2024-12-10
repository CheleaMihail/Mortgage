import { View, Text } from "react-native";
import React, { useContext } from "react";
import ChoiceButton from "../ChoiceButton";
import { icons } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { SituationEnum } from "@/services/types";
import CustomButton from "../CustomButton";

const SituationForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("SituationForm must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;

  const handleActionSelect = (situation: SituationEnum) => {
    setGlobalState((prevState) => ({
      ...prevState,
      situation: situation,
    }));
  };

  const validateForm = () => {
    return globalState.situation !== null;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }
    goToNext();
  };

  const buttonData = [
    {
      situation: SituationEnum.PracticingHospitalist,
      title: "Practicing Hospitalist",
      subtitle: "Practicing Hospitalist with W2",
      image: icons.pharmacyIcon,
      id: 1,
    },
    {
      situation: SituationEnum.ExitingResidency,
      title: "Exiting Residency",
      image: icons.pharmacyIcon,
      id: 2,
    },
    {
      situation: SituationEnum.ExitingFollowship,
      title: "Exiting Followship",
      image: icons.pharmacyIcon,
      id: 3,
    },
    {
      situation: SituationEnum.SelfEmployedClinician,
      title: "Self-employed Clinician",
      image: icons.pharmacyIcon,
      id: 4,
    },
  ];

  return (
    <View className="px-2 w-full flex-1">
      <Text className="font-semibold text-2xl">
        Next, tell us a little about your own situation.
      </Text>
      <View className="gap-4 mt-3">
        {buttonData.map((button) => (
          <ChoiceButton
            key={button.id}
            title={button.title}
            subtitle={button.subtitle}
            image={button.image}
            imageStyle="h-[32px] w-[32px]"
            containerStyle={`pl-3 h-[60px] border rounded-md gap-4 ${
              globalState.situation === button.situation
                ? "border-blue-600"
                : "border-gray-300"
            }`}
            textStyle="text-[16px]"
            onPress={() => handleActionSelect(button.situation)}
          />
        ))}
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

export default SituationForm;
