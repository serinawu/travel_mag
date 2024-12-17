//Swiper

/**
 * 首頁
 */

var outer_swiper = new Swiper('.outer_swiper', {
    autoHeight: true,
    loop: true,
    // autoplay: {
    //     delay: 1500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    // },
    slidesPerView: 1,
    breakpoints: {
        1000: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    }
    // ,
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //     },
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },
});

document.querySelectorAll('.inner_swiper').forEach((swiperEl, index) => {
    new Swiper (swiperEl, {
            slidesPerView: 1,
            autoHeight: true,
            loop: true,
            // autoplay: {
            //     delay: 1500,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true,
            // },
            navigation: {
                nextEl: `.inner-next-${index+1}`,
                prevEl: `.inner-prev-${index+1}`,
            }
        }
    )
})

var store_swiper = new Swiper('.store_swiper', {
    autoHeight: false,
    loop: true,
    // autoplay: {
    //     delay: 1500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    // },
    slidesPerView: 1,
    breakpoints: {
        1000: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    },
    navigation: {
        nextEl: '.store-prev',
        prevEl: '.store-next',
    },
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },
});

/**
 * 購買頁
 */

// var swiper = new Swiper('.swiper', {
//     autoHeight: true,
//     loop: true,
//     // autoplay: {
//     //     delay: 1500,
//     //     disableOnInteraction: false,
//     //     pauseOnMouseEnter: true,
//     // },
//     slidesPerView: 1,
//     breakpoints: {
//         1000: {
//             slidesPerView: 1,
//             spaceBetween: 0,
//         }
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//         },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
// });

/**
 * 規劃頁
 */

var swiper_recent = new Swiper('.swiper_recent', {
    autoHeight: true,
    loop: true,
    // autoplay: {
    //     delay: 1500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    // },
    slidesPerView: 1,
    breakpoints: {
        1000: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const swiperContainer = document.querySelector('.swiper-wrapper');

// 假資料
const recentData = [
  { id: 1, title: '台北101觀景台', desc: '壯觀景色與都市夜景', img: 'image1.jpg' },
  { id: 2, title: '九份老街', desc: '古樸文化與美食天堂', img: 'image2.jpg' },
  { id: 3, title: '陽明山國家公園', desc: '自然景觀與溫泉', img: 'image3.jpg' },
];

// 動態生成卡片
recentData.forEach(item => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.innerHTML = `
    <div class="card">
      <img src="${item.img}" class="card-img-left img-modal" alt="${item.title}">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.desc}</p>
      </div>
      <div class="w-100 h-100 align-items-center justify-content-center position-absolute card-layer">
        <button class="btn btn-primary me-3" role="button" id="liveAlertBtn">
            加到我的行程
        </button>
        <button class="btn btn-outline-light" role="button" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
            <p>更多</p>
        </button>
    </div>
  `;
  swiperContainer.appendChild(slide);
});

// 更新 Swiper_recent
swiper_recent = new Swiper('.swiper_recent', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
});
swiper_recent.update();

