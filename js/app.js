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

// applications controller
app.controller('ApplicationsController', function ($scope) {
    $scope.header = "Applications";
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
    
    // Checks if fields are filled in the correct format
    $scope.verify = function () {
    	if(!$scope.account.username)
    		alert("Please enter a value for account name");
    	else 
    		if(!$scope.account.name)
    			alert("Please enter a value for full name");
		else 
    		if(!$scope.account.email)
    			alert("Please enter a value for email");
		else 
    		if($scope.account.email.indexOf('@') === -1 || $scope.account.email.indexOf('.') === -1)
    			alert("Please enter a valid email");
    	else
    		$scope.check();
    };
        
    // Checks if a username exists
    $scope.check = function () {
    	$scope.error = false;
    	$scope.showLoading = true;
    	document.getElementById("btnCheck").value = "Checking...";
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
      	  	document.getElementById("btnCheck").value = "Check account name availability";
      	  	//$scope.$digest();
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
        	  //$scope.$digest();
          } else {
        	  console.log('Failed - HTTP '+ status, data);
          }
        });
    };
     
    // Completes form and submit
    $scope.submit = function () {
  	  	$scope.comfirm = false;
  	  	$scope.showLoading = true;
  	  	document.getElementById("btnSubmit").value = "Creating...";
  	  	$scope.actionUrl = "https://" + $scope.account.username + "." + $scope.account.domain + "/,system/newCert";
  	  	//$scope.actionUrl = $sce.trustAsResourceUrl($scope.actionUrl);
  	  	document.getElementById("signupForm").submit();
  	  	redirect();
  	  	//$location.path("https://" + $scope.account.username + "." +  $scope.account.domain);
    };
    
    // Redirects URL after form submit
    function redirect() {
		var delay=5000; //5 seconds
		setTimeout(function(){	 
			var url = "https://" + document.getElementById("username").value + "." + document.getElementById("domain").options[0].text;
		     
		     // IE8 and lower fix
		     if (navigator.userAgent.match(/MSIE\s(?!9.0)/))
		     {
		         var referLink = document.createElement("a");
		         referLink.href = url;
		         document.body.appendChild(referLink);
		         referLink.click();
		     }
		     
		     // All other browsers
		     else { window.location.assign(url); }
	
	     }, delay);
	} 
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
    .when('/applications',
        {
            controller: 'ApplicationsController',
            templateUrl: 'views/applications.html'
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