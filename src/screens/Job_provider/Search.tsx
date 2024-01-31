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
import {RouteProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigator';

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
  console.log('bottom', navigation.navigate);
  console.log(route);

  const [isSeller, setIsSeller] = React.useState<boolean>(true);

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
        {isSeller ? (
          <FlatList
            keyExtractor={item => item.id.toString()}
            initialNumToRender={5}
            data={data.slice(0, 5)}
            renderItem={({item}) => (
              <TouchableWithoutFeedback onPress={() => console.log(item)}>
                <PeopleCard data={item} navigation={navigation} route={route} />
              </TouchableWithoutFeedback>
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(50),
              paddingTop: responsiveHeight(2),
            }}
          />
        ) : (
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={({item}) => (
              <PeopleCard data={item} navigation={navigation} route={route} />
            )}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(50),
              paddingTop: responsiveHeight(2),
            }}></FlatList>
        )}
        {/* seller card end */}
      </View>
    </View>
  );
};

export default People;
