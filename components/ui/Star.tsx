import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const StarRating = ({ rate }: { rate: number }) => {
    const fullStars = Math.floor(rate); // Số sao đầy đủ
    const hasHalfStar = rate % 1 >= 0.5; // Kiểm tra có nửa sao không
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số sao rỗng

    return (
        <View style={{ flexDirection: "row" }}>
            {/* Hiển thị sao đầy */}
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <FontAwesome key={index} name="star" size={6.55} color="#FEA74E" />
                ))}

            {/* Hiển thị sao nửa */}
            {hasHalfStar && <FontAwesome name="star-half" size={6.55} color="#FEA74E" />}

            {/* Hiển thị sao rỗng */}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <FontAwesome key={index} name="star-o" size={6.55} color="#FEA74E" />
                ))}
        </View>
    );
};

export default StarRating;
