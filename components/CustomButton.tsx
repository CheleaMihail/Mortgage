import { Text, TouchableOpacity } from "react-native";

interface IButtonProps {
  title: string;
  handlePress: any;
  containerStyles?: any;
  textStyles?: any;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}: IButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
