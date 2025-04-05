document.querySelectorAll('.info-item .btn').forEach(function(button){
    button.addEventListener('click', function(){
        document.querySelector('.container').classList.toggle('log-in');
    });
});
function register(event){
    event.preventDefault();
    let username = document.getElementById('regUsername').value.trim();
    let password = document.getElementById('regPassword').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let fullName = document.getElementById('regUsername').value.trim();
    let regMessage = document.getElementById('regMessage');

    let lowerCaseLeter = /[a-z]/g;
    let upperCaseLeter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    regMessage.style.color='red';

    if (!username || !password || !email || !fullName){
        regMessage.innerText="Please fill in all fields!!!";
        return;
    }
    if (password.length <8){
        regMessage.innerText='Password must be at least 8 charaters';
        return;
    }
    if(!lowerCaseLeter.test(password)){
        regMessage.innerText='Password must contain a lowercase letter';
        return;
    }
    if(!upperCaseLeter.test(password)){
        regMessage.innerText='Password must contain a uppercase letter';
        return;
    }
    if(!numbers.test(password)){
        regMessage.innerText='Password must contain a number';
        return;
    }

    let user ={
        username: username,
        password: password,
        fullName: fullName,
        email:email,
    };
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')):{};

    if(users[username]){
        regMessage.innerText='Username already exist!';
    }else{
        users[username]=user;
        localStorage.setItem('users',JSON.stringify(users));
        regMessage.innerText = 'Registration successfull';
        regMessage.style.color='green';
    }
}

function login(event){
    event.preventDefault();

    let username = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value.trim();
    let loginMessage = document.getElementById('loginMessage');

    let users = localStorage.getItem('users') ?JSON.parse(localStorage.getItem('users')) : {};
    let storedUser = users[username];

    if(storedUser && storedUser.password === password){
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser))
        window.location.href = '../index.htm';
    }else {
        loginMessage.innerText = 'Invalid username or password!';
        loginMessage.style.color ='red';
    }
}