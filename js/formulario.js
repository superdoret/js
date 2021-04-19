$("#submit").click(()=>{

    
    $.ajax({
        type: "POST",
        url: "https://6079e99fbd56a60017ba246d.mockapi.io/users",
        data: {nombre: $('#name').val(), email: $('#email').val()},
        dataType: 'json',
    
        success: function(textStatus, xhr){
            alert (xhr.status);
            if (xhr.status === 200){
                newmessage();
            }
            else {
                errormessage();
            }
        }
    });

    function newmessage(){
        Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Datos enviados correctamente!',
        })
    }
    function errormessage(){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vuelve a cargar los datos!',
        })
    }  
});

