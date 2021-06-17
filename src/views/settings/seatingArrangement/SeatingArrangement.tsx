import React, {useCallback, useState} from 'react';
import {Button, FormHeader, MainContainer, Text} from '../../../components';
import APPStyles from '../../../theme/styles';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard, StyleSheet, View} from 'react-native';
import {deleteSeatingArrangementAPI} from '../../../api/SettingsApi';
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

export type Props = {
  route?: any;
};

function SeatingArrangement(props: Props) {
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const seatingArrangement = useSelector(
    (state: any) =>
      state.orderSettingsReducer.OrderingSettings.seatingArrangement,
  );
  const userData = useSelector((state: any) => state.loginReducer.user);
  const {t} = useTranslation();

  const toggleEditMode = useCallback(() => {
    setEditMode(previousState => !previousState);
  }, []);

  const onDeletePressed = useCallback(
    (item: any) => () => {
      appLog('item', item);
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
    [],
  );

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
            {!isEditMode ? t('add') : t('cancel')}
          </Button>
          <Collapsible collapsed={!isEditMode} align="center">
            <SeatingArrangementItem
              allowEdit={isEditMode}
              onSubmitForm={() => appLog('onSubmitForm')}
            />
          </Collapsible>
          <View pointerEvents={isEditMode ? 'none' : 'auto'}>
            {!_.isEmpty(seatingArrangement)
              ? seatingArrangement.map((item: any) => (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    description={Array.prototype.map
                      .call(item.values, function (itemValues) {
                        return itemValues.value;
                      })
                      .join(', ')}
                    right={props => (
                      <View style={styles.chipsContainer}>
                        <IconButton
                          {...props}
                          icon="pencil-outline"
                          onPress={toggleEditMode}
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
