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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, authSelector, profileSelector } from "~/redux/store";
import { StatusBar } from "expo-status-bar";
import { colors, globalStyles, typography } from "~/styles";
import { apiGetProfileUser } from "~/apis";
import { ApiHelper } from "~/apis/helper";
import { IUserProfile, userProfileData } from "~/models/UserModel";
import { AboutProfile, EditProfile } from "./components";
import { addProfile } from "~/redux/features/profile/profileSlice";

const ProfileScreen = ({ navigation, route }: any) => {
  const { idUser } = route.params;
  const dispatch = useDispatch<AppDispatch>()
  const {
    user: { _id },
  } = useSelector(authSelector);

  const {userProfile} = useSelector(profileSelector);
  
  useEffect(() => {
    if (idUser) {
      apiGetProfileUser(idUser)
        .then((res) => res.data)
        .then((data) => {
          console.log(data.data)
          if (data.status && data.data) {
            const {_id,email,followedEvents,photoUrl = '',givenName = '',familyName = '',followers,following,fullName,interests,bio} = data.data
            dispatch(addProfile({
              _id,
              email,
              followedEvents,
              photoUrl,
              fullName,
              givenName,
              familyName,
              bio,
              followers,
              following,
              interests
            }))
          }
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
        _id === idUser ? (<EditProfile profile={userProfile}/>)  : (<AboutProfile/>)
      }
    </ContainerComponent>
  );
};

export default ProfileScreen;
