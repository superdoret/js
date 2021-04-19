# js

A resolver:

1 - Diseño y estructura total de la pagina (en curso...)

2 - Necesito dividir el contenido del archivo datos.json por secciones. Supongamos que tengo 50 items en ese archivo, 10 para cada seccíon
    Cada seccion corresponde a cada item del Navbar (Manhattan - Brooklyn - Queens - Bronx - Staten Island)
    Cuando presiono "Manhattan" debe cargar 10 elementos de datos.json
    Cuando presiono "Brooklyn" debe cargar otros 10 elementos de datos.json
    Etc...
    
3-  Corregir la funcion de busqueda que está al final del archivo "main.js". Está hecha antes de usar los archivos .json por lo tanto hay que 
    modificar por ejemplo el for porque recorre el array TOURS que ya no existe
    
4-  Modificar el Remove de LocalStorage porque en el modal del carrito, al presionar "Vaciar Carrito" borra absolutamente todo. Incluso hasta el texto "Total"

5-  Hay mas cosas a corregir aparte del orden de las funciones y unificar el codigo porque está hecho segun iban avanzando las clases donde se supone que ibamos
    aprendiendo nuevas cosas, por ejemplo empezamos con document.ElementById y terminamos con document.querySelector lo mismo con las functions y arrow functions, etc
    
6-  En la parte final de la pagina hay un formulario que solo pide nombre y email. La idea es que ese contenido vaya a una API fake, puedo hacer la conexion, pero no
    se como validar los datos de entrada, segun lo que configure me da siempre Ok o me da siempre ERROR, pero nunca como deberia funcionar. Es decir que si cargo los datos
    correctos con nombre y un email, de OK o si mando el submit vacio o con datos que sea una direccion de email de ERROR. 
    Tengo 2 teorias (ja!) pero desconozco si serán válidas: 
    a) Que al ser Api Fake siempre de error porque no puedo hacer POST 
    b) Que valide nombre como texto y email como email  :/
    
    Seguro haya otra cosa por hacer. Hay 2 archivos .js uno se llama formulario.js y el otro formulario2.js uno tiene una validacion con xhr.status que siempre da 201 es 
    decir ERROR, por lo tanto asumo que puede ser por el tema API fake
    El otro archivo no lo tiene y está armado un poco diferente pero el resultado es el mismo. Y cuando deberia ser OK, no me devuelve resultado ni siquiera con un console.log
