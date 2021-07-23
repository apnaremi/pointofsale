import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet, Image} from 'react-native';
import {Chip} from 'react-native-paper';
import {appLog, listToMatrix} from '../../utils/helpers';
import {Button} from '../../components';
import {useTranslation} from 'react-i18next';
import AppColors from '../../theme/appColors';
import NoImage from '../../assets/images/noImage.svg';
import {ToggleButton, Caption, Paragraph, List} from 'react-native-paper';
// @ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as navigationActions from '../../navigation/actions';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {ICategory} from '../../config/models/data';
import * as rootActions from '../../config/redux/actions/rootActions';
import * as orderSettingsActions from '../../redux/orderSettings/actions';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import APPMetrics from '../../utils/metrics';

type Props = {
  getCustomersFromDB: Function;
  menuItems: Array<any>;
  customersArray: Array<any>;
};

const noCategory = 'All';

export default function HomeView(props: Props) {
  const categoriesData = useSelector(
    (state: any) => state.categoriesReducer.categories,
  );
  const [selectedCategory, setSelectedCategory] = React.useState(noCategory);
  const {t} = useTranslation();
  const [menuItemsToShow, setMenuItemsToShow] = useState<Array<any>>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});

  const goToCustomer = () => {
    navigationActions.navigateToCustomer({onCustomerChosen});
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

  const renderItem = (event: any) => {
    return (
      <View
        style={[styles.itemStyle, {borderWidth: event.item.imageUrl ? 0 : 1}]}
        key={event.item.id}>
        <View
          style={{
            flexDirection: event.item.imageUrl ? 'row' : 'column',
            justifyContent: event.item.imageUrl ? 'space-between' : 'center',
            alignItems: 'center',
            width: '100%',
            height: event.item.imageUrl ? '20%' : '100%',
          }}>
          <Caption
            numberOfLines={event.item.imageUrl ? 1 : 3}
            style={{
              fontSize: event.item.imageUrl
                ? APPMetrics.smallFontSize
                : APPMetrics.normalFontSize,
              textAlign: event.item.imageUrl ? 'left' : 'center',
              width: event.item.imageUrl ? '68%' : '100%',
            }}>
            {event.item.name}
          </Caption>
          <Text
            style={{
              fontSize: event.item.imageUrl
                ? APPMetrics.smallFontSize
                : APPMetrics.titleFontSize,
              fontWeight: event.item.imageUrl ? 'normal' : 'bold',
            }}
            numberOfLines={1}>
            ${event.item.price}
          </Text>
        </View>
        {event.item.imageUrl ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: event.item.imageUrl,
            }}
          />
        ) : null}
      </View>
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

  return (
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
              style={{width: scale(60)}}
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
                style={{width: scale(60)}}
              />
            ))}
          </ToggleButton.Group>
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <FlatList
            data={listToMatrix(menuItemsToShow, 4)}
            renderItem={renderRow}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          height: '77%',
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: moderateScale(5),
              justifyContent: 'space-between',
            }}>
            <Chip
              mode={'outlined'}
              textStyle={{fontSize: APPMetrics.smallFontSize}}>
              Delivery
            </Chip>
            <Chip
              selected={true}
              mode={'outlined'}
              textStyle={{fontSize: APPMetrics.smallFontSize}}>
              Take away
            </Chip>
            <Chip
              mode={'outlined'}
              textStyle={{fontSize: APPMetrics.smallFontSize}}>
              Dine in
            </Chip>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: moderateScale(5),
            }}>
            <SearchableDropdown
              onItemSelect={(item: any) => {
                appLog('onItemSelect', item);
                setSelectedCustomer(item);
              }}
              containerStyle={{width: scale(130), marginRight: 5}}
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
                placeholder: !_.isEmpty(selectedCustomer)
                  ? selectedCustomer.name
                  : t('select_customer'),
                style: {
                  padding: moderateScale(3),
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
        <Button style={{width: '100%'}} mode={'contained'}>
          {t('send_order')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    margin: 5,
    height: verticalScale(80),
    width: scale(75),
    alignItems: 'center',
    borderColor: AppColors.gray_normal,
  },
  title: {
    fontSize: 10,
  },
  tinyLogo: {
    width: '100%',
    height: '90%',
  },
});
