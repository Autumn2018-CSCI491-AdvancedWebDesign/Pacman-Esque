/*
 * Group:........ That Helvetica Group
 * Members:...... Scott McKay, Kendyl Freeny, William Cook
 * Institution:.. University of Montana
 * Class:........ Advanced Web-design & Programming
 * Date:......... Friday, November 16th, 2018
 *
 * Purpose of 'main-menu-transitions.js':
 *  Makes use of jQuery and smoothState.js to create smooth transitions between pages.
 * Dependencies:
 *  jQuery 1.11.3
 *  assets/script/pacman-esque/jquery.smoothState.min.js
 */
 (function ($)
 {
   `use strict`; //Executes JavaScript in strict mode.

   var $menuContainer = $("#menuContainer");
   var $menuOptions   = $("#menuOptions");
   var smoothState;

   console.log(window.location.href);

   smoothState = $menuContainer.smoothState
   ({
     //Allows smoothState to log errors to console.
     debug: true,
     //`onStart` will execute JavaScript before element that triggered the load redirects the page.
     onStart:
     {
       duration: 200,
       render: function ()
       {
         $menuOptions.removeClass("--visible");
         $menuOptions.addClass("--hidden");
       }
     },
     //`onReady` will execute JavaScript once all animations have terminated and the
     //page content is ready to be injected.
     onReady:
     {
       duration: 200,
       render: function ($container, $newContent)
       {
         $container.html($newContent);  //Switch over to the new HTML page
         $("#menuOptions").removeClass("--visible");
         $("#menuOptions").addClass("--hidden");
       }
     },
     duration: 0,
     onAfter: function($container, $newContent)
     {
       $("#menuOptions").removeClass("--hidden");
       $("#menuOptions").addClass("--visible");
     }
   });
   //smoothState.restartCSSAnimations();

 }(jQuery));
