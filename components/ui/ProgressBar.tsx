//@ts-nocheck
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View className="mb-[20px] mt-1 items-center w-[100%] self-center">
      <View className="w-full h-2 bg-gray-200 rounded-md overflow-hidden">
        <View
          style={{ width: `${progressPercentage}%` }}
          className="h-full bg-lightBlue"
        />
      </View>
    </View>
  );
};
export default ProgressBar;
