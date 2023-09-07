import React from 'react';
import { Button } from '@tarojs/components';
import './index.less';

interface ContactProps {
  children: React.ReactNode;
}

const Contact: React.FC<ContactProps> = (props) => (
  <Button className="user_column_item_phone" openType="contact">
    {props.children}
  </Button>
);

export default Contact;
