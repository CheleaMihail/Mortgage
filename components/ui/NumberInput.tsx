import React from "react";
import { View, TextInput, Text, Image } from "react-native";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  error?: string;
  icon?: any;
  iconStyle?: string;
  editable?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  label,
  icon,
  iconStyle,
  placeholder,
  editable,
}) => {
  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, ""); // Allow only numbers and decimal point
    const numberValue = parseFloat(numericValue);
    if (
      (!min || numberValue >= min) &&
      (!max || numberValue <= max) &&
      numericValue !== ""
    ) {
      onChange(numericValue);
    } else if (numericValue === "") {
      onChange("");
    }
  };

  return (
    <View className="my-2">
      {label && <Text className="text-base text-gray-600 mb-1">{label}</Text>}
      <View
        className={`${
          icon ? "flex-row gap-4 items-center" : ""
        } border border-gray-300 rounded-md px-4 py-2 text-base text-gray-800`}
      >
        {icon && (
          <View className={`${iconStyle}`}>
            <Image
              source={icon}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        )}
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType="numeric"
          className="w-full"
          editable={editable}
        />
      </View>
    </View>
  );
};

export default NumberInput;
