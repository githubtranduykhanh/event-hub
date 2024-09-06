import { View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SelectModel } from '~/models';
import TextComponent from './TextComponent';
import { colors, globalStyles, typography } from '~/styles';
import RowComponent from './RowComponent';
import { ArrowDown2, CloseCircle, SearchNormal1 } from 'iconsax-react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import InputComponent from './InputComponent';
import SpaceComponent from './SpaceComponent';
import { randomUUID } from 'expo-crypto';
import ButtonComponent from './ButtonComponent';
import { useDebounce } from '~/hooks';


interface Props{
    lable?:string;
    values:SelectModel[];
    selected?:string[];
    onSelect:(val:string[]) => void;
    multible?:boolean;
}


const activeBag:StyleProp<ViewStyle> = {
    backgroundColor:colors.primary
}

const DropdownPicker:React.FC<Props> = ({lable,values,selected,onSelect,multible}) => {
    const modalizeRef = useRef<Modalize>(null);
    const [search, setSearch] = useState<string>('')
    const [selectedItems, setSelectedItems] = useState<string[]>(selected??[])
    
    
    const handleOnPress =(select:SelectModel)=>{
        multible 
            ? setSelectedItems(prev => 
                prev.includes(select.value)
                    ? prev.filter(item => item !== select.value) // Nếu id đã có, xóa nó
                    : [...prev, select.value] // Nếu id chưa có, thêm nó vào
            )  
            : setSelectedItems((prev => 
                prev.includes(select.value)
                    ? prev.filter(item => item !== select.value) // Nếu id đã có, xóa nó
                    : [select.value] // Nếu id chưa có, thêm nó vào
            ))
    }

    const handleOpen = () => {
        setSelectedItems(selected ?? [])
        modalizeRef.current?.open()
    }

    const handleAgree = () => { 
        if(selectedItems.length > 0){
            onSelect(selectedItems) 
            modalizeRef?.current?.close()
        }
        else Alert.alert('Please select user !')
    }
  return (
    <>
        {lable && <TextComponent font={typography.fontFamily.medium} text={lable}/>}
        <RowComponent styles={[globalStyles.inputContainer]} onPress={handleOpen}>
            <TextComponent textAlign='center' flex={1} text={`Selected ${selected?.length}`}/>
            <ArrowDown2 size={20} color={colors.primary}/>
        </RowComponent>
        <Portal>
            <Modalize 
                ref={modalizeRef}
                HeaderComponent={
                    <RowComponent styles={{position:'relative',padding:10}}>
                    <InputComponent styles={{ flex: 1 }} allowClear affix={<SearchNormal1 size="22" color={colors.text} />} placeholder='Search...' value={search} onChange={(val) => setSearch(val)} />
                    <SpaceComponent width={5} />
                    <TouchableOpacity
                       
                        style={{
                            width: 58,
                            height: 58,
                            borderRadius: 12,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <SearchNormal1 size="22" color={colors.white} />
                    </TouchableOpacity>
                    <SpaceComponent width={5} />
                    <TouchableOpacity
                       onPress={() => modalizeRef?.current?.close()}
                        style={{
                            width: 58,
                            height: 58,
                            borderRadius: 12,
                            backgroundColor: colors.danger,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <CloseCircle size="22" color={colors.white} />
                    </TouchableOpacity>
                    </RowComponent>
                }
                FooterComponent={
                    <View style={{paddingVertical:30,paddingHorizontal:35}}>
                        <ButtonComponent type='primary' text='Agree' onPress={handleAgree}/>
                    </View>
                }

            >
            <View style={{flex:1,paddingHorizontal:20,paddingVertical:5}}>
                {values && search
                ?
                    values.filter(item => item.lable.toLowerCase().includes(search.toLowerCase())).map((item)=>(
                        <TouchableOpacity key={`DropdownPicker-${item.value}`} onPress={() => handleOnPress(item)} style={[{borderRadius:10,paddingHorizontal:12,paddingVertical:10,marginVertical:5},selectedItems.includes(item.value) ? activeBag : {}]}>
                            <TextComponent text={item.lable} color={selectedItems.includes(item.value) ? colors.white : colors.text}/>
                        </TouchableOpacity>
                    ))
                :values.map((item)=>(
                    <TouchableOpacity key={`DropdownPicker-${item.value}`} onPress={() => handleOnPress(item)} style={[{borderRadius:10,paddingHorizontal:12,paddingVertical:10,marginVertical:5},selectedItems.includes(item.value) ? activeBag : {}]}>
                        <TextComponent  text={item.lable} color={selectedItems.includes(item.value) ? colors.white : colors.text}/>
                    </TouchableOpacity>
                ))}
            </View>
            </Modalize>
        </Portal>
       
    </>
  )
}

export default DropdownPicker