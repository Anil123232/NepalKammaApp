import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {useGlobalStore} from '../../global/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/AppStack';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TopNav from '../GlobalComponents/TopNav';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Search from '../GlobalComponents/Search';
import Cards from '../GlobalComponents/Cards';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetCard from '../Job_provider/BottomSheetCard';
import {DrawerStackParamsListSeeker} from '../../navigation/DrawerStackSeeker';

interface profileProps {
  navigation: DrawerNavigationProp<DrawerStackParamsListSeeker>;
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

const Home = ({navigation}: profileProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  console.log(user);
  const [currentTab, setCurrentTab] = React.useState<string>('Best Matches');
  const [selectedData, setSelectedData] = React.useState<any>(null);

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
                Job and earn money
              </Text>
            </View>
          </View>
          {/* description end  */}
          {/* search  */}
          <View style={{marginTop: responsiveHeight(3)}}>
            <Search text={'Home'} user={user} />
          </View>
          {/* body start */}
          <View style={{marginTop: responsiveHeight(3)}}>
            {/* text start */}
            <View className="flex flex-row items-center justify-between">
              {/* best matches */}
              <View
                className={`w-[33.33%] py-3 ${
                  currentTab === 'Best Matches' && 'border-b-2 border-color2'
                } items-center  `}>
                <TouchableOpacity onPress={() => setCurrentTab('Best Matches')}>
                  <Text
                    className={
                      currentTab === 'Best Matches'
                        ? 'text-color2'
                        : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Best Matches
                  </Text>
                </TouchableOpacity>
              </View>
              {/* most recent  */}
              <View
                className={`w-[33.33%] py-3 ${
                  currentTab === 'Most Recent' && 'border-b-2 border-color2'
                } items-center `}>
                <TouchableOpacity onPress={() => setCurrentTab('Most Recent')}>
                  <Text
                    className={
                      currentTab === 'Most Recent'
                        ? 'text-color2'
                        : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Most Recent
                  </Text>
                </TouchableOpacity>
              </View>
              {/* near by work  */}
              <View
                className={`w-[33.33%] items-center justify-center flex py-3 ${
                  currentTab === 'Nearby' && 'border-b-2 border-color2'
                } items-center `}>
                <TouchableOpacity onPress={() => setCurrentTab('Nearby')}>
                  <Text
                    className={
                      currentTab === 'Nearby' ? 'text-color2' : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Nearby Jobs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* text end  */}

            {/* Best Matches  */}
            {currentTab === 'Best Matches' && (
              <FlatList
                keyExtractor={item => item.id.toString()}
                initialNumToRender={5}
                data={data.slice(0, 5)}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} user={user} />
                  </TouchableWithoutFeedback>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(2),
                }}></FlatList>
            )}
            {/* Most Recent  */}
            {currentTab === 'Most Recent' && (
              <FlatList
                keyExtractor={item => item.id.toString()}
                data={data}
                renderItem={({item}) => <Cards data={item} user={user} />}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(2),
                }}></FlatList>
            )}
            {/* Near by Work */}
            {currentTab === 'Nearby' && (
              <FlatList
                keyExtractor={item => item.id.toString()}
                data={data.slice(0, 3)}
                renderItem={({item}) => <Cards data={item} user={user} />}
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
