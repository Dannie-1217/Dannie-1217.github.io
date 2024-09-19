# HTML Primer

This tutorial will give you a brief overview of HTML, CSS, and JS. 

## What is HTML?

HTML **(HyperText Markup Language)** is used to create the structure and content of a webpage, much like the blueprint of a building.

Imagine you’re constructing a building. HTML is like the skeleton or framework of that building. It outlines where each room (section) goes, whether it's a living room (a main content area), a kitchen (a header), or a hallway (a navigation menu). Just as a blueprint specifies the different parts of a building, HTML defines elements like headings, paragraphs, images, and links on a webpage.

## A basic page

Most HTML pages have a structure that starts with something like this. You can copy and paste a template like this into your `filename.html` to get started.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Webpage</title>
  </head>
  <body>
    <header>
      <h1>Welcome to My Webpage</h1>
    </header>
    
    <main>
      <p>This is where the main content of the webpage goes.</p>
    </main>
    
    <footer>
      <p>© 2024 My Webpage</p>
    </footer>
  </body>
</html>
```

#### Explanation:

- **`<!DOCTYPE html>`**:  
  This tells the browser that the document is an HTML5 document. It helps ensure the webpage is rendered correctly.

- **`<html lang="en">`**:  
  This is the root element that wraps all the content on the webpage. The `lang="en"` attribute specifies the language of the content (in this case, English).

- **`<head>`**:  
  Contains meta-information about the webpage (information that isn’t directly visible on the page itself). Think of it as background information that helps the browser understand the page.

  - **`<meta charset="UTF-8">`**:  
    This ensures the webpage uses UTF-8 encoding, which supports a wide range of characters, including most languages.

  - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**:  
    This makes sure the webpage is responsive. It controls how the page is scaled on different devices (such as mobile vs. desktop).

  - **`<title>`**:  
    This defines the title of the webpage, which appears in the browser tab. It’s like naming your building, and it’s important for SEO.

- **`<body>`**:  
  The body contains everything that will be visible on the webpage. This is where the content is placed, like the actual rooms and walls in the building.

  - **`<header>`**:  
    This is typically where you'd place the title or logo of the page, similar to a sign on the front of a building.

  - **`<main>`**:  
    This section contains the primary content of the webpage. It's where most of the action happens, like the main rooms in a building.

  - **`<footer>`**:  
    Located at the bottom, this section usually contains copyright info, contact details, or links—similar to a plaque or notice at the entrance or exit of the building.

## So what are these things that are inside of `<>`?

These are called **tags** and they form everything html.

HTML tags are the building blocks of a webpage, similar to different types of materials in a construction project. Each tag is used to define a specific element on a webpage, such as text, images, or links, and it tells the browser how to display that content.

#### Structure of a Tag
Most HTML elements have an opening tag, content, and a closing tag. The tags are enclosed in angle brackets (`< >`), while the content goes between the tags. 

```html
<p>This is a paragraph.</p>
```

- **Opening tag (`<p>`)**: This tells the browser to begin a paragraph.
- **Content**: The text "This is a paragraph" is the actual content that will be displayed on the page.
- **Closing tag (`</p>`)**: This tells the browser that the paragraph ends here.

#### Types of Tags

1. **Paired Tags (with opening and closing tags)**:  
   These wrap around content and specify when the content begins and ends. Think of paired tags like building a doorframe. You have an opening tag to start it and a closing tag to finish it.

   Example:
   ```html
   <h1>Welcome to My Webpage</h1>
   ```
   This example defines a heading level 1 (`<h1>`), and the closing tag `</h1>` wraps up that heading.

2. **Self-Closing Tags**:  
   Some elements don't need a closing tag because they are empty, such as an image or a line break. These are called self-closing tags.

   Example:
   ```html
   <img src="image.jpg" alt="A descriptive text for the image" />
   ```
   The `<img>` tag is used to display an image and is self-closing because it doesn't have content inside it, just attributes like `src` and `alt`.

#### Attributes
Tags can also have **attributes**, which provide additional information about an element. Attributes are placed inside the opening tag.

Example:
```html
<a href="https://example.com">Visit Example</a>
```
- The `<a>` tag is used to create a link.
- The `href` attribute specifies the destination URL of the link.
- The text "Visit Example" is what will be clickable.

#### Tag Nesting
Tags can also be **nested** inside other tags to create a structure. This is like building different sections of a house within a room.

Example:
```html
<div>
  <h2>My Section</h2>
  <p>This is a paragraph inside the section.</p>
