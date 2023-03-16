import {Dimensions, StatusBar} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
export default {
  deviceWidth,
  deviceHeight,
  statusBarHeight: StatusBar.currentHeight,
};
