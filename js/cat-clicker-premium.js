/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var DOC = document,
        CONTDIV = DOC.getElementById('indexPageContent'),
        NAVDIV = DOC.getElementById('indexPageSideNav'),
        cats = [{
            id: 'lonely-kit',
            title: 'A lonely kitten',
            image: 'img/lonely-kit.jpg',
            clickCnt: 0
        },{
            id: 'dramatic-cat',
            title: 'A dramatic cat',
            image: 'img/dramatic-cat.jpg',
            clickCnt: 0
        },{
            id: 'two-kits',
            title: 'Two sleepy kittens',
            image: 'img/two-kits.jpg',
            clickCnt: 0
        }],
        catsClasses = 'catClicker',
        spanClass = 'catClickCnt',
        i;

    //initClickers(cats);
    initList(cats);

    function addClickEventListener(el) {
        if (el.addEventListener) {
            el.addEventListener('click', incrementClickCnt, false);
        }
    }

    function clearClickers() {
        var children = CONTDIV.childNodes,
            i;

        for (i = 0; i < children.length; i++) {
            CONTDIV.removeChild(children[i]);
        }
    }

    function getCatModelById(catId) {
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].id === catId) {
                return i
            }
        }
        return -1;
    }

    function initClickers(catModels) {
        var clickCnt, clickTxt, clickTxtSuffix, el, elImg, i;

        for (i = 0; i < catModels.length; i++) {
            if (!catModels[i].id || !catModels[i].title || !catModels[i].image) {
                continue;
            }

            if (!catModels[i].clickCnt || isNaN(catModels[i].clickCnt)) {
                clickCnt = 0;
            }
            else {
                clickCnt = catModels[i].clickCnt;
            }
            clickTxtSuffix = clickCnt === 1 ? ' time' : ' times' + '!'

            // create a div and an image , set the id, the title, and the image src
            el = DOC.createElement('div');
            el.id = catModels[i].id;
            el.innerHTML = '<h2>' + catModels[i].title + '</h2>';
            elImg = DOC.createElement('img');
            elImg.src = catModels[i].image;
            clickTxt = DOC.createElement('h2');
            clickTxt.innerHTML = "I've been clicked <span class=\"" + spanClass + "\">"
                    + clickCnt + clickTxtSuffix + '</span>';

            el.appendChild(elImg);
            el.appendChild(clickTxt);
            addClickEventListener(el);
            CONTDIV.appendChild(el);
        }
    }

    function initList(catModels) {
        var cat, listEl, listItemEl;

        listEl = DOC.createElement('ul');
        for (i = 0; i < catModels.length; i++) {
            if (!catModels[i].id || !catModels[i].title || !catModels[i].image) {
                continue;
            }
            cat = catModels[i];
            listItemEl = DOC.createElement('li');
            listItemEl.innerHTML = catModels[i].title;
            listItemEl.addEventListener('click', (function(catCopy) {
                return function() {
                    clearClickers();
                    initClickers([catCopy]);
                };
            })(cat), false);
            listEl.appendChild(listItemEl);
        }
        NAVDIV.appendChild(listEl);
    }

    function incrementClickCnt(eObj) {
        var el = eObj.currentTarget,
            catId = el.id,
            catIdx, catMod, clickCnt, clickCntTxt, elSpan;

        if (typeof catId === 'undefined') {
            return;
        }
        catIdx = getCatModelById(catId);
        if (!isNaN(cats[catIdx].clickCnt)) {
            cats[catIdx].clickCnt += 1;
            elSpan = el.getElementsByClassName(spanClass)[0];
            clickCnt = cats[catIdx].clickCnt;
            clickCntTxt = clickCnt;
            clickCntTxt += ((clickCnt === 1) ? ' time' : ' times') + '!';
            elSpan.innerHTML = clickCntTxt;
        }
    }
})();
