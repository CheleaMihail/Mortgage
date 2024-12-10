import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/ui/CustomButton";

import { images } from "@/constants";

const App = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="min-h-[85vh] w-full justify-center items-center px-4">
        <Image
          source={images.mortgage}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
        />
        <CustomButton
          title="Go to activity"
          handlePress={() => router.push("/MultiStepForm")}
          containerStyles="bg-blue-700 w-full py-2 mt-7"
          textStyles="text-white"
        />
      </View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

export default App;
