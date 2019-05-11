function list_portfolio_contents() {
  /*
  var context = {
      items: [
        {name: "Handlebars", emotion: "love"},
        {name: "Mustache", emotion: "enjoy"},
        {name: "Ember", emotion: "want to learn"},
        {name: "Shit", emotion: "paper"}
      ]
    };
    
    Handlebars.registerHelper('agree_button', function() {
      var emotion = Handlebars.escapeExpression(this.emotion),
          name = Handlebars.escapeExpression(this.name);
    
      return new Handlebars.SafeString(
        "<button>I agree. I " + emotion + " " + name + "</button>"
      );
    });
  */

  var context = create_portfolio_context();

    console.log(context);

  var source1   = document.getElementById("project-template").innerHTML;
  var template1 = Handlebars.compile(source1);
  var html1     = template1(context);

  var source2   = document.getElementById("modal-template").innerHTML;
  var template2 = Handlebars.compile(source2);
  var html2     = template2(context);
  
  document.getElementById("project-template-container").innerHTML += html1;
  document.getElementById("modal-template-container").innerHTML += html2;

  console.log("Listed all portfolio contents");
}

function create_portfolio_context(){
  var _context = [];

  for (let i = 0; i < portfolioContents.length; i++) {
    var _portfolioJSON = JSON.parse(portfolioContents[i]);
    
    _context.push(_portfolioJSON);
  }

  return { "portfolio-project" : _context };
}