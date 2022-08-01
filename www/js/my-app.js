// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: "#app",
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: "left",
  },
  // Add default routes
  routes: [
    {
      path: "/registro/",
      url: "registro.html",
    },
    {
      path: "/panelUser/",
      url: "panelUser.html",
    },
    {
      path: "/index/",
      url: "index.html",
    },
    {
      path:"/registro-datos/",
      url:"registro-datos.html",
    },
    {
      path:"/panelAdmin/",
      url:"panelAdmin.html",
    },
    {
      path:"/reservaDia/",
      url:"reservaDia.html",
    },
    {
      path:"/reservaHora/",
      url:"reservaHora.html",
    },
    {
      path:"/visualizarHorario/",
      url:"visualizarHorario.html",
    },
    {
      path:"/visualizarDataUsers/",
      url:"visualizarDataUsers.html",
    },
    
  ],
  // ... other parameters
});

//
var mainView = app.views.create(".view-main");
var db,email;
var colPersonas;
var rol="developer";
var seleccionDia;
var direccionBaseDatos;
var hSolicitadaDia;

// Handle Cordova Device Ready Event
$$(document).on("deviceready", function () {
  console.log("Device is ready!");
  db = firebase.firestore();
  //Referenciando la collecion de datos personas
  colPersonas = db.collection("Usuarios");
  

  sembrado();

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
$$(document).on("page:init", function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
});
$$(document).on("page:init", '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("pagina registro");
  $$("#btnIngreso").on("click", fnIngresa);
});
$$(document).on("page:init", '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("pagina registro");
  $$("#btnRegistro").on("click", fnRegistro);
});
$$(document).on("page:init", '.page[data-name="registro-datos"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  console.log("pagina registro de llos datos");
  $$("#btnRegistroFin").on("click", fnRegistroFin);
});

//*************Panel del usuario********* */

