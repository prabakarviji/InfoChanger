function setScreenshotUrl(url) {
  document.getElementById('target').src = url;
  var imageSaveBtn = document.getElementById("imgSaveInfoBtn");
  imageSaveBtn.setAttribute("href", url);
  imageSaveBtn.setAttribute("download", "Screenshot from Info Changer");
}