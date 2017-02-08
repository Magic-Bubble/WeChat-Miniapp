// pages/run/run.js
var latitude = 0,
    longitude = 0,
    position = [],
    distance = 0,
    time = 0;

var initialData = {
    start: false,
    pause: false,
    markers: [],
    polyline: [],
    distance: 0,
    speed: "0'00''",
    time: "00:00:00",
    calorie: 0
}

function getDistance(lat1,lng1,lat2,lng2){
  var deltaLng = (lng1-lng2)*Math.PI/180;
  var deltaLat = (lat1-lat2)*Math.PI/180;
  return 2*Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat/2),2)+Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(deltaLng/2),2)))*6378.137;
}

function getSpeed(ms, km){
  var s_per_km = ms/1000/km;
  var min = s_per_km/60;
  var second = (s_per_km-min*60)
  return min + "'" + second + "''";
}

function time_format(ms){
  var second = Math.floor(ms/1000);
  var hr = fill_zero_prefix(Math.floor(second/3600));
  var min = fill_zero_prefix(Math.floor((second-hr*3600)/60));
  var sec = fill_zero_prefix(Math.floor((second-hr*3600-min*60)));
  return hr + ":" + min + ":" + sec;
}

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

function getCalorie(km){
  return 48*km*1.036;
}

Page({
  data: initialData,
  onLoad: function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });
  },
  startRun: function(){
    this.setData({
      start: true
    });
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        position.push({latitude:latitude,longitude:longitude});
        that.setData({
          markers: [{
            iconPath: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/marker.png",
            latitude: latitude,
            longitude: longitude,
            width: 30,
            height: 30
          }]
        });
      }
    });
    this.clock1 = setTimeout(this.updateTime, 1000);
    this.clock30 = setTimeout(this.updateLocation, 10000);
  },
  pauseRun: function(){
    this.setData({
      pause: true
    });
    clearTimeout(this.clock1);
    clearTimeout(this.clock30);
  },
  stopRun: function(){
    distance = 0;
    time = 0;
    position = [];
    this.setData(initialData);
    clearTimeout(this.clock1);
    clearTimeout(this.clock30);
  },
  goonRun: function(){
    this.setData({
      pause: false
    });
    this.clock1 = setTimeout(this.updateTime, 1000);
    this.clock30 = setTimeout(this.updateLocation, 10000);
  },
  updateTime: function(){
    time += 1000;
    this.setData({
      time: time_format(time)
    });
    var that = this;
    this.clock1 = setTimeout(function(){
      that.updateTime();
    }, 1000);
  },
  updateLocation: function(){
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var oldlat = latitude;
        var oldlng = longitude;
        latitude = res.latitude;
        longitude = res.longitude;
        position.push({latitude:latitude,longitude:longitude});
        distance += getDistance(oldlat,oldlng,latitude,longitude);
        this.setData({
          distance: distance,
          speed: getSpeed(time, distance),
          calorie: getCalorie(weight, distance),
          markers: [{
            iconPath: "http://o7iop8z5f.bkt.clouddn.com/wechat/miniapps/app1/marker.png",
            latitude: latitude,
            longitude: longitude,
            width: 30,
            height: 30
          }],
          polyline: [{
            points: position,
            color:"red",
            width: 2
          }]
        });
      }
    });
    var that = this;
    this.clock30 = setTimeout(function(){
      that.updateLocation();
    }, 10000);
  }
})