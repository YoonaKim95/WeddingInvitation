/* script.js */

// D-Day Countdown

const weddingDate = "2025-10-18";
const message = document.getElementById("countdown-message");

function getDayDiffForMessage(targetDate) {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function getCountdown(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate + "T00:00:00").getTime();
  const distance = target - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    distance,
    days: Math.max(days, 0),
    hours: Math.max(hours, 0),
    minutes: Math.max(minutes, 0),
    seconds: Math.max(seconds, 0)
  };
}

const countdownInterval = setInterval(function() {
  // 메시지용 날짜 계산 (날짜 기준)
  const dayDiffMessage = getDayDiffForMessage(weddingDate);

  if (dayDiffMessage > 0) {
    message.innerHTML = `병진 💗 윤아의 결혼식이 ${dayDiffMessage}일 남았습니다.`;
  } else if (dayDiffMessage === 0) {
    message.innerHTML = `오늘은 병진 💗 윤아의 결혼식 입니다!`;
  } else {
    message.innerHTML = `병진 💗 윤아의 결혼식이 ${Math.abs(dayDiffMessage)}일 지났습니다.`;
  }

  // 카운트다운 박스 계산 (시간까지 고려)
  const countdown = getCountdown(weddingDate);

  document.getElementById("days").innerText = countdown.days;
  document.getElementById("hours").innerText = countdown.hours;
  document.getElementById("minutes").innerText = countdown.minutes;
  document.getElementById("seconds").innerText = countdown.seconds;

  // ✅ 카운트다운 종료 처리
  if (countdown.distance <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("days").innerText = 0;
    document.getElementById("hours").innerText = 0;
    document.getElementById("minutes").innerText = 0;
    document.getElementById("seconds").innerText = 0;
  }

}, 1000);


document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('typing-text');
  const text = "We're Getting Married!";
  let i = 0;
  const typing = () => {
    if (i < text.length) {
      const char = text[i] === '\n' ? '<br>' : text[i];
      textElement.innerHTML += char;
      i++;
      setTimeout(typing, 120);
    }
  };
  typing();

  const lazyImg = document.querySelector('.lazyload');
  const highResSrc = lazyImg.dataset.src;

  const loadImage = () => {
    const img = new Image();
    img.src = highResSrc;
    img.onload = () => {
      lazyImg.src = highResSrc;
      lazyImg.classList.add('loaded');
    };
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(lazyImg);
        }
      });
    });
    observer.observe(lazyImg);
  } else {
    loadImage();
  }
});
const grid = document.querySelector('.calendar-grid');

// 1일 위치 맞추기 (2025년 10월 1일은 수요일 → index 3)
const firstDayIndex = 3;
for (let i = 0; i < firstDayIndex; i++) {
  const empty = document.createElement('div');
  grid.appendChild(empty);
}

// 10월 날짜 채우기 (1~31)
for (let d = 1; d <= 31; d++) {
  const day = document.createElement('div');
  day.classList.add('day');

  // 토요일/일요일 강조
  const dayOfWeek = (firstDayIndex + d - 1) % 7;
  if (dayOfWeek === 0) day.classList.add('sun');
  if (dayOfWeek === 6) day.classList.add('sat');

  // 18일 강조
  if (d === 18) day.classList.add('today');


  // 10월 공휴일 메뉴얼 추가.. 
  if (d === 3) day.classList.add('holiday');
  if (d === 6) day.classList.add('holiday');
  if (d === 7) day.classList.add('holiday');
  if (d === 8) day.classList.add('holiday');
  if (d === 9) day.classList.add('holiday');
  

  day.textContent = d;
  grid.appendChild(day);
}


// 갤러리 이미지 배열 (파일명 1~30.jpg로 가정)
const imageList = Array.from({ length: 30 }, (_, i) => `gallery/${i+1}.jpg`);

const galleryContainer = document.getElementById('gallery-thumbnails');
const loadMoreBtn = document.getElementById('load-more');
let currentIndex = 0;

// 선택자 추가
const showLessBtn = document.getElementById('show-less');

function loadThumbnails() {
  const nextImages = imageList.slice(currentIndex, currentIndex + 9);
  nextImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `사진 ${currentIndex + index + 1}`;
    img.dataset.index = currentIndex + index;
    galleryContainer.appendChild(img);
  });
  currentIndex += 9;

  if (currentIndex >= imageList.length) {
    loadMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'block';
  }
}

