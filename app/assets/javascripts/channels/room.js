$(function() {
  var roomId = $('.channel').data('roomId');

  App.room = App.cable.subscriptions.create({ channel: "RoomChannel", room_id: roomId }, {
    connected: function() {
      console.log('connected');
    },
    disconnected: function() {
      console.log('disconnected');
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
          var joinerId = data['joinerId']
          $('.js-left-notification').addClass('hide');
          $('.js-joined-notification').html(joinerId + ' has joined');
          $('.js-joined-notification').removeClass('hide');
          break;
        case 'left':
          var leaverId = data['leaverId']
          $('.js-joined-notification').addClass('hide');
          $('.js-left-notification').html(leaverId + ' has left');
          $('.js-left-notification').removeClass('hide');
          break;
        case 'typing':
          var typerId = data['typerId']
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
    typing: function(typerId, flag) {
      return this.perform('typing', {
        typerId: typerId,
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

    var currentUserId = $('.channel').data('currentUserId');

    var flag = ((trimedInput.length > 0) && (trimedInput != ''))
    App.room.typing(currentUserId, flag);
  });
});
