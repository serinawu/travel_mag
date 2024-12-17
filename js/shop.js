let travelData = []; // 全部資料
let filteredData = []; // 篩選後的資料

const shopContainerType = document.getElementById('shop-container-type'); // 卡片類別
const shopContainer = document.getElementById('shop-container'); // 原本卡片顯示區
const shopSearchContainer = document.getElementById('shop-searchContainer'); // 搜尋結果區
const searchResultTitle = document.getElementById('shopSearchResultTitle'); // 搜尋標題
const searchResultCount = document.getElementById('shopSearchResult-count'); // 搜尋筆數
const searchInput = document.getElementById('mag_searchTextInput'); // 搜尋框

// 載入 JSON 檔案
fetch('../assets/json/travel_Itinerary4.json')
  .then((response) => response.json())
  .then((data) => {
    travelData = data;
    filteredData = data;

    // 過濾 "hot" 標籤
    const hotItems = travelData.filter((item) => item.tag === "hot");
    // 渲染 Swiper 卡片
    renderSwiperItems(hotItems);

    // 渲染其他卡片
    renderCards(filteredData, shopContainer);

    // 初始化 Swiper
    const swiper = new Swiper(".swiper", {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  })
  .catch((error) => console.error('Error loading data:', error));

// 渲染 Swiper 卡片項目
function renderSwiperItems(items) {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = ""; // 清空原始內容

  if (!swiperWrapper) {
    console.error("未找到 .swiper-wrapper 容器！");
    return;
  }

  items.forEach((item) => {
    const cardHTML = `
      <div class="swiper-slide">
        <div class="card g-col-6 position-relative">
          <span class="tag ${item.tag}"></span>
          <img src="${item.image_path}" class="card-img-top" alt="${item.name}" />
          <div class="card-body">
            <p class="card-text">
              ${item.name} - NT$ ${item.price}
            </p>
          </div>
          <div
            class="w-100 h-100 align-items-center justify-content-center position-absolute card-layer"
          >
            <button
              class="btn btn-primary me-3 add-to-cart-btn"
              role="button"
              data-id="${item.id}"
              data-name="${item.name}"
              data-price="${item.price}"
            >
              購買
            </button>
            <button
              type="button"
              class="btn btn-outline-light"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#fullscreenModal"
            >
              更多
            </button>
          </div>
        </div>
      </div>
    `;
    swiperWrapper.insertAdjacentHTML("beforeend", cardHTML);
  });
}

// 渲染卡片 (共用函式)
function renderCards(data, container) {
  container.innerHTML = ''; // 清空指定容器
  data.forEach((item) => {
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card g-col-6 position-relative">
          <span class="tag ${item.tag}"></span>
          <img src="${item.image_path}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.highlights.slice(0, 3).join(', ')}</p>
            <p class="card-price mt-4 fw-bold text-primary">NT$ ${item.price}</p>
          </div>
          <div class="w-100 h-100 align-items-center justify-content-center position-absolute card-layer">
            <button class="btn btn-primary me-3 add-to-cart-btn addToCart" role="button" type="button" data-product-id="${item.productID}" data-name="${item.name}" data-price="${item.price}" data-option="尚未選擇方案">購買</button>
            <button class="btn btn-outline-light" role="button" type="button" data-bs-toggle="modal" data-bs-target="#fullscreenModal">更多</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// 搜尋功能
document.querySelector('.search-block').addEventListener('submit', (e) => {
  e.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  // 篩選符合條件的資料
  const searchResults = travelData.filter((item) => 
    item.name.toLowerCase().includes(keyword)
  );

  if (searchResults.length > 0) {
    // 更新搜尋結果筆數
    searchResultCount.textContent = searchResults.length;

    // 隱藏原本卡片區域並顯示搜尋結果區
    shopContainer.classList.add('d-none');
    shopContainerType.classList.add('d-none');
    shopSearchContainer.classList.remove('d-none');
    searchResultTitle.classList.remove('d-none');

    // 渲染搜尋結果到 shopSearchContainer
    renderCards(searchResults, shopSearchContainer);
  } else {
    alert("找不到符合條件的結果，請重新輸入！");
  }
});

// 清除搜尋條件
document.querySelector('.clearBtn').addEventListener('click', () => {
  searchInput.value = ''; // 清空輸入框

  // 恢復顯示原始資料
  shopSearchContainer.classList.add('d-none'); // 隱藏搜尋結果
  searchResultTitle.classList.add('d-none');
  shopContainer.classList.remove('d-none'); // 顯示原始卡片區
  shopContainerType.classList.remove('d-none');

  renderCards(travelData, shopContainer); // 渲染所有資料
});

// 類別篩選功能
document.querySelectorAll('#shop-container-type .nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const category = link.textContent.trim();

    // 更新類別選中樣式
    document.querySelector('.nav-link.active').classList.remove('active');
    link.classList.add('active');

    // 篩選資料
    if (category === '全部') {
      filteredData = travelData; // 顯示所有資料
    } else {
      filteredData = travelData.filter((item) => item.category === category);
    }

    // 恢復顯示原始卡片區域並隱藏搜尋結果
    shopSearchContainer.classList.add('d-none');
    shopContainer.classList.remove('d-none');

    renderCards(filteredData, shopContainer);
  });
});

// 詳細資訊彈窗功能
function showDetails(id) {
  const selectedItem = travelData.find(item => item.id === id);
  if (selectedItem) {
    alert(`
      名稱: ${selectedItem.name}
      價格: NT$ ${selectedItem.price}
      地點: ${selectedItem.location}
      亮點: ${selectedItem.highlights.join(', ')}
    `);
  } else {
    alert('未找到詳細資訊！');
  }
}
