function goTo(sceneId) {
  const scenes = document.querySelectorAll('.scene');
  
  scenes.forEach(scene => {
    scene.classList.remove('active');
  });

  document.getElementById(sceneId).classList.add('active');
}
