Template.search.events({
	'input #searchBox input': function(e, templateInstance) {
		e.preventDefault();

		var obj = {$and: []};
		$('.field').each(function(index, element) { 
			var x = {}; 
			x[$(element).data('filter-id')] = new RegExp("^" + element.value + '.*$'); 

			obj.$and.push(x)
		});

		Session.set('searchResults', Meteor.users.find(obj).fetch());
		
	}
})