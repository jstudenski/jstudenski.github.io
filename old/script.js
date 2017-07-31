// store.storeNumber
// store.city 
// store.manager
    
$(document).ready(function(){

  var counterLength = 0;  // Lenght of the counter defined by user
  var standardCounterSet = 25;  // Standard Counter Set
  var cashAndGaps;  // Cash and Gaps in ft

  var actualRegisters = 0;
  var futureRegisters = 0;

  var registerCount = 0;

  var adaOption = 0;
  var bcOption = 1;
  var adaBcOptions;             // ADA & BC Oprions (1 or 2)
  var repeatRegisters;         

  var threeRepeat;
  var threeEnd;
  var fourRepeat;
  var fourEnd;
  var fiveRepeat;
  var fiveEnd;
  var sixRepeat;
  var sixEnd;

  var threeTotal;
  var fourTotal;
  var fiveTotal;
  var sixTotal;

  var totalFeet;
  var endTotal;
  var totalRegisters;

  var toalGap;

  var endGapCounter = 0;

  var designStudio = 0;
  var bcExtension = 0;
  var bsExtension = 0;

  var totalZero;

  var lozierFour = 0;  // Number of 4ft Lozier Sections
  var lozierThree = 0; // Number of 3ft Lozier Sections
  var lozierTwo = 0;   // Number of 2ft Lozier Sections
  
  var fiveGap = 0;
  var eightGap = 0;
  var fourGapEnd = 0;
  var fiveGapEnd = 0;
  var sixGapEnd = 0;
  var sevenGapEnd = 0;
  var eightGapEnd = 0;

  var registerTotalCost = 0;
  var lozierTotal = 0;

  leftRight();
  cashAndRepeat();    
  mainFunction();
  makeDiagram();

  // Log Store 
  $('.nav').click(function() {
    console.log(store);
    console.log(counterLength);
  });


  var counterSpec = {  
    storeNumber: "123",
    city: "Minneapolis",
    manager: "",
  }; 
  

 $("#storenumberinput").val(counterSpec.storeNumber);
 $("#cityinput").val(counterSpec.city);
 $("#manager").val(counterSpec.manager);

// Store Number
  $('#storenumberinput').keyup(function(){
    counterSpec.storeNumber = $(this).val();
    
    // Update Titles
    document.getElementById('storenum1').innerHTML = document.getElementById('storenumberinput').value + '&ensp;-';
    document.getElementById('storenum2').innerHTML = document.getElementById('storenumberinput').value + '&ensp;-';
    document.getElementById('storenum3').innerHTML = document.getElementById('storenumberinput').value + '&ensp;-';
  });

  // Store City 
  $('#cityinput').keyup(function(){
     counterSpec.city = $(this).val();
  });

  // Store Manager
  $('#manager').change(function() {
    store.manager = $(this).val();
  });


  // do these things if any button with the class of button is pressed 
  $(document).on("click keyup change", ".button, .input, .dropdown", function () {
      mainFunction();
  });


// Counter Length input & Counter Height Toggle Switch & Register input
  $('.counterlength').keyup(function() {
    counterLength = +$(this).val();
    cashAndRepeat();
    mainFunction();
  });

  $('#height-switch').click(function() {
    if(document.getElementById('height-low').checked) {
      standardCounterSet = 25
      adaOption = 0
      bcOption = 1
    } else if (document.getElementById('height-high').checked) {
      standardCounterSet = 30
      adaOption = 1
      bcOption = 1   
    }
    $("#adabcoptions").val(adaOption + bcOption);
    $("#standardcounterset").val(standardCounterSet);
    cashAndRepeat();
    mainFunction();
  });

  $('.actualregisters, .futureregisters').keyup(function() {
    actualRegisters = +$(".actualregisters").val();
    futureRegisters = +$(".futureregisters").val();
    cashAndRepeat();
  });


  function cashAndRepeat() {
    repeatRegisters = (actualRegisters + futureRegisters) - (adaOption + bcOption);
    cashAndGaps = counterLength - standardCounterSet;
    $(".cashandgaps").val(cashAndGaps);
    $(".repeatregisters").val(repeatRegisters);
  }

// Counter Length Bar
  function counterLengthBar(){
    if (counterLength > 0) {
      counterlength.style.width = counterLength * 12 + 'px';  
      counterlength_a.style.width = counterLength * 12 + 'px';                 
      $("#counterlength").html(counterLength);   
      // Reset Counter Width
      counterlength_b.style.width = 0
      if (totalZero < 0) {  // If the counter is too long
        counterlength_b.style.width = Math.abs(totalZero) * 12 + 'px';              
      } 
    }
  }



// Left Right Switch
  $('#lr-switch').click(function() {
    leftRight();
  });

  function leftRight() {
    if(document.getElementById('lr-left').checked) { // Left Store
        // Left Store - Reverse diagram div order 
         $('.diagram > div').each(function() {      
            $(this).prependTo(this.parentNode);
         });
        // Left Store - Reverse Counter Length Bar div order 
         $('#counterlengthbar > div').each(function() {      
            $(this).prependTo(this.parentNode);
         });
        // Starter Kit Lozier Diagram
        // 5ft Return
        if(document.getElementById('return-5').checked) { 
          $("#starter-kit-fixture").html('<img src="sprites/counter_start_l_fixture.svg" width="50px">' + '<p>4\'</p>');
        // 4ft Return
        } else if(document.getElementById('return-4').checked) {
          $("#starter-kit-fixture").html('<img src="sprites/counter_start_l_fixture_50.svg" width="50px">' + '<p>4\'</p>');
        }
        // Starter Kit - Left Store
        // 5ft Return
        if(document.getElementById('return-5').checked) { 
          // No End Filler 
          if(document.getElementById('endfiller-no').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_l_noclose.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          // Yes End Filler   
          } else if (document.getElementById('endfiller-yes').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_l.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          }
        // 4ft Return    
        } else if(document.getElementById('return-4').checked) {
          // No End Filler 
          if(document.getElementById('endfiller-no').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_l_noclose_50.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          // Yes End Filler   
          } else if (document.getElementById('endfiller-yes').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_l_50.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          }
        }

        $("#bc_a").html('<img src="sprites/counter_blue_a_l_new.svg" width="50px"><p>' + 'Counter' + '</p>'); 
   
        document.getElementById('diagram-1').style.borderLeft = "1px solid #888";
        document.getElementById('diagram-2').style.borderLeft = "1px solid #888";
        document.getElementById('diagram-1').style.borderRight = "";
        document.getElementById('diagram-2').style.borderRight = "";

    }else if(document.getElementById('lr-right').checked) { // Right Store
        // Starter Kit Lozier Diagram
        // 5ft Return
        if(document.getElementById('return-5').checked) { 
          $("#starter-kit-fixture").html('<img src="sprites/counter_start_r_fixture.svg" width="50px">' + '<p>4\'</p>');
        // 4ft Return
        } else if(document.getElementById('return-4').checked) {
          $("#starter-kit-fixture").html('<img src="sprites/counter_start_r_fixture_50.svg" width="50px">' + '<p>4\'</p>');
        }

        // Starter Kit - Right Store
        // 5ft Return
        if(document.getElementById('return-5').checked) { 
          // No End Filler 
          if(document.getElementById('endfiller-no').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_r_noclose.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          // Yes End Filler   
          } else if (document.getElementById('endfiller-yes').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_r.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          }
        // 4ft Return    
        } else if(document.getElementById('return-4').checked) {
          // No End Filler 
          if(document.getElementById('endfiller-no').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_r_noclose_50.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          // Yes End Filler   
          } else if (document.getElementById('endfiller-yes').checked) {
            $("#starter-kit").html('<img src="sprites/counter_start_r_50.svg" width="50px">' + '<p>Starter <br> Kit </p>');
          }
        }

        $("#bc_a").html('<img src="sprites/counter_blue_a_r.svg" width="50px"><p>' + 'Balloon' + '</p>'); 

        document.getElementById('diagram-1').style.borderRight = "1px solid #888";
        document.getElementById('diagram-2').style.borderRight = "1px solid #888";
        document.getElementById('diagram-1').style.borderLeft = "";
        document.getElementById('diagram-2').style.borderLeft = "";
    }
    makeDiagram();
    generatecounterParts()
  }

// Design Studio 2015 
  $('#ds15-switch').click(function() {
    if(document.getElementById('ds15-no').checked) {
      $(".remove").removeClass("hide");
    }else if(document.getElementById('ds15-yes').checked) {  
      $(".remove").addClass("hide");
      document.getElementById("dstud-no").checked = true;
      document.getElementById("bsext-no").checked = true;
      dstud();
      bsext();
    }
    mainFunction();
  });

// Return Counter Switch
  $('#return-switch').click(function() {
    if(document.getElementById('return-5').checked) {
      $('.diagram').height('120px');
    } else if (document.getElementById('return-4').checked) {  
      $('.diagram').height('108px');
    }
    mainFunction();
    leftRight();
  });

// Gap Counter
  $('#endgapcounter_dropdown').change(function() {
    endgapcounter();
  });

  // Click to Remove End Gap Counter
  $("#gap").click(function() {
    $(".endgapcounter").val(0);
    document.getElementById('endgapcounter_dropdown').selectedIndex = 1;
    $("#gap").html('');
    endgapcounter();
  });

  $("#remain").click(function() {
    if (totalZero >= 4) {
      if (totalZero <= 16) {
        document.getElementById('endgapcounter_dropdown').selectedIndex = (totalZero - 2);
        console.log(totalZero)
        endgapcounter();
      }
    }
  });

  function endgapcounter() {
    fiveGap = 0;
    eightGap = 0;
    fourGapEnd = 0;
    fiveGapEnd = 0;
    sixGapEnd = 0;
    sevenGapEnd = 0;
    eightGapEnd = 0;
    if (document.getElementById("endgapcounter_dropdown").value == "4") {
        $(".endgapcounter").val(4);
        fourGapEnd = 1;       
    } else if (document.getElementById("endgapcounter_dropdown").value == "5") {
        $(".endgapcounter").val(5);
        fiveGapEnd = 1;        
    } else if (document.getElementById("endgapcounter_dropdown").value == "6") {
        $(".endgapcounter").val(6);
        sixGapEnd = 1;      
    } else if (document.getElementById("endgapcounter_dropdown").value == "7") {
        $(".endgapcounter").val(7);
        sevenGapEnd = 1;    
    } else if (document.getElementById("endgapcounter_dropdown").value == "8") {
        $(".endgapcounter").val(8);
        eightGapEnd = 1;    
    } else if (document.getElementById("endgapcounter_dropdown").value == "9") {
        $(".endgapcounter").val(9);
        fiveGap = 1;
        fourGapEnd = 1;
    } else if (document.getElementById("endgapcounter_dropdown").value == "10") {
        $(".endgapcounter").val(10);
        fiveGap = 1;         
        fiveGapEnd = 1;
    } else if (document.getElementById("endgapcounter_dropdown").value == "11") {
        $(".endgapcounter").val(11);
        fiveGap = 1;  
        sixGapEnd = 1;
    } else if (document.getElementById("endgapcounter_dropdown").value == "12") {
        $(".endgapcounter").val(12);
        eightGap = 1;
        fourGapEnd = 1;     
    } else if (document.getElementById("endgapcounter_dropdown").value == "13") {
        $(".endgapcounter").val(13);
        eightGap = 1;
        fiveGapEnd = 1;      
    } else if (document.getElementById("endgapcounter_dropdown").value == "14") {
        $(".endgapcounter").val(14);
        eightGap = 1;
        sixGapEnd = 1;
    } else if (document.getElementById("endgapcounter_dropdown").value == "15") {
        $(".endgapcounter").val(15);
        eightGap = 1;
        sevenGapEnd = 1;      
    } else if (document.getElementById("endgapcounter_dropdown").value == "16") {
        $(".endgapcounter").val(16);
        eightGap = 1;
        eightGapEnd = 1;    
    } else if (document.getElementById("endgapcounter_dropdown").value == "0") {
        $(".endgapcounter").val(0);
    }
    endGapCounter = +$(".endgapcounter").val();
    mainFunction();
   }   
// End - Gap Counter

// 4ft Balloon Counter Extension
  $('#bcextension-switch').click(function() {
    bcext();
  });
  // Click to Add Blue BC Extension (Both Sections)
  $("#bc_a, #bc_c").click(function() {
    document.getElementById("bcext-yes").checked = true;
    bcext();
  });
  // Click to Remove Blue BC Extension (Middle Section)
  $("#bcext").click(function() {
    document.getElementById("bcext-no").checked = true;
    bcext(); 
  });

  function bcext() {
    if(document.getElementById('bcext-no').checked) {
      bcExtension = 0;
      $(".bcextension").val(0);
      document.getElementById('bcext_fixtures').style.width = "0px"; // Safari Fix
    } else if (document.getElementById('bcext-yes').checked) {
      bcExtension = 1;
      $(".bcextension").val(4);
      document.getElementById('bcext_fixtures').style.width = "48px"; // Safari Fix
    }
    mainFunction();  
  }
// End 4ft Balloon Counter Extension

// 4ft Balloon Service Extension
  $('#bsextension-switch').click(function() {
      bsext();
  });
  // Click to Add BS Extension
  $("#bs").click(function() {
    if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio 
      document.getElementById("bsext-yes").checked = true;
      bsext();
    }
  });
  // Click to Remove BS Extension
  $("#bsext").click(function() {
    document.getElementById("bsext-no").checked = true;
    bsext();
  });

  function bsext() {
    if(document.getElementById('bsext-no').checked) {
       bsExtension = 0;
       $(".bsextension").val(0);
      document.getElementById('bsext_fixtures').style.width = "0px"; // Safari Fix       
    } else if (document.getElementById('bsext-yes').checked) {
       bsExtension = 1;
       $(".bsextension").val(4);
      document.getElementById('bsext_fixtures').style.width = "48px"; // Safari Fix       
    }
    mainFunction();  
  }
// End 4ft Balloon Service Extension

// Design Studio
  $('#dstud-switch').click(function() {
    dstud();
  });

  // Click to Remove Design Studio
  $("#designstudio").click(function() {
    document.getElementById("dstud-no").checked = true;
    dstud();
  });

  function dstud() {
    if(document.getElementById('dstud-no').checked) {
       designStudio = 0;
       $(".designstudio").val(0);
       document.getElementById('designstudio_fixtures').style.width = "0px"; // Safari Fix  
    } else if (document.getElementById('dstud-yes').checked) {
       designStudio = 1;
       $(".designstudio").val(8);
      document.getElementById('designstudio_fixtures').style.width = "96px"; // Safari Fix  
    }
    mainFunction();
  }
// End Design Studio

// End Filler Pannel Switch
  $('#endfiller-switch').click(function() {
    // Re-generate the parts list (add end filler and remove blind corner panel)
    generatecounterParts();
    // Change the .svg graphic
    leftRight();
  });


$('#threeAdd').click(function(){
    threeRepeat = +$(".threerepeat").val();
    threeRepeat += 1;
    $(".threerepeat").val(threeRepeat);
    repeatArea();
    mainFunction();
});

$('#threeRemove').click(function(){
  if (threeRepeat + threeEnd > 0) {
    threeRepeat = +$(".threerepeat").val();
    threeRepeat -= 1;
    $(".threerepeat").val(threeRepeat);
    mainFunction();
  }
});

$('#fourAdd').click(function(){
    fourRepeat = +$(".fourrepeat").val();
    fourRepeat += 1;
    $(".fourrepeat").val(fourRepeat);
    mainFunction();
});
$('#fourRemove').click(function(){
  if (fourRepeat + fourEnd > 0) {
    fourRepeat = +$(".fourrepeat").val();
    fourRepeat -= 1;
    $(".fourrepeat").val(fourRepeat);
    mainFunction();
  }
});

$('#fiveAdd').click(function(){
    fiveRepeat = +$(".fiverepeat").val();
    fiveRepeat += 1;
    $(".fiverepeat").val(fiveRepeat);
    mainFunction();
});

$('#fiveRemove').click(function(){
  if (fiveRepeat + fiveEnd > 0) {
    fiveRepeat = +$(".fiverepeat").val();
    fiveRepeat -= 1;
    $(".fiverepeat").val(fiveRepeat);
    mainFunction();
  }
});

$('#sixAdd').click(function(){
    sixRepeat = +$(".sixrepeat").val();
    sixRepeat += 1;
    $(".sixrepeat").val(sixRepeat);
    mainFunction();
});
$('#sixRemove').click(function(){
  if (sixRepeat + sixEnd > 0) {
    sixRepeat = +$(".sixrepeat").val();
    sixRepeat -= 1;
    $(".sixrepeat").val(sixRepeat);
    mainFunction();
  }
});

$('.threerepeat, .fourrepeat, .fiverepeat, .sixrepeat').keyup(function() {

    mainFunction();
});


function repeatArea() {
    threeRepeat = +$(".threerepeat").val();
    fourRepeat = +$(".fourrepeat").val();
    fiveRepeat = +$(".fiverepeat").val();
    sixRepeat = +$(".sixrepeat").val(); 
    totalFeet = (threeRepeat * 3.5) + (fourRepeat * 4) + (fiveRepeat * 5) + (sixRepeat * 6)
    $(".totalfeet").val(totalFeet); 
    // Calculate Total Gap (After Cash Repeat)
    totalGap = cashAndGaps - totalFeet;
    $(".totalgap").val(totalGap);
    // Calculate total register sections (including ends)
    totalRegisters = threeRepeat + fourRepeat + fiveRepeat + sixRepeat
}


function mainFunction() {

    repeatArea();

    totalZero = totalGap - endGapCounter - (designStudio * 8) - (bcExtension * 4) - (bsExtension * 4)
    $(".totalzero").val(totalZero);


    // If total is zero, make background green, if below zero, make background red

    if (totalZero == 0) {
        $(".totalzero").addClass('green');
    } else {
        $(".totalzero").removeClass('green');
    }

    // If the register count is correct, make background green
    if (repeatRegisters == totalRegisters) {
        $(".repeatregisters").addClass('green');
    } else {
        $(".repeatregisters").removeClass('green');
    }

    // 3' 6" Sections must come in 2s
    if (threeRepeat % 2 !== 0) {
        $(".threerepeat").addClass("alert");
    } else {
        $(".threerepeat").removeClass("alert");      
    }

    counterLengthBar();

    // Set repeat area width
    if (totalZero > 0) {
      remain.style.width = totalZero * 12 + 'px'; 
      remain_fixtures.style.width = totalZero * 12 + 'px';      
      $("#remain").html('<p>' + totalZero + '</p>');           
    } else {
      remain.style.width = '0px'; 
      remain_fixtures.style.width = '0px';               
      $("#remain").html('');   
    }

    // If there is no Gap Counter, make the last repeat and end 
    threeEnd = 0;
    fourEnd = 0;
    fiveEnd = 0;
    sixEnd = 0;

    if (document.getElementById("endgapcounter_dropdown").value == "0") {

      if (threeRepeat > 0) {
          threeEnd = 1;
          threeRepeat -= 1;
      } else if (fourRepeat > 0) {
          fourEnd = 1;
          fourRepeat -= 1;            
      } else if (fiveRepeat > 0) {
          fiveEnd = 1;
          fiveRepeat -= 1;              
      } else if (sixRepeat > 0) {
          sixEnd = 1;
          sixRepeat -= 1;
      }
      
    }


       makeDiagram();  // Generate Diagrams

        // Click 'Repeat Registers' to remove them 
        // Click to remove 3.5ft counters 
        $('.three').click(function() {
            if (threeEnd != 1) {
                 threeRepeat -= 1;
             }
            $(".threerepeat").val(threeRepeat);
            mainFunction();
        });
        // Click to remove 4ft counters 
        $('.four').click(function() { 
             if (fourEnd != 1) {
                fourRepeat -= 1;
            }
            $(".fourrepeat").val(fourRepeat);
            mainFunction();
        });
        // Click to remove 5ft counters 
        $('.five').click(function() {
            if (fiveEnd != 1) {
               fiveRepeat -= 1;
            }
            $(".fiverepeat").val(fiveRepeat); 
            mainFunction();
        });
        // Click to remove 6ft counters 
       $('.six').click(function() {
            if (sixEnd != 1) {
              sixRepeat -= 1;
            }
            $(".sixrepeat").val(sixRepeat);
            mainFunction();
        });

       generatelozierParts();  // Generate Lozier Table
       generatecounterParts(); // Generate Counter Table
} ////////////////////////// End of mainFunction //////////////////////////



 var windowcloseoff = 0;

  $('#windowcloseoff').keyup(function() {
   windowcloseoff = +$(".windowcloseoff").val(); 
   generatecounterParts();
  });




// Figure out how many Lozier sections are needed (and which sizes)
function lozierSections(x) { // x = Cash Repeat + Gap Counter
  if (x % 4 == 0) {           // All 4ft
    lozierFour = Math.floor(x/4);
    lozierThree = 0;  
    lozierTwo = 0;                
  } else if (x % 4 == 3) {    // One 3ft
    lozierFour = Math.floor(x/4);
    lozierThree = 1;
    lozierTwo = 0;
  } else if (x % 4 == 2) {    // One 2ft
    lozierFour = Math.floor(x/4);
    lozierThree = 0;        
    lozierTwo = 1;
  } else if (x % 4 == 1) {    // One Less 4ft, One 3ft, One 2ft
    lozierFour = Math.floor(x/4) - 1;
    lozierThree = 1;
    lozierTwo = 1;
  }    
}

// Populate Diagram fomr Variables with corresponing sprites
function populateDiagram(id, val, sprite) {
   for(var i = 0; i < val; i++) {
       $(id).append(sprite);   
   }
}



function makeDiagram() {
  // Figure out how many Lozier sections are needed (and which sizes)
  lozierSections(totalFeet + endGapCounter);

  // Clear Drawing
  $("#fixturerepeat").html(''); // Clear Repeat Area
  $("#repeatarea").html(''); // Clear Repeat Area
  $("#gap").html(''); // Clear Gap Area
  $("#ada").html(''); // Clear ADA Area
  $("#ada_fixtures").html(''); // Clear ADA Fixture Area
  $("#bcext").html(''); // Clear Balloon Counter Extension Area
  $("#bcext_fixtures").html(''); // Clear Balloon Counter Extension Fixture Area            
  $("#bsext").html('');
  $("#bsext_fixtures").html(''); 
  $("#designstudio").html('');
  $("#designstudio_fixtures").html('');  
  $("#bs").html('');  
  // Add Dummy Box 
  $("#counter-end").html('<img src="sprites/counter_end.svg" width="19px">' + '<p>19\"<br> Box </p>');
  // Balloon Counter Extension
  populateDiagram('#bcext', bcExtension, '<img src="sprites/counter_blue_b.svg" width="48px">');
  populateDiagram('#bcext_fixtures', bcExtension, '<img src="sprites/counter_4fixture.svg" width="48">' + '<p>4\'</p>');
  // Design Service Center
  populateDiagram('#designstudio', designStudio, '<img src="sprites/counter_design.svg" width="96px">' + '<p>' + 'Studio Service' + '</p>');
  populateDiagram('#designstudio_fixtures', (designStudio * 2), '<div class="loziertext"><img src="sprites/counter_4fixture.svg" width="48px"><p>' + '4\'' +'</p></div>');
  // Balloon Service Extension
  populateDiagram('#bsext', bsExtension, '<img src="sprites/counter_balloon_b.svg" width="48px">' + '<p>Ext.</p>');
  populateDiagram('#bsext_fixtures', bsExtension, '<div class="loziertext"><img src="sprites/counter_4fixture.svg" width="48px"><p>' + '4\'' +'</p></div>');   

  // Design Studio 2015 Version?
  // No 2015 Design Studio
  if(document.getElementById('ds15-no').checked) {  
    populateDiagram('#bs', 1, '<img src="sprites/counter_balloon.svg" width="97px"><p>' + 'Balloon Service' +'</p>');   

    if (document.getElementById('lr-left').checked) { // Left Store
      $("#bc_c").html('<img src="sprites/counter_blue_c_l_new.svg" width="48px"><p>' + 'Balloon' + '</p>'); 
    } else if (document.getElementById('lr-right').checked) { // Right Store
      $("#bc_c").html('<img src="sprites/counter_blue_c_r.svg" width="48px"><p>' + 'Counter' + '</p>'); 
    }

  // Yes 2015 Design Studio
  } else if(document.getElementById('ds15-yes').checked) { 

    if (document.getElementById('lr-left').checked) { // Left Store
    populateDiagram('#bs', 1, '<img src="sprites/counter_balloon_wide_l.svg" width="98px"><p>' + 'Balloon Service' +'</p>');   
    $("#bc_c").html('<img src="sprites/counter_blue_b.svg" width="48px"><p>' + 'Balloon' + '</p>'); 

 //     if (document.getElementById('bsext-yes').checked) { // If there is an extension - Yes 2015 Design Studio - Left Store
 //       $("#bc_c").html('<img src="sprites/counter_blue_a_l.svg" width="48px"><p>' + '4' + '</p>'); 
 //     }
    } else if (document.getElementById('lr-right').checked) { // Right Store
    populateDiagram('#bs', 1, '<img src="sprites/counter_balloon_wide_r.svg" width="98px"><p>' + 'Balloon Service' +'</p>'); 
    $("#bc_c").html('<img src="sprites/counter_blue_b.svg" width="48px"><p>' + 'Counter' + '</p>');       
    }
  }


//  Merchendising Diagram
  $("#diagramthree").html('');

  if(document.getElementById('height-low').checked) { // Merchendising Diagram Low Counter
    populateDiagram('#diagramthree', 1, '<div class="child uprite33 graycounter"></div>');
    populateDiagram('#diagramthree', 1, '<div class="child pegboard height33 graycounter">' + 'PINATA-' + (1) + '<br>48x25</div>');
    populateDiagram('#diagramthree', 1, '<div class="child uprite33 graycounter"></div>');
    for(var i = 0; i < lozierFour; i++) {
      $('#diagramthree').append('<div class="child pegboard height33 graycounter">' + 'PINATA-' + (i+2) + '<br>48x25</div>');   
      $('#diagramthree').append('<div class="child uprite33 graycounter"></div>');
    }
    for(var i = 0; i < lozierThree; i++) {
      $('#diagramthree').append('<div class="child pegboard height33 width3 graycounter">' + 'P-' + (lozierFour+i+2) + '<br>36x25</div>');   
      $('#diagramthree').append('<div class="child uprite33 graycounter"></div>');
    }
    for(var i = 0; i < lozierTwo; i++) {
      $('#diagramthree').append('<div class="child pegboard height33 width2 graycounter">' + 'P-' + (lozierThree+lozierFour+i+2) + '<br>24x</div>');   
      $('#diagramthree').append('<div class="child uprite33 graycounter"></div>');
    }

    $('#diagramthree').append('<div style="width:' + (totalZero * 12) + 'px;" class="merchandising_remain"></div>'); 

  } else if(document.getElementById('height-high').checked) { // Merchendising Diagram High Counter
    populateDiagram('#diagramthree', 1, '<div class="child uprite42 graycounter"></div>');
    populateDiagram('#diagramthree', 1, '<div class="child pegboard height42 graycounter">' + 'PINATA-' + (1) + '<br>48x34</div>');
    populateDiagram('#diagramthree', 1, '<div class="child uprite42 graycounter"></div>');
    for(var i = 0; i < lozierFour; i++) {
      $('#diagramthree').append('<div class="child pegboard height42 graycounter">' + 'PINATA-' + (i+2) + '<br>48x34</div>');   
      $('#diagramthree').append('<div class="child uprite42 graycounter"></div>');
    }
    for(var i = 0; i < lozierThree; i++) {
      $('#diagramthree').append('<div class="child pegboard height42 width3 graycounter">' + 'P-' + (lozierFour+i+2) + '<br>36x34</div>');   
      $('#diagramthree').append('<div class="child uprite42 graycounter"></div>');
    }
    for(var i = 0; i < lozierTwo; i++) {
      $('#diagramthree').append('<div class="child pegboard height42 width2 graycounter">' + 'P-' + (lozierThree+lozierFour+i+2) + '<br>24x</div>');   
      $('#diagramthree').append('<div class="child uprite42 graycounter"></div>');
    }

    $('#diagramthree').append('<div style="width:' + (totalZero * 12) + 'px;" class="merchandising_remain"></div>'); 


    // ADA Counter
    $('#diagramthree').append('<div class="child pegboard height33 width3 graycounter">' + 'P-' + (lozierThree+lozierFour+i+2) + '<br>36x25</div>');
    $('#diagramthree').append('<div class="child uprite33 graycounter"></div>');     
    $('#diagramthree').append('<div class="child pegboard height33 width30 graycounter">' + 'P-' + (lozierThree+lozierFour+i+3) + '<br>30x25</div>');  
    $('#diagramthree').append('<div class="child uprite33 graycounter"></div>');   
  }
  // Gap
  $('#diagramthree').append('<div class="child gap"></div>'); 
  // Blue Balloon Counter
  $('#diagramthree').append('<div class="child uprite33 bluecounter"></div>');   
  $('#diagramthree').append('<div class="child pegboard height33 bluecounter">' + 'AF' + (1) + '<br>48x25</div>');
  $('#diagramthree').append('<div class="child uprite33 bluecounter"></div>');       
  $('#diagramthree').append('<div class="child pegboard height33 bluecounter">' + 'AF' + (2) + '<br>48x25</div>');
  // Blue Balloon Counter Extension
  if (document.getElementById('bcext-yes').checked) {
    $('#diagramthree').append('<div class="child uprite33 bluecounter"></div>');
    $('#diagramthree').append('<div class="child pegboard height33 bluecounter">' + 'AF' + (3) + '<br>48x25</div>');
  }



    var merch1 = 'LATEX-1'
    var merch2 = 'LATEX-2'
    var march3 = 'SAT'
    var march4 = 'ORBS'
    var march5 = 'GLIDE'

 if (document.getElementById('dstud-yes').checked) {

      if (document.getElementById('bsext-yes').checked) { // Change the names if there is a BS Extension
        $('#diagramthree').append('<div class="child uprite60"></div>');
        $('#diagramthree').append('<div class="child pegboard height60">' + march5 + '<br>48x52</div>');
      } 
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + march4 +  '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + march3 + '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + merch2 + '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + merch1 + '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');

     } else if (document.getElementById('dstud-no').checked) {
      if (document.getElementById('bsext-yes').checked) { // Change the names if there is a BS Extension
        $('#diagramthree').append('<div class="child uprite60"></div>');
        $('#diagramthree').append('<div class="child pegboard height60">' + march3 + '<br>48x52</div>');
      } 
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + merch2 +  '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');
      $('#diagramthree').append('<div class="child pegboard height60">' + merch1 + '<br>48x52</div>');
      $('#diagramthree').append('<div class="child uprite60"></div>');
     }


 // Dummy Box
  $('#diagramthree').append('<div class="child dummy">' + '<br></div>'); 
    
  //Reverse merchendising diagram div order (for right)  
  if(document.getElementById('lr-right').checked) {
    $('#diagramthree > div').each(function() {      
     $(this).prependTo(this.parentNode);
    });
  }

//  End Merchendising Diagram


  // Populate Drawing
  if(document.getElementById('lr-left').checked) { // left handed store

    populateDiagram('#gap', fourGapEnd, '<div class="gaptext"><img src="sprites/counter_4egap_l.svg" width="50px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#gap', fiveGapEnd, '<div class="gaptext"><img src="sprites/counter_5egap_l.svg" width="62px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#gap', sixGapEnd, '<div class="gaptext"><img src="sprites/counter_6egap_l.svg" width="74px"><p>' + '6ft' + '</p></div>');
    populateDiagram('#gap', sevenGapEnd, '<div class="gaptext"><img src="sprites/counter_7egap_l.svg" width="86px"><p>' + '7ft' + '</p></div>');
    populateDiagram('#gap', eightGapEnd, '<div class="gaptext"><img src="sprites/counter_8egap_l.svg" width="98px"><p>' + '8ft' + '</p></div>');

    populateDiagram('#gap', fiveGap, '<div class="gaptext"><img src="sprites/counter_5gap.svg" width="60px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#gap', eightGap, '<div class="gaptext"><img src="sprites/counter_8gap.svg" width="96px"><p>' + '8ft' + '</p></div>');

    populateDiagram('#repeatarea', threeEnd, '<div class="three"><img src="sprites/counter_3e_l.svg" width="44px"><p>' + '3ft 6in' + '</p></div>');
    populateDiagram('#repeatarea', fourEnd, '<div class="four"><img src="sprites/counter_4e_l.svg" width="50px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#repeatarea', fiveEnd, '<div class="five"><img src="sprites/counter_5e_l.svg" width="62px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#repeatarea', sixEnd, '<div class="six"><img src="sprites/counter_6e_l.svg" width="74px"><p>' + '6ft' + '</p></div>');

    populateDiagram('#repeatarea', threeRepeat, '<div class="three"><img src="sprites/counter_3.svg" width="42px"><p>' + '3ft 6in' + '</p></div>');
    populateDiagram('#repeatarea', fourRepeat, '<div class="four"><img src="sprites/counter_4.svg" width="48px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#repeatarea', fiveRepeat, '<div class="five"><img src="sprites/counter_5.svg" width="60px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#repeatarea', sixRepeat, '<div class="six"><img src="sprites/counter_6.svg" width="72px"><p>' + '6ft' + '</p></div>');

    populateDiagram('#fixturerepeat', lozierTwo, '<div class="loziertext"><img src="sprites/counter_2fixture.svg" width="24px"><p>' + '2\'' +'</p></div>');
    populateDiagram('#fixturerepeat', lozierThree, '<div class="loziertext"><img src="sprites/counter_3fixture.svg" width="36px"><p>' + '3\'' +'</p></div>');
    populateDiagram('#fixturerepeat', lozierFour, '<div class="loziertext"><img src="sprites/counter_4fixture.svg" width="48px"><p>' + '4\'' +'</p></div>');

    populateDiagram('#ada', adaOption, '<img src="sprites/counter_ada_l.svg" width="68px"><p>' + 'ADA' +'</p>');
    populateDiagram('#ada_fixtures', adaOption, '<div class="loziertext"><img src="sprites/counter_30infixture.svg" width="30px"><p>' + '30\"' +'</p></div>' + '<div class="loziertext"><img src="sprites/counter_3fixture.svg" width="36px"><p>' + '3\'' +'</p></div>');   

  } else if(document.getElementById('lr-right').checked) { // right handed store           

//  futureRegisters
    
    populateDiagram('#gap', fiveGap, '<div class="gaptext"><img src="sprites/counter_5gap.svg" width="60px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#gap', eightGap, '<div class="gaptext"><img src="sprites/counter_8gap.svg" width="96px"><p>' + '8ft' + '</p></div>');

    populateDiagram('#gap', fourGapEnd, '<div class="gaptext"><img src="sprites/counter_4egap_r.svg" width="50px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#gap', fiveGapEnd, '<div class="gaptext"><img src="sprites/counter_5egap_r.svg" width="62px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#gap', sixGapEnd, '<div class="gaptext"><img src="sprites/counter_6egap_r.svg" width="74px"><p>' + '6ft' + '</p></div>');
    populateDiagram('#gap', sevenGapEnd, '<div class="gaptext"><img src="sprites/counter_7egap_r.svg" width="86px"><p>' + '7ft' + '</p></div>');
    populateDiagram('#gap', eightGapEnd, '<div class="gaptext"><img src="sprites/counter_8egap_r.svg" width="98px"><p>' + '8ft' + '</p></div>');

    populateDiagram('#repeatarea', sixRepeat, '<div class="six"><img src="sprites/counter_6.svg" width="72px"><p>' + '6ft' + '</p></div>');
    populateDiagram('#repeatarea', fiveRepeat, '<div class="five"><img src="sprites/counter_5.svg" width="60px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#repeatarea', fourRepeat, '<div class="four"><img src="sprites/counter_4.svg" width="48px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#repeatarea', threeRepeat, '<div class="three"><img src="sprites/counter_3.svg" width="42px"><p>' + '3ft 6in' + '</p></div>');

    populateDiagram('#repeatarea', sixEnd, '<div class="six"><img src="sprites/counter_6e_r.svg" width="74px"><p>' + '6ft' + '</p></div>');
    populateDiagram('#repeatarea', fiveEnd, '<div class="five"><img src="sprites/counter_5e_r.svg" width="62px"><p>' + '5ft' + '</p></div>');
    populateDiagram('#repeatarea', fourEnd, '<div class="four"><img src="sprites/counter_4e_r.svg" width="50px"><p>' + '4ft' + '</p></div>');
    populateDiagram('#repeatarea', threeEnd, '<div class="three"><img src="sprites/counter_3e_r.svg" width="44px"><p>' + '3ft 6in' + '</p></div>');

    // $( "#repeatarea p:last" ).append(' DMY');
  
    // $( "#repeatarea p:last" ).append(' DMY');

    populateDiagram('#fixturerepeat', lozierFour, '<div class="loziertext"><img src="sprites/counter_4fixture.svg" width="48px"><p>' + '4\'' +'</p></div>');
    populateDiagram('#fixturerepeat', lozierThree, '<div class="loziertext"><img src="sprites/counter_3fixture.svg" width="36px"><p>' + '3\'' +'</p></div>');
    populateDiagram('#fixturerepeat', lozierTwo, '<div class="loziertext"><img src="sprites/counter_2fixture.svg" width="24px"><p>' + '2\'' +'</p></div>');

    populateDiagram('#ada', adaOption, '<img src="sprites/counter_ada_r.svg" width="68px"><p>' + 'ADA' +'</p>');
    populateDiagram('#ada_fixtures', adaOption, '<div class="loziertext"><img src="sprites/counter_3fixture.svg" width="36px"><p>' + '3\'' +'</p></div>' + '<div class="loziertext"><img src="sprites/counter_30infixture.svg" width="30px"><p>' + '30\"' +'</p></div>');    

  }
}

