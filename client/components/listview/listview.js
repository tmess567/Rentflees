var listingsIndexDep = new Tracker.Dependency();
var mapAdded = false;
var searchObj = {};

Meteor.subscribe('listings');

Template.listview.helpers({
	listingsArr : function() {
		listingsIndexDep.depend();
	 	if(searchObj.hasOwnProperty("tenantPref")) console.log(searchObj);
	 	return Listings.find(searchObj).fetch();
	},
	isVerifiedorAdmin : function() {
	  	return (this.verified === "true" || Meteor.user().username === "Tushar Mishra" );
	},
	isVerified : function() {
	  	return this.verified === "true";
	},
	isAdmin : function() {
	  	return Meteor.user().username === "Tushar Mishra";
	}
});

Template.listview.onRendered(function(){
	$('input[name=tenantPref]').click(function(evt){
		searchInit = false;
		listingArr = [];
		$('input[name=tenantPref]').each(function(){
			if($(this).is(":checked")){
				console.log("Searching for "+$(this).val());
				if(!searchObj.hasOwnProperty("tenantPref")){
					searchObj["tenantPref"] = { $in: [] };
					console.log(searchObj);
				}
				if(searchObj.tenantPref.$in.indexOf($(this).val())<0)
					searchObj.tenantPref.$in.push($(this).val());
				if(searchObj.hasOwnProperty("tenantPref")) console.log(searchObj.tenantPref.$in);
			} else {
				if(searchObj.hasOwnProperty("tenantPref")){
					for(let i = searchObj.tenantPref.$in.length - 1; i >= 0; i--) {
					    if(searchObj.tenantPref.$in[i] === $(this).val()) {
					       searchObj.tenantPref.$in.splice(i, 1);
					    }
					}
					if(searchObj.tenantPref.$in.length == 0){
						delete searchObj.tenantPref;
					}
				}
			}
		});
		listingsIndexDep.changed();
	});
	
	$('.img-wrapper').slick({
		lazyLoad: 'ondemand',
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$("#show-map-button").click(function(evt){
		$("#map-panel").toggleClass("map-panel");
		$(".map-container-container").toggleClass("hidden");
	});
});
