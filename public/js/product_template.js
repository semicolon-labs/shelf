$(document).ready(function(){

  var theTemplateScript = $("#product-template").html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  var context = {
    test:"Hello, world!"
  };
  var theCompiledHtml = theTemplate(context);
  $('.content-placeholder').html(theCompiledHtml);
});