var basebrackets; 

function generatelozierParts() {

  lozierTotal = 0;
  var pegboard233 = 0;  // Pegboard 'width * height'
  var pegboard3033 = 0;
  var pegboard333 = 0;
  var pegboard433 = 0;
  var pegboard242 = 0;
  var pegboard3042 = 0;
  var pegboard342 = 0;
  var pegboard442 = 0;
  var pegboard460 = 0;
  var uprite33 = 0;  // Uprite 'height'
  var uprite42 = 0;
  var uprite60 = 0;
  basebrackets = 0;  // Base Brackets (2 Per Uprite)
  var loziersection2 = 0;  // Lozier section 'width'
  var loziersection30 = 0;
  var loziersection3 = 0;
  var loziersection4 = 0;
  var holddown = 0;  // Hold Down 
  var toprail48 = 0;  // Top Rail 'width'
  var endtrim33 = 0;  // End Trim 'height'
  var endtrim42 = 0;
  var endtrim60 = 0;

  // Standard Kit
  loziersection30 += 2;
  loziersection4 += 1; 
  endtrim33 += 2; 

  // Each Section [Low] or [High]
  loziersection2 += lozierTwo;
  loziersection3 += lozierThree;
  loziersection4 += lozierFour;



  if(document.getElementById('height-low').checked) { // Do this for low counters
      // Starter Kit [Low]
      if(document.getElementById('return-5').checked) { 
        pegboard3033 += 4;
        pegboard433 += 2;
        uprite33 += 5;    
      } else if(document.getElementById('return-4').checked) {
        pegboard433 += 3;
        uprite33 += 4; 
      }

      // Each Section [Low]
      pegboard433 += (2 * lozierFour);
      pegboard333 += (2 * lozierThree);
      pegboard233 += (2 * lozierTwo);
      uprite33 += (lozierFour); 
      uprite33 += (lozierThree); 
      uprite33 += (lozierTwo); 
      endtrim33 += 3; 

  } else if(document.getElementById('height-high').checked) { // Do this for high conters
      // Starter Kit [High]
      if(document.getElementById('return-5').checked) { 
        pegboard3042 += 4;
        pegboard442 += 2;
        uprite42 += 5;
      } else if(document.getElementById('return-4').checked) {
        pegboard442 += 3;
        uprite42 += 4;
      }


      // ADA
      pegboard3033 += 2;
      pegboard333 += 2;
      uprite33 += 2;
      loziersection30 += 1;
      loziersection3 += 1;
      // Each Section [High]
      pegboard442 += (2 * lozierFour);
      pegboard342 += (2 * lozierThree);
      pegboard242 += (2 * lozierTwo);
      uprite42 += (lozierFour); 
      uprite42 += (lozierThree); 
      uprite42 += (lozierTwo);       
      endtrim42 += 3;   
  }


  // Blue Balloon Counter
  pegboard433 += 4;
  uprite33 += 2;   
  loziersection4 += 2; 

  // Blue Balloon Counter Extension (optional)   
  if (document.getElementById('bcext-yes').checked) {
  pegboard433 += 2;
  uprite33 += 1;    
  loziersection4 += 1;  
  }


 // No 2015 Design Studio
  if(document.getElementById('ds15-no').checked) {  

    // Balloon Service Counter
    pegboard460 += 4;
    uprite60 += 3;   
    loziersection4 += 2;   
    holddown += 1;   
    toprail48 += 2;    

    // Blue Service Extesntion (optional)    
    if (document.getElementById('bsext-yes').checked) {
    pegboard460 += 2;
    uprite60 += 1;   
    loziersection4 += 1;   
    holddown += 1;   
    toprail48 += 1;            
    }

    // Design Studio (optional)
    if (document.getElementById('dstud-yes').checked) {
    pegboard460 += 4; 
    uprite60 += 2;  
    loziersection4 += 2;  // fixed 8/16/16 
    holddown += 2;
    toprail48 += 2;                  
    }
    // Lozier End next to dummy box
    endtrim60 += 1;
 // Yes 2015 Design Studio
  } else if(document.getElementById('ds15-yes').checked) { 
    // Balloon Service Counter Parts (Low Lozier)
    pegboard433 += 4;
    uprite33 += 3;   
    loziersection4 += 2; 
    // Lozier End next to dummy box
    endtrim33 += 1;
  }





  basebrackets = (uprite33 + uprite42 + uprite60)*2 // Two Base Brackets per Uptire 


  $("#loziertable").html(
    "<tr>" +
      "<th> QTY </th>" +
      "<th> PART </th>" +
      "<th> DESCRIPTION </th>" +
      "<th> PRICE </th>" +
      "<th> TOTAL </th>" +                
    "</tr>"
  );

  lozierAddRow(pegboard233, "BE227P" , "Back Extension, 24W, 27H, Pegboard", 7.59);
  lozierAddRow(pegboard3033, "BE3027P" , "Back Extension, 30W, 27H, Pegboard", 9.64);
  lozierAddRow(pegboard333, "BE327P" , "Back Extension, 36W, 27H, Pegboard", 7.59);
  lozierAddRow(pegboard433, "BE427P" , "Back Extension, 48W, 27H, Pegboard", 7.59);
  lozierAddRow(pegboard242, "BE236P" , "Back Extension, 24W, 36H, Pegboard", 3.77);
  lozierAddRow(pegboard3042, "BE3036P" , "Back Extension, 30W, 36H, Pegboard", 5.82); 
  lozierAddRow(pegboard342, "BE336P" , "Back Extension, 36W, 36H, Pegboard", 3.77);
  lozierAddRow(pegboard442, "BE436P" , "Back Extension, 48W, 36H, Pegboard" , 3.77);
  lozierAddRow(pegboard460, "BE454P" , "Back Extension, 48W, 54H, Pegboard", 5.25);


  lozierAddRow(loziersection2 * 2, "CBF206" , "Closed Base Front, 24W, 06 Base", 4.14);
  lozierAddRow(loziersection30 * 2, "CBF3006" , "Closed Base Front, 30W, 06 Base", 5.08);
  lozierAddRow(loziersection3 * 2, "CBF306" , "Closed Base Front, 36W, 06 Base", 3.03);
  lozierAddRow(loziersection4 * 2, "CBF306" , "Closed Base Front, 48W, 06 Base", 3.03);

  lozierAddRow(basebrackets, "CDC1141" , "Base Bracket,16D,06 Base,Spring Lock,nodeck Overhang", 4.92);
  lozierAddRow(6, "DC52517" , "Base Endtrim,13D,06 Base,PR-LH/RH,for 16D BB & 13D Deck", 5.74); // (Always 6 per store)

  if (document.getElementById('ds15-no').checked) { 
    lozierAddRow(Math.ceil(holddown/2), "HMA4381" , "Top Rail Hold Down Kit", 3.57); 
  }

  lozierAddRow(basebrackets, "MPBF13" , "Multi-Purpose Brackets, Flat,Zero Upslope,Pair-LH/RH,13D", 3.94);

  lozierAddRow(loziersection2, "R2B" , "Bottom Rail, 24W", 2.42);
  lozierAddRow(loziersection2, "R2C" , "Center Rail, 24W", 2.42);

  lozierAddRow(loziersection30, "R30B" , "Bottom Rail, 30W", 3.44);
  lozierAddRow(loziersection30, "R30C" , "Center Rail, 30W", 3.44);

  lozierAddRow(loziersection3, "R3B" , "Bottom Rail, 36W", 1.39);
  lozierAddRow(loziersection3, "R3C" , "Center Rail, 36W", 1.39);

  lozierAddRow(loziersection4, "R4B" , "Bottom Rail, 48W", 1.39);
  lozierAddRow(loziersection4, "R4C" , "Center Rail, 48W", 1.39);
  lozierAddRow(toprail48, "R4T" , "Top Rail, 48W", 1.39);

  lozierAddRow(loziersection2 * 2, "SD213N" , "S Style Deck, 24W, 13D, No Molding", 7.23);
  lozierAddRow(loziersection30 * 2, "SD3013N" , "S Style Deck, 30W, 13D, No Molding", 9.70);
  lozierAddRow(loziersection3 * 2, "SD313N" , "S Style Deck, 36W, 13D, No Molding", 6.75);
  lozierAddRow(loziersection4 * 2, "SD413N" , "S Style Deck, 48W, 13D, No Molding", 6.75);

  lozierAddRow(uprite33, "U33NTL" , "Uprite, 33H, 06/Low Base, W/O Top Rail Lance", 12.01);
  lozierAddRow(uprite42, "U42" , "Uprite, 42H, 06 or Low Base", 8.45); // price?
  lozierAddRow(uprite60, "U60" , "Uprite, 60H, 06 or Low Base", 8.98);

  lozierAddRow(endtrim33, "UET33" , "Uprite End Trim, 33H", 3.08);
  lozierAddRow(endtrim42, "UET42" , "Uprite End Trim, 42H", 2.21);
  lozierAddRow(endtrim60, "UET60" , "Uprite End Trim, 60H", 2.26);



  // Add Total Column  
   $("#loziertable").append(
        "<tr>" +
          "<td class=\"center\">"  + "</td>" +
          "<td class=\"part\">"  + "</td>" +
          "<td class=\"description\">"  + "</td>" +
          "<td class=\"center price\">" + "<b>ESTIMATE:</b>" + "</td>" +
          "<td class=\"total\">" + "<b>" + lozierTotal.toFixed(2) + "</b>" + "</td>" +             
        "</tr>"
    );
} // End generateParts Function

