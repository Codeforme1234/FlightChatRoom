import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [error, setError] = useState("");
  
  const handleSignup = async () => {
    try {
        const response = await fetch('http:192.168.1.79:5000/api/auth/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, email, password, phoneNumber }),
        });
        const data = await response.json();
        if(!response.ok) {
            setError(data.message);
            return;
        }
        router.push("/screens/WelcomeScreen");
    } catch (error) {
      setError("Failed to register. Please try again");
    }
  }
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      className="flex-1 items-center justify-center px-6 bg-gray-900"
    >
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />

      <Text className="text-white text-4xl font-bold mb-4 tracking-wide">Sign Up 🚀</Text>

      <Text className="text-gray-100 text-lg text-center mb-8 px-4">
        Create an account and start chatting with travelers.
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
          placeholder="Enter your email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="bg-white/40 text-white py-3 px-4 mb-3 rounded-xl border border-gray-500"
        />
        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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

      {/* Signup Button */}
      <TouchableOpacity
        disabled={!nickname.trim() || !email.trim() || !password.trim() || !phoneNumber.trim()}
        onPress={handleSignup}
        className={`w-full max-w-md mt-6 py-3 rounded-xl ${
          nickname.trim() && email.trim() && password.trim() && phoneNumber.trim() ? "bg-green-500" : " bg-green-900 opacity-70"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">Sign Up</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.push("/screens/WelcomeScreen")} className="mt-4">
        <Text className="text-white text-center text-base underline">Already have an account? Login</Text>
      </TouchableOpacity>
      {error && (
        <Text className="text-red-500 mt-2">{error}</Text>
      )}
    </ImageBackground>
  );
}
