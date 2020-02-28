<!Doctype html>
<html>

<head>
	<title>3 Season Thai - staff main page</title>
	<link rel="stylesheet" type="text/css" href="css/staff.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

	<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
</head>

<body class="mainBody" ng-app="myApp" ng-controller="StaffMainCtrl">
	<div id="main-header" class="main-header">
		<div class="logo">
			<img id="imgLogo" src="images/logo.jpg">
		</div>
		<div id="AppName" class="AppName">
			Food Order Management
		</div>

		<div class="logout">

			<div class="switch-openstatus">
				<label class="switch">
					<input 
						id="chkOnlineStatus" 
						type="checkbox" 
						checked="setting.isOpen" 
						ng-click="onlineStatusClick($event)">
					<span class="slider round"></span>
				</label>
				<label id="onlineStatus">{{ setting.isOpen ? 'Online open':'Closed' }}</label>
			</div>
			<div>
				<button class="btn-logout" ng-click="logout();">Logout</button>
			</div>

		</div>
	</div>


	<div id="main-title" class="main-title">
		<div id="businessName">3 Season Thai</div>
	</div>


	<div class="main-aside">

		<ul>
			<li onclick="showMenuItemPage();">MENU ITEMS</li>
			<li onclick="showOrderManagementPage();">ORDER MANAGEMENT</li>
			<li onclick="showOrderHistoryPage();">ORDER HISTRORY</li>
		</ul>

	</div>

	<div class="main-showpage">
		<iframe id="iframe"></iframe>
	</div>

</body>
<!-- Add javascript to the progject -->
<script type="text/javascript" src="js/js-function.js"></script>
<script src="js/myCtrl.js"></script>


</html>