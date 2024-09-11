import { EventModel } from "~/models"




export const itemEvent:EventModel = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK',
    },
    position:{
      lat:0,
      lng:0
    },
    price:'',
    imageUrl: 'https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg',
    users: [],
    categories: [],
    authorId: '',
    startAt: new Date(),
    endAt: new Date(),
    date: new Date(),
}


export const initEvent:EventModel = {
  title: '',
  description:'',
  location: {
    title: '',
    address: '',
  },
  position:{
    lat:0,
    lng:0
  },
  price:'',
  imageUrl: '',
  users: [],
  categories: [],
  authorId: '',
  startAt: new Date(),
  endAt: new Date(),
  date:new Date(),
}