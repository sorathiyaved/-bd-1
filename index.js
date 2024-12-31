const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));




// endpoint 1
function cart(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(cart(newItemPrice, cartTotal));
});



// endpoint 2
function isDiscount(cartTotal, member) {
  if (member =='true') {
    let total=cartTotal - (cartTotal*10)/100;
    return total.toString();
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let member = req.query.member;

  res.send(isDiscount(cartTotal, member));
});



// endpoint 3
function taxCalculation(cartTotal) {
  let tax = (cartTotal * 5) / 100;
  return tax.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(taxCalculation(cartTotal));
});
 


// endpoint 4
function estimation(shippingMethod, distence) {
  if (shippingMethod =='express') {
    let time = distence / 100;
    return time.toString();
  } else {
    let time = distence / 50;
    return time.toString();
  }
}

app.get('/estimated-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distence = parseFloat(req.query.distence);

  res.send(estimation(shippingMethod, distence));
});



// endpoint 5
function shipment(weight, distence) {
  let cost = weight * distence * 0.1;
  return cost.toString();
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distence = parseFloat(req.query.distence);

  res.send(shipment(weight, distence));
});



// endpoint 6
function loyalty(purchaseAmount) {
  let points = purchaseAmount * 2;
  return points.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(loyalty(purchaseAmount));
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
