export function render({
  headTags,
  styles,
  content,
  initialState,
  scripts,
  isAdminPath,
}) {
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="yandex-verification" content="3f10582ab673b0ca" />
    ${headTags}
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,500,700&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">

    <style>
      *, *:after, *:before {
        box-sizing: border-box;
      }

      html {
        overflow-y: scroll;
        height: 100%;
      }

      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Ubuntu, sans-serif;
        font-weight: 400;
        font-size: 0.9rem;
        line-height: 1.5em;
        color: #333;
      }
      
      a {
        text-decoration: none;
      }

      #app {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        margin: 0 auto;
      }

      svg {
        height: 100%;
        width: 100%;
      }
      
      input:focus,
      select:focus,
      textarea:focus,
      button:focus {
        outline: none;
      }
      
      button, select {
        cursor: pointer;
      }

      button, select, textarea {
        font-family: Ubuntu, sans-serif;
      }

      input::placeholder,
      textarea::placeholder {
        font-family: Ubuntu, sans-serif;
        font-size: 13px;
      }

      .container {
        max-width: 1340px;
        margin: 0 auto;
        padding: 0 15px;
      }

      @media (min-width: 768px) {
        .container {
          padding: 0 30px;
        }
      }
      
      .hidden {
        display: none !important;
      }
      
    </style>
    ${styles}
  </head>
  <body itemscope itemtype="http://schema.org/WebPage">
    ${svg}
    <div id="app">${content}</div>
    <script>
      SC_DISABLE_SPEEDY = true
      window.dataLayer = window.dataLayer || [];
      window.__INITIAL_STATE__ = ${initialState}
    </script>
    ${scripts}
    <script src="/${outputFolder}/${
    isAdminPath ? "admin-main.js" : "main.js"
  }"></script>
    <script src="/${outputFolder}/chunks/${
    isAdminPath ? "admin" : "client"
  }/bootstrap.js"></script>
  </body>
  </html>
`
}

export function renderHTML500() {
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="yandex-verification" content="3f10582ab673b0ca" /> 
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,500,700&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">

    <title>Произошла ошибка</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Ubuntu, sans-serif;
        font-weight: 400;
        font-size: 0.9rem;
        line-height: 1.5em;
        color: #333;
      }
      
      .error {
        margin-top: 100px;
        font-size: 30px;
        font-weight: 500;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="error">
      Извините, произошла ошибка.
    </div>
  </body>
  </html>
`
}

export function renderTestPageForYandexWebvisor() {
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="yandex-verification" content="3f10582ab673b0ca" />
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,500,700&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">
    <script>
      window.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelector('.tabs')
        const tabItems = document.querySelectorAll('.tabs-item')
        const contentItems = document.querySelectorAll('.content-item')
  
        if(!tabs || !tabItems || !contentItems)
          return
        
        tabs.addEventListener('click', (e) => {
          const index = Number(e.target.dataset.i)
          for(let i = 0; i < tabItems.length; ++i) {
            const elem = tabItems[i]
            if(elem === e.target)
              elem.classList.add('active')
            else if(elem.classList.contains('active'))
              elem.classList.remove('active')
              
              console.log(i, index)
            if(i === index)
              contentItems[i].classList.remove('hidden')
            else
              contentItems[i].classList.add('hidden')
          }
        })
  
      })
  
    </script>
    <style>
      *, *:after, *:before {
        box-sizing: border-box;
      }
  
      html {
        overflow-y: scroll;
        height: 100%;
      }
  
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Ubuntu, sans-serif;
        font-weight: 400;
        font-size: 0.9rem;
        line-height: 1.5em;
        color: #333;
      }
  
      .container {
        max-width: 1340px;
        margin: 0 auto;
      }
  
      .tabs {
        background-color: #ececec;
        border-bottom: 1px solid #ccc;
      }
      
      .tabs-item {
        padding: 15px;
        color: green;
        display: inline-block;
      }
  
      .tabs-item:not(.active):hover  {
        cursor: pointer;
        background-color: #ddd;
      }
  
      a {
        color: red;
        text-decoration: none;
      }
  
      a:hover {
        color: blue;
      }
  
      .hidden {
        display: none !important;
      }
      
      .content {
        padding: 20px 5px;
      }
      
      .active {
        background-color: orange;
      }
      
      .tab-content {
        padding: 20px;
      }
    </style>
  </head>
  <body>
      <div class="tabs container">
        <span class="tabs-item active" data-i="0">Item 1</span>
        <span class="tabs-item" data-i="1">Item 2</span>
        <span class="tabs-item" data-i="2">Item 3</span>
      </div>
      <div class="tab-content container">
        <div class="content-item">content item1</div>
        <div class="content-item hidden">content item2</div>
        <div class="content-item hidden">content item3</div>
      </div>
      <div class="content container">
        <h2>Страница для тестирования вебвизора</h2>
        <div class="hidden">hidden text</div>
        <a href="/">Главная страница</a>
        <div>Просто случайный текст</div>
      </div>
      <script>
        window.dataLayer = window.dataLayer || [];
      </script>
      ${externalScripts.yandexMetrika}
  </body>
  </html>
  `
}
