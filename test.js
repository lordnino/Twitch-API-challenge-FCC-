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
      success: function (data) {
        allChannels.push(data);
        if (data.stream != null) {
          onlineChannels.push(data);
        } else {
          offlineChannels.push(data);
        }
        addChannelLayout();
        addingChannel(data);
      }
    });
  }
  
  function addChannelLayout() {
    $('#channel-container').append(appendThis);
  }

  function addingChannel(channel) {
    var logo;
    var name;
    var description;
    var link;
    var status;
    if (channel.stream != null) {
      logo = channel.stream.channel.logo;
      name = channel.stream.channel['display_name'];
      description = channel.stream.channel.status;
      link = 'https://www.twitch.tv/' + name;
      status = 'online';
      $('.channel-logo').last().attr("src", logo);
      $('.channel-name').last().text(name);
      $('.status').last().text(status);
      $('.channel-description').last().text(description);
      $('.channel-link').last().attr("href", link);
    } else {
      name = channels[i];
      status = 'offline';
      description = 'The channel is currently offline';
      $('.channel-link').last().addClass("disable");
      $('.channel-logo').last().attr("src", "https://yt3.ggpht.com/-kg5DREJ1s-U/AAAAAAAAAAI/AAAAAAAAAAA/QPxmSz_S_eQ/s100-c-k-no-mo-rj-c0xffffff/photo.jpg");
      $('.channel-name').last().text(name);
      $('.status').last().text(status);
      $('.channel-description').last().text(description);
    }
  }

  $('#all').click(function () {
    $('.btn').removeClass('btn-active');
    $('#all').addClass('btn-active');
    $('#channel-container').empty();
    for (var i = 0; i < allChannels.length; i++){
      addChannelLayout();
      addingChannel(allChannels[i]);
    }
  });

  $('#offline').click(function () {
    $('.btn').removeClass('btn-active');
    $('#offline').addClass('btn-active');
    $('#channel-container').empty();
    for (var i = 0; i < offlineChannels.length; i++) {
      addChannelLayout();
      addingChannel(offlineChannels[i]);
    }
  });

  $('#online').click(function () {
    $('.btn').removeClass('btn-active');
    $('#online').addClass('btn-active');
    $('#channel-container').empty();
    for (var i = 0; i < onlineChannels.length; i++){
      addChannelLayout();
      addingChannel(onlineChannels[i]);
    }
  });

  var appendThis = '<div class="channel-inner-container col-xs-10 col-xs-offset-1"><div class="channel-logo-wrapper col-sm-6 col-sm-offset-3 col-md-2 col-md-offset-0 text-center"><img class="channel-logo" src=""></div><div class="channel-details col-sm-11 col-sm-offset-1 col-lg-10 col-sm-offset-0"><div class="name-status col-xs-3"><p class="channel-name"></p><p class="status"></p></div><p class="channel-description col-xs-6"></p><a class="channel-link" href="" target="_blank"><button class="btn btn-primary">Watch</button></a></div></div>';

  console.log(allChannels);
});
