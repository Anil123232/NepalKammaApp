import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {
  KhatiSdk,
  KhatiPaymentResponse,
  KhatiPaymentEvent,
} from 'rn-all-nepal-payment';
import {SuccessToast} from '../../components/SuccessToast';
import {JobStore} from '../Job_provider/helper/JobStore';
import {ErrorToast} from '../../components/ErrorToast';
import {KhaltiStore} from './helper/KhaltiStore';
import {BACKEND_URL} from '../../global/config';

type khalitProps = any;

const Khalti = ({isVisible, setIsVisible, job_data, getCompletedJob}: any) => {
  //update job status
  const updateJobStatus = async (
    id: string,
    job_status: string,
    selectedUserId: string,
  ) => {
    try {
      const response = await (JobStore.getState() as any).EditJobStatus(
        id,
        job_status,
        selectedUserId ? selectedUserId : null,
      );
      getCompletedJob();
      SuccessToast('Job status updated successfully');
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }
  };

  const createPayment = async (
    paymentBy: string,
    paymentTo: string,
    job: string,
    amount: number,
  ) => {
    try {
      const response = await (KhaltiStore.getState() as any).createPayment(
        paymentBy,
        paymentTo,
        job,
        amount,
      );
      SuccessToast('Payment created successfully');
    } catch (error: any) {
      const errorMessage = error
        .toString()
        .replace('[Error: ', '')
        .replace(']', '');
      ErrorToast(errorMessage);
    }
  };

  const _onPaymentComplete = async (data: khalitProps) => {
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      const response = await axios.post(`${BACKEND_URL}/charge`, {
        token: resp.data.token,
        amount: resp.data.amount,
      });
      if (response.data.status === 'success') {
        createPayment(
          job_data?.postedBy._id,
          job_data?.assignedTo._id,
          job_data?._id,
          20,
        );
        updateJobStatus(job_data?._id, 'Paid', job_data?.assignedTo._id);
        SuccessToast('Payment Successful');
      }
    } else if (resp.event === 'ERROR') {
      ErrorToast('Payment Failed');
    }
  };

  return (
    <SafeAreaView>
      <KhatiSdk
        amount={20 * 100} // Number in paisa
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

export default React.memo(Khalti);
