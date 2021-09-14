/*---------------
 | Fetching url |
 --------------*/
const loadData = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => displayData(data));
}

loadData();

/*---------------------------------------
 | Display search result in the website |
 --------------------------------------*/
const displayData = (product) => {
  product.forEach(element => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${element.image}></img>
      </div>
      <h5>${element.title}</h5>
      <p>Category: ${element.category}</p>
      <p>Rating: ${element.rating.rate}</p>
      <p>Total Rate Count: ${element.rating.count}</p>
      <h3>Price: $ ${element.price}</h3>
      <button onclick="addToCart(${element.id},${element.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  });
}

/*---------------------------------------------------
 | Increasing total added product quantity function |
 --------------------------------------------------*/
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById('total-Products').innerText = count;
  updatePrice(price);
}

/*------------------------
 | Update price function |
 -----------------------*/
const updatePrice = (price) => {
  const priceText = document.getElementById('price');
  const priceNum = parseFloat(priceText.innerText);
  const sum = priceNum + price;
  priceText.innerText = sum.toFixed(2);
  updateTaxAndCharge()
  updateTotal();
}

/*------------------------------------------------------------------------------
 | Getting price, delivery charge and tax innerText and parse integer function |
 -----------------------------------------------------------------------------*/
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

/*-------------------------
 | Set innerText function |
 ------------------------*/
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

/*---------------------------------------
 | Update delivery charge and total Tax |
 --------------------------------------*/
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

/*-----------------------------
 | Grand total update function |
 ----------------------------*/
const updateTotal = () => {
  const priceText = document.getElementById('price');
  const price = parseFloat(priceText.innerText);
  const deliveryChargeText = document.getElementById('delivery-charge');
  const deliveryCharge = parseFloat(deliveryChargeText.innerText);
  const taxText = document.getElementById('total-tax');
  const tax = parseFloat(taxText.innerText);
  const grandTotal = price + deliveryCharge + tax;
  document.getElementById('total').innerText = grandTotal.toFixed(2);
};