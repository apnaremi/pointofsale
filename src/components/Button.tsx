import * as React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import APPMetrics from '../utils/metrics';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
export type IProps = React.ComponentProps<typeof Button>;

export default function DefaultButton(props: IProps) {
  return (
    <Button
      style={styles.button}
      labelStyle={styles.label}
      contentStyle={{
        flexDirection: 'row-reverse', paddingHorizontal: -10}}
      {...props}
      dark={true}
    />
  );
}

const styles = StyleSheet.create({
  button: {height: scale(19)},
  label: {
    fontSize: APPMetrics.normalFontSize,
    textAlign: 'center',
    height: scale(12),
    top: scale(-2),
    marginHorizontal: 5,
  },
});
