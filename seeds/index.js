const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// 'https://source.unsplash.com/collection/1134892'

mongoose.connect('mongodb://localhost:27017/campApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)]; // random names from the array

// create new camps randomly
const seedDB = async () => {
  await Campground.deleteMany({});
    const camp = new Campground({
    author: '63b71b31f54c62917e5e0129',
    location: 'Kennewick, Washington',
    title: `${sample(descriptors)} ${sample(places)}`,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, corporis eaque. Eveniet autem temporibus veritatis ipsum incidunt optio beatae ipsa aut voluptatem, illum inventore sit labore ipsam repellendus quasi pariatur',
    price: 18,
    geometry: {
      type: "Point",
      coordinates: [-119.1372338, 46.2112458]
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673044565/CampApp/edy42xbc0erhjsnj32hg.jpg',
        filename: 'CampApp/edy42xbc0erhjsnj32hg',
      },
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673099864/CampApp/fp4mtjtx6vo3l71deld7.jpg',
        filename: 'CampApp/fp4mtjtx6vo3l71deld7',
      }
    ],
  })
  const camp1 = new Campground({
    author: '63b71b31f54c62917e5e0129',
    location: 'Tampa, Florida',
    title: `${sample(descriptors)} ${sample(places)}`,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, corporis eaque. Eveniet autem temporibus veritatis ipsum incidunt optio beatae ipsa aut voluptatem, illum inventore sit labore ipsam repellendus quasi pariatur',
    price: 22,
    geometry: {
      type: "Point",
      coordinates: [-82.4571776, 27.950575]
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673098262/CampApp/hjypskhnjh39s2egrktj.jpg',
        filename: 'CampApp/edy42xbc0erhjsnj32hg',
      },
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673099864/CampApp/fp4mtjtx6vo3l71deld7.jpg',
        filename: 'CampApp/hjypskhnjh39s2egrktj',
      }
    ],
  })
  const camp2 = new Campground({
    author: '63b71b31f54c62917e5e0129',
    location: 'Nashville, Tennessee',
    title: `${sample(descriptors)} ${sample(places)}`,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, corporis eaque. Eveniet autem temporibus veritatis ipsum incidunt optio beatae ipsa aut voluptatem, illum inventore sit labore ipsam repellendus quasi pariatur',
    price: 19,
    geometry: {
      type: "Point",
      coordinates: [-86.7816016, 36.1626638]
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673101037/CampApp/c6ns4zzlrv4mmz6qdz7u.jpg',
        filename: 'CampApp/c6ns4zzlrv4mmz6qdz7u',
      },
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673099864/CampApp/fp4mtjtx6vo3l71deld7.jpg',
        filename: 'CampApp/jlsialt23ra64dggmgfa',
      }
    ],
  })
  const camp3 = new Campground({
    author: '63b71b31f54c62917e5e0129',
    location: 'Kelowna, British Columbia',
    title: `${sample(descriptors)} ${sample(places)}`,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, corporis eaque. Eveniet autem temporibus veritatis ipsum incidunt optio beatae ipsa aut voluptatem, illum inventore sit labore ipsam repellendus quasi pariatur',
    price: 23,
    geometry: {
      type: "Point",
      coordinates: [-119.477829, 49.882114]
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673098743/CampApp/cpxf6givlw5xkukc90fc.jpg',
        filename: 'CampApp/cpxf6givlw5xkukc90fc',
      },
      {
        url: 'https://res.cloudinary.com/dnbruyd3h/image/upload/v1673099864/CampApp/fp4mtjtx6vo3l71deld7.jpg',
        filename: 'CampApp/fp4mtjtx6vo3l71deld7',
      }
    ],
  })
  await camp.save();
  await camp1.save();
  await camp2.save();
  await camp3.save();
}
// }

seedDB().then(() => {
  mongoose.connection.close();
})