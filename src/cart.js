let basket = JSON.parse(localStorage.getItem("data") || []);
let cart = document.getElementById("container-card-cart-grid");

let generateCart = () => {
  return (
    cart.innerHTML = basket
      .map((item) => {
        let dataItem = shopItemsData.find((x) => x.id === item.id);
        return `
        <div class="card w-60 card-cart-item">
        <div class="card-body card-body-cart">
          <div>
            <h5 class="card-title">
              ${ dataItem != undefined ? dataItem.name : "Unavailable item"}
              <small id="${item.id}" class="text-body-secondary quantity"
                >$45</small
              >
            </h5>
            <button type="button" class="btn btn-sm btn-outline-secondary">
              +
            </button>
            <small class="text-body-secondary quantity">0</small>
            <button type="button" class="btn btn-sm btn-outline-secondary">
              -
            </button>
            <p class="card-cart-item-total">$350</p>
            <button type="button" class="btn btn-outline-danger">
              <i class="bi bi-trash3-fill"></i>
              Delete
            </button>
          </div>
          <div>
            <img class="card-cart-item-img" src="./images/baby.png" alt="" />
          </div>
        </div>
      </div>
        `
      })
  )
}

generateCart();

let calculation = () => {
  let total = basket.reduce((total, obj) => total + obj.item, 0);
  document.getElementById("cart-items-total").innerHTML = total;
};

calculation();
