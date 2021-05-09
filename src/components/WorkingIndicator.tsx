import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import AppColors from '../theme/appColors';
import {appLog} from '../utils/helpers';

const WorkingIndicator = () => {
  const isWorking = useSelector((state: any) => state.rootReducer.isWorking);
  appLog('isWorking', isWorking);
  return (
    <Modal
      isVisible={isWorking}
      coverScreen={false}
      backdropOpacity={0}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <ActivityIndicator color={AppColors.secondary} size={'large'} />
    </Modal>
  );
};
export default React.memo(WorkingIndicator);
