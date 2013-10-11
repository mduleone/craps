/*
 modal.js
*/

$('#drawer').on('transitionend webkitTransitionEnd', function(){
    if($('#drawer').css('opacity') == "0"){
      $('#drawer').hide();
    }
  });
$('#betListBG').on('transitionend webkitTransitionEnd', function(){
    if($('#betListBG').css('opacity') == "0"){
      $('#betListBG').hide();
    }
  });

function openModal(){
  if(!GameState.tutorial){
    $('#modalScreen').show();
  }
  var _drawer = $('#drawer');
  _drawer.show();
  //_drawer.animate({left: ($('#board').width()*(0.98) - _drawer.width()), opacity: 1}, MODAL_FADE_INTERVAL);
  _drawer.addClass('show');
  _drawer.removeClass('hide');
  //resizeDrawer();
  if($('#colorScheme').val() == 5){
    $('#customColors').show();
    $('#customColors input').blur();
  } else {
    $('#customColors').hide();
  }
  PlayerManager.updatePlayerArea();
  _CRAPS.dealer.betManager.displayBets();
  //_CRAPS.dealer.betManager.displayBets();
  //$('#buffer').hide();
  //$('#betListing').hide();
  //setTimeout(function(){$('#buffer').show();$('#betListing').show()},1000);
}

function closeModal(){
  $('#boardColor').attr('value',  colors5.board      );
  $('#border').attr('value',      colors5.border     );
  $('#pointOff').attr('value',    colors5.pointOff   );
  $('#pointBorder').attr('value', colors5.pointBorder);
  $('#pointOn').attr('value',     colors5.pointOn    );
  $('#lines').attr('value',       colors5.lines      );
  $('#text').attr('value',        colors5.text       );
  $('#buttonText').attr('value',  colors5.buttonText );
  $('#specialText').attr('value', colors5.specialText);
  $('#finalText').attr('value',   colors5.finalText  );
  $('#dice').attr('value',        colors5.dice       );
  $('#dicePips').attr('value',    colors5.dicePips   );
  $('#betBorder').attr('value',   colors5.betBorder  );
  $('#betFill').attr('value',     colors5.betFill    );
  saveSettings();
  $('#colorScheme').val(localStorage['colors']);
  colors = eval("colors" + localStorage['colors']);
  //$('#drawer').animate({opacity: 0}, MODAL_FADE_INTERVAL, function(){$('#modalScreen').hide();$('#drawer').hide();});
  //$('#drawer').animate({left: ($('#board').offset().left + $('#board').width() + 2), opacity: 0}, MODAL_FADE_INTERVAL, function(){$('#drawer').hide();});
  $('#drawer').addClass('hide');
  $('#drawer').removeClass('show');
  //$('#drawer').hide();
  PlayerManager.updatePlayerArea();
  _CRAPS.dealer.betManager.displayBets();
  closeBets();
  closeSingle();
  closeBetResults();
}

function closeBets(){
  var betList = $('#betListBG');
  //betList.animate({left: '100%', opacity: 0}, MODAL_FADE_INTERVAL), function(){$('#betListBG').hide();};
  betList.addClass('hide');
  betList.removeClass('show');
  //betList.hide();
  $('#modalScreen').hide();
}

function closeSingle(){
  var betList = $('#singleBetListBG');
  //betList.animate({opacity: 0}, MODAL_FADE_INTERVAL, function(){$('#singleBetListBG').hide();});
  betList.addClass('close');
  betList.removeClass('open');
  betList.hide();
  $('#modalScreen').hide();
}

function openBets(){
  var betList = $('#betListBG');
  betList.show();
  betList.addClass('show');
  betList.removeClass('hide');
  //betList.animate({left: ($('#board').width()*(0.98) - betList.width()), opacity: 1}, MODAL_FADE_INTERVAL);
  $('#modalScreen').show();
  _CRAPS.dealer.betManager.displayBets();
  PlayerManager.updatePlayerArea();
}

function closeBetResults(){
  //$('#betResultsBG').animate({opacity: 0}, MODAL_FADE_INTERVAL, function(){$('#betResultsBG').hide();});
  $('#betResultsBG').addClass('close');
  $('#betResultsBG').removeClass('open');
  $('#betResultsBG').hide();
  $('#modalScreen').hide();
}

