import { useEffect } from "react";
import { BackHandler } from "react-native";

const useOverrideBackButton = (handler: () => boolean) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handler
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [handler]);
};

export default useOverrideBackButton;
