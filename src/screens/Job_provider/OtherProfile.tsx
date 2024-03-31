import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IconIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Cards from '../GlobalComponents/Cards';
import Review from '../GlobalComponents/Review';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigator';
import {initialGigData, GigData, getJobProps} from './Home';
import {FetchGigStore} from './helper/FetchGigStore';
import {UserStore} from '../Job_seeker/helper/UserStore';
import OtherScreenLoader from '../GlobalComponents/Loader/OtherScreenLoader';
import {MessageStore} from '../Job_seeker/helper/MessageStore';
import {useGlobalStore} from '../../global/store';
import {useSocket} from '../../contexts/SocketContext';

interface OtherProfileProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: RouteProp<BottomStackParamsList, 'Peoples'>;
}

const Loader = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <OtherScreenLoader />
  </View>
);

const OtherProfile = ({navigation, route}: OtherProfileProps) => {
  const id = route?.params.id;
  const isFocused = useIsFocused();
  const Mydata: any = useGlobalStore((state: any) => state.user);
  const socket = useSocket();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gigDetails, setgigDetails] = React.useState<GigData>(initialGigData);
  const [user, setUser] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleNextItemPress = (data: any) => {
    var nextIndex = (currentIndex + 1) % data.length;
    if (nextIndex === 5) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  //get all job details
  const getGigDetails = async () => {
    const response = await (FetchGigStore.getState() as getJobProps).getGig();
    setgigDetails(response);
  };

  React.useEffect(() => {
    getGigDetails();
  }, []);

  const getSingleUser = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await (UserStore.getState() as any).getSingleUser(id);
      setUser(response?.user);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getGigDetails();
        await getSingleUser(route?.params?.id);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    if (id && isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const backPressHandler = () => {
    setUser({});
    navigation.navigate('Peoples', {
      id: '',
    });
  };

  // send message handler function
  const sendMessageHandler = async (conversationId: string) => {
    const newValues = {
      conversationId: conversationId,
      msg: `I want to ask you something about your gig.`,
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

  if (isLoading || Object.keys(user).length === 0) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white">
      <View
        className="w-[100%] flex flex-col"
        style={{padding: responsiveHeight(2)}}>
        {/* back button */}
        <TouchableOpacity onPress={backPressHandler}>
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
            {user && user?.profilePic && (
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
              {user?.bio}
            </Text>
            <View className="flex flex-row gap-x-1">
              <IconIcons name="location-outline" size={17} color="#79AC78" />
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                {user?.location}
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
              {user?.about_me}
            </Text>
          </View>
          {/* skills  */}
          <View className="mt-6">
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              Skills
            </Text>
            <View>
              <View style={{padding: responsiveHeight(1)}}>
                <FlatList
                  horizontal={true}
                  data={user?.skills}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{marginBottom: responsiveHeight(1)}}
                        className="bg-gray-300 mr-2 py-1 px-2 rounded-md">
                        <Text
                          className="text-black"
                          style={{
                            fontSize: responsiveFontSize(1.75),
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        {/* gigs show  */}
        <View className="flex flex-col gap-y-2">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveHeight(2),
            }}>
            My Gigs
          </Text>
          <View>
            {/* gigs card start  */}
            <FlatList
              horizontal={true}
              keyExtractor={item => item._id.toString()}
              // initialNumToRender={2}
              data={gigDetails?.gig?.slice(currentIndex, currentIndex + 1)}
              renderItem={({item}) => (
                <View style={{width: responsiveWidth(90)}}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      // setSelectedData(item);
                      // handlePresentModalPress();
                    }}>
                    <Cards data={item} />
                  </TouchableWithoutFeedback>
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(2),
                paddingTop: responsiveHeight(2),
              }}></FlatList>
            <TouchableOpacity
              className="bg-color2 py-2 flex items-center justify-center rounded-md mb-3"
              onPress={() => handleNextItemPress(gigDetails?.gig)}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(2),
                  color: 'white',
                }}>
                Next
              </Text>
            </TouchableOpacity>
            {/* gits card end  */}
          </View>
          {/* review start  */}
          <View className="flex flex-col">
            <Text
              className="text-black mb-3"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveFontSize(2),
              }}>
              Reviews
            </Text>
            {/* make a line */}
            <View
              className="mb-3"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />
            <View className="flex flex-col gap-y-4">
              {/* for one card start  */}
              <View>
                <Review />
              </View>
              {/* for one card end  */}
              {/* make a line */}
              <View
                className="mb-3"
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                }}
              />
              {/* for one card start  */}
              <Review />
              {/* for one card end  */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OtherProfile;
