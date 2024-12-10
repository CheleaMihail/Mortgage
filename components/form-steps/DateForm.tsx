import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import { GlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";

const DateForm = ({ goToNext }: { goToNext: () => void }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("DateForm must be used within a GlobalProvider");
  }

  const { globalState, setGlobalState } = context;
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    if (globalState.purchaseDate === null) {
      setDate(currentDate);
    } else setDate(globalState.purchaseDate);
  }, []);

  const handleContinue = () => {
    setGlobalState((prevState: any) => ({
      ...prevState,
      purchaseDate: date,
    }));
    goToNext();
  };

  return (
    <View className="px-2 w-full flex-1">
      <ScrollView>
        <Text className="font-semibold text-2xl mb-5">
          When would you like to complete the purchase?
        </Text>
        <DatePicker date={date} setDate={setDate} />
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

export default DateForm;
