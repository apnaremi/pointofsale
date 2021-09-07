import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormHeader, MainContainer, Text} from '../../components';
import APPStyles from '../../theme/styles';
import {useTranslation} from 'react-i18next';
import {Alert, FlatList, Keyboard, StyleSheet, View} from 'react-native';
import {Button} from '../../components';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {onCategoriesResponse} from '../../redux/categories/actions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {Caption, Chip, Menu, List, ToggleButton} from 'react-native-paper';
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

export type Props = {
  route?: any;
  navigation?: any;
};

const currentYear = new Date().getFullYear();

function Reports(props: Props) {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.loginReducer.user);
    const [visible, setVisible] = React.useState(false);
  const [ordersFromDB, setOrdersFromDB] = useState<Array<any>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sort, setSort] = useState<boolean>(false);
    const [value, setValue] = React.useState('left');
    const [year, setYear] = useState<number>(0);
    const [reportDate, setReportDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const {t} = useTranslation();
  const categoriesData = useSelector(
    (state: any) => state.categoriesReducer.categories,
  );

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      if (userData.id) {
        getOrderFromDB();
      }
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
      if((year === 0 && reportDate !== '') || year !== 0 && reportDate === ''){
          getOrderFromDB();
      }
  }, [selectedCategory, sort, year, reportDate]);

    useEffect(() => {
        setVisible(false);
        if (year !== 0){
            setReportDate('')
        }
    }, [year]);

    useEffect(() => {
        if (reportDate !== ''){
            setYear(0);
        }
    }, [reportDate]);


  const onChipPressed = useCallback(
    (type: string) => () => {
      setSelectedCategory(type);
    },
    [],
  );

  const getOrderFromDB = () => {
    dispatch(enableLoader(true));
    let params:any = {
      userId: userData.id,
      companyId: userData.companies[0].id,
      sort: sort,
    };
      if (selectedCategory) {
          params.category = selectedCategory;
      }

      if (year !== 0){
          params.year = year;
      }

      if (reportDate !== ''){
          params.date = reportDate;
      }

    getOrdersReportApi(params).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        setOrdersFromDB(result.data.orderItemSummaries);
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  };

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setReportDate(moment(date).format('YYYY-MM-DD'))
        hideDatePicker();
    };

  return (
    <MainContainer>
      <FormHeader
        title={'Reports'}
        hideBackButton={true}
        hideEditButton={true}
      />

      <View style={APPStyles.viewContainerComplete}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <View style={styles.chipsContainer}>
              <Chip
                style={{height: scale(22), margin: scale(2)}}
                selected={selectedCategory === ''}
                onPress={onChipPressed('')}
                mode={'outlined'}
                textStyle={{
                  fontSize: APPMetrics.smallFontSize,
                }}>
                {'All'}
              </Chip>
              {categoriesData.map((category: ICategory) => (
                <Chip
                  style={{height: scale(22), margin: scale(2)}}
                  selected={selectedCategory === category.id}
                  onPress={onChipPressed(category.id)}
                  mode={'outlined'}
                  textStyle={{
                    fontSize: APPMetrics.smallFontSize,
                  }}>
                  {category.name}
                </Chip>
              ))}
            </View>
              <View style={styles.chipsContainer}>
                  <ToggleButton.Group
                      onValueChange={value => {
                          setValue(value);
                          setSort(previousState => !previousState);
                      }}
                      value={value}>
                      <ToggleButton icon="chevron-down" value="left" />
                      <ToggleButton icon="chevron-up" value="right" />
                  </ToggleButton.Group>
              </View>
          </View>
          <View
              style={{
                  paddingTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: scale(140),
              }}>
              <Button mode={'contained'} icon="chevron-down" onPress={showDatePicker} >{reportDate === '' ? 'BY DATE' : reportDate}</Button>
              <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
              />
              <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<Button mode={'contained'} icon="chevron-down" onPress={openMenu}>{year === 0 ? 'BY YEAR' : year.toString() }</Button>}>
                  <Menu.Item onPress={() => setYear(currentYear + 1)} title={currentYear + 1} />
                  <Menu.Item onPress={() => setYear(currentYear)} title={currentYear} />
                  <Menu.Item onPress={() => setYear(currentYear - 1)} title={currentYear - 1} />
              </Menu>
          </View>
        <FlatList
          data={ordersFromDB}
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
              title={item.name}
              titleStyle={{fontSize: APPMetrics.normalFontSize}}
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
