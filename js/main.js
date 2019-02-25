//var dropdown = $('#servant');
//dropdown.empty();
//dropdown.append('<option selected="true" disabled>Choose...</option>');
//dropdown.prop('selectedIndex', 0);
//const servantList = './js/servant-list.json';

//$.getJSON(servantList, function (data) {
  //$.each(servantList, function (key, entry) {
    //dropdown.append($('<option></option>').attr('value', entry.class).text(entry.name));
  //})
//});
$("#servantClass").change(function () {
    $('#servant').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));
    var matchVal = $("#servantClass option:selected").text();
    servantList.filter(function (serv) {
        if (serv.class == matchVal) {
            $("#servant").append($('<option></option>').val(serv.id).html(serv.name));
        }
    });
});

$('#servant').on('change', function(){
  for (let i = 0; i < servantList.length; i++){
    if ( $('#servant').val() == servantList[i].id ){
        //$('#attack').val( $('#servant').val() )
        let npcard = ``;
        switch(servantList[i].deck[6]){
          case "Q":
            npcard = "quick";
            break;
          case "A":
            npcard = "arts";
            break;
          case "B":
            npcard = "buster";
            break;
        }
        let attk = servantList[i].attack.split(',');
        let multi = [0,0,0,0,0];
        if (servantList[i].npmultiplier){
          multi = servantList[i].npmultiplier.split(',');
        }
        $('#NP').val( Number(multi[0]) );
        $('#attack').val( Number(attk[1]) );
        $('#'+npcard).prop("checked", true).click();
        $('#npLevel').on('change', function(){
          $('#NP').val( Number( multi[$('#npLevel').val()] ) );
        });
    }
  }
});

$('form').on('submit', function() {
    var atk = parseFloat($('#attack').val()) || 0;
    var np = parseFloat($('#NP').val())/100 || 0;
    var cardType = cardDmg($('input[name=cardoptions]:checked').val()) || 0;
    var servantClass = classDmg($('#servantClass').val()) || 0;
    var advantage = parseFloat($('#advantage').val()) || 0;
    var cardBuffs = parseFloat($('#cardBuffs').val())/100 || 0;
    var cardDebuffs = parseFloat($('#cardDebuffs').val())/100 || 0;
    var attackBuffs = parseFloat($('#attackBuffs').val())/100 || 0;
    var defenseDebuffs = parseFloat($('#defenseDebuffs').val())/100 || 0;
    var npBuffs = parseFloat($('#NPBuffs').val())/100 || 0;
    var flatAttack = parseFloat($('#flatAttack').val()) || 0;
    var spBuffs = parseFloat($('#SPBuffs').val())/100 || 0;
    var esAdvantage = parseFloat($('#ESAdvantage').val()) || 0;
    var npspBuffs = parseFloat($('#NPSPBuffs').val())/100 || 0;

    $('#servantClass').on('change',function(){
        servantClass = $('#servantClass').val();
    });
    $('#advantage').on('change',function(){
        advantage = $('#advantage').val();
    });
    $('#ESAdvantage').on('change',function(){
        esAdvantage = $('#ESAdvantage').val();
    });

    var total = atk * np * cardType * advantage * servantClass * 0.23 *
                (1 + attackBuffs + defenseDebuffs) *
                (1 + cardBuffs + cardDebuffs) *
                (1 + npBuffs + spBuffs) *
                (npspBuffs) * esAdvantage + flatAttack;

    $('#average').val(Math.round(total));
    $('#low').val(Math.round(0.9 * total));
    $('#high').val(Math.round(1.1 * total));

});

$('form').on('reset', function() {
  $('#NP').val(0);
  $('#low').val(0);
  $('#average').val(0);
  $('#high').val(0);
  $('#servant').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));
});

function classDmg(input){
  var classVal = 1;
  if (input === ''){
    classVal = 0;
    return classVal;
  }
  if ('archer'.indexOf(input.toLowerCase()) > -1){
    classVal = 0.95;
  }
  else if ('lancer'.indexOf(input.toLowerCase()) > -1){
    classVal = 1.05;
  }
  else if ('caster'.indexOf(input.toLowerCase()) > -1 || 'assassin'.indexOf(input.toLowerCase()) > -1){
    classVal = 0.9;
  }
  else if ('berserker'.indexOf(input.toLowerCase()) > -1 ||
  'ruler'.indexOf(input.toLowerCase()) > -1 || 'avenger'.indexOf(input.toLowerCase()) > -1 ){
    classVal = 1.1;
  }
  return classVal;
}

function cardDmg(input){
  var cardVal = 0;
  if (input === undefined){
    return cardVal;
  }
  if ('buster'.indexOf(input.toLowerCase()) > -1){
    cardVal = 1.5;
  }
  else if ('arts'.indexOf(input.toLowerCase()) > -1){
    cardVal = 1.0;
  }
  else if ('quick'.indexOf(input.toLowerCase()) > -1){
    cardVal = 0.8;
  }
  return cardVal;
}
