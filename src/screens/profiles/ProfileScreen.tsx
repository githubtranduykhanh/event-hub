import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AvatarComponent,
  ContainerComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "~/components";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { authSelector } from "~/redux/store";
import { StatusBar } from "expo-status-bar";
import { colors, globalStyles, typography } from "~/styles";
import { apiGetProfileUser } from "~/apis";
import { ApiHelper } from "~/apis/helper";
import { IUserProfile, userProfileData } from "~/models/UserModel";
import { AboutProfile, EditProfile } from "./components";

const ProfileScreen = ({ navigation, route }: any) => {
  const { idUser } = route.params;
  const {
    user: { _id },
  } = useSelector(authSelector);
  const [userProfile, setUserProfile] = useState<IUserProfile>(userProfileData);
  useEffect(() => {
    if (idUser) {
      apiGetProfileUser(idUser)
        .then((res) => res.data)
        .then((data) => {
          if (data.status && data.data) setUserProfile(data.data);
        })
        .catch((err) => ApiHelper.getMesErrorFromServer(err));
    }
  }, [idUser]);

  return (
    <ContainerComponent
      back
      title="Profile"
      iconHeader={
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      }
      statusBarStyle="dark"
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <AvatarComponent
          size={96}
          fullName={userProfile.fullName ?? userProfile.email}
          photoUrl={userProfile.photoUrl}
        />
        <SpaceComponent height={26} />
        <TextComponent
          text={userProfile?.fullName || ""}
          size={typography.fontSizeExtraLarge}
          font={typography.fontFamily.semiBold}
        />
        <SpaceComponent height={9} />
        <RowComponent justify="space-around">
          <View style={[globalStyles.centerItem]}>
            <TextComponent
              text={`${userProfile?.following?.length}`}
              size={typography.fontSizeMedium}
              lineHeight={34}
              font={typography.fontFamily.semiBold}
            />
            <TextComponent
              color={colors.text2}
              text="Following"
              size={typography.fontSizeSmall}
              lineHeight={23}
            />
          </View>
          <SpaceComponent width={48} />
          <View style={[globalStyles.centerItem]}>
            <TextComponent
              text={`${userProfile?.followers?.length}`}
              size={typography.fontSizeMedium}
              lineHeight={34}
              font={typography.fontFamily.semiBold}
            />
            <TextComponent
              color={colors.text2}
              text="Followers"
              size={typography.fontSizeSmall}
              lineHeight={23}
            />
          </View>
        </RowComponent>
      </View>
      <SpaceComponent height={22} />
      {
        _id === idUser ? (<AboutProfile/>) :(<EditProfile/>)
      }
    </ContainerComponent>
  );
};

export default ProfileScreen;
