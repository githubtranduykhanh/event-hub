import { View, Text, StyleProp, ViewStyle, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ModalizeSelectModel, SelectModel } from '~/models';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { ButtonComponent, InputComponent, RowComponent, TextComponent } from '~/components';
import { SearchNormal1 } from 'iconsax-react-native';
import { colors } from '~/styles';
import { useDebounce } from '~/hooks';


interface IProps {
    values:SelectModel[];
    selected:string[];
    multible?:boolean;
    onSelect:(val:string[]) => void;
    onClose:()=>void;
    visible:boolean;
    minimum?:number;
    setSelected: (value: React.SetStateAction<string[]>) => void
}
const activeBag:StyleProp<ViewStyle> = {
    backgroundColor:colors.primary
}

const ModalizeSelect:React.FC<IProps> = ({visible,values,multible,minimum,onSelect,onClose,selected,setSelected}) => {
    const modalizeRef = useRef<Modalize>(null);
    const [search, setSearch] = useState<string>('')
    const debounceSearch = useDebounce(search, 500)
    
    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open(); // Mở modal khi visible = true
        } else {
            modalizeRef.current?.close(); // Đóng modal khi visible = false
        }
    }, [visible]);

    const handleOnPress =(select:SelectModel)=>{
        multible 
            ? setSelected(prev => 
                prev.includes(select.value)
                    ? prev.filter(item => item !== select.value) // Nếu id đã có, xóa nó
                    : [...prev, select.value] // Nếu id chưa có, thêm nó vào
            )  
            : setSelected((prev => 
                prev.includes(select.value)
                    ? prev.filter(item => item !== select.value) // Nếu id đã có, xóa nó
                    : [select.value] // Nếu id chưa có, thêm nó vào
            ))
    }


    const handleAgree = () => { 
        if(minimum){
            if(selected.length > minimum){
                onSelect(selected) 
                modalizeRef?.current?.close()
            }
            else Alert.alert('Please select user !')
        }else{
            onSelect(selected) 
            modalizeRef?.current?.close()
        }
    }
    return (
        <Portal>
            <Modalize
                onClose={onClose}
                ref={modalizeRef}
                HeaderComponent={
                    <RowComponent styles={{position:'relative',padding:10}}>
                        <InputComponent 
                        styles={{ flex: 1 }} 
                        allowClear 
                        affix={<SearchNormal1 
                        size="22" 
                        color={colors.text} />} 
                        placeholder='Search...' 
                        value={search} 
                        onChange={(val) => setSearch(val)} />
                    </RowComponent>
                }
                FooterComponent={
                    <View style={{paddingVertical:30,paddingHorizontal:35}}>
                        <ButtonComponent type='primary' text='Agree' onPress={handleAgree}/>
                    </View>
                }
            >
                <ScrollView style={{flex:1,paddingHorizontal:20,paddingVertical:5}}>
                    {values && debounceSearch
                    ?
                        values.filter(item => item.lable.toLowerCase().includes(debounceSearch.toLowerCase())).map((item)=>(
                            <TouchableOpacity key={`DropdownPicker-${item.value}`} onPress={() => handleOnPress(item)} style={[{borderRadius:10,paddingHorizontal:12,paddingVertical:10,marginVertical:5},selected.includes(item.value) ? activeBag : {}]}>
                                <TextComponent text={item.lable} color={selected.includes(item.value) ? colors.white : colors.text}/>
                            </TouchableOpacity>
                        ))
                    :values.map((item)=>(
                        <TouchableOpacity key={`DropdownPicker-${item.value}`} onPress={() => handleOnPress(item)} style={[{borderRadius:10,paddingHorizontal:12,paddingVertical:10,marginVertical:5},selected.includes(item.value) ? activeBag : {}]}>
                            <TextComponent  text={item.lable} color={selected.includes(item.value) ? colors.white : colors.text}/>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            </Modalize>
        </Portal>
  )
}

export default ModalizeSelect