function openBetResults(){
  $('#modalScreen').show();
  $('#betResultsBG').show();
  //$('#betResultsBG').animate({opacity: 1}, MODAL_FADE_INTERVAL);
  $('#betResultsBG').addClass('open');
  $('#betResultsBG').removeClass('close');
}

function openGlossary(term){
  switch(term){
  case "button":
    $('#glossaryTerm').html('Button:');
    $('#glossaryDefinition').html('A circle disk on the table that either says "OFF" when there is no Point on, or says "ON" resting on top of a number in the Place Bets area, indicating that is the current Point.');
    break;
  case "point":
    $('#glossaryTerm').html('Point:');
    $('#glossaryDefinition').html('What ever number is "ON".');
    break;
  case "comeOut":
    $('#glossaryTerm').html('Come Out Roll:');
    $('#glossaryDefinition').html('A roll when there is no Point set.');
    break;
  case "345":
    $('#glossaryTerm').html('3x-4x-5x Odds:');
    $('#glossaryDefinition').html('Scheme to determine the multiplier on Odds bets, based on the Point.<br /> Points 4 &amp; 10 may bet at most 3 times the attached bet<br /> Points 5 &amp; 9 may bet at most 4 times the attached bet<br /> Points 6 &amp; 8 may bet at most 5 times the attached bet');
    break;
  case "sevenOut":
    $('#glossaryTerm').html('Seven Out:');
    $('#glossaryDefinition').html('Roll a 7 when there is a Point on, ends the roll');
    break;
  }
  $('#glossary').show();
  $('#glossaryScreen').show();
}

function closeGlossary(){
  $('#glossaryScreen').hide();
  $('#glossary').hide();
}

function clickModalButton(button){
  var modals = ['gameplay', 'rules', 'settings', 'tutorial', 'about'];
  var _drawer = $('#drawer');
  if(_drawer.css('visibility')== 'hidden' || _drawer.css('display') == 'none'){
    openModal();
  }
  modals.splice(modals.indexOf(button), 1);
  for(i in modals){
    $('#' + modals[i] + 'Button').removeClass('active');
    $('#' + modals[i]).hide();
  }
  $('#' + button + 'Button').addClass('active');
  $('#' + button).show();
  //resizeDrawer();
  if($('#colorScheme').val() == 5){
    $('#customColors').show();
    $('#customColors input').blur();
  } else {
    $('#customColors').hide();
  }
  if(button == 'tutorial'){
    updateTutorial();
  }
}

function clickRulesButton(button){
  var modals = ['standard', 'multi', 'single', 'fire'];
  var _drawer = $('#drawer');
  modals.splice(modals.indexOf(button), 1);
  for(i in modals){
    $('#' + modals[i] + 'Button').removeClass('active');
    $('#' + modals[i]).hide();
  }
  $('#' + button + 'Button').addClass('active');
  $('#' + button).show();
  //resizeDrawer();
  if($('#colorScheme').val() == 5){
    $('#customColors').show();
    $('#customColors input').blur();
  } else {
    $('#customColors').hide();
  }
}