function generatecounterParts() {
  
  registerTotalCost = 0;
   
  $("#countertoptable").html(
    "<tr>" +
      "<th> QTY </th>" +
      "<th> PART </th>" +
      "<th> DESCRIPTION </th>" +
      "<th> PRICE </th>" +
      "<th> TOTAL </th>" +                
    "</tr>"
  );

    // Both High and Low Counters:
    counterAddRow(1, "SK-CTOP50-13" , "Dummy / Shelf Box (High/Low) for 13\" Decks", 65.26); 

    if(document.getElementById('return-5').checked) { 
    counterAddRow(1, "SK-CTOP62" , "Starter Kit Counter - 32-1/4 x 62\"", 110.28);
    } else if(document.getElementById('return-4').checked) {
    counterAddRow(1, "SK-CTOP50" , "Starter Kit Counter - 32-1/4 x 50\"", .99); // Price ??
    }

    counterAddRow(1, "RUNEND-50" , "Starter Kit Counter - 50\" End of run countertop", 108.00);

  if(document.getElementById('height-low').checked) { // Do this for low counters
    counterAddRow(1, "LCSB-3316-13" , "Low Counter Shelfbox for 13\" Decks", 146.72); 
    counterAddRow(1, "LCDB-3316-13" , "Low Counter Dummy Box for 13\" Decks", 122.07); 

    // Add 62.5 End Filler Panel and Remove Blind Corner Panel (Low)
    if(document.getElementById('endfiller-no').checked) {
      // Blind Corner Panel 
      counterAddRow(1, "LC-BCP" , "Low Counter Blind Corner Panel", 24.04);
    } else if (document.getElementById('endfiller-yes').checked) {
      if(document.getElementById('return-5').checked) { 
        counterAddRow(1, "LC-FEP62.5" , "Low counter starter kit filler panel 62.5\" long", 132.90); 
      } else if(document.getElementById('return-4').checked) {
        counterAddRow(1, "LC-FEP62.5" , "*Cut Down* Low counter starter kit filler panel 50.5\" long", 132.90); 
      }
    }

    if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
      counterAddRow(3, "LC-CTEP" , "Low Counter End Panel", 32.64);
    }else if(document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
      counterAddRow(4, "LC-CTEP" , "Low Counter End Panel", 32.64); // (One next to dummy box)
    }

  } else if(document.getElementById('height-high').checked) { // Do this for high conters
    counterAddRow(1, "HCSB-4116-13" , "High Counter Shelfbox for 13\" Decks",  151.38); 
    counterAddRow(1, "HCDB-4116-13" , "High Counter Dummy Box for 13\" Decks",  139.40);

    // Add 62.5 End Filler Panel and Remove Blind Corner Panel (High)
    if(document.getElementById('endfiller-no').checked) {
    counterAddRow(1, "HC-BCP" , "High Counter Blind Corner Panel",  25.78);
    } else if (document.getElementById('endfiller-yes').checked) {
    counterAddRow(1, "HC-FEP62.5" , "High counter Starter kit filler panel 62.50 long",  25.78); // Price?
    }

    if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
      counterAddRow(2, "LC-CTEP" , "Low Counter End Panel", 32.64);
      counterAddRow(1, "HC-CTEP" , "High Counter End Panel",  34.32 );  
    }else if(document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
      counterAddRow(3, "LC-CTEP" , "Low Counter End Panel", 32.64); // (One next to dummy box)
      counterAddRow(1, "HC-CTEP" , "High Counter End Panel",  34.32 );
    }


    counterAddRow(1, "CTP-3208" , "Counter Height Transition Panel",  19.90 );

    counterAddRow(totalRegisters, "FCSD1918-BL" , "Fixed Cash Drawer Shelf 9 x 18 for register repeat counter",  139.39);


    // ADA Counter
    if(document.getElementById('lr-left').checked) {
      counterAddRow(1, "HW-LH-68ADA" , "Left Hand ADA Counter",  163.17);
    }else if(document.getElementById('lr-right').checked) {
      counterAddRow(1, "HW-RH-68ADA" , "Right Hand ADA Counter",  163.17);
    }

  }



  // Cash Repeat
    counterAddRow(threeRepeat, "CSHRPT-42" , "36\" x 42\" cash repeat counter",  123.90);  
    counterAddRow(fourRepeat, "CSHRPT-48" , "36\" x 48\" cash repeat counter", 125.78);
    counterAddRow(fiveRepeat, "CSHRPT-60" , "36\" x 60\" cash repeat counter", 135.64);
    counterAddRow(sixRepeat, "CSHRPT-72" , "36\" x 72\" cash repeat counter", 165.56);
  // Cash Repeat End
    if(document.getElementById('lr-left').checked) { // Left Handed
      counterAddRow(threeEnd, "LH-CSHEND-44" , "36\" x 44\" cash end counter (left)", 135.39);
      counterAddRow(fourEnd, "LH-CSHEND-50" , "36\" x 50\" cash end counter (left)", 137.22);  
      counterAddRow(fiveEnd, "LH-CSHEND-62" , "36\" x 62\" cash end counter (left)", 140.35); 
      counterAddRow(sixEnd, "LH-CSHEND-74" , "36\" x 74\" cash end counter (left)", 167.64);
    }else if(document.getElementById('lr-right').checked) { // Right Handed
      counterAddRow(threeEnd, "RH-CSHEND-44" , "36\" x 44\" cash end counter (right)", 135.39);
      counterAddRow(fourEnd, "RH-CSHEND-50" , "36\" x 50\" cash end counter (right)", 137.22);
      counterAddRow(fiveEnd, "RH-CSHEND-62" , "36\" x 62\" cash end counter (right)", 140.35);
      counterAddRow(sixEnd, "RH-CSHEND-74" , "36\" x 74\" cash end counter (right)", 167.64);
    }           
  // Gap
    counterAddRow(fiveGap, "GAP-CTOP-60" , "60\" Gap countertop", 99.07); 
    counterAddRow(eightGap, "GAP-CTOP-96" , "96\" Gap countertop", 126.85);
     
    counterAddRow(fourGapEnd, "RUNEND-50" , "50\" End of run countertop", 108.00);
    counterAddRow(fiveGapEnd, "RUNEND-62" , "62\" End of run countertop", 143.96);
    counterAddRow(sixGapEnd, "RUNEND-74" , "74\" End of run countertop", 145.54);
    counterAddRow(sevenGapEnd, "RUNEND-86" , "86\" End of run countertop", 147.50); 
    counterAddRow(eightGapEnd, "RUNEND-98" , "98\" End of run countertop", 159.19);


  // Blue Balloon Counter
  if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
    if(document.getElementById('lr-left').checked) { // Left Handed (no 2015 Design Studio)
      counterAddRow(1, "HW-BC-LCN48-HB" , "Balloon counter left configuration 48\" notched Gloss Blue", 187.16);
      counterAddRow(1, "BC-CSHEND-LC50-HB" , "Balloon counter Left Configuration end 50\" Gloss Blue", 178.17);
    }else if(document.getElementById('lr-right').checked) { // Right Handed (no 2015 Design Studio)
      counterAddRow(1, "BC-CSHEND-RC50-HB" , "Balloon cash counter right configuration end 50\" Gloss Blue", 187.16);
      counterAddRow(1, "HW-BC-RCN48-HB" , "Balloon counter Right Configuration 48\" notched Gloss Blue", 161.51); 
    }    
  } else if (document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
    if(document.getElementById('lr-left').checked) { // Left Handed (w/ 2015 Design Studio)
      counterAddRow(1, "BC-CSHEND-LC50-HB" , "Balloon counter Left Configuration end 50\" Gloss Blue", 178.17);
    }else if(document.getElementById('lr-right').checked) { // Right Handed (w/ 2015 Design Studio)
      counterAddRow(1, "BC-CSHEND-RC50-HB" , "Balloon cash counter right configuration end 50\" Gloss Blue", 187.16);
    }  
    counterAddRow(1, "LW-BC-RC48-HB", "Balloon counter right configuration 48\" \"GAP\" Gloss Blue", 134.27);
  }
  // Blue Balloon Counter Extension (optional)   
  if (document.getElementById('bcext-yes').checked) {
    counterAddRow(1, "LW-BC-RC48-HB", "Balloon counter right configuration 48\" \"GAP\" Gloss Blue", 134.27);
  }


  // Balloon Service Counter
  if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
  counterAddRow(1, "BSC97" , "97\" Balloon Servicing Counter", 250.31); 
  counterAddRow(1, "BSC-Close Off" , "97\" Balloon Servicing Counter - Close Off", 0.00);  // Hardware   
  counterAddRow(1, "BSC-Back" , "97\" Balloon Servicing Counter - Back", 0.00);  // Hardware   
  counterAddRow(2, "BSC-Shelf" , "97\" Balloon Servicing Counter - Shelf", 0.00);  // Hardware   
  counterAddRow(1, "BSC-LZCAP-50" , "97\" Balloon Servicing Counter - Top Cap 50", 0.00);  // Hardware   
  counterAddRow(1, "BSC-LZCAP-48" , "97\" Balloon Servicing Counter - Top Cap 48", 0.00);  // Hardware   

  } else if (document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
  counterAddRow(1, "RUNEND-98" , "98\" End of run countertop (For Balloon Service Center)", 159.19);
  }
  
  // Balloon Service Extesntion (optional)    
  if (document.getElementById('bsext-yes').checked) {
  counterAddRow(1, "BSC-GAP48" , "48\" Balloon Service Gap Counter",  127.94);
  counterAddRow(1, "BSC-LZCAP-H48" , "48\" Balloon Service Gap Counter - Top Cap",  0.00);     // Hardware 

  }
  // Design Studio (optional)
  if (document.getElementById('dstud-yes').checked) {
  counterAddRow(1, "DSC2196" , "Design Service Center Counter",  232.18); 
  counterAddRow(1, "BSC-Divider" , "Design Service Center Counter  - Divider", 0.00);  // Hardware
  counterAddRow(1, "DSC-LZCAP-96" , "Design Service Center Counter  - Top Cap", 0.00);  // Hardware   
   
  }
  // Dummy Box 
  counterAddRow(1, "BC-DMYBX6119" , "Balloon Center Dummy Box - 61Ht x 19 deep",  176.81);  

  // Window Close Off 
  counterAddRow(windowcloseoff, "WCO-13ND" , "Window Close off No Deck",  134.14);  
  // Dummy/Future Registers 
  counterAddRow(futureRegisters, "CSH-CT-GK" , "Cash register countertop hole plug/grommet kit",  5.94);  

  // Add Total Column  
   $("#countertoptable").append(
        "<tr>" +
          "<td class=\"center\">"  + "</td>" +
          "<td class=\"part\">"  + "</td>" +
          "<td class=\"description\">"  + "</td>" +
          "<td class=\"center price\">" + "<b>TOTAL:</b>" + "</td>" +
          "<td class=\"total\">" + "<b>" + registerTotalCost + "</b>" + "</td>" +             
        "</tr>"
    );

   generatehardwareParts();
} // End generateParts Function


