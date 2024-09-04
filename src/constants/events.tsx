
export interface EventConstanst {
  title: string;
  description: string;
  location: {
    title: string;
    address: string;
  };
  imageUrl: string;
  users: string[];
  authorId: string;
  startAt: number;  // Unix timestamp (milliseconds since epoch)
  endAt: number;    // Unix timestamp (milliseconds since epoch)
  date: number;     // Unix timestamp (milliseconds since epoch)
}


export const itemEvent:EventConstanst = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    imageUrl: 'https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
}


export const initEvent:EventConstanst = {
  title: '',
  description:'',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
}