import {TouchableOpacity, View } from "react-native"
import RowComponent from "../components/RowComponent"
import TextComponent from "../components/TextComponent"
import { ArrowLeft } from "iconsax-react-native"
import { memo, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "../styles";
import {MaterialIcons} from '@expo/vector-icons';

interface Props {
    title?: string;  
    back?:boolean;
    icon?:ReactNode;
    color?:string;
}
  

const HeaderComponent:React.FC<Props> = ({title,back,icon,color}) => {
    const navigation:any = useNavigation()
    return (title || back)  &&  (
        <RowComponent justify='space-between' styles={{marginHorizontal:16,minWidth:48,minHeight:48,alignItems:'center'}}>
              <RowComponent>
              {back && (<TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.goBack()}>
                    <ArrowLeft  size={typography.fontSizeExtraLarge} color={color ?? colors.text}/>           
                </TouchableOpacity>)      
              }
              {title && (<TextComponent color={color ?? colors.text} text={title} size={typography.fontSizeExtraLarge} font={typography.fontFamily.medium}/>)}
              </RowComponent>
              {icon}
        </RowComponent>     
    )
  }

  export default memo(HeaderComponent)