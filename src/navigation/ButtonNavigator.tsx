import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {JobProvider} from '../screens';
import Create from '../screens/Job_provider/Create';
import Message from '../screens/Job_provider/Message';
import Notifications from '../screens/Job_provider/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import People from '../screens/Job_provider/Search';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import OtherProfile from '../screens/Job_provider/OtherProfile';

export type BottomStackParamsList = {
  Home: undefined;
  Peoples: {id: string};
  Create: undefined;
  Message: undefined;
  Notifications: undefined;
  Other_Profile: {id: string};
};

const Tab = createBottomTabNavigator();

const ButtonNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarInactiveBackgroundColor: '#fff',
        tabBarActiveTintColor: '#79AC78',
      }}>
      <Tab.Screen
        name="Home_bottom"
        component={JobProvider}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Peoples"
        component={People}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="people" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="add-circle-sharp" size={40} color={'#79AC78'} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="message-circle" size={25} color={color} />
          ),
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="notifications-outline" size={25} color={color} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Other_Profile"
        component={OtherProfile}
        options={() => ({
          tabBarButton: () => null,
          tabBarVisible: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default ButtonNavigator;