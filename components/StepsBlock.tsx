import { icons } from "@/constants";
import { View, Text, Image } from "react-native";

const StepsBlock = () => {
  return (
    <View className="mt-4 gap-3">
      <View className="flex-row items-center gap-3">
        <Image className="w-[32px] h-[32px]" source={icons.approved} />
        <View>
          <Text className="text-gray-500 font-semibold">STEP 1</Text>
          <Text className="font-semibold text-lg">Document Review</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Image className="w-[32px] h-[32px]" source={icons.pending} />
        <View>
          <Text className="text-gray-500 font-semibold">STEP 2</Text>
          <Text className="font-semibold text-lg">Pending Final Approval</Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="w-[32px] h-[32px] rounded-full bg-gray-300 items-center justify-center">
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
