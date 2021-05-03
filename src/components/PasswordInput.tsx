import React, {useCallback, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {FormInput} from './index';

export type Props = React.ComponentProps<typeof FormInput>;

const Input = React.forwardRef((props: Props, ref?: React.Ref<any>) => {
  const [showPassword, setShowPassword] = useState(true);

  const onPressIcon = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <View>
      <FormInput
        {...props}
        secureTextEntry={showPassword}
        autoCapitalize={'none'}
        ref={ref}
      />
      {props.value ? (
        <IconButton
          icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
          style={styles.showIcon}
          onPress={onPressIcon}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  showIcon: {
    position: 'absolute',
    right: -5,
    top: 5,
  },
});

Input.displayName = 'Input';
export default Input;
