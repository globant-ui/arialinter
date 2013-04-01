$(document).ready(function(){

  $('body').on('click', 'button#lint-reset', function(e){
    e.preventDefault();

    $('.lint-results').empty().hide();
    $('.lint-form').show();
  });

  $('#lint-execute').on('click', function(e){
    e.preventDefault();

    $('.lint-form').hide();
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
        var list = $(".lint-results").append('<div class="results-container"><h2>Lint results:</h2><ul></ul><button id="lint-reset" class="btn btn-secondary">Reset</button></div>').find('ul');

        if (l > 0) {
          for (var x = 0; x < l; x++) {
            list.append('<li><span class="message-error">' + e.errors[x].type + '</span>: ' + e.errors[x].rule + '. ' + e.errors[x].message + '.</li>');
            console.log(e.errors[x].type + ': ' + e.errors[x].rule + '. ' + e.errors[x].message);
          }
        } else {
          list.append('<li>There are no errors.</li>');
          console.log('There are no errors.');
        }

        $('.lint-loading').hide();

        $('.lint-results').fadeIn('fast', function() {
          $('.lint-results').show();
        });
      },

      error: function(jqXHR, textStatus, errorThrown){
        console.log('error');
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });

});