loadThumbnails();

loadMoreBtn.addEventListener('click', loadThumbnails);

// 줄이기 버튼
showLessBtn.addEventListener('click', () => {
  galleryContainer.innerHTML = ''; // 모든 썸네일 제거
  currentIndex = 0;
  loadThumbnails(); // 처음 9개만 다시 로드
  loadMoreBtn.style.display = 'block';
  showLessBtn.style.display = 'none';
});

// 라이트박스
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
let currentLightboxIndex = 0;

galleryContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    currentLightboxIndex = Number(e.target.dataset.index);
    lightboxImage.src = imageList[currentLightboxIndex];
    lightbox.style.display = 'flex';
  }
});

document.getElementById('close-lightbox').addEventListener('click', () => {
  lightbox.style.display = 'none';
});

document.getElementById('prev').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + imageList.length) % imageList.length;
  lightboxImage.src = imageList[currentLightboxIndex];
});

document.getElementById('next').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % imageList.length;
  lightboxImage.src = imageList[currentLightboxIndex];
});

 
let copyToast = document.querySelector('.copy-toast');
if (!copyToast) {
  copyToast = document.createElement('div');
  copyToast.className = 'copy-toast';
  copyToast.textContent = '복사되었습니다!';
  document.body.appendChild(copyToast);
}

// 주소 복사
const copyAddress = document.getElementById('copy-address');
copyAddress.addEventListener('click', () => {
  navigator.clipboard.writeText(copyAddress.innerText).then(() => {
    copyToast.style.display = 'block';
    copyToast.style.opacity = '1';
    copyToast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      copyToast.style.opacity = '0';
    }, 1500);
  });
});

// 계좌 복사
const accountCopies = document.querySelectorAll('.copy-account');
accountCopies.forEach(element => {
  element.addEventListener('click', () => {
    const accountNum = element.dataset.account.replace(/-/g, '');
    navigator.clipboard.writeText(accountNum).then(() => {
      copyToast.style.display = 'block';
      copyToast.style.opacity = '1';
      copyToast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        copyToast.style.opacity = '0';
      }, 1500);
    });
  });
});


    copyAddress.addEventListener('click', () => {
      navigator.clipboard.writeText(copyAddress.innerText).then(() => {
        copyToast.style.display = 'block';
        setTimeout(() => {
          copyToast.style.display = 'none';
        }, 1500);
      });
    });


// // KakaoMap 생성
document.addEventListener("DOMContentLoaded", function() {
  const mapSection = document.getElementById("kakao-map");
  let mapLoaded = false;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !mapLoaded) {
      loadKakaoMap();
      mapLoaded = true;
    }
  });

  observer.observe(mapSection);
});

function loadKakaoMap() {
  const script = document.createElement("script");
  script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=2f6bea57641d1dd00d85e80a5fb8ba78&autoload=false";
  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("kakao-map");
      const options = {
        center: new kakao.maps.LatLng(37.465642, 126.9594921),
        level: 6,
        draggable: false,
        scrollwheel: false
      };

      const map = new kakao.maps.Map(container, options);

      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.465642, 126.9594921),
        map: map
      });

      // // 컨트롤 제거
      // var mapTypeControl = new kakao.maps.MapTypeControl();
      // map.removeControl(mapTypeControl);

      // var zoomControl = new kakao.maps.ZoomControl();
      // map.removeControl(zoomControl);


      // 잠금 버튼
      const mapToggle = document.getElementById('map-toggle');
      let isLocked = true;

      mapToggle.addEventListener('click', () => {
        isLocked = !isLocked;
        map.setDraggable(!isLocked);
        map.setZoomable(!isLocked);
        mapToggle.innerText = isLocked ? '🔒' : '🔓';
      });
    });
  };
  document.head.appendChild(script);
}

//   window.onload = function() {
//   const container = document.getElementById('kakao-map');
//   const options = {
//     center: new kakao.maps.LatLng(37.465642, 126.9594921),
//     level: 6,
//     draggable: false,    // 기본 잠금
//     scrollwheel: false
//   };

//   const map = new kakao.maps.Map(container, options);

//   // 마커
//   new kakao.maps.Marker({
//     position: new kakao.maps.LatLng(37.465642, 126.9594921),
//     map: map
//   });

