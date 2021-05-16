import * as React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import AppColors from '../theme/appColors';
import {Button, Text} from './index';
import * as rootActions from '../config/redux/actions/rootActions';
import APPMetrics from '../utils/metrics';
import i18next from 'i18next';
import {useCallback} from 'react';

type Props = {
  isModalVisible: boolean;
  onCloseModal: Function;
  message: string;
  isError: boolean;
};

const RootModal = (props: Props) => {
  const onPressClose = useCallback(() => {
    props.onCloseModal();
  }, [props.onCloseModal]);
  return (
    <Modal
      style={styles.modalContainer}
      isVisible={props.isModalVisible}
      coverScreen={false}
      backdropOpacity={0.1}
      useNativeDriver={true}
      swipeDirection={'up'}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      onSwipeComplete={onPressClose}
      onBackdropPress={onPressClose}>
      <View style={styles.modal}>
        <Text
          numberOfLines={3}
          theme={{
            colors: {
              text: props.isError
                ? AppColors.event_warning_normal
                : AppColors.secondary,
            },
          }}
          style={styles.messageText}>
          {props.message}
        </Text>
        <Button mode={'contained'} onPress={onPressClose}>
          {i18next.t('ok')}
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  messageText: {
    fontSize: 18,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: AppColors.clear,
    borderRadius: 6,
    justifyContent: 'center',
    padding: 30,
    width: APPMetrics.modalWidth,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: any) => {
  return {
    isModalVisible: state.rootReducer.isModalVisible,
    message: state.rootReducer.message,
    isError: state.rootReducer.isError,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    onCloseModal: () => dispatch(rootActions.disableModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(RootModal));
