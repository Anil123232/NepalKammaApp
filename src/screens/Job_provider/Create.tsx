import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {Formik} from 'formik';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Skills_data,
  payment_method,
  category,
} from '../GlobalComponents/SkillsData';
import MultiSelect from 'react-native-multiple-select';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottonSheetEditor from './BottonSheetEditor';
import {Picker} from '@react-native-picker/picker';

interface CreateJobDetailsProps {
  job_title: string;
  location: string;
  // job_description: string;
  phonenumber: string;
  price: number;
  // skills_required: Array<typeof Skills_data>;
}

const initialValues: CreateJobDetailsProps = {
  job_title: '',
  location: '',
  phonenumber: '',
  price: 500,
};

function CreateForm() {
  // skills
  const [selectedItem, setSelectedItem] = React.useState<any>([]);
  // payment method
  const [selectedItem2, setSelectedItem2] = React.useState<any>([]);
  // category
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  // job description
  const [job_description, setJobDescription] = React.useState<string>('');

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCreateJob = (values: CreateJobDetailsProps) => {
    const newValues = {
      ...values,
      skills_required: selectedItem,
      payment_method: selectedItem2,
      category: selectedCategory,
      job_description: job_description,
    };
    console.log(newValues);
  };

  return (
    <View className="w-[100%] py-5 bg-white flex items-center justify-center">
      <View className="w-[85%] flex flex-row gap-x-2 pb-4">
        <Text
          className="text-black"
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: responsiveFontSize(3),
          }}>
          Create a
        </Text>
        <Text
          className="text-color2"
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: responsiveFontSize(3),
          }}>
          Job
        </Text>
      </View>
      <View className="w-[85%]">
        <Formik
          initialValues={initialValues}
          onSubmit={(values: CreateJobDetailsProps) => {
            handleCreateJob(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <View className="gap-y-2">
                {/* job_title */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Title
                  </Text>
                  <TextInput
                    className="bg-[#effff8] rounded-md text-black px-2"
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    placeholder="Job Title"
                    placeholderTextColor="#bdbebf"
                    onChangeText={handleChange('job_title')}
                    onBlur={handleBlur('job_title')}
                    value={values.job_title}
                  />
                  {errors.job_title && (
                    <Text
                      className="text-red-500"
                      style={{fontFamily: 'Montserrat-Regular'}}>
                      {errors.job_title}
                    </Text>
                  )}
                </View>
                {/* location */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Location
                  </Text>
                  <TextInput
                    className="bg-[#effff8] rounded-md text-black px-2"
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    placeholder="Enter Location"
                    placeholderTextColor="#bdbebf"
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                  />
                  {errors.location && (
                    <Text
                      className="text-red-500"
                      style={{fontFamily: 'Montserrat-Regular'}}>
                      {errors.location}
                    </Text>
                  )}
                </View>

                {/* phone number */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Phone Number
                  </Text>
                  <TextInput
                    className="bg-[#effff8] rounded-md text-black px-2"
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    placeholder="Enter phonenumber"
                    placeholderTextColor="#bdbebf"
                    onChangeText={handleChange('phonenumber')}
                    onBlur={handleBlur('phonenumber')}
                    value={values.phonenumber}
                  />
                  {errors.phonenumber && (
                    <Text
                      className="text-red-500"
                      style={{fontFamily: 'Montserrat-Regular'}}>
                      {errors.phonenumber}
                    </Text>
                  )}
                </View>

                {/* Skills required */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Skills Required
                  </Text>
                  <MultiSelect
                    hideTags={true}
                    items={Skills_data}
                    hideSubmitButton={true}
                    uniqueKey="id"
                    onSelectedItemsChange={(selectedItems): any => {
                      setSelectedItem(selectedItems);
                    }}
                    selectedItems={selectedItem}
                    selectText="Pick Skills"
                    searchInputPlaceholderText="Search Items..."
                    altFontFamily="Montserrat-Medium"
                    itemFontFamily="Montserrat-Regular"
                    itemFontSize={responsiveFontSize(1.75)}
                    selectedItemFontFamily="Montserrat-Regular"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#79AC78"
                    selectedItemIconColor="#79AC78"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                  />
                  <View className="flex flex-row">
                    <FlatList
                      horizontal={true}
                      data={selectedItem}
                      renderItem={({item}) => {
                        return (
                          <View
                            style={{marginBottom: responsiveHeight(1)}}
                            className="bg-gray-300 mr-2 py-1 px-2 rounded-md">
                            <Text
                              className="text-black"
                              style={{
                                fontSize: responsiveFontSize(1.75),
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              {Skills_data[item - 1].name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>

                {/* Job Description */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Job Description
                  </Text>
                  <TouchableOpacity onPress={() => handlePresentModalPress()}>
                    <Text
                      className="bg-[#effff8] rounded-md text-[#bdbebf] px-2 py-4"
                      style={{fontFamily: 'Montserrat-SemiBold'}}>
                      {job_description === ''
                        ? 'Enter job_description'
                        : 'Job Description added'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={1}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 24,
                    shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 20,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 24,
                    elevation: 30,
                    flex: 1,
                    overflow: 'scroll',
                  }}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}>
                  {/* <View className="flex flex-1 items-center rounded-t-2xl"> */}
                  <BottonSheetEditor
                    bottomSheetModalRef={bottomSheetModalRef}
                    setJobDescription={setJobDescription}
                    job_description={job_description}
                  />
                  {/* </View> */}
                </BottomSheetModal>

                {/* Payment methond */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Payment Method
                  </Text>
                  <MultiSelect
                    hideTags={true}
                    items={payment_method}
                    hideSubmitButton={true}
                    uniqueKey="id"
                    onSelectedItemsChange={selectedItems => {
                      setSelectedItem2(selectedItems);
                    }}
                    selectedItems={selectedItem2}
                    selectText="Pick Payment Method"
                    searchInputPlaceholderText="Search Items..."
                    altFontFamily="Montserrat-Medium"
                    itemFontFamily="Montserrat-Regular"
                    itemFontSize={responsiveFontSize(1.75)}
                    selectedItemFontFamily="Montserrat-Regular"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#79AC78"
                    selectedItemIconColor="#79AC78"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                  />
                  <View className="flex flex-row">
                    <FlatList
                      horizontal={true}
                      data={selectedItem2}
                      renderItem={({item}) => {
                        return (
                          <View
                            style={{marginBottom: responsiveHeight(1)}}
                            className="bg-gray-300 mr-2 py-1 px-2 rounded-md">
                            <Text
                              className="text-black"
                              style={{
                                fontSize: responsiveFontSize(1.75),
                                fontFamily: 'Montserrat-Regular',
                              }}>
                              {payment_method[item - 1].name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>

                {/* Price */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Price
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    className="bg-[#effff8] rounded-md text-black px-2"
                    style={{fontFamily: 'Montserrat-SemiBold'}}
                    placeholder="Enter price"
                    placeholderTextColor="#bdbebf"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price.toString()}
                  />
                  {errors.price && (
                    <Text
                      className="text-red-500"
                      style={{fontFamily: 'Montserrat-Regular'}}>
                      {errors.price}
                    </Text>
                  )}
                </View>

                {/* Category */}
                <View className="gap-y-2">
                  <Text
                    className="text-black"
                    style={{fontFamily: 'Montserrat-Medium'}}>
                    Category
                  </Text>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={itemValue => setSelectedCategory(itemValue)}
                    style={{
                      height: 40,
                      backgroundColor: '#effff8',
                      borderRadius: 20,
                      width: '100%',
                      color: 'black',
                      marginBottom: responsiveHeight(4),
                    }}>
                    {category.map(item => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                  </Picker>
                </View>

                {/* Add a submit button */}
                <View>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    activeOpacity={0.8}>
                    <View className="w-[100%] bg-color2 flex items-center justify-center rounded-md">
                      <Text
                        className="text-white"
                        style={{
                          paddingVertical: responsiveHeight(1.75),
                          paddingHorizontal: responsiveWidth(2),
                          fontFamily: 'Montserrat-Bold',
                          fontSize: responsiveFontSize(2.25),
                        }}>
                        Create Job
                        {/* {isSubmitting ? 'Signing Up...' : 'Sign Up'} */}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const Create = () => {
  return (
    // <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'white'}}>
    <BottomSheetModalProvider>
      <FlatList
        data={[{key: 'form-key', component: <CreateForm />}]}
        renderItem={({item}) => item.component}
      />
    </BottomSheetModalProvider>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: 'black',
    fontFamily: 'Montserrat-Medium',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default Create;
