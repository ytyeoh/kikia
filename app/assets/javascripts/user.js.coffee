$ ->
  $('#users-table').dataTable
    processing: true
    serverSide: true
    ajax: $('#users-table').data('source')
    pagingType: 'full_numbers'