import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { ArrowRight2 } from 'iconsax-react-native';
import { colors, typography } from '~/styles';


interface Props {
    title:string;
    onPress?:() => void
    rightTouchable?:ReactNode;
}

const TabBarComponent:React.FC<Props> = ({title,onPress,rightTouchable}) => {
  return (
    <RowComponent justify='space-between'>
        <TextComponent title size={18} lineHeight={34} text={title}/>
        {(onPress && !rightTouchable) 
          ? <TouchableOpacity onPress={onPress}>
              <RowComponent>
                  <TextComponent size={typography.fontSizeSmall} text='See All' color={colors.subColor}/>
                  <ArrowRight2 size={typography.fontSizeSmall} variant='Bold' color={colors.subColor}/>
              </RowComponent>
            </TouchableOpacity>
          : <TouchableOpacity onPress={onPress}>
            {rightTouchable}
          </TouchableOpacity>
        }
    </RowComponent>
  )
}

export default TabBarComponent