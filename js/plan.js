// 初始狀態
let initialSate = {
  plans: JSON.parse(localStorage.getItem('plans')) || [],
};

// 更新 localStorage
function updateLocalStorage() {
  localStorage.setItem('plans', JSON.stringify(initialSate.plans));
}

// 清理遮罩與樣式
function clearModalState() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) modalBackdrop.remove();
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

// 共用彈窗邏輯
function openModal({ title, bodyContent, confirmText, onConfirm }) {
  // 更新標題與內容
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyContent;

  const confirmBtn = document.querySelector('#newPlanModal .btn-primary');
  const cancelBtn = document.querySelector('#newPlanModal .btn-secondary');

  if (confirmBtn) {
    confirmBtn.textContent = confirmText;
    confirmBtn.onclick = function () {
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('newPlanModal'));
      onConfirm();
      if (modalInstance) modalInstance.hide();
      clearModalState();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = function () {
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('newPlanModal'));
      if (modalInstance) modalInstance.hide();
      clearModalState();
    };
  }

  const modal = new bootstrap.Modal(document.getElementById('newPlanModal'));
  modal.show();
}

// 計算日期範圍
function calculateDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates.length === 1 ? [startDate] : dates;
}

// 渲染行程
function renderPlans(plans) {
  const planGroup = document.querySelector('.plan-group');
  planGroup.innerHTML = '';
  plans.forEach((plan, planIndex) => {
    const planElement = document.createElement('div');
    planElement.className = 'planList mb-4';
    planElement.innerHTML = `
      <ul class="list-group sortable-list">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="d-flex align-items-center justify-content-center fw-bold planName">
            <i class="bi bi-map ms-1 me-2"></i>
            <p class="planName">${plan.name}</p>
          </div>
          <button class="btn btn-light edit_plan" type="button">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>
        ${renderDates(plan.dates, planIndex)}
      </ul>
      <div class="d-none justify-content-between mt-3 config-row">
        <button class="btn btn-outline-danger deleteSelected">刪除選項</button>
        <div>
          <button class="btn btn-outline-secondary cancelPlan">取消</button>
          <button class="btn btn-primary savePlan">儲存</button>
        </div>
      </div>`;
    planGroup.appendChild(planElement);

    // 初始化拖曳功能
    new Sortable(planElement.querySelector('.sortable-list'), {
      group: 'shared',
      animation: 150,
      handle: '.list-group-item',
      filter: '.hint-addPlace', // 禁止拖曳 hint-addPlace
      preventOnFilter: false,
    });
  });
}

function renderDates(dates, planIndex) {
  return dates
    .map(
      (date, index) => {
        const places = date.places || [];
        return `
          <li class="list-group-item date-group">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" class="d-none form-check-input me-2" />
                <span class="dayBlock">${index + 1}</span>
                <span class="dateBlock">${date.date || date}</span>
              </div>
              <button class="btn btn-link btn-sm mb-0" data-bs-toggle="collapse" data-bs-target="#day${planIndex}-${index + 1}Details" aria-expanded="false" aria-controls="#day${planIndex}-${index + 1}Details">
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>
            <div class="collapse mt-2" id="day${planIndex}-${index + 1}Details">
              <ul class="list-group sortable-list">
                ${places
                  .map(
                    (place) => `
                  <li class="list-group-item d-flex align-items-center sub-group">
                    <input type="checkbox" class="d-none form-check-input me-2" id="${place.id}" /> ${place.name}
                  </li>`
                  )
                  .join('')}
                <li class="list-group-item d-flex align-items-center hint-addPlace">
                  <i class="bi bi-plus fs-4 fw-bold"></i> 新增地點
                </li>
              </ul>
            </div>
          </li>`;
      }
    )
    .join('');
}

