import assets from "@/assets";
import { TouchableOpacity, Image } from "react-native"

interface ZeafloCheckboxProps {
    status: boolean;
    onPress?: () => void;
}

const ZeafloCheckbox: React.FC<ZeafloCheckboxProps> = ({ ...props }) => {
    const { status, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={status ? assets.icon.checked : assets.icon.unchecked} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
    )
}

export default ZeafloCheckbox;