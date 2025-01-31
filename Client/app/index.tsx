import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <ImageBackground
    source={{ uri: "https://plus.unsplash.com/premium_photo-1673657332512-b87806f4f49e?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} 
    className="flex-1 items-center justify-center px-6 bg-gray-900"
  >
    <View className="flex-1 items-center justify-center  px-6">
      <Text className="text-white text-3xl font-bold mb-6">Welcome to InFlight ✈️</Text>
      
      <Link href="/screens/WelcomeScreen" asChild>
        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg mb-4">
          <Text className="text-white text-lg font-semibold">Let's go flying</Text>
        </TouchableOpacity>
      </Link>
    </View>
    </ImageBackground>
  );
}
