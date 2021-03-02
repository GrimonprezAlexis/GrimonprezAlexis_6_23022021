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
    appendPhotographerDiv(data);
  })
  .catch(function (err) {
    console.log(err);
});


//Ajoute la liste des tags associé à la div du photographe selon son id
function getTagsByPhotographerId(photographer) {
    let photographerTagsContainer = $(`div#photographer-${photographer.id} > .photographer__tag`);
    photographer.tags.forEach(tag => {
        photographerTagsContainer.append(`
            <li>
                <a href="" title="Tag ${tag}" aria-label="Tag ${tag}">
                <span aria-hidden="false">#${tag}</span></a>
            </li>
        `);
    });
}

//Parcours la liste des photographes, et créer une div associé
//Appel ensuite getTagsByPhotographerId
function appendPhotographerDiv(data) {
    let mainContainer = $(".container__main");
    data.photographes.forEach(photographer => {
        mainContainer.append(`
            <div class="photographer" id='photographer-${photographer.id}'>
                <div class="photographer__img">
                    <a href="" class="photographer__img__link">
                        <img src="./assets/img/photo-video/Photographers_ID_Photos/${photographer.portrait}" alt="${photographer.nom}">
                        <h2>${photographer.nom}</h2>
                    </a>
                </div>
                <div class="photographer__text">
                    <p class="photographer__text__localisation">${photographer.ville}, ${photographer.country || photographer.pays}</p>
                    <p class="photographer__text__desc">${photographer.tagline}</p>
                    <p class="photographer__text__price">${photographer.prix} /jour</p>
                </div>
                <ul class="photographer__tag"></ul>
            </div>
        `);
        getTagsByPhotographerId(photographer);
    });
}