## Установка
* установите [NodeJS](https://nodejs.org/en/) (если требуется) и [Yarn](https://yarnpkg.com/en/docs/install)
* установите ```gulp``` глобально: ```yarn global add gulp-cli```
* установите ```bem-tools-core``` глобально: ```yarn global add bem-tools-core```
* перейдите в скачанную папку со сборкой
* скачайте необходимые зависимости: ```yarn```
* чтобы начать работу, введите команду: ```yarn run dev``` (режим разработки)
* чтобы собрать проект, введите команду ```yarn run build``` (режим сборки)

## Файловая структура

```
gulp-starter
├── dist
├── gulp-tasks
├── src
│   ├── blocks
│   ├── fonts
│   ├── img
│   ├── js
│   ├── styles
│   ├── views
├── gulpfile.babel.js
├── webpack.config.js
├── package.json
├── .babelrc.js
├── .bemrc.js
├── .eslintrc.json
├── .stylelintrc
├── .stylelintignore
└── .gitignore
```

* Корень папки:
    * ```.babelrc.js``` — настройки Babel
    * ```.bemrc.js``` — настройки БЭМ
    * ```.eslintrc.json``` — настройки ESLint
    * ```.stylelintrc``` — настройки Stylelint
    * ```.stylelintignore``` – запрет на отслеживание файлов Stylelint'ом
    * ```gulpfile.babel.js``` — настройки Gulp
    * ```webpack.config.js``` — настройки Webpack
    * ```package.json``` — список зависимостей
* Папка ```src``` - используется во время разработки:
    * БЭМ-блоки: ```src/blocks```
    * шрифты: ```src/fonts```
    * изображения: ```src/img```
    * JS-файлы: ```src/js```
    * страницы сайта: ```src/views/pages```
    * CSS-файлы: ```src/styles```
    * HTML-файлы: ```src/views```

* Папка ```dist``` - папка, из которой запускается локальный сервер для разработки (при запуске ```yarn start```)
* Папка ```gulp-tasks``` - папка с Gulp-тасками

## Команды
* ```yarn start``` - запуск сервера для разработки проекта
* ```yarn build``` - собрать проект с оптимизацией без запуска сервера
  
* ```yarn run lint:styles``` - проверить CSS-файлы. Для VSCode необходимо установить [плагин](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint). Для WebStorm
или PHPStorm необходимо включить Stylelint в ```Languages & Frameworks - Style Sheets - Stylelint``` (ошибки будут исправлены автоматически при сохранении файла)
* ```yarn run lint:styles --fix``` - исправить ошибки в CSS-файлах
* ```yarn run lint:scripts``` - проверить JS-файлы
* ```yarn run lint:scripts --fix``` - исправить ошибки в JS-файлах
* ```yarn run build:views``` - собрать HTML-файлы
* ```yarn run build:styles``` - скомпилировать CSS-файлы
* ```yarn run build:scripts``` - собрать JS-файлы
* ```yarn run build:images``` - собрать изображения
* ```yarn run build:sprites```- собрать спрайты
* ```yarn run build:fonts``` - собрать шрифты
* ```yarn run build:favicons``` - собрать фавиконки

## Рекомендации по использованию
### HTML
*  используется [gulp-include](https://www.npmjs.com/package/gulp-file-include)
* для импорта блока в HTML файл ```@@include("../blocks/modules/footer/footer.html")```

### CSS
* для импорта используется postcss-import ```@import "../blocks/modules/footer/footer.css";```

### Компонентный подход к разработке сайтов
* каждый БЭМ-блок имеет свою папку внутри ```src/blocks/modules```
* папка одного БЭМ-блока содержит в себе один HTML-файл, один CSS-файл и один JS-файл (если у блока используется скрипт)
    * HTML-файл блока импортируется в файл ```src/views/index.html``` (или в необходимый файл страницы, откуда будет вызываться блок)
    * CSS-файл блока импортируется в файл ```src/blocks/modules/modules.css```
    * JS-файл блока импортируется в ```src/js/import/modules.js```

Пример структуры папки с БЭМ-блоком:
```
blocks
├── modules
│   ├──header
│   │   ├── header.html
│   │   ├── header.js
│   │   ├── header.css
```
Чтобы вручную не создавать соответствующие папку и файлы, достаточно в консоли прописать команду ```bem create my-block``` - для создания папки БЭМ-блока, где ```my-block``` - имя БЭМ-блока

### Страницы проекта
* страницы проекта находятся в папке ```src/views/pages```
    * главная страница: ```src/views/index.html```

### Шрифты
* шрифты находятся в папке ```src/fonts```
    * используйте [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```src/styles/base/fonts.css```
    * сконвертировать локальные шрифты можно с помощью [данного сервиса](https://onlinefontconverter.com/)

### Изображения
* изображения находятся в папке ```src/img```
    * изображение для генерации фавиконок должно находиться в папке ```src/img/favicon``` и иметь размер не менее ```1024px x 1024px```
  
### Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
    * для их загрузки воспользуйтеcь командой ```yarn add package_name```
    * для подключения JS-файлов библиотек импортируйте их в самом начале JS-файла БЭМ-блока (то есть тот БЭМ-блок, который использует скрипт), например:
    ```javascript
    import $ from "jquery";
    ```
    * для подключения стилевых файлов библиотек импортируйте их в файл ```src/styles/vendor/libs.css```
    * JS-файлы и стилевые файлы библиотек самостоятельно изменять нельзя

:warning: Если в вашем проекте используется несколько библиотек, которые необходимо подключать на нескольких страницах, во избежании ошибок нужно:
* по пути ```src/js/import``` создать папку ```pages```
* в папке ```pages``` создать js-файл для страницы, например, ```pageA.js```, и импортировать туда библиотеку, которая будет использоваться только на этой странице
    * аналогично проделать шаг для дополнительных страниц
* в файле ```webpack.config.js``` в точку входа добавить js-файлы страниц, пример:
```javascript
entry: {
    main: "./src/js/index.js",
    pageA: "./src/js/import/pages/pageA.js",
    pageB: "./src/js/import/pages/pageB.js"
}
```
* подключить скомпилированные js-файлы на необходимых страницах

## (1.1.0v) Release note
* Убрал редко используемые правила в stylelint
* Обновил и удалил неиспользуемые зависимости
* Добавил @babel/plugin-proposal-class-properties
* Убрал генерацию критического CSS
* Облегчил код для обнаружения поддержки avif
* Упростил структуру папки styles
* Добавил Jest для покрытия кода тестами
* Удалил устаревшие директивы для добавления фавиконок

## (1.0.1v) Release note
* Генерация критического [CSS](https://web.dev/extract-critical-css/) ,и асинхронная загрузка основного файла [стилей](https://www.filamentgroup.com/lab/load-css-simpler/)
* Скрипт для поддержки нового формата AVIF. Progressive enhancement для Chrome 85+. 
``` .avif .block {background-image: url(img.avif);}```
* Полифил  [focus-visible](https://github.com/WICG/focus-visible) для улучшения доступности. Настраивается в ```src\styles\base\general.css```
* Шаблон под дизайн систему (типография)```src\styles\design-system\typography.css```
* Валидация и другие фукнции для работы с элементами форм
```src\js\utils\form-utils.js```

