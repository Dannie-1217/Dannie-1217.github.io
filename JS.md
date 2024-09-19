# Javascript

Here we learn a little bit about Javascript.

### Local web server

When developing a visualization, the data files are usually loaded dynamically using JS, such as `d3.csv()` (you will learn about this later). In this case, you will need to start a local web server to serve all your HTML/CS/JS and data files.

If you are using VS Code you can download and install the extension Live Server. Then all you need to do is right-click on an html file and select 'Open with Live Server' and it will start a local server that will refresh every time you save a file. You can configure the settings to decide which port to run this on and whether to automatically open a browser window too.

**In VSCode extensions, lookup live server and install it.**

#### Other options

An alternative solution would be to use a command line option to start a server. We recommend one of these two, remember to make suer you are in your project directory when you run them:

* **HTTP server provided by Python**. For Python 2, use `python -m SimpleHTTPServer [PORT-NUMBER]`. For Python 3, use `python -m http.server [PORT-NUMBER]`

* **HTTP server provided by NodeJS**. First install through npm: `npm install http-server -g`. Then start the server: `http-server [PATH] -p [PORT-NUMBER]`. When specifying the path, please avoid spaces in the path name or use double quatations.

In both cases, you can view the results in a web browser using `http://localhost:[PORT-NUMBER]`.

