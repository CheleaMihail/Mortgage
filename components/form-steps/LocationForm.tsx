import { View, Text, TextInput, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import CountryDropdown from "../CountryDropdown";
import { images } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";
import NumberInput from "../ui/NumberInput";

const LocationForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("LoanForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const [country, setCountry] = useState(null);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Initialize local state from global state
  useEffect(() => {
    setZipCode(globalState.zipCode || "");
    setAddress(globalState.address || "");
    setCountry(globalState.country || null);
  }, []);

  const validateForm = () => {
    return zipCode.trim() !== "" && address.trim() !== "" && country !== null;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert("Please fill out all fields.");
      return;
    }

    setGlobalState((prevState: any) => ({
      ...prevState,
      country,
      address,
      zipCode,
    }));
    goToNext();
  };

  return (
    <View className="px-2 w-full flex-1">
      <Text className="font-semibold text-2xl">
        Referring to the home you'd like to buy, where is it located?
      </Text>
      <View className="gap-2 mt-3">
        <CountryDropdown
          selectedCountry={country}
          setSelectedCountry={setCountry}
        />
        <View className="gap-2">
          <Text className="font-semibold text-gray-500">Address</Text>
          <View className="w-full h-[50px] border border-gray-300 rounded-md justify-center">
            <TextInput
              className="text-md"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-gray-500">Zip Code</Text>
          <NumberInput value={zipCode} onChange={setZipCode} max={999999} />
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-gray-500">Location</Text>
          <View className="w-full h-[200px] rounded-3xl">
            <Image
              source={images.map}
              className="w-full h-full rounded-3xl"
              resizeMode="cover"
            />
          </View>
        </View>
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

export default LocationForm;
