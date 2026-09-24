import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, fonts } from '../styles/theme';

import HomeScreen from '../screens/HomeScreen';
import CompetitionDetailsScreen from '../screens/CompetitionDetailsScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.primary,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontFamily: fonts.semibold },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Feedants' }} />
        {/* The details screen draws its own "Go back" + language header (see ScreenHeader). */}
        <Stack.Screen
          name="CompetitionDetails"
          component={CompetitionDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
