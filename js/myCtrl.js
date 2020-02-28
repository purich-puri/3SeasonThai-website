

var app = angular.module('myApp', []);


app.controller('OrderManagementCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    // check permission before load page
    checkPermissionCookie();

    // Set start filter
    $scope.mySortType = "true";
    $scope.findStatus = "";

    $scope.orders = [];
    $scope.orderDetails = [];
    $scope.deliveryAddresses = [];
    $scope.orderList = [];


    $scope.getAllActiveOrder();
    $scope.getAllDeliveryAddress();
    $scope.getOrderList();
    $scope.setCheckOrderInterval();

    // display content
    $scope.displayContent();


  });

  $scope.displayContent = function () {
    document.getElementById("order-container").style.visibility = "visible";
  }

  $scope.setCheckOrderInterval = function () {
    setInterval(function () { $scope.getAllActiveOrder(); }, 3000);

  }

  $scope.playAlert = function () {
    if (document.getElementById('alert-sound'))
      document.getElementById('alert-sound').play();
  }

  // get all order
  $scope.getAllActiveOrder = function () {
    $http.get($scope.URL + "/api/orders/get/all/activeOrder")
      .then(function mySuccess(response) {
        $scope.orders = response.data.data;

        // check if have new order in the list,
        // aleart sound
        var newOrders = $scope.orders.filter((item) => {
          return item.status == 'New Order';
        });

        if (newOrders.length > 0) {
          $scope.playAlert();
        }

      }, function myError(response) {
        alert("Get all order fail.");
      });
  }

  // get all order detail
  $scope.getAllOrderDetail = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderDetail")
      .then(function mySuccess(response) {
        $scope.orderDetails = response.data.data;
        console.log($scope.orderDetails);

      }, function myError(response) {
        alert("Get all order detail fail.");
      });
  }

  // get all delivery address
  $scope.getAllDeliveryAddress = function () {
    $http.get($scope.URL + "/api/orders/get/all/deliveryAddress")
      .then(function mySuccess(response) {
        $scope.deliveryAddresses = response.data.data;

      }, function myError(response) {
        alert("Get all delivery address fail.");
      });
  }

  // get all menu
  $scope.getOrderList = function () {
    $http.get($scope.URL + "/api/orders/get/all/orderList")
      .then(function mySuccess(response) {
        $scope.orderList = response.data.data;

      }, function myError(response) {
        alert("Get all menu fail.");
      });
  }

  // change order status
  $scope.changeOrderStatus = function (id, status) {
    $http.put($scope.URL + "/api/orders/update/orderStatus", {
      id: id,
      status: status
    })
      .then(function mySuccess(response) {
        $scope.getAllActiveOrder();
        console.log(response);
      }, function myError(response) {
        alert("update order status fail.");
      });
  }

  $scope.cancelOrder = function (id) {
    console.log(id);
    if (!confirm("Do you need to delete order?"))
      return;

    $scope.changeOrderStatus(id, 'Cancel');
  }

  // Sort Table function
  $scope.orderByMe = function (name) {
    if ($scope.myOrderBy == name) {
      if ($scope.mySortType == "") {
        $scope.mySortType = "true";
      } else {
        $scope.mySortType = "";
      }
    } else {
      $scope.mySortType = "";
    }
    $scope.myOrderBy = name;

  }

  $scope.updateSearchKey = function (keyEvent, searchField) {
    /*
    if (keyEvent.which==13 && searchField=="studentID") {
      $scope.searchStudentID = $scope.findStudentID;
    }

    if (keyEvent.which==13 && searchField=="studentName") {
      $scope.searchStudentName = $scope.findName;
    }
    */
  }

});

app.controller('UserCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    // check if already have permission in cookie, open staff page directly
    var auth = getCookie("authPermission");
    console.log(auth);
    if (auth == "true"){
      window.open('staff-main.php', '_self', false);
    }
      


    $scope.username = "";
    $scope.password = "";

  });

  $scope.checkUserPermission = function () {
    // check if not have username and password
    if ($scope.username == "" || $scope.password == "") {
      alert("Please provide username and password.");
      return;
    }
    // check permission by calling WebAPI and pass username and password
    $http.post($scope.URL + "/api/users/checkPermission", {
      username: $scope.username,
      password: $scope.password
    })
      .then(function mySuccess(response) {
        var user = response.data;
        // check permission from data
        if (user.permission == false) {
          alert("You don't have permission. Please try again");
          return;
        }

        // open staff page
        setCookie("authPermission", user.permission, 1);

        window.open('staff-main.php', '_self', false);

      }, function myError(response) {
        alert("Check permission fail.");
      });
  }

  
});


app.controller('StaffMainCtrl', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    // check permission
    checkPermissionCookie();

    $scope.setting = [];

    $scope.getSettingDetail();

  });

  $scope.getSettingDetail = function () {
    $http.get($scope.URL + "/api/settings/get/settingDetail")
      .then(function mySuccess(response) {
        $scope.setting = response.data.data[0];

        // set toggle status
        if ($scope.setting.isOpen == 0)
          document.getElementById("chkOnlineStatus").checked = false;
        else
          document.getElementById("chkOnlineStatus").checked = true;

      }, function myError(response) {
        alert("Get setting detail fail.");
      });
  }

  $scope.onlineStatusClick = function (event) {
    // change isopen value
    if (event.target.checked == true)
      $scope.setting.isOpen = 1;
    else
      $scope.setting.isOpen = 0;

    // update online status
    $scope.updateOnlineStatus($scope.setting.isOpen);

  }

  $scope.updateOnlineStatus = function (statusValue) {
    $http.put($scope.URL + "/api/settings/update/onlineStatus", {
      status: statusValue
    })
      .then(function mySuccess(response) {

      }, function myError(response) {
        alert("update online status fail.");
      });
  }

  $scope.logout = function () {
    deleteCookie("authPermission");
    window.open('index.php', '_self', false);
  }
});

// cookie function
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = cname + '=""; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";';
}

function checkPermissionCookie() {
  var permission = getCookie("authPermission");
  if (permission == "") {
    // go back to login page
    window.open('login.php', '_self', false);
  }
}

