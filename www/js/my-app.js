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
      {
        path: '/panelUser/', url:'panelUser.html',
      },
      {
        path: '/index/', url:'index.html',
      },

    ]
    // ... other parameters
  });


//
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
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("pagina registro");
  $$('#btnIngreso').on('click',fnIngresa);
  

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
 

  //Promesa
  firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((userCredential) => {
       // Signed in
       var user = userCredential.user;
       // ...
       console.log("Usuario Creado");
       $$('#msgErrorRegistro').html("Bienvenido a mi aplicacion movil!!");
       mainView.router.navigate('/panelUser/');
     })
     .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.error(errorCode+"     "+errorMessage);
       switch(errorCode){
        case "auth/invalid-email ":
          mensaje="El correo electronico no es valido";
          break;
        case "my-app.js:81 auth/weak-password":
          mensaje="Contraseña ingresada demasiada corta ";
          break;
        case "auth/email-already-in-use":
          mensaje="Correo ingresado ya esta en uso";
          break;
        default:
          mensaje="Intentelo nuevamente"

       }
       $$('#msgErrorRegistro').html("Upss.. "+mensaje);
       // ..
     });
}
function fnIngresa(){
  let email=$$('#loEmail').val();
  let password=$$('#loPassword').val();

  //Codigo de Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("BIenvenido a mi app");
    mainView.router.navigate('/panelUser/');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode+"   "+errorMessage);
    switch(errorCode){
      case "auth/invalid-email":
        mensaje="El correo no tiene el formato requerido";
        break;
      case "auth/user-not-found":
        mensaje="Cuenta no encontrada";
        break;
      
      default:
        mensaje="Comprobar credenciales"

     }
     $$('#msgErrorLogin').html("Upss.. "+mensaje);

  });
}