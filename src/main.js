/**
 * Getting the grid where the cards for the main page will be displayed
 */
let shop = document.getElementById("grid-items");

let basket = JSON.parse(localStorage.getItem("data")) || [];
/**
 * 
 * @returns the generation of the cards according to the data in the data.js file
 */
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
                    <small id=${item.id} class="text-body-secondary quantity">${
        search === undefined ? 0 : search.item
      }</small>
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

/**
 * Will increment the items of the current card
 */
let increment = (item) => {
  incrementBasket(item.id);
  localStorage.setItem("data", JSON.stringify(basket));
  update(item.id);
};

/**
 * Will decrement the items of the current card
 */
let decrement = (item) => {
  let search = basket.find((x) => x.id === item.id);
  if (search != undefined) {
    decrementBasket(item.id);
    update(item.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
  }
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
  if (basket.length != 0) {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  }
};

let calculation = () => {
  let total = basket.reduce((total, obj) => total + obj.item, 0);
  document.getElementById("cart-items-total").innerHTML = total;
};

calculation();
