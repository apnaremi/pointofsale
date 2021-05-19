import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const APPMetrics = {
  screenWidth: width,
  screenHeight: height,
  titleFontSize: 26,
  normalFontSize: 18,
  smallFontSize: 16,
  modalWidth: 312,
  headerIconSize: 30,
};

export default APPMetrics;
