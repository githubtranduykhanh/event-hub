import { View, Text, TouchableOpacity, TextInput, KeyboardType } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { EyeSlash,Eye } from 'iconsax-react-native';
import { colors, globalStyles } from '../styles';
import {AntDesign} from '@expo/vector-icons';
import TextComponent from '~/components/TextComponent';

interface Props { 
    value:string;
    onChange:(val:string)=>void;
    affix?:ReactNode;
    placeholder?:string;
    suffix?:ReactNode;
    isPassword?:boolean;
    allowClear?:boolean;
    type?:KeyboardType
    error?:string;
}


const InputComponent:React.FC<Props> = ({error,allowClear,type,value,onChange,affix,placeholder,suffix,isPassword}) => {
 
  
    const [isShowPassword,setIsShowPassword] = useState(isPassword ?? false)
    
   
    return (
    <>
    <View style={[globalStyles.inputContainer,{
        borderColor: (error && error != '') ? colors.danger : colors.inputBorder 
    }]}>
     {affix ?? affix}

    <TextInput
        style={[globalStyles.input,{
            marginLeft:affix ? 14 :0,
            marginRight:suffix ? 14 :0,           
        }]} 
        value={value}
        placeholder={placeholder ?? ''} 
        onChangeText={onChange} 
        secureTextEntry={isShowPassword}
        placeholderTextColor={colors.subColor}
        keyboardType={type ?? 'default'}
    />

     {suffix ?? suffix}
     <TouchableOpacity style={{marginLeft:5}} onPress={() => isPassword ? setIsShowPassword(prve => !prve) : onChange('')}>
        {isPassword 
        ? isShowPassword ? <Eye size={22} color={colors.gray}/> :  <EyeSlash size={22} color={colors.gray}/>            
        : value.length > 0 && allowClear && <AntDesign name='close' size={22} color={colors.gray}/>}
     </TouchableOpacity>
    </View>
    {error && <TextComponent style={{marginTop:5}} text={error} color={colors.danger}/>}
    </>
  )
}

export default InputComponent