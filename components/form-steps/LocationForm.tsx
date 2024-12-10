import { View, Text, TextInput, Image, ScrollView } from "react-native";

import CountryDropdown from "../CountryDropdown";
import { images } from "@/constants";
import CustomButton from "../ui/CustomButton";
import NumberInput from "../ui/NumberInput";
import useFormStep from "@/hooks/useFormStep";

interface LocationFormState {
  country: string | null;
  address: string;
  zipCode: string;
}

const LocationForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<LocationFormState>({
      initialState: {
        country: null,
        address: "",
        zipCode: "",
      },
      validate: (state) =>
        state.zipCode.trim() !== "" &&
        state.address.trim() !== "" &&
        state.country !== null,
      onContinue: () => goToNext(),
    });

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          Referring to the home you'd like to buy, where is it located?
        </Text>
        <View className="gap-2 mt-3">
          <CountryDropdown
            selectedCountry={localState.country}
            setSelectedCountry={(country: string | null) =>
              setLocalState((prevState) => ({ ...prevState, country }))
            }
          />
          <View className="gap-2">
            <Text className="font-semibold text-gray-500">Address</Text>
            <View className="w-full h-[50px] border border-gray-300 rounded-md justify-center">
              <TextInput
                className="text-md"
                value={localState.address}
                onChangeText={(text) =>
                  setLocalState((prevState) => ({
                    ...prevState,
                    address: text,
                  }))
                }
              />
            </View>
          </View>
          <View className="gap-2">
            <Text className="font-semibold text-gray-500">Zip Code</Text>
            <NumberInput
              value={localState.zipCode}
              onChange={(value) =>
                setLocalState((prevState) => ({ ...prevState, zipCode: value }))
              }
              max={999999}
            />
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

export default LocationForm;
