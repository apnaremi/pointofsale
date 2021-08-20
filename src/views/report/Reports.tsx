import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormHeader, MainContainer, Text} from '../../components';
import APPStyles from '../../theme/styles';
import {useTranslation} from 'react-i18next';
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
  getOrdersReportApi,
  saveOrderApi,
  saveOrderStatus,
} from '../../api/orderingApi';
import APPMetrics from '../../utils/metrics';
import {moderateScale, scale} from 'react-native-size-matters';
import AppColors from '../../theme/appColors';
import {ORDER_TYPE} from '../../utils/enums';
import {appLog} from '../../utils/helpers';
import * as rootActions from '../../config/redux/actions/rootActions';
import {ICategory} from "../../config/models/data";

export type Props = {
  route?: any;
  navigation?: any;
};

function Reports(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
  const [ordersFromDB, setOrdersFromDB] = useState<Array<any>>([]);
  const [menuItemsToShow, setMenuItemsToShow] = useState<Array<any>>([]);
  const [orderType, setOrderType] = useState<number>(ORDER_TYPE.NONE);
  const {t} = useTranslation();
  const categoriesData = useSelector(
    (state: any) => state.categoriesReducer.categories,
  );

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
    let params = {
      userId: userData.id,
      companyId: userData.companies[0].id,
      sort: false,
      year: new Date().getFullYear(),
    };
    getOrdersReportApi(params).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        setOrdersFromDB(result.data.orderItemSummaries);
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  };

  return (
    <MainContainer>
      <FormHeader
        title={'Reports'}
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
          {categoriesData.map((category: ICategory) => (
            <Chip
              style={{height: scale(22), margin: scale(2)}}
              selected={orderType === ORDER_TYPE.DINE_IN}
              onPress={onChipPressed(ORDER_TYPE.DINE_IN)}
              mode={'outlined'}
              textStyle={{
                fontSize: APPMetrics.smallFontSize,
              }}>
              {category.name}
            </Chip>
          ))}
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
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: APPMetrics.smallFontSize,
                      textAlign: 'left',
                      width: scale(50),
                    }}
                    numberOfLines={2}>
                    {item.totalAmount.toFixed(2)}
                  </Text>
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

export default Reports;
