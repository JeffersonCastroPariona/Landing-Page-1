// AGREGA CLASE boxCardAnimated AL HACER SCROLL PARA ANIMAR COMPONENTE CARD 
window.onscroll = function() {

    let scrollPosY = window.pageYOffset | document.body.scrollTop;

    if (scrollPosY >= 400) {
        subir = document.querySelector('#subir');
        subir.classList.add("irArriba");
    } else {
        subir = document.querySelector('#subir');
        subir.classList.remove("irArriba");
    }

    if (scrollPosY >= 910) {
        cardAnimated = document.getElementById('cardAnimada');
        cardAnimated.classList.add("boxCardAnimated");
    } else {
        cardAnimated = document.getElementById('cardAnimada');
        cardAnimated.classList.remove("boxCardAnimated");
    }

};


// AGREGA CLASE current AL HACER SCROLL 
let mainNavLinks = document.querySelectorAll("nav div ul li a");

window.addEventListener("scroll", event => {
    event.preventDefault();

    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
});


// DESPLAZAMIENTO SMOOTH SCROLL
window.onload = function() {

    const easeInCubic = function(t) { return t * t * t }
    const scrollElems = document.getElementsByClassName('scroll');

    const scrollToElem = (start, stamp, duration, scrollEndElemTop, startScrollOffset) => {

        const runtime = stamp - start;
        let progress = runtime / duration;
        const ease = easeInCubic(progress);

        progress = Math.min(progress, 1);

        const newScrollOffset = startScrollOffset + (scrollEndElemTop * ease);
        window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));

        if (runtime < duration) {
            requestAnimationFrame((timestamp) => {
                const stamp = new Date().getTime();
                scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
            })
        }
    }

    for (let i = 0; i < scrollElems.length; i++) {
        const elem = scrollElems[i];

        elem.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollElemId = e.target.href.split('#')[1];
            const scrollEndElem = document.getElementById(scrollElemId);

            const anim = requestAnimationFrame(() => {
                const stamp = new Date().getTime();
                const duration = 1200;
                const start = stamp;

                const startScrollOffset = window.pageYOffset;

                const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

                scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
            })
        })
    }
}

function enviarMensaje() {
    alert('Mensaje enviado con éxito!');
    document.getElementById("miForm").reset();
}

// Selecciona los elementos que quieres animar
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

// Función para detectar si un elemento está visible en la pantalla
const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight && rect.bottom >= 0
    );
};

// Añade o elimina la clase 'visible' según la posición del elemento
const handleScroll = () => {
    elementsToAnimate.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('visible'); // Añade la clase cuando está visible
        } else {
            element.classList.remove('visible'); // Elimina la clase cuando no está visible
        }
    });
};

// Escucha el evento 'scroll' para activar la animación
window.addEventListener('scroll', handleScroll);

// Llama a la función una vez al cargar la página
handleScroll();

