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
