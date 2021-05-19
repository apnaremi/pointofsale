import React, {useCallback, useState} from 'react';
import {FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard, StyleSheet, View} from 'react-native';
import {saveProfile} from '../../../api/SettingsApi';
import * as navigationActions from '../../../navigation/actions';
import {appLog} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {IUser} from '../../../config/models/data/user';
import {useSelector} from 'react-redux';
import {ILoginState} from '../../../config/models/reducers/login';
import * as loginReducer from '../../../redux/user/reducer';
import {updateProfile} from '../../../redux/user/actions';
import {Chip} from 'react-native-paper';
import AppColors from '../../../theme/appColors';

export type Props = {
  route?: any;
};

function OrdersConfig(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  const {t} = useTranslation();
  const [isEditMode, setEditMode] = useState(false);

  const childRef = React.useRef();

  const onEditPressed = useCallback(() => {
    setEditMode(previousState => {
      if (previousState) {
        appLog('setEditMode call summit');
        // if (childRef && childRef.current) {
        //   // @ts-ignore
        //   childRef.current.onSubmitFormEx();
        // }
        return !previousState;
      } else {
        return !previousState;
      }
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
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  return (
    <MainContainer>
      <FormHeader
        title={t('orders')}
        isEditMode={isEditMode}
        onEditPressed={onEditPressed}
        hideBackButton={true}
        hideEditButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <View style={APPStyles.viewContainerComplete}>
          <Text>{t('bill_numbering_cycle')}</Text>
          <View style={styles.chipsContainer}>
            <Chip style={styles.chipButton} mode={'outlined'}>
              {t('daily')}
            </Chip>
            <Chip style={styles.chipButton} mode={'outlined'}>
              {t('weekly')}
            </Chip>
            <Chip style={styles.chipButton} mode={'outlined'}>
              {t('monthly')}
            </Chip>
            <Chip style={styles.chipButton} mode={'outlined'}>
              {t('permanent')}
            </Chip>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  chipButton: {
    margin: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
  },
});

export default OrdersConfig;
