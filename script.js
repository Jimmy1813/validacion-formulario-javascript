

const firebaseConfig = {
    apiKey: "AIzaSyCRtyVwlQFyLDPr2hCfr9p6mLpwVPgqcOo",
    authDomain: "datos-de-formulario-461b3.firebaseapp.com",
    projectId: "datos-de-formulario-461b3",
    storageBucket: "datos-de-formulario-461b3.appspot.com",
    messagingSenderId: "432679642420",
    appId: "1:432679642420:web:ad1134b4e8d079cb2ff161",
    measurementId: "G-EQMMBLY9PN"
};

//Inicializar la base de datos
firebase.initializeApp(firebaseConfig);

//Inicializate cloud firebase and get reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introducir tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo 

    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patron de validacion basico

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introducir un email valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar la contraseña

    let contraseñaEntrada = document.getElementById('password')
    let contraseñaError = document.getElementById('passwordError')
    let contraseñaPatter = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    if(!contraseñaPatter.test(contraseñaEntrada.value)){
        contraseñaError.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y caracteres especiales'
        contraseñaError,classList.add('error-message')
    }else{
        contraseñaError.textContent = ''
        contraseñaError.classList.remove('error-message')
    }

    //Si todos los campos son validos enviar formulario

    if(!errorNombre.textContent && !emailError.textContent && !contraseñaError.textContent){
        //Aqui puede ir el backend

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contraseñaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito',docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });     
    }
})
