import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GlobalContext } from "@/context/GlobalProvider";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  ActionForm,
  BuyForm,
  DateForm,
  GiftFundForm,
  LoanForm,
  LocationForm,
  PropertyForm,
  SituationForm,
} from "@/components/form-steps";
import { router } from "expo-router";

const MultiStepForm = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("MultiStepForm must be used within a GlobalProvider");
  }
  const { globalState, setGlobalState } = context;

  const [index, setIndex] = useState(globalState.formStep);

  useEffect(() => {
    setGlobalState((prevState: any) => ({ ...prevState, formStep: index }));
  }, [index]);

  const go_back = () => {
    if (index > 0) {
      setIndex(index - 1);
      return true;
    }
    return false;
  };

  const goToNext = () => {
    if (index < routes.length - 1) {
      setIndex(index + 1);
    } else {
      router.push("/Mortage");
    }
  };

  const [routes] = useState([
    { key: "step1", title: "Step 1" },
    { key: "step2", title: "Step 2" },
    { key: "step3", title: "Step 3" },
    { key: "step4", title: "Step 4" },
    { key: "step5", title: "Step 5" },
    { key: "step6", title: "Step 6" },
    { key: "step7", title: "Step 7" },
    { key: "step8", title: "Step 8" },
  ]);

  const renderScene = SceneMap({
    step1: () => <ActionForm goToNext={goToNext} />,
    step2: () => <LocationForm goToNext={goToNext} />,
    step3: () => <PropertyForm goToNext={goToNext} />,
    step4: () => <BuyForm goToNext={goToNext} />,
    step5: () => <SituationForm goToNext={goToNext} />,
    step6: () => <DateForm goToNext={goToNext} />,
    step7: () => <LoanForm goToNext={goToNext} />,
    step8: () => <GiftFundForm goToNext={goToNext} />,
  });

  return (
    <SafeAreaView className="bg-white flex-1 px-2">
      {index > 0 && (
        <TouchableOpacity className="mb-3" onPress={go_back}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
      )}

      <ProgressBar currentStep={index + 1} totalSteps={routes.length} />

      <TabView
        renderTabBar={() => null}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={false} // Disable swipe for better button control
      />
    </SafeAreaView>
  );
};

export default MultiStepForm;
