import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { icons } from "@/constants";
import Slider from "@react-native-community/slider";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";
import NumberInput from "../ui/NumberInput";

const BuyForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("BuyForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const [price, setPrice] = useState("0");
  const [sliderValue, setSliderValue] = useState(0); // Initial value for the slider

  // Initialize local state from global state
  useEffect(() => {
    setPrice(globalState.price || "0");
    setSliderValue(globalState.sliderValue || 0);
  }, []);

  const validateForm = () => {
    return price.trim() !== "" && sliderValue !== 0;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }

    setGlobalState((prevState: any) => ({
      ...prevState,
      price: price,
      sliderValue: sliderValue,
    }));

    goToNext();
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          How much do you want to buy your home for?
        </Text>
        <NumberInput
          value={price}
          onChange={setPrice}
          min={0}
          icon={icons.dollarIcon}
          iconStyle="h-[16px] w-[16px]"
          editable={true}
        />
        <Text className="font-semibold text-xl mb-2">
          How much down-payment can you put towards buying your home?
        </Text>
        {/* Slider with real-time updates */}
        <NumberInput
          onChange={() => null}
          label="Typically this ranges from 0 to 20%"
          icon={icons.dollarIcon}
          iconStyle="h-[16px] w-[16px]"
          value={((parseInt(price) * sliderValue) / 100).toLocaleString()}
          editable={false}
        />

        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0} // Minimum slider value
          maximumValue={100} // Maximum slider value
          step={1} // Incremental steps
          value={sliderValue} // Current value
          onValueChange={(newValue) => setSliderValue(Math.round(newValue))} // Update state
          minimumTrackTintColor="#1E90FF" // Active track color
          maximumTrackTintColor="#d3d3d3" // Inactive track color
          thumbTintColor="#1E90FF" // Slider handle color
        />

        <View className="flex-row justify-between items-center">
          <Text>0%</Text>
          <Text>100%</Text>
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

export default BuyForm;
