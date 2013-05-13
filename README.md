## Methods

| Method                  | Description                                                              |
| ----------------------- |:------------------------------------------------------------------------ |
| [rotator](#rotator)     | Creates a new instance of the rotator plugin                             |
| [goNext](#gonext)       | Sends the rotator to the next child index                                |
| [goToIndex](#gotoindex) | Sends the rotator to the user defined index in the parameter             |
| [onError](#onerror)     | Dispatches an error object relaying the target failure and error message |
| [pause](#pause)         | Pauses the rotator.                                                      |
| [start](#start)         | Starts the rotator.                                                      |


## Properties

| Property                | Description   |
| ----------------------- |:------------- |
| [arrows](#arrows)       | The class of the left and right arrow controls with unique number 0 indexed |
| [tranSpeed](#transpeed) | The time a transition should last in milliseconds     |
| [delay](#delay)         | The time a child should display before the transition in milliseconds      |
| [auto](#auto)           | Sets auto scrolling through rotator. true starts animation automatically. false disables auto rotating             |
| [loop](#loop)           | Infinite scroll on or off, default true infinitely loops      |
| [backwards](#backwards) | sets the rotator to run backwards. Loop must be set to true to run backwards      |
| [onChange](#onchange)   | onChange event fires when the transition animation begins      |
| [endChange](#endchange) | endChange event fires when the transition animation ends      |


### Method Detail
**<a id="rotator"></a>rotator**

Description: Creates a new instance of the rotator plugin
````
$(".slider").rotator();
````

**<a id="gonext"></a>goNext**

Description: Sends the rotator to the next child index
````
$(".slider").data('rotator').goNext();
````
goNext also accepts a parameter of 1 or -1. This will cause the rotator to either rotate backwards to the previous child or continue forwards.

**<a id="gotoindex"></a>goToIndex**

Description: Sends the rotator to the next child index
````
$(".slider").data('rotator').goToIndex(2);
````
The rotator will animate to the child specified. If the child is out of range an error is thrown and the rotator will continue on like normal.

**<a id="onerror"></a>onError**

Description: Dispatches an error object relaying the target failure and error message
````
$(".slider").data('rotator').onError = function(e){alert("error in "+e.target)}
````
The error object contains two properties; target and error. The target is where the rotator failed. For example, it may be in the initializing where too few children are present in the slider ( the target would be init) or when goToIndex is called with an index out of range (target is goToIndex). The error is a descriptive error message of the failure.

**<a id="pause"></a>pause**

Description: Pauses the rotator
````
$(".slider").data('rotator').pause();
````
Clears the interval at which the slider is rotating if auto is true (default).

**<a id="start"></a>start**

Description: Starts the rotator
````
$(".slider").data('rotator').start();
````
Starts the rotator rotating regardless of auto. Can be used to restart a paused rotator or start a rotator whose auto property is set to false. This will set auto to true and the rotator will continue rotating until paused again.


### Property Detail
**<a id="arrows"></a>arrows**

Description: The class of the left and right arrow controls with unique number 0 indexed
````
$(".slider").rotator({arrows:{left:".leftArrow",right:".rightArrow"}});
````
arrows is an object containing class identifiers for the left and right arrow DOM objects.

_Default:_ `{left:".leftArrow"+i,right:".rightArrow"+i}`
Where i is the 0 based increment of the number of sliders on the page.

**<a id="transpeed"></a>tranSpeed**

Description: The time a transition should last in milliseconds
````
$(".slider").rotator({tranSpeed:400});
````
_Default:_ 800

**<a id="delay"></a>delay**

Description: The time a child should display before the transition in milliseconds
````
$(".slider").rotator({delay:10000});
````
_Default:_ 4000

**<a id="auto"></a>auto**

Description: Sets auto scrolling through rotator. true starts animation automatically. false disables auto rotating
````
$(".slider").rotator({auto:false});
````
_Default:_ true

**<a id="loop"></a>loop**

Description: Infinite scroll on or off, default true infinitely loops
````
$(".slider").rotator({loop:false});
````
If set to false the slider will scroll back to the 0 index when it has reached the last child

_Default:_ true

**<a id="backwards"></a>backwards**

Description: Sets the rotator to run backwards. Loop must be set to true to run backwards
````
$(".slider").rotator({backwards:false});
````
The rotator will rotate from left to right instead of right to left by default

_Default:_ false

**<a id="onchange"></a>onChange**

Description: onChange event fires when the transition animation begins
````
$(".slider").rotator({onChange:function(i){alert('next')}});
````
When the onChange event is fired a parameter is passed containing the new index of the rotator

_Default:_ function(){}

**<a id="endchange"></a>endChange**

Description: endChange event fires when the transition animation ends
````
$(".slider").rotator({endChange:function(i){alert('next')}});
````
When the endChange event is fired a parameter is passed containing the new index of the rotator

_Default:_ function(){}