function generatehardwareParts() {

  $("#hardwarekittable").html(
    "<tr>" +
      "<th> QTY </th>" +
      "<th> PART </th>" +
      "<th> DESCRIPTION </th>" +          
    "</tr>"
  );

  // hardwarekitAddRow(1, "BC-DMYBX6119-13GN", "Balloon Center Dummy Box 61\" Ht x 19\" Deep");
  // hardwarekitAddRow(1, "CDS Shelf", "Cash Drawer Shelf");
  // hardwarekitAddRow(1, "HW-XX-68ADA" , "ADA Countertop Transition Panel"); // Hardware
  // hardwarekitAddRow(1, "HW-XX-68ADA", "ADA Countertop Hardware Kit");   
  // hardwarekitAddRow(1, "BSC-97", "97\" Balloon Servicing Counter Hardware Kit");
  // hardwarekitAddRow(1, "BSC-GAP48", "48\" Balloon Service Hardware Kit"); 
  // hardwarekitAddRow(1, "DSC96-CT", "Design Service Center Hardware Kit");

  if(document.getElementById('height-low').checked) { // High Counter
    hardwarekitAddRow(1, "LCDB-3316-13-HW", "Low Counter Dummy Box - Hardware Kit");
    hardwarekitAddRow(1, "LCSB-3316-13-HW", "Low Counter Shelf Box - Hardware Kit");  
    if(document.getElementById('endfiller-yes').checked) { hardwarekitAddRow(1, "LC-FEP-HW", "Low Counter End Filler Panel - Hardware Kit"); }
  } else if (document.getElementById('height-high').checked) {
    hardwarekitAddRow(1, "HCDB-3316-13-HW", "High Counter Dummy Box - Hardware Kit");
    hardwarekitAddRow(1, "HCSB-3316-13-HW", "High Counter Shelf Box - Hardware Kit");  
    hardwarekitAddRow(1, "HW-XX-68ADA-HW", "ADA Counter - Hardware Kit");  
    if(document.getElementById('endfiller-yes').checked) { hardwarekitAddRow(1, "HC-FEP-LW", "High Counter End Filler Panel - Hardware Kit"); }
  }
  hardwarekitAddRow(1, "BC-DMYBX6119-13-HW", "Balloon Center Dummy Box 61\"Ht x 19\" Deep - Hardware Kit");  
  if(document.getElementById('ds15-no').checked) { hardwarekitAddRow(1, "BSC97-HW", "Ballon Service Center - Hardware Kit "); }
  if(document.getElementById('bcext-yes').checked) { hardwarekitAddRow(1, "BSC-GAP48-HW", "Ballon Service Center  Extension - Hardware Kit"); }
  if(document.getElementById('dstud-yes').checked) { hardwarekitAddRow(1, "DSC96-HW", "Design Studio - Premade Hardware Kit"); }

  windowcloseoff = +$(".windowcloseoff").val(); //Undefined Fix
  hardwareAddRow(windowcloseoff, "Barrel Slide Bolt");  
  hardwareAddRow((windowcloseoff * 15), "#8x 1-5/8 Truss Head Phillips Lath Screws");  
  // End Filler 
  if(document.getElementById('endfiller-yes').checked) { hardwarekitAddRow(18, "", "Grip-Rite #6 x 1-5/8 in. Fine Square #1 Drive Trim Screws"); }

  var seam = (totalRegisters + fourGapEnd + fiveGapEnd + sixGapEnd + sevenGapEnd + eightGapEnd + fiveGap + eightGap + 1 /* Balloon Counter */);

 if (document.getElementById('bcext-yes').checked) { 
   seam += 1 
   } 
  if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
     seam += 1
      if (document.getElementById('bsext-yes').checked) { 
      seam += 1
      } 
      if (document.getElementById('dstud-yes').checked) { 
      seam += 1
      } 
  } else if (document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
     seam += 1
  }

 // hardwareAddRow((seam), "Seams");  
  hardwareAddRow((seam * 3), "#20 Biscuit");  
  hardwareAddRow((seam * 2), "Draw Bolt");

  hardwareAddRow(6, "Table Top Fastener");
  hardwareAddRow(12,  "1\" Dry Wall Screw");
  hardwareAddRow((basebrackets * 4), "#8x 3/4 Truss Head Phillips Sharp Point Lath Screws");

  // $("#hardwaretable").html(
  //   "<tr>" +
  //     "<th> QTY </th>" +
  //     "<th> DESCRIPTION </th>" +         
  //   "</tr>"
  // );

  //var lvlfeet = 12;
 // var biscuit = (totalRegisters + fourGapEnd + fiveGapEnd + sixGapEnd + sevenGapEnd + eightGapEnd + fiveGap + eightGap + 1 /* Balloon Counter */) * 5;
 // var drawbolt = (totalRegisters + fourGapEnd + fiveGapEnd + sixGapEnd + sevenGapEnd + eightGapEnd + fiveGap + eightGap + 1 /* Balloon Counter */) * 2;
 // var fastener = 8

 // if (document.getElementById('bcext-yes').checked) { 
 //   biscuit += 5 // Add 5 for Blue Balloon Counter Extension (optional) 
 //   drawbolt += 2 
 //   } 
 //  if(document.getElementById('ds15-no').checked) {  // No 2015 Design Studio
 //     biscuit += 2 // for Balloon Service Counter
 //     drawbolt += 2 
 //      if (document.getElementById('bsext-yes').checked) { 
 //      biscuit += 2  // 2 for BS Extension (optional)  
 //      drawbolt += 2 
 //      } 
 //      if (document.getElementById('dstud-yes').checked) { 
 //      biscuit += 2  // 2 for Design Studio (optional) 
 //      drawbolt += 2 
 //      } 
 //  } else if (document.getElementById('ds15-yes').checked) {  // Yes 2015 Design Studio
 //     biscuit += 5 // 5 for wide Balloon Service Counter
 //     drawbolt += 2 
 //     lvlfeet += 2 // Add two leveling feet for panel next to dunny box
 //     fastener += 2    
 //  }

 //  if(document.getElementById('endfiller-yes').checked) { 
 //    fastener += 2; //End Filler gets 4 (take two from blind corner panel)
 //  }

