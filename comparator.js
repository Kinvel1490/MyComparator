//Compare standalone
var mygalery, compare, c_mp_wrapper, comp, compbg, comppic, comppic2, control_wrapper, compare_thmb_wrapper, picarr, workarr, size, maxWidth, relation, links, curShift, startX, rsz;


var startCompare = function(arr) {
    if (document.body.contains(document.querySelector(".mygalery"))){
        if (arr.length>0){
        if(arr[0].length%2 == 0) {
            if(arr[0].length == arr[1].length) {
                workarr = arr;
                createDomStructure();
            }else{errorMissMatch();}
        }else{
            nonDevidable();
        }        
    } else {
        errorMessage();
    }
    } else {errorInit();}
}

function errorMessage () {
    document.querySelector(".mygalery").innerHTML = "Нужно указать 2 массива: изображения и миниатюры";
}

function nonDevidable () {
    document.querySelector(".mygalery").innerHTML = "Количество изображений должно быть кратно 2";
}

function errorMissMatch () {
    document.querySelector(".mygalery").innerHTML = "Количество изображений и миниатюр должно совпадать";
}

function errorInit () {
    document.body.innerHTML = "Отсутствует нужный элемент для инициализации"
}

function createDomStructure () {
    mygalery = document.querySelector(".mygalery");
    compare = document.createElement("div");
    c_mp_wrapper = document.createElement("div");
    compbg = document.createElement("div");
    comp = document.createElement("div");
    control_wrapper = document.createElement("div")
    comppic2 = document.createElement("img");
    comppic = document.createElement("img");

    mygalery.appendChild(compare);
    compare.appendChild(c_mp_wrapper);
    c_mp_wrapper.appendChild(compbg);
    c_mp_wrapper.appendChild(comp);
    c_mp_wrapper.appendChild(control_wrapper);
    compbg.appendChild(comppic2);
    comp.appendChild(comppic);
    
    compare.classList.add("compare");
    c_mp_wrapper.classList.add("c_mp_wrapper");
    compbg.classList.add("compbg");
    comppic2.classList.add("comppic2");
    comppic2.draggable = false;
    comppic.classList.add("comppic");
    comppic.draggable =false;
    comp.classList.add("comp");
    control_wrapper.classList.add("control_wrapper");

    comppic2.setAttribute("src", workarr[0][0]);
    comppic.setAttribute("src", workarr[0][1]);

    if (workarr[0].length > 2 && workarr[1].length > 2) {
        compare_thmb_wrapper = document.createElement("div");
        compare.appendChild(compare_thmb_wrapper);
        compare_thmb_wrapper.classList.add("compare_thmb_wrapper");
        
        for(let i = 0; i<workarr[1].length; i++) {
            let compare_thmb = document.createElement("a");
            let thumb = document.createElement("img");

            compare_thmb_wrapper.appendChild(compare_thmb);
            compare_thmb.appendChild(thumb);

            compare_thmb.classList.add("compare_thmb");
            thumb.classList.add("thumb")
            compare_thmb.setAttribute("href", workarr[0][i]);
            thumb.setAttribute("src", workarr[1][i]);
        }
    }
    size = document.querySelector('.comp').clientWidth;
    maxWidth = document.querySelector('.compbg').clientWidth;
    curShift = 0;
    // setHeight();
    window.onresize = setHeight;
    control_wrapper.addEventListener('mousedown', (e) => compMD(e));
    control_wrapper.addEventListener('touchstart', (e) => compMD(e));
    control_wrapper.addEventListener('mouseup', () => compMU());
    control_wrapper.addEventListener('touchstend', () => compMU());
    control_wrapper.addEventListener('mouseleave', () => compMU());
    links = document.querySelectorAll(".compare_thmb");
    links.forEach((link)=>{
        link.addEventListener('click', (e) => picChanger(e));
        link.addEventListener('touchstart', (e) => picChanger(e));
    });
    if (document.querySelector('.compare_thmb_wrapper')) {
        compare_thmb_wrapper.addEventListener('wheel', (e) => wheeler(e));
    }
}

function setHeight () {
    maxWidth = document.querySelector('.compbg').clientWidth;
    let newWidth = document.querySelector('.compbg').clientWidth*relation;
    document.querySelector('.comp').setAttribute('style', 'width: '+newWidth+"px");
    size = newWidth;
    compare_thmb_wrapper.style.transform = 'translate(0px)';
}

var compMD = (e) => {
    e = window.event || e;
    if (e.type == "mousedown") {
        control_wrapper.addEventListener('mousemove', rsz = (event) => resizePictureMouse (event));
    }
    if (e.type == "touchstart") {
        startX = e.changedTouches[0].clientX;
        control_wrapper.addEventListener('touchmove', rsz = (event) => resizePictureTouch (event));
    }
}

var compMU = () => {
    control_wrapper.removeEventListener('mousemove', rsz);
    control_wrapper.removeEventListener('touchmove', rsz);
    relation = document.querySelector('.comp').clientWidth/document.querySelector('.compbg').clientWidth;
}

var wheeler = (e) => {
    e = window.event || e;
    e.preventDefault();
    let maxShift = -((links.length*(links[0].clientWidth+3))/2 - compare.clientWidth-3);    
    if (((links.length*(links[0].clientWidth+3))/2) > (compare.clientWidth-3)) {
        e = window.event || e;
        x = e.deltaY || e.detail || e.wheelDelta,val=0.1,min = 0,max=0;
        x = -x;
        if(x<-200) {x=-200}
        curShift += x;
        if (curShift > 0) {curShift = 0}
        if (curShift < maxShift) {curShift = maxShift}
        compare_thmb_wrapper.style.transform = 'translate('+curShift+'px)';  
    }
}

function resizePictureMouse (e) {
    e = window.e || e;
        parseInt(size);
        size += e.movementX*1.5;
        if (size <= maxWidth) {
            if (size > 0) {
                document.querySelector('.comp').setAttribute('style', 'width: '+size+"px");
            } else size = 1;
        } else size = maxWidth;
}

function resizePictureTouch (e) {
    let offset = 0;
    offset = (startX - e.changedTouches[0].clientX)*1.5;
    size -= offset;
    if (size <= maxWidth) {
        if (size > 0) {
            document.querySelector('.comp').setAttribute('style', 'width: '+size+"px");
        } else size = 1;
    } else size = maxWidth;
    startX = e.changedTouches[0].clientX;
}

function picChanger (e) {
    e.preventDefault();
    for (let i = 0; i<links.length; i=i+2) {
        if (e.target == links[i]) {
            comppic2.setAttribute('src', links[i].getAttribute('href'));
            comppic.setAttribute('src', links[i+1].getAttribute('href'));
        }
    }
}