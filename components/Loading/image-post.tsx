import { colors } from "@/constants/Colors";
import screen from "@/utils/screen";
import { StyleSheet, View } from "react-native";

const ImagePostLoading: React.FC = () => {
    return (
        <View style={[{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: colors.white
        }, StyleSheet.absoluteFill]}>
            <View style={styles.container}>
                <View style={[styles.dateLoading, styles.loadingBase]} />
                <View style={styles.imageContainer}>
                    <View style={[styles.imageLoading, styles.loadingBase]} />
                </View>

                <View style={styles.row}>
                    <View style={[styles.avatarLoading, styles.loadingBase]} />
                    <View style={[styles.textLoading, styles.loadingBase]} />
                </View>
            </View>
        </View>
    );
};

export default ImagePostLoading;

// Add these to your existing styles
const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        gap: 15
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 40,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Loading base style - apply to all loading elements
    loadingBase: {
        backgroundColor: '#E1E9EE',
        borderRadius: 4,
        overflow: 'hidden',
    },

    // Loading specific styles
    dateLoading: {
        width: 80,
        height: 16,
    },

    imageLoading: {
        width: screen.width / 1.43,
        height: screen.width / 1.43,
        borderRadius: 8,
    },

    avatarLoading: {
        width: 36,
        height: 36,
        borderRadius: screen.width,
    },

    textLoading: {
        width: 80,
        height: 16,
        marginLeft: 8,
    },
});