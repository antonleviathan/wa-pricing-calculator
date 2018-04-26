$( document ).ready(function() {
  const OPTIONS = {
    useEasing : true,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
  };

  $('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
    });
  });

  var plans = {
    "free-plan":{
      percentage: "0%",
      value: "50"
    },
    "group-plan": {
      monthly: "40",
      annual: "36",
      percentage: "20%",
      value: "250"
    },
    "community-plan": {
      monthly: "70",
      annual: "63",
      pecentage: "40%",
      value: "500"
    },
    "professional-plan": {
      monthly: "130",
      annual: "117",
      pecentage: "60%",
      value: "2000"
    },
    "network-plan": {
      monthly: "240",
      annual: "216",
      pecentage: "60%",
      value: "5000"
    },
    "enterprise-plan": {
      monthly: "270",
      annual: "243",
      pecentage: "80%",
      value: "15000"
    }
  }

  var stepSlider = document.getElementById('noUiSlider');
  noUiSlider.create(stepSlider, {
    start: [ 50 ],
    behaviour: 'tap',
    step: 1,
    range: {
      'min': [  0 ],
      '20%': [ 250 ],
      '40%': [ 500 ],
      '60%': [ 2000 ],
      '80%': [ 5000 ],
      'max': [ 15000 ]
    },
    pips: {
      mode: 'steps',
      stepped: true,
      density: 20
    },
    format: wNumb({
      decimals: 0,
      thousand: '',
    })
  });

  $(".noUi-handle")[0].innerHTML = "<div class=\"arrow_box\" id=\"slider-step-value\"></div>"
  var stepSliderValueElement = document.getElementById('slider-step-value');

  var trial_button = document.createElement("a");
  trial_button.className = "trial_button button";
  trial_button.innerText = "Free trial";
  trial_button.setAttribute('href', 'https://register.wildapricot.com/');

  var classSwap = function(){
    $('.active-plan').removeClass("active-plan");
    $('.price-container').addClass("regular-border");
  };

  function onClickUpdate(id) {
    $(id).addClass("active-plan");
    $(id).removeClass("regular-border");
    var left_margin = $(id).position().left;
    $('.trial_button').css("left", (String(left_margin + 24)) + "px")
  }

  $('.price-container').click( function(event){
    var plan_id = (jQuery(this).attr("id"));
    $('.noUi-origin').css('left', plans["#" + plan_id]);
    stepSlider.noUiSlider.set([plans[plan_id]["value"]]);
    classSwap();
    onClickUpdate("#" + plan_id);
  });

  stepSlider.noUiSlider.on('update', function( values, handle ) {
    var stepSliderValueElement = document.getElementById('slider-step-value');
    stepSliderValueElement.innerText = values[handle];
    value = stepSliderValueElement.innerText;

    if ((parseInt(value) <= 50)){
      var id = "#free-plan"
      $('#main-pricing-anchor').append(trial_button);
    } else if ((parseInt(value) > 50) && (parseInt(value) < 250)) {
      var id = "#group-plan"
    } else if ((parseInt(value) >= 250) && (parseInt(value) < 500)) {
      var id = "#community-plan"
    } else if ((parseInt(value) >= 500) && (parseInt(value) < 2000)) {
      var id = "#professional-plan"
    } else if ((parseInt(value) >= 2000) && (parseInt(value) < 5000)) {
      var id = "#network-plan"
    } else if ((parseInt(value) >= 5000)) {
      var id = "#enterprise-plan"
    };
    onClickUpdate(id);
    classSwap();
  });

  window.onresize = function(event) {
    var left_margin = $('.active-plan').position().left;
    $('.trial_button').css("left", (String(left_margin + 24)) + "px")
  };

  $('.left-flip').on("click", function(){
    $('.active-flipper').removeClass("active-flipper");
    $('.left-flip').addClass("active-flipper");
    for (var plan in plans) {
      if (plan != "free-plan"){
        CountUpHelper(plan, "monthly")
      }
    }
  });

  $('.right-flip').on("click", function(){
    $('.active-flipper').removeClass("active-flipper");
    $('.right-flip').addClass("active-flipper");
    for (var plan in plans) {
      if (plan != "free-plan"){
        CountUpHelper(plan, "annual")
      }
    }
  });

  function CountUpHelper(plan, mode) {
    const ANIMATION_SPEED = 0.2
    var plan = plan
    if (mode == "annual"){
      planObject = new CountUp(plan + "-price",
      (plans[plan]["monthly"]),
      (plans[plan]["annual"]), 0, ANIMATION_SPEED, OPTIONS);
    } else {
      planObject = new CountUp(plan + "-price",
      (plans[plan]["annual"]),
      (plans[plan]["monthly"]), 0, ANIMATION_SPEED, OPTIONS);
    }
    planObject.start();
  }
});
