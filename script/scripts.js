
$('document').ready(function() {
    const URL = "http://ec2-3-14-6-238.us-east-2.compute.amazonaws.com:3000";

        $.ajax({
            url: URL + "/api/menus/get/all",
            type: "GET",
            success: function(result) {
                console.log(result.data);
                var temp="";
                // show product here. You can do the table but I will show only simple way.
                for (var i = 0; i < result.data.length; i++) {

            temp += '<div class="card-deck" style="float:left; width:20%; padding:5px; height:300px;">'
                    + '<div class="card">'
                        + '<img class="card-img-top" style="width:150px; margin: 0 auto;"; src="images/' + result.data[i].pictureName + '">'
                            + '<div class="card-body">'
                            + '<h5 class="card-title" style="font-weight:bold;">' + result.data[i].name + '</h5>'
                            + '<p class="card-text">' + result.data[i].description + '</p> </div>'
                                + '<div class="card-footer">'
                                    + '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> Add to Cart </button>'
                                    + '</div> </div> </div>'
                    
                    + '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'
                    + '<div class="modal-dialog modal-dialog-centered" role="document">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                            + '<h5 class="modal-title" style="font-weight:bold; id="exampleModalCenterTitle">' + result.data[i].name +'</h5>'
                            + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                            + '<span aria-hidden="true">&times;</span> </button>'
                        + '</div>'
                        + '<div class="modal-body">Price: $' + result.data[i].price + '</div>'
                        + '<div class="modal-footer">'
                            + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
                            + '<button type="button" class="btn btn-primary" data-action="ADD_TO_CART">Add to cart</button>'
                        +'</div> </div> </div> </div>';
                } 
                console.log(temp);
                $('#allmenu').html(temp);
            },
            error: function(error) {
                console.log('Error ${error}');
            }
        })
    
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').modal('focus')
  });