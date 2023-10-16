let shop = document.getElementById("grid-items");

let shopItemsData = [
  {
    id: 001,
    name: "casual shirt",
    price: 45,
    img: "img-1.jpg",
  },
  {
    id: 002,
    name: "casual shirt",
    price: 45,
    img: "img-2.jpg",
  },
  {
    id: 003,
    name: "casual shirt",
    price: 45,
    img: "img-3.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(shop);

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let search = basket.find((x) => x.id === item.id);
      return `
    <div id=product-id-${item.id} class="col">
            <div class="card shadow-sm">
              <img src="./images/${item.img}" alt="" class="card-img" />
              <div class="card-body">
                <h4 class="card-text">${item.name}</h4>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="increment(${item.id})"
                    >
                      +
                    </button>
                    <small id=${item.id} class="text-body-secondary quantity">${search.item === undefined ? 0 : search.item}</small>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      onclick="decrement(${item.id})"
                    >
                      -
                    </button>
                  </div>
                  <div class="text-body-secondary">$${item.price}</div>
                </div>
              </div>
            </div>
          </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  incrementBasket(id);
  localStorage.setItem("data",JSON.stringify(basket));
  update(id);
};

let decrement = (id) => {
  decrementBasket(id);
  localStorage.setItem("data",JSON.stringify(basket));
  update(id);
};

let incrementBasket = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
};

let decrementBasket = (id) => {
  if (basket.length != 0) {
    let search = basket.find((x) => x.id === id);
    if (search) {
      let res = --search.item;
      if (res < 0) {
        search.item = 0;
      } else {
        search.item = res;
      }
    }
  }
};

let update = (id) => {
  if(basket.length != 0) {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  }  
}

let calculation = () => {
  let total = basket.reduce((total,obj) => total + obj.item, 0);
  document.getElementById("cart-items-total").innerHTML = total;
}

calculation();