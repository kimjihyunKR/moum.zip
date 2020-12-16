let changeForm = document.getElementById('changePassword');
let btnChange = document.getElementById('btn-change');
let btnDelete = document.getElementById('btn-delete');

btnChange.addEventListener('click', ()=>{
  comparePw();
})

btnDelete.addEventListener('click', ()=>{
  if(confirm('정말 탈퇴하시겠습니까?')){
    document.getElementById('deleteAccout').submit();
  }
})


function comparePw(){
  let pw1 = document.getElementById('password1').value;
  let pw2 = document.getElementById('password2').value; 
  console.log(pw1 +"/"+pw2);
  if (pw1 != "" || pw2 != "") {
    if (pw1 === pw2) {
      console.log('ok');
      document.getElementById('alert-success').classList.remove('dis-none');
      document.getElementById('alert-error').classList.add('dis-none');
      changeForm.submit();
    }
    else {
      console.log('error');
      alert("비밀번호가 일치하지 않습니다. 비밀번호를 재확인해주세요.");
      document.getElementById('alert-success').classList.add('dis-none');
      document.getElementById('alert-error').classList.remove('dis-none');
    }
  } else {
    alert("비밀번호를 입력해주세요");
  }
}