// 新增地點邏輯
document.querySelector('.plan-group').addEventListener('click', function (e) {
  if (e.target.closest('.hint-addPlace')) {
    const hintItem = e.target.closest('.hint-addPlace');
    const dayDetails = hintItem.closest('.collapse');
    const planIndex = Array.from(document.querySelectorAll('.planList')).indexOf(hintItem.closest('.planList'));
    const dateIndex = Array.from(dayDetails.closest('.date-group').parentNode.children).indexOf(dayDetails.closest('.date-group'));

    openModal({
      title: '新增地點',
      bodyContent: `
        <form id="newPlaceForm">
          <div class="mb-3">
            <label for="placeName" class="form-label">地點名稱</label>
            <input type="text" class="form-control" id="placeName" placeholder="請輸入地點名稱" required />
          </div>
        </form>`,
      confirmText: '加入行程',
      onConfirm: function () {
        const placeName = document.getElementById('placeName').value.trim();

        if (!placeName) {
          alert('請輸入地點名稱！');
          return;
        }

        const placeId = `place-${Date.now()}`;
        const newPlaceItem = document.createElement('li');
        newPlaceItem.className = 'list-group-item d-flex align-items-center sub-group';
        newPlaceItem.innerHTML = `<input type="checkbox" class="d-none form-check-input me-2" id="${placeId}" /> ${placeName}`;

        const targetGroup = hintItem.parentNode;
        targetGroup.insertBefore(newPlaceItem, hintItem);

        // 更新至 LocalStorage
        if (!initialSate.plans[planIndex].dates[dateIndex].places) {
          initialSate.plans[planIndex].dates[dateIndex].places = [];
        }
        initialSate.plans[planIndex].dates[dateIndex].places.push({ id: placeId, name: placeName });
        updateLocalStorage();

        // 自動關閉彈窗
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('newPlanModal'));
        if (modalInstance) modalInstance.hide();
        clearModalState();

        // 重新渲染計畫
        renderPlans(initialSate.plans);
      },
    });
  }
});

// 編輯行程邏輯
document.querySelector('.plan-group').addEventListener('click', function (e) {
  if (e.target.closest('.edit_plan')) {
    const planList = e.target.closest('.planList');
    if (planList) {
      const checkbox = planList.querySelectorAll('input[type="checkbox"]');
      checkbox.forEach((input) => input.classList.remove('d-none'));

      const configRow = planList.querySelector('.config-row');
      if (configRow) {
        configRow.classList.remove('d-none');
        configRow.classList.add('d-flex');
      }
    }
  }
});

// 刪除邏輯
document.querySelector('.plan-group').addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteSelected')) {
    const planList = e.target.closest('.planList');
    const selectedCheckboxes = planList.querySelectorAll('input[type="checkbox"]:checked');

    selectedCheckboxes.forEach((checkbox) => {
      const listItem = checkbox.closest('.list-group-item');
      listItem.remove();
    });

    updateLocalStorage();
    renderPlans(initialSate.plans);
  }
});

// 取消邏輯
document.querySelector('.plan-group').addEventListener('click', function (e) {
  if (e.target.classList.contains('cancelPlan')) {
    renderPlans(initialSate.plans);
  }
});

// 儲存邏輯
document.querySelector('.plan-group').addEventListener('click', function (e) {
  if (e.target.classList.contains('savePlan')) {
    const planList = e.target.closest('.planList');
    const planIndex = Array.from(document.querySelectorAll('.planList')).indexOf(planList);

    const updatedDates = Array.from(planList.querySelectorAll('.date-group')).map((group, index) => {
      const dateBlock = group.querySelector('.dateBlock').textContent;
      const places = Array.from(group.querySelectorAll('.sub-group')).map((placeItem) => {
        return {
          id: placeItem.querySelector('input').id,
          name: placeItem.textContent.trim(),
        };
      });
      return { date: dateBlock, places };
    });

    initialSate.plans[planIndex].dates = updatedDates;
    updateLocalStorage();
    renderPlans(initialSate.plans);
  }
});

// 初始渲染
renderPlans(initialSate.plans);





// 行程拖曳
// document.querySelectorAll('.list-group').forEach(list => {
//   new Sortable(list, {
//       group: 'shared', // 如果需要支持跨列表拖曳，設定相同的群組名稱
//       animation: 150,  // 拖曳的動畫時長（毫秒）
//       handle: '.list-group-item', // 拖曳的觸發點
//       onEnd: (evt) => {
//           // const items = document.querySelectorAll('.list-group-item');
//           // tempState = Array.from(items).map(function(item){
//           //   item.outerHTML; //更新暫存狀態
//           // })
//           //console.log(`Item ${evt.item.textContent} moved from ${evt.from} to ${evt.to}`);
//       },
//   });
// });

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
  