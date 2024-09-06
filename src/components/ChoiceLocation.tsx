import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from './RowComponent'
import { colors, globalStyles } from '~/styles'
import TextComponent from './TextComponent'
import { ArrowRight2,Location } from 'iconsax-react-native'
import CardComponent from './CardComponent'
import  LocationModal  from '~/modals/LocationModal'

interface Props {
  onSubMitLocation:(location:string) => void;
  dataLocation:string
}



const ChoiceLocation:React.FC<Props> = ({onSubMitLocation,dataLocation}) => {
 
  const [isVibleModalLocotion, setIsVibleModelLocation] = useState<boolean>(false);

  
  return (
    <>
      <RowComponent styles={[globalStyles.inputContainer]} onPress={()=> setIsVibleModelLocation(true)}>
        <CardComponent styles={{justifyContent:'center',alignItems:'center',margin:0,marginBottom:0,width:45,height:45}} color={`#E5E5E5`}>
          <CardComponent styles={{justifyContent:'center',alignItems:'center',margin:0,marginBottom:0,width:30,height:30}} color={colors.white}>
            <Location size={15} variant='Outline' color={colors.primary} />
          </CardComponent>
        </CardComponent>
        <TextComponent numOfLine={1} style={{flex:1,marginLeft:10}} text={dataLocation}/>
        <ArrowRight2 color={colors.primary} size={20}/>
      </RowComponent>
      
      <LocationModal  visible={isVibleModalLocotion} onClose={setIsVibleModelLocation} onSubMit={onSubMitLocation}/>
    </>
  )
}

export default ChoiceLocation