var baseurl = 'http://localhost:3000/api/'
var img_url = 'http://localhost:3000/uploads/'
var app = angular.module("myApp", ["ngRoute"]);
app.value('domainurl_img', 'http://localhost:3000/uploads/');
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./templates/main.htm",
        controller: 'homeCtrl',
        access: { requiredLogin: true },
        activetab: 'dashboard'
    })
    .when("/login", {
        templateUrl : "templates/login.htm",
        controller: 'loginCtrl',
        access: { requiredLogin: false }
    })
    .when("/logout", {
        template: '<div>Logout</div>',
        controller: 'logoutCtrl',
        access: { requiredLogin: false }
    })
    .when("/download", {
        templateUrl : "templates/download.htm",
        controller: 'downloadCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/download/new", {
        templateUrl : "templates/download-new.htm",
        controller: 'downloadNewCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/download/edit/:id", {
        templateUrl : "templates/download-edit.htm",
        controller: 'downloadEditCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/download/publish/:id", {
        template : "<div></div>",
        controller: 'downloadPublishCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/download/unpublish/:id", {
        template : "<div></div>",
        controller: 'downloadUnPublishCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/download/delete/:id", {
        template : "<div></div>",
        controller: 'downloadDeleteCtrl',
        access: { requiredLogin: true },
        activetab: 'download'
    })
    .when("/content", {
        templateUrl : "templates/announcement.htm",
        controller: 'announcementCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    .when("/content/new", {
        templateUrl : "templates/announcement-new.htm",
        controller: 'announcementNewCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    .when("/content/edit/:typeid/:depttid/:contentid", {
        templateUrl : "templates/announcement-edit.htm",
        controller: 'announcementEditCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    .when("/content/publish/:id", {
        template : "<div></div>",
        controller: 'announcementPublishCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    .when("/content/unpublish/:id", {
        template : "<div></div>",
        controller: 'announcementUnPublishCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    .when("/content/delete/:id", {
        template : "<div></div>",
        controller: 'announcementDeleteCtrl',
        access: { requiredLogin: true },
        activetab: 'content'
    })
    /*
    .when("/news", {
        templateUrl : "templates/news.htm",
        controller: 'newsCtrl',
        access: { requiredLogin: true },
        activetab: 'news'
    })
    .when("/news/new", {
        templateUrl : "templates/news-new.htm",
        controller: 'newsNewCtrl',
        access: { requiredLogin: true },
        activetab: 'news'
    })
    .when("/news/edit/:typeid/:depttid/:contentid", {
        templateUrl : "templates/news-edit.htm",
        controller: 'newsEditCtrl',
        access: { requiredLogin: true },
        activetab: 'news'
    })
    .when("/news/delete/:id", {
        template : "<div></div>",
        controller: 'newsDeleteCtrl',
        access: { requiredLogin: true },
        activetab: 'news'
    })

    .when("/policy", {
        templateUrl : "templates/policy.htm",
        controller: 'policyCtrl',
        access: { requiredLogin: true },
        activetab: 'policy'
    })
    .when("/policy/new", {
        templateUrl : "templates/policy-new.htm",
        controller: 'policyNewCtrl',
        access: { requiredLogin: true },
        activetab: 'policy'
    })
    .when("/policy/edit/:typeid/:depttid/:contentid", {
        templateUrl : "templates/policy-edit.htm",
        controller: 'policyEditCtrl',
        access: { requiredLogin: true },
        activetab: 'policy'
    })
    .when("/policy/delete/:id", {
        template : "<div></div>",
        controller: 'policyDeleteCtrl',
        access: { requiredLogin: true },
        activetab: 'policy'
    })*/
    .when("/videos", {
        templateUrl : "templates/videos.htm",
        controller: 'videoCtrl',
        access: { requiredLogin: true },
        activetab: 'videos'
    });

    $locationProvider.html5Mode(true);
});
app.run(function($rootScope, $location,  $document) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {        
        const isLogin = window.localStorage.getItem("isLoggedIn")
        if (nextRoute.access.requiredLogin && !isLogin) {       

            //store the referrer page for redirect after logged-in
            $document.params = nextRoute.params; //store the parameters                       
            $document.referrer = nextRoute.$$route.originalPath; //store the original url

            //redirect user to the login page 
            $location.path("/login");

        }
    });    
});


app.controller('logoutCtrl', ['$scope', '$location',  function ($scope, $location) {
    window.localStorage.setItem("isLoggedIn", '');
    window.localStorage.setItem("token", '');
    window.localStorage.setItem("useremail", '');
    window.localStorage.setItem("userid", '');
    window.localStorage.setItem("usertype", '');
    $location.path("/login");
}]);

