/* script.js */

// D-Day Countdown
const weddingDate = new Date("2025-10-18T13:00:00").getTime();
const countdownInterval = setInterval(function() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").innerHTML = "오늘은 결혼식 날입니다!";
  }
}, 1000);


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

  day.textContent = d;
  grid.appendChild(day);
}

// KakaoMap 생성
window.onload = function() {
    const container = document.getElementById('kakao-map');
    const options = {
      center: new kakao.maps.LatLng(37.465642, 126.9594921),
      level: 3
    };
  
    const map = new kakao.maps.Map(container, options);
  
    // 마커
    new kakao.maps.Marker({
      position: new kakao.maps.LatLng(37.465642, 126.9594921),
      map: map
    });
  };


  // 약도 모달 열기/닫기
const openMapBtn = document.getElementById('open-map-modal');
const closeMapBtn = document.getElementById('close-map-modal');
const mapModal = document.getElementById('map-modal');

openMapBtn.addEventListener('click', () => {
  mapModal.style.display = 'flex';
});

closeMapBtn.addEventListener('click', () => {
  mapModal.style.display = 'none';
});

// 모달 바깥 클릭 시 닫기
mapModal.addEventListener('click', (e) => {
  if (e.target === mapModal) {
    mapModal.style.display = 'none';
  }
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

document.querySelectorAll('.account-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    const element = document.getElementById(target);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
  });
});

// Kakao Share
Kakao.init('2f6bea57641d1dd00d85e80a5fb8ba78'); // Replace with your own JavaScript key

document.getElementById('kakaotalk-sharing-btn').addEventListener('click', function() {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '안병진 💗 김윤아 결혼합니다',
      description: '2025년 10월 18일 토요일 오후 1시, 서울대학교 연구공원 웨딩홀',
      imageUrl: 'https://yoonakim95.github.io/WeddingInvitation/thumbnail.png',
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
