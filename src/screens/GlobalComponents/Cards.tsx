import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import ModalBoxJob from '../../components/ModalBoxJob';
import {JobStore} from '../Job_provider/helper/JobStore';
import {ErrorToast} from '../../components/ErrorToast';
import {UserStore} from '../Job_seeker/helper/UserStore';
import {SuccessToast} from '../../components/SuccessToast';
import {useGlobalStore} from '../../global/store';
import Khalti from './Khalti';
export const systemFonts = [
  ...defaultSystemFonts,
  'Montserrat-Regular',
  'Montserrat-SemiBold',
  'Montserrat-Bold',
  'Montserrat-Medium',
];

const Cards = ({
  data,
  user,
  useCase,
  getButton,
  getSingleUser,
  getCompletedJob,
}: any) => {
  const {width} = useWindowDimensions();

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] =
    React.useState<string>('In_Progress');
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);
  const [paymentOpen, setPaymentOpen] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const generateHtmlPreview = () => {
    if (useCase === 'myProfile') {
      let html = `<p style="color: black;">${
        user && user?.role === 'job_seeker'
          ? data?.gig_description
          : data?.job_description
      }</p>`;
      html = html.replace(/\n/g, '<br/>');
      return html;
    } else {
      let html = `<p style="color: black;">${
        user && user?.role === 'job_seeker'
          ? data?.job_description
          : data?.gig_description
      }</p>`;
      html = html.replace(/\n/g, '<br/>');
      return html;
    }
  };

  //update job status
  const updateJobStatus = async (
    id: string,
    job_status: string,
    selectedUserId: string,
  ) => {
    try {
      const response = await (JobStore.getState() as any).EditJobStatus(
        id,
        job_status,
        selectedUserId ? selectedUserId : null,
      );
      getSingleUser(user?._id);
      SuccessToast('Job status updated successfully');
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }
  };

  // handle ok function
  const handleOkFunction = () => {
    updateJobStatus(data?._id, selectedStatus, selectedUsers[0]?._id);
    setIsModalVisible(false);
  };

  return (
    <View className="p-4 shadow-2xl flex flex-col bg-white">
      <View className="flex flex-row gap-x-4">
        {/* image  */}
        <View>
          {data && data?.postedBy?.profilePic?.url && (
            <View className="relative">
              <Image
                source={{uri: data?.postedBy?.profilePic.url}}
                style={{height: 40, width: 40, borderRadius: 40}}
                className="relative"
              />
              <View className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border border-white" />
            </View>
          )}
        </View>
        {/* text  */}
        <View className="flex flex-col gap-y-1 w-[100%]">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            {data?.title}
          </Text>

          <Text
            className="text-black ml-1"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            {data?.postedBy?.username}
          </Text>
          {useCase === 'myProfile' ? (
            user && user?.role === 'job_seeker' ? (
              <View className="flex flex-row gap-x-2">
                <FontAwesome name="star" size={15} color="#E2EA3B" />
                <FontAwesome name="star" size={15} color="#E2EA3B" />
                <FontAwesome name="star" size={15} color="#E2EA3B" />
                <FontAwesome name="star" size={15} color="gray" />
                <FontAwesome name="star" size={15} color="gray" />
              </View>
            ) : (
              <View className="flex flex-row items-center gap-x-1 mt-2 w-[100%]">
                <View className="flex flex-row gap-x-1 w-[70%]">
                  <IonIcons name="location-outline" size={15} color="#79AC78" />
                  <Text
                    className="text-color2"
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    {data?.location}
                  </Text>
                </View>
              </View>
            )
          ) : user && user?.role === 'job_seeker' ? (
            <View className="flex flex-row items-center gap-x-1 mt-2 w-[100%]">
              <View className="flex flex-row gap-x-1 w-[70%]">
                <IonIcons name="location-outline" size={15} color="#79AC78" />
                <Text
                  className="text-color2"
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  {data?.location}
                </Text>
              </View>
              <IonIcons
                className="w-[30%]"
                name="heart-outline"
                size={20}
                color="#79AC78"
              />
              {/* <IonIcons className="w-[30%]" name="heart-sharp" size={20} color="#79AC78" /> */}
            </View>
          ) : (
            <View className="flex flex-row gap-x-2">
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="gray" />
              <FontAwesome name="star" size={15} color="gray" />
            </View>
          )}
        </View>
      </View>
      <View
        className=""
        style={{
          width: responsiveWidth(82.75),
        }}>
        <RenderHtml
          contentWidth={width}
          source={{html: generateHtmlPreview()}}
          baseStyle={{
            color: 'black',
            fontFamily: 'Montserrat-Regular',
            fontSize: responsiveFontSize(1.5),
            lineHeight: 18.5,
            height: responsiveHeight(21.85),
          }}
          // tagsStyles={{
          //   p: {color: 'red', fontFamily: 'Montserrat-Bold'},
          // }}
          systemFonts={systemFonts}
        />
      </View>
      {/* payment button  */}
      {getButton === 'getPayment' && user && user?.role === 'job_provider' && (
        <React.Fragment>
          {data && data?.assignedTo && (
            <View className="py-2 px-4 my-2 bg-color1 rounded-md flex flex-row items-center gap-x-1 w-[90%]">
              <MaterialIcons name="currency-bitcoin" size={17} color="white" />
              <Text
                className="text-white"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(1.5),
                }}>
                Pay to {data?.assignedTo?.username}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
              setPaymentOpen(true);
            }}>
            <View className="py-2 px-4 bg-color2 rounded-md flex flex-row justify-center items-center gap-x-1">
              <MaterialIcons name="payment" size={17} color="white" />
              <Text
                className=""
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(1.5),
                  color: 'white',
                }}>
                Pay
              </Text>
            </View>
          </TouchableOpacity>
        </React.Fragment>
      )}
      {/* use case my_profile  */}
      {getButton === 'getButton' && user && user?.role === 'job_provider' && (
        <React.Fragment>
          {data &&
            data?.assignedTo &&
            (data?.job_status === 'Completed' ||
              data?.job_status === 'In_Progress') && (
              <View className="py-2 px-4 my-2 bg-color2 rounded-md flex flex-row items-center gap-x-1 w-[90%]">
                <MaterialIcons name="assignment-add" size={17} color="white" />
                <Text
                  className="text-white"
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(1.5),
                  }}>
                  Assigned to {data?.assignedTo?.username}
                </Text>
              </View>
            )}
          <View className="flex flex-row justify-between gap-x-3 items-center w-[90%]">
            {/* edit  */}
            <TouchableOpacity>
              <View className="py-2 px-4 bg-color2 rounded-md flex flex-row items-center gap-x-1">
                <FontAwesome name="edit" size={17} color="white" />
                <Text
                  className=""
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(1.5),
                    color: 'white',
                  }}>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>

            {/* set job done */}
            {data && data?.job_status === 'In_Progress' && (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View className="py-2 px-3 bg-[#25258f] rounded-md flex flex-row items-center gap-x-1">
                  <FontAwesome6 name="bars-progress" size={17} color="white" />
                  <Text
                    className=""
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: responsiveHeight(1.5),
                      color: 'white',
                    }}>
                    {data?.job_status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {data && data?.job_status === 'Completed' && (
              <TouchableOpacity>
                <View className="py-2 px-3 bg-[#589458] rounded-md flex flex-row items-center gap-x-1">
                  <MaterialIcons name="check" size={17} color="white" />
                  <Text
                    className=""
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: responsiveHeight(1.5),
                      color: 'white',
                    }}>
                    {data?.job_status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* paid  */}
            {data && data?.job_status === 'Paid' && (
              <TouchableOpacity>
                <View className="py-2 px-3 bg-[#589458] rounded-md flex flex-row items-center gap-x-1">
                  <MaterialIcons name="paid" size={17} color="white" />
                  <Text
                    className=""
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: responsiveHeight(1.5),
                      color: 'white',
                    }}>
                    {data?.job_status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {data && data?.job_status === 'Cancelled' && (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View className="py-2 px-3 bg-[#FF0000] rounded-md flex flex-row items-center gap-x-1">
                  <Entypo name="cross" size={17} color="white" />
                  <Text
                    className=""
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: responsiveHeight(1.5),
                      color: 'white',
                    }}>
                    {data?.job_status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {data && data?.job_status === 'Pending' && (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View className="py-2 px-3 bg-yellow-600 rounded-md flex flex-row items-center gap-x-1">
                  <MaterialIcons
                    name="pending-actions"
                    size={17}
                    color="white"
                  />
                  <Text
                    className=""
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: responsiveHeight(1.5),
                      color: 'white',
                    }}>
                    {data?.job_status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* delte  */}
            <TouchableOpacity>
              <View className="py-2 px-4 bg-red-500 rounded-md flex flex-row items-center gap-x-1">
                <MaterialCommunityIcons name="delete" size={17} color="white" />
                <Text
                  className=""
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: responsiveHeight(1.5),
                    color: 'white',
                  }}>
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
      {/* 9826399170 */}

      {paymentOpen && (
        <>
          <Khalti
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            job_data={data}
            getCompletedJob={getCompletedJob}
          />
        </>
      )}

      <ModalBoxJob
        isModalVisible={isModalVisible}
        handleOkFunction={handleOkFunction}
        responseMessage={"We've sent you an email to verify your account"}
        modalMessage="Verify your Account"
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        setIsModalVisible={setIsModalVisible}
        setSelectedUsers={setSelectedUsers}
        selectedUsers={selectedUsers}
      />
    </View>
  );
};

export default Cards;
