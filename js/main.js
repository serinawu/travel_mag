import cart from './cart.js';

document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-cart-btn'); // 確保點擊到購買按鈕
    if (button) {
      const productId = button.dataset.productId;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const optionName = button.dataset.option || '尚未選擇方案';
  
      console.log('加入購物車:', { productId, name, price, optionName }); // 確認資料
  
      cart.addItem(productId, name, price, 1, optionName); // 呼叫購物車方法
      alert('已成功加入購物車！');
    }
});
  

// 顯示提示訊息
function appendAlert(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  if (alertPlaceholder) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible d-flex align-items-center justify-content-center px-3" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>
        <div>${message}</div>
      </div>`;
    alertPlaceholder.append(wrapper);

    // 自動淡出消失
    setTimeout(() => {
      wrapper.remove();
    }, 1500);
  }
}

// 購物車快速檢視
  
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.querySelector('.cart_btn'); // 購物車按鈕
  const cartPopup = document.querySelector('.cart-popup'); // 購物車彈出視窗

  if (cartBtn && cartPopup) {
    cartBtn.addEventListener('click', () => {
      cartPopup.classList.toggle('d-none'); // 切換顯示/隱藏
    });
  }
});

//home
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tableOFcontent .card");
  const twImage = document.querySelector(".latest-mag.tw");
  const jpImage = document.querySelector(".latest-mag.jp");
  const krImage = document.querySelector(".latest-mag.kr");

  function resetActiveCards() {
    cards.forEach((card) => card.classList.remove("active"));
  }

  // Hover 事件
  twImage.addEventListener("mouseenter", () => {
    resetActiveCards();
    document.querySelector(".tw-card").classList.add("active");
  });

  jpImage.addEventListener("mouseenter", () => {
    resetActiveCards();
    document.querySelector(".jp-card").classList.add("active");
  });

  krImage.addEventListener("mouseenter", () => {
    resetActiveCards();
    document.querySelector(".kr-card").classList.add("active");
  });
});
//雜誌排序
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".latest-mag");

  function resetActiveState() {
    images.forEach((img) => img.classList.remove("active"));
  }

  images.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      resetActiveState(); // 移除所有 active 類別
      img.classList.add("active"); // 加入 active 類別到當前 hover 的元素
    });
  });
});
  
// 登入註冊
window.showForm = function(formId) { // 綁定到 window
  const forms = document.querySelectorAll('.loginSignup_page');

  forms.forEach((form) => {
    form.classList.remove('active'); // 移除所有 active
    form.style.display = 'none';     // 同時隱藏
  });

  // 顯示目標 form
  const activeForm = document.getElementById(formId);
  activeForm.classList.add('active');
  activeForm.style.display = 'flex';
};

//backToTop
let backToTop = document.getElementById("backToTop");

window.onscroll= ()=> {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "flex";
  } else {
      backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", () =>{
  window.scroll({
      top: 0,
      behavior: 'smooth',
  });
})

//day&night
document.addEventListener("DOMContentLoaded", function(){
    const toggleThemeButton = document.getElementById("dayNight-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    //初始化
    document.body.setAttribute("data-bs-theme", currentTheme);
    updateButton(currentTheme);

    //點擊
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener("click",function(){
            const newTheme = document.body.getAttribute("data-bs-theme") === "light" ? "dark" : "light";
            document.body.setAttribute("data-bs-theme",newTheme);
            localStorage.setItem("theme", newTheme);
            updateButton(newTheme);
        })
    }

    //更新
    function updateButton(theme){
        if(!toggleThemeButton) return;
        if(theme === "dark") {
            toggleThemeButton.setAttribute("title","切換到日間模式");
        } else {
            toggleThemeButton.setAttribute("title", "切換到夜間模式")
        }
    }
})