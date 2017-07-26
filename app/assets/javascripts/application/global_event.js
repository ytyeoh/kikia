var globalEvent = {
  initialize: function() {
    this.flashAjax();
    this.likeUnlikeAjax();
    this.paymentHide();
    this.totalPay();
  },

  flashAjax: function() {
    $(document).ajaxSuccess(function(event, request) {
      var flashMessageHTML, msg;
      if (request.getResponseHeader('X-Message')){
        msg = request.getResponseHeader('X-Message');
      }
      else if (request.responseText.length > 100 || request.responseText.includes("[")){
        msg === null;
      }
      else{
        msg = request.responseText;
      }

      if (msg) {

        msg = msg.replace(/"/g, '');
        Materialize.toast( msg +'<span><i class="material-icons">clear</i></span>' , 3000);
      }
    });
  },

  paymentHide: function() {
    $('input[type=radio]').change(function() {
      $('#payment-form').removeClass('hide');
      $('.submit-btn').removeClass('hide');
      $('.value').empty();
      var x = $('input[type=radio]:checked').val();
      var id = this.id;
      var y = document.getElementsByClassName(id)[0].innerHTML;
      var msg = 'Credit:' + x + '<br>  Total Paid   '+ y;
      $('.value').append(msg);
    });
  },

  likeUnlikeAjax: function() {
    $('.like-listing').bind('ajax:success', function(data, status, xhr) {
      var currentFavCount, newFavCount, targetFavCount, targetFavCountParent, targetParent;
      targetFavCountParent = $(this).parent().parent();
      targetFavCount = $('.fav-count', targetFavCountParent);
      currentFavCount = parseInt(targetFavCount.html(), 10);
      targetParent = $(this).parent();
      newFavCount = currentFavCount + 1;
      $(this).addClass('hide');
      $('.unlike-listing', targetParent).removeClass('hide');
      targetFavCount.html(newFavCount);
      currentFavCount = newFavCount;
    });
    $('.unlike-listing').bind('ajax:success', function(data, status, xhr) {
      var currentFavCount, newFavCount, targetFavCount, targetFavCountParent, targetParent;
      targetFavCountParent = $(this).parent().parent();
      targetFavCount = $('.fav-count', targetFavCountParent);
      currentFavCount = parseInt(targetFavCount.html(), 10);
      targetParent = $(this).parent();
      newFavCount = currentFavCount - 1;
      
      $(this).addClass('hide');
      $('.like-listing', targetParent).removeClass('hide');
      targetFavCount.html(newFavCount);
      currentFavCount = newFavCount;
    });
  },

  totalPay: function() {
    $('#input_to, #input_from' ).change(function(){
      var from = $('#input_from').val().split(' ')[0];
      var to = $('#input_to').val().split(' ')[0];
      if (to != "" && from !=""){
        debugger;
        document.getElementById('travel_amount').value = (to-from+1) * $('#travel_amount')[0].defaultValue
      }
    })
  }
}