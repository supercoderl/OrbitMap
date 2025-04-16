import TabBar from "@/components/Tabs/tab"
import { colors } from "@/constants/Colors";
import { CONTACTS } from "@/data/contact";
import { FAQCATEGORIES, FAQS } from "@/data/faq";
import screen from "@/utils/screen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native"

// Tab component for the top navigation
const CategoryTabs = (
    { categories, activeCategory, onCategoryPress }: {
        categories: string[],
        activeCategory: number,
        onCategoryPress: (index: number) => void
    }
) => {
    return (
        <View style={{ width: '100%' }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            activeCategory === index ? styles.activeTab : styles.inactiveTab
                        ]}
                        onPress={() => onCategoryPress(index)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeCategory === index ? styles.activeTabText : styles.inactiveTabText
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ gap: 15 }}
                style={{ height: 35 }}
            />
        </View>
    );
};

// FAQ Item component
const FaqItem = (
    { question, answer, isOpen, onToggle }: {
        question: string,
        answer: string,
        isOpen: boolean,
        onToggle: () => void
    }
) => {
    return (
        <View style={styles.faqItem}>
            <TouchableOpacity style={styles.questionContainer} onPress={onToggle}>
                <Text style={styles.questionText}>{question}</Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#333"
                />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{answer}</Text>
                </View>
            )}
        </View>
    );
};

const HelpCenter = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openItems, setOpenItems] = useState<any>({});

    const toggleItem = (index: number) => {
        setOpenItems((prev: any) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqContent = (
        <View style={{ flex: 1 }}>
            <CategoryTabs
                categories={FAQCATEGORIES}
                activeCategory={activeCategory}
                onCategoryPress={setActiveCategory}
            />

            <ScrollView style={styles.faqList}>
                {FAQS.map((item, index) => (
                    <FaqItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems[index] || false}
                        onToggle={() => toggleItem(index)}
                    />
                ))}
            </ScrollView>
        </View>
    );

    const contactContent = (
        <ScrollView
            contentContainerStyle={{ gap: 20 }}
        >
            {CONTACTS.map((contact, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.contactButton}
                    onPress={() => { /* Handle contact press */ }}
                >
                    <Image source={contact.icon} style={styles.contactIcon} />
                    <Text style={styles.contactTitle}>{contact.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    return (
        <View style={{ flex: 1 }}>
            <TabBar
                tabs={["FAQs", "Contact Us"]}
                activeTabContent={[faqContent, contactContent]}
            />
        </View>
    )
}

export default HelpCenter;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    contactButton: {
        paddingHorizontal: 15,
        paddingBlock: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        gap: 15
    },

    contactIcon: {
        width: 24,
        height: 24,
    },

    contactTitle: {
        fontSize: 16,
        fontFamily: 'LexendSemiBold'
    },

    tabScrollView: {

    },
    tabContainer: {
        flexDirection: 'row',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        gap: 10
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    inactiveTab: {
        backgroundColor: '#f0f0f0',
    },
    tabText: {
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
    inactiveTabText: {
        color: '#333',
    },
    faqList: {
        flex: 1,
        paddingBlock: 16,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        paddingRight: 8,
    },
    answerContainer: {
        marginTop: 8,
        paddingRight: 20,
    },
    answerText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});