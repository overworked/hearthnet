Template.search.helpers({
	featuredUsers: function() {
		return Session.get('searchResults')
	}
});