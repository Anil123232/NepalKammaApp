import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {JobSeeker} from '../screens';
import Message from '../screens/Job_seeker/Message';
import Notifications from '../screens/Job_seeker/Notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import OtherProfile from '../screens/Job_seeker/OtherProfile';
import Explore from '../screens/Job_seeker/Explore';
import CreateGigs from '../screens/Job_seeker/CreateGigs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActualMessage from '../screens/Job_seeker/ActualMessage';

export type BottomStackParamsList = {
  Home_bottom: undefined;
  explore: {id: string};
  CreateGigs: undefined;
  Message: undefined;
  Notifications: undefined;
  Other_Profile: {id: string};
  Actual_Message: {conversation_id: string};
};

const Tab = createBottomTabNavigator();

const ButtonNavigatorSeeker = () => {
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
        // component={JobSeeker}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={25} color={color} />
          ),
        }}>
        {props => <JobSeeker {...props} bottomNavigation={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="explore" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateGigs"
        component={CreateGigs}
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
        name="Notifications"
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
      <Tab.Screen
        name="Actual_Message"
        component={ActualMessage}
        options={() => ({
          tabBarButton: () => null,
          tabBarVisible: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default ButtonNavigatorSeeker;
