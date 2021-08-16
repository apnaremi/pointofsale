import React, {useCallback, useState} from 'react';
import {Button, FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Image, Keyboard, StyleSheet, View} from 'react-native';
import {
  getQRCodeFile,
  saveProfile,
  updateBillNumberingAPI,
} from '../../../api/SettingsApi';
import {appLog} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {useSelector} from 'react-redux';

export type Props = {
  route?: any;
};

function QRCode(props: Props) {
  const dispatch = useDispatch();
  const orderingSettings = useSelector(
    (state: any) => state.orderSettingsReducer.OrderingSettings,
  );
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

  const onDownloadCodePress = useCallback(() => {
    dispatch(enableLoader(true));
    getQRCodeFile(userData.id, userData.id, userData.companies[0].id).then(
      (result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          dispatch(enableModal(result.message));
        } else {
          dispatch(enableModal(result.message, true));
        }
      },
    );
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
            source={{
              uri:
                orderingSettings &&
                orderingSettings.orderSettings &&
                orderingSettings.orderSettings.qrCodeUrl
                  ? orderingSettings.orderSettings.qrCodeUrl
                  : null,
            }}
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
