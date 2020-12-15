let writeForm = document.getElementById('writeForm');

document.getElementById('submitGroup').addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'btnAdd':
      writeForm.action = '/zips/post'
      break;
    case 'btnModify':
      writeForm.action = '/zips/modify'
      break;
  }
  check();
})

function check(){
  let bookname = document.getElementById('bookname');
  let page = document.getElementById('page');
  let content = document.getElementById('content');

  if(content.value == '') {
    alert('내용을 입력하세요');
    content.focus();
  } else if (bookname.value == '') {
    alert('출처 이름을 입력하세요');
    bookname.focus();
  } else if (page.value == '') {
    page.value = 0;
    writeForm.submit();
  } else {
    writeForm.submit();
  }
}