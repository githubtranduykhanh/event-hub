export interface EventModel {
    authorId: string;
    date: Date;
    description: string;
    endAt: Date;
    imageUrl: string;
    location: Location;
    startAt: Date;
    title: string;
    users: string[];
}
  
export interface Location {
    address: string;
    title: string;
}