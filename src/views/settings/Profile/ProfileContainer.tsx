import React, {useCallback, useState} from 'react';
import {ProfileView} from './ProfileView';
import {FormHeader, MainContainer} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard} from 'react-native';
import {saveProfile} from '../../../api/SettingsApi';
import * as navigationActions from '../../../navigation/actions';
import {appLog} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/user/actions';

export type Props = {
  route?: any;
};

function ProfileContainer(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  const {t} = useTranslation();
  const [isEditMode, setEditMode] = useState(false);

  const childRef = React.useRef();

  const onEditPressed = useCallback(() => {
    setEditMode(previousState => {
      return !previousState;
    });
  }, []);

  const onSubmitForm = useCallback(dataToSave => {
    appLog('dataToSave', dataToSave);
    Keyboard.dismiss();
    dispatch(enableLoader(true));
    saveProfile(userData.id, dataToSave).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        dispatch(enableModal(result.message));
        dispatch(updateProfile(result));
        onEditPressed();
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  return (
    <MainContainer>
      <FormHeader
        title={t('profile')}
        isEditMode={isEditMode}
        onEditPressed={onEditPressed}
        hideBackButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <ProfileView
          ref={childRef}
          onSubmitForm={onSubmitForm}
          allowEdit={isEditMode}
          userData={userData}
          {...props}
        />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default ProfileContainer;
