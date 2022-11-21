# Ingenieria de software II [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Este repositorio almacena el código fuente del proyecto final propuesto para la asignatura Ingenieria de software II.

## Requisitos

Leer toda la documentación antes de iniciar cualquier proceso.

Estudiar y entender:

- [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)
- [ANTD](https://ant.design/components/overview)
- [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [Tailwind](https://tailwindcss.com/)

Tener instalado globalmente:

_Se recomienda tener instalado [homebrew](https://brew.sh/index_es) si se está usando MacOS para instalar todos los paquetes_

- [SourceTree](https://www.sourcetreeapp.com/)
- [Atom](https://atom.io/) o [Visual Studio Code](https://code.visualstudio.com)
- [nvm](https://github.com/creationix/nvm)
- [yarn](https://yarnpkg.com/lang/en/)
- [standard](https://standardjs.com/)
- [prettier](https://prettier.io/docs/en/editors.html/) y [eslint](https://eslint.org/) integrado con el editor o IDE.

## Instalación

Utilizar la ultima versión de NodeJS ESTABLE:

```sh
$ nvm use
```

Al tener la version de node indicada ejecutamos el siguiente comando, también se usa cada vez que se hace pull de la rama _dev_:

```sh
$ yarn
```

--

## Metodología

### Iniciando el desarrollo

Cada nueva funcionalidad debe iniciarse creando un branch con el formato `feature/task-code` partiendo desde el branch _dev_ y cerrando a través de un Pull Request.

### Estructura de carpetas

Esta carpeta es la encargada de contener todo el core de la aplicacion a continuacion se dara un ejemplo de como puede ser utilizada

```
- pages
- public
    - assets
- src
    - components
    - hooks
    - layouts
    - supabase
    - types
    - utils
    -redux
- styles
```

### Malas prácticas en el proyecto

- NO tener _any_ en el código a no ser que sea MUY NECESARIO (Se debera explicar porque existe ese _any_)
- NO crear commits directos en Github.com sin usar el formato descrito anteriormente
- NO escribir URLs directamente en el código
- NO subir imágenes de pruebas
- NO dejar _data_ de prueba en el código
- NO ignorar reglas de _eslint_
- NO crear _packages_ que no estén aprobados
- NO hacer _push_ sin un apropiado _.gitignore_
- NO ignorar el `yarn.lock` (A menos de que se haga por aprobación)
- NO hacer commits complejos o con demasiados archivos
- NO versionar archivos que pesen más de _10MB_
- NO usar tecnologías que no estén aprobadas
- NO instalar dependencias que no estén aprobadas, siempre solicitar una aprobación vía Slack
- NO crear _branches_ con nombres poco dicientes
- NO escribir variables tipo _foo1, foo2, banner1, banner2_ siempre usar nombres de variables claros y coherentes

### Correr el proyecto en desarrollo

```sh
npm run dev
```

### Revisar tipado

```sh
npm run build
```

### Correr test unitarios con vite [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Correr linter [ESLint](https://eslint.org/)

```sh
npm run lint
```
