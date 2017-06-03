$(document).ready(function(){
  console.log('test page is ready');
  var allChannels = [];
  var offlineChannels = [];
  var onlineChannels = [];

  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for(var i = 0; i < channels.length; i++)
  {
    getChannelDetails(channels[i]);
  }

  function getChannelDetails(channelName){
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + channelName,
      headers:{
        'Client-ID': 'ilkpt01snn44oyhrwpyw2zeukfboet'
      },
      success: function(data){
        allChannels.push(data);
        $('#channel-container').append(appendThis);
        if (data.stream != null) {
          onlineChannels.push(data);
          var logo = data.stream.channel.logo;
          var name = data.stream.channel['display_name'];
          var description = data.stream.channel.status;
          var link = 'https://www.twitch.tv/' + name;
          var status = 'online';
          console.log(logo);
          console.log(name);
          console.log(status);
          console.log(link);
          $('.channel-logo').last().attr("src", logo);
          $('.channel-name').last().text(name);
          $('.status').last().text(status);
          $('.channel-description').last().text(description);
          $('.channel-link').last().attr("href", link);
        }
        else {
          var name = channels[i];
          var status = 'offline';
          var description = 'The channel is currently offline';
          $('.channel-link').last().addClass("disable");
          $('.channel-logo').last().attr("src", "http://via.placeholder.com/350x150");
          $('.channel-name').last().text(name);
          $('.status').last().text(status);
          $('.channel-description').last().text(description);
          offlineChannels.push(data);
        }
      }
    });
  }

  var appendThis = '<div class="channel-inner-container col-xs-10 col-xs-offset-1"><div class="channel-logo-wrapper col-sm-6 col-sm-offset-3 col-md-2 col-md-offset-0 text-center"><img class="channel-logo" src=""></div><div class="channel-details col-sm-11 col-sm-offset-1 col-lg-10 col-sm-offset-0"><div class="name-status col-xs-3"><p class="channel-name"></p><p class="status"></p></div><p class="channel-description col-xs-6"></p><a class="channel-link" href="" target="_blank"><button class="btn btn-primary">Watch</button></a></div></div>';

  // $('#all').click(function () {
  //   console.log('clicked');
  // });

  console.log(allChannels);
  // console.log(onlineChannels);
  // console.log(offlineChannels);
});
