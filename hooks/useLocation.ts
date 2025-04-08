import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useLocation = () => {
  const [district, setDistrict] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchAddressFromOSM = async (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Zeaflo/1.0 (ffv43986@bcooq.com)" // Change the application name
        }
      });
      return response.data;
    } catch (error) {}
  };

  const fetchLocation = async () => {
    try {
      setLoading(true);

      // Request to access gps
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("🚨 GPS permission has been rejected.");
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      setLatitude(latitude);
      setLongitude(longitude);

      // Get district name
      let retries = 3;
      let geocode: any[] = [];
      while (retries > 0) {
        try {
          geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (geocode.length > 0) break;
        } catch (error) {}
        retries--;
        await new Promise((res) => setTimeout(res, 1000)); // Wait 1s before retry
      }

      if (geocode.length > 0) {
        const districtName = geocode[0].subregion || geocode[0].city;
        if (districtName) {
          setDistrict(districtName);

          // Save cache
          await AsyncStorage.setItem("district", districtName);
          return;
        }
      }

      const fetchData = await fetchAddressFromOSM(latitude, longitude);
      if (fetchData) {
        setDistrict(fetchData.address.suburb);
        // Save cache
        await AsyncStorage.setItem("district", fetchData.address.suburb);
      }
    }
    finally {
      setLoading(false);
    }
  };

  const reloadLocation = () => {
    fetchLocation();
  }

  useEffect(() => {
    fetchLocation();
  }, [latitude, longitude]);

  return { district, loading, latitude, longitude, reloadLocation };
};

export default useLocation;
