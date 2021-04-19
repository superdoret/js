function enviar (name, email) {
    $.ajax ({
        url: 'https://6079e99fbd56a60017ba246d.mockapi.io/users',
        type: 'POST',
        data : {name: name, 
                email: email
        },

        success: function (response, xhr) {
            console.log(response);
            if (xhr.status ===200){
            Swal.fire({
                icon: 'success',
                title: 'OK!',
                text: 'Datos enviados correctamente!',
            })
        }
    },
        
        error: function(response){
            console.log(response);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vuelve a cargar los datos!',
            })
        }
      
    })
}

$("#submit").click(function (){
    let name = $("#name").val();
    let email = $("#email").val();
    enviar (name, email)
})