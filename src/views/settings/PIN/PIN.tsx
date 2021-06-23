import React, {memo} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as loginActions from '../../../redux/user/actions';
import {Button, MainContainer, Text} from '../../../components';
import {useTranslation} from 'react-i18next';
import {appLog} from '../../../utils/helpers';
import APPStyles from '../../../theme/styles';
import AppColors from '../../../theme/appColors';
import {navigateToPin} from '../../../navigation/actions';
import {
  createPINSuccess,
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {createPINAPI, deletePINAPI} from '../../../api/loginApi';
import * as navigationActions from '../../../navigation/actions';

const PIN = memo(() => {
  const userData = useSelector((state: any) => state.loginReducer.user);
  const userIdLinkWithPIN = useSelector(
    (state: any) => state.rootReducer.userIdLinkWithPIN,
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onEnablePIN = () => {
    navigateToPin({
      pin: null,
    });
  };

  const onDisablePIN = () => {
    Alert.alert(t('pin_code'), t('disablePINQuestion'), [
      {text: t('cancel'), style: 'cancel'},
      {
        text: t('disable'),
        onPress: () => {
          dispatch(enableLoader(true));
          deletePINAPI().then((result: any) => {
            dispatch(enableLoader(false));
            if (result.success) {
              dispatch(createPINSuccess(''));
              dispatch(enableModal(result.message));
            } else {
              dispatch(enableModal(result.message, true));
            }
          });
        },
      },
    ]);
  };

  const onChangePIN = () => {
    appLog('Show EnterPIN');
  };

  const renderCreatePIN = () => {
    return (
      <View style={styles.viewItems}>
        <Text>{t('setupPINRecommendation')}</Text>
        <Button
          mode={'contained'}
          onPress={onEnablePIN}
          style={APPStyles.commonButton}>
          {t('setPINUpper')}
        </Button>
      </View>
    );
  };

  const renderEditPIN = () => {
    return (
      <View style={styles.viewItems}>
        <Text>{t('enablePINQuestion')}</Text>
        <Button
          mode={'contained'}
          onPress={onDisablePIN}
          style={APPStyles.commonButton}>
          {t('disablePINUpper')}
        </Button>
      </View>
    );
  };

  const userId = userData && userData.id;
  const enabledPin = userId === userIdLinkWithPIN;
  return (
    <MainContainer>
      <Icon
        name={enabledPin ? 'lock' : 'lock-open'}
        size={120}
        color={AppColors.gray_normal}
        style={styles.viewItems}
      />
      {enabledPin ? renderEditPIN() : renderCreatePIN()}
    </MainContainer>
  );
});

const styles = StyleSheet.create({
  viewItems: {
    marginTop: 50,
    alignSelf: 'center',
  },
  subText: {
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
  },
});

export default PIN;
