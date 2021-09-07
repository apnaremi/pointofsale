import React, {useCallback} from 'react';
import CustomerView from './CustomerView';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Keyboard, View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appLog} from '../../utils/helpers';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {useNavigation} from '@react-navigation/native';
import {saveCustomer} from '../../api/orderingApi';
import * as navigationActions from '../../navigation/actions';

type Props = {route?: any};

function Container(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);

  const onSubmitForm = useCallback(
    (dataToSave, isNew) => {
      appLog('dataToSave', dataToSave);
      Keyboard.dismiss();
      if (isNew) {
        dispatch(enableLoader(true));
        saveCustomer(userData.id, dataToSave).then((result: any) => {
          dispatch(enableLoader(false));
          if (result.success) {
            dispatch(enableModal(result.message));
            props.route.params.onCustomerChosen(result.data);
            navigationActions.goBack();
          } else {
            dispatch(enableModal(result.message, true));
          }
        });
      } else {
        props.route.params.onCustomerChosen(dataToSave);
        navigationActions.goBack();
      }
    },
    [userData, props.route.params],
  );

  return (
    <MainContainer>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainerModal}>
        <CustomerView onSubmitForm={onSubmitForm} {...props} />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Container);
