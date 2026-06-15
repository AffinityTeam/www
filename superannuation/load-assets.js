(function () {
  var base = document.currentScript.src.replace(/\/load-assets\.js.*$/, '/');

  if (!document.getElementById('root')) {
    var div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
  }

  fetch(base + '.vite/manifest.json')
    .then(function (r) { return r.json(); })
    .then(function (manifest) {
      var entry = manifest['index.html'];

      if (entry.css && entry.css[0]) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = base + entry.css[0];
        document.head.appendChild(link);
      }

      var script = document.createElement('script');
      script.type = 'module';
      script.src = base + entry.file;
      document.head.appendChild(script);
    });
})();