app.controller('loginCtrl', ['$scope', '$http', '$location',  function ($scope, $http, $location) {
    $scope.useremail = "admin@testapp.com"
    $scope.userpassword = "123456"
    $scope.login = function(){
        $scope.errormsg = ''
        $scope.formdata = {"email": $scope.useremail, "password": $scope.userpassword}
        //$http.post("http://localhost:3000/api/user/login", $scope.formdata)
        $http({
            method: 'POST',
            url: baseurl+'user/login',
            data: $.param($scope.formdata),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(res) {
            var response = res.data
            console.log(response)
            if(response.status){
                var user = response.user
                window.localStorage.setItem("isLoggedIn", true);
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("useremail", user.useremail);
                window.localStorage.setItem("userid", user.userid);
                window.localStorage.setItem("usertype", user.usertype);
                $location.path("/");
            } else{
                $scope.errormsg = response.msg
            }
        });
    }
}]);

app.controller('homeCtrl', ['$scope', '$route', '$http',  function ($scope, $route, $http) {
    $scope.$route = $route;
}]);

app.controller('downloadCtrl', ['$scope', '$route', '$http', 'domainurl_img', function ($scope, $route, $http, domainurl_img) {
    $scope.$route = $route;
    $scope.download_videos = [];
    $scope.download_category = [];
    $scope.domainurl_img = domainurl_img;
    $scope.usertype = window.localStorage.getItem('usertype');
    $http({
        method: 'GET',
        url: baseurl+'download/category',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.download_category = response.categories
    });
    $http({
        method: 'GET',
        url: baseurl+'download',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.download_videos = response.video;
    });
}]);


app.controller('downloadNewCtrl', ['$scope', '$route', '$http', '$location', 'domainurl_img', function ($scope, $route, $http, $location,domainurl_img) {
    $scope.$route = $route;
    $scope.domainurl_img = domainurl_img
    $scope.departments = [];
    $scope.download_category = [];
    $scope.countries = [];
    $scope.myFile = {};
    $scope.formdata = {}
    $scope.formdata.deptt_id = ''
    $scope.errormsg = [];

    $http({
        method: 'GET',
        url: baseurl+'download/category',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.download_category = response.categories
    });

    $http({
        method: 'GET',
        url: baseurl+'department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.departments = response.department
    });
    $http({
        method: 'GET',
        url: baseurl+'country',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.countries = response.countries
    });

    $scope.submitVideo = function(){
        console.log($scope.formdata);
        $http({
            method: 'POST',
            url: baseurl+'download',
            data: $.param($scope.formdata),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            if(response.status){
                $location.path("/download");
            } else {
                $scope.errormsg = response.msg
            }
        });
    }        


    $scope.uploadIcon = function(){
        var image = $("#downloadIconField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.download_icon = response.filename;
        });
    }
    $scope.uploadVideo = function(){
        var image = $("#downloadVideoField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'download/upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.download_video = response.filename;
        });
    }

}]);

app.controller('downloadEditCtrl', ['$scope', '$routeParams', '$http', '$location', '$route', 'domainurl_img',  function ($scope, $routeParams, $http, $location, $route, domainurl_img) {
    $scope.$route = $route;
    var downloadid = $routeParams.id;
    $scope.domainurl_img = domainurl_img
    $scope.departments = [];
    $scope.download_category = [];
    $scope.countries = [];
    $scope.myFile = {};
    $scope.formdata = {}
    $scope.formdata.deptt_id = ''
    $scope.errormsg = [];

    $http({
        method: 'GET',
        url: baseurl+'download/category',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.download_category = response.categories
    });

    $http({
        method: 'GET',
        url: baseurl+'department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.departments = response.department
    });
    $http({
        method: 'GET',
        url: baseurl+'country',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.countries = response.countries
    });
    $http({
        method: 'GET',
        url: baseurl+'download/id/'+downloadid,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.formdata = response.download[0];
    });

    $scope.submitVideo = function(){
        console.log($scope.formdata);
        $http({
            method: 'PUT',
            url: baseurl+'download/'+downloadid,
            data: $.param($scope.formdata),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            if(response.status){
                $location.path("/download");
            } else {
                $scope.errormsg = response.msg
            }
        });
    }        


    $scope.uploadIcon = function(){
        var image = $("#downloadIconField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.download_icon = response.filename;
        });
    }
    $scope.uploadVideo = function(){
        var image = $("#downloadVideoField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'download/upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.download_video = response.filename;
        });
    }

}]);
app.controller('downloadDeleteCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'DELETE',
        url: baseurl+'download/'+id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/download");
    });
}]);

