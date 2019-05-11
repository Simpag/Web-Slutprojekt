const repoUrl = "https://api.github.com/users/simpag/repos";
const begginningContentUrl = "https://api.github.com/repos/simpag/"; //:repo
const endContentUrl = "/contents/portfolio.txt";

var repos = [];
var repoNames = [];
var portfolioContents = []; // [index][repo name][portfolio content]

window.onload = function () { 
    $.getJSON(repoUrl,
        function (response) {
            recived_repos(response);
        }
    );
}

function recived_repos(response) {
    repos = response;
    var _requestCount = 0;

    for (let i = 0; i < response.length; i++) {
        repoNames[i] = response[i].name;
    }
    console.log(repoNames);

    for (let i = 0; i < repoNames.length; i++) {
        var _repoName = repoNames[i];
        var _url = begginningContentUrl + _repoName + endContentUrl;
        
        var _requestJSON = $.getJSON(_url,
            function (_response, textStatus) {
                if (textStatus === "success"){
                    var portfolioString = atob(_response.content);
                    //var portfolioObject = { "name" : _name, "content" : portfolioString }
                    
                    portfolioContents.push(portfolioString);
                    console.log("Content");
                    console.log(portfolioContents);
                }
            }
        ).always(function() {
            _requestCount++;
            if (_requestCount == repoNames.length) {
                list_portfolio_contents();
                console.log("listed");
            }
          });

        //_requestJSON.complete(function() {
            
        //});
    }
}