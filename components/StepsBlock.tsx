import { View, Text } from "react-native";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const StepsBlock = () => {
  return (
    <View className="mt-4 gap-3">
      <View className="flex-row items-center gap-3">
        <AntDesign name="checkcircle" size={28} color="green" />
        <View>
          <Text className="text-gray-500 font-semibold">STEP 1</Text>
          <Text className="font-semibold text-lg">Document Review</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <FontAwesome5 name="stopwatch" size={30} color="#2b6cb0" />
        <View>
          <Text className="text-gray-500 font-semibold">STEP 2</Text>
          <Text className="font-semibold text-lg">Pending Final Approval</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="w-[28px] h-[28px] rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-xl">3</Text>
        </View>
        <View>
          <Text className="text-gray-500 font-semibold">STEP 3</Text>
          <Text className="font-semibold text-lg text-gray-500">Approved</Text>
        </View>
      </View>
    </View>
  );
};

export default StepsBlock;
