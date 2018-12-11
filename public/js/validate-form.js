$(function() {
    $('.error').hide();
    $('.form-response').hide();
    $(".subbutton").click(function() {

      console.log('test');

      // validate and process form here

      $('.error').hide();
      var name = $("#contact-name").val();
      if (name == "") {
        $("#name_error").show();
        $("#contact-name").focus();
        return false;
      }
      var email = $("#contact-email").val();
      if (email == "") {
        $("#email_error").show();
        $("#contact-email").focus();
        return false;
      }
      var message = $("#contact-message").val();
      if (message == "") {
        $("#message_error").show();
        $("#contact-message").focus();
        return false;
      }


  var dataString = '<p><strong>Name: </strong> '+ name + '</p><p><strong>Email: </strong> ' + email + '</p><p><strong>Message: </strong> ' + message + '</p>';
  $.ajax({
    type: "POST",
    url: "mail.php",
    data: { data: dataString, senderAddress: email },
    success: function() {

      // show a success message to your visitors
      $('.form-response').fadeIn();

      // clear input field values
      $("#contact-name").val('');
      $("#contact-email").val('');
      $("#contact-message").val('');

    }
  });
  return false;

    });
});
