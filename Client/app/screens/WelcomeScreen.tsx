import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http:192.168.1.79:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }

      router.push(`/screens/FlightSearchScreen?nickname=${nickname}`)
  } catch (error) {
    setError("Failed to login. Please try again.");
  }
  }
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      className="flex-1 items-center justify-center px-6 bg-gray-900"
    >
      {/* Dark overlay */}
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />

      {/* App Title */}
      <Text className="text-white text-4xl font-bold mb-4 tracking-wide">InFlight ✈️</Text>

      {/* Subtitle */}
      <Text className="text-gray-100 text-lg text-center mb-8 px-4">
        Connect with fellow travelers before, during, and after your flight.
      </Text>

      {/* Input Fields */}
      <View className="w-full max-w-md">
        <TextInput
          placeholder="Enter your nickname"
          placeholderTextColor="#ddd"
          value={nickname}
          onChangeText={setNickname}
          className="bg-white/40 text-white py-3 px-4 mb-3 rounded-xl border border-gray-500"
        />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="bg-white/40 text-white py-3 px-4 rounded-xl border border-gray-500"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        disabled={!nickname.trim() || !password.trim()}
        onPress={handleLogin}
        className={`w-full max-w-md mt-6 py-3 rounded-xl ${
          nickname.trim() && password.trim() ? "bg-blue-500" : " bg-blue-900 opacity-70"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">Login</Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <TouchableOpacity onPress={() => router.push(`/screens/BoardingPassScanner`)} className="mt-4">
        <Text className="text-white text-center text-base underline">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      {error && (
        <Text className="text-red-500 mt-2">{error}</Text>
      )}
    </ImageBackground>
  );
}
