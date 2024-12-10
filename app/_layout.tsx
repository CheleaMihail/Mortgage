import React from "react";
import { Stack } from "expo-router";

import "../global.css";
import { GlobalProvider } from "@/context/GlobalProvider";

const RootLayout = () => {
  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          animation: "none",
          header: () => <></>,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="MultiStepForm" />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