app.controller('downloadPublishCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'PUT',
        url: baseurl+'download/publishstatus/'+id,
        data: $.param({publishstatus: 1}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/download");
    });
}]);

app.controller('downloadUnPublishCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'PUT',
        url: baseurl+'download/publishstatus/'+id,
        data: $.param({publishstatus: 0}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/download");
    });
}]);


app.controller('announcementCtrl', ['$scope', '$route', '$http', 'domainurl_img', function ($scope, $route, $http, domainurl_img) {
    $scope.$route = $route;
    $scope.announces = []
    $scope.domainurl_img = domainurl_img
    $scope.usertype = window.localStorage.getItem('usertype')
    $http({
        method: 'GET',
        url: baseurl+'content/all',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.announces = response.content
    });


}]);



app.controller('announcementNewCtrl', ['$scope', '$route', '$http', '$location', 'domainurl_img', function ($scope, $route, $http, $location,domainurl_img) {
    $scope.$route = $route;
    $scope.domainurl_img = domainurl_img
    $scope.departments = [];
    $scope.myFile = {};
    $scope.formdata = {}
    $scope.formdata.deptt_id = ''
    $scope.formdata.content_image = ''
    $scope.errormsg = [];
    $scope.contenttypes = [];
    $scope.countries = [];
    $scope.polycats = [];

    $http({
        method: 'GET',
        url: baseurl+'contenttypes',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.contenttypes = response.contenttypes
    });
    $http({
        method: 'GET',
        url: baseurl+'policy/category',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.polycats = response.polycats
    });

    $http({
        method: 'GET',
        url: baseurl+'country',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.countries = response.countries
    });

    $http({
        method: 'GET',
        url: baseurl+'department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.departments = response.department
    });

    $scope.submitAnnouncement = function(){
        console.log($scope.formdata);
        $http({
            method: 'POST',
            url: baseurl+'content',
            data: $.param($scope.formdata),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            if(response.status){
                $location.path("/content");
            } else {
                $scope.errormsg = response.msg
            }
        });
    }

    $scope.uploadFile = function(){
        var image = $("#myFileField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.content_image = response.filename;
        });
    }

}]);

app.controller('announcementEditCtrl', ['$scope', '$routeParams', '$http', '$location', '$route', 'domainurl_img',  function ($scope, $routeParams, $http, $location, $route, domainurl_img) {
    var typeid = $routeParams.typeid;
    var depttid = $routeParams.depttid;
    var contentid = $routeParams.contentid;
    $scope.formdata = {};
    $scope.domainurl_img = domainurl_img
    $scope.departments = [];
    $scope.$route = $route;
    $scope.contenttypes = [];
    $scope.countries = [];

    $http({
        method: 'GET',
        url: baseurl+'country',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.countries = response.countries
    });

    $http({
        method: 'GET',
        url: baseurl+'contenttypes',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.contenttypes = response.contenttypes
    });

    $http({
        method: 'GET',
        url: baseurl+'department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        console.log(response)
        $scope.departments = response.department
    });
    $http({
        method: 'GET',
        url: baseurl+'content/'+typeid+"/"+depttid+"/"+contentid,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $scope.formdata = response.content[0];
        console.log($scope.formdata)
    });

    $scope.updateAnnouncement = function(){
        console.log($scope.formdata);
        $http({
            method: 'PUT',
            url: baseurl+'content/'+$scope.formdata.content_id,
            data: $.param($scope.formdata),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            if(response.status){
                $location.path("/content");
            } else {
                $scope.errormsg = response.msg
            }
        });
    }

    $scope.uploadFile = function(){
        var image = $("#myFileField")[0].files[0];
        var formdata = new FormData();
        formdata.append('image', image);

        $http({
            method: 'POST',
            url: baseurl+'upload',
            data: formdata,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'access-token': window.localStorage.getItem('token')
            }
        }).then(function(res) {
            var response = res.data
            console.log(response)
            $scope.formdata.content_image = response.filename;
        });
    }

}]);
app.controller('announcementDeleteCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'DELETE',
        url: baseurl+'content/'+id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/content");
    });
}]);

app.controller('announcementPublishCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'PUT',
        url: baseurl+'content/publishstatus/'+id,
        data: $.param({publishstatus: 1}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/content");
    });
}]);

app.controller('announcementUnPublishCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    var id = $routeParams.id;
    $http({
        method: 'PUT',
        url: baseurl+'content/publishstatus/'+id,
        data: $.param({publishstatus: 0}),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'access-token': window.localStorage.getItem('token')
        }
    }).then(function(res) {
        var response = res.data
        $location.path("/content");
    });
}]);

app.controller('videoCtrl', ['$scope', '$route', function ($scope, $route) {
    $scope.$route = $route;
}]);