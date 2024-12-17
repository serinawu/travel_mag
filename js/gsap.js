// //hero
// gsap.registerPlugin(ScrollTrigger);

// let tl = gsap.timeline({
//     scrollTrigger : {
//         trigger: ".hero",
//         start: "top top",
//         end: "+=100%",
//         pin: true,
//         scrub: 1,
//     },
// });


// // 第一張圖片
// tl.to(".hero-1", {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     duration: 1,
//     ease: "power2.out",
//   });
  
//   // 第二張圖片
//   tl.to(".hero-1", { opacity: 0, scale: 1.2, duration: 1 }, ">")
//     .to(".hero-2", {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//     });
  
//   // 第三張圖片
//   tl.to(".hero-2", { opacity: 0, scale: 1.2, duration: 1 }, ">")
//     .to(".hero-3", {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//     });
