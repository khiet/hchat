$(function() {
  var roomId = $('.channel').data('roomId');

  if (roomId) {
    App.room = App.cable.subscriptions.create({ channel: "RoomChannel", room_id: roomId }, {
      connected: function() {
      },
      disconnected: function() {
      },
      received: function(data) {
        var currentUserId = $('.channel').data('currentUserId');

        switch(data['action']) {
          case 'speak':
            var $message = $(data['message']);
            if (currentUserId == data['sender_id']) {
              /* mark if message is mine or not */
              $message = $message.addClass('mine');
            }
            $('.js-message-list').append($message);
            break;
          case 'joined':
            var joinerName = data['joinerName']
            $('.js-flash-notice').addClass('hide');
            $('.js-left-notification').addClass('hide');
            $('.js-joined-notification').html('<b>' + joinerName + '</b>さんが入室しました。');
            $('.js-joined-notification').removeClass('hide');
            $('.js-logo').addClass('animated wobble');
            break;
          case 'left':
            var leaverName = data['leaverName']
            $('.js-joined-notification').addClass('hide');
            $('.js-left-notification').html('<b>' + leaverName + '</b>さんが退室しました。');
            $('.js-left-notification').removeClass('hide');
            break;
          case 'typing':
            console.log(data['flag']);
            if (data['flag']) {
              $('.js-typing').removeClass('hide');
            } else {
              $('.js-typing').addClass('hide');
            }
            break;
        }
      },
      speak: function(message) {
        return this.perform('speak', {
          message: message
        });
      },
      typing: function(flag) {
        return this.perform('typing', {
          flag: flag
        });
      }
    });

    $('.js-chat-text-area').on('keypress', function(e) {
      if (e.keyCode === 13) {
        sendMessage();

        return e.preventDefault();
      }
    });

    $('.js-chat-submit-button').on('click', function(e) {
      /* clear typing since click on submit does not trigger keyup event
       * to trigger typing(false) unlike keypress on input
       */
      App.room.typing(false);
      sendMessage();

      return e.preventDefault();
    });

    $('.js-chat-text-area').on('change keyup paste click', function(e) {
      var typedInput = $(e.currentTarget).val();
      var trimedInput = $.trim(typedInput);

      var flag = ((trimedInput.length > 0) && (trimedInput != ''))
      App.room.typing(flag);
    });

    var sendMessage = function() {
      var $chatTextArea = $('.js-chat-text-area');
      var trimedInput = $.trim($chatTextArea.val());
      if (trimedInput.length > 0 && trimedInput != '') {
        App.room.speak(trimedInput);
      }
      $chatTextArea.val('');
    };
  }
});
