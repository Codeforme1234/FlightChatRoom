import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";

interface FlightDetails {
  passengerName: string;
  airlineCode: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDate: string;
}

export default function BoardingPassScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleQRCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    const flightDetails = parseBoardingPass(data);

    if (!flightDetails) {
      Alert.alert("Invalid QR Code", "Please scan a valid boarding pass.");
      setScanned(false);
      return;
    }

    console.log("Extracted Flight Details:", flightDetails);
    checkFlightExists(flightDetails);
  };

  const checkFlightExists = async (flightDetails: FlightDetails) => {
    try {
      const response = await fetch("https://your-api.com/check-flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightDetails),
      });

      const data = await response.json();

      if (data.exists) {
        router.push(`/screens/FlightSearchScreen`);
      } else {
        Alert.alert("Flight Not Found", "No chatroom exists for this flight.");
      }
    } catch (error) {
      console.error("Error checking flight:", error);
      Alert.alert("Error", "Could not verify flight.");
    }
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Camera permission denied</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
      />

      {scanned && (
        <TouchableOpacity
          className="absolute bottom-10 bg-blue-500 py-3 px-6 rounded-lg"
          onPress={() => setScanned(false)}
        >
          <Text className="text-white font-semibold text-lg">Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Function to extract details from the boarding pass QR code
const parseBoardingPass = (qrData: string): FlightDetails | null => {
  const match = qrData.match(/M1(.*?) (.{2})(\d{3,4}) (.{3})(.{3})(\d{5})/);

  if (match) {
    return {
      passengerName: match[1],
      airlineCode: match[2],
      flightNumber: match[3],
      departureAirport: match[4],
      arrivalAirport: match[5],
      flightDate: match[6], // Needs conversion from Julian date
    };
  }

  return null;
};
