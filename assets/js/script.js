/** Show button scrollTop */
function onScroll(){
  var el = document.getElementById('scrollToMain');
  window.scrollY  > 100 ? el.style.display = "flex" : el.style.display = "none";
}

