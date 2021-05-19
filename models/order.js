const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    enum: ['ТОО "ВагонСтрой"', 'ТОО "Ұшақ Құрылыс"', 'ТОО "Metal House"']
  },
  product: {
    type: String,
    required: true,
    enum: ['Сталь', 'Алюминий', 'Железо']
  },
  number: {
    type: Number,
    required: true,
    min: 1
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;