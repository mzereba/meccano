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
    $scope.show = true;
 
    $scope.test = function (account) {
    	$scope.error = true;
  	  	$scope.account.user= "";
  	  	$scope.isFocused = true;
  	  	//$location.path( "/login" );
    };
    
    // checks if the account name exists
    $scope.check = function (account) {
    	var uri = "";
        $http({
          method: 'POST', 
          url: uri,
          data: account,
          headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'text/html'
          },
          withCredentials: true
        }).
        success(function(data, status, headers) {
          if (status == 200 || status == 201) {
        	  //Account created
        	  $scope.result = data;
        	  $location.path(""); 
          }
        }).
        error(function(data, status) {
          if (status == 401) {
            console.log('Forbidden', 'Authentication required to create a new account.');
          } else if (status == 403) {
        	  console.log('Forbidden', 'You are not allowed to create a new account with this name.');
        	  //If account name already taken
        	  $scope.error = true;
        	  $scope.account.user= "";
        	  $scope.isFocused = true;
        	  //$scope.$digest();
          } else {
        	  console.log('Failed '+ status + data);
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