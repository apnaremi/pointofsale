import {StyleSheet} from 'react-native';
import AppColors from './appColors';

const APPStyles = StyleSheet.create({
  commonButton: {
    marginTop: 20,
  },
  formContainer: {
    width: '80%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    width: '100%',
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    flexDirection: 'row',
    width: '100%',
  },
  modalContainer: {
    width: '30%',
    backgroundColor: AppColors.clear,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 6,
  },
  viewContainer: {
    width: '40%',
  },
  viewContainerComplete: {
    width: '100%',
    padding: 20,
  },
});

export default APPStyles;
