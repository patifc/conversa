const registerButton = document.querySelector('#register-register');
const loginButton = document.querySelector('#login-login');

const usernameRegister = document.querySelector('#user-id-register');
const userEmailRegister = document.querySelector('#user-email-register');
const userPasswordRegister = document.querySelector('#password-register');
const agree = document.querySelector('#agreeCheckBox');

//ADD NEW USER 
registerButton.addEventListener('click', function(e){
    e.preventDefault();

    const objectToSend = {
        "username": usernameRegister.value,
        "email": userEmailRegister.value,
        "password": userPasswordRegister.value,
    };

    const options = {
        method:"post",
        body: JSON.stringify(objectToSend),
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    };

    fetch('https://conversa-4d118.firebaseio.com/users.json', options)
        .then(response=>response.json())
        .then(response=>{
            alert('Registered successfuly');
            console.log(response);
        } 
    );
});



////I dont know if this is working
loginButton.addEventListener('click', function(){
    e.preventDefault();

    const objectToSend = {

        "email": String.value,
        "password": String.value
    };
    const options = {
    method:"post",
    body: JSON.stringify(objectToSend),
    headers: {
        "Content-Type":"application/json; charset=utf-8"
        }
    };
    
    fetch('https://conversa-4d118.firebaseio.com/users.json', options)
        .then(response=>response.json())
        .then(response=> console.log(response));
});