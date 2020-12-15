let authForm = document.getElementById('authForm');
let join = document.querySelector('#btn-join');
let login = document.querySelector('#btn-login');

if(join){
  join.addEventListener('click',()=>{
    authForm.action='/auth/join';
    checkJoin();
    checkLogin();
  })
} else {
  login.addEventListener('click',()=>{
  authForm.action='/auth/login';
  checkLogin();
 })
}

function checkJoin(){
  let name = document.getElementById('name');
  if(name.value =''){
    alert('name을 입력하세요.');
    name.focus();
  }
}

function checkLogin() {
  let id = document.getElementById('id');
  let password = document.getElementById('password');
  if(id.value == ''){
    alert('id을 입력하세요.');
    id.focus();
  } else if(password.value == ''){
    alert('password를 입력하세요.');
    password.focus();
  } else {
    authForm.submit();
  }
}