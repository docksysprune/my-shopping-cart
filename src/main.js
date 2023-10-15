let shop = document.getElementById("grid-items");

let shopItemsData = [
  {
    id: "001",
    name: "casual shirt",
    price: 45,
    img: "img-1.jpg",
  },
  {
    id: "002",
    name: "casual shirt",
    price: 45,
    img: "img-2.jpg",
  },
  {
    id: "003",
    name: "casual shirt",
    price: 45,
    img: "img-3.jpg",
  },
];

console.log(shop);

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((item)=>{
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
                    >
                      +
                    </button>
                    <small class="text-body-secondary">0</small>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      -
                    </button>
                  </div>
                  <div class="text-body-secondary">${item.price}</div>
                </div>
              </div>
            </div>
          </div>
    `;
  }).join(""));
};

generateShop();
