// app module
var app = angular.module('App', []);

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
	
	//login controller
	app.controller('LoginController', function ($scope) {
	    $scope.header = "Login";
	});
	
	//signup controller
	app.controller('SignupController', function ($scope) {
	    $scope.header = "Signup";
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