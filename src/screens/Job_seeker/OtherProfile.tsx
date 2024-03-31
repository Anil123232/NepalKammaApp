import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import IconIcons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {UserStore} from './helper/UserStore';
import {useIsFocused} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Cards from '../GlobalComponents/Cards';
import {useGlobalStore} from '../../global/store';
import {MessageStore} from './helper/MessageStore';
import {useSocket} from '../../contexts/SocketContext';
import OtherScreenLoader from '../GlobalComponents/Loader/OtherScreenLoader';

const OtherProfile = ({navigation, route}: any) => {
  const isFocused = useIsFocused();
  const Mydata: any = useGlobalStore((state: any) => state.user);
  const socket = useSocket();
  const [user, setUser] = React.useState<any>({});
  const [jobs, setJobs] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const handleNextItemPress = (data: any) => {
    var nextIndex = (currentIndex + 1) % data.length;
    if (nextIndex === 5) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  const getSingleUser = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await (UserStore.getState() as any).getSingleUser(id);
      setUser(response?.user);
      setJobs(response?.userJobs);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (isFocused) {
      getSingleUser(route?.params?.id);
    }
  }, [isFocused]);

  // send message handler function
  const sendMessageHandler = async (conversationId: string) => {
    const newValues = {
      conversationId: conversationId,
      msg: `I want to ask you something about your job.`,
      recipientId: user?._id,
    };
    const response = await (MessageStore.getState() as any).createMessage(
      newValues,
    );
    if (response) {
      // getAllConversation();
      // getAllMessages(conversationId);
      console.log(response);
      navigation.navigate('Actual_Message', {
        conversation_id: conversationId,
      });
    }

    //for socket io
    const messageData = {
      sender: Mydata?._id,
      receiver: user?._id,
      message: newValues.msg,
      conversationId: newValues.conversationId,
    };
    socket.emit('textMessage', messageData);
  };

  const createConversation = async () => {
    const newValues = {
      senderId: Mydata?._id,
      receiverId: user?._id,
    };
    const response = await (MessageStore.getState() as any).createConversation(
      newValues,
    );
    if (response) {
      sendMessageHandler(response?.conversation._id.toString());
    }
  };

  // apply job handler function
  const applyJobHandler = () => {
    // setIsApplying(true);
    createConversation();
  };

  return (
    <ScrollView className="bg-white">
      {isLoading ? (
        <OtherScreenLoader />
      ) : (
        <View
          className="w-[100%] flex flex-col"
          style={{padding: responsiveHeight(2)}}>
          {/* back button */}
          <TouchableOpacity onPress={() => navigation.navigate('Home_bottom')}>
            <View className="mb-2 flex flex-row items-center gap-x-2">
              <IconIcons name="arrow-back" size={30} color="gray" />
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(2),
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
          {/* for profile pic and simple details */}
          <View className="flex flex-row gap-x-5 items-center">
            {/* profile pic  */}
            <View>
              {user && user?.profilePic?.url && (
                <Image
                  source={{uri: user?.profilePic?.url}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: '#79AC78',
                  }}
                />
              )}
            </View>
            {/* simple details start */}
            <View
              className="flex flex-col gap-y-2"
              style={{width: responsiveWidth(60)}}>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveHeight(3),
                }}>
                {user?.username}
              </Text>
              <View className="flex flex-row gap-x-1">
                {/* star  */}
                <IconIcons name="star" size={17} color="gray" />
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(2),
                  }}>
                  4.9
                </Text>
              </View>
              {/* bio */}
              <Text
                className="text-black tracking-wide leading-5"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                Creativity will help your dreams to be true!!!
              </Text>
              <View className="flex flex-row gap-x-1">
                <IconIcons name="location-outline" size={17} color="#79AC78" />
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: responsiveHeight(1.75),
                  }}>
                  Damak
                </Text>
              </View>
            </View>
            {/* simple details end  */}
          </View>
          {/* buttons  */}
          <View
            className="flex flex-row items-center justify-between gap-x-2"
            style={{marginTop: responsiveHeight(4)}}>
            <TouchableOpacity onPress={applyJobHandler}>
              <View className="py-2 px-5 bg-color2 rounded-md flex flex-row items-center gap-x-1">
                <Feather name="message-circle" size={17} color="white" />
                <Text
                  className=""
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(1.75),
                    color: 'white',
                  }}>
                  Message
                </Text>
              </View>
            </TouchableOpacity>
            <View className="py-2 px-5 bg-color2 rounded-md flex flex-row items-center gap-x-1">
              <IconIcons name="call-outline" size={17} color="white" />
              <Text
                className=""
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(1.75),
                  color: 'white',
                }}>
                Call
              </Text>
            </View>

            <View className="py-2 px-5 bg-color2 rounded-md flex flex-row items-center gap-x-1">
              <MaterialIcon name="unfold-more" size={17} color="white" />
              <Text
                className=""
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(1.75),
                  color: 'white',
                }}>
                More
              </Text>
            </View>
          </View>
          {/* other details */}
          <View className="mt-6">
            {/* about me  */}
            <View className="flex flex-col gap-y-2">
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveHeight(2),
                }}>
                About me
              </Text>
              <Text
                className="text-black tracking-wide"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                Hi! This is Mahfuj ahmed. 5 years experience in design. Graphic
                designer proficient using Adobe Illustrator and Adobe Photoshop.
                I enjoy creating print-based and web based projects such as
                Logo, Business cards, Flyer, Brochure, Poster, Banner Ads, and
                also UI/UX design. I look forward to working with you....
              </Text>
            </View>
          </View>

          {/* gigs show  */}
          <View
            className="flex flex-col gap-y-2"
            style={{marginTop: responsiveHeight(2)}}>
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              Jobs
            </Text>
            <View>
              {/* gigs card start  */}
              <FlatList
                horizontal={true}
                keyExtractor={item => item._id.toString()}
                // initialNumToRender={2}
                data={jobs?.slice(currentIndex, currentIndex + 1)}
                renderItem={({item}) => (
                  <View style={{width: responsiveWidth(90)}}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        // setSelectedData(item);
                        // handlePresentModalPress();
                      }}>
                      <Cards data={item} user={Mydata} />
                    </TouchableWithoutFeedback>
                  </View>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(2),
                  paddingTop: responsiveHeight(1),
                }}></FlatList>
              <TouchableOpacity
                className="bg-color2 py-2 flex items-center justify-center rounded-md mb-3"
                onPress={() => handleNextItemPress(jobs)}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(2),
                    color: 'white',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default OtherProfile;
