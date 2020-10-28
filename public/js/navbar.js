document.addEventListener('DOMContentLoaded', function() {
    /*var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});*/
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {});
    //M.AutoInit();
    if (window.location.href !== "http://localhost:3000/" && 
    window.location.href !=="http://localhost:3000/signup/" &&
    window.location.href !=="http://localhost:3000/signup2/" &&
    window.location.href !=="http://localhost:3000/signup3/" &&
    window.location.href !=="http://localhost:3000/signin/" 
    ) {
      //instance.updateTabIndicator();
    }
});


