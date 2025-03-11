import screen from "@/utils/screen";
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"

interface CircleButtonProps {
    icon: any,
    size: number,
    style?: ViewStyle,
    onPress?: () => void | undefined
}

const CircleButton: React.FC<CircleButtonProps> = ({ ...props }) => {
    const { icon, size, style, onPress } = props;

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Image source={icon} style={{ width: size, height: size }} />
        </TouchableOpacity>
    )
}

export default CircleButton;

const styles = StyleSheet.create({
    container: {
        width: 39,
        height: 39,
        borderRadius: screen.width,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
})