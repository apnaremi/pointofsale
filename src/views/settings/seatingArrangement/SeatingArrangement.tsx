import React, {useCallback, useState} from 'react';
import {Button, FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, StyleSheet, View} from 'react-native';
import {
  deleteSeatingArrangementAPI,
  putSeatingArrangementAPI,
} from '../../../api/SettingsApi';
import * as navigationActions from '../../../navigation/actions';
import {appLog} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {updateProfile} from '../../../redux/user/actions';
import {IconButton, Caption, Paragraph, List} from 'react-native-paper';
import {BILL_NUMBERING} from '../../../utils/enums';
import {deleteSeatingArrangementAction} from '../../../redux/orderSettings/actions';
import {navigateToLogin} from '../../../navigation/actions';
import Collapsible from 'react-native-collapsible';
import SeatingArrangementItem from './SeatingArrangementItem';
import * as orderSettingsActions from '../../../redux/orderSettings/actions';

export type Props = {
  route?: any;
};

function SeatingArrangement(props: Props) {
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const [itemForEdit, setItemForEdit] = useState({});
  const seatingArrangement = useSelector(
    (state: any) =>
      state.orderSettingsReducer.OrderingSettings.seatingArrangement,
  );
  const userData = useSelector((state: any) => state.loginReducer.user);
  const {t} = useTranslation();

  const toggleEditMode = useCallback(() => {
    setEditMode(previousState => {
      if (previousState) {
        setItemForEdit({});
      }
      return !previousState;
    });
  }, []);

  const onPressEditItem = useCallback(
    (item: any) => () => {
      appLog('item', item);
      setItemForEdit({
        id: item.id,
        name: item.name,
        values: Array.prototype.map
          .call(item.values, itemValues => {
            return itemValues.value;
          })
          .join(', '),
      });
      toggleEditMode();
    },
    [],
  );

  const onDeletePressed = useCallback(
    (item: any) => () => {
      Alert.alert(t('seating_arrangement'), t('are_you_sure'), [
        {
          text: t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('ok'),
          onPress: () => {
            dispatch(enableLoader(true));
            deleteSeatingArrangementAPI(
              item.id,
              userData.id,
              userData.companies[0].id,
            ).then((result: any) => {
              dispatch(enableLoader(false));
              if (result.success) {
                dispatch(deleteSeatingArrangementAction(item.id));
              } else {
                dispatch(enableModal(result.message, true));
              }
            });
          },
        },
      ]);
    },
    [],
  );

  const onSubmitForm = useCallback((values: any, itemSent: any) => {
    appLog('values', values);
    appLog('values', itemSent);
    dispatch(enableLoader(true));

    let newSeatingArrangement = seatingArrangement.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        values: Array.prototype.map
          .call(item.values, itemValues => {
            return itemValues.value;
          })
          .join(', '),
      };
    });

    if (!itemSent.id) {
      newSeatingArrangement.push(values);
    } else {
      _.remove(newSeatingArrangement, (currentObject: any) => {
        return currentObject.id === itemSent.id;
      });
      newSeatingArrangement.push({
        id: itemSent.id,
        name: values.name,
        values: values.values,
      });
    }
    putSeatingArrangementAPI(
      userData.id,
      userData.companies[0].id,
      newSeatingArrangement,
    ).then((result: any) => {
      if (result.success) {
        dispatch(
          orderSettingsActions.requestOrderingSettings(
            {userId: userData.id, companyId: userData.companies[0].id},
            () => {
              dispatch(enableLoader(false));
              toggleEditMode();
            },
            () => dispatch(enableLoader(false)),
          ),
        );
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  return (
    <MainContainer>
      <FormHeader
        title={t('seating_arrangement')}
        hideBackButton={true}
        hideEditButton={true}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={APPStyles.scrollContentContainer}>
        <View style={APPStyles.viewContainerComplete}>
          <Button
            mode={'contained'}
            onPress={toggleEditMode}
            style={APPStyles.commonButton}>
            {!isEditMode ? t('add_more') : t('cancel')}
          </Button>
          <Collapsible collapsed={!isEditMode}>
            <SeatingArrangementItem
              allowEdit={isEditMode}
              onSubmitForm={onSubmitForm}
              itemForEdit={itemForEdit}
            />
          </Collapsible>
          <View pointerEvents={isEditMode ? 'none' : 'auto'}>
            {!_.isEmpty(seatingArrangement) && seatingArrangement.length > 0
              ? seatingArrangement.map((item: any) => (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    description={Array.prototype.map
                      .call(item.values, itemValues => {
                        return itemValues.value;
                      })
                      .join(', ')}
                    right={props => (
                      <View style={styles.chipsContainer}>
                        <IconButton
                          {...props}
                          icon="pencil-outline"
                          onPress={onPressEditItem(item)}
                        />
                        <IconButton
                          {...props}
                          icon="delete-outline"
                          onPress={onDeletePressed(item)}
                        />
                      </View>
                    )}
                  />
                ))
              : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    width: '20%',
  },
  ValuesInput: {
    width: '60%',
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SeatingArrangement;
