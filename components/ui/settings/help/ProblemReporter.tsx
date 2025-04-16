import assets from '@/assets';
import ZeafloCheckbox from '@/components/Checkboxs/default';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';

const ProblemReportingForm = () => {
    const [qrCode, setQrCode] = useState('');
    const [comment, setComment] = useState('');
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
    const [photoAdded, setPhotoAdded] = useState(false);

    const issues = [
        { id: 'sensor', label: 'Sensor defective' },
        { id: 'flashlight', label: 'Unscrewed flashlight' },
        { id: 'brake', label: 'Brake shoe' },
        { id: 'other', label: 'Other' },
    ];

    const handleIssueSelect = (id: string) => {
        setSelectedIssue(id === selectedIssue ? null : id);
    };

    const handleAddPhoto = () => {
        setPhotoAdded(!photoAdded);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.header}>
                        We will help you as soon as you describe the problem in the paragraphs below.
                    </Text>

                    {/* QR Code Section */}
                    <Text style={styles.sectionLabel}>QR code</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter the number or scan the QR code"
                            value={qrCode}
                            onChangeText={setQrCode}
                        />
                        <TouchableOpacity style={{ marginRight: 12 }}>
                            <Image source={assets.icon.scan_barcode} style={styles.inputIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Photo Upload */}
                    <TouchableOpacity
                        style={styles.photoButton}
                        onPress={handleAddPhoto}
                    >
                        <Image source={assets.icon.add_black} style={styles.inputIcon} />
                        <Text style={styles.photoButtonText}>Add a photo</Text>
                    </TouchableOpacity>
                    <Text style={styles.photoLimit}>
                        Maximum 1 photo with a total size of up to 5 mb
                    </Text>

                    {/* Issue Selection */}
                    <View style={styles.checkboxContainer}>
                        {issues.map((issue) => (
                            <View key={issue.id} style={styles.checkboxRow}>
                                <ZeafloCheckbox
                                    status={selectedIssue === issue.id}
                                    onPress={() => handleIssueSelect(issue.id)}
                                />
                                <Text style={styles.checkboxLabel}>{issue.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Comments */}
                    <Text style={styles.sectionLabel}>Comments</Text>
                    <View style={styles.commentContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Here you can describe the problem in more detail"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            maxLength={140}
                        />
                        <Text style={styles.charCount}>{comment.length}/140</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProblemReportingForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 16,
    },
    formContainer: {
        width: '100%',
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    sectionLabel: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
        position: 'relative',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
        fontSize: 14,
    },
    inputIcon: {
        width: 24,
        height: 24
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 10,
        marginBottom: 8,
        width: '50%',
    },
    photoButtonText: {
        marginLeft: 8,
        fontSize: 14,
    },
    photoLimit: {
        fontSize: 12,
        color: '#999',
        marginBottom: 16,
    },
    checkboxContainer: {
        marginBottom: 16,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkboxLabel: {
        fontSize: 14,
        marginLeft: 8,
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
        height: 100,
        position: 'relative',
    },
    commentInput: {
        flex: 1,
        padding: 12,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        fontSize: 12,
        color: '#999',
    },
});