//   // 잠금 버튼
//   const mapToggle = document.getElementById('map-toggle');
//   let isLocked = true;

//   mapToggle.addEventListener('click', () => {
//     isLocked = !isLocked;
//     map.setDraggable(!isLocked);
//     map.setZoomable(!isLocked);
//     mapToggle.innerText = isLocked ? '🔒' : '🔓';
//   });
// };


// 약도 토글 버튼 기능
const toggleBtn = document.getElementById('toggle-map-image');
const mapImageContainer = document.getElementById('map-image-container');

toggleBtn.addEventListener('click', () => {
  mapImageContainer.classList.toggle('open');
  toggleBtn.textContent = mapImageContainer.classList.contains('open') ? '닫기' : '약도 확인하기';
});


// Music Toggle
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  if (audio.paused) {
    audio.play().catch(() => {
      console.log('자동 재생은 상호작용 후에만 가능합니다.');
    });
    icon.src = 'music_01_on.png';
  } else {
    audio.pause();
    icon.src = 'music_01_off.png';
  }
}

document.getElementById('music-toggle').addEventListener('click', toggleMusic);

// Kakao Share
Kakao.init('2f6bea57641d1dd00d85e80a5fb8ba78'); // Replace with your own JavaScript key

document.getElementById('kakaotalk-sharing-btn').addEventListener('click', function() {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '안병진 💗 김윤아 결혼합니다',
      description: '2025년 10월 18일 토요일 오후 1시, 서울대학교 연구공원 웨딩홀',
      imageUrl: 'https://yoonakim95.github.io/WeddingInvitation/thumbnail.jpg',
      link: {
        mobileWebUrl: 'https://yoonakim95.github.io/WeddingInvitation/',
        webUrl: 'https://yoonakim95.github.io/WeddingInvitation/',
      },
    },
    buttons: [
      {
        title: '모바일 청첩장 보기',
        link: {
          mobileWebUrl: 'https://yoonakim95.github.io/WeddingInvitation/',
          webUrl: 'https://yoonakim95.github.io/WeddingInvitation/',
        },
      },
    ],
  });
});

// // // Toggle 계좌 펼치기 + 화살표 전환
// document.querySelectorAll('.account-toggle').forEach(button => {
//   button.addEventListener('click', () => {
//     const targetId = button.getAttribute('data-target');
//     const element = document.getElementById(targetId);
//     const arrow = button.querySelector('.arrow');

//     if (element.style.display === 'block') {
//       element.style.display = 'none';
//       arrow.textContent = '▼';
//     } else {
//       element.style.display = 'block';
//       arrow.textContent = '▲';
//     }
//   });
// });

document.querySelectorAll('.account-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const content = document.getElementById(targetId);
    const arrow = button.querySelector('.arrow');

    const isOpen = content.classList.contains('open');
    content.classList.toggle('open');
    button.classList.toggle('open');
    arrow.textContent = isOpen ? '▼' : '▲';
  });
});



// document.querySelectorAll('.account-toggle').forEach(button => {
//   const targetId = button.getAttribute('data-target');
//   const element = document.getElementById(targetId);
//   const arrow = button.querySelector('.arrow');

//   // 초기화: 열린 상태 반영
//   if (element.style.display === 'block') {
//     arrow.textContent = '▲';
//   }

//   // 토글 동작
//   button.addEventListener('click', () => {
//     if (element.style.display === 'block') {
//       element.style.display = 'none';
//       arrow.textContent = '▼';
//     } else {
//       element.style.display = 'block';
//       arrow.textContent = '▲';
//     }
//   });
// });

 
// 카카오페이 링크는 <a href>에 직접 송금 링크를 넣으면 됨 (별도 JS 코드 필요 없음)


// 종이청첩장 모달
const openInvitationBtn = document.getElementById('open-invitation');
const closeInvitationBtn = document.getElementById('close-invitation');
const invitationModal = document.getElementById('invitation-modal');

openInvitationBtn.addEventListener('click', () => {
  invitationModal.style.display = 'flex';
});

closeInvitationBtn.addEventListener('click', () => {
  invitationModal.style.display = 'none';
});

invitationModal.addEventListener('click', (e) => {
  if (e.target === invitationModal) {
    invitationModal.style.display = 'none';
  }
});
