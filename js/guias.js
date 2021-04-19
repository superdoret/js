const btnGuia = document.querySelector('#btnGuia');
const guiaResultado = document.querySelector('#guiaResultado');
 
//Muestro el modal de los guías turísticos
 $("#mostrarModalBtnInfo").click(function() {
    $("#modalContainerInfo").show();
});
    
//Cierro el modal de los guías turísticos
$("#cerrarModalBtnInfo").click(function () {
    $("#modalContainerInfo").hide();
});


btnGuia.addEventListener('click', obtenerGuiaTuristico);

function obtenerGuiaTuristico() {
	fetch('https://6079e99fbd56a60017ba246d.mockapi.io/users')   
		.then(res => res.json())
		.then(data => {
           //console.log(data[3].country);
           guiaResultado.innerHTML = ` 
                                    <div class="guiaTours">
                                        <p class="guiaNombre">${data[1].name}</p>
                                        <p class="guiaPais">${data[3].country}</p>
                                        <img src="${data[3].img}" class="img-fluid rounded-circle">
                                    </div>
                                    `
		});
};
