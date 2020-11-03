document.addEventListener('DOMContentLoaded', function() {
    let filter = document.querySelectorAll('.collapsible');
    let filterInit = M.Collapsible.init(filter, {});

    let elemsSelect = document.querySelectorAll('select');
    let select = M.FormSelect.init(elemsSelect, {});
});

const queryString = window.location.search;
const sportInput = document.getElementById('sport');
let sport = queryString.split('sport=')[1];
if (sport!=undefined) {
    sportInput.value = sport;
}   else {
    sportInput.parentNode.removeChild(sportInput);
}