import React, {useCallback} from 'react';
import PwsRecoveryView from './PwsRecoveryView';
import {MainContainer, Header} from '../../components';
import {Keyboard, ScrollView} from 'react-native';
import APPStyles from '../../theme/styles';
import {pwsRecoveryApi} from '../../api/loginApi';
import * as navigationActions from '../../navigation/actions';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {useDispatch} from 'react-redux';

function PwsUpdateContainer() {
  const dispatch = useDispatch();
  const sendResetMail = useCallback(values => {
    Keyboard.dismiss();
    dispatch(enableLoader(true));
    pwsRecoveryApi(values.userName).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        dispatch(enableModal(result.data.message));
        navigationActions.goBack();
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  return (
    <MainContainer>
      <Header />
      <ScrollView
        contentContainerStyle={APPStyles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <PwsRecoveryView onSendResetMail={sendResetMail} />
      </ScrollView>
    </MainContainer>
  );
}

export default PwsUpdateContainer;
