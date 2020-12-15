$('#grid-btn').on({
  'click' : () => {
    if($('#grid-btn').hasClass('no-grid')) {
      //그리드 보여주기
      showGrid();
      $('#grid-btn').removeClass('no-grid');
      $('#grid-btn').addClass('show-grid');
    } else if ($('#grid-btn').hasClass('show-grid')) {
      //보여준 그리드 없애기
      removeGrid();
      $('#grid-btn').removeClass('show-grid');
      $('#grid-btn').addClass('no-grid');
    }
  }
});

let showGrid = () => {
  for(let i=0 ; i < 12 ; i ++){
    $('.grid-area').append('<div class="col-1 col-m-1"></div>');
  }
}

let removeGrid = () => {
  $('.grid-area div').remove();
}