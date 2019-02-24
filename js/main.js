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
    $('#low').val(Math.round(0.9 * total));
    $('#high').val(Math.round(1.1 * total));

});

$('form').on('reset', function() {
  $('#low').val(0);
  $('#average').val(0);
  $('#high').val(0);
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
