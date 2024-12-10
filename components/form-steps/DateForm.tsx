import { View, Text, ScrollView } from "react-native";

import DatePicker from "../DatePicker";
import CustomButton from "../ui/CustomButton";
import useFormStep from "@/hooks/useFormStep";

interface DateFormState {
  purchaseDate: Date;
}

const DateForm = ({ goToNext }: { goToNext: () => void }) => {
  const currentDate = new Date();

  const { localState, setLocalState, handleContinue } =
    useFormStep<DateFormState>({
      initialState: { purchaseDate: currentDate }, // Default to current date
      validate: (state) => state.purchaseDate !== null, // Ensure a date is selected
      onContinue: () => goToNext(),
    });
  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl mb-5">
          When would you like to complete the purchase?
        </Text>
        <DatePicker
          date={localState.purchaseDate}
          setDate={(date: any) =>
            setLocalState((prevState) => ({ ...prevState, purchaseDate: date }))
          }
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

export default DateForm;
