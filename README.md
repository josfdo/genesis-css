# Génesis CSS
### ¿Qué ofrece el framework?

Génesis CSS ofrece mayormente la parte básica del front-end, con esto nos referimos a la parte mas técnica; es por esto
que no ofrece, diseños elaborados, ya que esta parte debe de ser aplicada por el desarrollador en función de aquello 
que lo requiera.
### ¿Para qué nivel está concebido?

Se puede decir que cualquier tipo de framework de esta índole está concebido para su uso desde una persona con un nivel 
muy básico a otra con un nivel más avanazado, pero también habría que hacer un paréntesis para pensar otros aspectos;

1. De dónde o desde dónde parte el archivo final (Haciendo referencia a CSS).
2. ¿librería JavaScript? o ¿JavaScript puro?.

En estos dos puntos hay que hacer ese paréntesis:

**Punto uno**; Para una persona que está comenzando en front-end si aun no conoce en la práctica,
pre-procesadores como LESS o SASS, que en este último (scss), es desde dónde parte GÉNESIS CSS; puede encontrarse con una barrera
en el caso de querer modificar algo e incluso adaptar los archivos a sus necesisdades, pero, si ya por ejemplo ya conoces SASS,
vas a poder comprobar a simple vista, que todo ha sido escrito desde la parte más básica, para que de este modo puedas realizar los cambios que desees 
e incluso poder practicar en lo personal, con dichos archivos.

**Punto dos**; Génesis CSS va acompañado de un archivo JavaScript y este es jQuery, que al igual que a los archivos SCSS antes mencionados
también parte el código desde la base más básica, y este mismo gestiona por ejemplo; efectos *slide* y *fade*..., (conmutar) atributos 
*aria-expanded* en las utilidades css *.dropdwon*, gestión de del bloque de menú *.sidebar* en conjunto con los efectos del botón,
gestión de la *.modal* y bloqueo del documento mediante capa trasera mientras esta esta visible... en conlusión tan solo teniendo en cuenta esto tan baśico 
ya habrás comprendido lo adaptable que te puede suponer el código de este archivo.
### Archivos o utilidades externas a Génesis CSS

Este framework utiliza dos archivos de dos autores distintos:

1. **normalize.css**; De [Nicolas Gallagher](https://github.com/necolas), es una alternativa elegida como *reset*, que del mismo no se ha modificado nada para adaptarlo al framework.

2. **rfs.scss**; De [Martijn Cuppens](https://github.com/martijncuppens), con esta utilidad se hace posible la adaptación del texto a los distintos dispositivos móviles y, también se ha utilizado para los paddings y margins para dimensiones superiores a partir de lo 50px.
### Estructura de los archivos fuente

El orden en el que vas a encontrar los archivos es el siguiente:

```
genesis-css/
├── css/
│   └── normalize.css
├── js/
│   └── genesis-jq.js
├── scss/
│    ├── mixin/      
│    |   └── mixin.scss
│    ├── utilities/      
│    |   └── (framework files).scss
│    ├── variables/      
│    |   └── variables.scss
│    └── vendor/
│        └── rfs.scss
├── genesis.css
├── genesis.css.map
└── genesis.scss
```
### Etructura de los archivos para producción

Archivos que encontrar el la seccion RELEASE o como descarga en el sitio web.

```
genesis-css/
├── css/
│   └── normalize.css
│   └── genesis.css
└── js/
    └── genesis-jq.js
```