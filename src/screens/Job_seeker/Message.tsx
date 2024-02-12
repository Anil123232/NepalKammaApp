import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import IconIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Conversation from '../GlobalComponents/Conversation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';

interface MessageProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
}

const data = [
  {
    id: 1,
    sellerName: 'John Doe',
    sellerDescription: 'How are you?',
  },
  {
    id: 2,
    sellerName: 'Jane Smith',
    sellerDescription: 'Can you do it?',
  },
  {
    id: 3,
    sellerName: 'Alex Johnson',
    sellerDescription: 'I am fine, and what about you brother?',
  },
  {
    id: 4,
    sellerName: 'Emily Davis',
    sellerDescription: 'Interior Designer',
  },
  {
    id: 5,
    sellerName: 'Chris Anderson',
    sellerDescription: 'Jewelry Craftsman',
  },
  {
    id: 6,
    sellerName: 'Mia Robinson',
    sellerDescription: 'Digital Artist',
  },
  {
    id: 7,
    sellerName: 'David Taylor',
    sellerDescription: 'Industrial Designer',
  },
  {
    id: 8,
    sellerName: 'Sophia Brown',
    sellerDescription: 'Photographer',
  },
  {
    id: 9,
    sellerName: 'Daniel Miller',
    sellerDescription: 'Architect',
  },
  {
    id: 10,
    sellerName: 'Olivia White',
    sellerDescription: 'Textile Designer',
  },
];

const Message = ({navigation}: MessageProps) => {
  return (
    <View className="bg-white">
      <View
        className="w-[95%] flex flex-col"
        style={{padding: responsiveHeight(2)}}>
        {/* back button */}
        <View className="mb-2 flex flex-row justify-between items-center gap-x-2">
          <TouchableOpacity onPress={() => navigation.navigate('Home_bottom')}>
            <IconIcons name="chevron-back-sharp" size={30} color="gray" />
          </TouchableOpacity>
          <View className="flex flex-row items-center gap-x-1">
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              Anil Bhandari
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={25} color="black" />
          </View>
          <Feather name="edit" size={25} color="black" />
        </View>

        {/* message start  */}
        <View className="flex flex-row items-center justify-between">
          <View className="w-[50%] py-3">
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveFontSize(2),
              }}>
              Messages
            </Text>
          </View>
        </View>

        {/* Conversation Start  */}
        <FlatList
          keyExtractor={item => item.id.toString()}
          initialNumToRender={10}
          data={data.slice(0, 10)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Actual_Message', {
                  conversation_id: item.id.toString(),
                })
              }>
              <Conversation data={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(50),
            paddingTop: responsiveHeight(2),
          }}
        />
      </View>
    </View>
  );
};

export default Message;