// hardwareAddRow(lvlfeet, "R33-130WH Leveling Feet",  0.00); // Two per end panel 
 // hardwareAddRow(windowcloseoff, "Barrel Slide Bolt",  0.00);  // One per window close off 
 // hardwareAddRow(biscuit, "#20 Biscuit",  0.00);
 // hardwareAddRow(drawbolt, "Draw Bolt",  0.00);
 // hardwareAddRow(8, "Shelf Pins",  0.00); // Always 8 for shelf box
 // hardwareAddRow(fastener, "Table Top Fastener",  0.00);
 // hardwareAddRow((fastener * 2), "1\" Dry Wall Screw",  0.00);
 // hardwareAddRow((basebrackets * 4) , "#8x 3/4 Truss Head Phillips Sharp Point Lath Screws",  0.00);
 // hardwareAddRow((windowcloseoff * 15), "#8x 1-5/8 Truss Head Phillips Lath Screws",  0.00);
 // hardwareAddRow(8, "Grip-Rite #6 x 1-5/8 in. Fine Square #1 Drive Trim Screws",  0.00);
 // hardwareAddRow(48, "Camlock Post",  0.00);
 // hardwareAddRow(48, "Camlock Cam",  0.00);
 // hardwareAddRow(2, "8mm Wood Dowel",  0.00);

} // End generatehardwareParts Function


