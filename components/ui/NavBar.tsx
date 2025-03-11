import { ReactNode } from "react"
import { StyleSheet, View, ViewStyle } from "react-native"

interface NavBarProps {
    leftNode?: ReactNode,
    children: ReactNode,
    rightNode?: ReactNode,
    style?: ViewStyle
}

const NavBar: React.FC<NavBarProps> = ({ ...props }) => {
    const { leftNode, children, rightNode, style } = props;
    return (
        <View style={[styles.container, style]}>
            {leftNode}
            {children}
            {rightNode}
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        top: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,
        width: '100%',
        paddingHorizontal: 15
    }
})