import * as React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
export type IProps = React.ComponentProps<typeof Button>;

export default function DefaultButton(props: IProps) {
  return (
    <Button
      style={styles.button}
      labelStyle={styles.label}
      {...props}
      dark={true}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
  },
  label: {
    fontSize: 20,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});
