let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
    document.getElementById("tabs-swipe-demo").style.top = "55px";
    } else {
    document.getElementById("tabs-swipe-demo").style.top = "-55px";
    }
    prevScrollpos = currentScrollPos;
}