import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FormHeader,
  FormInput,
  MainContainer,
  Text,
} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, Keyboard, StyleSheet, View} from 'react-native';
import {
  Avatar,
  IconButton,
  List,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import * as navigationActions from '../../../navigation/actions';
import {IOrderItem} from '../View';
import AppColors from '../../../theme/appColors';

export type Props = {
  route?: any;
};

function SelectedItemForm(props: Props) {
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState<IOrderItem>(
    {} as IOrderItem,
  );

  useEffect(() => {
    if (props.route.params.item) {
      setSelectedItem(props.route.params.item);
    }
  }, [props.route.params]);

  const handleSubmit = useCallback(() => {
    props.route.params.onItemUpdated(selectedItem);
    navigationActions.goBack();
  }, [selectedItem]);

  const goBack = useCallback(() => {
    navigationActions.goBack();
  }, []);

  return (
    <MainContainer>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainerModal}>
        <View style={[APPStyles.modalContainer]}>
          <Title>{selectedItem.itemName}</Title>
          <View style={APPStyles.formContainer}>
            <List.Item
              title={selectedItem.price + ' x ' + selectedItem.quantity}
              right={props => (
                <IconButton
                  icon="plus"
                  color={AppColors.primary}
                  onPress={() => {
                    setSelectedItem({
                      ...selectedItem,
                      quantity: selectedItem.quantity + 1,
                    });
                  }}
                />
              )}
              left={props => (
                <IconButton
                  icon="minus"
                  color={AppColors.primary}
                  onPress={() => {
                    if (selectedItem.quantity > 1) {
                      setSelectedItem({
                        ...selectedItem,
                        quantity: selectedItem.quantity - 1,
                      });
                    }
                  }}
                />
              )}
            />
            <FormInput
              onChangeText={value => {
                setSelectedItem({
                  ...selectedItem,
                  description: value,
                });
              }}
              value={selectedItem.description}
              placeholder={'Notes'}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button mode={'contained'} onPress={handleSubmit}>
                {t('save')}
              </Button>
              <Button mode={'contained'} onPress={goBack}>
                {t('cancel')}
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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

export default SelectedItemForm;
