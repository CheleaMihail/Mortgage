import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { icons } from "@/constants";
import Slider from "@react-native-community/slider";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../ui/CustomButton";
import NumberInput from "../ui/NumberInput";
import useFormStep from "@/hooks/useFormStep";

const BuyForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } = useFormStep({
    initialState: { price: "0", sliderValue: 0 },
    validate: (state) => state.price.trim() !== "" && state.sliderValue !== 0,
    onContinue: () => goToNext(),
  });

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          How much do you want to buy your home for?
        </Text>
        <NumberInput
          value={localState.price}
          onChange={(value) =>
            setLocalState((prevState) => ({ ...prevState, price: value }))
          }
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
          value={(
            (parseInt(localState.price) * localState.sliderValue) /
            100
          ).toLocaleString()}
          editable={false}
        />

        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0} // Minimum slider value
          maximumValue={100} // Maximum slider value
          step={1} // Incremental steps
          value={localState.sliderValue} // Current value
          onValueChange={(newValue) =>
            setLocalState((prevState) => ({
              ...prevState,
              sliderValue: Math.round(newValue),
            }))
          } // Update state
          minimumTrackTintColor="#33Cfff" // Active track color
          maximumTrackTintColor="#d3d3d3" // Inactive track color
          thumbTintColor="#33Cfff" // Slider handle color
        />

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500">0%</Text>
          <Text className="text-gray-500">100%</Text>
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

export default BuyForm;
