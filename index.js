const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Our fake database:
let orders = [
  {
      id: uuid(),
      company: 'ТОО "ВагонСтрой"',
      product: 'Сталь',
      number: '4'
  },
  {
      id: uuid(),
      company: 'ТОО "Ұшақ Құрылыс"',
      product: 'Алюминий',
      number: '5'
  },
  {
      id: uuid(),
      company: 'ТОО "Metal House"',
      product: 'Железо',
      number: '10'
  }
]
// **********************************
// INDEX - renders multiple orders
// **********************************
app.get('/orders', (req, res) => {
  res.render('index', { orders });
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
app.post('/orders', (req, res) => {
  let { company, product, number } = req.body;
  const id = uuid();

  if(company === '1') company = 'ТОО "ВагонСтрой"';
  else if(company === '2') company = 'ТОО "Ұшақ Құрылыс"';
  else if(company === '3') company = 'ТОО "Metal House"';
  else throw new Error();

  if(product === '1') product = 'Сталь';
  else if(product === '2') product = 'Алюминий';
  else if(product === '3') product = 'Железо';
  else throw new Error();

  orders.push({ id, company, product, number })
  res.redirect('/orders');
})
// *******************************************
// SHOW - details about one particular order
// *******************************************
app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  res.render('show', { order })
})
// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get('/orders/:id/edit', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  res.render('edit', { order })
})
// *******************************************
// UPDATE - updates a particular order
// *******************************************
app.patch('/orders/:id', (req, res) => {
  const { id } = req.params;
  const foundOrder = orders.find(o => o.id === id);

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
  foundOrder.company = newCompany;
  foundOrder.product = newProduct;
  foundOrder.number = newNumber;
  //redirect back to index (or wherever you want)
  res.redirect('/orders')
})
// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  orders = orders.filter(o => o.id !== id);
  res.redirect('/orders');
})

app.get('*', (req, res) => {
  res.render('not-found');
})

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});