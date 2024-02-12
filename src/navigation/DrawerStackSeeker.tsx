import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerSeeker from '../screens/Job_seeker/custom_drawer/CustomDrawerSeeker';
import MyReview from '../screens/Job_seeker/MyReview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonNavigatorSeeker from './ButtonNavigatorSeeker';
import MyProfile from '../screens/Job_seeker/MyProfile';
import TopBuyer from '../screens/Job_seeker/TopBuyer';

export type DrawerStackParamsListSeeker = {
  Home: undefined;
  My_Profile: undefined;
  My_Review: undefined;
  Top_Buyer: undefined;
};

const Drawer = createDrawerNavigator();

const DrawerStackSeeker = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerSeeker {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#79AC78',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={ButtonNavigatorSeeker}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My_Profile"
        component={MyProfile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My_Review"
        component={MyReview}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="code-review" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Top_Buyer"
        component={TopBuyer}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome name="buysellads" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStackSeeker;
