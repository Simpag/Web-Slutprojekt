const repoUrl = "https://api.github.com/users/simpag/repos";
const begginningContentUrl = "https://api.github.com/repos/simpag/"; //:repo
const endContentUrl = "/contents/portfolio.txt";

var repos = [];
var repoNames = [];
var portfolioContents = []; // [index][repo name][portfolio content]


document.getElementById("test").addEventListener("click", function () { 
    $.getJSON(repoUrl,
        function (response) {
            recived_repos(response);
        }
    );
});

document.getElementById("test2").addEventListener("click", list_portfolio_contents);

function recived_repos(response) {
    alert("called 1");
    repos = response;
    for (let i = 0; i < response.length; i++) {
        repoNames[i] = response[i].name;
    }
    console.log(repoNames);

    for (let i = 0; i < repoNames.length; i++) {
        var _repoName = repoNames[i];
        var _url = begginningContentUrl + _repoName + endContentUrl;
        
        $.getJSON(_url,
            function (_response, textStatus) {
                if (textStatus === "success"){
                    var portfolioString = atob(_response.content);
                    //var portfolioObject = { "name" : _name, "content" : portfolioString }
                    
                    portfolioContents.push(portfolioString);
                    console.log(portfolioContents);
                }
            }
        );
    }
}

function list_portfolio_contents() {
    var _ul = document.createElement("ul");

    portfolioContents.forEach(element => {
        var _li = document.createElement("li");
        _li.innerText = element;          
        _ul.appendChild(_li);
        document.body.appendChild(_ul);                      
    });
}