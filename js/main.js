$( document ).ready(function() {

  var options = {
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

  $('.price-container').click( function(event){
    var plan_id = "#" + (jQuery(this).attr("id"));
    var plan_id_raw = (jQuery(this).attr("id"));
    $('.noUi-origin').css('left', plans[plan_id]);
    stepSlider.noUiSlider.set([plans[plan_id_raw]["value"]]);
    $('.active-plan').removeClass("active-plan");
    $('.price-container').addClass("regular-border");
    $(plan_id).addClass("active-plan");
    $(plan_id).removeClass("regular-border");
    var left_margin = $(plan_id).position().left;
    $('.trial_button').css("left", (String(left_margin + 24)) + "px")
  });

  stepSlider.noUiSlider.on('update', function( values, handle ) {
    var stepSliderValueElement = document.getElementById('slider-step-value');
    stepSliderValueElement.innerText = values[handle];
    value = stepSliderValueElement.innerText;

    var classSwap = function(){
      $('.active-plan').removeClass("active-plan");
      $('.price-container').addClass("regular-border");
    };

    var onClickUpdate = function(){
      $(id).addClass("active-plan");
      $(id).removeClass("regular-border");
      var left_margin = $(id).position().left;
      $('.trial_button').css("left", (String(left_margin + 24)) + "px")
    }

    if (  (parseInt(value) <= 50) ){
      id = "#free-plan"
      $('#main-pricing-anchor').append(trial_button);
      classSwap();
      onClickUpdate();
    };
    if ( (parseInt(value) > 50) && (parseInt(value) < 250) ){
      id = "#group-plan"
      classSwap();
      onClickUpdate();
    };
    if ( (parseInt(value) >= 250) && (parseInt(value) < 500) ){
      id = "#community-plan"
      classSwap();
      onClickUpdate();
    };
    if ( (parseInt(value) >= 500 ) && (parseInt(value) < 2000) ){
      id = "#professional-plan"
      classSwap();
      onClickUpdate();
    };
    if ( (parseInt(value) >= 2000 ) && (parseInt(value) < 5000) ){
      id = "#network-plan"
      classSwap();
      onClickUpdate();
    };
    if ( (parseInt(value) >= 5000 ) ){
      id = "#enterprise-plan"
      classSwap();
      onClickUpdate();
    };
  });

  window.onresize = function(event) {
    var left_margin = $('.active-plan').position().left;
    $('.trial_button').css("left", (String(left_margin + 24)) + "px")
  };

  $('.left-flip').on("click", function(){
    animation_speed = 0.2
    $('.active-flipper').removeClass("active-flipper");
    $('.left-flip').addClass("active-flipper");
    var group_to_monthly = new CountUp("group-plan-price", (plans["group-plan"]["annual"]), (plans["group-plan"]["monthly"]), 0, animation_speed, options);
    group_to_monthly.start();
    var community_to_monthly = new CountUp("community-plan-price", (plans["community-plan"]["annual"]), (plans["community-plan"]["monthly"]), 0, animation_speed, options);
    community_to_monthly.start();
    var professional_to_monthly = new CountUp("professional-plan-price", (plans["professional-plan"]["annual"]), (plans["professional-plan"]["monthly"]), 0, animation_speed, options);
    professional_to_monthly.start();
    var network_to_monthly = new CountUp("network-plan-price", (plans["network-plan"]["annual"]), (plans["network-plan"]["monthly"]), 0, animation_speed, options);
    network_to_monthly.start();
    var enterprise_to_monthly = new CountUp("enterprise-plan-price", (plans["enterprise-plan"]["annual"]), (plans["enterprise-plan"]["monthly"]), 0, animation_speed, options);
    enterprise_to_monthly.start();
  });

  $('.right-flip').on("click", function(){
    animation_speed = 0.2
    $('.active-flipper').removeClass("active-flipper");
    $('.right-flip').addClass("active-flipper");
    var group_to_monthly = new CountUp("group-plan-price", (plans["group-plan"]["monthly"]), (plans["group-plan"]["annual"]), 0, animation_speed, options);
    group_to_monthly.start();
    var community_to_monthly = new CountUp("community-plan-price", (plans["community-plan"]["monthly"]), (plans["community-plan"]["annual"]), 0, animation_speed, options);
    community_to_monthly.start();
    var professional_to_monthly = new CountUp("professional-plan-price", (plans["professional-plan"]["monthly"]), (plans["professional-plan"]["annual"]), 0, animation_speed, options);
    professional_to_monthly.start();
    var network_to_monthly = new CountUp("network-plan-price", (plans["network-plan"]["monthly"]), (plans["network-plan"]["annual"]), 0, animation_speed, options);
    network_to_monthly.start();
    var enterprise_to_monthly = new CountUp("enterprise-plan-price", (plans["enterprise-plan"]["monthly"]), (plans["enterprise-plan"]["annual"]), 0, animation_speed, options);
    enterprise_to_monthly.start();
  });
});