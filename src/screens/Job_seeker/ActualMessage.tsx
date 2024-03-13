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
import React, {useEffect, useRef} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {MessageStore} from './helper/MessageStore';
import {useGlobalStore} from '../../global/store';
import {ErrorToast} from '../../components/ErrorToast';
import {useIsFocused} from '@react-navigation/native';
import {Linking, Platform} from 'react-native';
import {useSocket} from '../../contexts/SocketContext';
import {formatDistanceToNow} from 'date-fns';
import {useMessageStore} from '../../global/MessageCount';
import MessageLoader from '../GlobalComponents/MessageLoader';

interface ActualMessageProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: {params: {conversation_id: string}};
}

interface User {
  _id: string;
  profilePic: {
    public_id: string;
    url: string;
  };
  username: string;
}

interface Message {
  __v: number;
  _id: string;
  conversationId: string;
  createdAt: string;
  msg: string;
  senderId: string;
  updatedAt: string;
  recipientId: string;
}

interface ApiResponse {
  otheruser: User;
  result: Message[];
}

const ActualMessage = ({navigation, route}: ActualMessageProps) => {
  const isFocused = useIsFocused();
  const socket = useSocket();
  const user = useGlobalStore((state: any) => state.user);
  const [messages, setMessages] = React.useState<ApiResponse[]>([]);
  const [otherUser, setOtherUser] = React.useState<User>({} as User);
  const [message, setMessage] = React.useState<string>('');
  const [arrivalMessage, setArrivalMessage] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const flatListRef = useRef<FlatList>(null);

  // Function to scroll to the bottom of the message list
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await (MessageStore.getState() as any).getAllMessages(
          route.params.conversation_id,
        );
        setMessages(response.result);
        setOtherUser(response.otheruser);
      } catch (error: any) {
        const errorMessage = error
          .toString()
          .replace('[Error: ', '')
          .replace(']', '');
        ErrorToast(errorMessage);
      }
      setIsLoading(false);
    };

    const readAllMessages = async () => {
      try {
        await (MessageStore.getState() as any).readAllMessage(
          route.params.conversation_id,
        );
        useMessageStore.setState(state => ({
          messageCount: 0,
        }));
      } catch (error: any) {
        const errorMessage = error
          .toString()
          .replace('[Error: ', '')
          .replace(']', '');
        ErrorToast(errorMessage);
      }
    };

    const featchUnreadMessageCount = async () => {
      await (useMessageStore.getState() as any).unreadMessageCount();
    };
    if (isFocused && route.params?.conversation_id) {
      featchUnreadMessageCount();
      readAllMessages();
      fetchMessages();
    }
  }, [isFocused, route.params?.conversation_id, message]);

  const sendMessageHandler = async (e: any) => {
    try {
      if (!message) return;
      e.preventDefault();
      const data = {
        conversationId: route.params?.conversation_id,
        msg: message,
        recipientId: otherUser?._id,
      };

      const response = await (MessageStore.getState() as any).createMessage(
        data,
      );
      if (response) {
        setMessage('');
        setMessages(prev => [...prev, response?.messages]);
      }
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }

    //for socket io
    const messageData = {
      sender: user?._id,
      receiver: otherUser?._id,
      message: message,
      conversationId: route.params?.conversation_id,
    };
    socket.emit('textMessage', messageData);
  };

  // phone handler
  const phoneHandler = () => {
    const phoneNumber = '9833035830';
    let phoneNumberWithPrefix = '';

    if (Platform.OS === 'android') {
      phoneNumberWithPrefix = `tel:${phoneNumber}`;
    } else if (Platform.OS === 'ios') {
      phoneNumberWithPrefix = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumberWithPrefix).catch(err =>
      console.error('An error occurred: ', err),
    );
  };

  useEffect(() => {
    const messageListener = ({sender, message}: any) => {
      setArrivalMessage({
        sender: sender,
        msg: message,
      });

      // Append the received message to the messages state
      setMessages((prevMessages: any) => {
        const newMessage = {
          __v: 0,
          _id: Math.random().toString(),
          conversationId: route.params?.conversation_id,
          createdAt: new Date().toISOString(),
          msg: message,
          senderId: sender,
          updatedAt: new Date().toISOString(),
        };

        return [...prevMessages, newMessage];
      });
    };

    socket?.on('textMessageFromBack', messageListener);

    return () => {
      socket?.off('textMessageFromBack', messageListener);
    };
  }, [arrivalMessage, route.params?.conversation_id, socket]);

  return (
    <React.Fragment>
      {isLoading && <MessageLoader />}

      {!isLoading && (
        <View style={styles.container}>
          <View style={styles.header}>
            {/* Header content */}
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <IonIcons name="chevron-back-sharp" size={30} color="gray" />
            </TouchableOpacity>
            <View style={styles.profile}>
              {otherUser?.profilePic?.url && (
                <Image
                  source={{uri: otherUser?.profilePic?.url}}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.profileName} className="text-black">
                {otherUser?.username}
              </Text>
            </View>
            <TouchableOpacity onPress={phoneHandler}>
              <IonIcons name="call" size={30} color="#79AC78" />
            </TouchableOpacity>
          </View>
          <FlatList
            ref={flatListRef}
            onContentSizeChange={scrollToBottom}
            style={styles.messagesContainer}
            keyExtractor={(item, index) => index.toString()}
            data={messages}
            renderItem={({item}) => (
              <Messages data={item} otheruser={otherUser} />
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(5),
              paddingTop: responsiveHeight(2),
            }}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          style={styles.textInput}
          placeholderTextColor={'gray'}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessageHandler}>
          <IonIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const Messages = ({data, otheruser}: any) => {
  const user: any = useGlobalStore((state: any) => state.user);
  const screenWidth = Dimensions.get('window').width;
  const maxWidth = screenWidth * 0.8;

  return (
    <>
      {/* Message content */}
      {data && data?.senderId === user?._id ? (
        <>
          <View style={styles.messageOther} className="w-[100%] flex items-end">
            <View style={styles.messageContent} className="">
              <View
                style={[styles.messageTextContainer, {maxWidth}]}
                className={`bg-color2 flex flex-col gap-y-1 ${
                  data?.msg.length > 38 && 'w-[80%]'
                }`}>
                <Text style={styles.messageText}>{data?.msg}</Text>
                <Text
                  className="text-white"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: responsiveFontSize(1.25),
                  }}>
                  {formatDistanceToNow(new Date(data?.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.message}>
          <View style={styles.messageContent}>
            {otheruser?.profilePic?.url && (
              <Image
                source={{uri: otheruser?.profilePic?.url}}
                style={styles.messageImage}
              />
            )}
            <View
              style={[styles.messageTextContainerMe, {maxWidth}]}
              className={`bg-[#f0f5f8] flex flex-col gap-y-1 ${
                data?.msg.length > 38 && 'w-[80%]'
              }`}>
              <Text style={styles.messageTextMe}>{data?.msg}</Text>
              <Text
                className="text-black "
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveFontSize(1.25),
                }}>
                {formatDistanceToNow(new Date(data?.createdAt), {
                  addSuffix: true,
                })}
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
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
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
  messageOther: {
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
  messageTextContainerMe: {
    borderRadius: 20,
    marginRight: 10,
    padding: 10,
    flexShrink: 1,
  },
  messageTextMe: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.5),
    color: 'black',
  },
  messageText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: responsiveFontSize(1.5),
    color: 'white',
  },
});

export default ActualMessage;
