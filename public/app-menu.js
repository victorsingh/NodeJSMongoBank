new Vue({

  el: '#app',
  data: {
     number: 1,
     show: true
     
   },
  filters: {
     toCash: function(value) {
	if(!value) return "";
	return "$" + value.toFixed(2);
     }
  }
  

}),

new Vue({

  el: "#check",
  data: {
      message: "das",
      okay:true

  },
  filters: {
     capitalize: function(value){
     if(!value) return '';
     value = value.toString();
     return value.charAt(0).toUpperCase() + value.slice(1);
     }
   }
}),

new Vue({
	
	// A DOM element to mount our view model.
	el: '#main',

        // This is the model.
	// Define properties and give them initial values.
	data: {
		active: 'home'
		
	},

	// Functions we will be using.
	methods: {
		makeActive: function(item){
			// When a model is changed, the view will be automatically updated.
			this.active = item;
		
		}
	}
})
