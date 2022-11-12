$(document).ready(function(){

    /*Breakpoints default mobile device*/

    const breakpointMax = "(max-width: 990px)";
    const breakpointMin = "(min-width: 990px)";

    const window_width = $(window).width();
    const inW = $(window).innerWidth();
    const outW = $(window).outerWidth();
    const remainingWidth = outW - inW;

    const addAttrStyleDocument = "body";

    const navFixedTop = $(".navbar-fixed-top");

    /*Aria expanded*/

    const attrAriaExpanded = (element1, element2, role) => {
        $(element1).attr("aria-expanded", role);
        $(element2).attr("aria-expanded", role);
    };

    /*Elimina atributo style generado*/

    const removeAttrStyleElement = (elementSelected) => {

        $(elementSelected).removeAttr("style");
    };

    /*Generar el espacio que ocupa 
    la barra de scroll
    */

    const addAttrStyleScrollSpacer = () => {

        $(addAttrStyleDocument).css({
            "padding-inline-end": remainingWidth
        });

        $(addAttrStyleDocument).css({
            overflow: "hidden"
        });

        $(navFixedTop).css({
            width: window_width
        });
    };

    /*
    Retorno de la barra de scroll y  
    eliminación del espacio creado
    */

    const removeAttrStyleScrollSpacer = () => {

        $(addAttrStyleDocument).css({
            "overflow": "",
            "padding-inline-end": ""
        });

        //$(addAttrStyleDocument).removeAttr("style");

        $(navFixedTop).css({
            width: ""
        });
    };

    /*Uso de tecla 'ESC'*/

    const escKey = (eventRelationship) => {

        $(document).on('keyup', function (ev) {
            if (ev.keyCode == 27) {
                $(eventRelationship).click();
            }
        });
    };

    /*
    Efecto en lineas del botón para 
    la barra de menú
    */

    $(".bttn-menu").on('click', function (ev) {
        $(this).toggleClass("bttn-menu-active");

        ev.preventDefault();
    });
    


    /*Eventos atributo "data-*/

    for(let i = 0; i < $('[data-toggle]').length; i++) {

        $('[data-toggle]')[i].addEventListener('click', function(dataAttrEvents) {

            let relate = $(this).data('relate');
            let toggle_ = $(this).data('toggle');

            if(toggle_ == "dropdown") {
                
                $(relate).fadeToggle(100);
            }

            if(toggle_ == "dropdown-mobile-slide") {

                if(window.matchMedia(breakpointMin).matches) {
                    $(relate).fadeToggle(100);
                }

                if(window.matchMedia(breakpointMax).matches) {
                    $(relate).slideToggle();
                }
            }

            if(toggle_ == "fade") {

                $(relate).fadeToggle();
            }

            if(toggle_ == "fade-in") {

                $(relate).fadeIn();
            }

            if(toggle_ == "fade-out") {

                $(relate).fadeOut();
            }

            if(toggle_ == "slide") {

                $(relate).slideToggle();
            }

            if(toggle_ == "slide-down") {

                $(relate).slideDown();
            }

            if(toggle_ == "slide-up") {

                $(relate).slideUp();
            }

            if(toggle_ == "slide-smooth") {
                $(relate).animate({
                    opacity: "toggle",
                    height: "toggle"
                });
            }

            /*Sidebar*/

            if(toggle_ == "sidebar") {

                $(relate).addClass("sidebar-show");

                $(relate).removeClass("sidebar-hidden");

                $(".backdrop").addClass("backdrop-locked");

                addAttrStyleScrollSpacer();

                attrAriaExpanded(this, relate, "true");

                $(".sidebar-close").on("click", () => {

                    $(this).removeClass("bttn-menu-active");
                    $(".backdrop").removeClass("backdrop-locked");
                    $(relate).removeClass("sidebar-show");

                    $(relate).addClass("sidebar-hidden");

                    attrAriaExpanded(this, relate, "false");

                    removeAttrStyleScrollSpacer();
                });
            };

            /*Modal*/

            if(toggle_ == "modal") {

                $(relate).show().focus();

                addAttrStyleScrollSpacer();

                $(".modal").on('click', (ev) => {
                    ev.stopPropagation();
                });

                $(".modal-close").on('click', () => {
                    $(".modal-backdrop").hide();
                    
                    removeAttrStyleScrollSpacer();
                    removeAttrStyleElement(".modal-backdrop");
                });

                escKey(".modal-close");
            };

            /*Dropdown*/

            if(toggle_ == "dropdown" || toggle_ == "dropdown-mobile-slide") {

                /*
                Evita el cierre al hacer click dentro de este.
                */

                $(".dropdown-content").on("click", (ev) => {
                    ev.stopPropagation();
                });

                /*
                Intercambio de la clase "expanded" entre los "dropdown" que abren y cierran.
                */

                $(".dropdown-toggle, .dropdown-content").not(this).removeClass("expanded");
                $(this).toggleClass("expanded");

                /*
                Si en el elemento que contiene el evento, se encuentra la clase "expanded";
                también será incluida esta al elemento relacionado con el evento.

                De esta manera nos aseguramos que ambos atributos se gestionen al realizar 
                el evento.
                */

                if($(this).hasClass("expanded")) {

                    $(relate).addClass("expanded");

                }else{

                    $(relate).removeClass("expanded");
                }

                /*
                Control de cambios entre "dropdown-toggle" distintos.
                */

                for(let i = 0 ; i < $(".dropdown-toggle").length; i++) {

                    let dToggle = $(".dropdown-toggle")[i];
        
                    if($(dToggle).hasClass("expanded")) {

                        $(dToggle).attr("aria-expanded", "true");

                    }else{

                        $(dToggle).attr("aria-expanded", "false");
                    }
                }

                /*
                Control de cambios entre "dropdown-content" distintos.
                */

                for(let i = 0 ; i < $(".dropdown-content").length; i++) {

                    let dContent = $(".dropdown-content")[i];

                    if($(dContent).hasClass("expanded")) {

                        $(dContent).attr("aria-expanded", "true");

                    }else{
                        
                        $(dContent).attr("aria-expanded", "false");
                    }
                }
            };

            dataAttrEvents.preventDefault();
        });
    }

    /*
    Cierra un menú desplegable al abrir otro.
    */

    $(".dropdown-toggle").on('click', function(ev) {

        if(!$(ev.target).closest(".dropdown-content").length) {

            if($(".dropdown-content").css('display', 'block')) {
                $(".dropdown-content").css("display", "none");
            }
        }

        $(this.getAttribute("data-relate")).show();
    });

    /*
    Cierra cualquier "dropdown" al hacer "click" en el documento.
    */

    $(window).on('click', (ev) => {

        if (!ev.target.matches(".dropdown-toggle")) {

            $(".dropdown-toggle, .dropdown-content").removeClass("expanded");
            $(".dropdown-toggle, .dropdown-content").attr("aria-expanded", "false");

            if ($(".dropdown-content") != ev.target) {

                $(".dropdown-content").hide().attr("style", "");
            }
        }
    });

    /*Controles "slider" horizontal*/

    const bttnNext = $('[data-control="next"]');
    const bttnPrev = $('[data-control="prev"]');
    const slideControl = $(".slide-control").width();

    for(let i = 0; i < bttnNext.length; i++) {

        $(bttnNext[i]).on('click', function(ev) {
            let data_id = $(this).data("relate");
            let scrollNext = $("" + data_id);

            $(scrollNext).animate({
                scrollLeft: "+=" + slideControl
            });

            $(scrollNext).scroll((ev) => {

                if($(scrollNext).scrollLeft() + $(scrollNext).innerWidth() >= $(scrollNext)[0].scrollWidth) {

                    $(bttnNext[i]).addClass("control-visibility-hidden");
                } else {
                    $(bttnNext[i]).removeClass("control-visibility-hidden");
                }

                ev.preventDefault();
            });

            ev.preventDefault();
        });
    };

    for(let i = 0; i < bttnPrev.length; i++) {

        $(bttnPrev[i]).on('click', function(ev) {
            let data_id = $(this).data("relate");
            let scrollPrev = $("" + data_id);

            $(scrollPrev).animate({
                scrollLeft: "-=" + slideControl
            });

            $(scrollPrev).scroll((ev) => {
                
                if($(scrollPrev).scrollLeft() == 0){

                    $(bttnPrev[i]).addClass("control-visibility-hidden");

                } else {

                    $(bttnPrev[i]).removeClass("control-visibility-hidden");
                }

                ev.preventDefault();
            });

            ev.preventDefault();
        });
    };

    /*Return document bottom*/

    $(window).scroll(() => { 

        if($(this).scrollTop() > 0) {
            $(".return-begin").removeClass("d-none");
        }else{
            $(".return-begin").addClass("d-none");
        }
    });

    /*Global navbar*/

    const navtop = $(".navbar-top").outerHeight();
    const navanchor = $(".navbar-anchor").outerHeight();
    const navcalc = navtop + navanchor + 20;

    $(".navbar-anchor").css("top", navtop);
    $("html").css("scroll-padding-top", navcalc);

    /*Hover*/

    $(".hover-items").on("mouseenter", function() {
        let hbg_children = $(this).children();
        let hbg_length = hbg_children.addClass("hover-item");
    });

    $(".hover-items-opacity").on('mouseenter', function(){
        let hop_children = $(this).children();
        let hop_length = hop_children.addClass("hover-opacity");
    });

    /*Placeholder para los imputs...*/

    const fplaceholder = $(".form-placeholder");

    if(fplaceholder) {

        const tdate = document.querySelector('input[type="date"]');
        const ttime = document.querySelector('input[type="time"]');
        const tweek = document.querySelector('input[type="week"]');
        const tmonth = document.querySelector('input[type="month"]');
        const tdatelocal = document.querySelector('input[type="datetime-local"]');
        const tselect = document.getElementsByTagName('select')[0];
        const tfile = document.querySelector('input[type="file"]');

        if(tfile) {
            tfile.classList.add("placeholder");

            if(tfile.hasAttribute("placeholder")) {

                tfile.addEventListener('focus', () => { 
                    tfile.classList.remove("placeholder");
                });
        
                tfile.addEventListener('blur', () => { 
                    tfile.classList.add("placeholder");
                });
            }
        }

        if(tselect) {
            
            tselect.classList.add("placeholder");

            tselect.addEventListener('focus', () => {
                tselect.classList.remove("placeholder");
            });

            tselect.addEventListener('blur', () => { 
                if(tselect.value == "0" || tselect.value == "") {
                    tselect.classList.add("placeholder");
                }
            });
        }

        if(tdate) {
            if(tdate.hasAttribute("placeholder")) {
                
                tdate.type = "text";

                tdate.addEventListener('focus', () => { 
                    tdate.type = "date";
                });
        
                tdate.addEventListener('blur', () => { 
                    tdate.type = "text";
                });
            }
        }

        if(ttime) {

            if(ttime.hasAttribute("placeholder")) {
            
                ttime.type = "text";
        
                ttime.addEventListener('focus', () => { 
                    ttime.type = "time";
                });
        
                ttime.addEventListener('blur', () => { 
                    ttime.type = "text";
                });
            }
        }

        if(tweek) {

            if(tweek.hasAttribute("placeholder")) {
            
                tweek.type = "text";
        
                tweek.addEventListener('focus', () => { 
                    tweek.type = "week";
                });
        
                tweek.addEventListener('blur', () => { 
                    tweek.type = "text";
                });
            }
        }

        if(tmonth) {

            if(tmonth.hasAttribute("placeholder")) {
            
                tmonth.type = "text";
        
                tmonth.addEventListener('focus', () => { 
                    tmonth.type = "month";
                });
        
                tmonth.addEventListener('blur', () => { 
                    tmonth.type = "text";
                });
            }
        }

        if(tdatelocal) {

            if(tdatelocal.hasAttribute("placeholder")) {
            
                tdatelocal.type = "text";
        
                tdatelocal.addEventListener('focus', () => { 
                    tdatelocal.type = "datetime-local";
                });
        
                tdatelocal.addEventListener('blur', () => { 
                    tdatelocal.type = "text";
                });
            }
        }

    };
});

