const body = document.querySelector('body');
const postpage = document.getElementById('postpage')
const toggle = document.getElementById('toggle');

toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    postpage.classList.toggle('active')
}