# TyrisTechnicalTest

## Requisitos
- Angular CLI 10.x
- Node >= 12 (recomendado entre 12.x y 14.x)
- npm >= 6.9

## Pasos a seguir
1. Clonar el repositorio con `git clone https://github.com/jmreja27/tyris-technical-test.git`
2. Instalar las librerías necesarias con `npm install`
3. Usar `ng serve -o` para desplegar en http://localhost:4200 o usar `ng build --prod` o `ng build` para generar el proyecto compilado en el directorio dist/tyris-technical-test

## Compatibilidad con navegadores antiguos
- No se usa flexbox en CSS
- Se usan propiedades de ES6 como const, let y funciones flechas, pero se traspila a ES5

### Traspilación a ES5
- En el archivo .browserslistrc se ha habilitado como navegador compatible IE11
- En el archivo tsconfig.json se ha puesto como target es5

## Control de errores
- Se ha añadido una página de error en el caso de que se acceda una ruta no contemplada. Se puede ver en el app.routing.module.ts
- Se ha utilizado catchError en el archivo movie.service.st para controlar errores en caso de que la api de error
- Para validar los datos, se comprueba que vengan los campos correctos en la respuesta. En todos los casos se muestra un texto por defecto a excepción de la imagen que se muestra el texto alternativo
- En el componente movie-grid se controla que, en caso de que el navigate falle, el usuario siga en la pantalla inicial para evitar crasheos de la aplicación
- En el componente movie-grid se muestra en pantalla un mensaje de error en caso de que la API falle
- En el componente movie-detail se muestra en pantalla un mensaje de error en caso de que no exista la película con el nombre dado
