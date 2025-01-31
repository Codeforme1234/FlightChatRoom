import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} 
      className="flex-1 items-center justify-center px-6 bg-gray-900"
    >
  
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />


      <Text className="text-white text-4xl font-bold mb-4 tracking-wide">
        InFlight ✈️
      </Text>
      <Text className="text-gray-100 text-lg text-center mb-8 px-4">
        Connect with fellow travelers before, during, and after your flight.
      </Text>
      <View className="w-full max-w-md">
        <TextInput
          placeholder="Enter your nickname"
          placeholderTextColor="#ddd"
          value={nickname}
          onChangeText={setNickname}
          className="bg-white/40 text-white py-3 px-4 rounded-xl border border-gray-500"
        />
      </View>

      <TouchableOpacity
         disabled={!nickname.trim()}
         onPress={() => router.push(`/screens/FlightSearchScreen?nickname=${nickname}`)}
         className={`w-full max-w-md mt-6 py-3 rounded-xl ${
          nickname.trim() ? "bg-blue-500" : " bg-blue-900 opacity-70"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Get Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
