import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { icons } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import { GlobalContext } from "@/context/GlobalProvider";
import { fetchMortgageData } from "@/services/api";
import { transformToCamelCase } from "@/services/transformer";
import { IMortgageData } from "@/services/types";
import MortgageDataBlock from "@/components/MortgageDataBlock";
import StepsBlock from "@/components/StepsBlock";

const Mortage = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("MultiStepForm must be used within a GlobalProvider");
  }
  const { setGlobalState } = context;
  const [fetchedData, setFetchedData] = useState<IMortgageData>({
    loanAmount: 0,
    ownSituation: "",
    propertyType: "",
    purchaseDate: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverData = await fetchMortgageData(); // Fetch mock server data
        const transformedData = transformToCamelCase(serverData); // Transform to camelCase
        setFetchedData(transformedData);
      } catch (error) {
        console.error("Error fetching mortgage data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
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
        <View className="flex-row items-center justify-center mb-3">
          <View className="w-[100px] h-[100px] rounded-full">
            <Image
              source={icons.logoIcon}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-3xl font-semibold">Mortages</Text>
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <MortgageDataBlock data={fetchedData} />
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
