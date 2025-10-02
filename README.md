# TyrisTechnicalTest

## Requisitos
- Angular CLI 10.x
- Node >= 12 (recomendado entre 12.x y 14.x)
- npm >= 6.9

## Pasos a seguir
1. Clonar el repositorio con `git clone xxxx`
2. Instalar las librerías necesarias con `npm install`
3. Usar `ng serve -o` para desplegar en http://localhost:4200 o usar `ng build --prod` para generar el proyecto compilado en el directorio dist/tyris-technical-test

## Compatibilidad con navegadores antiguos
- No se usa flexbox en CSS
- Se usan propiedades de ES6 como const, let y funciones flechas, pero se traspila a ES5

### Traspilación a ES5
- En el archivo .browserslistrc se ha habilitado como navegador compatible IE11
- En el archivo tsconfig.json se ha puesto como target es5
