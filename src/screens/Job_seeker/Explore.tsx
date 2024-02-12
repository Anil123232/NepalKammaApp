import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
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
import {data} from './Home';

interface peopleProps {
  navigation: BottomTabNavigationProp<BottomStackParamsList>;
  route: RouteProp<BottomStackParamsList, 'explore'>;
}

const Explore = ({navigation, route}: peopleProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: responsiveHeight(11.25),
      }}>
      <View className="w-[95%]" style={{padding: responsiveHeight(2), marginTop: responsiveHeight(1.5)}}>
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
      <View className="w-[95%]">
        <FlatList
          keyExtractor={item => item.id.toString()}
          initialNumToRender={7}
          data={data.slice(0, 7)}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => {
                // setSelectedData(item);
                // handlePresentModalPress();
              }}>
              <Cards data={item} user={user} />
            </TouchableWithoutFeedback>
          )}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(50),
            // paddingTop: responsiveHeight(1),
          }}></FlatList>
      </View>
    </View>
  );
};

export default Explore;
