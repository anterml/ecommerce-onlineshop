const scripts = {
  yandexMetrika: "",
  bitrix24: "",
  gtag: "",
}

if (process.env.NODE_ENV === "production") {
  scripts.yandexMetrika = `
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
      ym(0, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            ecommerce:"dataLayer"
      });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/0" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->`

  scripts.gtag = `
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id="></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '');
      </script>
      <!-- /Global site tag (gtag.js) - Google Analytics -->`

  scripts.bitrix24 = `
    <!-- Bitrix widget -->
    <script>
        (function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://cdn.bitrix24.ru/b10405083/crm/site_button/loader_2_6tsy54.js');
    </script>
    <!-- /Bitrix widget -->
  `
}

export default scripts
