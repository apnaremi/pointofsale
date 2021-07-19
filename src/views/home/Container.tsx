import React, {useCallback, useEffect, useState} from 'react';
import HomeView from './View';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import * as orderSettingsActions from '../../redux/orderSettings/actions';
import {IApiOrderingSettingsResponse} from '../../config/models/api';
import * as rootActions from '../../config/redux/actions/rootActions';
import {appLog, listToMatrix} from '../../utils/helpers';
import {getCustomers, getMenuItems} from '../../api/orderingApi';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import _ from 'lodash';
import {getCategoriesAPI} from "../../api/categoryApi";
import {onCategoriesResponse} from "../../redux/categories/actions";

type Props = {};

function Container(props: Props) {
  const [menuItems, setMenuItems] = useState<Array<any>>([]);
  const [customersArray, setCustomersArray] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  useEffect(() => {
    if (userData.id) {
      appLog('OrderingSettings userData.id', userData.id);
      appLog('OrderingSettings userData.companies', userData.companies);
      dispatch(rootActions.enableLoader(true));
      dispatch(
        orderSettingsActions.requestOrderingSettings(
          {userId: userData.id, companyId: userData.companies[0].id},
          onSuccess,
          onFailure,
        ),
      );
      getItems();
      getCustomersFromDB();
      getCategories();
    }
  }, [userData]);

  const getItems = () => {
    getMenuItems(userData.id, userData.companies[0].id).then((result: any) => {
      dispatch(enableLoader(true));
      if (result.success) {
        setMenuItems(result.data.invoiceItems);
        dispatch(rootActions.enableLoader(false));
      } else {
        dispatch(rootActions.enableLoader(false));
        dispatch(enableModal(result.message, true));
      }
    });
  };

  const getCustomersFromDB = () => {
    getCustomers(userData.id, userData.companies[0].id).then((result: any) => {
      dispatch(enableLoader(true));
      if (result.success) {
        appLog('getCustomersFromDB', result);
        setCustomersArray(
          _.orderBy(
            result.data.invoiceCustomers.map((element: any) => ({
              ...element,
              name:
                element.firstName +
                (element.lastName ? ' ' + element.lastName : ''),
            })),
            ['name'],
            ['asc'],
          ),
        );
        dispatch(rootActions.enableLoader(false));
      } else {
        dispatch(rootActions.enableLoader(false));
        dispatch(enableModal(result.message, true));
      }
    });
  };

  const getCategories = useCallback(() => {
    if (userData) {
      dispatch(enableLoader(true));
      getCategoriesAPI(userData.id, userData.companies[0].id).then(
          (result: any) => {
            dispatch(enableLoader(false));
            if (result.success) {
              dispatch(onCategoriesResponse(result.data));
            } else {
              dispatch(enableModal(result.message, true));
            }
          },
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
        <HomeView
          menuItems={menuItems}
          customersArray={customersArray}
          getCustomersFromDB={getCustomersFromDB}
          {...props}
        />
      </View>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Container);
