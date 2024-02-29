import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useGlobalStore} from '../../global/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/AppStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TopNav from '../GlobalComponents/TopNav';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Search from '../GlobalComponents/Search';
import Cards from '../GlobalComponents/Cards';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetCard from './BottomSheetCard';
import {FetchGigStore} from './helper/FetchGigStore';
import CardLoader from '../GlobalComponents/CardLoader';

interface logOutProps {
  navigation: StackNavigationProp<RootStackParamsList>;
}

export type userStateProps = {
  __v: number;
  _id: string;
  email: string;
  isVerified: boolean;
  role: string;
  username: string;
};

type dataProps = {
  id: number;
  what: string;
  text: string;
};

export interface GigData {
  gig: any[];
}

export interface getJobProps {
  getGig: () => Promise<GigData>;
}

export const initialGigData: GigData = {
  gig: [],
};

export const data: dataProps[] = [
  {
    id: 1,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 2,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 3,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 4,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 5,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 6,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 7,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 8,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
];

const Home = ({navigation}: logOutProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  const [isPopular, setIsPopular] = React.useState<boolean>(true);
  const [selectedData, setSelectedData] = React.useState<any>(null);
  const [gigDetails, setgigDetails] = React.useState<GigData>(initialGigData);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const Drawer = createDrawerNavigator();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  //get all job details
  const getGigDetails = async () => {
    const response = await (FetchGigStore.getState() as getJobProps).getGig();
    setgigDetails(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getGigDetails();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: responsiveHeight(16),
        }}>
        <View className="w-[95%]" style={{padding: responsiveHeight(2)}}>
          {/* top nav  */}
          <TopNav props={navigation} user={user} />
          {/* description start */}
          <View
            className="flex flex-col gap-y-1"
            style={{marginTop: responsiveHeight(3)}}>
            <View>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(2),
                }}>
                Discover
              </Text>
            </View>
            <View>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFontSize(2),
                }}>
                services and freelancers
              </Text>
            </View>
          </View>
          {/* description end  */}
          {/* search  */}
          <View style={{marginTop: responsiveHeight(3)}}>
            <Search text={'Home'} />
          </View>
          {/* body start */}
          <View style={{marginTop: responsiveHeight(3)}}>
            {/* text start */}
            <View className="flex flex-row items-center justify-between">
              <View
                className={`w-[50%] py-3 ${
                  isPopular && 'border-b-2 border-color2'
                }  `}>
                <TouchableOpacity onPress={() => setIsPopular(true)}>
                  <Text
                    className={isPopular ? 'text-color2' : 'text-gray-500'}
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(2),
                    }}>
                    Most Popular
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                className={`w-[50%] items-center justify-center flex py-3 ${
                  !isPopular && 'border-b-2 border-color2'
                }  `}>
                <TouchableOpacity onPress={() => setIsPopular(false)}>
                  <Text
                    className={isPopular ? 'text-gray-500' : 'text-color2'}
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(2),
                    }}>
                    Near by Gigs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* text end  */}
            {/* */}
            {isLoading && (
              <FlatList
                data={[1, 1, 1, 1, 1]}
                renderItem={({item, index}) => <CardLoader />}
              />
            )}
            {!isLoading && isPopular && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                initialNumToRender={5}
                data={gigDetails?.gig?.slice(0, 5)}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} />
                  </TouchableWithoutFeedback>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(2),
                }}></FlatList>
            )}

            {!isLoading && !isPopular && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                initialNumToRender={5}
                data={gigDetails?.gig?.slice(0, 5)}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} />
                  </TouchableWithoutFeedback>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(2),
                }}></FlatList>
            )}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              style={{
                backgroundColor: 'white',
                borderRadius: 24,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 0.8,
                shadowRadius: 24,
                elevation: 30,
                flex: 1,
                overflow: 'scroll',
              }}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              {/* <View className="flex flex-1 items-center rounded-t-2xl"> */}
              <BottomSheetCard
                bottomSheetModalRef={bottomSheetModalRef}
                data={selectedData}
              />
              {/* </View> */}
            </BottomSheetModal>
          </View>
          {/* body end  */}
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;
