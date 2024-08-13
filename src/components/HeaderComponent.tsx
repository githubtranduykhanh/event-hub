import {TouchableOpacity, View } from "react-native"
import {RowComponent,TextComponent} from "../components"
import { ArrowLeft } from "iconsax-react-native"
import { memo, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, typography } from "../styles";


interface Props {
    title?: string;
    returnContainer: ReactNode;
    back?:boolean
}
  

const HeaderComponent:React.FC<Props> = ({title,back,returnContainer}) => {
    const navigation:any = useNavigation()
    return (
      <View style={{flex:1}}>
        {(title || back) 
        && (<RowComponent styles={{marginLeft:16,minWidth:48,minHeight:48}}>
            {back && (<TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.goBack()}>
                  <ArrowLeft  size={typography.fontSizeExtraLarge} color={colors.text}/>           
              </TouchableOpacity>)      
            }
            {title && (<TextComponent text={title} size={typography.fontSizeExtraLarge} font={typography.fontFamily.medium}/>)}
        </RowComponent>)}
        {returnContainer}
      </View>
    )
  }

  export default memo(HeaderComponent)