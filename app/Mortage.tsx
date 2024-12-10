import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { icons } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import ApiService from "@/services/api";
import { toCamelCase } from "@/services/transformer";
import MortgageDataBlock from "@/components/MortgageDataBlock";
import StepsBlock from "@/components/StepsBlock";
import { IMortgageData } from "@/services/types";
import { GlobalContext } from "@/context/GlobalProvider";

const Mortage = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Mortage must be used within a GlobalProvider");
  }
  const { setGlobalState } = context;

  const [mortgageData, setMortgageData] = useState<IMortgageData | null>(null);
  useEffect(() => {
    const fetchMortgageData = async () => {
      const response = await ApiService.get("/mortgage");

      if (response.status === 200) {
        const transformedData = toCamelCase(response.data);
        setMortgageData(transformedData as IMortgageData);
      } else {
        console.error("Failed to fetch mortgage data:", response.message);
      }
    };

    fetchMortgageData();
  }, []);

  const returnHome = () => {
    router.push("/");
    setGlobalState((prevState: any) => ({ ...prevState, formStep: 0 }));
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-4">
      <ScrollView>
        <TouchableOpacity
          className="mb-3"
          onPress={() => router.push("/MultiStepForm")}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center gap-3 mb-3">
          <Image
            source={icons.logoIcon}
            className=" w-[100px] h-[100px] rounded-full"
            resizeMode="contain"
          />
          <Text className="text-3xl font-semibold">Mortages</Text>
        </View>
        {!mortgageData ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <MortgageDataBlock data={mortgageData} />
            <StepsBlock />
          </>
        )}
      </ScrollView>
      <CustomButton
        title="Talk to your Loan Officer"
        containerStyles="border border-gray-400 w-full mb-2"
        handlePress={() => null}
      />
      <CustomButton
        title="Back to home"
        containerStyles="bg-blue-700 w-full py-2 mb-5"
        textStyles="text-white font-semibold"
        handlePress={returnHome}
      />
    </SafeAreaView>
  );
};

export default Mortage;
