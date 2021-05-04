import * as React from 'react';
import {Button} from 'react-native-paper';
export type IProps = React.ComponentProps<typeof Button>;

export default function DefaultButton(props: IProps) {
  return (
    <Button
      style={{
        height: 45,
      }}
      labelStyle={{
        fontSize: 20,
        letterSpacing: -0.5,
        textAlign: 'center',
      }}
      {...props}
      dark={true}
      theme={{roundness: 24}}
    />
  );
}
