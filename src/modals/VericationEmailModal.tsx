import { View, Text, Alert, Modal, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import LoadingModal from './LoadingModal';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '~/components';
import { apiSentCodeEmail } from '~/apis';
import { colors, globalStyles, typography } from '~/styles';
import { ArrowRight, CloseCircle } from 'iconsax-react-native';
import { NumberHelper } from '~/utils/number';
import { TextHelper } from '~/utils/text';

interface IInputs {
    number1: string;
    number2: string;
    number3: string;
    number4: string;
}

interface IProps {
    visible:boolean;
    numbers: number[];
    email: string;
    onFinally: (email: string) => void;
    onClose:() => void;
}



const VericationEmailModal: React.FC<IProps> = ({ visible,onClose,onFinally, numbers = [], email = '' }) => {

    // Khởi tạo trạng thái với giá trị từ route.params
    const [currentNumbers, setCurrentNumbers] = useState<number[]>(numbers);
    const [disable, setDisable] = useState<boolean>(true)
    const [displayVerication, setDisplayVerication] = useState<boolean>(false)
    const [isLoadingVerication, setIsLoadingVerication] = useState<boolean>(false)
    const [inputs, setInputs] = useState<IInputs>({
        number1: '',
        number2: '',
        number3: '',
        number4: ''
    })

    const [textErrorMessage, setTextErrorMessage] = useState<string[] | null>(null)
    const [timeLeft, setTimeLeft] = useState(60); // Thời gian tính bằng giây (1 phút)


    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();


    useEffect(() => {
        if(!visible) {
            setDisplayVerication(false)
            setTextErrorMessage(null)
            setTimeLeft(60)
            setInputs({
                number1: '',
                number2: '',
                number3: '',
                number4: ''
            })
        }
    },[visible])


    useEffect(() => {
        if(numbers) setCurrentNumbers(numbers)
    },[numbers])


    useEffect(() => {
        let timer: NodeJS.Timeout
        if(visible){
            // Nếu thời gian còn lại là 0 thì không cần chạy bộ đếm ngược
            if (timeLeft <= 0) {
                setDisplayVerication(true)
                return
            }

            // Tạo một bộ đếm thời gian (timer)
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000); // Cập nhật mỗi giây
        }
        
        // Dọn dẹp bộ đếm thời gian khi component bị hủy hoặc khi thời gian còn lại là 0
        return () => clearInterval(timer);
    }, [timeLeft,visible]);



    useEffect(() => {
        setTextErrorMessage(null)
        setDisable(!Object.values(inputs).every(value => value !== ''))
    }, [inputs])

    const handleOnChange = (val: string, name: string, nextRef?: MutableRefObject<any>) => {
        setInputs(prve => ({ ...prve, [name]: val }))
        nextRef && val && nextRef.current.focus()
    }

    const handleContinue = () => {
        console.log(currentNumbers)
        if (Object.values(inputs).every((value, index) => +value === currentNumbers[index])) {
            onFinally(email)
        } else {
            setTextErrorMessage(['Invalid confirmation code'])
        }
    }

    const handleSendCode = () => {
        setInputs({
            number1: '',
            number2: '',
            number3: '',
            number4: ''
        })
        setIsLoadingVerication(true)
        apiSentCodeEmail({ email })
            .then((res => res.data))
            .then(data => {
                if (data.status) {
                    setCurrentNumbers(data.numbers ?? [])
                    setDisplayVerication(false)
                    setTimeLeft(60)
                } else {
                    Alert.alert('Error', data.mes)
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    console.log(error.response.data.mes)
                    Alert.alert('Error', error.response.data.mes)
                } else {
                    console.log({ message: 'An unknown error has occurred' })
                }
            })
            .finally(() => setIsLoadingVerication(false))
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType='slide'
            visible={visible}
        >
            <SafeAreaView style={[globalStyles.modalOverlay, {zIndex: 3,justifyContent: 'flex-start' }]}>
                <LoadingModal visible={isLoadingVerication} />
                <View style={{ paddingHorizontal: 10 }}>
                    <RowComponent justify='flex-end' styles={{ width: '100%' }}>
                        <TouchableOpacity onPress={onClose}>
                            <CloseCircle
                                size="32"
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </RowComponent>
                    <SpaceComponent height={20}/>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: '100%', backgroundColor: colors.white, borderRadius: 10, padding: 10 }}>
                            <SpaceComponent height={7} />
                            <SectionComponent>
                                <TextComponent text='Verification' title />
                                <TextComponent lineHeight={25}
                                    text={`We’ve send you the verification code on ${visible && email && TextHelper.maskEmail(email)}`} />
                                <SpaceComponent height={26} />
                                <RowComponent styles={{ justifyContent: 'space-around' }}>
                                    <InputComponent
                                        styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                                        styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                                        placeholder='-'
                                        type='numeric'
                                        value={inputs.number1}
                                        onChange={(val) => handleOnChange(val, 'number1', ref2)}
                                        inputRef={ref1}
                                        maxLength={1}
                                    />

                                    <InputComponent
                                        styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                                        styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                                        placeholder='-'
                                        type='numeric'
                                        value={inputs.number2}
                                        onChange={(val) => handleOnChange(val, 'number2', ref3)}
                                        inputRef={ref2}
                                        maxLength={1}
                                    />

                                    <InputComponent
                                        styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                                        styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                                        placeholder='-'
                                        type='numeric'
                                        value={inputs.number3}
                                        onChange={(val) => handleOnChange(val, 'number3', ref4)}
                                        inputRef={ref3}
                                        maxLength={1}
                                    />

                                    <InputComponent
                                        styles={{ width: 55, height: 55, justifyContent: 'center', padding: 0 }}
                                        styleInput={{ fontFamily: typography.fontFamily.medium, fontSize: typography.fontSizeExtraLarge, textAlign: 'center' }}
                                        placeholder='-'
                                        type='numeric'
                                        value={inputs.number4}
                                        onChange={(val) => handleOnChange(val, 'number4')}
                                        inputRef={ref4}
                                        maxLength={1}
                                    />
                                </RowComponent>
                                <SpaceComponent height={7} />
                                {textErrorMessage && textErrorMessage?.map((value, index) => (
                                    <TextComponent style={{ marginTop: 5 }} color={colors.danger} text={value} key={`TextErrorMessage-${index}`} />
                                ))}
                                <SpaceComponent height={40} />
                                {displayVerication
                                    ? (<>
                                        <ButtonComponent
                                            onPress={handleSendCode}
                                            textStyle={{ textAlign: 'center', marginRight: 0 }}
                                            iconFlex='right'
                                            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
                                            text='RESEND VERIFICATION EMAIL' type='primary'
                                        />
                                    </>)
                                    : (<>
                                        <ButtonComponent
                                            onPress={handleContinue}
                                            style={{ maxWidth: 271, alignSelf: 'center' }}
                                            textStyle={{ textAlign: 'center', marginRight: 0 }}
                                            iconFlex='right'
                                            icon={<ArrowRight style={{ position: 'absolute', right: 16 }} />}
                                            text='CONTINUE' type='primary'
                                            disable={disable}
                                        />
                                        <SpaceComponent height={24} />
                                        <RowComponent justify='center'>
                                            <TextComponent text='Re-send code in' />
                                            <SpaceComponent width={5} />
                                            <TextComponent text={NumberHelper.formatTime(timeLeft)} color={colors.primary} />
                                        </RowComponent>
                                    </>)}
                            </SectionComponent>
                        </View>
                    </View>
                </View>



            </SafeAreaView>
        </Modal>
    )
}

export default VericationEmailModal