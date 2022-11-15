<style>
    h3 {
        color: #3f4e5a !important;
        font-weight: 300 !important;
    }

    p {
        opacity: .7;
    }

    .container-code {
        padding: 1.5rem !important; 
        border: 1px solid #b7c2cc !important; 
        background-color: #f6f7fa !important;
    }

</style>

# Génesis CSS

<h3>¿Qué ofrece el framework?</h3>

<p>
Génesis CSS ofrece mayormente la parte básica del front-end, con esto nos referimos a la parte mas técnica; es por esto
que no ofrece, diseños elaborados, ya que esta parte debe de ser aplicada por el desarrollador en función de aquello 
que lo requiera.
</p>

<h3>¿Para qué nivel está concebido?</h3>

<p>
Se puede decir que cualquier tipo de framework de esta índole está concebido para su uso desde una persona con un nivel 
muy básico a otra con un nivel más avanazado, pero también habría que hacer un paréntesis para pensar otros aspectos;
</p>
<p>
1. De dónde o desde dónde parte el archivo final (Haciendo referencia a CSS).
2. ¿librería JavaScript? o ¿JavaScript puro?.
</p>

<p>En estos dos puntos hay que hacer ese paréntesis:</p>

<p>
<strong>Punto uno</strong>; Para una persona que está comenzando en front-end si aun no conoce en la práctica,
pre-procesadores como LESS o SASS, que en este último (scss), es desde dónde parte GÉNESIS CSS; puede encontrarse con una barrera
en el caso de querer modificar algo e incluso adaptar los archivos a sus necesisdades, pero, si ya por ejemplo ya conoces SASS,
vas a poder comprobar a simple vista, que todo ha sido escrito desde la parte más básica, para que de este modo puedas realizar los cambios que desees 
e incluso poder practicar en lo personal, con dichos archivos.
</p>
<p>
<strong>Punto dos</strong>; Génesis CSS va acompañado de un archivo JavaScript y este es jQuery, que al igual que a los archivos SCSS antes mencionados
también parte el código desde la base más básica, y este mismo gestiona por ejemplo; efectos <em>slide</em> y <em>fade</em>..., (conmutar) atributos 
<em>aria-expanded</em> en las utilidades css <em>.dropdwon</em>, gestión de del bloque de menú <em>.sidebar</em> en conjunto con los efectos del botón,
gestión de la <em>.modal</em> y bloqueo del documento mediante capa trasera mientras esta esta visible... en conlusión tan solo teniendo en cuenta esto tan baśico 
ya habrás comprendido lo adaptable que te puede suponer el código de este archivo.
</p>

<h3>Archivos o utilidades externas a Génesis CSS</h3>

<p>Este framework utiliza dos archivos de dos autores distintos:</p>

<p>
1. <strong>normalize.css</strong>; De <a href="https://github.com/necolas">(Nicolas Gallagher)</a>, es una alternativa elegida como <em>reset</em>, que del mismo no se ha modificado nada para adaptarlo al framework.

2. <strong>rfs.scss</strong>; de De <a href="https://github.com/martijncuppens">(Martijn Cuppens)</a>, con esta utilidad se hace posible la adaptación del texto a los distintos dispositivos móviles y, también se ha utilizado para los paddings y margins para dimensiones superiores a partir de lo 50px.
</p>

<h3>Estructura de los archivos fuente</h3>

<p>El orden en el que vas a encontrar los archivos es el siguiente:</p>

<pre class="container-code">
<code>
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
</code>
</pre>

<h3>Estructura de los archivos para producción</h3>

<p>Archivos que encontrar el la seccion RELEASE o como descarga en el sitio web.</p>

<pre class="container-code">
<code>
genesis-css/
├── css/
│   └── normalize.css
│   └── genesis.css
└── js/
    └── genesis-jq.js
</code>
</pre>