import screen from "@/utils/screen";
import { ReactNode, useEffect, useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface OrbitModalProps {
    isOpen: boolean;
    children: ReactNode;
    style?: ViewStyle;
    innerStyle?: ViewStyle;
    showOverlay?: boolean;
    onClose: () => void;
    overlayBackground?: string;
}

const OrbitModal: React.FC<OrbitModalProps> = ({ ...props }) => {
    const { isOpen, children, style, innerStyle, showOverlay, onClose, overlayBackground } = props;
    const translateY = useSharedValue(screen.height);
    const [visible, setVisible] = useState(isOpen);


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationY > 0) {
                translateY.value = event.translationY;
            }
        })
        .onEnd((event) => {
            if (event.translationY > 100) {
                runOnJS(onClose)(); // Nếu kéo xuống quá 100px, đóng modal
            } else {
                translateY.value = withTiming(0, { duration: 200 }); // Nếu không, bật lại modal
            }
        });

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            translateY.value = withTiming(0, { duration: 300 });
        } else {
            translateY.value = withTiming(screen.height, { duration: 300 }, () => {
                runOnJS(setVisible)(false);
            });
        }
    }, [isOpen]);

    if (!visible) return null;

    return (
        <View
            style={[styles.container, style]}
        >
            {showOverlay &&
                <Pressable
                    style={[StyleSheet.absoluteFill, { backgroundColor: overlayBackground ?? 'rgba(0, 0, 0, 0.6)' }]}
                    onPress={onClose}
                />}
            <GestureDetector gesture={panGesture}>
                <Animated.View
                    style={[
                        {
                            flex: 1,
                            backgroundColor: "white",
                            paddingBlock: 20,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        },
                        animatedStyle,
                        innerStyle
                    ]}
                >
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default OrbitModal;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: "transparent"
    }
})