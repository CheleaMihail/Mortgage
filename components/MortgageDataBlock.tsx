import { View, Text } from "react-native";
import React from "react";
import { formatNumberWithCommas } from "@/utils";
import { IMortgageData } from "@/services/types";

interface MortgageDataProps {
  data: IMortgageData;
}

const MortgageDataBlock: React.FC<MortgageDataProps> = ({ data }) => {
  return (
    <View className="border-2 rounded-2xl border-gray-300 px-3 py-4">
      <View className="flex-row justify-between items-center py-3 border-b-2 border-gray-300">
        <Text className="text-gray-500">Property</Text>
        <Text className="font-semibold">{data.propertyType}</Text>
      </View>
      <View className="flex-row justify-between items-center py-3 border-b-2 border-gray-300">
        <Text className="text-gray-500">Amount</Text>
        <Text className="font-semibold">
          {`$${formatNumberWithCommas(data.loanAmount)}`}
        </Text>
      </View>
      <View className="flex-row justify-between items-center py-3 border-b-2 border-gray-300">
        <Text className="text-gray-500">Own situation</Text>
        <Text className="font-semibold">{data.ownSituation}</Text>
      </View>
      <View className="flex-row justify-between items-center py-3 border-gray-300">
        <Text className="text-gray-500">Purchase date</Text>
        <Text className="font-semibold">{data.purchaseDate}</Text>
      </View>
    </View>
  );
};

export default MortgageDataBlock;
