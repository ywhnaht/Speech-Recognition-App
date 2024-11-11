import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react'
import Features from '../components/features';
import LanguageSelector from '../components/LanguageSelector';

export default function HomeScreen() {
    const [inputText, setInputText] = useState('Hi, My name is Huy. Nice to meet you')
    const [outputText, setoutputText] = useState('Xin chào, tôi là Huy. Rất vui được gặp bạn')
    const [recording, setRecording] = useState(false)
    const [speaking, setSpeaking] = useState(false)

    const clear = () => {
        setInputText('')
        setoutputText('')
    }

    const stopSpeaking = () => {
        setSpeaking(false)
        setRecording(false)
    }

    const startRecording = () => {
        setRecording(true)
        setSpeaking(true)
        
    }
  return (
    <View className="flex-1 bg-slate-150">
        <SafeAreaView className="flex-1 flex mx-5">
            <View className="flex-row justify-center">
                <Image source={require('../../assets/images/bot.png')} style={{height: hp(15), width: hp(15)}} />
            </View>

            {/* chuc nang */}
            <View className="space-y-2 mt-3">
                <Text style={{fontSize: wp(5)}} className="text-gray-700 font-semibold ml-1">
                    English
                </Text>
                <View 
                    style={{height: hp(20)}}
                    className="bg-white rounded-2xl p-4"
                >
                    <Text style={{fontSize: wp(4.5)}} className="font-medium">{inputText}</Text>
                </View>
            </View>
            <View className="space-y-2 flex-1 mt-3">
                <LanguageSelector  />
                <View 
                    style={{height: hp(20)}}
                    className="bg-white rounded-2xl p-4"
                >
                    <Text style={{fontSize: wp(4.5)}} className="text-emerald-700 font-medium">{outputText}</Text>
                </View>
            </View>
            <View className="flex justify-center items-center">
                {
                    recording ? (
                        <TouchableOpacity>
                            <Image 
                                source={require('../../assets/images/voiceLoading.gif')} 
                                className="rounded-full" 
                                style={{height: hp(12), width: hp(12)}} 
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={startRecording}
                        >
                            <Image 
                                source={require('../../assets/images/recordingicon.png')} 
                                className="rounded-full" 
                                style={{height: hp(12), width: hp(12)}} 
                            />
                        </TouchableOpacity>
                    )
                }
                {
                    inputText.length > 0 && (
                        <TouchableOpacity
                            onPress={clear}
                            className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
                        >
                            <Text className="text-white font-semibold">Clear</Text>
                        </TouchableOpacity>
                    ) 
                }
                {
                    speaking && (
                        <TouchableOpacity
                        onPress={stopSpeaking}
                            className="bg-red-400 rounded-3xl p-2 absolute left-10"
                        >
                            <Text className="text-white font-semibold">Stop</Text>
                        </TouchableOpacity>
                    ) 
                }
            </View>
        </SafeAreaView>
    </View>
  )
}