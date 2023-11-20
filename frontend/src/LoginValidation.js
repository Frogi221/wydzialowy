function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])[a-zA-Z0-9@#$%^&+=!]{8,}$/;
    
    if(values.email === "") {
        error.email = "Nazwa nie może być pusta"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Nie znaleziono takiego adresu e-mail"
    }else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Hasło nie może być puste"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Niepoprawne hasło"
    } else {
        error.password = ""
    } 
    return error;
}

export default Validation;