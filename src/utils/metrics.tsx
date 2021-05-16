import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const APPMetrics = {
  screenWidth: width,
  screenHeight: height,
  titleFontSize: 24,
  normalFontSize: 16,
  smallFontSize: 14,
  modalWidth: 312,
};

export default APPMetrics;
