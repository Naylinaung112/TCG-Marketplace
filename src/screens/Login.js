import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/theme/colors';
import {useDispatch} from 'react-redux';
import {authStateChange} from '../redux/appSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const loginHandler = () => {
    if (credentials.email && credentials.password) {
      dispatch(authStateChange(true));
    }
  };
  const passwordChange = value => {
    setCredentials(pre => ({...pre, password: value}));
  };
  const emailChange = value => {
    setCredentials(pre => ({...pre, email: value}));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.headText}>Login to TCG Marketplace</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={credentials.email}
            onChangeText={emailChange}
            cursorColor={colors.primary}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={credentials.password}
            onChangeText={passwordChange}
            cursorColor={colors.primary}
            secureTextEntry={!showPass}
          />
          <Pressable style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.BtnText}>Login</Text>
          </Pressable>
        </View>
        <StatusBar barStyle={'dark-content'} backgroundColor="white" translucent />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    maxWidth: 400,
  },
  headText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEE',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  BtnText: {
    color: 'white',
  },
});
