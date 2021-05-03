import * as React from 'react';
import {Text as PaperText} from 'react-native-paper';
export type Props = React.ComponentProps<typeof PaperText>;
export default function Text(props: Props) {
  return <PaperText {...props} />;
}
