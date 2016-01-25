// app module
var app = angular.module('App', []);

app.directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );

                }
            });
        }
    };
});

// home controller
app.controller('HomeController', function ($scope) {
    $scope.header = "Welcome to Meccano.io";
});

// about controller
app.controller('AboutController', function ($scope) {
    $scope.header = "About";
});

// store controller
app.controller('StoreController', function ($scope) {
    $scope.header = "Application Store";
});

// login controller
app.controller('LoginController', function ($scope) {
    $scope.header = "Login";
});

// signup controller
app.controller('SignupController', function ($scope, $http, $location) {
    $scope.header = "Signup";
    $scope.isFocused = true;
    $scope.error = false;
    $scope.comfirm = false;
    $scope.submitForm = false;
    $scope.showLoading = false;
    
    $scope.domains = ["meccano.io"];
    
    $scope.account = {
    		domain: $scope.domains[0]
    };
        
    // Check if a username exists
    $scope.check = function () {
    	document.getElementById("btnSubmit").value = "Checking...";
    	$scope.showLoading = true;
    	var uri = "https://" + $scope.account.username + "." + $scope.account.domain;
    	$http({
          method: 'HEAD',
          url: uri,
          withCredentials: true
        }).
        success(function(data, status, headers) {
        	//username exists, warn user to create a different one
      	  	$scope.showLoading = false;
        	$scope.error = true;
      	  	$scope.username= "";
      	  	$scope.isFocused = true;
      	  	document.getElementById("btnSubmit").value = "Check if account name exists";
      	  	$scope.$digest();
        }).
        error(function(data, status) {
          if (status == 401) {
        	  console.log('Forbidden', 'Authentication required to create a user for: '+ username);
          } else if (status == 403) {
        	  console.log('Forbidden', 'You are not allowed to access storage for: '+ username);
          } else if (status == 404) {
        	  //username not existing, enable form submitting
        	  $scope.showLoading = false;
        	  $scope.submitForm = true;
        	  $scope.comfirm = true;
        	  //document.getElementById("btnSubmit").value = "Submit";
        	  $scope.$digest();
          } else {
        	  console.log('Failed - HTTP '+ status, data);
          }
        });
    };
     
    // Completes form and submit
    $scope.submit = function () {
  	  	document.getElementById("btnSubmit").value = "Creating...";
  	  	$scope.comfirm = false;
  	  	$scope.showLoading = true;
  	  	$scope.actionUrl = "https://" + $scope.account.username + "." + $scope.account.domain + "/,system/newCert";
  	  	//$scope.actionUrl = $sce.trustAsResourceUrl($scope.actionUrl);
  	  	document.getElementById("signupForm").submit();     
    };
    
    // Creates the account
    $scope.create = function () {
  	  	//$scope.account.spkac = document.getElementById("spkac");
  	  	document.getElementById("submit").value = "Creating account...";
    	var uri = "https://" + document.getElementById("username").value + ".databox.me/,system/newCert";
    	
        $http({
          method: 'POST', 
          url: uri,
          //data: $.param({account : $scope.account}),
          data: $("#signupForm").serialize(),
          headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
        	'Accept': 'application/x-x509-user-cert'
          },
          withCredentials: true
        }).
        success(function(data, status, headers) {
          if (status == 200 || status == 201) {
        	  //Account created
        	  $scope.result = data;
        	  //$location.path(""); 
          }
        }).
        error(function(data, status) {
          document.getElementById("submit").value = "Submit";
          if (status == 401) {
            console.log('Forbidden', 'Authentication required to create a new account.');
          } else if (status == 403) {
        	  console.log('Forbidden', 'You are not allowed to create a new account with this name.');
          } else {
        	  console.log('Failed - HTTP '+status, data, 500);
          }
        });
    };
        
});

// post controller
app.controller('PostController', function ($scope) {
    $scope.header = "Posts";

    // define posts json
    $scope.posts =  [{
        "id": "1",
        "title": "Vestibulum Id Ligular",
        "author": "bob",
        "intro": "Aenean lacinia bibendum nulla sed consectetur",
        "extended": "Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
    },{
        "id": "2",
        "title": "Porta Felis Euismod Semper",
        "author": "tom",
        "intro": "Integer facilisis aliquet leo",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "3",
        "title": "Tellus Vehicula Mattis Aenean",
        "author": "jill",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
    },{
        "id": "4",
        "title": "Vulputate Ornare Justo",
        "author": "marge",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },{
        "id": "5",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    }];
});

// routes
app.config(function ($routeProvider) {

   $routeProvider
    .when('/',
        {
            controller: 'HomeController',
            templateUrl: 'views/welcome.html'
        })
    .when('/about',
        {
            controller: 'AboutController',
            templateUrl: 'views/about.html'
        })
    .when('/store',
        {
            controller: 'StoreController',
            templateUrl: 'views/store.html'
        })
    .when('/posts',
        {
            controller: 'PostController',
            templateUrl: 'views/posts.html'
        })
    .when('/login',
        {
            controller: 'LoginController',
            templateUrl: 'views/login.html'
        })
    .when('/signup',
        {
            controller: 'SignupController',
            templateUrl: 'views/signup.html'
        })
    .otherwise({ redirectTo: '/' });
});