function resizeDrawer(){
  var _drawer = $('#drawer');
  var hidden = (_drawer.css('visibility')== 'hidden' || _drawer.css('display') == 'none')
  if(hidden){
    _drawer.show();
  }
  _drawer.width($('#gameplayButton').width() + 
            $('#rulesButton').width() + 
            $('#settingsButton').width() + 
            $('#tutorialButton').width() + 
            $('#aboutButton').width() + 
            115);
  /*
  $('#drawerWindow').height(_drawer.height() - _drawer.height()*(0.005) - $('#board').height()*(0.02) - 35);
  var rules = $('#rules');
  var rulesHidden = (rules.css('visibility')== 'hidden' || rules.css('display') == 'none')
  if(rulesHidden){
    rules.show();
  }
  rules.height($('#drawerWindow').height()*(0.98));
  rules.width($('#drawerWindow').width()*(0.98));
  var standard = $('#standard');
  var standardHidden = (standard.css('visibility')== 'hidden' || standard.css('display') == 'none');
  var multi = $('#multi');
  var multiHidden = (multi.css('visibility')== 'hidden' || multi.css('display') == 'none');
  var single = $('#single');
  var singleHidden = (single.css('visibility')== 'hidden' || single.css('display') == 'none');
  var fire = $('#fire');
  var fireHidden = (fire.css('visibility')== 'hidden' || fire.css('display') == 'none');
  if(standardHidden){
    standard.show();
  }
  if(multiHidden){
    multi.show();
  }
  if(singleHidden){
    single.show();
  }
  if(fireHidden){
    fire.show();
  }
  standard.width($('#rules').width()*(0.98));
  multi.width($('#rules').width()*(0.98));
  single.width($('#rules').width()*(0.98));
  fire.width($('#rules').width()*(0.98));
  standard.height($('#rules').height()*(0.98) - 25);
  multi.height($('#rules').height()*(0.98) - 25);
  single.height($('#rules').height()*(0.98) - 25);
  fire.height($('#rules').height()*(0.98) - 25);
  if(standardHidden){
    standard.show();
  }
  if(multiHidden){
    multi.hide();
  }
  if(singleHidden){
    single.hide();
  }
  if(fireHidden){
    fire.hide();
  }
  if(rulesHidden){
    rules.hide();
  }
  if(hidden){
    _drawer.hide();
  }
  if(!hidden){
    _drawer.css({left: ($('#board').width()*(0.98) - _drawer.width())});
  }
  */
}

function updateColors(){
  if($('#colorScheme').val() == 5){
    $('#customColors input').blur();
    $('#boardColor').attr('value', (colors5.board.slice(1,1) == "#")?colors5.board.slice(1):colors5.board);
    $('#border').attr('value', (colors5.border.slice(1,1) == "#")?colors5.border.slice(1):colors5.border);
    $('#pointOff').attr('value', (colors5.pointOff.slice(1,1) == "#")?colors5.pointOff.slice(1):colors5.pointOff);
    $('#pointBorder').attr('value', (colors5.pointBorder.slice(1,1) == "#")?colors5.pointBorder.slice(1):colors5.pointBorder);
    $('#pointOn').attr('value', (colors5.pointOn.slice(1,1) == "#")?colors5.pointOn.slice(1):colors5.pointOn);
    $('#lines').attr('value', (colors5.lines.slice(1,1) == "#")?colors5.lines.slice(1):colors5.lines);
    $('#text').attr('value', (colors5.text.slice(1,1) == "#")?colors5.text.slice(1):colors5.text);
    $('#buttonText').attr('value', (colors5.buttonText.slice(1,1) == "#")?colors5.buttonText.slice(1):colors5.buttonText);
    $('#specialText').attr('value', (colors5.specialText.slice(1,1) == "#")?colors5.specialText.slice(1):colors5.specialText);
    $('#finalText').attr('value', (colors5.finalText.slice(1,1) == "#")?colors5.finalText.slice(1):colors5.finalText);
    $('#dice').attr('value', (colors5.dice.slice(1,1) == "#")?colors5.dice.slice(1):colors5.dice);
    $('#dicePips').attr('value', (colors5.dicePips.slice(1,1) == "#")?colors5.dicePips.slice(1):colors5.dicePips);
    $('#betBorder').attr('value', (colors5.betBorder.slice(1,1) == "#")?colors5.betBorder.slice(1):colors5.betBorder);
    $('#betFill').attr('value', (colors5.betFill.slice(1,1) == "#")?colors5.betFill.slice(1):colors5.betFill);
    $('#customColors').show();
  } else {
    $('#customColors').hide();
  }
  //resizeDrawer();
  colors = eval("colors" + $('#colorScheme').val());
  draw(Board);
}

function resetColors(){
  $.extend(colors5, colors0);
  $('#betBorder').attr('value', colors5.betBorder);
  $('#boardColor').attr('value', colors5.board);
  $('#border').attr('value', colors5.border);
  $('#pointOff').attr('value', colors5.pointOff);
  $('#pointBorder').attr('value', colors5.pointBorder);
  $('#pointOn').attr('value', colors5.pointOn);
  $('#lines').attr('value', colors5.lines);
  $('#text').attr('value', colors5.text);
  $('#buttonText').attr('value', colors5.buttonText);
  $('#specialText').attr('value', colors5.specialText);
  $('#finalText').attr('value', colors5.finalText);
  $('#dice').attr('value', colors5.dice);
  $('#dicePips').attr('value', colors5.dicePips);
  $('#betFill').attr('value', colors5.betFill);
}

