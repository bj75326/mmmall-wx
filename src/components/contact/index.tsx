import { PropsWithChildren } from 'react';
import { Button } from '@tarojs/components';
import './index.less';

const Contact = (props: PropsWithChildren) => (
  <Button className="user_column_item_phone" openType="contact">
    {props.children}
  </Button>
);

export default Contact;
