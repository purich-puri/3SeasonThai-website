var app = angular.module('myApp', []);

app.controller('MenuItemController', function ($scope, $http) {

  angular.element(document).ready(function () {
    $scope.URL = 'http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000';

    $scope.menus = [];
    $scope.getMenus();

    $scope.menuTypes = [];
    $scope.getMenuTypes();

    $scope.meatTypes = [];
    $scope.getMeatTypes();

    // keep menu image file
    $scope.menuImage;
  });

  $scope.getMenus = function(){
    $http.get($scope.URL + "/api/menus/get/all")
    .then(function mySuccess(response) {
        $scope.menus = response.data.data;
        //console.log($scope.menus);
    }, function myError(response) {
        alert("Failed to get menu");
    });
  }

  $scope.getMenuTypes = function(){
    $http.get($scope.URL + "/api/menus/get/all/menuType")
    .then(function mySuccess(response) {
        $scope.menuTypes = response.data.data;
        //console.log($scope.menuTypes);
    }, function myError(response) {
        alert("Failed to get menu type");
    });
  }

  $scope.getMeatTypes = function(){
    $http.get($scope.URL + "/api/menus/get/all/meatType")
    .then(function mySuccess(response) {
        $scope.meatTypes = response.data.data;
        //console.log($scope.menus);
    }, function myError(response) {
        alert("Failed to get meat types");
    });
  }

  // add order 
  $scope.addNewMenuItem = async function(name, description, price, meatTypeID, menuTypeID){
    if(meatTypeID == null){
      meatTypeID = 0;
    }

    // get menu image detail
    var imageName;
    var base64Image;
    if ($scope.menuImage != null)
    {
       imageName = "images/menuImages/" + $scope.menuImage.name;
       // convert image to base64
       base64Image = await toBase64($scope.menuImage);
       // convert to url friendly
       base64Image = await base64_url_encode(base64Image);

       //console.log(base64Image);

    }
    
    $http.post($scope.URL + "/api/menus/addNew",{
      name: name,
      description: description,
      pictureName: imageName,
      imageData: base64Image,
      price: price,
      isAvailable: 1,
      isSelectMeatChoice: meatTypeID,
      menuTypeId: menuTypeID
    })
    .then(function mySuccess(response) {
      //console.log(response);
      alert( name + " has been added");
      //clear image data
      $scope.clearMenuForm();

      // refresh menu data
      $scope.getMenus();
    }, function myError(response) {
        console.log(response);
      alert("Failed to add new menu.");
    });
  }

//ADD NEW MEAT TYPE
  $scope.addNewMeat = function(meatName, meatPrice){
      //console.log(meatName);
      //console.log(meatPrice);
    $http.post($scope.URL + "/api/menus/addNew/meatType",{
      name: meatName,
      extraPrice: meatPrice
    })
    .then(function mySuccess(response) {
      alert( meatName + " has been added");
      $scope.getMeatTypes();
    }, function myError(response) {
      console.log(response);
      alert("Failed to add new meat type.");
    });
  }

//ADD NEW MENU TYPE
  $scope.addNewMenuType = function(newTypeName){
    //console.log(newTypeName);
    $http.post($scope.URL + "/api/menus/addNew/menuType",{
      name: newTypeName
    })
    .then(function mySuccess(response) {
      alert( newTypeName + " has been added");
      $scope.getMenuTypes();
    }, function myError(response) {
      console.log(response);
      alert("Failed to add new menu type.");
    });
  }

  //EDIT MENU
  $scope.changeAvailability = function(menuID, menuName, menuDescription, menuPicture, menuPrice, availability, menuMeat, menuType){
    $http.put($scope.URL + "/api/menus/update",{
      id: menuID,
      name: menuName,
      description: menuDescription,
      pictureName: menuPicture,
      price: menuPrice,
      isAvailable: availability,
      isSelectMeatChoice: menuMeat,
      menuTypeId: menuType
    })
    .then(function mySuccess(response) {
      $scope.getMenus();
      console.log(response);
    }, function myError(response) {
      console.log(response);
      alert("failed to change availabilty");
    });
  }

  $scope.editMenu = function (menuID, editName, editDes, editPic, editPrice, availability, editMeat, editCategory,
    defaultMeatID, defaultMenuId){
    if(editCategory == null){
      editCategory = defaultMenuId;
      //console.log(editCategory);
    }
    if(editMeat == null){
      editMeat = defaultMeatID;
      //console.log(editMeat);
    }
    $http.put($scope.URL + "/api/menus/update",{
      id: menuID,
      name: editName,
      description: editDes,
      pictureName: editPic,
      price: editPrice,
      isAvailable: availability,
      isSelectMeatChoice: editMeat,
      menuTypeId: editCategory
    })
    .then(function mySuccess(response) {
      $scope.getMenus();
      alert("Menu Updated");
      //console.log(response);
    }, function myError(response) {
      console.log(response);
      alert("failed to update menu");
    });
  }

  $scope.editMenuType = function(typeID, menuName){
    $http.put($scope.URL + "/api/menus/update/menuType",{
      id: typeID,
      name: menuName
    })
    .then(function mySuccess(response) {
      $scope.getMenusTypes();
      alert("Category Updated");
      //console.log(response);
    }, function myError(response) {
      console.log(response);
      alert("failed to update category");
    });
  }

  $scope.editMeatType = function(meatID, meatName, meatPrice){
    if(meatPrice == "" || meatPrice == 0){
      meatPrice = null;
    }
    $http.put($scope.URL + "/api/menus/update/meatType",{
      id: meatID,
      name: meatName,
      extraPrice: meatPrice
    })
    .then(function mySuccess(response) {
      $scope.getMeatTypes();
      alert("Meat Type Updated");
      //console.log(response);
    }, function myError(response) {
      console.log(response);
      alert("failed to update meat type");
    });
  }
  

  //delete
  $scope.deleteMenuItem = function(menuItemID){
    //console.log(menuItemID);
    if(!confirm("Do you want to delete this menu?")){
      return
    }
    $http.delete($scope.URL + "/api/menus/delete/" + menuItemID)
    .then(function mySuccess(response) {
      alert("menu item has been deleted");
      $scope.getMenus();
    }, function myError(response) {
      console.log(response);
    });
  }

//DELETE MENUTYPE
  $scope.deleteMenuType = function(menuTypeID){
    if(!confirm("Do you want to delete this category?")){
      return
    }
    $http.delete($scope.URL + "/api/menus/delete/menuType/" + menuTypeID)
    .then(function mySuccess(response) {
      alert("menu Type has been deleted");
      $scope.getMenuTypes();
    }, function myError(response) {
      console.log(response);
    });
  }

//DELETE MEATTYPE
  $scope.deleteMeatType = function(meatTypeID){
    if(!confirm("Do you want to delete this meat type?")){
      return
    }
    $http.delete($scope.URL + "/api/menus/delete/meatType/" + meatTypeID)
    .then(function mySuccess(response) {
      alert("meat Type has been deleted");
      $scope.getMeatTypes();
    }, function myError(response) {
      console.log(response);
    });
  }

  // Get menu image from event change
  $scope.menuImageChange = function(event) {
    //console.log(event);
    $scope.menuImage = event.target.files[0];
    // FileReader support
    if (FileReader) {
      var fr = new FileReader();
      fr.onload = function () {
          document.getElementById('menuimg').src = fr.result;
      }
      fr.readAsDataURL($scope.menuImage);
    }

    console.log('I m here');
  }

  // clear menu form
 $scope.clearMenuForm = function () {
  $scope.menuImage = null;
  document.getElementById('menuimg').src="";
  document.getElementById('file').value = "";
  
}

});

// convert image to base64 function
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

function base64_url_encode(input) {
 return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}