function saveSettings(){
  if(!isNaN(parseInt($('#startingBank').val()))){
    initBank = parseInt($('#startingBank').val());
    MODAL_FADE_INTERVAL = isNaN(parseInt($('#modalTiming').val()))?0:parseInt($('#modalTiming').val());
    BET_FORM_FADE_OUT = isNaN(parseInt($('#betFormTiming').val()))?0:parseInt($('#betFormTiming').val());
    DICE_ROLL = isNaN(parseInt($('#diceTiming').val()))?1000:parseInt($('#diceTiming').val());
    colors5.betBorder = $('#betBorder').attr('value');
    colors5.board = $('#boardColor').attr('value');
    colors5.border = $('#border').attr('value');
    colors5.pointOff = $('#pointOff').attr('value');
    colors5.pointBorder = $('#pointBorder').attr('value');
    colors5.pointOn = $('#pointOn').attr('value');
    colors5.lines = $('#lines').attr('value');
    colors5.text = $('#text').attr('value');
    colors5.buttonText = $('#buttonText').attr('value');
    colors5.specialText = $('#specialText').attr('value');
    colors5.finalText = $('#finalText').attr('value');
    colors5.dice = $('#dice').attr('value');
    colors5.dicePips = $('#dicePips').attr('value');
    colors5.betFill = $('#betFill').attr('value');
    PlayerManager.updatePlayerArea();
  } else {
    alert('Please enter a number as the initial bank!');
  }
}

