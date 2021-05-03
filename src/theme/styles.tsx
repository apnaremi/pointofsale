import {StyleSheet} from 'react-native';
import APPMetrics from '../utils/metrics';

const APPStyles = StyleSheet.create({
  commonButton: {
    marginTop: 20,
  },
  formContainer: {
    width: APPMetrics.formWidth,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default APPStyles;
