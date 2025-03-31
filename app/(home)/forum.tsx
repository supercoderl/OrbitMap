import { getPostList } from "@/api/modules/post"
import assets from "@/assets"
import PostCard from "@/components/Cards/post"
import Search from "@/components/Inputs/search"
import NavBar from "@/components/ui/NavBar"
import { colors } from "@/constants/Colors"
import { ActionStatus } from "@/enums"
import { store } from "@/redux"
import { Post } from "@/types"
import screen from "@/utils/screen"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ForumScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const { userInfo } = store.getState().user;

    const onLoad = async () => {
        try {
            setLoading(true);
            const { data } = await getPostList({
                query: { pageSize: 10, pageIndex: 1 },
                searchTerm: "",
                status: ActionStatus.All
            });

            setPosts(data?.items ?? []);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 32 }}>
            <NavBar
                leftNode={
                    <TouchableOpacity style={styles.avatarContainer} onPress={() => router.push('/(profile)')}>
                        <Image
                            source={userInfo ? { uri: userInfo.avatarUrl } : assets.avatar.maithy}
                            style={styles.avatar}
                        />
                        <View style={styles.addBtn}>
                            <Image source={assets.icon.add_black} style={styles.add} />
                        </View>
                    </TouchableOpacity>
                }
                rightNode={
                    <TouchableOpacity>
                        <Image source={assets.icon.gallery_orange} style={styles.gallery} />
                    </TouchableOpacity>
                }
                style={{ gap: 20, paddingHorizontal: 20, position: 'relative', top: 0 }}
            >
                <Search
                    placeholder="Tìm kiếm"
                />
            </NavBar>

            <Image
                source={assets.banner.forum_1}
                style={styles.banner}
                resizeMode="cover"
            />

            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PostCard
                        item={item}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBlock: 9, paddingHorizontal: 18, gap: 15 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onLoad} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'relative'
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: screen.width,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white
    },

    addBtn: {
        width: 18,
        height: 18,
        borderRadius: screen.width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: colors.primary
    },

    add: {
        width: 15,
        height: 15,
        zIndex: 3
    },

    gallery: {
        width: 28,
        height: 28
    },

    banner: {
        width: '100%',
        marginBlock: 9,
    }
})