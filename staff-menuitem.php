<!DOCTYPE html>
<html>

    <head>
        <link rel="stylesheet" type="text/css" href="./css/staff.css">

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
        

        <style>
            textarea {
                vertical-align: top;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2
            }
            .viewSide{
                display: flex;
            }
            .viewNormal{
                flex: 2 50%;
            }
            button{
                cursor: pointer;
            }
            .buttonGreen{
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 4px;
            }
            .buttonRed{
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
            }
        </style>


    </head>

    <body>
        <div class="title">MENU ITEMS</div>
        
        <div ng-app="myApp" ng-controller="MenuItemController">
            <div class="viewSide">
                <div class="viewNormal">
                    <form>
                        <fieldset>
                            <legend>Add New Menu</legend>
                            <label>Name:</label>
                            <input ng-model="addName" style="margin-left:4.25em" type="text"> <br>
                            
                            <label>Description:</label>
                            <textarea ng-model="addDescription" style="margin-left:1em" rows="10" cols="30"></textarea> <br>

                            <!-- <label>Picture:</label>
                            <input style="margin-left:3.55em"> <br> -->

                            <label>Price:</label>
                            <input ng-model="addPrice" style="margin-left:4.75em" type="text" placeholder="0.00"> <br>

                            <label>Meat Type:</label>
                            <select style="margin-left:1.4em" ng-model="addMeatType" >
                                <option value="">None</option>
                                <option ng-repeat="meatType in meatTypes" ng-value="meatType">{{meatType.name}}</option>
                            </select>
                            <br>

                            <label>Menu Type:</label>
                            <select style="margin-left:1em"     ng-model="addMenuType" ng-options="menuType.name for menuType in menuTypes">
                                <option hidden disabled selected value>-- Choose Menu Type --</option>
                            </select>

                            <br>
                            <label>Menu image:</label>
                            <input type="file" 
                                id="file" 
                                name='file' 
                                onchange="angular.element(this).scope().menuImageChange(event)" />
                            
                            <br><br>
                            
                            <img id="menuimg" 
                                class="menuimg" 
                                src="" 
                                alt="">
                            <br><br>


                            <button type="submit" ng-click="addNewMenuItem(addName, addDescription, addPrice, addMeatType.id, addMenuType.id)">ADD NEW</button>
                        </fieldset>
                    </form>
                </div>

                    <div class="viewSide">
                        <form>
                            <fieldset>
<!-- EDIT MENU TYPE -->
                                <legend>Edit Menu Categories</legend>
                                <div style="white-space:nowrap;">
                                    <label>Name:</label>
                                    <input ng-model="addMenuTypeName" type="text" placeholder="Appetizers, Main, Dessert, etc.">
                                <button type="submit" ng-click="addNewMenuType(addMenuTypeName)">ADD NEW</button>
                                </div>

                                <table id="pageLayout">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="menuType in menuTypes">
                                            <td><input type="text" ng-model="menuType.name"></td>
                                            <td style="white-space:nowrap;">
                                                <button type="submit" ng-click="editMenuType(menuType.id, menuType.name)">UPDATE</button>
<!-- DELETE MENU TYPE BUTTON -->
                                                <button type="submit" ng-click="deleteMenuType(menuType.id)">DELETE</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>  
                            </fieldset>
                        </form>

                        <form>
                            <fieldset>
<!-- EDIT MEAT TYPE -->
                                <legend>Edit Meat types</legend>
                                <div style="white-space:nowrap;">
                                    <label>Name:</label>
                                    <input ng-model="addMeatName" type="text" placeholder="chicken, beef, pork, etc.">
                                    <br>
                                    <label>Price:</label>
                                    <input ng-model="addMeatPrice" style="margin-left:0.7em" type="text" placeholder="0.0">
                                    <button type="submit" ng-click="addNewMeat(addMeatName, addMeatPrice)">ADD NEW</button>
                                </div>

                                <table id="pageLayout">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="meatType in meatTypes">
                                            <td><input type="text" ng-model="meatType.name"></td>
                                            <td ng-if="meatType.extraPrice == null"><input type="text" ng-model="meatType.extraPrice" style="width:30px" placeholder="-"></td>
                                            <td ng-if="meatType.extraPrice != null"><input type="text" ng-model="meatType.extraPrice" style="width:30px"></td>
                                            <td style="white-space:nowrap;">
                                                <button type="submit" ng-click="editMeatType(meatType.id, meatType.name, meatType.extraPrice)">UPDATE</button>
<!-- DELETE MEAT TYPE BUTTON -->
                                                <button type="submit" ng-click="deleteMeatType(meatType.id)">DELETE</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>  
                            </fieldset>
                        </form>
                    </div>

            </div>


<!-- UPDATE EDIT DELETE -->

            

            <form>
                <fieldset>
                    <legend>Edit Menu</legend>
                    <table id="pageLayout">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Meat Type</th>
                                <th>Menu Type</th>
                                <th><input ng-model="searchText.name" placeholder="Search..."></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="menu in menus | filter: searchText:strict">
                                <td><input ng-model="menu.name"></td>
                                <td><textarea ng-model="menu.description" cols="60"></textarea></td>
                                <td stylde="max-width:50%"><input ng-model="menu.price" style="width:30px"></td>
                                <td><select ng-model="editMeat">
                                    <option disabled ng-repeat="meatType in meatTypes | filter:{ id: menu.isSelectMeatChoice }" value="">{{meatType.name}}</option>
                                    <option ng-if="menu.isSelectMeatChoice == 0" value="">None</option>
                                    <option ng-repeat="meatType in meatTypes" ng-value="meatType">{{meatType.name}}</option>
                                </select></td>
                                <td><select ng-model="editCategory">
                                    <option disabled ng-repeat="menuType in menuTypes | filter:{ id: menu.menuTypeId }" value="">{{menuType.name}}</option>
                                    <option ng-repeat="menuType in menuTypes" ng-value="menuType">{{menuType.name}}</option>
                                </select></td>
                                <td style="white-space:nowrap;">
                                    <button class="buttonGreen" ng-click="changeAvailability(menu.id, menu.name, menu.description, menu.pictureName, menu.price, '0', menu.isSelectMeatChoice, menu.menuTypeId)" ng-if="menu.isAvailable == 1">AVAILABLE</button>
                                    <button class="buttonRed" ng-click="changeAvailability(menu.id, menu.name, menu.description, menu.pictureName, menu.price, '1', menu.isSelectMeatChoice, menu.menuTypeId)" ng-if="menu.isAvailable == 0">SOLD OUT</button>
                                    
                                    <button type="submit" ng-click="editMenu(menu.id, menu.name, menu.description, menu.PictureName, menu.price, menu.isAvailable, editMeat.id, editCategory.id, menu.isSelectMeatChoice, menu.menuTypeId)">UPDATE</button>
                                    <button type="submit" ng-click="deleteMenuItem(menu.id)">DELETE</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </fieldset>
            </form>
            
        </div>


        <script src="js/myApp.js"></script>
        <script src="js/menuItemCtrl.js"></script>
        <script src="js/js-function.js"></script>
        
    </body>



</html>