function updateTutorial(){
  var _bets = _CRAPS.dealer.betManager.bets;
  if(!GameState.tutorial){
    $('#tutorialDescription').html("This tutorial will teach you how to place a Pass Line bet, as well as a Pass Line Odds bet and walk you through a Pass Line bet sequence.<br /><br />The Pass Line bet is the traditional/standard bet in Craps, and the one that most people think of when they think of Craps.<br /><br />While you are completing the tutorial, this window will describe what is happening, but you can close this window with the 'Close' button below to see your bets. To open this window again, click the 'Tutorial' button.<br /><br />Starting the tutorial will remove all your bets and reset the game.<br /><br />To start the tutorial, click 'Start Tutorial'.");
    //$('#tutorialInstruction').html('');
  }else if(GameState.tutorialState == 0 && _bets.length == 0){
    $('#tutorialBG').addClass('one');
    $('#glossary').removeClass('one two three four five six');
    $('#glossary').addClass('one');
    //setTimeout(function(){$('#tutorialWindow').height($('#tutorialBG').height() - 35);}, 501);
    if($('#tutorialBG').hasClass('two')){
      $('#glossary').removeClass('one two three four five six');
      $('#glossary').addClass('two');
      $('#tutorialDescription').html('Create a Pass Line bet by clicking "Create Bet". $100 is a good amount to bet.');
    } else {
      $('#tutorialDescription').html('To start, notice that the <span class="keyword" onclick="openGlossary(\'button\')" title="Point Indicator">button</span> says "Off". This means the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is off. You can only place a Pass Line bet when the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is off. You may now place a Pass Line bet.<br /><br />Touch the Pass Line.');
    }
    //$('#tutorialInstruction').html('Click the Pass Line');
  }else if(GameState.tutorialState == 0 && _bets.length == 1){
    $('#tutorialBG').addClass('three');
    $('#glossary').removeClass('one two three four five six');
    $('#glossary').addClass('three');
    $('#tutorialDescription').html('You\'ve now created a Pass Line bet! Roll the dice, and let\'s see what happens on your <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>!');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 1){
    $('#tutorialDescription').html('You rolled a 7! You win on the Pass Line <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>!<br /><br />You have another <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>, roll again!');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 2){
    $('#tutorialDescription').html('You rolled a 3! You lose on the Pass Line <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>, but your roll isn\'t over! When you lose the Pass Line bet on a <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>, it is automatically rebet.<br /><br />You have another <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span>, roll again!');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 3 && _bets.length == 1){
    $('#tutorialBG').addClass('four');
    $('#glossary').removeClass('one two three four five six');
    $('#glossary').addClass('four');
    if($('#tutorialBG').hasClass('five')){
      $('#glossary').removeClass('one two three four five six');
      $('#glossary').addClass('five');
      $('#tutorialDescription').html('This is a <span class="keyword" onclick="openGlossary(\'345\')" title="Determines the multiplier on Odds bets, based on the Point">3x-4x-5x Odds</span> table, so for a <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> of 8, you can bet a maximum of 5 times your Pass Line bet. Create a Pass Line Odds bet for $' + (_CRAPS.dealer.betManager.bets[0].bet.value * 5) + '. Create a Pass Line Odds bet by using the slider and clicking "Create Bet".');
    }else{
      $('#tutorialDescription').html('You rolled an 8! A <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is now set. Because a <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is set and you have a Pass Line bet on the table, you can now create a Pass Line Odds bet! You want to create a Pass Line Odds bet because the Pass Line bet only pays out 1 to 1, but Pass Line Odds bets pay out at better odds.<br /><br />Click the Pass Line to create a Pass Line Odds bet!');
    }
    //$('#tutorialInstruction').html('Click the Pass Line');
  }else if(GameState.tutorialState == 3 && _bets.length == 2){
    $('#tutorialBG').addClass('six');
    $('#glossary').removeClass('one two three four five six');
    $('#glossary').addClass('six');
    $('#tutorialDescription').html('You\'ve now created a Pass Line Odds bet! It\'s time to roll the dice again! You will roll until you roll the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> (an 8) or a 7.');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 4){
    $('#tutorialDescription').html('You rolled an 8! You won your Pass Line and Pass Line Odds bets by rolling the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span>!<br /><br />The <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is off, and you are on a <span class="keyword" onclick="openGlossary(\'comeOut\')" title="A roll when there is no Point set">come out roll</span> again! Roll the dice!');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 5){
    $('#tutorialDescription').html('You rolled a 5! A <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> is now set. Because this is a tutorial, let\'s not bet Pass Line Odds, since you already know how to do that!<br /><br />Roll the dice! You will roll until you roll the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> or a 7.');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 6){
    $('#tutorialDescription').html('You rolled a 9! Since it is neither the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> nor a 7, you get to keep rolling!<br /><br />Roll the dice! You will roll until you roll the <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> or a 7.');
    //$('#tutorialInstruction').html('Click Roll');
  }else if(GameState.tutorialState == 7){
    $('#tutorialDescription').html('<span class="keyword" onclick="openGlossary(\'sevenOut\')" title="Roll a 7 when there is a Point on, ends the roll">Seven Out</span>! You rolled a 7 with a <span class="keyword" onclick="openGlossary(\'point\')" title="Roll Objective">Point</span> on, so you lose your Pass Line bet, and would have lost a Pass Line Odds bet if you had one.<br /><br />That\'s how Pass Line and Pass Line Odds bets work!<br /><br />This tutorial is over. Click "Close Tutorial" to return to the normal game. You will not be able to play until you close the tutorial.');
    //$('#tutorialInstruction').html('Seven Out! Click "Close Tutorial".');
  }
}

function startTutorial(){
  //$('#closeTutorial').show();
  //$('#tutorialInstruction').show();
  //$('#startTutorial').hide();
  //$('#modalScreen').hide();
  closeModal();
  GameState.tutorial = true;
  GameState.tutorialState = -1;
  
  //reset Bets
  reset();
  GameState.tutorialState = 0;
  
  //reset Game
  nextBetId = 1;
  GameState.point = null;
  for(i in GameState.fireArray){
    GameState.fireArray[i] = false;
  }
  PlayerManager.updatePlayerArea();
  
  updateTutorial();
}

function closeTutorial(){
  GameState.tutorial = false;
  $('#tutorialBG').removeClass('one two three four five six');
  //$('#startTutorial').show();
  //$('#closeTutorial').hide();
  //$('#tutorialInstruction').hide();
  updateTutorial();
}
