import { View, Text, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react'

export default function Features() {
  return (
    <View style={{height: hp(60)}} className="space-y-4">
      <Text style={{fontSize: wp(6.5)}} className="font-semibold text-gray-700">Features</Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/bot.png')} style={{height: hp(4), width: wp(4)}} />
            <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Chat GPT</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          Chat GPT can provide with instant and knowlegable responses, assist you with creative idea
        </Text>
      </View>

      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/bot.png')} style={{height: hp(4), width: wp(4)}} />
            <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Chat GPT</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          Chat GPT can provide with instant and knowlegable responses, assist you with creative idea
        </Text>
      </View>

      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../assets/images/bot.png')} style={{height: hp(4), width: wp(4)}} />
            <Text style={{fontSize: wp(4.8)}} className="font-semibold text-gray-700">Chat GPT</Text>
        </View>
        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          Chat GPT can provide with instant and knowlegable responses, assist you with creative idea
        </Text>
      </View>
    </View>
  )
}