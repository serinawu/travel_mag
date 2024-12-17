// 行程拖曳
document.querySelectorAll('.list-group').forEach(list => {
    new Sortable(list, {
        group: 'shared', // 如果需要支持跨列表拖曳，設定相同的群組名稱
        animation: 150,  // 拖曳的動畫時長（毫秒）
        handle: '.list-group-item', // 拖曳的觸發點
        onEnd: (evt) => {
            console.log(`Item ${evt.item.textContent} moved from ${evt.from} to ${evt.to}`);
        },
    });
});

//地圖區展開收起
// 地圖區展開收起按鈕邏輯
var mapToggle = document.getElementById('close-map-btn');

mapToggle.addEventListener('click', function () {
  // 切換圖標 class
  var icon = mapToggle.querySelector('i');
  var mapArea = document.querySelector('.map-Area');
  var mainArea = document.getElementById('plan-mainArea');
  if (icon.classList.contains('bi-text-indent-left')) {
    icon.classList.remove('bi-text-indent-left');
    icon.classList.add('bi-map-fill');

    mapArea.style="width:5%;";
    mainArea.style="width:95%;";

  } else {
    icon.classList.remove('bi-map-fill');
    icon.classList.add('bi-text-indent-left');

    mapArea.style="width:30%;";
    mainArea.style="width:70%;";
  }
});


// 可開關側邊工具欄 (先略)
// document.addEventListener("DOMContentLoaded", () => {
//     // 初始化 Popover
//     const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
//     popoverTriggerList.map(function (popoverTriggerEl) {
//       return new bootstrap.Popover(popoverTriggerEl);
//     });
  
//     // 初始化 Offcanvas（如果需要）
//     const offcanvasElements = document.querySelectorAll('.offcanvas');
//     offcanvasElements.forEach(offcanvas => {
//       new bootstrap.Offcanvas(offcanvas);
//     });
// });
  