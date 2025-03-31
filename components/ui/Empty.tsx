import assets from "@/assets"
import { colors } from "@/constants/Colors"
import screen from "@/utils/screen"
import LottieView from "lottie-react-native"
import { Text, View } from "react-native"

interface EmptyProps {
    children?: React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ ...props }) => {
    const { children } = props;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <LottieView
                loop
                autoPlay
                source={assets.animation.empty}
                style={{ width: screen.width / 2.5, height: screen.width / 2.5 }}
            />
            <Text style={{ fontSize: 16, color: colors.defaultBorder }}>Data is empty!</Text>
            {children}
        </View>
    )
}

export default Empty;