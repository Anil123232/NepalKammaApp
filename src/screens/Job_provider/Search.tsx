import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import TopNav from '../GlobalComponents/TopNav';
import Search from '../GlobalComponents/Search';
import {userStateProps} from './Home';
import {useGlobalStore} from '../../global/store';
import PeopleCard from '../GlobalComponents/PeopleCard';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigator';
import {ErrorToast} from '../../components/ErrorToast';
import {UserStore} from './helper/UserStore';
import PeopleLoader from '../GlobalComponents/Loader/PeopleLoader';
import useLocationStore, {LocationState} from '../../global/useLocationStore';

interface peopleProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: RouteProp<BottomStackParamsList, 'Peoples'>;
}

const data = [
  {
    id: 1,
    sellerName: 'John Doe',
    sellerDescription: 'Product Designer',
  },
  {
    id: 2,
    sellerName: 'Jane Smith',
    sellerDescription: 'Fashion Illustrator',
  },
  {
    id: 3,
    sellerName: 'Alex Johnson',
    sellerDescription: 'Graphic Artist',
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

const People = ({navigation, route}: peopleProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  const location: LocationState = useLocationStore(
    (state: any) => state.location,
  );

  const isFocused = useIsFocused();

  const [isSeller, setIsSeller] = React.useState<boolean>(true);
  const [jobSeekers, setJobSeekers] = React.useState<any>([]);
  const [nearByJobSeekers, setSetNearByJobSeekers] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getAllJobSeekers = async () => {
    try {
      const response = await (UserStore.getState() as any).getJobSeekers();
      setJobSeekers(response);
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }
  };

  const getNearByJobSeekers = async (latitude: number, longitude: number) => {
    try {
      const response = await (UserStore.getState() as any).getNearByJobSeekers(
        latitude,
        longitude,
      );
      setSetNearByJobSeekers(response);
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }
  };

  React.useEffect(() => {
    if (isFocused && location) {
      getAllJobSeekers();
      getNearByJobSeekers(location.latitude, location.longitude);
    }
  }, [isFocused, location]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: responsiveHeight(11.25),
      }}>
      <View className="w-[95%]" style={{padding: responsiveHeight(2)}}>
        <TopNav props={navigation} user={user} />
        <View style={{marginTop: responsiveHeight(3)}}>
          <Search text={'people'} />
        </View>
        {/* text start */}
        <View className="flex flex-row items-center justify-between">
          <View
            className={`w-[50%] py-3 ${
              isSeller && 'border-b-2 border-color2'
            }  `}>
            <TouchableOpacity onPress={() => setIsSeller(true)}>
              <Text
                className={isSeller ? 'text-color2' : 'text-gray-500'}
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
              !isSeller && 'border-b-2 border-color2'
            }  `}>
            <TouchableOpacity onPress={() => setIsSeller(false)}>
              <Text
                className={isSeller ? 'text-gray-500' : 'text-color2'}
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Near by Sellers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* text end  */}
        {/* seller card start */}
        {isLoading && (
          <FlatList
            data={[1, 1, 1, 1, 1]}
            renderItem={({item, index}) => <PeopleLoader />}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(60),
              paddingTop: responsiveHeight(2),
            }}
          />
        )}
        {!isLoading && isSeller && (
          <FlatList
            keyExtractor={item => item._id.toString()}
            initialNumToRender={5}
            data={jobSeekers?.users}
            renderItem={({item}) => (
              <TouchableWithoutFeedback onPress={() => console.log(item)}>
                <PeopleCard data={item} navigation={navigation} route={route} />
              </TouchableWithoutFeedback>
            )}
            ListEmptyComponent={() => (
              // Render this component when there's no data
              <View style={{paddingBottom: responsiveHeight(25)}}>
                <Text
                  className="text-red-500"
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(1.75),
                  }}>
                  No Job Seekers Found
                </Text>
              </View>
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(60),
              paddingTop: responsiveHeight(2),
            }}
          />
        )}
        {!isLoading && !isSeller && (
          <FlatList
            keyExtractor={item => item._id.toString()}
            data={nearByJobSeekers?.nearBy}
            renderItem={({item}) => (
              <PeopleCard data={item} navigation={navigation} route={route} />
            )}
            ListEmptyComponent={() => (
              // Render this component when there's no data
              <View style={{paddingBottom: responsiveHeight(25)}}>
                <Text
                  className="text-red-500"
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(1.75),
                  }}>
                  No near by Job Seekers Found
                </Text>
              </View>
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(80),
              paddingTop: responsiveHeight(2),
            }}></FlatList>
        )}

        {/* seller card end */}
      </View>
    </View>
  );
};

export default People;
