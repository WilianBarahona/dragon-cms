# Dragon CMS
Sistema gestor de contenido

## Instalacion
Los requisitos para ejecutar dragon-cms son:

1. Node JS
2. Mongo DB

#### Instalacion de dependecias de Node js

1. Abrir una consola en la carpeta raiz dragon-cms y ejecutar el siguiente comando:

    ```
    npm i -S bcrypt-nodejs body-parser crypto express express-fileupload express-handlebars express-session media-thumbnail moment mongoose path
    ```

2. Instalar nodemon, dependecia global de Node JS:

    ```
    npm i -g nodemon
    ```
    
  

#### Iniciar la base de datos en Mongo DB

1. Abrir una consola y ejecutar el comando:

    ```
    mongo
    ```

2. Ejecutar el comando:

    ```
    use dragon
    ```
    
## Funcionalidades de dragon-cms
Las funcionalidades principales de dragon-cms son:

## Estadísticas
En esta área se podrán ver estadísticas del gestor de contenido como número de entradas,
cantidad de archivos, número de usuarios del sitio, grafica de archivos por categoría y se podrá
visualizar una guía para generar Shortcuts.

## Paginas
En esta sección se podrán crear, actualizar, eliminar y editar páginas del sitio, con la
funcionalidad de Shortcuts, entre otras opciones como permitir visualizar un encabezado y pie
de página genérico.

## Banco de archivos
En esta sección se podrán subir archivos de cualquier tipo, los cuales son categorizados según
su tipo, también se podrá actualizar, eliminar y visualizar el contenido subido en esta sección.

## Entradas/Posts
En esta sección se podrá crear bloques de contenido informativo para luego poder utilizarlo en
nuestro sitio, también incluye la funcionalidad de Shortcuts, además se podrá eliminar, actualizar
y ver una vista previa de dichos Posts.

También se podrá indicar si la entrada que se está creado permitirá comentarios, esto con el fin
de mejorar la experiencia del usuario, un ejemplo muy común es tocar un tema muy controversial
en ese caso el administrador podrá indicar no permitir comentarios.

## Gestión de comentarios
En esta sección se podrá eliminar o reportar como inapropiados comentarios realizados por otros
usuarios, con el fin de tener un mayor control de nuestro blog.

## Incrustar componentes mediante Shortcuts.
A través de estos componentes un administrador podrá incrustar diversos recursos en páginas o
Posts utilizando secuencia de caracteres especifica.
Algunos de los recursos o componentes que se podrán agregar vía Shortcuts son: 

1. Login: {tipo:'login'}
2. Galería de imágenes: {tipo:'galeria',imagenes:['56bcvb5545shjh65','56bcvb5545shjh66','56bcvb5545shjh67']}
3. Enlaces de descarga de archivos: {tipo:'enlace',id:'56bcvb5545shjh65',titulo:'Descargar archivo'}
4. Entrada: {tipo:'entrada',id:'56bcvb5545shjh44'}
5. Imagen: {tipo:'imagen', id:'56bcvb5545shjh44'}
6. Menú: {tipo:'menu',id:'56bcvb5545shjh22'}

## Gestión de usuarios
En esta sección un usuario administrador podrá actualizar, eliminar, visualizar y crear nuevos
usuarios administradores, además podrá visualizar los usuarios registrados en el sitio sin poder
editar ni eliminar dichos usuarios.
