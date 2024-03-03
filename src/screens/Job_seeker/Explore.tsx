import {View, Text, Button} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import TopNav from '../GlobalComponents/TopNav';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';
import {RouteProp} from '@react-navigation/native';
import {userStateProps} from './Home';
import {useGlobalStore} from '../../global/store';
import Search from '../GlobalComponents/Search';
import {FlatList} from 'react-native-gesture-handler';
import Cards from '../GlobalComponents/Cards';
import {FetchJobStore} from './helper/FetchJobStore';
import {getJobProps, initialJobData, JobData} from './Home';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottonSheetCardSeeker from './BottonSheetCardSeeker';
import CardLoader from '../GlobalComponents/CardLoader';

interface peopleProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: RouteProp<BottomStackParamsList, 'explore'>;
}

const Explore = ({navigation, route}: peopleProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  const [jobDetails, setJobDetails] = React.useState<JobData>(initialJobData);
  const [selectedData, setSelectedData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [loadedItems, setLoadedItems] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = React.useState<boolean>(false);

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
  const getJobDetails = async (page: number, limit: number) => {
    const response = await (FetchJobStore.getState() as getJobProps).getJob(
      page,
      limit,
    );
    setJobDetails(prevJob => ({
      ...prevJob,
      job: [...prevJob.job, ...response.job],
    }));

    if (response.totalPages !== undefined) {
      setTotalPages(response.totalPages);
    }
    if (response.currentPage !== undefined) {
      setCurrentPage(response.currentPage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getJobDetails(1, 5);
  }, []);

  const handleEndReached = () => {
    if (!isFetchingMore && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setIsFetchingMore(true);
      getJobDetails(nextPage, 5)
        .then(() => setIsFetchingMore(false))
        .catch(error => {
          console.error('Error fetching more data:', error);
          setIsFetchingMore(false);
        });
    }
    console.log('hitted');
  };

  // console.log(loadedItems)
  console.log(totalPages, currentPage);

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: responsiveHeight(11.25),
        }}>
        <View
          className="w-[95%]"
          style={{
            padding: responsiveHeight(2),
            marginTop: responsiveHeight(1.5),
          }}>
          <TopNav props={navigation} user={user} />
          <View style={{marginTop: responsiveHeight(3)}}>
            <Search text={'people'} user={user} />
          </View>
        </View>
        <View className="w-[95%] flex flex-row pb-2">
          <Text
            className="text-black ml-3 mr-1"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveHeight(1.5),
            }}>
            Explore
          </Text>
          <Text
            className="text-color2"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveHeight(1.5),
            }}>
            Jobs
          </Text>
        </View>
        <View className="w-[90%]">
          {isLoading ? (
            <>
              <FlatList
                data={[1, 1, 1, 1, 1]}
                renderItem={({item, index}) => <CardLoader />}
              />
            </>
          ) : (
            <FlatList
              keyExtractor={item => item._id.toString()}
              // initialNumToRender={10}
              data={jobDetails?.job}
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
                paddingBottom: responsiveHeight(30),
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                isFetchingMore ? (
                  <View style={{alignItems: 'center', paddingVertical: 10}}>
                    <Text className="text-black">Loading...</Text>
                  </View>
                ) : null
              }></FlatList>
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
            <BottonSheetCardSeeker
              bottomSheetModalRef={bottomSheetModalRef}
              data={selectedData}
              navigation={navigation}
            />
            {/* </View> */}
          </BottomSheetModal>
          <View className="bg-color2 ">
            <Text className="text-black">Load More</Text>
          </View>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Explore;
