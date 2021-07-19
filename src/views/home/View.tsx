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
      <View style={styles.item} key={event.item.id}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
          <Caption numberOfLines={1}>{event.item.name}</Caption>
          <Text numberOfLines={1}>${event.item.price}</Text>
        </View>
        {event.item.imageUrl ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: event.item.imageUrl,
            }}
          />
        ) : (
          <NoImage width={'100%'} height={'80%'} />
        )}
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
    <View style={{flex: 1.5, flexDirection: 'row', margin: 20, marginLeft: 0}}>
      <View
        style={{
          margin: 5,
        }}>
        <ToggleButton.Group
          onValueChange={value => setSelectedCategory(value)}
          value={selectedCategory}>
          <ToggleButton
            icon={() => (
              <View>
                <Text
                  numberOfLines={1}
                  style={{color: AppColors.primary, fontWeight: 'bold'}}>
                  {noCategory}
                </Text>
              </View>
            )}
            value={noCategory}
            style={{width: 100}}
          />
          {categoriesData.map((category: ICategory) => (
            <ToggleButton
              key={category.id}
              icon={() => (
                <View>
                  <Text style={{color: AppColors.primary, fontWeight: 'bold'}}>
                    {category.name}
                  </Text>
                </View>
              )}
              value={category.id}
              style={{width: 100}}
            />
          ))}
        </ToggleButton.Group>
      </View>
      <View
        style={{
          flex: 2.5,
        }}>
        <FlatList
          data={listToMatrix(menuItemsToShow, 5)}
          renderItem={renderRow}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={{flex: 1, marginLeft: 20}}>
        <View style={{height: '100%', justifyContent: 'space-between'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Chip mode={'outlined'}>Delivery</Chip>
              <Chip selected={true} mode={'outlined'}>
                Take away
              </Chip>
              <Chip mode={'outlined'}>Dine in</Chip>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <SearchableDropdown
                onItemSelect={(item: any) => {
                  appLog('onItemSelect', item);
                  setSelectedCustomer(item);
                }}
                containerStyle={{marginTop: 15, width: '70%'}}
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
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
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
          <Button mode={'contained'}>{t('send')}</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    height: 140,
    width: 140,
  },
  title: {
    fontSize: 10,
  },
  tinyLogo: {
    width: '100%',
    height: '90%',
  },
});
