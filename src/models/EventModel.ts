
export interface Location {
    address: string;
    title: string;
}

export interface EventModel {
    title: string;
    description: string;
    location: Location;
    price:string;
    imageUrl: string;
    users: string[];
    caterory:string[];
    authorId: string;
    startAt: Date;  // Unix timestamp (milliseconds since epoch)
    endAt: Date;    // Unix timestamp (milliseconds since epoch)
    date: Date;     // Unix timestamp (milliseconds since epoch)
}


