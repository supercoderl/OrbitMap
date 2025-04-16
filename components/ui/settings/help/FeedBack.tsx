import assets from "@/assets"
import OrbitButton from "@/components/Buttons/default"
import { colors } from "@/constants/Colors"
import screen from "@/utils/screen"
import { useRef, useState } from "react"
import { Image, PanResponder, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const FeedBack = () => {
    const [rating, setRating] = useState<number>(0);
    const [feedbackText, setFeedbackText] = useState<string>("");

    const starsContainerRef = useRef<View>(null);
    const [containerX, setContainerX] = useState<number>(0);
    const starWidth = screen.width * 0.1 + 15; // Width of each star + gap

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                // Calculate which star was touched initially
                const touchX = evt.nativeEvent.pageX;
                const relativeX = touchX - containerX;
                
                // Calculate the star index (1-5)
                let newRating = Math.ceil(relativeX / starWidth);
                
                // Ensure rating is within bounds
                if (newRating < 1) newRating = 0;
                if (newRating > 5) newRating = 5;
                
                setRating(newRating);
            },
            onPanResponderMove: (evt) => {
                // Update as finger moves
                const touchX = evt.nativeEvent.pageX;
                const relativeX = touchX - containerX;
                
                let newRating = Math.ceil(relativeX / starWidth);
                
                // Ensure rating is within bounds
                if (newRating < 1) newRating = 0;
                if (newRating > 5) newRating = 5;
                
                setRating(newRating);
            },
            onPanResponderRelease: () => {},
        })
    ).current;

    return (
        <View style={styles.container}>
            <View />
            <View style={{ alignItems: 'center', gap: 10 }}>
                <Text style={styles.title}>How do you feel?</Text>
                <View
                    ref={starsContainerRef}
                    style={styles.starsContainer}
                    onLayout={(event) => {
                        // Get the absolute position of the container
                        starsContainerRef.current?.measureInWindow((x) => {
                            setContainerX(x);
                        });
                    }}
                    {...panResponder.panHandlers}
                >
                    {[1, 2, 3, 4, 5].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setRating(item)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={item <= rating ? assets.icon.fullstar : assets.icon.unstar}
                                style={styles.starImage}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.subTittle}>Your feedback is anonymous</Text>
            </View>
            <View style={styles.feedbackInputContainer}>
                <TextInput
                    placeholder="Write your feedback here..."
                    style={styles.textInput}
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                />
                <OrbitButton
                    text="Confirm feedback"
                    onPress={() => {
                        // Handle submission logic here
                        console.log("Rating:", rating, "Feedback:", feedbackText);
                    }}
                />
            </View>
        </View>
    )
}

export default FeedBack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontFamily: 'LexendSemiBold',
        fontSize: 20,
    },
    subTittle: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.5)',
        fontStyle: 'italic'
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 15,
        marginVertical: 15,
        padding: 10, // Add padding to make it easier to touch
    },
    starImage: {
        width: screen.width * 0.1,
        height: 40,
    },
    feedbackInputContainer: {
        width: '100%',
        gap: 15,
    },
    textInput: {
        height: 50,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
        paddingHorizontal: 15
    }
})