</div>
```

Here, the `<h2>` and `<p>` tags are nested inside the `<div>`, which is used to group content together.

## Some of the most important elements 

#### 1. `<html>`
The root element that wraps all the content of an HTML document. Every webpage starts with this tag.

```html
<html>
  <!-- All content goes here -->
</html>
```

#### 2. `<head>`
Contains meta-information about the webpage, such as the title and links to stylesheets.

```html
<head>
  <title>My Webpage</title>
</head>
```

#### 3. `<title>`
Defines the title of the webpage, which appears in the browser tab.

```html
<title>My Webpage</title>
```

#### 4. `<body>`
Contains all the content that will be visible on the webpage. Everything users see is wrapped inside the `<body>` tag.

```html
<body>
  <h1>Welcome to My Webpage</h1>
  <p>This is a paragraph of content.</p>
</body>
```

#### 5. `<h1> to <h6>`
Headings define titles and subtitles. `<h1>` is the most important (usually the page title), while `<h6>` is the least important.

```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
```

#### 6. `<p>`
Defines a paragraph of text. This is one of the most common tags used for organizing written content.

```html
<p>This is a paragraph of text.</p>
```

#### 7. `<a>`
Creates a hyperlink, allowing users to click and navigate to another page or location.

```html
<a href="https://example.com">Click here to visit Example</a>
```

- `href`: Specifies the URL or destination of the link.

#### 8. `<img>`
Inserts an image into the webpage. This tag is self-closing and requires attributes.

```html
<img src="image.jpg" alt="A descriptive text for the image" />
```

- `src`: Specifies the image source (the file path or URL).
- `alt`: Provides alternative text for accessibility and when the image can't load.

#### 9. `<ul>`, `<ol>`, and `<li>`
Used to create lists. `<ul>` defines an unordered (bulleted) list, and `<ol>` defines an ordered (numbered) list. `<li>` defines each list item.

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>
```

#### 10. `<div>`
A generic container used to group elements together for styling or layout purposes. It doesn’t have a specific meaning but is used to structure and organize content.

```html
<div>
  <h2>Section Title</h2>
  <p>This is content inside the div.</p>
</div>
```

#### 11. `<span>`
An inline container, used for grouping a part of text or other elements within a block, often for styling purposes.

```html
<p>This is a <span style="color: red;">highlighted</span> word.</p>
```

#### 12. `<form>`
Creates a form to collect user input. It can contain various types of input fields, such as text fields, checkboxes, and buttons.

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" />
  <button type="submit">Submit</button>
</form>
```

- `action`: Specifies where to send the form data.
- `method`: Defines the method of form submission (e.g., GET or POST).

#### 13. `<input>`
Defines an input field in a form, such as text boxes, radio buttons, or checkboxes.

```html
<input type="text" placeholder="Enter your name" />
```

- `type`: Specifies the type of input (e.g., text, checkbox, radio, password).
- `placeholder`: Adds placeholder text inside the input field.

#### 14. `<button>`
Creates a clickable button, often used within forms.

```html
<button type="submit">Submit</button>
```

#### 15. `<table>`, `<tr>`, `<td>`, and `<th>`
Creates tables to display data in rows and columns. 

```html
<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Data 1</td>
    <td>Data 2</td>
  </tr>
</table>
```

- `<table>`: Defines the table.
- `<tr>`: Defines a row.
- `<td>`: Defines a cell of data.
- `<th>`: Defines a table header.

#### 16. `<br>`
Inserts a line break within text. This is a self-closing tag.

```html
<p>This is a sentence.<br>This is on a new line.</p>
```

#### 17. `<strong>` and `<em>`
Used to emphasize text. `<strong>` makes text bold, and `<em>` italicizes text.

```html
<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>
```

#### 18. `<link>`
Used to link external resources, such as CSS stylesheets.

```html
<link rel="stylesheet" href="styles.css">
```

- `rel`: Specifies the relationship (usually `stylesheet` for CSS).
- `href`: Provides the location of the linked resource.

#### 19. `<meta>`
Provides metadata about the document, often used for SEO and browser settings. This tag is placed inside the `<head>` section.

```html
<meta charset="UTF-8">
<meta name="description" content="A brief description of the webpage">
```

- `charset`: Defines the character encoding (usually `UTF-8`).
- `name` and `content`: Used to provide metadata like descriptions or keywords.

#### 20. `<script>`
Used to add JavaScript to a webpage. We will get to this at some other time. But for now:

```html
<script src="script.js"></script>
```

- `src`: Links to an external JavaScript file.
