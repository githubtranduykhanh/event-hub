import { View, Text,Image } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { globalStyles } from '~/styles';
import { ThumbSlider } from 'assets/svgs';

interface IProps{
    range: [number, number]; // Range là một mảng chứa 2 số [minPrice, maxPrice]
    onValuesChange: (values: number[]) => void; // Hàm callback khi thay đổi giá trị slider
    minPriceLimit?: number;  // Giới hạn giá trị nhỏ nhất (tùy chọn)
    maxPriceLimit?: number;  // Giới hạn giá trị lớn nhất (tùy chọn)
}

const PriceRangeSlider:React.FC<IProps> = ({
    range,
  onValuesChange,
  minPriceLimit = 0,   // Giá trị nhỏ nhất của slider, mặc định là 0
  maxPriceLimit = 150, // Giá trị lớn nhất của slider, mặc định là 150
}) => {


    const CustomMarker = () => {
        return (
          <View>
            <ThumbSlider/>
          </View>
        );
      };
    
  return (
    <MultiSlider
        values={range} // Giá trị slider được truyền từ props
        sliderLength={333}
        min={minPriceLimit}  // Giới hạn nhỏ nhất
        max={maxPriceLimit}  // Giới hạn lớn nhất
        step={1}
        onValuesChange={onValuesChange} // Gọi callback khi thay đổi
        customMarker={CustomMarker} // Thumb là custom image
        trackStyle={globalStyles.customTrack} // Custom track style
        selectedStyle={{ backgroundColor: '#0000FF' }} // Phần track được chọn
        unselectedStyle={{ backgroundColor: '#D3D3D3' }} // Phần track không được chọn
        imageBackgroundSource={require('../../assets/images/background-slider.png')}
    />
  )
}

export default PriceRangeSlider