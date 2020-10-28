
document.addEventListener('DOMContentLoaded', function() {
    let url = window.location.href;
    if (url =='http://localhost:3000/myprofile?dcstrava') {
        M.toast({html: 'Strava disconnected'});
    } else if (url.startsWith('http://localhost:3000/myprofile/?state=&code=')) {
        M.toast({html: 'Strava connected'});
    }
});
