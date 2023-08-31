import { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { useHomeStore } from '../../store';
import './index.less';

export default function Index() {
  const { shop, init } = useHomeStore();

  useLoad(() => {
    console.log('Page loaded.');
  });

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View className="index">
      {shop.nav.map((navRecord, index) => (
        <Text key={index}>{navRecord.title}</Text>
      ))}
    </View>
  );
}
