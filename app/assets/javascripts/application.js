// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require materialize
//= require materialize/extras/nouislider
//= require underscore
//= require select2
//= require dropzone
//= require hermitage
//= require ckeditor/init
//= require application/global_event
//= require typeahead
//= require turbolinks
//= require_tree .

$(document).ready(function(){
  globalEvent.initialize();
  $('.home-form, #calendar1').on('click', function(event) {
    event.stopPropagation();
  });

  $('.msearch').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: true // Stops event propagation
    }
  );
  $('.close').sideNav('hide');
  $(".button-collapse").sideNav({
    edge: 'right',
    menuWidth: 200,
    closeOnClick: true
  });
  $(".button-left-collapse").sideNav({
    edge: 'left',
    menuWidth: 200,
    closeOnClick: true
  });
  $("#mobile-demo").removeClass('right-aligned');
  Materialize.updateTextFields();
  $('select').material_select();
  $('.modal').modal();
  $('ul.tabs').tabs();
  $('.slider').slider({height: 200, interval: 3000, indicators: false});
  $('.timepicker').pickatime({
    default: '9', // Set default time
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker  
  });
  var yesterday = new Date((new Date()).valueOf()+3000*60*60*24);

  // var day = booking_day.splice(0, -1, { from: [0,0,0], to: yesterday });
  $('#calendar, #calendar1').pickadate(
    {
    disable: [{ from: [0,0,0], to: yesterday }],
    onSet: function( arg ){
        if ( 'select' in arg ){ //prevent closing on selecting month/year
            this.close();
        }
    },
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
});

function showalert(){
  alert('login to continue purchase');
};

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#img_prev')
        .attr('src', e.target.result)
        .removeClass('hide')
        .height(165)
        .width(165);
      $('.icon_img').addClass('hide');
      $('.image')
        .css('background-image', 'url("' + e.target.result + '")');
            }

    };

    reader.readAsDataURL(input.files[0]);
  
};
