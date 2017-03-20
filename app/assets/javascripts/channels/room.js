$(function() {
  var roomId = $('.channel').data('roomId');

  App.room = App.cable.subscriptions.create({ channel: "RoomChannel", room_id: roomId }, {
    connected: function() {
      console.log('connected');
      return this.perform('joined', {
        joiner_id: $('.channel').data('userId')
      });
    },
    disconnected: function() {
      console.log('disconnected');
    },
    received: function(data) {
      var userId = $('.channel').data('userId');
      var $message = $(data['message']);

      console.log(data);
      if (data['joiner_id']) { /* joined */
        var joinerId = data['joiner_id']
        if (userId != joinerId) {
          $('.js-left-notification').addClass('hide');
          $('.js-joined-notification').html(joinerId + ' has joined');
          $('.js-joined-notification').removeClass('hide');
        }
      } else if (data['leaver_id']) { /* left */
        var leaverId = data['leaver_id']
        if (userId != leaverId) {
          $('.js-joined-notification').addClass('hide');
          $('.js-left-notification').html(leaverId + ' has left');
          $('.js-left-notification').removeClass('hide');
        }
      } else if (data['typer_id']) { /* typing */
        var typerId = data['typer_id']
        if (userId != typerId) {
          if (data['flag']) {
            $('.js-typing').removeClass('hide');
          } else {
            $('.js-typing').addClass('hide');
          }
        }
      } else { /* speak */
          if (userId == data['sender_id']) {
            $message = $message.addClass('mine');
          }

        $('.js-message-list').append($message);
      }
    },
    speak: function(message) {
      return this.perform('speak', {
        message: message
      });
    },
    typing: function(typerId, flag) {
      return this.perform('typing', {
        typer_id: typerId,
        flag: flag
      });
    }
  });

  $('.js-chat-text-area').on('keypress', function(e) {
    if (e.keyCode === 13) {
      var $chatTextArea = $('.js-chat-text-area');
      var trimedInput = $.trim($chatTextArea.val());
      if (trimedInput.length > 0 && trimedInput != '') {
        App.room.speak(trimedInput);
      }
      $chatTextArea.val('');

      return e.preventDefault();
    }
  });

  $('.js-chat-submit-button').on('click', function(e) {
    var $chatTextArea = $('.js-chat-text-area');
    var trimedInput = $.trim($chatTextArea.val());
    if (trimedInput.length > 0 && trimedInput != '') {
      App.room.speak(trimedInput);
    }
    $chatTextArea.val('');

    return e.preventDefault();
  });

  $('.js-chat-text-area').on('keyup', function(e) {
    var typedInput = $(e.currentTarget).val();
    var trimedInput = $.trim(typedInput);

    var userId = $('.channel').data('userId');

    if ((trimedInput.length > 0) && (trimedInput != ''))  {
      App.room.typing(userId, true);
    } else {
      App.room.typing(userId, false);
    }
  });
});
