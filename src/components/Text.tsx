import * as React from 'react';
import {Text as PaperText} from 'react-native-paper';
import {StyleSheet} from 'react-native';
export type Props = React.ComponentProps<typeof PaperText>;
export default function Text(props: Props) {
  return <PaperText style={styles.label} {...props} />;
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});
