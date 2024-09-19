import { EventModel } from "./EventModel";

export interface UsersSelectModel {
    _id: string;
    email: string;
    role: number;
    fullName: string;
    photoUrl: string;
}


export interface IUserProfile {
    _id: string;
    fullName?: string;
    givenName?: string;
    familyName?: string;
    bio?: string;
    email: string;
    photoUrl?: string;
    followedEvents?: EventModel[];
    following?: string[];
    followers?: string[];
    interests?: string[];
}


export const userProfileData: IUserProfile = {
    _id:"",
    fullName: "",
    givenName: "",
    familyName: "",
    bio: "",
    email: "",
    photoUrl: "",
    followedEvents: [],
    following: [],
    followers: [],
    interests: [],
};
  