function lozierAddRow(variable, part, description, price) {
    if (variable > 0) {
      $("#loziertable").append(
      "<tr>" +
        "<td class=\"center\">" + variable + "</td>" +
        "<td class=\"part\">" + part + "</td>" +
        "<td class=\"description\">" + description + "</td>" +
        "<td class=\"center price\">" + price.toFixed(2) + "</td>" +
        "<td class=\"total\">" + (price * variable).toFixed(2) + "</td>" +                  
      "</tr>"
      );
      lozierTotal += (price * variable).toFixed(2);
    }
} // End lozierAddRow Function

function counterAddRow(variable, part, description, price) {
  if (variable > 0) {
    $("#countertoptable").append(
    "<tr>" +
      "<td class=\"center\">" + variable + "</td>" +
      "<td class=\"part\">" + part + "</td>" +
      "<td class=\"description\">" + description + "</td>" +
      "<td class=\"center price\">" + price.toFixed(2) + "</td>" + 
      "<td class=\"total\">" + (price * variable).toFixed(2) + "</td>" +              
    "</tr>"
    );
    registerTotalCost += (price * variable).toFixed(2);
  }
} // End counterAddRow Function

function hardwarekitAddRow(variable, part, description) {
  if (variable > 0) {
    $("#hardwarekittable").append(
    "<tr>" +
      "<td class=\"center\">" + variable + "</td>" +
      "<td class=\"part\">" + part + "</td>" +
      "<td class=\"description\">" + description + "</td>" +       
    "</tr>"
    );
  }
} // End hardwarekitAddRow Function

