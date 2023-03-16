import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Cart from '../screens/Cart';
import {useSelector} from 'react-redux';
import HomeScreenHeader from '../components/HomeScreenHeader';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {auth} = useSelector(state => state.app);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth ? (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => <HomeScreenHeader />,
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                presentation: 'containedTransparentModal',
                headerShown: false,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animation: 'slide_from_left',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
