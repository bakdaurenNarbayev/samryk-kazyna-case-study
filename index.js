const path = require('path');
const methodOverride = require('method-override')
const express = require('express');
const app = express();
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


app.use(express.static(path.join(__dirname, 'public')))
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// **********************************
// INDEX - renders multiple orders
// **********************************
app.get('/orders', async (req, res) => {
  const { company } = req.query;
  if(company) {
    const orders = await Order.find({ company });
    res.render('index', { orders, company });
  } else {
    const orders = await Order.find({});
    res.render('index', { orders, company: 'Всех' });
  }
})
// **********************************
// NEW - renders a form
// **********************************
app.get('/orders/new', (req, res) => {
  res.render('new');
})
// **********************************
// CREATE - creates a new order
// **********************************
app.post('/orders', async (req, res) => {
  let { company, product, number } = req.body;

  if(company === '1') company = 'ТОО "ВагонСтрой"';
  else if(company === '2') company = 'ТОО "Ұшақ Құрылыс"';
  else if(company === '3') company = 'ТОО "Metal House"';
  else throw new Error();

  if(product === '1') product = 'Сталь';
  else if(product === '2') product = 'Алюминий';
  else if(product === '3') product = 'Железо';
  else throw new Error();

  const order = new Order({company: company, product: product, number: number});
  await order.save();
  res.redirect(`/orders/${order._id}`);
})
// *******************************************
// SHOW - details about one particular order
// *******************************************
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.render('show', { order });
})
// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get('/orders/:id/edit', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.render('edit', { order });
})
// *******************************************
// UPDATE - updates a particular order
// *******************************************
app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;

  //get new data from req.body
  let newCompany = req.body.company;
  let newProduct = req.body.product;
  let newNumber = req.body.number;

  if(newCompany === '1') newCompany = 'ТОО "ВагонСтрой"';
  else if(newCompany === '2') newCompany = 'ТОО "Ұшақ Құрылыс"';
  else if(newCompany === '3') newCompany = 'ТОО "Metal House"';
  else throw new Error();

  if(newProduct === '1') newProduct = 'Сталь';
  else if(newProduct === '2') newProduct = 'Алюминий';
  else if(newProduct === '3') newProduct = 'Железо';
  else throw new Error();

  //update the order with the data from req.body:
  const order = await Order.findByIdAndUpdate(id, {company: newCompany, product: newProduct, number: newNumber}, {runValidators: true});
  //redirect back to index (or wherever you want)
  res.redirect(`/orders/${order._id}`);
})
// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  res.redirect('/orders');
})

app.get('*', (req, res) => {
  res.render('not-found');
})

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});