//Evento que espera la carga del documento
document.addEventListener("DOMContentLoaded", ()=>{
    //Declaramos variables
    let perfilProfesional = document.querySelector("#perfil");
    let modal = document.querySelector("#modal");
    let perfilDescripcion = document.querySelector(".perfil__descripcion");

    perfilProfesional.addEventListener("click", ()=>{
        let descripcion = perfilDescripcion.textContent;

        let html = `<div class="modal__contenedor">`;
        html += `<h2 class="modal__titulo"><span class="modal__cierre"><i class="fa-solid fa-xmark"></i></span>`;
        html += `Perfil Profesional</h2>`;
        html += `<p class="modal__descripcion">${descripcion}</p>`;
        html += `</div>`;

        
        modal.innerHTML = html;
        modal.classList.remove("modal__ocultar");
        modal.classList.add("modal__mostrar");
        modalCerrar(modal);
    });
});

//Funcion para cerrar Modal
function modalCerrar(modal){
    modal.addEventListener("click",()=>{
        modal.classList.remove("modal__mostrar");
        modal.classList.add("modal__ocultar"); 
    })
}



