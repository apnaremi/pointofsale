Categories;
import React, {useCallback, useState} from 'react';
import {FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  changePassword,
  saveProfile,
  updateBillNumberingAPI,
} from '../../../api/SettingsApi';
import * as navigationActions from '../../../navigation/actions';
import {appLog} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {updateProfile} from '../../../redux/user/actions';
import {Chip} from 'react-native-paper';
import {BILL_NUMBERING} from '../../../utils/enums';
import {updateBillNumbering} from '../../../redux/orderSettings/actions';
import {navigateToLogin} from '../../../navigation/actions';

export type Props = {
  route?: any;
};

function Categories(props: Props) {
  const dispatch = useDispatch();
  const seatingArrangement = useSelector(
    (state: any) =>
      state.orderSettingsReducer.OrderingSettings.seatingArrangement,
  );
  const userData = useSelector((state: any) => state.loginReducer.user);
  const {t} = useTranslation();

  const onChipPressed = useCallback(
    (billNumbering: number) => () => {
      appLog('billNumbering', billNumbering);
      dispatch(enableLoader(true));
      updateBillNumberingAPI(
        userData.id,
        userData.companies[0].id,
        billNumbering,
      ).then((result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          dispatch(updateBillNumbering(billNumbering));
        } else {
          dispatch(enableModal(result.message, true));
        }
      });
    },
    [],
  );

  return (
    <MainContainer>
      <FormHeader
        title={t('seating_arrangement')}
        hideBackButton={true}
        hideEditButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <View style={APPStyles.viewContainerComplete}>
          <View style={styles.chipsContainer}>
            {!_.isEmpty(seatingArrangement)
              ? seatingArrangement.map((item: any) => (
                  <Chip style={styles.chipButton} mode={'outlined'}>
                    {item.name}
                  </Chip>
                ))
              : null}
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

export default Categories;
