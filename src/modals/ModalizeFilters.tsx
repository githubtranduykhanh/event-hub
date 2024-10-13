import { View, Text, ScrollView, FlatList, StyleProp, ViewStyle } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  ButtonComponent,
  CircleComponent,
  DateTimePickerComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "~/components";
import { SearchNormal1 } from "iconsax-react-native";
import { colors, globalStyles, typography } from "~/styles";
import ArrowRight from "../../assets/svgs/arrow-right.svg";
import { useSelector } from "react-redux";
import { appSelector } from "~/redux/store";
import { randomUUID } from "expo-crypto";
import { renderIconCategories } from "~/constants/categories";
interface IProps {
  onClose: () => void;
  visible: boolean;
}

const activeCategories:StyleProp<ViewStyle> = {
  borderColor:colors.primary
}

const activeTimeVsDate:StyleProp<ViewStyle> = {
  borderColor:colors.primary,
  backgroundColor:colors.primary
}




const ModalizeFilters: React.FC<IProps> = ({ visible, onClose }) => {
  const modalizeRef = useRef<Modalize>(null);
  const {categories} = useSelector(appSelector)
  const [selectCategories, setSelectCategories] = useState<string[]>([])
  const [selectTimeVsDate, setSelectTimeVsDate] = useState<string[]>([])
  const [calender,setCalender] = useState<Date>(new Date())

  const selectedToday = selectTimeVsDate.includes('today')
  const selectedTomorrow = selectTimeVsDate.includes('tomorrow')
  const selectedThisWeek = selectTimeVsDate.includes('this-week')
  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open(); // Mở modal khi visible = true
    } else {
      modalizeRef.current?.close(); // Đóng modal khi visible = false
    }
  }, [visible]);


  const handleSeletedCategory = (key:string) => {
    setSelectCategories(prve => prve.includes(key) 
      ? prve.filter(item => item !== key)
      : [...prve,key]
    )
  }

  const handleTimeVsDate = (key:string) => {
    setSelectTimeVsDate(prve => prve.includes(key) 
      ? prve.filter(item => item !== key)
      : [...prve,key]
    )
  }

  return (
    <Portal>
      <Modalize
        handlePosition="inside"
        modalStyle={{ borderTopEndRadius: 38, borderTopStartRadius: 38 }}
        onClose={onClose}
        ref={modalizeRef}
        HeaderComponent={
          <View
            style={{ paddingTop: 24, paddingHorizontal: 24 }}
          >
            <TextComponent
              title
              size={typography.fontSizeExtraLarge}
              text="Filter"
            />
            
          </View>
        }
        FooterComponent={
          <RowComponent justify='space-between' styles={{ paddingVertical: 30,paddingHorizontal:20 }}>
             <ButtonComponent
              style={[
                {
                  paddingHorizontal: 40,
                  paddingVertical:19,
                  backgroundColor:colors.white
                },
              ]}
              textStyle={[
                globalStyles.btnPrimaryText,
                {
                  fontSize: typography.fontSizeMedium,
                  fontFamily: typography.fontFamily.medium,
                  color:colors.text
                },
              ]}
              
              type="primary"
              text={`Reset`.toUpperCase()}
            />
            
            <ButtonComponent
              style={[
                {
                    paddingHorizontal: 66,
                    paddingVertical:19
                },
              ]}
              textStyle={[
                globalStyles.btnPrimaryText,
                {
                  fontSize: typography.fontSizeMedium,
                  fontFamily: typography.fontFamily.medium,
                },
              ]}
              
              type="primary"
              text={`Apply`.toUpperCase()}
            />
          </RowComponent>
        }
      >
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 5 }}
        >
          <FlatList
            style={{paddingTop:10,paddingBottom:20}}
            data={categories}
            horizontal
            keyExtractor={(item)=> randomUUID()}
            renderItem={({item}) => {

              const selected = selectCategories.includes(item.key)

              return (<View style={{alignItems:'center',marginRight:15}}>
                <CircleComponent onPress={ () => handleSeletedCategory(item.key)} size={63} 
                  styles={[{marginBottom:5,borderRadius:50,borderWidth:1,borderColor:'#B6B6B6'},selected ? activeCategories : undefined]} 
                  color={selected ? colors.primary :colors.white}>
                  {renderIconCategories(item.iconLibrary, item.iconName, 40,selected ? colors.white :'#B6B6B6')}
                </CircleComponent>
                <TextComponent text={item.title} size={typography.fontSizeSmall} lineHeight={23}/>
              </View>)
            }}
          />
          <TextComponent text="Time & Date" font={typography.fontFamily.semiBold} size={typography.fontSizeMedium} lineHeight={34}/>
          <RowComponent>
            <ButtonComponent 
              onPress={() => handleTimeVsDate('today')}
              style={[{marginRight:12,borderColor:colors.gray,borderWidth:1},selectedToday ? activeTimeVsDate : undefined]} 
              textStyle={{fontSize:15,lineHeight:25,color:selectedToday? colors.white :colors.gray}}
              text="Today" 
              type='ouline'
            />
             <ButtonComponent 
              onPress={() => handleTimeVsDate('tomorrow')}
              style={[{marginRight:12,borderColor:colors.gray,borderWidth:1},selectedTomorrow ? activeTimeVsDate : undefined]} 
              textStyle={[{fontSize:15,lineHeight:25,color:selectedTomorrow? colors.white :colors.gray}]}
              text="Tomorrow" 
              type='ouline'
            />
            <ButtonComponent 
              onPress={() => handleTimeVsDate('this-week')}
              style={[{marginRight:12,borderColor:colors.gray,borderWidth:1},selectedThisWeek ? activeTimeVsDate : undefined]} 
              textStyle={{fontSize:15,lineHeight:25,color:selectedThisWeek? colors.white :colors.gray}}
              text="This week" 
              type='ouline'
            />
           
           
          </RowComponent>
          <DateTimePickerComponent label='Date' testID='date' mode='date' dateSelected={calender} onSelect={(date,key) => setCalender(date)}/>
        </ScrollView>
      </Modalize>
    </Portal>
  );
};

export default ModalizeFilters;
