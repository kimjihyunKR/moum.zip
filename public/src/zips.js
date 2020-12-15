
let zipUserIds = document.getElementsByClassName('zip-userid');
let zipDates = document.getElementsByClassName('zip-date')
let submenuBtns = document.getElementsByClassName('submenu-btn');
let submenuContents = document.getElementsByClassName('submeu-content');



// 호버하면 이름과 날짜가 번갈아 나오도록
for(let i =0; i < zipUserIds.length ; i ++){
  zipUserIds[i].onmouseover = () => {
    zipDates[i].classList.remove('sr-only');
    zipUserIds[i].classList.add('sr-only');
  }
  zipUserIds[i].onmouseout = () => {
    zipUserIds[i].classList.remove('sr-only');
    zipDates[i].classList.add('sr-only');
  }
} 

let exIndex = null;   //열려있는 인덱스 번호 저장
let isOpen = false;   //열려있는 메뉴가 있는지 확인


for (let i = 0; i < submenuBtns.length; i++) {

  //서브메뉴 버튼을 누르면 서브메뉴가 뜨도록
  submenuBtns[i].addEventListener('click', ()=>{
    if(!isOpen){      
      openMenu(i);
    } else {  
      closeMenu(exIndex);
      if( exIndex != i){
        openMenu(i);     
      }
    } // console.log(isOpen +"/"+exIndex);
  })

  submenuContents[i].addEventListener("click", function(e) {
    let target = e.target;
    document.getElementById("returnTo").value = window.location.pathname;
    console.log(window.location.pathname);
    switch (target.id) {
      case 'edit':
        this.action = '/zips/edit'
        this.submit();
        break;
      case 'delete':
        // 삭제 메뉴 동작
        console.log('click');
        this.action = '/zips/delete'
        this.submit();
        break;
    }
  });

}

function openMenu(i) {
  submenuContents[i].classList.remove('dis-none');
  isOpen = true;
  exIndex = i;
}

function closeMenu(i) {
  submenuContents[i].classList.add('dis-none');
  isOpen = false;
}



