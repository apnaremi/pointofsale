import React, {useCallback, useState} from 'react';
import PwsUpdateView from './PwsUpdateView';
import {MainContainer, Header, FormHeader} from '../../../components';
import {Keyboard, ScrollView} from 'react-native';
import APPStyles from '../../../theme/styles';
import {pwsRecoveryApi} from '../../../api/loginApi';
import * as navigationActions from '../../../navigation/actions';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {appLog} from '../../../utils/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changePassword} from '../../../api/SettingsApi';
import {navigateToLogin} from '../../../navigation/actions';

function PwsUpdateContainer() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const userData = useSelector((state: any) => state.loginReducer.user);

  const onEditPressed = useCallback(() => {
    setEditMode(previousState => {
      return !previousState;
    });
  }, []);

  const onSubmitForm = useCallback(values => {
    Keyboard.dismiss();
    dispatch(enableLoader(true));
    changePassword(userData.id, values.password, values.confirmPassword).then(
      (result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          dispatch(enableModal(result.message));
          navigateToLogin();
        } else {
          dispatch(enableModal(result.message, true));
        }
      },
    );
  }, []);

  return (
    <MainContainer>
      <FormHeader
        title={t('change_password')}
        isEditMode={isEditMode}
        onEditPressed={onEditPressed}
        hideBackButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <PwsUpdateView allowEdit={isEditMode} onSubmitForm={onSubmitForm} />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default PwsUpdateContainer;
