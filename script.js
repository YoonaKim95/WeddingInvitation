function toggleAccount(id) {
    const element = document.getElementById(id);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
  }
  
  function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    if (audio.paused) {
      audio.play();
      icon.src = 'music_01_on.png';
    } else {
      audio.pause();
      icon.src = 'music_01_off.png';
    }
  }
  
  document.querySelectorAll('.account-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      toggleAccount(target);
    });
  });
  