import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const APPMetrics = {
  screenWidth: width,
  screenHeight: height,
  titleFontSize: moderateScale(12),
  normalFontSize: moderateScale(10),
  smallFontSize: moderateScale(8),
  modalWidth: 312,
  headerIconSize: moderateScale(18),
};

export default APPMetrics;
