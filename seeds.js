const mongoose = require('mongoose');

const Order = require('./models/order');

mongoose.connect('mongodb://localhost:27017/samrykKazynaCaseStudy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// const o = new Order({
//   company: 'ТОО "ВагонСтрой"',
//   product: 'Железо',
//   number: 5
// })

// o.save().then(o => {
//   console.log(o);
// }).catch(e => {
//   console.log(e);
// })

const seedOrders = [
  {
    company: 'ТОО "Metal House"',
    product: 'Железо',
    number: 15
  },
  {
    company: 'ТОО "Ұшақ Құрылыс"',
    product: 'Сталь',
    number: 1
  },
  {
    company: 'ТОО "Metal House"',
    product: 'Алюминий',
    number: 50
  },
  {
    company: 'ТОО "Ұшақ Құрылыс"',
    product: 'Сталь',
    number: 23
  }
]

Order.insertMany(seedOrders)
.then(res => {
  console.log(res);
})
.catch(e => {
  console.log(e);
});