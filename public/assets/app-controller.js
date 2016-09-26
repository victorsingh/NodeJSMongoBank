$(document).ready(function(){

   $('form').on('submit', function(){
    console.log('this is working');
    var values = $(this).serializeArray();
    var info  = {user: values[0].value, password: values[1].value};


   $.ajax({

   type: 'POST',
   url: '/',
   data: info,
   success: function(data){

	console.log('success');
        	
      	}
  
   });

   return false;


  });  

});
