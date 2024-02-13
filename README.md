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
preprocesadores como LESS o SASS, que en este último (scss), es desde dónde parte GÉNESIS CSS; puede encontrarse con una barrera
en el caso de querer modificar algo e incluso adaptar los archivos a sus necesisdades, pero, si ya por ejemplo conoces SASS,
vas a poder comprobar a simple vista, que todo ha sido escrito con una visión muy básica, para que de este modo puedas realizar los cambios que desees 
e incluso poder practicar en lo personal, con dichos archivos.

**Punto dos**; Génesis CSS va acompañado de un archivo JavaScript y este basado en jQuery, que al igual que a los archivos SCSS antes mencionados
este también está ideado con lo básico, ¿qué "gestionará" este archivo JS?, por ejemplo; efectos *slide* y *fade*..., (conmutar) atributos 
*aria-expanded* para las utilidades css *.dropdown*, gestión del bloque de menú *.sidebar* en conjunto con los efectos del botón y bloqueo de documento,
gestión de la *.modal* y bloqueo del documento mediante capa trasera mientras esta, está visible... en conlusión; solo teniendo en cuenta esto, tan básico 
ya habrás comprendido lo adaptable que te puede suponer el código de este archivo.
### Archivos o utilidades externas a Génesis CSS

Este framework utiliza dos archivos de distinto autor:

1. **normalize.css**; De [Nicolas Gallagher](https://github.com/necolas), es una alternativa elegida como *reset*, que del mismo no se ha modificado nada para adaptarlo al framework.

2. **rfs.scss**; De [Martijn Cuppens](https://github.com/martijncuppens), esta utilidad hace posible la adaptación del texto a los distintos dispositivos móviles y, también se ha utilizado para los paddings y margins en dimensiones superiores a partir de los 50px.
### - Estructura de los archivos fuente

El orden en el que vas a encontrar los archivos es el siguiente:

```
genesis-css/
├── css/
|   └── genesis.css
│   └── normalize.css
├── js/
│   └── genesis.js
├── scss/
│    ├── mixin/      
│    |   └── mixin.scss
│    ├── utilities/      
│    |   └── (framework files).scss
│    ├── variables/      
│    |   └── variables.scss
│    └── vendor/
│        └── rfs.scss
└── genesis.scss
```
### - Estructura de los archivos para producción

Archivos como descarga principal que se encuentra en el website.

```
genesis-css/
├── css/
│   └── normalize.css
│   └── genesis.css
└── js/
    └── genesis.js
    └── jquery-3.6.0.js
```