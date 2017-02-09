// google fonts
WebFontConfig = {
    google: { families: [ 'Lora::latin' ] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();


//hamburger menu on small screen
function myFunction() {
    document.getElementsByClassName("nav_menu")[0].classList.toggle("responsive");
}

//selectable portfolio
$(document).ready(function(){

    $("#web_design").click(function(){
        $('#logo_container').hide()
        $('#all_container').hide()
        $('#web_design_container').show()
        $('#print_container').hide()
    });

    $("#logo").click(function(){
        $('#logo_container').show()
        $('#all_container').hide()
        $('#web_design_container').hide()
        $('#print_container').hide() 
    });

    $("#print").click(function(){
        $('#logo_container').hide()
        $('#all_container').hide()
        $('#web_design_container').hide()
        $('#print_container').show()
    });

    $("#all").click(function(){
        $('#logo_container').hide()
        $('#all_container').show()
        $('#web_design_container').hide()
        $('#print_container').hide()
    });
});