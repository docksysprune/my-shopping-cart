let basket = JSON.parse(localStorage.getItem("data") || []);
let cart = document.getElementById("container-card-cart-grid");

let generateCart = () => {
  if (basket.length !== 0) {
    return (cart.innerHTML = basket
      .map((it) => {
        let { id, item } = it;
        let dataItem = shopItemsData.find((x) => x.id === id) || [];
        return `
          <div class="card w-60 card-cart-item">
          <div class="card-body card-body-cart">
            <div>
              <h5 class="card-title">
                ${dataItem != undefined ? dataItem.name : "Unavailable item"}
                <small class="text-body-secondary-quantity"
                  >$${dataItem != undefined ? dataItem.price : 0}</small
                >
              </h5>
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="increment('${id}')">
                +
              </button>
              <small id="${id}" class="text-body-secondary quantity">${
                it != undefined ? item : 0
              }</small>
              <button type="button" class="btn btn-sm btn-outline-secondary" onclick="decrement('${id}')">
                -
              </button>
              <p class="card-cart-item-total">${item * dataItem.price}</p>
              <button type="button" class="btn btn-outline-danger" onclick="deleteItemCart('${id}')">
                <i class="bi bi-trash3-fill"></i>
                Delete
              </button>
            </div>
            <div>
              <img class="card-cart-item-img" src="${
                dataItem != undefined ? dataItem.img : null
              }" alt="" />
            </div>
          </div>
        </div>
          `;
      }).join("")
  )
} else {
  cart.innerHTML = `<h2> The cart is empty, start shopping!</h2>`;
}};

generateCart();

let calculation = () => {
  let total = basket.reduce((total, obj) => total + obj.item, 0);
  document.getElementById("cart-items-total").innerHTML = total;
};

calculation();

let increment = (id) => {
  incrementBasket(id);
  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
  generateCart();
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search != undefined) {
    decrementBasket(id);
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCart();
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
  console.log(basket);
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

let deleteItemCart = (id) => {
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  generateCart();
}
