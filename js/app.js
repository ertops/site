//guess repo from url, default to ertops
gh_repo = document.location.href.match( /[^\/]*\/\/([^\\]*).github.io\/([^\/]*)/);
gh_repo = gh_repo ? gh_repo[1] + "/" + gh_repo[2] : "ertops/site";
gh_repo_fragments = [];

function load_fragment(noid) {
var frag = gh_repo_fragments[noid] || _.find(gh_repo_fragments, function(n) { return n.name == noid; })
           || gh_repo_fragments[0];

    var list = $('.masthead ul .active'),
        item = $('.masthead ul #tab-' + frag.name),
        content = $('#content');

    list.removeClass('active');
    item.addClass('active loading');
    content.addClass('loading')

    content.load('pages/' + frag.path, function() {
        item.removeClass('loading')
        content.removeClass('loading');
    });
}

function populate_pages() {
    var list = $('.masthead ul');
    if (list.length) {
      list.empty();

      _.each(gh_repo_fragments, function(it) {
        list.append(
          '<li id="tab-' + it.name + '"><a href="#' + it.name + '">' + it.name + '</a></li>'
        );
        $("#tab-" + it.name).click(function(w) {
          load_fragment(it.id);
        });
      });

      load_fragment(window.location.hash.slice(1) || 0);

      return true;
    }
    else
      return false;
}

//fetch the nav list
//Fragment loading and navlist could be done in parallel, but aren blocking right now
$.ajax('https://api.github.com/repos/' + gh_repo + '/contents/pages/', {
    success: function(data) {
        gh_repo_fragments = [];

        data = _.filter(data, function(it) {
            return it.name.indexOf('.html')!=-1
        })
        data = _.each(data, function(it) {
            gh_repo_fragments.push({id:gh_repo_fragments.length, name: it.name.match(/[^\.]*\.*([^\.]*)/)[1], path: it.name});
        });

        populate_pages();
    }
});

$(document).ready(function() {
    //messy
    if (gh_repo_fragments.length)
        populate_pages();
});

