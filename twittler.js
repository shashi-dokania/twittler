var count = 0;

var nextTweet = function(){
  generateRandomTweet();
  count++;
  $("#new-tweet").show();
  document.getElementById("count").innerHTML = count;
  setTimeout(nextTweet, Math.random() * 5000);
};

function format_time(value, type_str) {
  var str = "";
  if (value > 1) {
    str = value.toString() + " " + type_str + "s" + " ago";
  }
  else {
    str = value.toString() + " " + type_str + " ago";
  }
  return str;
}

function elapsedTime(time_created) {
  var curr_time = new Date();
  var diff_in_sec = Math.ceil((curr_time - time_created) / 1000);
  
  if (diff_in_sec > 59) {
    var diff_in_min = Math.ceil(diff_in_sec / 59);
    if (diff_in_min > 59) {
      var diff_in_hrs = Math.ceil(diff_in_min / 59);
      if (diff_in_hrs > 24) {
        var diff_in_days = Math.ceil(diff_in_hrs / 24);
        return format_time(diff_in_days, "day");
      }
      else {
        return format_time(diff_in_hrs, "hour");
      }
    }
    else {
      return format_time(diff_in_min, "min");
    }
  }
  else {
    return format_time(diff_in_sec, "sec");
  }
} 

function streamTweet(user){
    $("#new-tweet").hide();
    count = 0;
    var $body = $('.tweet-container');
    $body.html('');
    var index = 0;
    
    if (user === "home") {
      index = streams.home.length - 1;
    }
    else {
      index = streams.users[user].length - 1;
    }

    while(index >= 0){
      if (user === "home") {
        var tweet = streams.home[index];
      }
      else {
        var tweet = streams.users[user][index];
      }
      var $tweet = $('<div id=block class=well></div>');
      var $name = $('<a></a>');
      var $time = $('<small id=time-date></small>')
      var $timeelapsed = $('<small id=time></small><br>')
      var $message = $('<p></p>');
      
      $name.text('@' + tweet.user + ': ');
      $name.appendTo($tweet);
      
      var date = new Date();
      $time.text(' posted on ' + (date.getMonth()+1) + "/"
                + date.getDate()  + "/" 
                + date.getFullYear() + "  "  
                + date.getHours() + ":"  
                + date.getMinutes() + ":" + date.getSeconds());
      $time.appendTo($tweet);

      $timeelapsed.text(elapsedTime(tweet.created_at));
      $timeelapsed.appendTo($tweet);
      
      $message.text(tweet.message);
      $message.appendTo($tweet);

      // $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + elapsedTime(tweet.created_at));
      $tweet.css({
        'border': '1px solid #ccc'
      })
        $timeelapsed.css({
        'text-align':'center'
      })
      
      $tweet.appendTo($body);
      index -= 1;
    } 
  }

function streamUserI(){
    var $body = $('.people-follow');
    for(var key in streams){
      if(key === 'users')
        for(var key in streams.users){
          var user = key;
          var $user = $('<a id='+user+'></a><br>');
          $user.text('@' + user);
          $user.appendTo($body);
        }
    }

  }

  function streamUser(){
    var $body = $('.people-follow');
    for(var key in streams){
      if(key === 'users')
        for(var key in streams.users){
          var user = key;
          var $user = $('<a id='+user+'></a><br>');
          $user.text('@' + user);
          $user.appendTo($body);
        }
    }

  }

$(document).ready(function(){

  $("#new-tweet").hide();
  count = 0;
  nextTweet();
  streamTweet("home");
  streamUser();

});

$("#new-tweet").click(function() {
  streamTweet("home");
});

$(".people-follow").click(function() {
  streamTweet(event.target.id);
});

$('#myHome').click(function(){
  streamTweet("home");
})
