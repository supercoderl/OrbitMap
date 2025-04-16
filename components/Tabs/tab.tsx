import { colors } from "@/constants/Colors";
import screen from "@/utils/screen";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface TabBarProps {
    tabs: string[];
    activeTabContent: React.ReactNode[]; // Array of components to render for each tab
}

const TabBar: React.FC<TabBarProps> = ({ ...props }) => {
    const { tabs, activeTabContent } = props;
    const [activeTab, setActiveTab] = useState(0);
    const translateX = useSharedValue(0);
    const indicatorTranslateX = useSharedValue(0);

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorTranslateX.value }],
    }));

    const handleTabPress = (index: number) => {
        setActiveTab(index);
        translateX.value = withTiming(-index * (screen.width - 30), { duration: 300 });
        indicatorTranslateX.value = withTiming(index * (screen.width - 30) / tabs.length, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tab,
                            index === activeTab && styles.activeTab
                        ]}
                        onPress={() => handleTabPress(index)}
                    >
                        <Text style={[
                            styles.tabText,
                            index === activeTab && styles.activeTabText
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
                <Animated.View style={[
                    styles.indicator,
                    indicatorStyle,
                    { width: (screen.width / tabs.length) - 15 }
                ]} />
            </View>

            <PanGestureHandler>
                <Animated.View style={[styles.slider, animatedStyle]}>
                    {tabs.map((_, index) => (
                        <View key={index} style={{ width: screen.width - 30, marginTop: 30 }}>
                            {activeTabContent[index]}
                        </View>
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    activeTab: {
        // Additional styling for active tab if needed
    },
    tabText: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'LexendMedium',
    },
    activeTabText: {
        color: colors.primary,
        fontFamily: 'LexendSemiBold',
    },
    indicator: {
        position: 'absolute',
        bottom: -1.5,
        height: 2.5,
        backgroundColor: colors.primary,
    },
    slider: {
        flexDirection: 'row',
        flex: 1,
    },
});