function hardwareAddRow(variable, description) {
  if (variable > 0) {
    $("#hardwarekittable").append(
    "<tr>" +
      "<td class=\"center\">" + variable + "</td>" +
      "<td class=\"description\" colspan=\"2\">" + description + "</td>" +       
    "</tr>"
    );
  }
} // End hardwareAddRow Function




$('#counterpdfbtn').click(function () {
      var doc = new jsPDF( 'l', 'pt'); // "L" for Landscape
      doc.text("Counter Order Form", 40, 50);
            
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text("Store Number: " +  store.number, 40, 70);
      doc.text("City: " + store.city, 40, 85);
      doc.text("Manager: " + store.manager, 40, 100);
      doc.addHTML($('#diagram-1')[0], 5, 5, {
         //   'background': '#fff',
          })
      var res = doc.autoTableHtmlToJson(document.getElementById("countertoptable"));
      doc.autoTable(res.columns, res.data, {
        startY: 110 /* ,
        styles: {
            font: 'courier',
        },
          */
      });

    var res = doc.autoTableHtmlToJson(document.getElementById("hardwarekittable"));
      doc.autoTable(res.columns, res.data, {
      startY: doc.autoTableEndPosY() + 30,
      //  pageBreak: 'avoid',
    });

    // var res = doc.autoTableHtmlToJson(document.getElementById("hardwaretable"));
    //   doc.autoTable(res.columns, res.data, {
    //   startY: doc.autoTableEndPosY() + 30,
    //   //  pageBreak: 'avoid',
    // });


      doc.save('store' +  store.number + 'counters' + '.pdf');
});

$('#lozierpdfbtn').click(function () {
      var doc = new jsPDF('l', 'pt'); // "L" for Landscape
      doc.text("Lozier Order Form", 40, 50);

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text("Store Number: " +  store.number, 40, 70);
      doc.text("City: " + store.city, 40, 85);
      doc.text("Manager: " + store.manager, 40, 100);

//    doc.addHTML($('#diagram-1')[0], 50, 50);

      var res = doc.autoTableHtmlToJson(document.getElementById("loziertable"));
      doc.autoTable(res.columns, res.data, {
        startY: 110
      });

      doc.save('store' +  store.number + 'lozier' + '.pdf');
});

/*
html2canvas($("#diagram-1"), {
            onrendered: function(canvas) {         
                var imgData = canvas.toDataURL('image/png');              
                var doc = new jsPDF('p', 'pt');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('sample-file.pdf');
            }
        });
*/

}); // End $(document).ready(function(){



/*
    document.body.style.background = "pink";
*/