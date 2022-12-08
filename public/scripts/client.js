/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //Render tweet
  const renderTweets = function (tweets) {
    //clean our tweet container and only push new tweet
    $('#tweet-container').empty();
    for (let key of tweets) {
      $('#tweet-container').prepend(createTweetElement(key));
    }
  }

  const createTweetElement = (tweet) => {
    //using escape function to make textarea cannot change our files
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    //create tweet templete
    let $tweet = $(`
  <article class="tweet">
            <header>
              <div class="userInfo">
              <img src = ${tweet.user.avatars}>
                ${tweet.user.name}
              </div>
              <div class="userAccount">
                ${tweet.user.handle}
              </div>
            </header>
             <div class="userTweet">
                ${escape(tweet.content.text)}
             </div>
            <footer>
              <div class="date">
                ${timeago.format(tweet.created_at)}
              </div>
              <div class="interactButton">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>
  `);
    return $tweet;
  }

  //Fetching tweets with Ajax
  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data);
      });
  };

  //Button submission post
  $('.tweet-form').submit((event) => {
    //avoiding submit buttom takes to another page
    event.preventDefault();
    let userInput = $('.tweet-form').serialize();
    let userInput2 = $('#tweet-text').val();
    if (userInput2.length === 0) {
      //using jquery to change the css style and html content
      $('.erroMessage').css({color:'red', display:'block'})
      .html(
      `<i class="fa-solid fa-triangle-exclamation"></i>
       <p>tweet cannot be empty</p>`);
    } else if (userInput2.length > 140) {
      $('.erroMessage').css({color:'red', display:'block'}).html(
      `<i class="fa-solid fa-triangle-exclamation"></i>
      <p>tweet cannot be empty</p>`);
    } else {
      //clear the erro message
      $('.erroMessage').css({display:'none'});
      //post userinput to /tweets backend
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: userInput
      }
      )
        .then((data) => {
          //reset our textarea to be clean
          $('#tweet-text').val('');
          //reset our counter to 140
          $('.counter').val('140')
          loadtweets(data)
        });
    }
  })
  //load all tweets we had on homepage
  loadtweets();

});
