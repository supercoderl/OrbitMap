import InputForgot from "@/components/ui/forgot/InputForgot";
import OTPChecking from "@/components/ui/forgot/OTPChecking";
import ResetPassword from "@/components/ui/forgot/ResetPassword";
import React, { useRef, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import PagerView from "react-native-pager-view";


export default function ForgotScreen() {
    const pagerRef = useRef<PagerView>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const handleTabChange = (index: number) => {
        if (pagerRef.current) {
            setPageIndex(index);
            pagerRef.current.setPage(index);
        } else {
            console.warn("PagerView chưa mount, không thể chuyển trang.");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS === "web" ? (
                <ScrollView
                    horizontal
                    pagingEnabled
                    contentOffset={{ x: pageIndex * 300, y: 0 }}
                    style={{ flex: 1 }}
                >
                    <View key="1" style={{ width: 300, height: "100%" }}>
                        <InputForgot handleTabChange={handleTabChange} />
                    </View>
                    <View key="2" style={{ width: 300, height: "100%" }}>
                        <OTPChecking handleTabChange={handleTabChange} />
                    </View>
                    <View key="3" style={{ width: 300, height: "100%" }}>
                        <ResetPassword handleTabChange={handleTabChange} />
                    </View>
                </ScrollView>
            ) : (
                <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0} scrollEnabled={false}>
                    <View key="1" style={{ flex: 1 }}>
                        <InputForgot handleTabChange={handleTabChange} />
                    </View>
                    <View key="2" style={{ flex: 1 }}>
                        <OTPChecking handleTabChange={handleTabChange} />
                    </View>
                    <View key="3" style={{ flex: 1 }}>
                        <ResetPassword handleTabChange={handleTabChange} />
                    </View>
                </PagerView>
            )}
        </View>
    )
}
