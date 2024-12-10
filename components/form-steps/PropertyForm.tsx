import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import ChoiceButton from "../ChoiceButton";
import { icons } from "@/constants";
import { PropertyType } from "@/services/types";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";

const PropertyForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("LoanForm must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;

  const handleActionSelect = (property: PropertyType) => {
    setGlobalState((prevState) => ({
      ...prevState,
      property: property,
    }));
  };

  const validateForm = () => {
    return globalState.property !== null;
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
              globalState.property === button.propertyType
                ? "border-blue-600 border-2"
                : "border-gray-300 border"
            }`}
            textStyle="text-[16px]"
            onPress={() => handleActionSelect(button.propertyType)}
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

export default PropertyForm;
