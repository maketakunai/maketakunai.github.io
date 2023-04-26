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
  $('#level').val(1).attr('disabled','disabled');
  $('#attack').val(0);
  $('#npupgraded').hide();
  $('#nonnpupgraded').hide();
  $('#servant').empty().append($('<option></option>').val('Select Servant').html('Select Servant'));
  var matchVal = $("#servantClass option:selected").text();
  servantList.filter(function (serv) {
      if (serv.class.toLowerCase() == matchVal.toLowerCase().replace(/\s/g, '') && serv.np) {
          $("#servant").append($('<option></option>').val(serv.id).html(`${serv.name} [${serv.id}]`));
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
  $('#level').val(1).removeAttr('disabled','disabled');
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
  $('#npupgraded').hide();
  $('#nonnpupgraded').hide();
  for (let i = 0; i < servantList.length; i++){
    if ( $('#servant').val() == servantList[i].id ){
        let npcard = servantList[i].np[0][0];
        $('#'+npcard).prop("checked", true).click();
        $('#attack').val(servantList[i].attack[0])
        $('#level').on('change', function(){
          $('#attack').val(servantList[i].attack[$('#level').val()-1])
          $('#fou').prop('checked', false);
          $('#goldFou').prop('checked', false);
          $('#goldFou').prop('disabled', true);
        })
        let multi = [0,0,0,0,0];
        let oc = [0,0,0,0,0];

        if (servantList[i].np.length >= 1) {
          $('#npButton').prop('checked', false);
          $('#npButton').prop('disabled', false);
        }

        if (servantList[i].np.length == 3) {
          $('#secondNP').prop('disabled', false);
        }

        if (servantList[i].np){
          multi = servantList[i].np[0].slice(1);
        }

        $('#npLevel').on('change', function(){
          $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
        });
        $('#ocLevel').on('change', function(){
          $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
        });

        $('#npButton').on('change', function(){
          if ($(this).is(':checked')){
            if (servantList[i].np.length > 1) {
              $('#nonnpupgraded').hide();
              $('#npupgraded').show();
              multi = servantList[i].np[1].slice(1);
            }
            else if (servantList[i].np.length === 1){
              $('#nonnpupgraded').show();
              $('#npupgraded').hide();
              multi = projectedMultiplier(servantList[i].np[0]).slice(1)
            }

            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
          }
          else {
            if($('#secondNP').is(':checked')){
              $('#secondNP').prop('checked', false);
            }
            $('#npupgraded').hide();
            $('#nonnpupgraded').hide();
            multi = servantList[i].np[0].slice(1);
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
          }
        })

        $('#secondNP').on('change', function(){
          if($(this).is(':checked')){
            $('#nonnpupgraded').hide();
            $('#npupgraded').show();
            $('#npButton').prop('checked', true);
            multi = servantList[i].np[2].slice(1);
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
          }
          else{
            multi = servantList[i].np[1].slice(1);
            $('#NP').val( Math.round(Number( multi[$('#npLevel').val()]/10) + Number(oc[$('#ocLevel').val()])));
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


        $('#NP').val( Number(multi[0])/10 );


        // if ($('#grailed').is(':checked')){
        //   $('#attack').val( Number( attk[2]) );
        // }
        // else
        //   $('#attack').val( Number( attk[1]) );

        // $('#grailed').on('change', function(){
        //   if ($(this).is(':checked')) {
        //     $('#goldFou').prop('checked', false);
        //     $('#goldFou').prop('disabled', true);
        //     $('#fou').prop('checked', false);
        //     $('#attack').val( Number(attk[2]) );
        //   }
        //   else {
        //     $('#goldFou').prop('checked', false);
        //     $('#goldFou').prop('disabled', true);
        //     $('#fou').prop('checked', false);
        //     $('#attack').val( Number(attk[1]) );
        //   }
        // });
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
  $('#level').val(0).attr('disabled','disabled');
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
  else if ('beast'.indexOf(input.toLowerCase()) > -1){
    classVal = 1.0;
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

function projectedMultiplier(input) {
  if (input[0] == 'buster') {
    if (input[1] ==  3000) {
      return (["buster", 4000, 5000, 5500, 5750, 6000])
    }
    else if (input[1] == 6000) {
      return (["buster", 8000, 10000, 11000, 11500, 12000])
    }
  }
  else if (input[0] == 'arts') {
    if (input[1] ==  4500) {
      return (["arts", 6000, 7500, 8250, 8625, 9000])
    }
    else if (input[1] == 9000) {
      return (["arts", 12000, 15000, 16500, 17250, 18000])
    }
  }
  else if (input[0] == 'quick') {
    if (input[1] ==  6000) {
      return (["quick", 8000, 10000, 11000, 11500, 12000])
    }
    else if (input[1] == 12000) {
      return (["quick", 16000, 20000, 22000, 23000, 24000])
    }
  }
  return input
}