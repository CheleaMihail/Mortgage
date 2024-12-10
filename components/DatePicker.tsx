import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChoiceButton from "./ChoiceButton";
import { formatDate } from "@/utils";

const DatePicker = ({ date, setDate }: any) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Close picker after iOS selection
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View>
      <Text className="mb-2 text-gray-700">Purchase Date</Text>
      <ChoiceButton
        title={`${formatDate(date)}`}
        containerStyle={`pl-3 h-[60px] border border-gray-300 rounded-md gap-4`}
        textStyle="text-[16px]"
        onPress={showMode}
      />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner" // This makes the picker look like a wheel
          onChange={onChange}
          // maximumDate={new Date()} // Optional: to restrict future dates
        />
      )}
    </View>
  );
};

export default DatePicker;
