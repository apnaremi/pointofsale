import * as React from 'react';
import {Button} from 'react-native-paper';
export type IProps = React.ComponentProps<typeof Button>;

export default function DefaultButton(props: IProps) {
  return <Button {...props} dark={true} theme={{roundness: 24}} />;
}
