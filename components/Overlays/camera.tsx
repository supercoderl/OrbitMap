import screen from "@/utils/screen";
import React, { ReactNode } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect, Mask, Defs } from "react-native-svg";

interface CameraOverlayProps {
    overlaySize: number;
    radius: number;
    borderWidth: number;
    children?: ReactNode;
}

const CameraOverlay: React.FC<CameraOverlayProps> = ({ ...props }) => {
    const { overlaySize, radius, borderWidth, children } = props;

    return (
        <View style={styles.container}>
            <Svg height={screen.height} width={screen.width}>
                <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                        {/* Nền trắng để giữ vùng tối */}
                        <Rect width="100%" height="100%" fill="white" />
                        {/* Hình chữ nhật bo góc màu đen => Tạo vùng trong suốt */}
                        <Rect
                            x={(screen.width - overlaySize) / 2}
                            y={(screen.height - overlaySize) / 2}
                            width={overlaySize}
                            height={overlaySize}
                            rx={radius}
                            ry={radius}
                            fill="black"
                        />
                    </Mask>
                </Defs>

                {/* Nền tối với mask */}
                <Rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#mask)" />

                {/* Viền của vùng trong suốt */}
                <Rect
                    x={(screen.width - overlaySize) / 2}
                    y={(screen.height - overlaySize) / 2}
                    width={overlaySize}
                    height={overlaySize}
                    rx={radius}
                    ry={radius}
                    stroke="white"
                    strokeWidth={borderWidth}
                    fill="none"
                />
            </Svg>

            <View style={[styles.childrenContainer, { bottom: (screen.height - overlaySize) / 2 }]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },

    childrenContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Đảm bảo nằm trên cùng
    },
});

export default CameraOverlay;
