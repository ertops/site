
//guess repo from url, default to ertops
gh_repo = document.location.href.match( /[^\/]*\/\/([^\\]*).github.io\/([^\/]*)/);
gh_repo = gh_repo ? gh_repo[1] + "/" + gh_repo[2] : "ertops/site";
gh_repo_fragments = undefined;

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

function populate_pages(data) {
    var list = $('.masthead ul');
    if (list.length) {
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
      
      load_fragment('Home');
      
      return true;
    }
    else
      return false;
}

//fetch the nav list
//Fragment loading and navlist could be done in parallel, but aren blocking right now
$.ajax('https://api.github.com/repos/' + gh_repo + '/contents/pages/', { 
	success: function(data) { 
		if (!populate_pages(data))
      gh_repo_fragments=data; //.masthead not there, do it on ready()
	}
});

$(document).ready(function() {
  if (gh_repo_fragments) {
    populate_pages(gh_repo_fragments);
    delete gh_repo_fragments;
  }
});