Alternatively, you can use an **IDE**, such as [Webstorm](https://www.jetbrains.com/webstorm/) to view your D3 project on a local web server (i.e., in Webstorm → right-click on `myProjectIndex.html` → `run`).


### Web developer tools

Every modern-day web browser has built-in developer tools that expose the current state of the DOM (Document Object Model -- the structured representation of your webpage) and help us to better understand what is going on. We strongly encourage you to use Google Chrome or Mozilla Firefox. We will use the newest stable release of Chrome for grading and for all example debugging in class.

The official browser websites provide detailed descriptions and tutorials: see [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) and [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools). Make sure to check out the keyboard shortcut of your system to open the developer tools (e.g., `command + option + j` for Chrome DevTools on Mac).

Most important are the *Web Inspector* and the *JavaScript Console*.

* **Web Inspector:** We can see something that looks like the source code of the HTML document that you wrote in your editor. Some tags are probably collapsed. Actually, you are not viewing the raw content of your HTML document. What you are seeing is the visual representation of the DOM tree (after all scripts have run and potentially modified the original HTML source)!

	The HTML you write is parsed by the browser and turned into the DOM. In simple cases this will look like your raw HTML, but if any JS code has been executed, the current DOM may be different, as JS commands can add, remove, and adjust the DOM dynamically.
	
	In a separate *styles panel*, you can see all CSS rules that are being applied to whatever element is currently selected in the DOM Tree.
	
* **Web Console:** When you implement JS and D3 components you will frequently log messages to the Console to make sure that your code works as expected. You can also use the Console to execute JS statements directly to change how the page looks or runs.

If you haven't done already, it's now time to open the developer tools in your browser and explore the various features. You can, for example, inspect the DOM and CSS attributes of a random web page, and test a few JS commands in the console.  

**From now on, whenever you are programming HTML, CSS, JS, or D3, you should always have the developer console open. This helps you in debugging and figuring out what is going on in the code!**


## <a name="js">JavaScript (JS)</a>

*From now on, and in all upcoming tutorials and assignments we will use the common abbreviation JS for the term JavaScript.*

We highly recommend that you follow a JS style guide (e.g., [Google](https://google.github.io/styleguide/jsguide.html)) to ensure consistency and to improve the overall code quality, especially in team projects.

### A short reiteration of the basic concepts of JS 

#### Variables

Recommendation: Use `const` by default and `let` whenever you need to reassign a variable.

```javascript
// `const` keyword ensures that the variable it creates is read-only
const THRESHOLD = 10;

// `let` keyword declares a block-scoped variable
let month = "February";	

// Variables in JS are loosely typed
let day = 4;				// Integer
let temperature = 34.36; 	// Double
let winter = true; 			// Boolean

// `const` does not ensure that the variable is immutable
// the object property can change
const students = { 
	count: 10
};
students.count += 1; 		// OK: count=11
students = { count: 20 }; 	// Type error
```

#### Data Structures

##### Arrays
* Arrays can store a sequence of values, and contain any type of data. Arrays are a compound type in JS.
* Use bracket notation ```[]``` to define or access an array.

```javascript
// Array with integer values
let numbers = [1, 2, 3, 100, 500, 4];	

// Array with strings
let fruits = ["Orange", "Banana", "Apple"];

// Empty array declaration
let names = [];

// Access the elements of an array
fruits[0]; 	// Returns: Orange
fruits[1]; 	// Returns: Banana

// Adding array elements
fruits.push("Mango");	// adds a new element to fruits

// Access the length of an array using the length attribute
let numberOfFruits = fruits.length;

// You can nest arrays (multidimensional)
let nestedNumbers = [[1, 2], [3, 4], [5, 6]];
```

You can do much more with arrays than shown here. Again, check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) documentation to learn more about specific concepts. Arrays are very important for data visualization, so take the time to go through this thoroughly!


##### Objects

* Objects are the second type of compound data types in JS.
* Use curly brackets ```{}``` to define an object and list *properties* and *values*.

```javascript
// JS object with four properties
let poem = {
	id: "poem1",
	name: "CSS Roses",
	lines: 4,
	good_poem: true
}

// Accessing an object via dot notation, specifying the name of the property
poem.id; 		// Returns: poem1
poem.lines;	// Returns: 4

// We can include arrays in objects
let poem = {
	id: "poem1",
	lines: ["Roses are red", "Violets are blue", "I love CSS", "Soon you will too"]
};

// And we can also create arrays of objects
let poems = [
	{ id: "poem1", name: "CSS Roses" },
	{ id: "poem2", name: "HTML Roses" }
];

// To access this data we just follow the trail of properties
poems[1].id; 	// Returns: CS253
```

Keep in mind: square bracket [...] means array and curly brace {...} means object!

##### JSON (JavaScript Object Notation)

* JSON is a popular data-interchange format for APIs and therefore very important for our future tasks (i.e., load given dataset). 
* It is basically a JS object, with the only difference being that the property names are surrounded by double quotation marks.

```json
{
	"id": "poem1",
	"name": "CSS Roses",
	"lines": 4,
	"good_poem": true
}
```


#### Control Structures & Loops

You should already be familiar with **control structures**, **loops** and **functions**. The following just shows some examples and the correct syntax for using those structures.

##### If statements

```javascript
let numericData = 10;

// Regular if statement 
if (numericData >= 10) {
	console.log("Equal or greater than 10");
} else if (numericData > 0 && numericData < 10) {
	console.log("Between 0 and 10");
} else {
	console.log("Less than 1");
}

// The ternary operator can be used as a compact alternative to an if-statement
// CONDITION ? WHAT_HAPPENS_IF_TRUE : WHAT_HAPPENS_IF_FALSE
let result = (numericData >= 10) ? "greater than or equal to 10" : "less than 10";
let result = (numericData % 2 === 0) ? "even" : "odd";
```

##### For loops

```javascript
// (1) Loop through a block of code 5 times (printing the value of i each time to the console)
for (let i = 0; i < 5; i++) {
	console.log(i);
}

// (2) Loop through each of the values in an array
let arrayWithNames = ["Jack", "Anna", "Mike", "Susan"];
for (let i = 0; i < arrayWithNames.length; i++) {
	console.log(arrayWithNames[i]);
}

// (3) Loop through the properties of an object
let person = { firstName: "John", lastName: "Doe", age: 24 };
for (let property in person) {
	console.log(property + ": " + person[property]);
}

// (4) The holy grail of JS loops: 
// Making use of object oriented JS, the forEach loop is an array method 
// that iterates over all elements in the array. The index of the element 
// and the element itself are available inside the loop via an anonymous
// callback function.
arrayWithNames.forEach( (element, index) => {
	console.log(index + ": " + element);
});
```

#### Functions

Here we list a few examples to show you the syntax for functions. In the following weeks you will learn more about anonymous functions, callbacks, and other features.

```javascript
// Call a function
toCelsius(34);

// Function (with input parameter and return value)
function toCelsius(fahrenheit) {
	return (5/9) * (fahrenheit-32);
}

// Another function call
console.log("Write something to the web console");
```

Variables within a function have *private* scope, however, when they are declared outside a function they are *global*.



### More JavaScript

Here we introduce some more advanced JS concepts, that will be very important once we start working with D3. Don't worry if you are not familiar with all those concepts — we will reiterate them with more examples in the next tutorials in connection with D3.

#### Template literals

Template literals are an alternative way to concatenate strings and variables. We specify literals with back-ticks (\`) at the beginning and end to distinguish them from ordinary strings that use single or double quotes. Inside a literal, we use placeholders that are indicated by a dollar sign and curly braces (`${expression}`).

```js
const temp = 39; 
const message = `The expected max. temperature today is ${temp}°C`;
```

A placeholder supports any JS expression, so we can subsitute a lot more than variable names. For example, we can embed an arithmetic expression inline or call a function:

```js
// Function returns a dynamic variable that is embedded using template literals 
const message = `Current temperature: ${toCelsius(34)}°C`;
```

Another benefit of template literals, besides the concise syntax, is that they can span multiple lines.

#### Functions are objects

In JS, functions are objects that can be *called*. They take arguments and they return values. But because of their object-like characteristics, they are also just values that can be stored in variables and passed on.

There is an alternative way of defining functions:

```javascript
// We assign a function to the variable 'message'
let message = function(firstName) {
    return `Hello, I'm ${firstName}.`;
}

// We can call the function to get the expected message
console.log(message("Victoria"));	// Returns: Hello, I'm Victoria.
```

You can also use **arrow functions** as a more concise syntax for writing function expressions.

```javascript
let message = firstName => {
    return `Hello, I'm ${firstName}.`;
}
console.log(message("Victoria"));	// Returns: Hello, I'm Victoria.
```

Note: Arrow functions have restricted functionality compared to "traditional functions". They don't have bindings to the `this` keyword and, thus, can't be used in the example below. Nevertheless, the compact arrow syntax makes D3 code typically more readable and we will use it in many situations. It's not a requirement in assignments or in the project and you can just use `function()` syntax!

A more advanced example:

```javascript
let person = { firstName: "Victoria", age: 24, profession: "Student" };

// Add a new variable to the object 'person' called 'message'.
// Store a function inside 'message' instead of a static value.
person.message = function() {
	return `Hello, I'm ${this.firstName}.`;
}
console.log(person); // Returns your new person object
console.log(person.message()); // Returns: Hello, I'm Victoria.
```

In all these examples, the current *scope* - the environment in which the function executes in - is important.

The default scope for executing functions is the *Window Object* which is a browser level object representing the actual browser window/tab. Additionally, we have also used the keyword ```this```. In the global execution context (outside of the function), ```this``` refers to the global *Window Object*. Inside a function or a class, the value of ```this``` depends on how it is called. 

So that means, if you run the function in the `person` object's scope (second example), you can access the firstName attribute via ```this```. If you use ```this.firstName``` in a function by itself (e.g. without the scope of the person object) it will give you an error, because your window object has no attribute ```firstName```.

If `this` still seems confusing to you, you can read up on these ideas on the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). We will also come back to `this` in later tutorials.


#### Array manipulation with higher-order functions

JS offers several functions for fast array manipulation. These functions usually rely on concepts from functional programming and can be hard to grasp at the beginning. We will come back to them in more detail later, but below you find a first introduction.
You can read further on [higher-order functions](http://eloquentjavascript.net/05_higher_order.html).

The ***filter(callback)*** method creates a new array with the elements that meet a condition implemented by the provided callback function.

```javascript
// ---- Filter Example 1 - Get all cities except London ---- 

const cities = ["Vienna", "Paris", "London", "London"];

// Pass an anonymous function to cities.filter()
const filteredCities = cities.filter(city => city != "London");

console.log(filteredCities); // Returns: ["Vienna", "Paris"]


// ---- Filter Example 2 - Get all numbers which are >= 10 and have array indices > 3 ---- 

const numericData = [1, 20, 3, 40, 5, 60, 7, 80];

// Anonymous function takes the array element's current value and index as parameters
const filteredNumericData = numericData.filter( (value, index) => {
	return (value >= 10) && (index > 3);
});

console.log(filteredNumericData); // Returns: [60, 80]

```

The ***sort()*** method does an inline sort of the items in an array. No new array object will be created during execution.

```javascript
// ---- Sort Example 1 - Filter array with strings (default sorting) ---- 

const cities = ["Vienna", "Paris", "London", "Munich", "Toronto"];
cities.sort();
cities 	// Returns: ["London", "Munich", "Paris", "Toronto", "Vienna"]


// ---- Sort Example 2 - Filter array with objects ---- 
// We are specifying a function that defines the sort order

const products = [
	{ name: "laptop", price: 800 },
	{ name: "phone", price: 200},
	{ name: "tv", price: 1200}
];

// Sort ascending by the 'price' property
products.sort( (a, b) => {
	return a.price - b.price;
});

// Sort descending by the 'price' property
products.sort( (a, b) => {
	return b.price - a.price;
});
```
The ***map()*** method creates a new array with the results of calling a provided function on every element of the original array.

```javascript
// ---- Map Example 1 - Calculate the square root ----

const numericData = [1, 4, 9];
const roots = numericData.map(Math.sqrt);

roots	// Returns: [1, 2, 3]


// ---- Map Example 2 - Double the prices ---- 

const products = [
	{ name: "laptop", price: 800 },
	{ name: "phone", price: 200},
	{ name: "tv", price: 1200}
];

const expensiveProducts = products.map(doublePrice);

function doublePrice(elem){
	elem.price = elem.price * 2;
	return elem;
}

expensiveProducts // Returns: [{ name: "laptop", price: 1600 }, { name: "phone", price:400}, { name: "tv", price: 2400}]
```

*You will learn more about other useful array manipulation methods (e.g. ```join()```, ```reduce()```, ...) in our D3 tutorials later.*

## <a name="git">Use Git & Github</a>

We will use **git** repositories (via Github) for all programming assignments and project milestones.  You should already be well acquainted with the process and all necessary git commands from previous courses (see [Reid Holmes'
CPSC 310 git tutorial, UBC](https://github.com/ubccpsc/310/blob/2019jan/resources/git.md) as a refresher).

Submit a programming assignment or project milestone by updating the given repository (`git push`). You can commit/push
changes as often as you want before the deadline.

#### Technical hints: How to set up Git SSH authentication?

You can clone repositories using either HTTPS and SSH, but we recommend using SSH because you do not need to enter your credentials everytime you pull and push once you set it up for the first time. We have also seen access issues (code: 403) with HTTPS cloning in previous years.

Please check whether you have a SSH key generated already: there should be `id_rsa` and `id_rsa.pub` in `~/.ssh`. If yes, please go to step 3.

1. Generate a SSH key on your local machine. Run the following command in a terminal. Follow the prompts to store the key in `~/.ssh` and enter a passphrase (it can be empty, or a phrase you like).

	```
	ssh-keygen -t rsa -C "your_email@example.com"
	```

2. Navigate to `~/.ssh`. Note that this is a hidden folder by default. You should see `id_rsa` (private key) and `id_rsa.pub` (public key).

3. Open the `id_rsa.pub` with a text editor or using the command `cat id_rsa.pub` (on *nix OS), and copy the entire content, which should be a long string.

4. Open the settings in your students github account, navigate to the SSH and GPG key tab (on the left sidebar), and then upload your public key.

5. You should be able to use the SSH link to clone repositories.

*Note: do not upload or send out your private key. It is supposed to be on your own machine.*



## <a name="frameworks">HTML & CSS Frameworks</a> *(optional)*

Rather than coding from scratch, HTML & CSS frameworks enable you to utilize ready-made blocks of code to help you get started. They give you a solid foundation for what a typical web project requires and usually they are also flexible enough for customization. Most of these frameworks provide some JS functionality as well.

[**Bootstrap**](https://getbootstrap.com/) is one of the most widely used frameworks, it is easy to understand and it provides an extensive documentation with many examples. There are many other frameworks that provide similar functionality, such as [Foundation](https://get.foundation/) or [UIKit](http://getuikit.com/).

The question whether a framework can be useful largely depends on the individual project and the developer. Therefore, it is up to you to decide if you want to use it in your assignments or projects.

Here is a summary of *Bootstrap*:

* **Open source** HTML, CSS, and JS framework. 
* Provides a **base styling** for common used HTML elements.
* The **grid system** helps you to create multi-column and nested layouts, especially if your website should work on different devices and you are not fully comfortable with CSS flexbox.
* Extensive list of **pre-styled components** (navigation, dropdown-menu, forms, tables, icons, etc).
* **Customizable**: Built on [Sass](https://sass-lang.com/) and all specifications can be overridden by your own rules.
* **Compatible** with the latest versions of all major browsers.
* Many websites are easily recognizable as "bootstrap projects" because of their similar look. We recommend you to use frameworks only as a starting point and customize components to fit your needs.

### JS and DOM

Here’s an overview of the DOM and how to access and manipulate it using JavaScript, formatted for your Markdown file:

---

### What is the DOM?

The **DOM** (Document Object Model) is a programming interface for web documents. It represents the structure of an HTML document as a tree of objects (nodes), where each element, attribute, and text in the HTML is represented as an object that JavaScript can interact with.

The DOM allows developers to:
- Access HTML elements and their properties.
- Modify the structure, style, and content of a webpage dynamically.
- React to user interactions (such as clicking a button or entering text).

Think of the DOM as a bridge between your HTML and JavaScript. When a webpage is loaded, the browser creates a DOM from the HTML file, and JavaScript can use the DOM to manipulate the content.

---

### Accessing the DOM with JavaScript

JavaScript provides several methods for selecting and accessing elements in the DOM:

#### 1. `document.getElementById()`
This method selects an element based on its `id` attribute.

```javascript
const title = document.getElementById('main-title');
console.log(title.textContent); // Outputs the text content of the element with id 'main-title'
```

#### 2. `document.getElementsByClassName()`
This method selects elements based on their class name. It returns an HTMLCollection, which is similar to an array.

```javascript
const items = document.getElementsByClassName('list-item');
console.log(items[0].textContent); // Outputs the text of the first element with class 'list-item'
```

#### 3. `document.getElementsByTagName()`
This method selects elements based on their tag name (e.g., `div`, `p`, `h1`). It also returns an HTMLCollection.

```javascript
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length); // Outputs the number of <p> elements
```

#### 4. `document.querySelector()`
This method selects the first element that matches a CSS selector. It’s versatile and allows you to select by id, class, tag name, or any valid CSS selector.

```javascript
const firstItem = document.querySelector('.list-item');
console.log(firstItem.textContent); // Outputs the text of the first element with class 'list-item'
```

#### 5. `document.querySelectorAll()`
This method selects all elements that match a CSS selector. It returns a NodeList, which can be looped through with `forEach`.

```javascript
const allItems = document.querySelectorAll('.list-item');
allItems.forEach(item => console.log(item.textContent)); // Outputs the text content of all elements with class 'list-item'
```

---

### Manipulating the DOM

Once you’ve accessed an element, you can manipulate its content, attributes, and style.

#### 1. Changing Text Content
You can change the text inside an element using the `textContent` or `innerHTML` properties.

```javascript
const title = document.getElementById('main-title');
title.textContent = 'New Title'; // Changes the text content of the element
```

#### 2. Changing HTML Content
You can insert or modify HTML inside an element using `innerHTML`.

```javascript
const container = document.getElementById('content');
container.innerHTML = '<p>This is a new paragraph!</p>'; // Inserts a new paragraph
```

#### 3. Changing Attributes
You can modify attributes like `src`, `href`, or `class` using the `setAttribute()` method or by directly setting the property.

```javascript
const image = document.getElementById('main-image');
image.setAttribute('src', 'new-image.jpg'); // Changes the image source

// Alternatively:
image.src = 'new-image.jpg';
```

#### 4. Adding and Removing Classes
You can manipulate the `classList` property to add or remove CSS classes from elements.

```javascript
const box = document.getElementById('box');
box.classList.add('highlight'); // Adds the 'highlight' class
box.classList.remove('highlight'); // Removes the 'highlight' class
```

#### 5. Modifying Styles
You can change an element’s style using the `style` property.

```javascript
const box = document.getElementById('box');
box.style.backgroundColor = 'blue'; // Changes the background color of the element
```

---

### Creating and Removing Elements

You can dynamically create new elements and append them to the DOM or remove existing ones.

#### 1. Creating Elements
Use `document.createElement()` to create a new element, then append it to a parent element using `appendChild()` or `append()`.

```javascript
const newItem = document.createElement('li');
newItem.textContent = 'New List Item';
document.querySelector('ul').appendChild(newItem); // Adds the new item to the <ul>
```

#### 2. Removing Elements
Use `removeChild()` to remove an element from its parent or `remove()` to directly remove the element.

```javascript
const list = document.querySelector('ul');
const firstItem = document.querySelector('li');
list.removeChild(firstItem); // Removes the first <li> item from the list
```

---

### Event Handling in the DOM

You can add interactivity to your webpage by using event listeners, which allow you to react to user actions like clicks, typing, or scrolling.

#### 1. Adding Event Listeners
Use `addEventListener()` to attach an event to an element.

```javascript
const button = document.getElementById('my-button');
button.addEventListener('click', function() {
  alert('Button was clicked!');
});
```

#### 2. Removing Event Listeners
You can also remove event listeners if needed.

```javascript
function handleClick() {
  alert('Button was clicked!');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // Removes the click event
```



##### Additional Learning Resources

* [Curran Kelleher's video tutorial on JavaScript](https://www.youtube.com/watch?v=rUnmw9fQEwg&t=2s)
* Tutorials, examples, documentations (HTML, CSS, JS): [W3Schools](https://www.w3schools.com/), [MDN web docs](https://developer.mozilla.org/en-US/docs/Learn)
* [ES6 Guide](https://flaviocopes.com/es6/)
* [CPSC 310 git tutorial](https://github.com/ubccpsc/310/blob/2019jan/resources/git.md)

##### Sources

* [Tamara Munzner's web development tutorial](https://github.com/UBC-InfoVis/2021-436V-tutorials/tree/master/0_Web_Tutorial)
* [Harvard's visualization course (CS171)](https://www.cs171.org/)
* [dataviscourse.net (University of Utah)](http://dataviscourse.net/tutorials/lectures/lecture-git/)
* [javascripttutorial.net](https://www.javascripttutorial.net/)