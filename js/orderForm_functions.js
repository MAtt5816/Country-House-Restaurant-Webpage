$(document).ready(function(){
  $('input[type="checkbox"]').click(function(){
    var id = $(this).prop('id');
    var div = $('div#div_'+id+'.menuPosition');

    var color = $('div#div_'+id+'.menuPosition').css('border-color');
    var style = {};
    var code = div.children().first().html();
    var span_quantity = '<span class="quantity"><input type="number" name="'+id+'" id="qt_'+id+'" min="1" value="1"></span>';

    if (color == "green" || color == "#008000" || color == "rgb(0, 128, 0)"){
      style = {
        borderColor: "#3D2B05",
        borderWidth: "2px"
      };

      $('#'+id+'.dish_name').css('flex', '80%');
      code = code.replace(span_quantity, '');
    }
    else {
      style = {
        borderColor: "green",
        borderWidth: "3px"
      };

      $('#'+id+'.dish_name').css('flex', '65%');
      code = span_quantity+code;
    }

    div.css(style);
    div.children().first().html(code);
  });


  $('form').submit(function(){
    var is_checked = false;
    $('input[type="checkbox"]').each(function(index, elem){
      if(elem.checked) {
        is_checked = true;
      }
    });
    if(is_checked == false) {
      alert("Nie wybrano żadnej potrawy!");
      return false
    };
  });
});
