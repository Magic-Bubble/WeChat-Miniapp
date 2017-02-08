// pages/music/music.js
var imgUrls = [
  "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/music1.png",
  "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/music2.png",
  "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/music3.png",
  "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/music4.png",
  "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/music5.png"
];

var musicUrls = [{
    name: "成都",
    author: "赵雷 / 歌手 第3期",
    poster: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/poster1.png",
    url: "http://ws.stream.qqmusic.qq.com/200576210.m4a?fromtag=46"
  },{
    name: "很奇怪我爱你",
    author: "张杰 / 歌手 第3期",
    poster: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/poster1.png",
    url: "http://ws.stream.qqmusic.qq.com/200576209.m4a?fromtag=46"
  },{
    name: "Run",
    author: "林忆莲 / 歌手 第3期",
    poster: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/poster1.png",
    url: "http://ws.stream.qqmusic.qq.com/200576202.m4a?fromtag=46"
  }, {
    name: "告白气球",
    author: "周杰伦 / 床边故事",
    poster: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/poster4.png",
    url: "http://ws.stream.qqmusic.qq.com/107192078.m4a?fromtag=46"
  }, {
    name: "舍不得",
    author: "迪丽热巴 / 漂亮的李慧珍",
    poster: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/poster5.png",
    url: "http://ws.stream.qqmusic.qq.com/200506552.m4a?fromtag=46"
  }
];

Page({
  data: {
      imgUrls: imgUrls,
      poster: musicUrls[0].poster,
      name: musicUrls[0].name,
      author: musicUrls[0].author,
      audioSrc: musicUrls[0].url,
      musicUrls: musicUrls
  },
  playMusic: function(e){
      var music = musicUrls[e.currentTarget.id];
      this.setData({
          poster: music.poster,
          name: music.name,
          author: music.author,
          audioSrc: music.url
      });
  }
})