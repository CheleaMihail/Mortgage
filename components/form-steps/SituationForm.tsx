import { View, Text, ScrollView } from "react-native";

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
      initialState: { situation: null }, // Default situation to null
      validate: (state) => state.situation !== null, // Ensure a situation is selected
      onContinue: () => goToNext(),
      stepKey: "situationForm",
    });

  const buttonData = [
    {
      situation: SituationEnum.PracticingHospitalist,
      title: "Practicing Hospitalist",
      subtitle: "Practicing Hospitalist with W2",
      image: icons.plus,
      id: 1,
    },
    {
      situation: SituationEnum.ExitingResidency,
      title: "Exiting Residency",
      image: icons.condominiumIcon,
      id: 2,
    },
    {
      situation: SituationEnum.ExitingFollowship,
      title: "Exiting Followship",
      image: icons.people,
      id: 3,
    },
    {
      situation: SituationEnum.SelfEmployedClinician,
      title: "Self-employed Clinician",
      image: icons.person,
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
                  ? "border-lightBlue"
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
        containerStyles="bg-lightBlue w-full py-2 mb-5"
        textStyles="text-white font-semibold"
        handlePress={handleContinue}
      />
    </View>
  );
};

export default SituationForm;
