class ShoppingCart {
    constructor(cartKey = 'shoppingCart') {
      this.cartKey = cartKey;
      this.cart = this.loadCart();
      this.cartPopup = document.querySelector('.cart-popup');
      this.cartItemsContainer = document.querySelector('.cart-items');
      this.cartTotalElement = document.querySelector('.cart-total');
      this.cartCountElement = document.querySelector('.cartCount');
      this.init();
    }
  
    // 初始化購物車
    init() {
      this.updateCartView();
      this.attachEventListeners();
    }
  
    // 加載購物車資料
    loadCart() {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    }
  
    // 保存購物車資料
    saveCart() {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    }
  
    // 新增商品到購物車
    addItem(productId, name, price, quantity = 1, optionName = '尚未選擇方案') {
      const existingItem = this.cart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({ productId, name, price, quantity, optionName });
      }
      this.saveCart();
      this.updateCartView();
    }
  
    // 移除單個商品
    removeItem(productId) {
      this.cart = this.cart.filter((item) => item.productId !== productId);
      this.saveCart();
      this.updateCartView();
    }
  
    // 清空購物車
    clearCart() {
      this.cart = [];
      this.saveCart();
      this.updateCartView();
    }
  
    // 計算總金額
    calculateTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
    // 計算商品總數
    calculateTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
  
    updateCartView() {
      // 更新商品數量提示
      if (this.cartCountElement) {
        this.cartCountElement.textContent = this.calculateTotalItems();
        this.cartCountElement.style="display: flex;"; // 顯示購物車數量
      }
    
      // 清空視圖
      this.cartItemsContainer.innerHTML = '';
    
      if (this.cart.length === 0) {
        this.cartCountElement.style="display: none;";
        // 顯示「空空如也」
        this.cartItemsContainer.innerHTML = `
          <div class="empty-cart text-center">
            <i class="bi bi-cart3 fs-1 text-secondary"></i>
            <p class="text-secondary">空空如也</p>
            <div class="mt-3">
              <button class="btn btn-primary me-2" onclick="window.location.href='./shop.html'">行程選購</button>
              <button class="btn btn-outline-secondary" onclick="window.location.href='./magazine.html'">雜誌出版</button>
            </div>
          </div>
        `;
        this.cartTotalElement.textContent = ''; // 清空總金額
      } else {
        // 顯示購物車內容
        this.cart.forEach((item) => {
          const itemHTML = `
            <div class="cart-item position-relative" data-id="${item.productId}">
              <button type="button" class="clear-ThisProduct position-absolute">
                <i class="bi bi-x"></i>
              </button>
              <p class="product-name fw-bold mb-2">
                ${item.name}
                <span class="product-count translate-middle rounded-pill bg-danger text-reset p-1 ms-1">${item.quantity}</span>
              </p>
              <p class="product-option mb-2">${item.optionName}</p>
              <p class="single-price">NT$ ${item.price}</p>
            </div>
          `;
          this.cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    
        this.cartTotalElement.textContent = `NT$ ${this.calculateTotal()}`;
    
        // 重新綁定刪除按鈕事件
        this.cartItemsContainer.querySelectorAll('.clear-ThisProduct').forEach((button) => {
          button.addEventListener('click', (e) => {
            const productId = e.target.closest('.cart-item').dataset.id;
            this.removeItem(productId);
          });
        });
      }
    }
  
    // 綁定事件
    attachEventListeners() {
      // 綁定清空購物車按鈕
      document.querySelector('.clear-cart-btn').addEventListener('click', () => {
        if (confirm('確定要清空購物車嗎？')) {
          this.clearCart();
        }
      });
    }
  }

  // 點擊結帳按鈕跳轉至結帳頁面
  // document.querySelector('.checkout-btn').addEventListener('click', () => {
  //   if (){
  //     window.location.href = './html/checkout.html';
  //   } else {
  //     window.location.href = './checkout.html';
  //   }
  // });
  
  
  // 初始化購物車
  const cart = new ShoppingCart();
  export default cart;  