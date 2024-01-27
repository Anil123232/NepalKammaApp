import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import React from 'react';
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

interface logOutProps {
  navigation: StackNavigationProp<RootStackParamsList>;
}

type userStateProps = {
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

const data: dataProps[] = [
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
  console.log(user);
  const [isPopular, setIsPopular] = React.useState<boolean>(true);

  const Drawer = createDrawerNavigator();

  return (
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
          <Search />
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

          {isPopular ? (
            <FlatList
              keyExtractor={item => item.id.toString()}
              initialNumToRender={5}
              data={data.slice(0, 5)}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => console.log(item)}>
                  <Cards />
                </TouchableWithoutFeedback>
              )}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(50),
                paddingTop: responsiveHeight(2),
              }}></FlatList>
          ) : (
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={data}
              renderItem={({item}) => <Cards />}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(50),
                paddingTop: responsiveHeight(2),
              }}></FlatList>
          )}
        </View>
        {/* body end  */}
      </View>
    </View>
  );
};

export default Home;
