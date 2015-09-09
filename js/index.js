var myApp=angular.module("myApp",[]);
myApp.controller("WeatherCtlr",["$scope","$interval","weaterServices",function($scope,$interval,weaterServices){
  $scope.date=new Date();
  $scope.icon={
    "02n":"ion-ios-partlysunny-outline",
    "01d":"ion-ios-sunny-outline",
    "02d":"ion-ios-partlysunny-outline",
    "03d":"ion-ios-cloudy-outline",
    "10d":"ion-ios-rainy-outline",
    "01n":"ion-ios-sunny"
  };
  $scope.lat=23.71;
  $scope.lon=90.41;
  function onGeoSuccess(position){
    $scope.lat=positon.coords.latitude;
    $scope.lon=positon.coords.longitude;
    console.log(positon.coords.latitude);
  
  };
  $scope.onGeoError=function(){
    alert("Since the app is unable to detect your GEO location, it uses Dhaka, Bangladesh as its default location");
  };
 $scope.geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};
  $scope.getGeoLocation=function($scope){
    
              if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {

                $scope.lat = position.coords.latitude; 
                $scope.lon = position.coords.longitude;
                console.log($scope.lat);
                
        },$scope.onGeoError,$scope.getGeoLocation);
    }
  
  };//($scope);
  
  $scope.weather={};
  var timer;
  $scope.timer=$interval(function(){
    $scope.date=new Date();
  },1000);
  var interval;
  $scope.loadWeather=function(){
      interval=$interval(function(){
    $scope.getWeather($scope.lat,$scope.lon);
  },60000);
  }();

  $scope.getWeather=function(lat,lon){
    weaterServices.getTodaysWeater(lat,lon)
      .then(function(response){
      $scope.weather=response.data;
      //console.log(response);
    },function(reason){
      //console.log(reason);
    });
  };
  $scope.getWeather($scope.lat,$scope.lon);
}]);

myApp.factory("weaterServices",function($http){
  var _getTodaysWeater=function(lat,lon){
    return $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric");
  };
  return {
    getTodaysWeater:_getTodaysWeater
  };
});