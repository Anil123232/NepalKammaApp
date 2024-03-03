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
import {MessageStore} from './helper/MessageStore';
import {useIsFocused} from '@react-navigation/native';
import {useGlobalStore} from '../../global/store';

interface MessageProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
}

const Message = ({navigation}: MessageProps) => {
  const isFocused = useIsFocused();
  const user = useGlobalStore((state: any) => state.user);
  const [conversations, setConversations] = React.useState([] as any);

  const getConversations = async () => {
    const response = await (
      MessageStore.getState() as any
    ).getAllConversation();
    setConversations(response?.result);
  };

  React.useEffect(() => {
    if (isFocused) {
      getConversations();
    }
  }, [isFocused]);

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
              {user?.username}
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
          keyExtractor={item => item._id.toString()}
          initialNumToRender={10}
          data={conversations?.slice(0, 10)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                paddingBottom:
                  item.length < 2 ? responsiveHeight(15) : responsiveHeight(1),
              }}
              onPress={() =>
                navigation.navigate('Actual_Message', {
                  conversation_id: item._id.toString(),
                })
              }>
              <Conversation data={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(65),
            paddingTop: responsiveHeight(2),
          }}
          ListEmptyComponent={() => (
            // Render this component when there's no data
            <View style={{paddingBottom: responsiveHeight(25)}}>
              <Text
                className="text-color2"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFontSize(1.75),
                }}>
                No Conversations
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Message;
