import React, {useCallback, useRef} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, FormInput} from '../../../components';
import {Formik, FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import APPStyles from '../../../theme/styles';
import _ from 'lodash';

type Props = {
  onSubmitForm: Function;
  allowEdit: boolean;
  itemForEdit: any;
};

export interface IPwsUpdate {
  name: string;
  values: string;
}

export default function SeatingArrangementItem(props: Props) {
  const formRef = useRef<FormikProps<IPwsUpdate>>(null);
  const field1Ref = React.createRef<any>();
  const field2Ref = React.createRef<any>();
  const {t} = useTranslation();

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, [props.allowEdit]);

  const onSubmitPassword = useCallback(() => {
    if (field2Ref.current) {
      field2Ref.current.focus();
    }
  }, [field2Ref]);

  const validateForm = useCallback(values => {
    const errors = {} as any;

    if (!values.name) {
      errors.name = t('required_field');
    }
    if (!values.values) {
      errors.values = t('required_field');
    }

    return errors;
  }, []);

  const onSubmitForm = useCallback(
    values => {
      Keyboard.dismiss();
      props.onSubmitForm(values, props.itemForEdit);
    },
    [props.itemForEdit],
  );

  return (
    <View style={APPStyles.viewContainerComplete}>
      <Formik
        innerRef={formRef}
        validate={validateForm}
        enableReinitialize={true}
        validateOnChange={true}
        initialValues={{
          name: (props.itemForEdit.name as string) || '',
          values: (props.itemForEdit.values as string) || '',
        }}
        onSubmit={onSubmitForm}>
        {({errors, handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <FormInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('values')}
              value={values.name}
              placeholder={t('enter_name')}
              returnKeyType="next"
              ref={field1Ref}
              onSubmitEditing={onSubmitPassword}
              invalidLabel={errors.name}
              iconName={'note'}
              editable={props.allowEdit}
            />
            <FormInput
              onChangeText={handleChange('values')}
              onBlur={handleBlur('values')}
              value={values.values}
              placeholder={t('add_details')}
              returnKeyType="done"
              ref={field2Ref}
              onSubmitEditing={handleSubmit}
              invalidLabel={errors.values}
              iconName={'layers'}
              editable={props.allowEdit}
            />

            <Button
              disabled={!props.allowEdit}
              mode={'contained'}
              onPress={handleSubmit}
              style={APPStyles.commonButton}>
              {t('save')}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 24,
  },
});
