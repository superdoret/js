$(document).ready(function(){ 
   
    //Muestro el modal
    $("#mostrarModalBtn").click(function() {
        $("#modalContainer").show();
    });
        
    //Cierro el modal
    $("#cerrarModalBtn").click(function () {
        $("#modalContainer").hide();
    });

    // Modal TOURS GRATUITOS. Solo para el desafío de interacción con el usuario y AJAX

    //Muestro el modal
    $("#mostrarModalBtnGratis").click(function() {
        $("#modalContainerGratis").show();
    });
        
    //Cierro el modal
    $("#cerrarModalBtnGratis").click(function () {
      $("#modalContainerGratis").hide();
    });
});


let gratis = [];


$("#contenidoGratis").show("slow", ()=> {
    $.getJSON("js/gratuitos.json", (response, status)=> {
        if (status === "success") {
            let contenidoGratis = response
                gratis = contenidoGratis
                for (const tourGratis of contenidoGratis) {
                    $("#ListaDeToursGratis").append(cargoInfoGratis(tourGratis));
                }
        } else {
            $("#ListaDeToursGratis").html(contenidoErrorGratis);
        }
        $("#ListaDeToursGratis").fadeIn("slow");
    })
});


const contenidoErrorGratis = `<div class="center">
                                <h4 >No se pudo recuperar el contenido</h4>
                                <h5>Intente nuevamente en unos segundos...</h5>
                              </div>`

const cargoInfoGratis = (tourGratis) => {
    let streaming = JSON.stringify(tourGratis)
        const infoGratis = `<tr>
                                <td>
                                    <img src="${tourGratis.img}" width=100>
                                </td>
                                <td>${tourGratis.h4}</td>
                                <td>${tourGratis.price}</td>
                            </tr> `;
        return infoGratis;
}

