Template.search.events({
	'input #searchBox > input': function(e, templateInstance) {
		e.preventDefault();
		var searchString = templateInstance.find("#searchInput").value;
		Session.set('searchResults', Meteor.users.find({
			username: new RegExp('^' + searchString + '.*$')
		}).fetch());
	}
})