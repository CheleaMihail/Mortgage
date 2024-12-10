import { View, Text, ScrollView } from "react-native";
import React from "react";

import ChoiceButton from "../ui/ChoiceButton";
import { icons } from "@/constants";
import { PropertyType } from "@/services/types";
import CustomButton from "../ui/CustomButton";
import useFormStep from "@/hooks/useFormStep";

interface PropertyFormState {
  property: PropertyType | null;
}

const PropertyForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<PropertyFormState>({
      initialState: { property: null },
      validate: (state) => state.property !== null,
      onContinue: () => goToNext(),
    });

  const buttonData = [
    {
      propertyType: PropertyType.SingleFamilyHome,
      title: "Single family home",
      image: icons.houseIcon,
      id: 1,
    },
    {
      propertyType: PropertyType.TownHome,
      title: "Town home",
      image: icons.houseIcon,
      id: 2,
    },
    {
      propertyType: PropertyType.Condominium,
      title: "Condominium",
      image: icons.houseIcon,
      id: 3,
    },
    {
      propertyType: PropertyType.Apartment,
      title: "Apartment",
      image: icons.houseIcon,
      id: 4,
    },
    {
      propertyType: PropertyType.Other,
      title: "Other 2-4 unit",
      image: icons.houseIcon,
      id: 5,
    },
  ];

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          What kind of property is it?
        </Text>
        <View className="gap-4 mt-3">
          {buttonData.map((button) => (
            <ChoiceButton
              key={button.id}
              title={button.title}
              image={button.image}
              imageStyle="h-[32px] w-[32px]"
              containerStyle={`pl-3 h-[60px] rounded-md gap-4 ${
                localState.property === button.propertyType
                  ? "border-blue-600 border-2"
                  : "border-gray-300 border"
              }`}
              textStyle="text-[16px]"
              onPress={() =>
                setLocalState((prevState) => ({
                  ...prevState,
                  property: button.propertyType,
                }))
              }
            />
          ))}
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

export default PropertyForm;
