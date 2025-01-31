import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useGlobalSearchParams } from "expo-router";  
import { Entypo, FontAwesome } from "@expo/vector-icons";  
import { useRouter } from "expo-router"; 

export default function ChatRoomScreen() {
  const { nickname, flightNumber, date } = useGlobalSearchParams();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    // Sample chat messages
    { sender: "John", message: "Hey, is this the AA123 chat?" },
    { sender: "Anna", message: "Yes, it is! How's your flight?" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: "You", message }]);
      setMessage(""); 
    }
  };

  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/featured/?airport,travel" }}
      className="flex-1 items-center justify-between px-6 bg-gray-900"
    >
      
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />

     
      <View className="flex-row justify-between items-center w-full py-4">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <Entypo name="chevron-left" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Room details")}
          className="flex-row items-center"
        >
          <FontAwesome name="ellipsis-v" size={24} color="white" />
        </TouchableOpacity>
      </View>

      
      <View className="mb-4 text-center">
        <Text className="text-white text-lg font-semibold">Flight: {flightNumber}</Text>
        <Text className="text-gray-300">{nickname}'s Chatroom</Text>
        <Text className="text-gray-400">{new Date().toDateString()}</Text>
      </View>

      
      <ScrollView className="w-full flex-1 mb-12">
        {chatMessages.map((msg, index) => (
          <View key={index} className="mb-4">
            <Text className="text-white font-semibold">{msg.sender}:</Text>
            <Text className="text-gray-300">{msg.message}</Text>
          </View>
        ))}
      </ScrollView>

     
      <View className="w-full max-w-md flex-row items-center bg-white/20 py-3 px-4 rounded-xl border border-gray-500 mb-6">
        <TextInput
          placeholder="Type your message..."
          placeholderTextColor="#ddd"
          value={message}
          onChangeText={setMessage}
          className="flex-1 bg-transparent text-white"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!message.trim()}
          className={`ml-4 ${message.trim() ? "bg-blue-500" : "bg-gray-500 opacity-50"} p-2 rounded-full`}
        >
          <FontAwesome name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
