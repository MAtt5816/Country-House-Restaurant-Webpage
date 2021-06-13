$(document).ready(function(){
  $('input[type="checkbox"]').click(function(){
    var id = $(this).prop('id');
    var color = $('div#div_'+id+'.menuPosition').css('border-color');
    var style = {};
    if (color == "green" || color == "#008000" || color == "rgb(0, 128, 0)"){
      style = {
        borderColor: "black",
        borderWidth: "2px"
      };
    }
    else {
      style = {
        borderColor: "green",
        borderWidth: "5px"
      };
    }
    $('div#div_'+id+'.menuPosition').css(style);
  });
});
