import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { useEffect, useState } from "react";
import axios from 'axios';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Formik, Form, Field, FormikContext } from 'formik';
import * as Yup from 'yup';
import { CommonActions } from '@react-navigation/native';
const ProfileScreen = ({ navigation }) => {
    //Radio Button Related
    const radioProps = [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 },
    ];
    const [radiaVal, setRadiaVal] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [pageReferesh, setPageReferesh] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageMime, setImageMime] = useState(null);
    const [profileImage, setProfileImage] = useState('');
    const [savedRadioVal, setSavedRadioVal] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        getDataFromStorage();
        setPageReferesh(false);
    }, [pageReferesh]);

    //Formik Schema
    //////////////////////////
    const ProfileFormSchema = Yup.object().shape({
        name: Yup.string()
            .min(6, 'Name must be at least 6 digits')
            .max(16, 'Too long! it must be at least 16 digits')
            .required('Please Provide Your name'),
        email: Yup.string()
            .email('Invalid email')
            .required('Please Enter Your Email'),
        password: Yup.string()
            .min(8)
            .required('Please Provide Your Password')
            .matches(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                '"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
            ),
        imagetwo: Yup.string()
        .nullable()
        .required('Please Provide Your name'),
    })


    //Success Message
    const successShowMsg = (message) => {
        showMessage({
            message: 'Success',
            description: message,
            type: 'success',
            icon: 'success',
        });
    };
    //Error Message
    const errorShowMsg = (errorReceived) => {
        showMessage({
            message: 'Error',
            description: errorReceived.message,
            type: 'danger',
            icon: 'danger',
        });
    };

    const selectImage = (setFieldValue) => {
        ImagePicker.openPicker({
            width: 250,
            height: 250,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: true,
            avoidEmptySpaceAroundImage: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.5
        }).then(image => {
            setImageName(`image-${Date.now()}`);
            setImageMime(image.mime)
            setImagePath(image.path);
            //For Prevew - Making Base64
            //Image Picker giving incomplete base64 so make it complete
            const data64 = `data:${image.mime};base64,${image.data}`;
            setProfileImage(data64);
            setFieldValue('image','Test Mesage')
            setTimeout(() => {
                successShowMsg("Image Uploaded Sucessfully");
            }, 1000)

        }).catch((error) => {

        })
    }

    const getDataFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('userLogin_token');
            const trimmedToken = token.trim();
            getDataFromDatabase(trimmedToken);
        } catch (error) {
            errorShowMsg(error);
        }
    }
    //Get Data From Database
    const getDataFromDatabase = async (tokenEmail) => {
        try {
            if (tokenEmail) {
                let result = await axios.post('https://quiz-node-js.vercel.app/quiz/userIndividualDetail', { email: JSON.parse(tokenEmail) });
                setUserdata(result.data.data);
                let { name, email, password, userimage } = result.data.data;
                setProfileImage(userimage);
                setForm({
                    name,
                    email,
                    password
                })
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    //Log Out Handler
    //////////////////////////
    const logOutHandler = async () => {
        try {
          await AsyncStorage.removeItem('userLogin_token');
          await AsyncStorage.removeItem('isLoggenIn');
          navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:'LoginForm'}]
          }));
        } catch (error) {
          console.log(error);
        }
    }

    const handleUserProfile = async (form_values, resetForm) => {

        /** Image Upload through json **/
        /** ==================================================  **/
        //For Gender
        const gender = (radiaVal == null) ? userdata.gender : radiaVal;
        let newObj = {
            name: form_values.name.trim(),
            email: form_values.email.trim(),
            password: form_values.password.trim(),
            gender,
            role: form_values.role,
        }
        //check if image is upload or not
        if (imagePath !== null) { newObj.image = profileImage }

        /** Just For Reference ===> Image Upload using formData  **/
        /** ==================================================  **/
        // const formData = new FormData();
        // formData.append('name', form.name);
        // formData.append('email', form.email);
        // formData.append('password', form.password);
        // formData.append('gender', gender);
        // formData.append('role', "user");
        // if (imagePath !== null) { formData.append('image', profileImage); }

        try {
            let result = await axios.post('https://quiz-node-js.vercel.app/quiz/updateUser', newObj);
            if (result.data.data.hasOwnProperty('userimage')) {
                setProfileImage(result.data.data.userimage);
            }
            if(result.data.data.password !== userdata.password){
                //if password does not match! it means passwords are different
                setTimeout(() => {
                    successShowMsg("Data Added Sucessfully");
                    logOutHandler();
                }, 1000);
            }else{
                setTimeout(() => {
                    successShowMsg("Data Added Sucessfully");
                    navigation.dispatch(CommonActions.reset({
                        index:0,
                        routes:[{name:'HomeScreen'}]
                    }))
                }, 1000);
            }
            setIsShow(false);
            setPageReferesh(true);
        } catch (error) {
            console.log(error.response.data);
            errorShowMsg(error.response.data);
            setIsShow(false);
        }

    }
    return (

        <ScrollView style={styles.container}>
            {/* Edit Profile */}
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.headingBtn}>Edit Profile</Text>
            </View>

            {/* Form Input */}
            <View style={{ flex: 1 }}>
                <Formik
                    enableReinitialize={true}
                    validationSchema={ProfileFormSchema}
                    initialValues={{
                        name: userdata ? userdata.name : '',
                        email: userdata ? userdata.email : '',
                        password: userdata ? atob(userdata.password) : '',
                        imagetwo : '',
                        role: 'user',
                    }}>
                    {({
                        values,
                        errors,
                        handleChange,
                        setFieldTouched,
                        isValid,
                        touched,
                        dirty,
                        resetForm,
                        setFieldValue,
                        form
                    }) => (
                        <View>
                            {/* Profile Image */}
                            <View>
                                {/* Profile Circle  */}
                                {
                                    (userdata)
                                        ?
                                        (
                                            <View style={[styles.image_circle, { marginBottom: 20 }]}>
                                                {
                                                    (profileImage == "") ?
                                                        <Image
                                                            source={require('../images/dummyImage.jpg')}
                                                            style={{ width: 140, height: 140, borderRadius: 1000 }}
                                                        />
                                                        :
                                                        <Image
                                                            source={{ uri: profileImage}}
                                                            style={{ width: 140, height: 140, borderRadius: 1000 }}
                                                            
                                                        />
                                                }
                                                <TouchableOpacity onPress={()=>{
                                                    selectImage(setFieldValue);
                                                }}>
                                                    <Image
                                                        source={require('../images/edit_camera.png')}
                                                        style={{ width: 38, height: 38, position: 'absolute', left: 30, bottom: 10 }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                        :
                                        (
                                            <View style={[styles.image_circle, { marginBottom: 20 }]}>
                                                <Image
                                                    source={require('../images/avatar.png')}
                                                    style={{ width: 140, height: 140, borderRadius: 1000 }}
                                                />
                                                <Image
                                                    source={require('../images/edit_camera.png')}
                                                    style={{ width: 38, height: 38, position: 'absolute', right: 10, bottom: 10 }}
                                                />
                                            </View>
                                        )

                                }
                            </View>

                            {/* name */}
                            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 1000, height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingHorizontal: 20, marginVertical: 10 }}>
                                <View style={{ position: 'absolute', top: -10, backgroundColor: '#1F1147', left: 30 }}>
                                    <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 5 }}>Full Name</Text>
                                </View>
                                <View>
                                    <Text style={{ paddingRight: 10 }}>
                                        <MaterialIcons name="person-add" size={30} />
                                    </Text>
                                </View>
                                <TextInput placeholder="Enter Your Name"
                                    onChangeText={handleChange('name')}
                                    value={values.name} style={{ flex: 1 }} />
                            </View>
                            {errors.name && <Text>{errors.name}</Text>}
                            {/* email */}
                            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 1000, height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingHorizontal: 20, marginVertical: 10 }}>
                                <View style={{ position: 'absolute', top: -10, backgroundColor: '#1F1147', left: 30 }}>
                                    <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 5 }}>Email</Text>
                                </View>
                                <View>
                                    <Text style={{ paddingRight: 10 }}>
                                        <MaterialIcons name="email" size={30} />
                                    </Text>
                                </View>
                                <TextInput placeholder="Enter Your Email" editable={false} value={values.email} style={{ flex: 1 }} />
                            </View>
                            {errors.email && <Text>{errors.email}</Text>}
                            {/* password */}
                            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 1000, height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingHorizontal: 20, marginTop: 10 }}>
                                <View style={{ position: 'absolute', top: -10, backgroundColor: '#1F1147', left: 30 }}>
                                    <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 5 }}>Password</Text>
                                </View>
                                <View>
                                    <Text style={{ paddingRight: 10 }}>
                                        <MaterialIcons name="fingerprint" size={30} />
                                    </Text>
                                </View>
                                <TextInput placeholder="Enter Your Password" editable={!showPassword} secureTextEntry={showPassword} onChangeText={handleChange('password')} value={values.password} style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => {
                                    if (showPassword == false) { }
                                    else { setIsModal(true) }
                                }}>
                                    <MaterialIcons name="remove-red-eye" color={showPassword ? 'white' : 'red'} size={20} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text>{errors.password}</Text>}
                            {/* gender */}
                            <View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 20,
                                    }}>
                                    <Text style={[styles.displayParagraph, { marginBottom: 10 }]}>
                                        Please Select Your Gender
                                    </Text>
                                    <RadioForm
                                        buttonSize={16}
                                        buttonColor={'white'}
                                        style={{ paddingLeft: 50 }}
                                        labelStyle={{ fontSize: 16, color: 'white', paddingRight: 50 }}
                                        radio_props={radioProps}
                                        formHorizontal={true}
                                        initial={''}
                                        onPress={value => {
                                            if (value == 0) { setRadiaVal("male") }
                                            else { setRadiaVal("female") }
                                        }}
                                    />
                                </View>
                                <View style={{ backgroundColor: (userdata && userdata.gender == "male") ? '#F0F8FF' : '#FFD1DE', height: 40, width: '80%', borderRadius: 5000, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20, flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', fontFamily: 'Artegra Soft Bold' }}>  <MaterialIcons name="lock-outline" size={20} />  </Text><Text style={{ color: (userdata && userdata.gender == "male") ? '#6CB4EE' : '#c90076', fontFamily: 'Artegra Soft Bold' }}>{userdata && userdata.gender.toUpperCase()}</Text>
                                </View>
                            </View>
                            {/* Log Out */}
                            <TouchableOpacity
                                disabled={!dirty}
                                onPress={() => {
                                    handleUserProfile(values, resetForm);
                                    setIsShow(true);

                                }}
                                style={[styles.darkBtn, { opacity: isShow ? 0.5 : 1, backgroundColor: dirty ? '#6949FE' : '#808080', alignSelf: 'center' }]}>
                                {isShow ? <ActivityIndicator /> : <Text style={styles.headingBtn}>Save</Text>}
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
            <View style={{ justifyContent: 'center', }}>
                <Modal visible={isModal} animationType="slide" transparent>
                    {/* Transparent Layer */}
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center' }} onPress={() => setIsModal(false)}>
                        {/* contentBox */}

                        <View style={{ width: '100%', height: 300, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop: 15, paddingHorizontal: 30 }}>
                            <Text style={{ color: 'black', fontWeight: '800', fontSize: 20 }}>Confirm Password</Text>
                            <Text style={{ color: 'black', fontSize: 14 }}>Enter your current password for confirmation</Text>
                            <TextInput
                                onChangeText={(val) => setConfirmPassword(val)}
                                style={{ borderColor: 'black', color: 'black', borderWidth: 1, width: "95%", borderRadius: 250, paddingLeft: 20, fontWeight: '600', marginTop: 20 }}
                                placeholder='Enter Current Password'
                                placeholderTextColor="grey"
                                keyboardType='default' />
                            <TouchableOpacity
                                onPress={() => {
                                    if (confirmPassword == atob(userdata.password)) {
                                        setShowPassword(false);
                                    }
                                    setIsModal(false);
                                }}
                                style={[styles.darkBtn, { backgroundColor: '#6949FE', alignSelf: 'center' }]}>
                                <Text style={styles.headingBtn}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </ScrollView>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F1147',
        flex: 1,
        paddingHorizontal: 15
    },
    image_circle: {
        position: 'relative',
        width: 160,
        height: 160,
        borderRadius: 1000, // High value,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingBtn: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Artegra Soft Bold',
    },
    darkBtn: {
        width: 295,
        height: 68,
        backgroundColor: '#6949FE',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    }
});