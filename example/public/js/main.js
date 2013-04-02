$(document).ready(function(){

  $('body').on('click', 'button#lint-reset', function(e){
    e.preventDefault();

    $('.lint-reset').hide();
    $('.lint-results').empty().hide();
    $('.lint-textarea').show();
    $('.toogle-buttons').show();
  });

  $('#lint-execute').on('click', function(e){
    e.preventDefault();

    $('.lint-textarea').hide();
    $('.toogle-buttons').hide();
    $('.lint-loading').show();

    var dataString = 'htmlContent='+ $('.markupContent').val();

    $.ajax({
      type: 'POST',
      url: '/lint',
      data: dataString,
      dataType: 'text',
      success: function(data, textStatus, jqXHR){

        var e = JSON.parse(data);
        var l = e.errors.length;
        var list = $(".lint-results").append('<div class="results-container"><h2>Lint results:</h2><ul></ul></div>').find('ul');

        if (l > 0) {
          for (var x = 0; x < l; x++) {
            if (e.errors[x].type === 'Error') {
              list.append('<li><span class="message-error">' + e.errors[x].type + '</span>: ' + e.errors[x].rule + '. ' + e.errors[x].message + '.</li>');
            } else {
              list.append('<li><span class="message-info">' + e.errors[x].type + '</span>: ' + e.errors[x].rule + '. ' + e.errors[x].message + '.</li>');
            }
            console.log(e.errors[x].type + ': ' + e.errors[x].rule + '. ' + e.errors[x].message);
          }
        } else {
          list.append('<li>There are no errors.</li>');
          console.log('There are no errors.');
        }

        $('.lint-loading').hide();

        $('.lint-results').fadeIn('fast', function() {
          $('.lint-results').show();
          $('.lint-reset').show();
        });
      },

      error: function(jqXHR, textStatus, errorThrown){
        console.log('error');
        console.log(textStatus);
        console.log(errorThrown);

        var p = $(".lint-results").append('<div class="results-container"><p></p></div>').find('p');
        p.append('Error: ' + textStatus + '. ErrorThrown: ' + errorThrown);

        $('.lint-loading').hide();

        $('.lint-results').fadeIn('fast', function() {
          $('.lint-results').show();
          $('.lint-reset').show();
        });
      }
    });
  });

});