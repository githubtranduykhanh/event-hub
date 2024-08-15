import {TouchableOpacity, View } from "react-native"
import RowComponent from "../components/RowComponent"
import TextComponent from "../components/TextComponent"
import { ArrowLeft } from "iconsax-react-native"
import { memo, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "../styles";


interface Props {
    title?: string;  
    back?:boolean
}
  

const HeaderComponent:React.FC<Props> = ({title,back}) => {
    const navigation:any = useNavigation()
    return (title || back)  &&  (
        <RowComponent styles={{marginLeft:16,minWidth:48,minHeight:48}}>
              {back && (<TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.goBack()}>
                    <ArrowLeft  size={typography.fontSizeExtraLarge} color={colors.text}/>           
                </TouchableOpacity>)      
              }
              {title && (<TextComponent text={title} size={typography.fontSizeExtraLarge} font={typography.fontFamily.medium}/>)}
        </RowComponent>     
    )
  }

  export default memo(HeaderComponent)