import * as React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import APPMetrics from "../utils/metrics";
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
    margin: 15,
  },
  label: {
    fontSize: APPMetrics.normalFontSize,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
});
