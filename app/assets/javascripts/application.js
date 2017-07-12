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
//= require hermitage
//= require jquery_ujs
//= require materialize-sprockets
//= require materialize/extras/nouislider
//= require underscore
//= require select2
//= require dropzone
//= require application/global_event
//= require typeahead
//= require turbolinks
//= require_tree .

$(document).ready(function(){
  globalEvent.initialize();
  $('.modal-trigger').leanModal();
  $('.close').sideNav('hide');
  $(".button-collapse").sideNav({
    edge: 'right',
    menuWidth: 200,
    closeOnClick: true
  });
  Materialize.updateTextFields();
  $('select').material_select();
  $('ul.tabs').tabs();
  $('.slider').slider({height: 200, interval: 3000, indicators: false});
});

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
