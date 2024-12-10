import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import React from "react";

interface ChoiceButtonProps {
  title: string;
  subtitle?: string;
  image?: ImageSourcePropType;
  onPress: () => void;
  containerStyle?: string;
  textStyle?: string;
  imageStyle?: string;
}

const ChoiceButton = ({
  title,
  subtitle,
  image,
  onPress,
  containerStyle,
  textStyle,
  imageStyle,
}: ChoiceButtonProps) => {
  return (
    <TouchableOpacity
      className={`w-full flex-row items-center ${containerStyle}`}
      onPress={onPress}
    >
      {image && (
        <View className={`${imageStyle}`}>
          <Image
            source={image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      )}
      <View>
        {title && <Text className={`${textStyle}`}>{title}</Text>}
        {subtitle && (
          <Text className="text-gray-400 text-[12px]">{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChoiceButton;
