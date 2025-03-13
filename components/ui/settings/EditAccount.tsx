import OrbitButton from "@/components/Buttons/default"
import { StyleSheet, View, Text } from "react-native"

interface EditAccountProps {
  
}

const EditAccount: React.FC<EditAccountProps> = ({ ...props }) => {


    return (
        <View style={{ paddingHorizontal: 15, marginTop: 20, borderRadius: 10, zIndex: 1, gap: 20 }}>
            <View style={[styles.optionContainer, { paddingHorizontal: 15, paddingBlock: 15, gap: 25 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Tên</Text>
                    <Text style={styles.secondText}>Nomads</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>ID</Text>
                    <Text style={styles.secondText}>Nomadsdabezt</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Ngày sinh</Text>
                    <Text style={styles.secondText}>24/2/2000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Bạn bè</Text>
                    <Text style={styles.secondText}>48</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text style={styles.buttonText}>Người dùng bị chặn</Text>
                    <Text style={styles.secondText}>0</Text>
                </View>
            </View>

            <OrbitButton
                text="Chỉnh sửa"
                textStyle={{ fontSize: 20 }}
                onPress={() => {}}
            />
        </View>
    )
}

export default EditAccount;

const styles = StyleSheet.create({
    optionContainer: {
        paddingBlock: 8,
        borderRadius: 10,
        gap: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

    buttonText: {
        fontFamily: 'LexendMedium',
        fontSize: 16,
        flex: 1
    },

    secondText: {
        fontFamily: 'LexendRegular',
        fontSize: 14,
        color: '#A9AAAB'
    }
})