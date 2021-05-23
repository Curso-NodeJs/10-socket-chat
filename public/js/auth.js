
const miFormulario = document.querySelector('form');

console.log(window.location.hostname.includes('localhost'));
var url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8000/api/auth/'
            : 'https://webserver-node07.herokuapp.com/api/auth/';


miFormulario.addEventListener('submit', el =>{
   // evita hacer un refresh del navegador web
   el.preventDefault();
   const formData = {};
   
   for(let el of miFormulario.elements){
       if (el.name.length > 0){
           formData[el.name] = el.value;
       }
   }
   
    fetch(url+'login',{
        method:'post',
        body: JSON.stringify(formData),
        headers:{ 'Content-Type': 'application/json' }
    }).then( res => res.json())
      .then( (resp) => {
          if (resp.msg){
              return console.error(resp.msg);
          }
          localStorage.setItem('token',resp.token)
          window.location = 'chat.html';
      }).catch( error => {
          console.log(error);
      } )
    
});


function onSignIn(googleUser) {
// var profile = googleUser.getBasicProfile();
// console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// console.log('Name: ' + profile.getName());
// console.log('Image URL: ' + profile.getImageUrl());
// console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
var id_token = googleUser.getAuthResponse().id_token;
const data = { id_token };
fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}).then( resp => resp.json() )
  .then( ({ token }) => {
      localStorage.setItem('token',token);
      window.location = 'chat.html';
  })
  .catch( console.log );
}

function signOut() {
var auth2 = gapi.auth2.getAuthInstance();
auth2.signOut().then(function () {
console.log('User signed out.');
});
}