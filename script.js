
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
  