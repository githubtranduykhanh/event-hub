
export interface Location {
    address: string;
    title: string;
}


export interface Position {
    lat:number;
    lng:number;
}

export interface EventModel {
    title: string;
    description: string;
    location: Location;
    position:Position;
    price:string;
    imageUrl: string;
    users: string[];
    categories:string[];
    authorId: string;
    startAt: Date;  // Unix timestamp (milliseconds since epoch)
    endAt: Date;    // Unix timestamp (milliseconds since epoch)
    date: Date;     // Unix timestamp (milliseconds since epoch)
}


