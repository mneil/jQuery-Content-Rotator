/* 
 * Rotator
 * Version 1.0.6
 * Author Michael Neil
 * URI: http://www.mneilsworld.com/
 * 
 * The MIT License
 *
 * Copyright (c) 2011 Michael Neil
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
(function($){ /*jQuery.noConflict()compliant*/ 
  
  /*
   * Setup a unique variable counter to identify individual sliders controls
   */
  var fader_num_init_unique = 0;
  
  
  /*
   * Creates a function called rotator under jQuery
   * 
   * @notes : $('.slider').rotator();
   */
  $.fn.rotator = function(o){
    $(this).each(function(el){
      if(el>0){fader_num_init_unique++;}
      $(this).data( 'rotator', new Rotator( this, o, fader_num_init_unique ) );
    });
    fader_num_init_unique++;
  };
  
  /*
   * Creates a new instance of Rotator
   * 
   * @private
   * 
   * @param element, a jQuery DOM element
   * @param o : an object of options
   * @param el : A unique identifier for each instance of the classes DOM element controls.
   */
  var Rotator = function(element, o, el){
    
    
    
    /*
     * 
     * PLUGIN OPTIONS
     * *****************************************
     * 
     */
     
     
     
    var options = $.extend({ /* defaults, can be overidden */
        arrows    : {left:".leftarrow"+el,right:".rightarrow"+el},/* the class of the left and right arrow controls with unique number 0 indexed */
        tranSpeed : 800,/* ms transition speed */
        delay   : 4000,/* ms delay before next transition*/
        auto    : true,/* sets auto scrolling through rotator. true starts animation automatically. false disables auto rotating */
        loop    : true,/* infinite scroll on or off, default true infinitely loops */
        backwards : false,/* sets the rotator to run backwards. Loop must be set to true to run backwards */
        onChange : function(i){},/* onChange event fires when the animation begins */
        endChange : function(i){}/* endChange event fires when the animation ends */
        }, o ||
        {});
    
    var o = options;
    
    
    
    
    
    
    
    
    
    /*
     * 
     * PRIVATE METHODS
     * *****************************************
     * 
     */
    
    

    /*
     * Cleans interval GoNext call to pass 0 to goNext.
     */
    function intGoNext(){
      goNext(0);
    }
    /*
     * Slides the element to the next object in the show 
     * 
     * @private
     */
    function goNext(num){
      if(dontRun){return;}
      /*
       * if(cur == n-1){if(reverse){o.backwards = true}else{return}};
       * if(cur == 0 && reverse)o.backwards = false;
       */
      if(num === 1){
        o.backwards = false;
      }else if(num === -1){
        o.backwards = true;
      }
      if(animate){return;}
      if( !o.backwards){ 
        cur++; if(cur === n){ cur = 0; }
      }else{ 
        cur--;if(cur < 0){ cur = n-1; } 
      }
      animate = true;
      
      if(o.backwards){
        log = (cur === beforeN)?-beforeN: cur-beforeN;
        log = log+beforeN;
      }else{
        log = (cur-beforeN === beforeN)?0: cur-beforeN;
      }
      if(log >= beforeN){
        log -= beforeN;
      }
      o.onChange(log);
      forwardNumbersReset();
      
      that.animate({marginLeft:-cur*w},o.tranSpeed,reset);
      
    }
    
    /*
     * Sends the Rotator to a certain child index
     * 
     * @private
     */
    function goToIndex(i){

      if(i === undefined || i > beforeN || i < 0){this.onError({target:"goToIndex","error":"The passed index is out of the range of available children to rotate to"});return false;}
      if(animate){return false;}
      $(numbers).removeClass("active");
      $(numbers).eq(i).addClass("active");
      
      cur = beforeN+i;
      if(o.backwards){
        cur -= beforeN;
      }
      
      animate = true;
      that.animate({marginLeft:-cur*w},o.tranSpeed,reset);
      log = i;
      o.onChange(log);
      
      if(o.auto){
        clearInterval(interval);interval = setInterval(intGoNext,o.delay);
      }
      
    }
    
    /*
     * Creates a list of numbered anchors to control the current slider.
     * 
     * @private
     */
    function addNumbers(el){
      
      if(dontRun){return;}
      var len = beforeN;
      numbers = "<ul class='slider-numbers slider-numbers-"+el+"'>";
      var i=0;
      for(;i<len;i++){
        numbers +="<li><a href=''>"+(i+1)+"</a></li>";
      }
      numbers += "</ul>";
      $(element).after(numbers);
      numbers = ".slider-numbers-"+el+" a";
      /*
       * Bind click event to each number and set first element to active
       */
      $(numbers).each(function(i){
        if(i===0){$(this).addClass("active");}
        
        $(this).click(function(){
          
          goToIndex(i);
          return false;

        });
      });
      
    }
    
    /*
     * Resets the current active element after the animation. Needed for the loop.
     * 
     * @private
     */
    function reset(){
      animate = false;
      if ((cur === 0 || cur === n - beforeN)) {
        cur = beforeN;
        $(element).css({"margin-left": -cur * w});
      }
      o.endChange(log);
    }
    
    /*
     * Change current active number.
     * 
     * @private
     */
    function forwardNumbersReset(){
      
      $(numbers).removeClass("active");
      $(numbers).eq(log).addClass("active");
      
    }
    /*
     * Pauses the rotator
     * 
     * @private
     */
    function pause(){
      if(o.auto){clearInterval(interval);}
    }
    /*
     * Starts the rotator
     * 
     * @private
     */
    function start(){
      interval = setInterval(intGoNext,o.delay);
      o.auto = true;
    }
    
    
    
    
    
    

    
    /*
     * 
     * PUBLIC METHODS
     * *****************************************
     * 
     */
     
     
     
     


    /*
     * Slides the element to the next object in the show 
     * 
     * @public
     * 
     * @param num : 1 or -1. null is same as 1. Increments or decrements cur and animates to next or previous child.
     * @usage : $('.slider').data('rotator').goNext();
     */
    this.goNext = goNext;
    /*
     * Slides the element to the child index specified in num
     * 
     * @public
     * 
     * @param num(int) : the child index to slide to, 0 based
     * @usage : $('.slider').data('rotator').goToIndex(2);
     */
    this.goToIndex = goToIndex;
    /*
     * Used to debug problems with the slider. Outputs errors to related to the slider.
     * 
     * @public
     * 
     * @usage : $('.slider').data('rotator').onError = function(e){console.log(e);};
     */
    this.onError = function(e){};
    /*
     * Pauses the rotator
     * 
     * @public
     * 
     * @usage : $('.slider').data('rotator').pause();
     */
    this.pause = pause;
    /*
     * Starts the rotator
     * 
     * @public
     * 
     * @usage : $('.slider').data('rotator').start();
     */
    this.start = start;
    
    
    
    
    
    
    
    
    
    
    
    /*
     * 
     * PRIVATE VARIABLES
     * *****************************************
     * 
     */
    
    
    
    
    
    /*
     * Check that the element has at least 2 children to run, otherwise throw some errors.
     * 
     * @private
     */
    var dontRun = false;
    /*
     * Alert error if plugin initialized without a proper element
     */
    if(!$(element)){
      this.onError({target:"init","error":"An element must be defined to rotate. ex: $('.slider').rotator();"});
      return false;
    }
    /*
     * If the element doesn't contain enough children to animate log a warning to the console.
     */
    if($(element).children().length <= 1){
      dontRun = true;
      this.onError({target:"init","error":element+" has one or fewer children to rotate through"});
    }
    /*
     * Setup running in reverse if needed.
     * 
     * @private
     */
    var reverse = false;
    if(o.backwards){reverse = true;}
    /*if(o.backwards && !o.loop){
      o.backwards = false;
    }*/
    
    /*
     * Stores a private reference to the jQuery element
     * 
     * @private
     */
    var that = $(element);
    /*
     * Stores a reference to this classes generated DOM number list
     * 
     * @private
     */
    var numbers = "";
    /*
     * Stores the length of the original element child length. Used when looping.
     * 
     * @private
     */
    var beforeN = 0;
    /*
     * Stores the elements html used when creating a looping rotator.
     * 
     * @private
     */
    var inner = "";
    /*
     * Stores the current active number. Gets set in goNext();
     * 
     * @private
     */
    var log = 0;
    
    
    /*
     * If it's set to loop duplicate the child elements and prepend and append them to the current slider.
     */
    if(o.loop){
      var curFade = 0;
      beforeN = $(element).children().length;
      inner = $(element).html();
      $(element).children(":first").before(inner);
      $(element).children(":last").after(inner);
    }
    
    /*
     * The calculated with of the child elements
     * 
     * @private
     */
    var w = $(element).children().width();
    /*
     * The number of child elements
     * 
     * @private
     */
    var n = $(element).children().length;
    /*
     * The current element being displayed
     * 
     * @private;
     */
    var cur = beforeN;
    /*
     * Stores whether or not the rotator is currently animating
     * 
     * @private
     */
    var animate = false;
    
    
    
    
    

    
    
    
    /*
     * 
     * INITIALIZE AND BIND EVENTS
     * *****************************************
     * 
     */
    


    /*
     * Setup the numbers
     */
    addNumbers(el);
    
    
    /*
     * Set the initial margin of the slider mostly for the loop to center the slider.
     */
    $(element).css({"margin-left": -cur * w});
    $(element).css({width: w * n});
    
    /*
     * Right arrow click function. Slides the slider to the next element in the show
     * 
     * @private
     */
    $(o.arrows.right).bind("click",function(){
      
      if(o.auto){clearInterval(interval);interval = setInterval(intGoNext,o.delay);}
      o.backwards = false;
      goNext();
      return false;
      
    });
    
    /*
     * Left arrow click function. Slides the slider to the previous element in the show
     * 
     * @private
     */
    $(o.arrows.left).bind("click",function(){
      
      if(o.auto){clearInterval(interval);interval = setInterval(intGoNext,o.delay);}
      o.backwards = true;
      goNext();
      return false;
      
    });
    

    /*
     * Starts the slider if auto is true and there are enough elements in the slider
     */
    if(o.auto && !dontRun){
      var interval = setInterval(intGoNext,o.delay);
    }
    
  };
  
}(jQuery));