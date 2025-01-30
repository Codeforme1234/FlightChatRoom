import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {useFonts} from 'expo-font';
import * as SecureStore from 'expo-secure-store';




export default function Index() {
  const [fontsLoaded] = useFonts({
    'Manrope': require('../assets/fonts/Manrope.ttf')
  });


  

  return (
    <SafeAreaView className="h-full w-full flex-1">
    <View className=""
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        ...styles.appFont,
      }}
    >
      
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  appFont: {
    fontFamily: 'Manrope', 
  },
});

