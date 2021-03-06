$("#servantClass").change(function () {
  $('#grailed').prop('disabled', true);
  $('#grailed').prop('checked', false);
  $('#fou').prop('checked', false);
  $('#goldFou').prop('checked', false);
  $('#goldFou').prop('disabled', true);
  $('#ocButton').prop('checked', false);
  $('#ocButton').prop('disabled', true);
  $('#npLevel').val(0).attr('disabled','disabled');
  $('#ocLevel').val(0).attr('disabled','disabled');
  $('#npButton').prop('checked', false);
  $('#npButton').prop('disabled', true);
  $('#secondNP').prop('checked', false);
  $('#secondNP').prop('disabled', true);
  $('#npupgraded').hide();
  $('#nonnpupgraded').hide();
  //$('#NP').val(0);
  //$('#attack').val(0);
  $('#servant').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));
  var matchVal = $("#servantClass option:selected").text();
  servantList.filter(function (serv) {
      if (serv.class == matchVal && serv.npmultiplier) {
          //$("#servant").append($('<option></option>').val(serv.id).html(`${serv.id}: ${serv.name}`));
          $("#servant").append($('<option></option>').val(serv.id).html(`${serv.name}`));
      }
  });
});

$('#fou').on('change', function(){
  if($(this).is(':checked')){
    $('#attack').val(Number($('#attack').val())+1000);
    $('#goldFou').prop('disabled', false);
  }
  else {
    $('#attack').val(Number($('#attack').val())-1000);
    $('#goldFou').prop('disabled', true);
    if($('#goldFou').is(':checked')){
      $('#goldFou').prop('checked', false);
      $('#goldFou').prop('disabled', true);
      $('#attack').val(Number($('#attack').val())-1000);
    }
  }
});

$('#goldFou').on('change', function(){
  if($(this).is(':checked')){
    $('#attack').val(Number($('#attack').val())+1000);
  }
  else
    $('#attack').val(Number($('#attack').val())-1000);
});

$('#servant').on('change', function(){
  $('#grailed').prop('disabled', false);
  $('#npLevel').val(0).removeAttr('disabled','disabled');
  $('#ocLevel').val(0).attr('disabled','disabled');
  $('#goldFou').prop('checked', false);
  $('#goldFou').prop('disabled', true);
  $('#fou').prop('checked', false);
  $('#attack').val(0);
  $('#ocButton').prop('disabled', true);
  $('#ocButton').prop('checked', false);
  $('#npButton').prop('checked', false);
  $('#npButton').prop('disabled', true);
  $('#secondNP').prop('checked', false);
  $('#secondNP').prop('disabled', true);
  //$('#NPBuffs').val(0);
  $('#npupgraded').hide();
  $('#nonnpupgraded').hide();
  for (let i = 0; i < servantList.length; i++){
    if ( $('#servant').val() == servantList[i].id ){
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
        let oc = [0,0,0,0,0];

        // if (servantList[i].npupgrade == 1) {
          $('#npButton').prop('checked', false);
          $('#npButton').prop('disabled', false);
        // }

        if (servantList[i].secondupgrade) {
          $('#secondNP').prop('disabled', false);
        }

        if (servantList[i].npmultiplier){
          multi = servantList[i].npmultiplier.split(',');
        }

        $('#npButton').on('change', function(){
          if ($(this).is(':checked')){
            if (servantList[i].npupgrade) {
              $('#nonnpupgraded').hide();
              $('#npupgraded').show();
            }
            else if (servantList[i].npupgrade === 0){
              $('#nonnpupgraded').show();
              $('#npupgraded').hide();
            }
            multi = servantList[i].ugnpmultiplier.split(',');
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
          }
          else {
            if($('#secondNP').is(':checked')){
              $('#secondNP').prop('checked', false);
            }
            $('#npupgraded').hide();
            $('#nonnpupgraded').hide();
            multi = servantList[i].npmultiplier.split(',');
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
          }
        })

        $('#secondNP').on('change', function(){
          if($(this).is(':checked')){
            $('#nonnpupgraded').hide();
            $('#npupgraded').show();
            $('#npButton').prop('checked', true);
            multi = servantList[i].secondupgrade.split(',');
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
          }
          else{
            multi = servantList[i].ugnpmultiplier.split(',');
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
          }
        });

        if (servantList[i].overcharge){
          $('#ocButton').prop('disabled', false);
        }

        $('#ocButton').on('change', function(){
          if ($(this).is(':checked')){
            oc = servantList[i].overcharge.split(',');
            $('#ocLevel').val(0).removeAttr('disabled','disabled');
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
          }
          else {
            oc = [0,0,0,0,0];
            $('#ocLevel').val(0).attr('disabled','disabled');
            $('#ocLevel').val( Number(oc[0]) );
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()])));
          }
        })


        $('#NP').val( Number(multi[0]) );


        if ($('#grailed').is(':checked')){
          $('#attack').val( Number( attk[2]) );
        }
        else
          $('#attack').val( Number( attk[1]) );

        $('#grailed').on('change', function(){
          if ($(this).is(':checked')) {
            $('#goldFou').prop('checked', false);
            $('#goldFou').prop('disabled', true);
            $('#fou').prop('checked', false);
            $('#attack').val( Number(attk[2]) );
          }
          else {
            $('#goldFou').prop('checked', false);
            $('#goldFou').prop('disabled', true);
            $('#fou').prop('checked', false);
            $('#attack').val( Number(attk[1]) );
          }
        });

        $('#'+npcard).prop("checked", true).click();
        $('#npLevel').on('change', function(){
          $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
        });
        $('#ocLevel').on('change', function(){
          $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]) + Number(oc[$('#ocLevel').val()])));
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
                (1 + npspBuffs) * esAdvantage + flatAttack;

    $('#average').val(Math.round(total));
    $('#low').val(Math.round(0.9 * (total-flatAttack) + flatAttack));
    $('#high').val(Math.round(1.099 * (total-flatAttack) + flatAttack));
    $(window).scrollTop(0);
});

$('form').on('reset', function() {
  resetStuff();
  $('#low').val(0);
  $('#average').val(0);
  $('#high').val(0);
  $('#servant').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));
});

function resetStuff () {
  $('#npupgraded').hide();
  $('#nonnpupgraded').hide();
  $('#grailed').prop('disabled', true);
  $('#grailed').prop('checked', false);
  $('#fou').prop('checked', false);
  $('#goldFou').prop('checked', false);
  $('#goldFou').prop('disabled', true);
  $('#ocButton').prop('checked', false);
  $('#ocButton').prop('disabled', true);
  $('#npLevel').val(0).attr('disabled','disabled');
  $('#ocLevel').val(0).attr('disabled','disabled');
  $('#npButton').prop('checked', false);
  $('#npButton').prop('disabled', true);
  $('#secondNP').prop('checked', false);
  $('#secondNP').prop('disabled', true);
  $('#NP').val(0);
  $('#attack').val(0);
  $('#NPSPBuffs').val(0);
}

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
