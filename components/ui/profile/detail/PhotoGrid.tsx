import { View, Image, StyleSheet } from "react-native"

const PhotoGrid = () => {
    return (
        <View style={styles.photosContainer}>
            <View style={styles.photoRow}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1530047139082-5435ca3c4614' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1542027959680-78254484c0f3' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1583308530167-fcd9891ee5a6' }}
                    style={styles.photo}
                />
            </View>
            <View style={styles.photoRow}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1562695580-33ec957ab367' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1569124589354-615739ae007b' }}
                    style={styles.photo}
                />
            </View>
            <View style={styles.photoRow}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1536940385103-c729049165e6' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573575155376-b5010099301a' }}
                    style={styles.photo}
                />
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc' }}
                    style={styles.photo}
                />
            </View>
        </View>
    )
}

export default PhotoGrid;

const styles = StyleSheet.create({
    photosContainer: {
        width: '100%',
    },
    photoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    photo: {
        width: '32%',
        height: 100,
        borderRadius: 10,
    },
})