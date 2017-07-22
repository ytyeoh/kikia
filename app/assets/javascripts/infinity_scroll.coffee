# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
  $(window).scroll ->
    more_posts_url = $('.next a').attr('href')
    if more_posts_url && $(window).scrollTop() > $(document).height() - $(window).height() - 60
      $('.pagination').html('<img src="'+image_path('loading.gif')+'" alt="Loading..." title="Loading..." /><span>Loading...</span>')
      $.getScript(more_posts_url)
    return
