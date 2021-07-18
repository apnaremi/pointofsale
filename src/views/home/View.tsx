import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';
import {appLog} from '../../utils/helpers';
import {Button} from '../../components';
import {useTranslation} from 'react-i18next';
import AppColors from '../../theme/appColors';
// @ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as navigationActions from '../../navigation/actions';
import _ from 'lodash';

type Props = {
  getCustomersFromDB: Function;
  menuItems: Array<any>;
  customersArray: Array<any>;
};

export default function HomeView(props: Props) {
  appLog('props', props);
  const {t} = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});

  const goToCustomer = () => {
    navigationActions.navigateToCustomer({onCustomerChosen});
  };

  const onCustomerChosen = (newCustomer: any) => {
    newCustomer.name =
      newCustomer.firstName +
      (newCustomer.lastName ? ' ' + newCustomer.lastName : '');
    setSelectedCustomer(newCustomer);
    props.getCustomersFromDB();
  };

  const renderItem = (event: any) => {
    return (
      <View style={styles.item}>
        <Text>{event.item.name}</Text>
        <Text>{event.item.imageUrl}</Text>
        <Text>{event.item.price}</Text>
      </View>
    );
  };

  const renderRow = (event: any) => (
    <FlatList
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
          flex: 0.15,
          borderWidth: 1,
          borderColor: AppColors.primary,
          margin: 5,
        }}
      />
      <View
        style={{
          flex: 2.5,
        }}>
        <FlatList
          data={props.menuItems}
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
    backgroundColor: AppColors.primary,
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.primary,
    margin: 5,
    height: 140,
    width: 140,
  },
  title: {
    fontSize: 10,
  },
});
