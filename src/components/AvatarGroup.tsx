import { View, Text, Image } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { colors, typography } from '~/styles'
import CircleComponent from './CircleComponent'
import { RandomUtils } from '~/utils/random'
import SpaceComponent from './SpaceComponent'
import { randomUUID } from 'expo-crypto'


interface Props {
  textSize?:number;
  imageSize?:number;
  users:string[];
}

const photoUrl = 'https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg'

const AvatarGroup:React.FC<Props> = ({textSize,imageSize,users}) => {


  return (
    <RowComponent>
        {(users && users.length > 0)
          ?  <>
            {users.map((item,index) => (<Image 
              key={`AvatarGroup-${randomUUID()}`}
              style={{
                width:imageSize ?? 24,
                height:imageSize ?? 24,
                borderRadius:50,
                borderWidth:2,
                borderColor:colors.white,
                marginLeft: index != 0 ? -8 : undefined,
                zIndex:(-index)
              }}
              source={{uri:photoUrl}}
            />))}
            <SpaceComponent width={3}/>
            <TextComponent text='+20 Going' size={textSize ?? 12} font={typography.fontFamily.medium} color='#3F38DD'/>
            </>
          : <></>
        }
    </RowComponent>  
  )
}

export default AvatarGroup