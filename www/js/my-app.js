// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      
      {
        path: '/registro/', url:'registro.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    // email="asi@lavate.com";
    // password="123gatitos";
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //   // Signed in
    //   var user = userCredential.user;
    //   // ...
    //   console.log("Usuario Creado");
    // })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.error(errorCode+"     "+errorMessage);
    //   // ..
    // });
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
})
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("pagina registro");
  $$('#btnRegistro').on('click',fnRegistro);
  

})
function fnRegistro(){
  let email=$$('#rEmail').val();
  let password=$$('#rPassword').val();
  firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((userCredential) => {
       // Signed in
       var user = userCredential.user;
       // ...
       console.log("Usuario Creado");
       $$('#msgErrorRegistro').html("Bienvenido a mi aplicacion movil!!");
     })
     .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.error(errorCode+"     "+errorMessage);
       $$('#msgErrorRegistro').html("Upss.. credeciales no validas "+errorCode);
       // ..
     });
}