import { View, Text, Modal, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors, globalStyles, typography } from '~/styles';
import { ArrowRight2, Calendar, CloseCircle, Timer1 } from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import { TextHelper } from '~/utils/text';

interface Props{
    dateSelected:Date;
    mode:'date' |'time';
    onSelect:(date:Date,key:string) => void;
    testID:string;
    label?:string;
    type?:'choose' | 'default';
    styles?:StyleProp<ViewStyle>;
}


const DateTimePickerComponent:React.FC<Props> = ({dateSelected,styles,mode,type,onSelect,testID,label}) => {
  const [isShowDateTimePicker,setIsShowDateTimePicker] = useState<boolean>(false)
  const [displayDate,setDisplayDate] = useState<boolean>(false)
  const handleOnChange = (event: any, selectedDate?: Date) =>{
      const currentDate = selectedDate || dateSelected;
      dateSelected.getTime() !== currentDate.getTime() && setDisplayDate(true)
      onSelect(currentDate,testID);
  }

  const handleOnConfirm = () => {
    setIsShowDateTimePicker(false);
    onSelect(dateSelected,testID);
    setDisplayDate(true)
  }
  

  return (
    <View style={{flex:1}}>
      {label && <TextComponent font={typography.fontFamily.medium} text={label}/>}
      <RowComponent styles={[globalStyles.inputContainer, type != 'default' ? {justifyContent:'space-between'} : undefined,styles]} onPress={()=>setIsShowDateTimePicker(true)}>
          {
            type === 'default' 
            ? <>
            <TextComponent style={{flex:1,textAlign:'center'}} text={`${mode === 'date' ? TextHelper.formatDateTime (dateSelected,'dd MMMM, yyyy') : TextHelper.formatDateTime (dateSelected,'hh:mm a')}`}/>
            {mode === 'date' ? <Calendar size={20}  color={colors.primary}/> : <Timer1 size={20} color={colors.primary}/>}
            </>
            : <>
              <RowComponent>
                {mode === 'date' ? <Calendar size={23}  color={colors.primary}/> : <Timer1 size={23} color={colors.primary}/>}
                <SpaceComponent width={5}/>
                {!displayDate ? <TextComponent text={mode === 'date'?'Choose from calender':'Choose from time'}/> :  <TextComponent  text={`${mode === 'date' ? TextHelper.formatDateTime (dateSelected,'dd MMMM, yyyy') : TextHelper.formatDateTime (dateSelected,'hh:mm a')}`}/>}
              </RowComponent>
              <ArrowRight2 size={20} color={colors.primary}/>
            </>
          }
      </RowComponent>
      <Modal
        transparent
        animationType="slide"
        visible={isShowDateTimePicker}
      >
       <View style={[{flex:1,backgroundColor:colors.white,paddingVertical: 42, paddingHorizontal: 20}]}>
        <RowComponent justify='flex-end'>
                      <TouchableOpacity onPress={() => setIsShowDateTimePicker(false)}>
                          <CloseCircle
                              size="32"
                              color={colors.text}
                          />
                      </TouchableOpacity>
          </RowComponent>
          <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <DateTimePicker        
                      testID={testID}
                      value={dateSelected}
                      mode={mode}
                      display='spinner'
                      onChange={handleOnChange}                    
            />
            <SpaceComponent height={10}/>
            <RowComponent>
              <ButtonComponent style={{flex:1}} type='primary' text='Confirm' onPress={handleOnConfirm}/>
            </RowComponent>
          </View>
       </View>
      </Modal>
    </View>
  )
}

export default DateTimePickerComponent