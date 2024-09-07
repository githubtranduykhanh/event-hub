
export interface EventConstanst {
  title: string;
  description: string;
  location: {
    title: string;
    address: string;
  };
  price:string;
  imageUrl: string;
  users: string[];
  caterory:string[];
  authorId: string;
  startAt: Date;  // Unix timestamp (milliseconds since epoch)
  endAt: Date;    // Unix timestamp (milliseconds since epoch)
  date: Date;     // Unix timestamp (milliseconds since epoch)
}


export const itemEvent:EventConstanst = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    price:'',
    imageUrl: 'https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg',
    users: [],
    caterory: [],
    authorId: '',
    startAt: new Date(),
    endAt: new Date(),
    date: new Date(),
}


export const initEvent:EventConstanst = {
  title: '',
  description:'',
  location: {
    title: '',
    address: '',
  },
  price:'',
  imageUrl: '',
  users: [],
  caterory: [],
  authorId: '',
  startAt: new Date(),
  endAt: new Date(),
  date:new Date(),
}