import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const APPMetrics = {
  screenWidth: width,
  screenHeight: height,
  titleFontSize: 26,
  normalFontSize: 18,
  smallFontSize: 14,
};

export default APPMetrics;
