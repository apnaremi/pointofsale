import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FormHeader,
  FormInput,
  MainContainer,
  Text,
} from '../../components';
import APPStyles from '../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, FlatList, Keyboard, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {onCategoriesResponse} from '../../redux/categories/actions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Caption, Chip, IconButton, List} from 'react-native-paper';
import moment from 'moment';
import {
  getOrdersApi,
  saveOrderApi,
  saveOrderStatus,
} from '../../api/orderingApi';
import APPMetrics from '../../utils/metrics';
import {moderateScale, scale} from 'react-native-size-matters';
import AppColors from '../../theme/appColors';
import {ORDER_TYPE} from '../../utils/enums';
import {appLog} from '../../utils/helpers';
import * as rootActions from '../../config/redux/actions/rootActions';

export type Props = {
  route?: any;
  navigation?: any;
};

export interface ICategory {
  categoryName: string;
}

function Orders(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  const [ordersFromDB, setOrdersFromDB] = useState<Array<any>>([]);
  const [menuItemsToShow, setMenuItemsToShow] = useState<Array<any>>([]);
  const [orderType, setOrderType] = useState<number>(ORDER_TYPE.NONE);
  const {t} = useTranslation();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      if (userData.id) {
        getOrderFromDB();
      }
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (orderType !== ORDER_TYPE.NONE) {
      setMenuItemsToShow(_.filter(ordersFromDB, {type: orderType}));
    } else {
      setMenuItemsToShow(ordersFromDB);
    }
  }, [orderType, ordersFromDB]);

  const onChipPressed = useCallback(
    (type: number) => () => {
      setOrderType(type);
    },
    [],
  );

  const getOrderFromDB = () => {
    dispatch(enableLoader(true));
    getOrdersApi(
      userData.id,
      userData.companies[0].id,
      (new Date().getFullYear() + 1).toString(),
      moment().format('YYYY, MM, DD'),
    ).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        setOrdersFromDB(result.data.orders);
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  };

  const onChangeOrderStatus = useCallback(
    (order: any) => () => {
      console.log('order', order);
      saveOrderStatus(order.id, userData.id).then((result: any) => {
        dispatch(enableLoader(true));
        if (result.success) {
          dispatch(rootActions.enableLoader(false));
          dispatch(enableModal(result.message));
          getOrderFromDB();
        } else {
          dispatch(rootActions.enableLoader(false));
          dispatch(enableModal(result.message, true));
        }
      });
    },
    [],
  );

  return (
    <MainContainer>
      <FormHeader
        title={t('orders')}
        hideBackButton={true}
        hideEditButton={true}
      />

      <View style={APPStyles.viewContainerComplete}>
        <View style={styles.chipsContainer}>
          <Chip
            style={{height: scale(22), margin: scale(2)}}
            selected={orderType === ORDER_TYPE.NONE}
            onPress={onChipPressed(ORDER_TYPE.NONE)}
            mode={'outlined'}
            textStyle={{
              fontSize: APPMetrics.smallFontSize,
            }}>
            {'All'}
          </Chip>
          <Chip
            style={{height: scale(22), margin: scale(2)}}
            selected={orderType === ORDER_TYPE.DINE_IN}
            onPress={onChipPressed(ORDER_TYPE.DINE_IN)}
            mode={'outlined'}
            textStyle={{
              fontSize: APPMetrics.smallFontSize,
            }}>
            {'Dine in'}
          </Chip>
          <Chip
            style={{height: scale(22), margin: scale(2)}}
            selected={orderType === ORDER_TYPE.TAKE_AWAY}
            onPress={onChipPressed(ORDER_TYPE.TAKE_AWAY)}
            mode={'outlined'}
            textStyle={{
              fontSize: APPMetrics.smallFontSize,
            }}>
            {'Take away'}
          </Chip>
          <Chip
            style={{height: scale(22), margin: scale(2)}}
            selected={orderType === ORDER_TYPE.DELIVERY}
            onPress={onChipPressed(ORDER_TYPE.DELIVERY)}
            mode={'outlined'}
            textStyle={{
              fontSize: APPMetrics.smallFontSize,
            }}>
            {'Delivery'}
          </Chip>
        </View>
        <FlatList
          data={menuItemsToShow}
          style={{width: '100%'}}
          ListEmptyComponent={() => (
            <Caption
              style={{
                fontSize: APPMetrics.smallFontSize,
                maxWidth: '80%',
                textAlign: 'center',
                alignSelf: 'center',
              }}
              numberOfLines={2}>
              {'No records were found'}
            </Caption>
          )}
          renderItem={({item, index, separators}) => (
            <List.Item
              style={{height: scale(40), padding: 0}}
              title={item.typeName}
              titleStyle={{fontSize: APPMetrics.normalFontSize}}
              descriptionStyle={{fontSize: APPMetrics.smallFontSize}}
              description={item.customerName}
              right={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: APPMetrics.smallFontSize,
                      textAlign: 'left',
                      width: scale(100),
                    }}
                    numberOfLines={2}>
                    {'Order #' + item.billNumber.toString()}
                  </Text>
                  <Text
                    style={{
                      fontSize: APPMetrics.smallFontSize,
                      textAlign: 'left',
                      width: scale(50),
                    }}
                    numberOfLines={2}>
                    {(item.total + item.totalTax).toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      fontSize: APPMetrics.smallFontSize,
                      textAlign: 'left',
                      width: scale(50),
                    }}
                    numberOfLines={2}>
                    {item.statusName}
                  </Text>
                  <Text
                    style={{
                      fontSize: APPMetrics.smallFontSize,
                      textAlign: 'left',
                      width: scale(50),
                    }}
                    numberOfLines={2}>
                    {item.paymentStatusName}
                  </Text>
                  <Button
                    onPress={onChangeOrderStatus(item)}
                    labelStyle={{
                      fontSize: APPMetrics.smallFontSize,
                      paddingHorizontal: 2,
                      marginHorizontal: 2,
                      textAlign: 'center',
                      width: scale(130),
                    }}
                    mode={'contained'}>
                    {t('Mark as in progress')}
                  </Button>
                </View>
              )}
            />
          )}
          keyExtractor={item => item.itemId}
        />
      </View>
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

export default Orders;
