new Vue({

  el: '#usr-view',
  data:{
     editBalance: false
      
  },
  methods :{

	changeBalance: function(){

	if(this.editBalance === false) this.editBalance = true;
	else this.editBalance = false;
	}

  }


})
