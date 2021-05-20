import React, {useCallback, useState} from 'react';
import {FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
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
import {Chip} from 'react-native-paper';
import * as orderSettingsReducer from '../../../redux/orderSettings/reducer';

export type Props = {
  route?: any;
};

function QRCode(props: Props) {
  const dispatch = useDispatch();
  const orderingSettings = useSelector(
    (state: any) => state.orderSettingsReducer.OrderingSettings,
  );
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

  return (
    <MainContainer>
      <FormHeader
        title={t('qr_code')}
        isEditMode={isEditMode}
        onEditPressed={onEditPressed}
        hideBackButton={true}
        hideEditButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <View style={APPStyles.viewContainerComplete}>
          <Image
            source={{uri: orderingSettings.orderSettings.qrCodeUrl}}
            style={{width: 400, height: 400}}
          />
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

export default QRCode;
