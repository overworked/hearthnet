Template.search.events({
	'input #searchBox input': function(e, templateInstance) {
		e.preventDefault();

		var obj = {$and: []};
		$('#searchBox input').each(function(index, element) { 

			// why you ask? I don't know, it just works.
			if (index < $('#searchBox input').length / 2) return;

			var x = {}; 
			x[$(element).data('filter-id')] = new RegExp("^" + element.value + '.*$', 'i'); 

			obj.$and.push(x);
		});

		Session.set('searchResults', Meteor.users.find(obj).fetch());
		
	}
})