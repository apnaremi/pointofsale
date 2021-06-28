import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FormInput} from '../../../components';
import {PIN_PLACE_HOLDER} from '../../../utils/constants';

export type Props = React.ComponentProps<typeof FormInput>;

const PinInput = React.forwardRef((props: Props, ref?: React.Ref<any>) => {
  return (
    <View>
      <FormInput
        {...props}
        style={styles.textInput}
        maxLength={1}
        secureTextEntry={true}
        ref={ref}
        placeholder={PIN_PLACE_HOLDER}
        hideWarning={true}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {paddingLeft: 12, width: 30},
});

PinInput.displayName = 'Input';
export default PinInput;
