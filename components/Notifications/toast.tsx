import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";

// Create custom toast
export const toastConfig: ToastConfig = {
    customNotification: (
        { text1, text2 }: ToastConfigParams<any>
    ) => (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Ionicons name="notifications" size={24} color="#FFA500" style={{ marginRight: 10 }} />
            <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{text1}</Text>
            </View>
        </View>
    ),
};