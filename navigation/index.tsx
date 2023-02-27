/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TramScreen from "../screens/TramScreen";
import TrolleyScreen from "../screens/TrolleyScreen";
import BusScreen from "../screens/BusScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Trolley from "../components/Trolley";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Detalii" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createMaterialTopTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Tram"
      screenOptions={{
        tabBarIconStyle: {
          width: 34,
          height: 34,
          padding: 0 
        },
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
      tabBarPosition="bottom"
    >
      <BottomTab.Screen
        name="Tram"
        component={TramScreen}
        options={({ navigation }: RootTabScreenProps<"Tram">) => ({
          title: "Tramvai",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tram" color={color} size={34} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Bus"
        component={BusScreen}
        options={{
          title: "Autobuz",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bus" color={color} size={34} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Trolley"
        component={TrolleyScreen}
        options={{
          title: "Troleibuz",
          tabBarIcon: ({ color }) => <Trolley color={color} size={34} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
