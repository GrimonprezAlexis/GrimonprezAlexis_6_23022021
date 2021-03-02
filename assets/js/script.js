

    /** Show button scrollTop */
    function onScroll(){
        let el = $("#scrollToMain");
        window.scrollY  > 100 ? el.css({"display": "flex"}) : el.css({"display": "none"});
    }

    //Fetch data from json file
    fetch('/data/json/FishEyeDataFR.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        appendPhotographerDiv(data);
    })
    .catch(err => {
        console.log(err);
    });

    let arrayOfTags = [];

    //Loop the list of tags photographers, and append navigation tags
    function appendTagsNavigation(tags) {
        let headerNavigationList = $(".header__navigation__list");
        tags.forEach(tag => {
            if(arrayOfTags.indexOf(tag) === -1){
                arrayOfTags.push(tag);
                headerNavigationList.append(`
                    <button class="button button-group" role="button" tabindex="0">
                        <a title="Tag ${tag}" aria-label="Tag Photographer ${tag}">
                        <span aria-hidden="false">#${tag}</span></a>
                    </button>
                `);
            }
        });
    }

    //Add lists tags associated to photographer div rather than id
    function getTagsByPhotographerId(photographer) {
        let photographerTagsContainer = $(`div#photographer-${photographer.id} > .photographer__tag`);
        photographer.tags.forEach(tag => {
            photographerTagsContainer.append(`
                <li>
                    <a title="Tag ${tag}" aria-label="Tag ${tag}">
                    <span aria-hidden="false">#${tag}</span></a>
                </li>
            `);
        });
    }

    //Loop the list of photographers, and append associate div
    //After call getTagsByPhotographerId
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
            appendTagsNavigation(photographer.tags);
            getTagsByPhotographerId(photographer);
        });
    }


    // hide / show photographer onclick tag navigation
    $('.header__navigation__list').on( 'click', 'button', function() {
    
        //Div of photographer
        let photographerDiv = $(".photographer");
        
        //transform #Fashion to fashion
        let filterValue = $(this).find("span").text().slice(1).toLowerCase();

        //toggle active button
        $('button').removeClass('is-checked');
        $(this).addClass('is-checked');

        //loop on each photographer div and filter by selected tag
        photographerDiv.each(function() {
            //get the id of div photographer (photographer-243)
            let photographerId = $(this).attr("id");

            //"#portrait#événements#voyage#animaux"
            let tagOfPhotographer = $(this).find(".photographer__tag li span").text();

            //Check if the photographe has the tag
            if(tagOfPhotographer.indexOf(filterValue) == -1) $(`#${photographerId}`).hide(200);
            else $(`#${photographerId}`).show(200);
        });
    });



