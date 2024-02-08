$(document).ready(function () {

    /*Valores obtenidos de la variable "root" de CSS*/
    const valuePhoneScreen = getComputedStyle(document.documentElement).getPropertyValue('--pho');
    const valuePhabletScreen = getComputedStyle(document.documentElement).getPropertyValue('--pha');
    const valueTabletScreen = getComputedStyle(document.documentElement).getPropertyValue('--tab');
    const valueLaptopScreen = getComputedStyle(document.documentElement).getPropertyValue('--lap');
    const valueDesktopScreen = getComputedStyle(document.documentElement).getPropertyValue('--des');

    /*Puntos de corte*/
    const breakpointPhoneMax = `(max-width: ${valuePhoneScreen})`;
    const breakpointPhabletMax = `(max-width: ${valuePhabletScreen})`;
    const breakpointTabletMax = `(max-width: ${valueTabletScreen})`;
    const breakpointTabletMin = `(min-width: ${valueTabletScreen})`;
    const breakpointLaptopMax = `(max-width: ${valueLaptopScreen})`;
    //console.info(`Info puntos de corte: Phone ${valuePhoneScreen} - Phablet ${valuePhabletScreen} - Tablet ${valueTabletScreen} - Laptop ${valueLaptopScreen} - Desktop ${valueDesktopScreen}.`);

    /*Ancho de ventana*/
    const window_width = $(window).width();
    const inW = $(window).innerWidth();
    const outW = $(window).outerWidth();
    const remainingWidth = outW - inW;

    const addAttrStyleDocument = "body";
    const navFixedTop = $(".navbar-fixed-top");

    /*Atributo aria expanded (sidebar)*/
    const attrAriaExpanded = (firstElement, secondElement, role) => {
        $(firstElement).attr("aria-expanded", role);
        $(secondElement).attr("aria-expanded", role);
    };

    /*Atributo aria expanded en dropdown*/
    function updateAttrAriaExpanded(element, className) {

        let u = 0;
        while(u < $(element).length) {
            const isExpanded = $(element).eq(u).hasClass(className);
            $(element).eq(u).attr("aria-expanded", isExpanded ? "true" : "false");
            u++;
        }
    }

    /*Variables en uso para controlar el atributo aria-expanded*/
    const dropdownToggleClass = ".dropdown-toggle, .dropdown-content";
    const dropdownSubmenuClass = ".dropdown-toggle-submenu, .submenu-content";
    const dropdownContentsClass = ".dropdown-content, .submenu-content";
    const dropdownClass = `${dropdownToggleClass}, ${dropdownSubmenuClass}`;

    /*Elimina el atributo "style" generado*/
    const removeAttrStyleElement = (elementSelected) => {

        $(elementSelected).removeAttr("style");
    };

    // Generar el espacio que ocupa la barra de scroll; por ejemplo en Google Chrome.
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

    // Retorno de la barra de scroll y eliminación del espacio creado
    const removeAttrStyleScrollSpacer = () => {

        $(addAttrStyleDocument).css({
            "overflow": "",
            "padding-inline-end": ""
        });

        $(navFixedTop).css({
            width: ""
        });
    };

    /* Cierre de elementos con la tecla 'ESC' */
    const escKey = (eventRelationship) => {

        $(document).on('keyup', function (ev) {
            if (ev.keyCode == 27) {
                $(eventRelationship).click();
            }
        });
    };

    /*Efecto en lineas del botón para la barra de menú*/
    $(".bttn-menu").on('click', function (ev) {
        $(this).toggleClass("bttn-menu-active");

        ev.preventDefault();
    });

    /*Activación de los botones en grupo*/
    const evBttnGroup = $(".bttn-action");

    $(evBttnGroup).on('click', function (ev) {

        evBttnGroup.removeClass('active');
        $(this).addClass('active');

        ev.preventDefault();
    });

    /*Desplegable (dropdown)*/
    const dataDropdown = $('[data-gs-dropdown]');

    for(let i = 0; i < dataDropdown.length; i++) {
        dataDropdown[i].addEventListener("click", function(e){
            let animationData = $(this).data("gs-dropdown");
            let targetValue = $(this).data("gs-target");

            const handleDorpdownToggle = (elements) => {

                // Intercambio de la clase "expanded" entre los "dropdown" que abren y cierran.
                $(elements).not(this).removeClass("expanded");
                $(this).toggleClass("expanded");
        
                // Si el elemento que contiene el evento, se encuentra la clase "expanded";
                // también será incluida esta al elemento relacionado con el evento.
                // De esta manera nos aseguramos que ambos atributos se gestionen al realizar el evento.
                $(targetValue).toggleClass("expanded", $(this).hasClass("expanded"));
        
                // aria-expanded: Control de cambios de "true" a "false" y viceversa.
                updateAttrAriaExpanded(elements, "expanded");
            }
        
            if(animationData === "dropdown") {
                $(targetValue).fadeToggle(100);
            } else if (animationData === "dropdown-mobile-slide") {
                if (window.matchMedia(breakpointTabletMin).matches) {
                    $(targetValue).fadeToggle(100);
                }
                if (window.matchMedia(breakpointTabletMax).matches) {
                    $(targetValue).slideToggle();
                }
            } else if (animationData === "slide") {
                $(targetValue).slideToggle();
            } else if (animationData === "slide-smooth") {
                $(targetValue).animate({
                    opacity: "toggle",
                    height: "toggle"
                });
            }

            // Evita el cierre al hacer click dentro de un elemento ".dropdown-content".
            $(".dropdown-content").on("click", (e) => {
                e.stopPropagation();
            });

            if($(this).hasClass("dropdown-toggle")) {
                handleDorpdownToggle(dropdownToggleClass);
            }
            if($(this).hasClass("dropdown-toggle-submenu")) {
                handleDorpdownToggle(dropdownSubmenuClass);
            }

            e.preventDefault();
        });
    }

    /*Control de apertura y cierre de elementos dropdown*/
    $(".dropdown-toggle").on('click', function(e) {
        if (!$(e.target).closest($(dropdownContentsClass)).length) {
            if ($(dropdownContentsClass).css('display', 'block')) {
                $(dropdownContentsClass).hide();
            }
            if($(dropdownSubmenuClass).attr("aria-expanded") === "true") {
                $(dropdownSubmenuClass).removeClass("expanded").attr("aria-expanded", "false");
            }
        }

        $(this.getAttribute("data-gs-target")).show();
    });

    //Cierra cualquier "dropdown" al hacer "click" en el documento.
    $(window).on('click', (e) => {
        if (!e.target.closest(dropdownToggleClass)) {
            $(dropdownClass).removeClass("expanded").attr("aria-expanded", "false");
            if (!$(dropdownContentsClass).is(e.target)) {
                $(dropdownContentsClass).hide();
            }
        }
    });

    /*Controles "slider" horizontal*/
    const bttnNext = $('[data-gs-control="next"]');
    const bttnPrev = $('[data-gs-control="prev"]');
    const slideControl = $(".slide-control").width();

    for (let i = 0; i < bttnNext.length; i++) {

        $(bttnNext[i]).on('click', function (ev) {
            const targetValue = $(this).data("gs-target");
            const scrollNext = $("" + targetValue);

            $(scrollNext).animate({
                scrollLeft: "+=" + slideControl
            });

            $(scrollNext).scroll((ev) => {

                if ($(scrollNext).scrollLeft() + $(scrollNext).innerWidth() >= $(scrollNext)[0].scrollWidth) {
                    $(bttnNext[i]).addClass("control-visibility-hidden");
                } else {
                    $(bttnNext[i]).removeClass("control-visibility-hidden");
                }

                ev.preventDefault();
            });

            ev.preventDefault();
        });
    };

    for (let i = 0; i < bttnPrev.length; i++) {

        $(bttnPrev[i]).on('click', function (ev) {
            const targetValue = $(this).data("gs-target");
            const scrollPrev = $("" + targetValue);

            $(scrollPrev).animate({
                scrollLeft: "-=" + slideControl
            });

            $(scrollPrev).scroll((ev) => {

                if ($(scrollPrev).scrollLeft() == 0) {
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

        if ($(this).scrollTop() > 0) {
            $(".return-begin").removeClass("d-none");
        } else {
            $(".return-begin").addClass("d-none");
        }
    });

    /*Barra de navegación principal*/
    const navtop = $(".navbar-top").outerHeight();
    const navanchor = $(".navbar-anchor").outerHeight();
    const navcalc = navtop + navanchor + 20;

    $(".navbar-anchor").css("top", navtop);
    $("html").css("scroll-padding-top", navcalc);

    /*Placeholder para los imputs...*/
    const formPlaceholder = $(".form-placeholder");

    if (formPlaceholder) {

        const typeDate = document.querySelector('input[type="date"]');
        const typeTime = document.querySelector('input[type="time"]');
        const typeWeek = document.querySelector('input[type="week"]');
        const typeMonth = document.querySelector('input[type="month"]');
        const typeDatelocal = document.querySelector('input[type="datetime-local"]');
        const typeSelect = document.getElementsByTagName('select')[0];
        const typeFile = document.querySelector('input[type="file"]');

        if (typeFile) {
            typeFile.classList.add("placeholder");

            if (typeFile.hasAttribute("placeholder")) {

                typeFile.addEventListener('focus', () => {
                    typeFile.classList.remove("placeholder");
                });

                typeFile.addEventListener('blur', () => {
                    typeFile.classList.add("placeholder");
                });
            }
        }

        if (typeSelect) {

            typeSelect.classList.add("placeholder");

            typeSelect.addEventListener('focus', () => {
                typeSelect.classList.remove("placeholder");
            });

            typeSelect.addEventListener('blur', () => {
                if (typeSelect.value == "0" || typeSelect.value == "") {
                    typeSelect.classList.add("placeholder");
                }
            });
        }

        if (typeDate) {
            if (typeDate.hasAttribute("placeholder")) {

                typeDate.type = "text";

                typeDate.addEventListener('focus', () => {
                    typeDate.type = "date";
                });

                typeDate.addEventListener('blur', () => {
                    typeDate.type = "text";
                });
            }
        }

        if (typeTime) {

            if (typeTime.hasAttribute("placeholder")) {

                typeTime.type = "text";

                typeTime.addEventListener('focus', () => {
                    typeTime.type = "time";
                });

                typeTime.addEventListener('blur', () => {
                    typeTime.type = "text";
                });
            }
        }

        if (typeWeek) {

            if (typeWeek.hasAttribute("placeholder")) {

                typeWeek.type = "text";

                typeWeek.addEventListener('focus', () => {
                    typeWeek.type = "week";
                });

                typeWeek.addEventListener('blur', () => {
                    typeWeek.type = "text";
                });
            }
        }

        if (typeMonth) {

            if (typeMonth.hasAttribute("placeholder")) {

                typeMonth.type = "text";

                typeMonth.addEventListener('focus', () => {
                    typeMonth.type = "month";
                });

                typeMonth.addEventListener('blur', () => {
                    typeMonth.type = "text";
                });
            }
        }

        if (typeDatelocal) {

            if (typeDatelocal.hasAttribute("placeholder")) {

                typeDatelocal.type = "text";

                typeDatelocal.addEventListener('focus', () => {
                    typeDatelocal.type = "datetime-local";
                });

                typeDatelocal.addEventListener('blur', () => {
                    typeDatelocal.type = "text";
                });
            }
        }
    };

    /*Puntos de corte para grupo de botones (alineados)*/
    $(window).on("resize", function () {

        let lap_bGroup = $(".lap-button-group-column");
        let tab_bGroup = $(".tab-button-group-column");
        let pha_bGroup = $(".pha-button-group-column");
        let pho_bGroup = $(".pho-button-group-column");

        if (window.matchMedia(breakpointLaptopMax).matches) {
            lap_bGroup.addClass("button-group-column");
            lap_bGroup.removeClass("button-group-row");
        } else {
            lap_bGroup.removeClass("button-group-column");
            lap_bGroup.addClass("button-group-row");
        }
        if (window.matchMedia(breakpointTabletMax).matches) {
            tab_bGroup.addClass("button-group-column");
            tab_bGroup.removeClass("button-group-row");
        } else {
            tab_bGroup.removeClass("button-group-column");
            tab_bGroup.addClass("button-group-row");
        }
        if (window.matchMedia(breakpointPhabletMax).matches) {
            pha_bGroup.addClass("button-group-column");
            pha_bGroup.removeClass("button-group-row");
        } else {
            pha_bGroup.removeClass("button-group-column");
            pha_bGroup.addClass("button-group-row");
        }
        if (window.matchMedia(breakpointPhoneMax).matches) {
            pho_bGroup.addClass("button-group-column");
            pho_bGroup.removeClass("button-group-row");
        } else {
            pho_bGroup.removeClass("button-group-column");
            pho_bGroup.addClass("button-group-row");
        }
    });

    /*setTimeout en animaciones*/
    function animateElement(element, animationType) {
        let seconds = $(element).data("genesis").replace(`${animationType}-`, "") * 1000;

        setTimeout(function() {

            if (animationType === 'slide-up') {
                $(element).slideUp(800).css({
                    opacity: 0,
                    transition: 'opacity .3s'
                });
            } 
            if (animationType === 'fade-out') {
                $(element).fadeOut(800);
            }

        }, seconds);

        console.info(`Animación: ${animationType}-${seconds} (milisegundos).`);
    }
    
    $("[data-genesis^='slide-up-']").each(function() {
        animateElement($(this), 'slide-up');
    });
    
    $("[data-genesis^='fade-out-']").each(function() {
        animateElement($(this), 'fade-out');
    });

    /*Ventana modal*/
    $(".open-modal").each(function(){
        $(this).on("click", function(e){
            const targetValue = $(this).data("gs-target");
            const modalElement = document.getElementById(targetValue.substring(1));
            const messageError = `Modal: elemento con ID "${targetValue.substring(1)}" no encontrado.`;

            if(modalElement) {
                $(targetValue).show().focus();
                addAttrStyleScrollSpacer();

                $(".modal").on('click', (e) => {
                    e.stopPropagation();
                });

            } else {
                console.error(messageError);
            }

            $(".close-modal").on('click', () => {

                $(".modal-backdrop").hide();
                removeAttrStyleScrollSpacer();
                removeAttrStyleElement(".modal-backdrop");
            });

            escKey(".close-modal");
            
            e.preventDefault();
        });
    });

    /*Modal etiqueta "dialog")*/
    $(".open-dialog").each(function() {
        $(this).on("click", function(e){
            const targetValue = $(this).data("gs-target");
            const dialogElement = document.getElementById(targetValue.substring(1));
            const messageError = `Etiqueta <dialog>: elemento con ID "${targetValue.substring(1)}" no encontrado.`;

            if(dialogElement) {
                dialogElement.showModal();
                addAttrStyleScrollSpacer();
            } else {
                console.error(messageError);
            }

            $(".close-dialog").on('click', () => {
                dialogElement.close();
                removeAttrStyleScrollSpacer();
            });

            e.preventDefault();
        });
    }); 

    /*Menú de navegación lateral*/
    $(".open-sidebar").each(function(){
        $(this).on("click", function(e){
            const targetValue = $(this).data("gs-target");
            const sidebarElement = document.getElementById(targetValue.substring(1));
            const messageError = `Sidebar: elemento con ID "${targetValue.substring(1)}" no encontrado.`;

            if(sidebarElement) {
                $(targetValue).addClass("sidebar-show");
                $(targetValue).removeClass("sidebar-hidden");
                $(".backdrop").addClass("backdrop-locked");
    
                addAttrStyleScrollSpacer();
                attrAriaExpanded(this, targetValue, "true");
    
                $(".close-sidebar").on("click", () => {
    
                    $(this).removeClass("bttn-menu-active");
                    $(".backdrop").removeClass("backdrop-locked");
                    $(targetValue).removeClass("sidebar-show");
    
                    $(targetValue).addClass("sidebar-hidden");
                    attrAriaExpanded(this, targetValue, "false");
                    removeAttrStyleScrollSpacer();
                });
            } else {
                console.error(messageError);
            }

            e.preventDefault();
        });
    });

    /*Metodos jQuery*/
    const dataGenesisElements = $("[data-genesis]");

    for(let i = 0; i < dataGenesisElements.length; i++) {
        dataGenesisElements[i].addEventListener("click", function(e){
            const animationDataGenesis = $(this).data("genesis"); 
            const targetValue = $(this).data("gs-target");
            const targetElement = document.getElementById(targetValue.substring(1));
            const messageError = `Elemento con ID "${targetValue.substring(1)}" no encontrado.`;

            if(targetElement) {
                switch(animationDataGenesis) {
                    case "fade-toggle":
                        $(targetValue).fadeToggle();
                        break;
                    case "fade-out":
                        $(targetValue).fadeOut();
                        break;
                    case "fade-in":
                        $(targetValue).fadeIn();
                        break;
                    case "slide-toggle":
                        $(targetValue).slideToggle();
                        break;
                    case "slide-smooth":
                        $(targetValue).animate({
                            opacity: "toggle",
                            height: "toggle"
                        });
                        break;
                    case "slide-up":
                        $(targetValue).slideUp(800)
                        .css({
                            opacity: 0,
                            transition: 'opacity .3s'
                        });
                        break;
                    case "slide-down":
                        $(targetValue).slideDown("slow");
                        break; 
                    default:
                        console.warn(`La animación "${animationDataGenesis}" no existe.`);
                }
            } else {
                console.error(messageError);
            }

            e.preventDefault();
        });
    }
});

