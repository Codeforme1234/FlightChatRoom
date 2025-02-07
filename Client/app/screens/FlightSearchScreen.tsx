import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { flights } from "../../constants/flights";

export default function FlightSearchScreen() {
  const { nickname } = useGlobalSearchParams();  
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1601754192553-fcc307b7710b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
      className="flex-1 items-center justify-center px-6 bg-gray-900"
    >
    
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />

 
      <Text className="text-white text-3xl font-bold mb-4 tracking-wide">
        Welcome, {nickname}! ✈️
      </Text>


      <Text className="text-gray-300 text-lg text-center mb-6">
        Enter your flight details to find your chatroom.
      </Text>


      <View className="w-full max-w-md">
        <View className="bg-white/20 rounded-xl border border-gray-500 mb-4 overflow-hidden">
          <Picker
            selectedValue={flightNumber}
            onValueChange={(itemValue) => setFlightNumber(itemValue)}
            style={{ color: 'white' }}
            dropdownIconColor="white"
          >
            <Picker.Item label="Select Flight Number" value="" />
            {flights.map((flight) => (
              <Picker.Item
                key={flight.flight_number}
                label={flight.flight_number}
                value={flight.flight_number}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="w-full max-w-md bg-white/20 text-white py-3 px-4 rounded-xl border border-gray-500 mb-4"
      >
        <Text className="text-gray-200 text-center">
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

 
      <TouchableOpacity
        disabled={!flightNumber.trim()}
        onPress={() => router.push(`/screens/ChatRoomScreen?nickname=${nickname}&flightNumber=${flightNumber}&date=${date}`)}
        className={`w-full max-w-md py-3 rounded-xl ${
          flightNumber.trim() ? "bg-blue-500" : "bg-gray-500 opacity-50"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Search Chatroom
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
