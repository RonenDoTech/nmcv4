var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//    $scope.loadNews = function() {
//        console.log("loadNews fire");
//        allnews.controller.
//    };
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

app.controller('mainAppCtrl', function($scope,$ionicSlideBoxDelegate) {
  // $scope.playlists = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chill', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];

  $scope.nextSlide = function(index) {
     $scope.testID = $ionicSlideBoxDelegate.currentIndex();
    console.log('the Slide Index : ' + $ionicSlideBoxDelegate.currentIndex() + ', this index is : ' + index);
  }

  $scope.slideChanged = function() {

    console.log("work" + index);
  };

  function pagerclick() {
    console.log("clickTag");
  }
});

var allnews = app.controller('newsCtrl', function($scope, $stateParams,$http) {
   var url;
  $scope.newsPosts = []; // array
  console.log("i'm news ctrl, array size : " + $scope.newsPosts.length);
  url = 'http://www.nmc.dotech.co.il/action/action.php';
  
  var params = {act : 'newsList','k':k};
    
    $http.get(url, {params: params}).success(function (response){
      angular.forEach(response.result, function(child) {
        $scope.newsPosts.push(child);
        console.log(child);
      });
    }); // end of http get
   console.log("First Get Http , array size : " + $scope.newsPosts.length);

   //ion-refresher function
    $scope.loadNewerNews = function() {
     $scope.newsPosts = []; // clear the array for new posts
     // console.log("loadNewerNews Fire , size:" + $scope.newsPosts.length);
      var params = {act : 'newsList','k':k};
      //var i = 0;
        
     $http.get(url, {params: params}).success(function (response){
      angular.forEach(response.result, function(child) {
          //i++;
                // console.log("counter : " + i + "," + child);
                 $scope.newsPosts.push(child);

       });
    })
    .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    }
});

app.controller('newsPostCtrl', function($scope, $stateParams,$http) {
  console.log("i'm news Post ctrl");
   console.log($stateParams.PostId);
   $scope.PostId = $stateParams.PostId; // get the id of the post!
   var itemId = $stateParams.PostId;
   // Get The Current Post News From json
  var url1 = 'http://www.nmc.dotech.co.il/action/action.php';
 
    var params = {act : 'article', itemId : itemId ,'k' : k};

    $http.get(url1,{params: params}).success(function (response){
      $scope.Post = response.result;
      //console.log(response.result);
      // search the spicified id for the post 
      // angular.forEach(response.result, function(child) {
      //   if(child.id == $stateParams.PostId){
      //     console.log('get it = ' + child.id);
      //     $scope.newsPost = child; // add the object by the id we found!
      //   }
        //console.log(child.id);
      });


      //console.log(response.result[0]);
      // angular.forEach(response.result, function(child) {
      //   $scope.newsPosts.push(child);
      //   console.log(child);
      // });

    });

app.controller('mvtsaimCtrl', function($scope, $stateParams) {
  console.log("i'm mvtsaim ctrl");
});

app.controller('servicesCtrl', function($scope, $stateParams,$http) {
 var params;
 var url;
   url = 'http://www.nmc.dotech.co.il/action/action.php';
  
  console.log("i'm services ctrl");
  
  $scope.services = []; // array
  //var url1 = 'http://crm.dotech.co.il/events.json.php';
  // var url = 'https://www.reddit.com/r/android/new/.json';
  //var url1 = 'http://www.nmc.dotech.co.il/action/action.php';
  
  params = {act : 'services','k':k};
    $http.get(url, {params: params}).success(function (response){
      //console.log(response.result[0]);
      angular.forEach(response.result, function(child) {
        $scope.services.push(child);
        console.log(child);
      });
    });
});

app.controller('PlaylistCtrl', function($scope, $stateParams) {
  console.log("i'm PlaylistCtrl ctrl");
});


app.controller('googleloginController', function($scope, $stateParams, $cordovaOauth, $http) {
                   $scope.googleLogin = function(){
                    $cordovaOauth.google("189330024722-c0etdhu8iuqpsqbelb38vtp0kov05vhc.apps.googleusercontent.com", 
                      ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email", 
                      "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).
                    then(function(result){
                      console.log("google login success");
                      $scope.res = result;
                      var accessToken;
                      //$location.url('/scan');
                      console.log(JSON.stringify(result));
                      accessToken = JSON.stringify(result);
                      console.log(result.access_token);
                      console.log(typeof(result.access_token));

                      //getting profile info of the user
                      $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
                      success(function(response){
                               //console.log(response);
                              var param = {
                                provider: 'google',
                                  google: {
                                                uid: response["id"],
                                                provider: 'google',
                                                first_name: response["name"]["givenName"],
                                                last_name: response["name"]["familyName"],
                                                email: response.emails[0]["value"],
                                                image: response.image.url
                                            }
                                };
                                console.log(param);
                                $scope.data = param;
                                $scope.name = response["name"]["givenName"];
                                $scope.email = response.emails[0]["value"];
                                $scope.last_name = response["name"]["familyName"];
                                $scope.tmona = response.image.url;
                      }, function(error) {
                      console.log(error);
                    });

                  }, function(error){
                    console.log(error);
                    $scope.err1 = error;
                  });
                                     }
});
