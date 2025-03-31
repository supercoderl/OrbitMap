import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocation = () => {
  const [district, setDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);

      // Get location from previous cache (if it exists)
      const cachedDistrict = await AsyncStorage.getItem("district");
      if (cachedDistrict) {
        setDistrict(cachedDistrict);
        setLoading(false);
      }

      // Request to access gps
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest, // Reduce accuracy to be faster
      });

      const { latitude, longitude } = location.coords;

      // Get district name
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        const districtName = geocode[0].subregion || geocode[0].city;
        if (districtName) {
          setDistrict(districtName);

          // Save cache
          await AsyncStorage.setItem("district", districtName);
        }
      }

      setLoading(false);
    };

    fetchLocation();
  }, []);

  return { district, loading };
};

export default useLocation;
