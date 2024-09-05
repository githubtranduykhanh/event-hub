import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors, globalStyles, typography } from '~/styles';
import { Calendar, CloseCircle, Timer1 } from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import { TextHelper } from '~/utils/text';

interface Props{
    dateSelected:Date;
    mode:'date' |'time';
    onSelect:(date:Date,key:string) => void;
    testID:string;
    label:string;
}


const DateTimePickerComponent:React.FC<Props> = ({dateSelected,mode,onSelect,testID,label}) => {
  const [isShowDateTimePicker,setIsShowDateTimePicker] = useState<boolean>(false)

  const handleOnChange = (event: any, selectedDate?: Date) =>{
      const currentDate = selectedDate || dateSelected;
      onSelect(currentDate,testID);
  }

  const handleOnConfirm = () => {
    setIsShowDateTimePicker(false);
  }

  return (
    <View style={{flex:1}}>
      {label && <TextComponent font={typography.fontFamily.medium} text={label}/>}
      <RowComponent styles={[globalStyles.inputContainer]} onPress={()=>setIsShowDateTimePicker(true)}>
          <TextComponent style={{flex:1,textAlign:'center'}} text={`${mode === 'date' ? TextHelper.formatDateTime (dateSelected,'dd MMMM, yyyy') : TextHelper.formatDateTime (dateSelected,'hh:mm a')}`}/>
          {mode === 'date' ? <Calendar size={20}  color={colors.primary}/> : <Timer1 size={20} color={colors.primary}/>}
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