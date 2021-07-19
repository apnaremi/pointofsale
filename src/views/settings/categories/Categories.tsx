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
import {useDispatch} from 'react-redux';
import {
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {onCategoriesResponse} from '../../../redux/categories/actions';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {IconButton, List} from 'react-native-paper';
import {
  deleteCategoryAPI,
  getCategoriesAPI,
  saveCategoryAPI,
} from '../../../api/categoryApi';
import Collapsible from 'react-native-collapsible';
import {Formik, FormikProps} from 'formik';
import {appLog} from '../../../utils/helpers';

export type Props = {
  route?: any;
};

export interface ICategory {
  categoryName: string;
}

function Categories(props: Props) {
  const dispatch = useDispatch();
  const formRef = useRef<FormikProps<ICategory>>(null);
  const categoriesData = useSelector((state: any) => state.categoriesReducer.categories);
  const userData = useSelector((state: any) => state.loginReducer.user);
  const [isEditMode, setEditMode] = useState(false);
  const {t} = useTranslation();

  const onDeletePressed = useCallback(
    (item: any) => () => {
      Alert.alert(t('categories'), t('are_you_sure'), [
        {
          text: t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('ok'),
          onPress: () => {
            dispatch(enableLoader(true));
            deleteCategoryAPI(
              item.id,
              userData.id,
              userData.companies[0].id,
            ).then((result: any) => {
              dispatch(enableLoader(false));
              if (result.success) {
                getCategories();
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

  const toggleEditMode = useCallback(() => {
    setEditMode(previousState => {
      if (formRef.current) {
        formRef.current.resetForm();
      }
      return !previousState;
    });
  }, []);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.categoryName) {
      errors.categoryName = t('required_field');
    }
    return errors;
  }, []);

  const getCategories = useCallback(() => {
    if (userData) {
      dispatch(enableLoader(true));
      getCategoriesAPI(userData.id, userData.companies[0].id).then(
        (result: any) => {
          dispatch(enableLoader(false));
          if (result.success) {
            dispatch(onCategoriesResponse(result.data));
          } else {
            dispatch(enableModal(result.message, true));
          }
        },
      );
    }
  }, [userData]);

  const onSubmitForm = useCallback(
    values => {
      Keyboard.dismiss();
      appLog('values', values);

      saveCategoryAPI(
        userData.id,
        userData.companies[0].id,
        values.categoryName,
      ).then((result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          getCategories();
          toggleEditMode();
        } else {
          dispatch(enableModal(result.message, true));
        }
      });
    },
    [isEditMode],
  );

  return (
    <MainContainer>
      <FormHeader
        title={t('categories')}
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
            <Formik
              innerRef={formRef}
              validate={validateForm}
              enableReinitialize={true}
              validateOnChange={true}
              initialValues={{
                categoryName: '',
              }}
              onSubmit={onSubmitForm}>
              {({errors, handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                  <FormInput
                    onChangeText={handleChange('categoryName')}
                    onBlur={handleBlur('categoryName')}
                    value={values.categoryName}
                    placeholder={t('enter_name')}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    invalidLabel={errors.categoryName}
                    iconName={'layers'}
                    editable={isEditMode}
                  />

                  <Button
                    disabled={!isEditMode}
                    mode={'contained'}
                    onPress={handleSubmit}
                    style={APPStyles.commonButton}>
                    {t('save')}
                  </Button>
                </View>
              )}
            </Formik>
          </Collapsible>
          <View>
            {!_.isEmpty(categoriesData)
              ? categoriesData.map((item: any) => (
                  <List.Item
                    key={item.id}
                    title={item.name}
                    right={props => (
                      <View style={styles.chipsContainer}>
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
  chipButton: {
    margin: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
  },
});

export default Categories;
