import React, {useCallback, useEffect, useState} from 'react';
import ProfileView from './ProfileView';
import {FormHeader, MainContainer} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard} from 'react-native';
import {getProfile, saveProfile} from '../../../config/api/SettingsApi';
import * as navigationActions from '../../../navigation/actions';
import {appLog} from '../../../utils/helpers';
import {userType} from '../../../utils/appTypes';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';

export type Props = {
  userData: userType;
  route?: any;
};

function ProfileContainer(props: Props) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [isEditMode, setEditMode] = useState(false);
  const [dataFromDB, setDataFromDB] = useState({});

  const onToggleSwitch = useCallback(() => {
    setEditMode(!isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    if (props.userData && props.userData.refId) {
      getProfileData(props.userData.refId);
    }
  }, [props.userData]);

  const getProfileData = useCallback(refId => {
    dispatch(enableLoader(true));
    getProfile(refId).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        setDataFromDB(result.data);
      } else {
        dispatch(enableModal(result.data.message, true));
      }
    });
  }, []);

  const onSubmitForm = useCallback(dataToSave => {
    appLog(dataToSave);
    Keyboard.dismiss();
    dispatch(enableLoader(true));
    saveProfile(props.userData.refId.toString(), dataToSave).then(
      (result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          dispatch(enableModal(result.data.message));
          navigationActions.goBack();
        } else {
          dispatch(enableModal(result.message, true));
        }
      },
    );
  }, []);

  return (
    <MainContainer>
      <FormHeader
        title={t('profile')}
        switchValue={isEditMode}
        onToggleSwitch={onToggleSwitch}
        hideBackButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <ProfileView
          onSubmitForm={onSubmitForm}
          allowEdit={isEditMode}
          dataFromDB={dataFromDB}
          {...props}
        />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default ProfileContainer;
