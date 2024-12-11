import { View, Text, ScrollView } from "react-native";

import NumberInput from "../ui/NumberInput";
import { icons } from "@/constants";
import CustomButton from "../ui/CustomButton";
import useFormStep from "@/hooks/useFormStep";

interface GiftFundFormState {
  giftFunds: string;
}

const GiftFundForm = ({ goToNext }: { goToNext: () => void }) => {
  const { localState, setLocalState, handleContinue } =
    useFormStep<GiftFundFormState>({
      initialState: { giftFunds: "0" },
      validate: (state) => state.giftFunds.trim() !== "",
      onContinue: () => goToNext(),
      stepKey: "giftFundForm",
    });

  const onChange = (value: any) => {
    setLocalState((prevState) => ({
      ...prevState,
      giftFunds: value,
    }));
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl">
          Tell us if you have Gift Funds you'd like to use towards your purchase
        </Text>
        <NumberInput
          value={localState.giftFunds}
          onChange={onChange}
          icon={icons.dollarIcon}
          iconStyle="h-[16px] w-[16px]"
        />
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

export default GiftFundForm;
