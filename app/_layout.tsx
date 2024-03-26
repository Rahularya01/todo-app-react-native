import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
      }}
    />
  );
};

export default Layout;
