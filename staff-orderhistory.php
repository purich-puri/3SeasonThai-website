<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>3 Season Thai - staff order management page</title>
  <link rel="stylesheet" type="text/css" href="./css/staff.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

  <!-- Add loading overlay user to show loading sign when need user waiting for the process -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.3/dist/loadingoverlay.min.js"></script>
  <script>
    $(document).ready(function() {
      var text = "Loading...";
      $.LoadingOverlay("show", {
        text: text,
        progress: false,
        fade: [400, 0],
        maxsize: 10,
        size: 10
      });

      // Hide it after 3 seconds
      setTimeout(function() {
        $.LoadingOverlay("hide");
      }, 1000);
    });
  </script>

</head>


<body>
  <div class="orderhistory" ng-app="myApp" ng-controller="OrderHistoryCtrl" id="orderhistory-container">
    <div class="title">ORDER HISTORY</div>

    <div class="content">
		<div>
      <div class="filter-section">
        <div>Summary:</div>
        <label for="selMonth">Month</label>
        <select id="selMonth" ng-model="selMonth">
          <option ng-repeat="m in month" value="{{m}}">{{ m }}</option>
        </select>
        <label for="selYear">Year</label>
        <select id="selYear" ng-model="selYear">
          <option ng-repeat="y in year" value="{{y}}">{{ y }}</option>
        </select>
        <button id="searchSummary" ng-click="searchSummaryClick(selYear,selMonth)">Get data</button>
      </div>
      

			<table class="table-summary table-header-blue">
				<tr>
					<th class="col-40">No.</th>
					<th class="col-80">Date</th>
					<th class="col-100">Total Amount</th>
					<th class="col-80">Action</th>
				</tr>
				<tr ng-repeat="order in orderSummarys">
					<td class="col-center ">{{ $index +1 }}</td>
					<td class="col-center col-80">{{ order.orderDate | date: 'dd/MM/yy' }}</td>
					<td class="col-right col-80">{{order.sumTotalAmount | number:2}}</td>
					<td class="col-center col-80">
						<button id="showOrderHistoryDetail-btn" ng-click="showOrderHistoryDetail(order.orderDate);">
								Display
						</button>
					</td>
				</tr>
      </table>
      <div>Summary total amount: {{ summaryTotalAmount | number:2 }}</div> 
		</div>


    <div>
        <div class="filter-section">
        <div>Order record</div>
        </div>
			<table class="table-record table-header-blue">
				<tr>
					<th class="col-40">No.</th>
					<th class="col-300">Customer</th>
					<th class="col-100">Total Amount</th>
				</tr>
				<tr ng-repeat="order in orders">
					<td class="col-center col-40">{{ $index +1 }}</td>
					<td class="col-300 col-left">
						<div ng-repeat="deliveryAddress in deliveryAddresses | filter: {id: order.deliveryAddressId }">
							{{deliveryAddress.contactName}} - {{deliveryAddress.telephone}}
							<br>{{deliveryAddress.address}}
						</div>
					</td>
					<td class="col-right col-100">{{order.totalAmount | number:2}}</td>
				</tr>
			</table>
		</div>
    </div>

    

    
    

    





    <!-- Script to show modal -->
    <script>
      // Get the modal
      //var modal = document.getElementById('modalNotification');

      // Get the <span> element that closes the modal
      //var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      //span.onclick = function() {
      //modal.style.display = "none";
      //}

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          closeModal();
        }
      }

      function closeModal() {
        modal.style.display = "none";
        var scope = angular.element(document.getElementById('recordList')).scope();
        scope.studentDetails = "";
        scope.comunications = "";
        scope.classEnrolmentDetails = "";
      }


      /*
              function showNotificationModal(student) {

                var studentId = student.getAttribute("studentId");
                var studentName = student.getAttribute("studentName");
                document.getElementById('notificationStudent').innerHTML = "Communication record : " + studentId + " " + studentName;

                var scope = angular.element(document.getElementById('recordList')).scope();
                scope.getNotification(studentId);
                scope.docStudentID = studentId;

                //var status = scope.aaa();
                //alert("aaa");
                modal = document.getElementById('modalNotification');
                modal.style.display = "block";
              }
              */
    </script>



    <script src="js/myApp.js"></script>
    <script src="js/orderHistoryCtrl.js"></script>
    <script src="js/js-function.js"></script>
   
</body>

</html>