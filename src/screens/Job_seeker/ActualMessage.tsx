import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface ActualMessageProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: {params: {conversation_id: string}};
}

const data = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'How are you?',
  },
  {
    id: 2,
    sender: 'Jane Smith',
    message: 'Can you do it?',
  },
  {
    id: 3,
    sender: 'Alex Johnson',
    message: 'I am fine, and what about you brother?',
  },
  {
    id: 4,
    sender: 'Emily Davis',
    message: 'Interior Designer',
  },
  {
    id: 5,
    sender: 'Chris Anderson',
    message: 'Jewelry Craftsman',
  },
  {
    id: 6,
    sender: 'Mia Robinson',
    message: 'Digital Artist',
  },
  {
    id: 7,
    sender: 'David Taylor',
    message: 'Industrial Designer',
  },
  {
    id: 8,
    sender: 'Sophia Brown',
    message: 'Photographer',
  },
  {
    id: 9,
    sender: 'Olivia White',
    message: 'Fashion Designer',
  },
  {
    id: 10,
    sender: 'James Wilson',
    message:
      'I am fine, and what about you brother? asdfhs faskjdfh asdjf sldkfj skldjf klsadfj slkdjf slkdfj klsdjf klsadjf skladjf swdf',
  },
  {
    id: 11,
    sender: 'Emily Davis',
    message: 'Interior Designer',
  },
  {
    id: 12,
    sender: 'Chris Anderson',
    message: 'Jewelry Craftsman',
  },
  {
    id: 13,
    sender: 'Mia Robinson',
    message: 'Digital Artist',
  },
  {
    id: 14,
    sender: 'David Taylor',
    message: 'Industrial Designer',
  },
  {
    id: 15,
    sender: 'Sophia Brown',
    message: 'Photographer',
  },
  {
    id: 16,
    sender: 'Olivia White',
    message: 'Fashion Designer',
  },
  {
    id: 17,
    sender: 'James Wilson',
    message: 'I am fine, and what about you brother?',
  },
  {
    id: 18,
    sender: 'Emily Davis',
    message: 'Interior Designer',
  },
];

const ActualMessage = ({navigation, route}: ActualMessageProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header content */}
        <TouchableOpacity onPress={() => navigation.navigate('Message')}>
          <IonIcons name="chevron-back-sharp" size={30} color="gray" />
        </TouchableOpacity>
        <View style={styles.profile}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/11.jpg'}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName} className="text-black">
            Anil Bhandari
          </Text>
        </View>
        <IonIcons name="information-circle-outline" size={30} color="black" />
      </View>
      <FlatList
        style={styles.messagesContainer}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={({item}) => <Messages data={item} />}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(5),
          paddingTop: responsiveHeight(2),
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          style={styles.textInput}
          placeholderTextColor={'gray'}
          //   value={message}
          //   onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton}>
          <IonIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Messages = ({data}: any) => {
  const screenWidth = Dimensions.get('window').width;
  const maxWidth = screenWidth * 0.8;

  return (
    <>
      {/* Message content */}
      {data && data.sender === 'Emily Davis' ? (
        <>
          <View
            style={{
              padding: responsiveHeight(1.5),
            }}
            className="w-[100%] flex items-end">
            <View style={styles.messageContent} className="">
              <View
                style={[styles.messageTextContainer, {maxWidth}]}
                className={`bg-blue-200 flex flex-col gap-y-1 ${
                  data?.message.length > 38 && 'w-[80%]'
                }`}>
                <Text style={styles.messageText}>{data?.message}</Text>
                <Text
                  className="text-black "
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: responsiveFontSize(1.25),
                  }}>
                  1 min ago
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.message}>
          <View style={styles.messageContent}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/11.jpg'}}
              style={styles.messageImage}
            />
            <View
              style={[styles.messageTextContainer, {maxWidth}]}
              className={`bg-color3 flex flex-col gap-y-1 ${
                data?.message.length > 38 && 'w-[80%]'
              }`}>
              <Text style={styles.messageText}>{data?.message}</Text>
              <Text
                className="text-black "
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveFontSize(1.25),
                }}>
                1 min ago
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    borderRadius: responsiveHeight(5) / 2,
  },
  profileName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: responsiveHeight(2),
    marginLeft: responsiveHeight(1),
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: responsiveHeight(2),
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: 'white',
    paddingHorizontal: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    paddingTop: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
    color: 'gray',
    fontFamily: 'Montserrat-Regular',
    
  },
  sendButton: {
    backgroundColor: '#79AC78',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    flexDirection: 'row',
    paddingHorizontal: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageImage: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    borderRadius: responsiveHeight(5) / 2,
  },
  messageTextContainer: {
    borderRadius: 20,
    marginLeft: 10,
    padding: 10,

    flexShrink: 1,
  },
  messageText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: responsiveFontSize(1.5),
    color: 'black',
  },
});

export default ActualMessage;
