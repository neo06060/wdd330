// src/js/ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // render product details
    this.renderProductDetails();

    // attach Add to Cart listener
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    const productForCart = {
      ...this.product,
      FinalPrice: this.product.Price,
    };

    cart.push(productForCart);
    setLocalStorage("so-cart", cart);

    // redirect to cart page
    window.location.href = "../cart/index.html";
  }

  renderProductDetails() {
    if (!this.product) return;

    document.getElementById("productName").textContent = this.product.Name;
    document.getElementById("productDescription").textContent = this.product.Description;
    document.getElementById("productPrice").textContent = `$${this.product.Price}`;
    document.getElementById("productImage").src = this.product.Image;
    document.getElementById("productBrand").textContent = this.product.Brand || "";
    document.getElementById("productColor").textContent = this.product.Color || "";
  }
}
