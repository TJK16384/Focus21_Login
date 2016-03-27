/* Behaviour of login screen items
 * TODO: Rewrite for server-side React-Bootstrap
 */

$(document).ready(function() { // when raw DOM done building
  const sEmail = "jeff_aramini@ihealthsolutions.net";
  const sPassword = "WeakSecurity";
  
  var $NavMain = $("#Login__Nav");
  
  var $Login = $("#Login");
  var $LoginForm = $(".form-signin");
  
  var $Apps = $("#Apps");
  
  var $EmailBlock = $("#Login__Email");
  var $PasswordBlock = $("#Login__Password");
  var $PW = $PasswordBlock.find("input");
  
  var $Profile = $("#Login__Profile");
  
  var $btnSubmit = $("#Login__Submit");
  
  $('[data-toggle="tooltip"]').tooltip(); // tooltip items need manual activation
  
  $("#Logout").click( function(e){
    location.reload(true);  // "logout" by force-refreshing the page
  });
  
  /* 
   * IMPORTANT: 'change' event won't fire until blur; 
   * multibind to similar events, or try 'input'
   */
  
  // validate email prior to submission:
  $EmailBlock.find("input").on("blur change input keyup paste", function() {
    //console.log( "'" + $(this).val() + "'" );
    
    // professionally, this would be validated against an array, not one string:
    if( $(this).val() !== "" && $(this).val() === sEmail ){
      // HIDE EMAIL FIELD
      $EmailBlock.find(".glyphicon").hide();
      $EmailBlock.slideUp("fast");
      // SHOW USER PIC
      $Profile.delay(200).slideDown("slow");
      // SWITCH TO PW FIELD
      $PW.removeAttr("disabled"); // only let a user enter a password when email valid
      $PW.focus();
      // RE-ENABLE SUBMIT BUTTON
      $btnSubmit.removeClass("disabled");
    }
    // wrong email
    else {
      $(this).css("border-color","red");
    }
  });
  
  $LoginForm.on('submit', function(e) {
    e.preventDefault(); // handle submission cases first
    //console.log( $PW.val() );
    
    // validate password:
    if( $PW.val() !== "" && $PW.val() === sPassword ){
      $PasswordBlock.find(".glyphicon").hide();
      // DISMISS THE ENTIRE LOGIN CONTAINER
      $Login.slideUp("fast");
      
      // REVEAL THE APPS
      PopulateApps($Apps);
      $Apps.delay(250).fadeIn("slow");
      // SHOW THE NAV BAR
      $NavMain.delay(250).slideDown("slow");
    }
    // wrong password
    else {
      $PW.css("border-color","red");
      shake($PW,60);
      $PW.val("");  // reset contents
    }
  });
  
});


// Dyanmic generation of Apps HTML tags from a list (JSON later):
function PopulateApps($This) {
  const nApps = 15;
  const arsAppName = ["Interop","PHC_Hub","ImmuCast","SENTINEL","SMaRT" , "Interop","PHC_Hub","ImmuCast","SENTINEL","SMaRT" , "Interop","PHC_Hub","ImmuCast","SENTINEL","SMaRT"]; 
  
  for(var x=0; x<nApps; x++){
    var $Item = 
      $("<div>")
      .addClass("App")
      .css({
        "background-image": "url('img/"+arsAppName[x]+".svg')"
      });
    $This.append( $Item );
  }
}


/*
 * Many thanks to http://bradleyhamilton.com/projects/shake/index.html
 * jQueryUI includes a shake animation; jQuery and BS apparently don't
 */
function shake($Item,ms){
  //var interval = ms;
  var distance = 10;
  var times = 5;
  
  $Item.css('position','relative');
  
  for(var x=0; x<=times; x++){
    $Item.animate({
      left:((x%2==0 ? distance : distance*-1))
      },ms);
  }
  
  $Item.animate({ left: 0}, ms);
}
