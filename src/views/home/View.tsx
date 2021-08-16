import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Text, StyleSheet, Image} from 'react-native';
import {appLog, listToMatrix} from '../../utils/helpers';
import {Button} from '../../components';
import {useTranslation} from 'react-i18next';
import AppColors from '../../theme/appColors';
import {
  ToggleButton,
  Caption,
  Chip,
  TouchableRipple,
  List,
  IconButton,
  Menu,
  Avatar,
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as navigationActions from '../../navigation/actions';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {ICategory} from '../../config/models/data';
import * as rootActions from '../../config/redux/actions/rootActions';
import * as orderSettingsActions from '../../redux/orderSettings/actions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import APPMetrics from '../../utils/metrics';
import {BILL_NUMBERING, ORDER_TYPE, PAYMENT_TYPE} from '../../utils/enums';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
// @ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';

export interface IOrderItem {
  itemId: string;
  itemName: string;
  description?: string;
  price: number;
  quantity: number;
  taxes?: Array<IOrderItemTax>;
  orderSubItemTransactions?: Array<any>;
}

export interface IOrderItemTax {
  companyTaxId: string;
  gstAmount: number;
  rate: number;
  singleGstAmount: number;
  taxType: string;
}

type Props = {
  getCustomersFromDB: Function;
  menuItems: Array<any>;
  customersArray: Array<any>;
  saveOrder: Function;
  navigation?: any;
};

const noCategory = 'All';

export default function HomeView(props: Props) {
  const dispatch = useDispatch();
  const categoriesData = useSelector(
    (state: any) => state.categoriesReducer.categories,
  );

  const [openSeatingMenu, setOpenSeatingMenu] = useState(false);
  const [selectedSeating, setSelectedSeating] = useState<any>({});

  const [openTableMenu, setOpenTableMenu] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>({});

  const [showPaymentMenu, setShowPaymentMenu] = useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState(noCategory);
  const {t} = useTranslation();
  const [menuItemsToShow, setMenuItemsToShow] = useState<Array<any>>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});
  const [orderType, setOrderType] = useState<number>(ORDER_TYPE.NONE);
  const [selectedItems, setSelectedItems] = useState<Array<IOrderItem>>([]);

  const seatingArrangement = useSelector(
    (state: any) =>
      state.orderSettingsReducer.OrderingSettings.seatingArrangement,
  );

  const goToCustomer = () => {
    navigationActions.navigateToCustomer({onCustomerChosen});
  };

  const goToSelectedItem = (item: IOrderItem) => {
    navigationActions.navigateToSelectedItem({item, onItemUpdated});
  };

  const onItemUpdated = (item: IOrderItem) => {
    const newList = selectedItems.map(element => {
      if (element.itemId === item.itemId) {
        return {...item};
      }
      return {...element};
    });

    setSelectedItems(newList);
  };

  useEffect(() => {
    if (selectedCategory !== noCategory) {
      setMenuItemsToShow(
        _.filter(props.menuItems, {categoryId: selectedCategory}),
      );
    } else {
      setMenuItemsToShow(props.menuItems);
    }
  }, [selectedCategory, props.menuItems]);

  const onCustomerChosen = (newCustomer: any) => {
    newCustomer.name =
      newCustomer.firstName +
      (newCustomer.lastName ? ' ' + newCustomer.lastName : '');
    setSelectedCustomer(newCustomer);
    props.getCustomersFromDB();
  };

  const onSaveOrder = (paymentType: number) => {
    setShowPaymentMenu(false);
    if (orderType === ORDER_TYPE.NONE) {
      dispatch(enableModal('Order type is required.', true));
      return;
    }
    if (
      orderType === ORDER_TYPE.DINE_IN &&
      !selectedTable.seatingArrangementNameId
    ) {
      dispatch(enableModal('Seating Arrangement is required.', true));
      return;
    }
    let customerId = '';
    if (selectedCustomer && selectedCustomer.id) {
      customerId = selectedCustomer.id;
    }
    props.saveOrder(
      orderType,
      customerId,
      selectedItems,
      selectedTable,
      paymentType,
      onCancelOrder,
    );
  };

  const onCancelOrder = () => {
    setSelectedItems([]);
    setSelectedCustomer({});
    setOrderType(ORDER_TYPE.NONE);
  };

  const onPressItem = useCallback(
    (item: any) => (event: any) => {
      console.log('item', item);

      let itemExist: boolean = false;
      const newList = selectedItems.map(element => {
        if (element.itemId === item.id) {
          itemExist = true;
          return {...element, quantity: element.quantity + 1};
        }
        return {...element};
      });

      if (itemExist) {
        setSelectedItems(newList);
      } else {
        let taxesArray: Array<IOrderItemTax> = [];

        if (item && item.gstSummary && item.gstSummary.length > 0) {
          taxesArray = item.gstSummary.map((element: any) => {
            let tax: IOrderItemTax = {
              companyTaxId: element.id,
              gstAmount: 0, //Ask
              rate: element.rate,
              singleGstAmount: element.amount,
              taxType: element.taxType,
            };
            return tax;
          });
        }

        setSelectedItems(selectedItems => [
          ...selectedItems,
          {
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            quantity: 1,
            taxes: taxesArray,
            orderSubItemTransactions: [],
            description: '',
          },
        ]);
      }
    },
    [selectedItems],
  );

  const renderItem = (event: any) => {
    return (
      <TouchableRipple onPress={onPressItem(event.item)}>
        <List.Item
          style={styles.itemStyle}
          title={'$' + event.item.price}
          description={event.item.name}
          right={props => <List.Icon {...props} icon="plus" />}
          left={props =>
            event.item.imageUrl ? (
              <Avatar.Image
                size={scale(40)}
                source={{
                  uri: event.item.imageUrl,
                }}
              />
            ) : (
              <View style={{width: scale(40)}} />
            )
          }
        />
        {/*        <View
          style={[styles.itemStyle, {borderWidth: 1}]}
          key={event.item.id}>
          {event.item.imageUrl ? (
            <Image
              style={styles.tinyLogo}
              source={{
                uri: event.item.imageUrl,
              }}
            />
          ) : null}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <Caption
              numberOfLines={3}
              style={{
                fontSize: APPMetrics.normalFontSize,
                textAlign: 'center',
                width: '100%',
              }}>
              {event.item.name}
            </Caption>
            <Text
              style={{
                fontSize: APPMetrics.titleFontSize,
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              ${event.item.price}
            </Text>
          </View>
        </View>*/}
      </TouchableRipple>
    );
  };

  const renderRow = (event: any) => (
    <FlatList
      key={event}
      data={event.item}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  );

  const onChipPressed = useCallback(
    (type: number) => () => {
      setOrderType(type);
    },
    [],
  );

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginRight: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <ToggleButton.Group
              onValueChange={value => setSelectedCategory(value)}
              value={selectedCategory}>
              <ToggleButton
                icon={() => (
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: AppColors.secondary,
                        fontSize: APPMetrics.normalFontSize,
                        fontWeight: 'bold',
                      }}>
                      {noCategory}
                    </Text>
                  </View>
                )}
                value={noCategory}
                style={{width: scale(80)}}
              />
              {categoriesData.map((category: ICategory) => (
                <ToggleButton
                  key={category.id}
                  icon={() => (
                    <View>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: AppColors.secondary,
                          fontSize: APPMetrics.normalFontSize,
                          fontWeight: 'bold',
                        }}>
                        {category.name}
                      </Text>
                    </View>
                  )}
                  value={category.id}
                  style={{width: scale(80)}}
                />
              ))}
            </ToggleButton.Group>
          </View>
          <View
            style={{
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: AppColors.gray_normal,
            }}>
            <FlatList
              data={listToMatrix(menuItemsToShow, 2)}
              renderItem={renderRow}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: scale(5),
            width: scale(180),
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginVertical: moderateScale(5),
                justifyContent: 'space-around',
              }}>
              <Chip
                style={{height: scale(22)}}
                selected={orderType === ORDER_TYPE.DINE_IN}
                onPress={onChipPressed(ORDER_TYPE.DINE_IN)}
                mode={'outlined'}
                textStyle={{
                  fontSize: APPMetrics.smallFontSize,
                }}>
                {'Dine in'}
              </Chip>
              <Chip
                style={{height: scale(22)}}
                selected={orderType === ORDER_TYPE.TAKE_AWAY}
                onPress={onChipPressed(ORDER_TYPE.TAKE_AWAY)}
                mode={'outlined'}
                textStyle={{
                  fontSize: APPMetrics.smallFontSize,
                }}>
                {'Take away'}
              </Chip>
              <Chip
                style={{height: scale(22)}}
                selected={orderType === ORDER_TYPE.DELIVERY}
                onPress={onChipPressed(ORDER_TYPE.DELIVERY)}
                mode={'outlined'}
                textStyle={{
                  fontSize: APPMetrics.smallFontSize,
                }}>
                {'Delivery'}
              </Chip>
            </View>
            {orderType === ORDER_TYPE.DINE_IN ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Menu
                  visible={openSeatingMenu}
                  onDismiss={() => setOpenSeatingMenu(false)}
                  anchor={
                    <Button
                      mode={'contained'}
                      labelStyle={{
                        fontSize: APPMetrics.smallFontSize,
                        textAlign: 'center',
                        marginHorizontal: scale(2),
                        width: scale(100),
                      }}
                      style={{
                        justifyContent: 'center',
                      }}
                      onPress={() => setOpenSeatingMenu(true)}>
                      {selectedSeating.name
                        ? selectedSeating.name
                        : 'Select S. Arrangement'}
                    </Button>
                  }>
                  {seatingArrangement.map((element: any) => (
                    <Menu.Item
                      onPress={() => {
                        setOpenSeatingMenu(false);
                        setSelectedSeating(element);
                        setSelectedTable({});
                      }}
                      title={element.name}
                    />
                  ))}
                </Menu>
                <Menu
                  visible={openTableMenu}
                  onDismiss={() => setOpenTableMenu(false)}
                  anchor={
                    <Button
                      mode={'contained'}
                      disabled={
                        !(
                          selectedSeating.values &&
                          selectedSeating.values.length > 0
                        )
                      }
                      labelStyle={{
                        fontSize: APPMetrics.smallFontSize,
                        textAlign: 'center',
                        marginHorizontal: scale(2),
                        width: scale(55),
                      }}
                      style={{
                        justifyContent: 'center',
                      }}
                      onPress={() => setOpenTableMenu(true)}>
                      {selectedTable.value
                        ? selectedTable.value
                        : 'Select Table'}
                    </Button>
                  }>
                  {selectedSeating &&
                  selectedSeating.values &&
                  selectedSeating.values.length > 0
                    ? selectedSeating.values.map((element: any) => (
                        <Menu.Item
                          onPress={() => {
                            setOpenTableMenu(false);
                            setSelectedTable(element);
                          }}
                          title={element.value}
                        />
                      ))
                    : null}
                </Menu>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: moderateScale(4),
                width: '100%',
              }}>
              <SearchableDropdown
                onItemSelect={(item: any) => {
                  appLog('onItemSelect', item);
                  setSelectedCustomer(item);
                }}
                containerStyle={{width: scale(120)}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 300}}
                items={props.customersArray}
                defaultIndex={2}
                resetValue={false}
                textInputProps={{
                  disableFullscreenUI: true,
                  placeholder: !_.isEmpty(selectedCustomer)
                    ? selectedCustomer.name
                    : t('select_customer'),
                  style: {
                    paddingVertical: moderateScale(0),
                    paddingHorizontal: moderateScale(5),
                    borderWidth: 1,
                    borderColor: '#bbb',
                    borderRadius: 5,
                    fontSize: APPMetrics.normalFontSize,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              <Button mode={'contained'} onPress={goToCustomer}>
                {'+'}
              </Button>
            </View>
          </View>
          <FlatList
            data={selectedItems}
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
                {'No item selected, please touch one to select it'}
              </Caption>
            )}
            renderItem={({item, index, separators}) => (
              <TouchableRipple onPress={() => goToSelectedItem(item)}>
                <List.Item
                  style={{height: scale(30), padding: 0}}
                  title={item.price + ' x ' + item.quantity}
                  titleStyle={{fontSize: APPMetrics.normalFontSize}}
                  descriptionStyle={{fontSize: APPMetrics.smallFontSize}}
                  description={item.itemName}
                  right={() => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <IconButton
                        icon="delete-outline"
                        color={AppColors.primary}
                        size={scale(16)}
                        onPress={() => {
                          setSelectedItems(
                            selectedItems.filter(
                              element => element.itemId !== item.itemId,
                            ),
                          );
                        }}
                      />
                    </View>
                  )}
                />
              </TouchableRipple>
            )}
            keyExtractor={item => item.itemId}
            ListFooterComponent={() => (
              <Text
                style={{
                  fontSize: APPMetrics.titleFontSize,
                  maxWidth: '80%',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
                numberOfLines={2}>
                {selectedItems && selectedItems.length > 0
                  ? 'Total:' +
                    selectedItems.reduce(
                      (accum, item) => accum + item.price * item.quantity,
                      0,
                    )
                  : ''}
              </Text>
            )}
          />
        </View>
      </View>
      <View
        style={{
          width: scale(180),
          position: 'absolute',
          bottom: 10,
          right: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          disabled={_.isEmpty(selectedItems)}
          onPress={onCancelOrder}
          mode={'contained'}>
          {t('cancel')}
        </Button>
        <Button
          disabled={_.isEmpty(selectedItems)}
          onPress={() => onSaveOrder(PAYMENT_TYPE.NONE)}
          mode={'contained'}>
          {'order'}
        </Button>
        <Menu
          visible={showPaymentMenu}
          onDismiss={() => {
            setShowPaymentMenu(false);
            setShowPaymentMenu(false);
          }}
          anchor={
            <Button
              disabled={_.isEmpty(selectedItems)}
              onPress={() => setShowPaymentMenu(true)}
              mode={'contained'}>
              {'Check OUT'}
            </Button>
          }>
          <Menu.Item
            onPress={() => onSaveOrder(PAYMENT_TYPE.CASH)}
            title="Cash"
          />
          <Menu.Item
            onPress={() => onSaveOrder(PAYMENT_TYPE.CARD)}
            title="Card"
          />
          <Menu.Item
            onPress={() => onSaveOrder(PAYMENT_TYPE.CREDIT)}
            title="Credit"
          />
        </Menu>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: scale(150),
  },
  title: {
    fontSize: 10,
  },
  tinyLogo: {
    width: scale(35),
    height: scale(35),
  },
});
