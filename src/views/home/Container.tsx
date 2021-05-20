import React, {useEffect} from 'react';
import HomeView from './View';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import * as orderSettingsActions from '../../redux/orderSettings/actions';
import {IApiOrderingSettingsResponse} from '../../config/models/api';
import * as rootActions from '../../config/redux/actions/rootActions';
import {appLog} from '../../utils/helpers';

type Props = {
  onLogin: Function;
};

function Container(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  useEffect(() => {
    if (userData.id) {
      appLog('OrderingSettings userData', userData);
      appLog('OrderingSettings userData.companies', userData.companies);
      dispatch(rootActions.enableLoader(true));
      dispatch(
        orderSettingsActions.requestOrderingSettings(
          {userId: userData.id, companyId: userData.companies[0].id},
          onSuccess,
          onFailure,
        ),
      );
    }
  }, [userData]);

  const onSuccess = (response: IApiOrderingSettingsResponse) => {
    dispatch(rootActions.enableLoader(false));
    appLog('IApiOrderingSettingsResponse', response);
  };

  const onFailure = (error: any) => {
    dispatch(rootActions.enableLoader(false));
    dispatch(rootActions.enableModal(error, true));
  };

  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <HomeView {...props} />
      </View>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Container);
