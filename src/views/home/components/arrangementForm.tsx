import React, {useState} from 'react';
import {
  DropdownButton,
  MainContainer,
  Text,
  ModalHeader,
} from '../../../components';
import APPStyles from '../../../theme/styles';
import {StyleSheet, View} from 'react-native';
import {Menu} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {scale} from 'react-native-size-matters';
import AppColors from '../../../theme/appColors';
import * as navigationActions from '../../../navigation/actions';

export type Props = {
  route?: any;
};

function ArrangementForm(props: Props) {
  const [openSeatingMenu, setOpenSeatingMenu] = useState(false);
  const [selectedSeating, setSelectedSeating] = useState<any>({});
  const [openTableMenu, setOpenTableMenu] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>({});

  const seatingArrangement = useSelector(
    (state: any) =>
      state.orderSettingsReducer.OrderingSettings.seatingArrangement,
  );

  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <View style={APPStyles.largeModalContainer}>
          <ModalHeader title={'Dine in details'} />
          <View style={APPStyles.formContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Seating Arrangement'}
              </Text>
              <Menu
                visible={openSeatingMenu}
                onDismiss={() => setOpenSeatingMenu(false)}
                anchor={
                  <DropdownButton
                    title={
                      selectedSeating.name
                        ? selectedSeating.name
                        : 'Select Seating Arrangement'
                    }
                    onPress={() => setOpenSeatingMenu(true)}
                  />
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.LabelText}>
                {'Select Value'}
              </Text>
              <Menu
                visible={openTableMenu}
                onDismiss={() => setOpenTableMenu(false)}
                anchor={
                  <DropdownButton
                    title={
                      selectedTable.value ? selectedTable.value : 'Select Value'
                    }
                    disabled={
                      !(
                        selectedSeating.values &&
                        selectedSeating.values.length > 0
                      )
                    }
                    onPress={() => setOpenTableMenu(true)}
                  />
                }>
                {selectedSeating &&
                selectedSeating.values &&
                selectedSeating.values.length > 0
                  ? selectedSeating.values.map((element: any) => (
                      <Menu.Item
                        onPress={() => {
                          setOpenTableMenu(false);
                          setSelectedTable(element);
                          props.route.params.setArrangement(
                            selectedSeating,
                            element,
                          );
                          navigationActions.goBack();
                        }}
                        title={element.value}
                      />
                    ))
                  : null}
              </Menu>
            </View>
          </View>
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  LabelText: {
    fontSize: scale(10),
    color: AppColors.dark_gray_text,
    fontWeight: 'bold',
    alignSelf: 'center',
    width: '35%',
  },
});

export default ArrangementForm;
