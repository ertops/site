
gh_repo = document.location.href.match( /[^\/]*\/\/([^\\]*).github.io\/([^\/]*)/);
gh_repo = gh_repo ? gh_repo[1] + "/" + gh_repo[2] : "ertops/site";

function load_fragment(name) {
	var list = $('.masthead ul .active'),
		item = $('.masthead ul #tab-' + name),
		content = $('#content');
	
	list.removeClass('active');
	item.addClass('active loading');
	content.addClass('loading')
	
	content.load('pages/' + name + '.html', function() {
		item.removeClass('loading')
		content.removeClass('loading');	
	});
}

$(document).ready(function() {
	load_fragment('Home');
});


$.ajax('https://api.github.com/repos/' + gh_repo + '/contents/pages/', { 
	success: function(data) { 
		var list = $('.masthead ul');
		list.empty();
		_.filter(data, function(it) { 
			return it.name.indexOf('.html')!=-1 

		}).map(function(it) { 
			var name = it.name.substr(0,it.name.length-5);
			list.append(
				'<li id="tab-' + name + '"><a href="#' + name + '">' + name + '</a></li>'
			);
			$("#tab-" + name).click(function(w) {
				load_fragment(name);
			});
		});
	}
});