import { View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import { sendRecordSignal, uploadAudioFile } from '../api/apiServices';

export default function HomeScreen() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const clear = () => {
        setInputText('');
        setOutputText('');
        setErrorMessage('');
    };

    const startRecording = async () => {
        setRecording(true);
        setLoading(true);
        setErrorMessage('');

        try {
            await sendRecordSignal('start-recording');
            console.log('Recording started!');
        } catch (error) {
            console.error('Error starting recording:', error);
            setErrorMessage('Failed to start recording. Please try again.');
            setRecording(false);
        } finally {
            setLoading(false);
        }
    };

    const stopRecording = async () => {
        setRecording(false);
        setLoading(true);
        setErrorMessage('');
        const filename = 'recording.wav';

        try {
            await sendRecordSignal('stop-recording');
            console.log('Recording stopped!');

            const result = await uploadAudioFile(filename);
            console.log('English Text:', result.englishText);
            console.log('Vietnamese Translation:', result.vietnameseText);

            setInputText(result.englishText || 'No text detected.');
            setOutputText(result.vietnameseText || 'No translation available.');
        } catch (error) {
            console.error('Error stopping recording or uploading file:', error);
            setErrorMessage('Failed to process audio. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-150">
            <SafeAreaView className="flex-1 mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/images/bot.png')} style={{ height: hp(15), width: hp(15) }} />
                </View>

                {/* Text nhận diện từ giọng nói */}
                <View className="space-y-2 mt-3">
                    <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                        English
                    </Text>
                    <View style={{ height: hp(20) }} className="bg-white rounded-2xl p-4">
                        <Text style={{ fontSize: wp(4.5) }} className="font-medium">
                            {inputText || 'Recording to translate.'}
                        </Text>
                    </View>
                </View>

                {/* Kết quả dịch */}
                <View className="space-y-2 flex-1 mt-3">
                    <LanguageSelector />
                    <View style={{ height: hp(20) }} className="bg-white rounded-2xl p-4">
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <Text style={{ fontSize: wp(4.5) }} className="text-emerald-700 font-medium">
                                {outputText || 'Translation will appear here.'}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Thông báo lỗi */}
                {errorMessage ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{errorMessage}</Text>
                ) : null}

                {/* Nút ghi âm và dừng ghi âm */}
                <View className="flex justify-center items-center my-3">
                    {recording ? (
                        <TouchableOpacity onPress={stopRecording}>
                            <Image
                                source={require('../../assets/images/voiceLoading.gif')}
                                className="rounded-full"
                                style={{ height: hp(12), width: hp(12) }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={startRecording}>
                            <Image
                                source={require('../../assets/images/recordingicon.png')}
                                className="rounded-full"
                                style={{ height: hp(12), width: hp(12) }}
                            />
                        </TouchableOpacity>
                    )}
                    {inputText.length > 0 && (
                        <TouchableOpacity
                            onPress={clear}
                            className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
                        >
                            <Text className="text-white font-semibold">Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}
