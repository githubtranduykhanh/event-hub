import { View, Text, Alert, Modal, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AvatarComponent, ButtonComponent, ContainerComponent, InputComponent, LoadingPosition, RowComponent, SectionComponent, SpaceComponent, TextComponent, UploadImagePicker } from '~/components'
import { IUserProfile } from '~/models/UserModel'
import { colors, globalStyles, typography } from '~/styles'
import _ from 'lodash';
import { apiPutEmailProfileUser, apiPutMyProfileUser, apiSentCodeEmail } from '~/apis'
import { LoadingModal, SuccessModal, VericationEmailModal } from '~/modals'
import { CloseCircle } from 'iconsax-react-native'
import { Validate } from '~/utils/validate'
import { ApiHelper } from '~/apis/helper'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { addProfile } from '~/redux/features/profile/profileSlice'
import { addAuth } from '~/redux/features/auth/authSlice'
import { FileHelper } from '~/utils/file'
const EditProfileScreen = ({ navigation, route }: any) => {
    const { profile } = route.params
    const dispatch = useDispatch<AppDispatch>()
    const [isVericationEmailModal, setIsVericationEmailModal] = useState<boolean>(false)
    const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
    const [newEmail, setNewEmail] = useState<string>('');
    const [userProfile, setUserProfile] = useState<IUserProfile>(profile as IUserProfile);
    const [fileSelected, setFileSelected] = useState<string | null>(null)
    const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModelInputEmail, setModelInputEmail] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);  // Track progress
    const handleChangeValue = (key: string, value: string | undefined) => {
        setUserProfile(prev => {
            const prevData = prev as any; // Ép kiểu sang 'any' để tránh lỗi
            const keys = key.split('.');

            if (keys.length > 1) {
                const [parentKey, childKey] = keys;
                return {
                    ...prevData,
                    [parentKey]: {
                        ...prevData[parentKey],
                        [childKey]: value
                    }
                };
            } else {
                return { ...prevData, [key]: value };
            }
        });
    }
    const handleOnSelectUploadImagePicker = (type: string, imageString: string) => {
        setFileSelected(type === 'file' ? imageString : null)
        handleChangeValue('photoUrl', imageString)
    }

    const handleUpdate = async () => {
        if (_.isEqual(userProfile, profile)) {
            console.log('All values inside userProfile are the same as profile');
        } else {
            console.log('userProfile has been modified');
            if(fileSelected) {
                const urlImage = await FileHelper.uploadImageToFirebase(fileSelected, (progress) => setUploadProgress(progress))
                if(!urlImage) {
                  Alert.alert('Upload image failed !')
                  return
                } 
                userProfile.photoUrl = urlImage
            }
            setIsLoadingUpdateProfile(true)
            apiPutMyProfileUser({
                photoUrl:userProfile.photoUrl ?? '',
                familyName:userProfile.familyName ?? '',
                givenName:userProfile.givenName ?? '',
                fullName:userProfile.fullName  ?? '',
                bio:userProfile.bio ?? '',
            })
            .then((res)=> res.data)
            .then((data)=>{
                if (data.status) {
                    dispatch(addAuth({
                        photoUrl:userProfile.photoUrl ?? '',
                        fullName:userProfile.fullName  ?? '',            
                    }))
                    dispatch(addProfile({
                        photoUrl:userProfile.photoUrl ?? '',
                        familyName:userProfile.familyName ?? '',
                        givenName:userProfile.givenName ?? '',
                        fullName:userProfile.fullName  ?? '',
                        bio:userProfile.bio ?? '',
                    }))
                    setModalVisible(true)
                } else Alert.alert('Error', data.mes)
            })
            .catch(err =>{
                console.log(ApiHelper.getMesErrorFromServer(err))
            })
            .finally(()=>{
                setIsLoadingUpdateProfile(false)
            })
        }
    }
    const handelSendCode = () => {
        if (newEmail === '' || !Validate.email(newEmail)) {
            Alert.alert('Error', 'Missing input email')
            return;
        }
        
        setIsLoading(true)
        apiSentCodeEmail({ email: userProfile.email })
            .then(res => res.data)
            .then(data => {
                if (data.status) {
                    setCurrentNumbers(data.numbers ?? [])
                    setModelInputEmail(false)
                    setIsVericationEmailModal(true)
                } else Alert.alert('Error', data.mes)
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data.mes)
                    Alert.alert('Error', error.response.data.mes)
                } else {
                    Alert.alert('Error', 'An unknown error has occurred')
                    console.log({ message: 'An unknown error has occurred' })
                }
            })
            .finally(()=>{    
                setIsLoading(false)
            })
          
    }
    const handleFinally = (email: string) => {
        apiPutEmailProfileUser({email})
            .then((res) => res.data)
            .then((data)=>{
                if(data.status){
                    setIsVericationEmailModal(false)
                    setNewEmail('')
                    setModalVisible(true)
                    dispatch(addAuth({email}))
                }else Alert.alert('Error', data.mes)
            })
            .catch((err)=> console.log(ApiHelper.getMesErrorFromServer(err)))
    }
    return (
        <>
           
            <LoadingPosition visible={isLoadingUpdateProfile} zIndex={2}/> 
            <ContainerComponent isScroll back title={userProfile.fullName ?? userProfile.email}>
                
                <SectionComponent>
                    <UploadImagePicker image={userProfile.photoUrl ?? ''} onSelect={handleOnSelectUploadImagePicker} />
                </SectionComponent>
                <SectionComponent>
                    <InputComponent allowClear placeholder='Full Name' value={userProfile.fullName ?? ''} onChange={(val) => handleChangeValue('fullName', val)} />
                </SectionComponent>
                <SectionComponent>
                    <InputComponent allowClear placeholder='Given Name' value={userProfile.givenName ?? ''} onChange={(val) => handleChangeValue('givenName', val)} />
                </SectionComponent>
                <SectionComponent>
                    <InputComponent allowClear placeholder='Family Name' value={userProfile.familyName ?? ''} onChange={(val) => handleChangeValue('familyName', val)} />
                </SectionComponent>
                <SectionComponent>
                    <InputComponent allowClear multiline numberOfLines={3} placeholder='About' value={userProfile.bio ?? ''} onChange={(val) => handleChangeValue('bio', val)} />
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent text='Update' onPress={handleUpdate} type='primary' />
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent text='Update Email'  onPress={() => setModelInputEmail(true)} type='ouline' />
                </SectionComponent>
            </ContainerComponent>
           
            <Modal
                transparent
                statusBarTranslucent
                animationType='slide'
                visible={isModelInputEmail}
               
            >
                <SafeAreaView style={[globalStyles.modalOverlay, {justifyContent: 'flex-start' }]}>
                    <LoadingPosition visible={isLoading} zIndex={2}/> 
                    <View style={{ paddingHorizontal: 30 }}>
                        <RowComponent justify='flex-end' styles={{ width: '100%' }}>
                            <TouchableOpacity onPress={() => setModelInputEmail(false)}>
                                <CloseCircle
                                    size="32"
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </RowComponent>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '100%', backgroundColor: colors.white, borderRadius: 10, padding: 20 }}>
                                <TextComponent text='Email' font={typography.fontFamily.medium} />
                                <SpaceComponent height={5} />
                                <InputComponent allowClear placeholder='Email' value={newEmail} onChange={(val) => setNewEmail(val)} />
                                <SpaceComponent height={10} />
                                <ButtonComponent text='Send Code' type='primary' onPress={handelSendCode} />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
            <LoadingModal visible={uploadProgress > 0 && uploadProgress < 100}/>
            <SuccessModal timeout={2000} visible={modalVisible} onClose={() => setModalVisible(false)} />
            <VericationEmailModal visible={isVericationEmailModal} onClose={() => setIsVericationEmailModal(false)} numbers={currentNumbers} onFinally={handleFinally} email={newEmail} />
        </>
    )
}

export default EditProfileScreen