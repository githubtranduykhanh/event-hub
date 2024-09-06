import { Camera, Image, Link } from "iconsax-react-native";
import { ReactNode } from "react";
import { colors, typography } from "~/styles";

export interface ImagePickerOption{
    key:string;
    title:string;
    icon:ReactNode;
}


export enum  KEY_OPTIONS {
    CAMERA = 'camere',
    LIBRARY ='library',
    URL = 'url'
}

const imagePickerOptions:ImagePickerOption[] = [
    {
        key:KEY_OPTIONS.CAMERA,
        title:'Take a picture',
        icon:<Camera size={typography.fontSizeLarge} color={colors.text}/>
    },
    {
        key:KEY_OPTIONS.LIBRARY,
        title:'From library',
        icon:<Image size={typography.fontSizeLarge} color={colors.text}/>
    },
    {
        key:KEY_OPTIONS.URL,
        title:'From url',
        icon:<Link size={typography.fontSizeLarge} color={colors.text}/>
    },
]

export default imagePickerOptions