import { View, Text, Image, ImageBackground, Modal, StatusBar,SafeAreaView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import TextComponent from './TextComponent'
import imagePickerOptions, { KEY_OPTIONS } from '~/constants/imagePickerOption'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import * as ImagePicker from 'expo-image-picker';
import { CloseCircle, DocumentUpload } from 'iconsax-react-native'
import { colors, globalStyles, typography } from '~/styles'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'


interface Props{
    onSelect:(type:'file'|'url'|'null',imageString:string) => void
}


const UploadImagePicker:React.FC<Props> = ({onSelect}) => {
    const modalizeRef = useRef<Modalize>(null);
    const [image, setImage] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    const [showOption, setShowOption] = useState<boolean>(false);
    const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState<boolean>(false);
    





    const takePhoto = async () => {
        // Yêu cầu quyền truy cập vào camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Camera access denied!");
            return;
        }

        // Mở camera để chụp ảnh
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // Lấy URI của ảnh được chụp
            onSelect('file',result.assets[0].uri)
        }
    }


    const pickImage = async () => {
        // Yêu cầu quyền truy cập vào thư viện ảnh
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Access to photo library denied!");
            return;
        }

        // Mở thư viện ảnh
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // Lấy URI của ảnh được chọn
            onSelect('file',result.assets[0].uri)
        }
    }
    const handleOnPressOption = async (key: string) => {
        switch (key) {
            case KEY_OPTIONS.CAMERA:
                await takePhoto()     
                break;
            case KEY_OPTIONS.LIBRARY:
                await pickImage()   
                break;
            case KEY_OPTIONS.URL:
                setIsVisibleModalAddUrl(true)
                break;
            default:
                break;
        }
        modalizeRef?.current?.close()
    }

    const handleRemoveImage = () => {
        setImage('')
        setImageURL('')
        onSelect('null','')
        setShowOption(false)
    }

    const handleUploadImage = () =>{
        modalizeRef?.current?.open()
        setShowOption(false)
    }

    const handleShow  = () => {
        image ? setShowOption(prve => !prve) : modalizeRef?.current?.open()
    }

    const handleAgreeImageURL = () => {
        setImage(imageURL)
        onSelect('url',imageURL)
        setIsVisibleModalAddUrl(false)
    }
   
    return (
        <>
            <TouchableOpacity
                onPress={handleShow}
                style={{
                    padding: image ? 10 : 20,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    alignItems:image ? undefined : 'center'
                }}>

                {image
                    ? <ImageBackground
                        source={{ uri: image }}
                        style={{ flex: 1, height: 150, overflow: 'hidden', borderRadius: 10 }}
                        resizeMode='cover'
                    >
                        {showOption && <RowComponent styles={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} justify='space-around' align='center'>
                            <TouchableOpacity style={{
                                padding:15,
                                borderRadius:12,
                                borderWidth:1,
                                borderColor:colors.white
                            }} onPress={handleUploadImage}>
                                <DocumentUpload size={22} color={colors.white} />
                            </TouchableOpacity>
                           
                            <TouchableOpacity style={{
                                padding:15,
                                borderRadius:12,
                                borderWidth:1,
                                borderColor:colors.white
                            }} onPress={handleRemoveImage}>
                                <CloseCircle size={22} color={colors.white} />
                            </TouchableOpacity>
                        </RowComponent>}
                    </ImageBackground>
                    : <TextComponent text='Upload Image' />}
            </TouchableOpacity>
            <Portal>
                <Modalize
                    ref={modalizeRef}
                    adjustToContentHeight
                >
                    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 25 }}>
                        {imagePickerOptions.map((item) => (
                            <RowComponent
                                onPress={() => handleOnPressOption(item.key)}
                                styles={{
                                    padding: 10,
                                    margin: 5,
                                    borderRadius: 12,
                                    borderWidth: 1
                                }}
                                key={`imagePickerOptions-${item.key}`}>
                                {item.icon}
                                <SpaceComponent width={10} />
                                <TextComponent text={item.title} />
                            </RowComponent>
                        ))}
                    </View>
                </Modalize>
            </Portal>
            <Modal 
                transparent
                statusBarTranslucent
                animationType='slide'           
                visible={isVisibleModalAddUrl}
            >
                
                <SafeAreaView style={[globalStyles.modalOverlay,{justifyContent:'flex-start'}]}>
                    <View style={{paddingHorizontal:30}}>
                        <RowComponent justify='flex-end' styles={{width:'100%'}}>
                            <TouchableOpacity onPress={() => setIsVisibleModalAddUrl(false)}>
                                <CloseCircle
                                    size="32"
                                    color={colors.white}                            
                                />
                            </TouchableOpacity>
                        </RowComponent>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <View style={{width:'100%',backgroundColor:colors.white,borderRadius:10,padding:20}}>
                                    <TextComponent text='Image URL' font={typography.fontFamily.medium}/>
                                    <SpaceComponent height={5}/>
                                    <InputComponent 
                                        value={imageURL}
                                        onChange={(val) => setImageURL(val)}
                                        allowClear
                                        placeholder='Image URL'
                                    />
                                    <SpaceComponent height={10}/>
                                    <ButtonComponent  text='Argee' type='primary' onPress={handleAgreeImageURL}/>
                                </View>
                            </View>
                    </View>
                </SafeAreaView>             
            </Modal>
        </>
    )
}

export default UploadImagePicker