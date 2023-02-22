// API para cargar usuario
window.addEventListener("load", function(){
    let persona;
    let perfil = localStorage.getItem("persona");

    if(perfil){
        //Revisa si ya está almacenado en LocalStorage
        let persona = JSON.parse(localStorage.getItem("persona"));
        cargarHTML(persona);
    }else{
        //Carga un Usuario Nuevo si no hay uno anterior
        const url = "https://randomuser.me/api/";
    
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            persona = resultado.results[0];
            perfil = JSON.stringify(persona);
            localStorage.setItem("persona", perfil);
            cargarHTML(persona);
        });

    }

});

// Funcion para completar HTML

function cargarHTML(persona){
    //Comprueba que haya una persona
    if(persona){
        //Creando las variables tomadas del DOM
        let headerNombre = document.querySelector(".header__nombre");
        let headerImagen = document.querySelector(".header__imagen");
        let sectionDatos = document.querySelector(".personales");
        let title = document.querySelector("title");

        
        let nombre = persona.name.first + " " + persona.name.last;

        //Haciendo innerHTML a los datos del perfil
        title.innerText = nombre;    
        headerNombre.innerHTML = nombre;
        headerImagen.setAttribute("src",persona.picture.large);

        sectionDatos.innerHTML = `<h2 class="personales--titulo">Datos Personales</h2>
        <ul class="personales--datos__contenedor">
            <li class="personales--datos  personales--datos__fecha-nacimiento"><strong>Fecha Nacimiento:</strong> ${persona.registered.date.slice(0,10)}</li>
            <li class="personales--datos  personales--datos__dni"><strong>DNI:</strong> ${persona.cell}</li>
            <li class="personales--datos  personales--datos__edad"><strong>Edad:</strong> ${persona.registered.age}</li>
            <li class="personales--datos personales--datos__pais"><strong>País:</strong> ${persona.location.country}</li>
            <li class="personales--datos personales--datos__ciudad"><strong>Ciudad:</strong> ${persona.location.city}</li>
            <li class="personales--datos personales--datos__calle"><strong>Calle:</strong> ${persona.location.street.name} <strong>Número: </strong>${persona.location.street.number}</li>
            <li class="personales--datos personales--datos__email"><strong>Email:</strong> ${persona.email}</li>
            <li class="personales--datos personales--datos__telefono"><strong>Teléfono:</strong> ${persona.phone}</li>
        </ul>`;   
    }

}
