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
 $(function ()
 {
   `use strict`; //Executes JavaScript in strict mode.

   var $menuContainer = $("#menuContainer");
   var $menuOptions   = $("#menuOptions");

   var options =
   {
     //Allows smoothState to log errors to console.
     debug: true,
     prefetch: true,
     cacheLength: 2,
     //`onStart` will execute JavaScript before element that triggered the load redirects the page.
     onStart:
     {
       duration: 200,
       render: function ($container)
       {
         //If leaving main-menu.html
         $menuOptions.removeClass("--visible");
         $menuOptions.addClass("--hidden");
         $("#animatedLogoContainer").removeClass("--faded-in");
         $("#animatedLogoContainer").addClass("--faded-out");

         $("#menuOptions").removeClass("--visible");
         $("#menuOptions").addClass("--hidden");

         //If leaving settings.html
         $("#settingsContainer").removeClass("--faded-in");
         $("#settingsContainer").addClass("--faded-out");

         //If leaving highscores.html
         $("#highscoresContainer").removeClass("--faded-in");
         $("#highscoresContainer").addClass("--faded-out");

         // Removes cache so animations can happen again
         smoothState.restartCSSAnimations();
       }
     },
     //`onReady` will execute JavaScript once all animations have terminated and the
     //page content is ready to be injected.
     onReady:
     {
       duration: 200,
       render: function ($container, $newContent)
       {
         //Switch over to the new HTML page
         $container.html($newContent);
         //If navigating main-menu.html
         $("#menuOptions").removeClass("--visible");
         $("#menuOptions").addClass("--hidden");
         $("#animatedLogoContainer").removeClass("--faded-in");
         $("#animatedLogoContainer").addClass("--faded-out");

         //if navigating to settings.html
         $("#settingsContainer").removeClass("--faded-in");
         $("#settingsContainer").addClass("--faded-out");

         //If navigating to highscores.html
         $("#highscoresContainer").removeClass("--faded-in");
         $("#highscoresContainer").addClass("--faded-out");
       }
     },
     duration: 0,
     onAfter: function($container, $newContent)
     {
       //if navigating to main-menu.html
       $("#menuOptions").removeClass("--hidden");
       $("#menuOptions").addClass("--visible");
       $("#animatedLogoContainer").removeClass("--faded-out");
       $("#animatedLogoContainer").addClass("--faded-in");

       //if navigating to settings.html
       $("#settingsContainer").removeClass("--faded-out");
       $("#settingsContainer").addClass("--faded-in");

       //If navigating to highscores.html
       $("#highscoresContainer").removeClass("--faded-out");
       $("#highscoresContainer").addClass("--faded-in");
     }
   },
   smoothState = $menuContainer.smoothState(options).data('smoothState');
 }(jQuery));
