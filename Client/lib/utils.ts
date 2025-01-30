import { MessageResponse } from "@/types";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import * as SecureStore from "expo-secure-store";
import { fetch, FetchRequestInit } from "expo/fetch";

// import { useNavigation } from '@react-navigation/native';
const ERROR_PAGE_URL = "/error"; // Change this to your error page URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher<T>(
  url: string,
  options?: FetchRequestInit,
  addHost = false
): Promise<T> {
  try {
    // const trackerId = await SecureStore.getItemAsync("trackerId");
    // const userId = await SecureStore.getItemAsync("user_id");

    // if (!trackerId || !userId) {
    //   throw new Error("Missing trackerId or userId from SecureStore");
    // }

    // const headers = new Headers(options?.headers || {});
    // headers.set("Cookie", `user_id=${userId}; trackerId=${trackerId};`);

    const modifiedOptions: FetchRequestInit = {
      ...options,
      // headers
    };

    const response = await fetch(url, modifiedOptions);
    if (response.status === 401) {
      // Handle unauthorized error
      console.log("Unauthorized access - redirect to login");
    } else if (response.status === 500) {
      // Redirect to the error page
      // window.location.href = ERROR_PAGE_URL;
      console.log("response", response);
    }

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    throw error;
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const skippedWidgets = [
  "update_all",
  "text_options",
  "text_option_modal",
  "action_options",
];
