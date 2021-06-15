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


  $('#delivery, #takeway').click(function(){
    if($('#delivery').prop('checked')){
      $('#street, #number').prop('required', true);
      $('#address').show();
     }
    else {
      $('#street, #number').prop('required', false);
      $('#address').hide();
  }
  });

  $('#asap, #date').click(function(){
    if($('#date').prop('checked')) {
      $('#day, #hour').prop('required', true);
      $('#data_time').show();
  }
    else {
      $('#day, #hour').prop('required', false);
      $('#data_time').hide();
    }
  });


  $('form').submit(function(){
    var dishes = [];
    var is_checked = false;
    let i = 0;
    $('input[type="checkbox"]').each(function(index, elem){
      if(elem.checked) {
        is_checked = true;
        dishes[i] = {};
        dishes[i].id = $(elem).prop("id");
        dishes[i].quantity = $('div#div_'+dishes[i].id+' .quantity>input').val();
        dishes[i].price = $('div#div_'+dishes[i].id+' .price').text();
        i++;
      }
    });
    if(is_checked == false) {
      alert("Nie wybrano żadnej potrawy!");
      return false;
    };

    var details = {};
    details.name = $("#name").val();
    details.surname = $("#surname").val();
    details.phone = $("#phone").val();
    details.street = $("#street").val();
    details.number = $("#number").val();
    details.comments = $("textarea").val();
    if($("#takeway").prop("checked")){
      details.method = "takeway";
    }
    else{
      details.method = "delivery";
    }
    if($("#asap").prop("checked")){
      details.time = "asap";
    }
    else{
      details.time = "date";
      details.hour = $("#hour").val();
      details.day = $("#day").val();
    }
    var list = JSON.parse(localStorage.getItem('list'));
    list=[];
    list.push(details);
    list.push(dishes);
    localStorage.setItem('list', JSON.stringify(list));
  });


  $("#load").click(function(){
    var list = JSON.parse(localStorage.getItem('list'));
    if(list == null) alert("Brak ostatnich zamówień w pamięci");
    else {
      let item = list[0];
      let ordered = list[1];
      $("#name").val(item.name);
      $("#surname").val(item.surname);
      $("#phone").val(item.phone);
      $("#street").val(item.street);
      $("#number").val(item.number);
      $("textarea").val(item.comments);
      if(item.method == "takeway"){
        $("#takeway").prop("checked", true);
      }
      else{
        $("#delivery").prop("checked", true);
      }
      if(item.time == "asap"){
        $("#asap").prop("checked", true);
      }
      else {
        $("#date").prop("checked", true);
        $("#hour").val(details.hour);
        $("#day").val(details.day);
      }
      for(let j=0;j<ordered.length;j++){
        let temp_id = ordered[j].id;
        $('#'+temp_id).click();
        $('div#div_'+temp_id+' .quantity>input').val(ordered[j].quantity);
      }
      $("#mode").val("edited");
      $('input[type="submit"]').val('Nadpisz zamówienie');
      if(!($('#reset').length)) $("fieldset#details").append('<button type="button" name="reset" id="reset">Wyczyść pamięć</button>');
    }
  });
  $("#details").on('click', '#reset', function(){
    var r = confirm("Jesteś pewien? Stracisz możliwość edycji oraz podglądu aktualnie załadowanego zamówienia.");
    if(r == true){
      localStorage.clear();
      location.reload();
    }
  });
});
