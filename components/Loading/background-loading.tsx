import assets from "@/assets"
import { colors } from "@/constants/Colors"
import screen from "@/utils/screen"
import LottieView from "lottie-react-native"
import { StyleSheet, View } from "react-native"

const BackgroundLoading = () => {
    return (
        <View style={[
            { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
            StyleSheet.absoluteFillObject
        ]}
        >
            <LottieView
                source={assets.animation.loading}
                loop
                autoPlay
                style={{ width: screen.width, height: screen.width }}
            />
        </View>
    )
}

export default BackgroundLoading;