### What is CSS?

CSS (Cascading Style Sheets) is the language used to style and visually format HTML documents. While HTML provides the structure and content (the bones of a webpage), CSS brings it to life by controlling layout, colors, fonts, spacing, and much more. 

In other words, CSS is like the interior design of a building. It helps determine the look and feel of the webpage by specifying how elements like text, images, and buttons should appear. 

#### Example:
Here's a simple example where HTML provides the structure, and CSS is used to style it:

```html
<p>This is a paragraph.</p>
```

```css
p {
  color: blue;
  font-size: 18px;
}
```

- Without CSS: The paragraph will appear with the default browser styles.
- With CSS: The text will be blue and sized at 18px.

---

### How to Select Elements in CSS

To apply styles in CSS, you need to **select** which HTML elements you want to style. There are three common ways to select elements: **IDs**, **classes**, and **tag names**. 

---

### 1. **IDs**

An **ID** is a unique identifier for a single element on a webpage. Think of an ID as a name tag given to a specific item. It’s used when you want to style or manipulate only one element.

- **HTML:** You assign an ID to an element using the `id` attribute.
- **CSS:** You select an ID with a `#` symbol in your CSS.

#### Example:
```html
<p id="intro">This is an introductory paragraph.</p>
```

```css
#intro {
  color: red;
}
```

- **In HTML:** The paragraph is given the ID `intro`.
- **In CSS:** The `#intro` selector is used to style this specific paragraph.

#### Key Points:
- IDs must be **unique** on a page (only one element can have the same ID).
- IDs are useful for targeting specific elements when you don’t want to apply styles to multiple elements.

---

### 2. **Classes**

A **class** is a reusable identifier that can be applied to multiple elements. Classes are like labels that you can assign to several items, allowing you to group elements together and style them in the same way.

- **HTML:** You assign a class using the `class` attribute.
- **CSS:** You select a class with a `.` (dot) in your CSS.

#### Example:
```html
<p class="highlight">This paragraph is highlighted.</p>
<p class="highlight">This one is highlighted, too.</p>
```

```css
.highlight {
  background-color: yellow;
}
```

- **In HTML:** Both paragraphs have the same `highlight` class.
- **In CSS:** The `.highlight` selector is used to style both paragraphs with a yellow background.

#### Key Points:
- Multiple elements can share the same class.
- Elements can have more than one class (e.g., `class="highlight important"`).
- Classes are great for grouping similar elements that should share the same style.

---

### 3. **Tag Names (Element Selectors)**

Tag names (also called **element selectors**) refer to the HTML tags themselves, such as `<p>`, `<h1>`, or `<div>`. Selecting by tag name allows you to style all elements of that type on the webpage.

- **HTML:** Elements are simply defined by their tag names.
- **CSS:** You select elements by using the tag name directly.

#### Example:
```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

```css
p {
  font-size: 16px;
}
```

- **In HTML:** Two paragraphs are created using the `<p>` tag.
- **In CSS:** The `p` selector is used to apply the same font size to all paragraphs on the page.

#### Key Points:
- Selecting by tag name applies styles to **all** elements of that type.
- This is useful for applying default styles to large groups of elements, such as all paragraphs (`p`) or all headers (`h1`, `h2`, etc.).

---

### Combining IDs, Classes, and Tag Names

You can use IDs, classes, and tag names together for more specific styling.

#### Example HTML:
```html
<p id="intro" class="highlight important">This is a special paragraph.</p>
<p class="highlight">This is another highlighted paragraph.</p>
```

#### Example CSS:
```css
/* Select by ID */
#intro {
  color: blue;
}

/* Select by class */
.highlight {
  background-color: yellow;
}

/* Select by tag name */
p {
  font-size: 16px;
}
```

In this example:
- The paragraph with ID `intro` is styled with blue text.
- All paragraphs with the `highlight` class have a yellow background.
- All paragraphs (`p`) are styled with a font size of 16px.

---

### CSS Specificity

When multiple rules apply to the same element, **specificity** determines which rule takes precedence:
1. **ID selectors** (`#id`) have the highest specificity.
2. **Class selectors** (`.class`) have medium specificity.
3. **Tag name selectors** (`p`, `div`) have the lowest specificity.

#### Example:
If two conflicting styles are applied, the more specific one will win:
```html
<p id="intro" class="highlight">This is a paragraph.</p>
```

```css
#intro {
  color: red; /* This will take priority */
}

.highlight {
  color: blue;
}
```
The paragraph will have red text because the ID selector is more specific than the class selector.
