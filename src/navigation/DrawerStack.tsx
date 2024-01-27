import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {JobProvider} from '../screens';
import CustomDrawer from '../screens/Job_provider/custom_drawer/CustomDrawer';
import Profile from '../screens/Job_provider/Profile';
import MyMileStone from '../screens/Job_provider/MyMileStone';
import TopSeller from '../screens/Job_provider/TopSeller';
import MyReview from '../screens/Job_provider/MyReview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonNavigator from './ButtonNavigator';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
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
        component={ButtonNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Milestone"
        component={MyMileStone}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="milestone" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Review"
        component={MyReview}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="code-review" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TopSeller"
        component={TopSeller}
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome name="buysellads" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
