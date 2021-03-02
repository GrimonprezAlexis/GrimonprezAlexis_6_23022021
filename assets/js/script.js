/** Show button scrollTop */
function onScroll(){
  let el = $("#scrollToMain");
  window.scrollY  > 100 ? el.css({"display": "flex"}) : el.css({"display": "none"});
}


fetch('/data/json/FishEyeDataFR.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
});

/*
var tags = ["portrait", "événements", "voyage", "animaux"];
console.log(tags.length);

function getTags() {
    var cardContainer= document.getElementById("cardContainer");
    for (var i = 0; i < tags.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = (tags[i]);
        cardContainer.appendChild(div);
    }
}
getTags();
<div id="cardContainer"></div>
 http://jsfiddle.net/fx9cabqd/ */


function appendData(data) {
    let mainContainer = $(".container__main");
    let photographers = data.photographes;
    for (let i = 0; i < photographers.length; i++) {
        let photographerTags = photographers[i].tags;
        mainContainer.append(`
            <div class="photographer">
                <div class="photographer__img">
                    <a href="" class="photographer__img__link">
                        <img src="./assets/img/photo-video/Photographers_ID_Photos/${photographers[i].portrait}" alt="${photographers[i].nom}">
                        <h2>${photographers[i].nom}</h2>
                    </a>
                </div>
                <div class="photographer__text">
                    <p class="photographer__text__localisation">${photographers[i].ville}, ${photographers[i].country || photographers[i].pays}</p>
                    <p class="photographer__text__desc">${photographers[i].tagline}</p>
                    <p class="photographer__text__price">${photographers[i].prix} /jour</p>
                </div>
                <ul class="photographer__tag">
                    <li>
                        <a href="" title="Tag portrait" aria-label="Tag Photographer portrait">
                        <span aria-hidden="false">#portrait</span></a>
                    </li>
                    <li>
                        <a href="" title="Tag events" aria-label="Tag Photographer events">
                        <span aria-hidden="false">#events</span></a>
                    </li>
                    <li>
                        <a href="" title="Tag travel" aria-label="Tag Photographer travel">
                        <span aria-hidden="false">#travel</span></a>
                    </li>
                    <li>
                        <a href="" title="Tag animals" aria-label="Tag Photographer animals">
                        <span aria-hidden="false">#animals</span></a>
                    </li>
                </ul>
            </div>
        `);
    }
}