document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

var el = document.querySelector('.tabs');
var instance = M.Tabs.init(el, {});
instance.updateTabIndicator();