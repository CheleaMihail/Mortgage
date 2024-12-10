import { View, Text, ScrollView } from "react-native";
import React from "react";

import ChoiceButton from "../ui/ChoiceButton";
import { icons } from "@/constants";
import { SituationEnum } from "@/services/types";
import CustomButton from "../ui/CustomButton";
import useFormStep from "@/hooks/useFormStep";

interface SituationFormState {
  situation: SituationEnum | null;
}

const SituationForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<SituationFormState>({
      initialState: { situation: null },
      validate: (state) => state.situation !== null,
      onContinue: () => goToNext(),
    });

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
      <ScrollView>
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
                localState.situation === button.situation
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
              textStyle="text-[16px]"
              onPress={() =>
                setLocalState((prevState) => ({
                  ...prevState,
                  situation: button.situation,
                }))
              }
            />
          ))}
        </View>
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

export default SituationForm;
