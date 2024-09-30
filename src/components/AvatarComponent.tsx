import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native";
import React from "react";
import { colors, typography } from "~/styles";
import TextComponent from "./TextComponent";

interface IProps {
  fullName?: string;
  photoUrl?: string;
  size: number;
  viewStyles?: StyleProp<ViewStyle>;
  imageStyles?:  StyleProp<ImageStyle>;
  borderRadius?:number;
  onPress?: () => void;
}

const AvatarComponent: React.FC<IProps> = ({
  fullName,
  photoUrl,
  size,
  imageStyles,
  viewStyles,
  borderRadius,
  onPress,
}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {photoUrl ? (
        <Image
          style={[{
            resizeMode: "contain",
            width: size,
            height: size,
            borderRadius: borderRadius ?? 50,
          },imageStyles]}
          source={{ uri: photoUrl }}
        />
      ) : (
        <View
          style={[{
            width: size,
            height: size,
            borderRadius: borderRadius ?? 50,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
          },viewStyles]}
        >
          <TextComponent
            size={typography.fontSizeExtraLarge}
            font={typography.fontFamily.semiBold}
            text={fullName?.split(" ").at(-1)?.charAt(0) || "No"}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvatarComponent;
