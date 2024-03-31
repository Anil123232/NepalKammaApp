import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {
  KhatiSdk,
  KhatiPaymentResponse,
  KhatiPaymentEvent,
} from 'rn-all-nepal-payment';

type khalitProps = any;

const MyMileStone = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const _onPaymentComplete = (data: khalitProps) => {
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
     console.log({ resp })
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      console.log({ data: resp.data })
    } else if (resp.event === 'ERROR') {
     console.log({ error: resp.data })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text className='text-black'>Hello world</Text>
      <Button title={'Start Khalti'} onPress={() => setIsVisible(true)} />
      <KhatiSdk
        amount={100 * 100} // Number in paisa
        isVisible={isVisible} // Bool to show modal
        paymentPreference={[
          // Array of services needed from Khalti
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ]}
        productName={'Dragon'} // Name of product
        productIdentity={'1234567890'} // Unique product identifier at merchant
        onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
        productUrl={'http://gameofthrones.wikia.com/wiki/Dragons'} // Url of product
        publicKey={'test_public_key_c0bf6fc5255440bdb569eecf7cba47b1'} // Test or live public key which identifies the merchant
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyMileStone;