$$(document).on("page:init", '.page[data-name="panelUser"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  dataCardUser=`
    <div class="card card-outline">
      <div class="card-header">Bienvenido ${nombre} ${apellido}</div>
      <div class="card-content card-content-padding">Pais de procedencia: ${pais}</div>
      <div class="card-footer">Cargo en la institución: ${rol}</div>
    </div>
  `;
  $$('#datoPersonalesUser').html(dataCardUser);

  $$("#sLunes").on("click",function(){
    seleccionDia="Lunes"
    mainView.router.navigate('/reservaDia/');
  });
  $$("#sMartes").on("click",function(){
    seleccionDia="Martes"
    mainView.router.navigate('/reservaDia/');
  });
  $$("#sMiercoles").on("click",function(){
    seleccionDia="Miercoles"
    mainView.router.navigate('/reservaDia/');
  });
  $$("#sJueves").on("click",function(){
    seleccionDia="Jueves"
    mainView.router.navigate('/reservaDia/');
  });
  $$("#sViernes").on("click",function(){
    seleccionDia="Viernes"
    mainView.router.navigate('/reservaDia/');
  });
  


  
});

//*******CARGANDO PAGINA PRINCIPAL DEL  USUARIOS******* *//


$$(document).on("page:init", '.page[data-name="panelAdmin"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  
  
  $$("#pagfooter").html(`<a href="#" class="link"><i class="fa-solid fa-arrow-rotate-left"></i></a><a href="/visualizarDataUsers/" class="link">Link 2</a><a href="/visualizarHorario/" class="link"><i class="fa-solid fa-arrow-rotate-left"></i></a>`);
});

//****CARGANDO LOS DIAS DISPONIBLES PARA SELECCION */

$$(document).on("page:init", '.page[data-name="reservaDia"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  direccionBaseDatos=db.collection(`${seleccionDia}`);
  console.log(seleccionDia);
  
  direccionBaseDatos.get().then((querySnapshot) => {
    var dta = "";
    let botonesEstado = "";
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      nombreregistrado = doc.data().nombreDocente;
      aula = doc.data().aulaSolicitada;
      cantidad = doc.data().cantidad;
      estado = doc.data().Estado;
      horaDia = doc.id;

      if (estado == 0) {
        botonesEstado = `<button id="hora${horaDia}Dia" class="col button button-fill color-green">Disponible</button>`;
      } else {
        botonesEstado = `<button  class="col button button-fill color-red" disabled>Ocupado</button>`;
      }

      dta += `
        <li class="item-content">
                    <div class="block block-strong">
                        <p class="row">
                        ${botonesEstado} 
                        </p>
                        
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">${horaDia} Hora</div>
                        
                      </div>
                      <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                      <div class="item-subtitle">Aula: ${aula}</div>
                      <div class="item-subtitle">Cantidad: ${cantidad}</div>
                      
                    </div>
                  </li>
        
        `;
    });
    
    $$("#hdiaunico").html(dta);
    $$("#hora1Dia").on("click",function(){
      hSolicitadaDia=1;
      
      mainView.router.navigate('/reservaHora/');
    });
    $$("#hora2Dia").on("click",function(){
      hSolicitadaDia=2;
      
      mainView.router.navigate('/reservaHora/');
    });
    $$("#hora3Dia").on("click",function(){
      hSolicitadaDia=3;
      
      mainView.router.navigate('/reservaHora/');
    });
    $$("#hora4Dia").on("click",function(){
      hSolicitadaDia=4;
      
      mainView.router.navigate('/reservaHora/');
    });
    $$("#hora5Dia").on("click",function(){
      hSolicitadaDia=5;
      
      mainView.router.navigate('/reservaHora/');
    });
  });
  
});
$$(document).on("page:init", '.page[data-name="reservaHora"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$("#rSolicitudRegistro").on("click",reservarHora);

});

//Funciones del administrador
$$(document).on("page:init", '.page[data-name="visualizarHorario"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$("#btnResetData").on("clik",resetData);
  var dtaAdmin = "";
  var dActual;
  for(i=0;i<6;i++){
    
    switch (i) {
      case 1:
        
        direccionBaseDatos = db.collection(`Lunes`);
        
        direccionBaseDatos.get().then((querySnapshot) => {
          dActual="Lunes";
          

          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            nombreregistrado = doc.data().nombreDocente;
            aula = doc.data().aulaSolicitada;
            cantidad = doc.data().cantidad;
            estado = doc.data().Estado;
            horaDia = doc.id;

            dtaAdmin += `
              <li class="item-content">
                          <div class="block block-strong">
                            <div class="block-title">${dActual}</div>
                        
                          </div>
                         
                          <div class="item-inner">
                            
                            <div class="item-title-row">
                              <div class="item-title">${horaDia} Hora</div>
                              
                            </div>
                            <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                            <div class="item-subtitle">Aula: ${aula}</div>
                            <div class="item-subtitle">Cantidad: ${cantidad}</div>
                            
                          </div>
                        </li>
              
              `;
          });
          $$("#vhReservadas").html(dtaAdmin);
          
        });
      
        break;
      case 2:
        
        
        direccionBaseDatos = db.collection(`Martes`);
        direccionBaseDatos.get().then((querySnapshot) => {
          dActual="Martes";
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
      
            nombreregistrado = doc.data().nombreDocente;
            aula = doc.data().aulaSolicitada;
            cantidad = doc.data().cantidad;
            estado = doc.data().Estado;
            horaDia = doc.id;
      
            
      
            dtaAdmin += `
              <li class="item-content">
                          <div class="block block-strong">
                            <div class="block-title">${dActual}</div>
                        
                          </div>
                          <div class="item-inner">
                            
                            <div class="item-title-row">
                              <div class="item-title">${horaDia} Hora</div>
                              
                            </div>
                            <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                            <div class="item-subtitle">Aula: ${aula}</div>
                            <div class="item-subtitle">Cantidad: ${cantidad}</div>
                            
                          </div>
                        </li>
              
              `;
          });
          $$("#vhReservadas").html(dtaAdmin);
          
        });
      
        break;
      case 3:
        
        direccionBaseDatos = db.collection(`Miercoles`);
        direccionBaseDatos.get().then((querySnapshot) => {
          
          dActual="Miercoles";
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
      
            nombreregistrado = doc.data().nombreDocente;
            aula = doc.data().aulaSolicitada;
            cantidad = doc.data().cantidad;
            estado = doc.data().Estado;
            horaDia = doc.id;
      
            
      
            dtaAdmin += `
              <li class="item-content">
                          <div class="block block-strong">
                            <div class="block-title">${dActual}</div>
                        
                          </div>
                          <div class="item-inner">
                            
                            <div class="item-title-row">
                              <div class="item-title">${horaDia} Hora</div>
                              
                            </div>
                            <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                            <div class="item-subtitle">Aula: ${aula}</div>
                            <div class="item-subtitle">Cantidad: ${cantidad}</div>
                            
                          </div>
                        </li>
              
              `;
          });
          $$("#vhReservadas").html(dtaAdmin);
          
        });
      
        break;
      case 4:
        
        
        direccionBaseDatos = db.collection(`Jueves`);
        direccionBaseDatos.get().then((querySnapshot) => {
          dActual="Jueves";
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
      
            nombreregistrado = doc.data().nombreDocente;
            aula = doc.data().aulaSolicitada;
            cantidad = doc.data().cantidad;
            estado = doc.data().Estado;
            horaDia = doc.id;
      
            
      
            dtaAdmin += `
              <li class="item-content">
                          <div class="block block-strong">
                            <div class="block-title">${dActual}</div>
                        
                          </div>
                          <div class="item-inner">
                            
                            <div class="item-title-row">
                              <div class="item-title">${horaDia} Hora</div>
                              
                            </div>
                            <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                            <div class="item-subtitle">Aula: ${aula}</div>
                            <div class="item-subtitle">Cantidad: ${cantidad}</div>
                            
                          </div>
                        </li>
              
              `;
          });
          $$("#vhReservadas").html(dtaAdmin);
          
        });
      
        break;
      case 5:
        
        
        direccionBaseDatos = db.collection(`Viernes`);
        direccionBaseDatos.get().then((querySnapshot) => {
          dActual="Viernes";
        
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
      
            nombreregistrado = doc.data().nombreDocente;
            aula = doc.data().aulaSolicitada;
            cantidad = doc.data().cantidad;
            estado = doc.data().Estado;
            horaDia = doc.id;
      
            
      
            dtaAdmin += `
              <li class="item-content">
                          <div class="block block-strong">
                            <div class="block-title">${dActual}</div>
                        
                          </div>
                          <div class="item-inner">
                            <div class="item-title-row">
                              <div class="item-title">${horaDia} Hora</div>
                              
                            </div>
                            <div class="item-subtitle">Nombre: ${nombreregistrado}</div>
                            <div class="item-subtitle">Aula: ${aula}</div>
                            <div class="item-subtitle">Cantidad: ${cantidad}</div>
                            
                          </div>
                        </li>
              
              `;
          });
          $$("#vhReservadas").html(dtaAdmin);
          
        });
      
        break;
    }
    
  }
  
    console.log("homa lrdss")


  
});

$$(document).on("page:init", '.page[data-name="visualizarDataUsers"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  colPersonas.where("rol", "==", "developer")
    .get()
    .then((querySnapshot) => {
      var listaUser="";
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().nombre);
            
              nombre=doc.data().nombre;
              apellido=doc.data().apellido;
              pais=doc.data().pais;
              hora=doc.data().hora;
              fechahora=doc.data().fechaHora;
              rolUsuario=doc.data().rol;
              emailUserCard=doc.id;
              

              listaUser+=`
              <div class="card card-outline">
                
                <div class="card-header">Correo Identificador: ${emailUserCard}</div>
                <div class="card-content card-content-padding">
                  <div class="row">
                    <div class="col-100">Nombre: ${nombre}</div>
                    <div class="col-100">Apellido: ${apellido}</div>
                    <div class="col-100">Pais: ${pais}</div>
                  </div>
                </div>
                <div class="card-footer">Cargo en la institución: ${rolUsuario}</div>
              </div>
              `;

              console.log(listaUser);
              
             

        });
        $$('#datosCuentasUsuarios').html(listaUser);
        
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


});



function resetData(){

  console.log("Entre a la funcion de reseteo")
  let vdia=$$("#selectDiaReset").val();
  for(i=1;i<5;i++){
    db.collection(`${vdia}`).doc(`${i}`).update({
      Estado: 0,
      aulaSolicitada:`Libre`,
      cantidad:0,
      nombreDocente:`Libre`
    })
    .then(() => {
      mainView.router.navigate('/panelAdmin/');
    });

  }
  


}

//FUNCIONES RESERVA HORA DIA SELECCIONADO
function reservarHora(){
  let aulaSolicitadaHora=$$("#aulaSolicitada").val();
  let canti=$$("#cantidadEquipos").val();

  db.collection(`${seleccionDia}`).doc(`${hSolicitadaDia}`).update({
    Estado: 1,
    aulaSolicitada:`${aulaSolicitadaHora}`,
    cantidad:canti,
    nombreDocente:`${nombre} ${apellido}`
  })
  .then(() => {
    mainView.router.navigate('/reservaDia/');
  });
}


//******** FUNCIONES DE ACCIONES DEL PROGRAMA *********/

function fnRegistroFin(){
  //Obtiene el valor de la varible de email para adjuntar en ese identificador sus datos

  //Identificador
  elId=email;
  //Recuperando los datos del formulario
  nombre=$$('#rNombre').val();
  apellido=$$('#rApellido').val();
  pais=$$('#rPais').val();
  hora=$$('#rHora').val();
  fechaHora=$$('#rFechaHora').val();

  //Construyo el objeto de datos JSON:

  var datos={
    nombre:nombre,
    apellido:apellido,
    pais:pais,
    hora:hora,
    fechaHora:fechaHora,
    rol:rol
  }
  colPersonas.doc(elId).set(datos)
  .then(function(ok){
    console.log("registro correcto en la base de datos");
    mainView.router.navigate('/panelUser/');

  })
  .catch(function(e){console.log("Error en bd "+e)})

}

function fnRegistro() {
  email = $$("#rEmail").val();
  let password = $$("#rPassword").val();

  //Promesa
  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("Usuario Creado");
      $$("#msgErrorRegistro").html("Bienvenido a mi aplicacion movil!!");
      //Derivando al panel del usuario
      mainView.router.navigate("/registro-datos/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode + "     " + errorMessage);
      switch (errorCode) {
        case "auth/invalid-email ":
          mensaje = "El correo electronico no es valido";
          break;
        case "my-app.js:81 auth/weak-password":
          mensaje = "Contraseña ingresada demasiada corta ";
          break;
        case "auth/email-already-in-use":
          mensaje = "Correo ingresado ya esta en uso";
          break;
        default:
          mensaje = "Intentelo nuevamente";
      }
      $$("#msgErrorRegistro").html("Upss.. " + mensaje);
      // ..
    });
}

//Variables globales para el 
function fnIngresa() {
  let email = $$("#loEmail").val();
  let password = $$("#loPassword").val();

  //Codigo de Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("BIenvenido a mi app");
      
      //Se le direcciona de acuerdo al perfil que tenga en la base de datos

      var docRef = colPersonas.doc(email);

      docRef.get().then((doc) => {
          if (doc.exists) {
              nombre=doc.data().nombre;
              apellido=doc.data().apellido;
              pais=doc.data().pais;
              hora=doc.data().hora;
              fechahora=doc.data().fechaHora;
              rolUsuario=doc.data().rol;
              if(rolUsuario=="admin"){
                mainView.router.navigate('/panelAdmin/');

              }else{
                mainView.router.navigate('/panelUser/');
              }

              console.log("Document data:", doc.data());
          } else {
        // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
    console.log("Error getting document:", error);
      });



      //mainView.router.navigate("/panelUser/");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode + "   " + errorMessage);
      switch (errorCode) {
        case "auth/invalid-email":
          mensaje = "El correo no tiene el formato requerido";
          break;
        case "auth/user-not-found":
          mensaje = "Cuenta no encontrada";
          break;

        default:
          mensaje = "Comprobar credenciales";
      }
      $$("#msgErrorLogin").html("Upss.. " + mensaje);
    });
}

//Ingreso de datos a la base de datos
function sembrado() {
  console.log("Iniciando el sembrado de datos");
  //Crear a los usuarios desde el servicio de autenticacion, si este me da un ok, recien se genera el dato en la
  //base de datos
  var data = {
    nombre: "Admin",
    apellidos: "Uno",
    rol: "admin",
  };
  elId = "uno@admin.com";
  clave = "admin1";
  firebase.auth().createUserWithEmailAndPassword(elId, clave)
    .then(function () {
      colPersonas.doc(elId).set(data)
        .then(function (ok) {
          console.log("Nuevo Ok");
        })
        .catch(function (error) {
          console.log("Error INgreso: " + error);
        });
    })
    .catch(function (e) {
      console.log("Error Validacion: " + e);
    });

  var data2 = {
    nombre: "Admin",
    apellidos: "Dos",
    rol: "admin",
  };
  elId2 = "dos@admin.com";
  clave2 = "admin2";

  firebase.auth().createUserWithEmailAndPassword(elId2, clave2)
    .then(function () {
      colPersonas.doc(elId2).set(data2)
        .then(function (ok) {
        console.log("Nuevo ok 2");
        })
        .catch(function (e) {
        console.log("error INgreso: " + e);
        });
    })
    .catch(function (e) {
      console.log("Error Validacion: " + e);
    });
  //ANTIGUA FORMA

  // var data={
  //   nombre:"Pepe",
  //   apellidos:"Flores",
  //   rol:"developer"
  // };
  // elId="pepe@dev.com";

  // colPersonas.doc(elId).set(data)
  // .then(function(ok){
  //   console.log("Nuevo Ok");
  // })
  // .catch(function(error){
  //   console.log("Error: "+error);
  // })
  // var data2={
  //   nombre:"Anita",
  //   apellidos:"Mendoza",
  //   rol:"developer"
  // }
  // elId2="maria@dev.com";
  // colPersonas.doc(elId2).set(data2)
  // .then(function(ok){console.log("Nuevo ok 2");})
  // .catch(function(e){console.log("error: "+e);})
}
