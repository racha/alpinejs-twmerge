# Alpine JS `x-twmerge`

Alpine JS plugin `x-twmerge` is a minimal wrapper designed to integrate `twMerge` and `clsx` with [AlpineJS](https://alpinejs.dev/), offering both a directive `x-twmerge` for dynamic class management and a magic method `$twMerge` for computed class merging. This plugin enables you to leverage the utility-first CSS approach of Tailwind CSS dynamically within your Alpine.js components.

## Features

- **`x-twmerge` Directive**: Dynamically apply and manage Tailwind CSS classes based on component state.
- **`$twMerge` Magic Method**: Use this magic method to compute and merge classes programmatically within Alpine.js expressions.

## Important Note on `x-twmerge` Behavior

When `x-twmerge` is initialized on an element, it takes note of the original classes defined on that element and always uses them as the base/first set of classes sent to `twMerge`. This ensures that the initial styling of the element is preserved, and only the additional dynamic classes are merged or toggled based on component state.

Example of `x-twmerge` preserving original classes:

```html
<div x-data="{ highlight: false }" class="text-gray-800">
  <!-- Original class "text-gray-800" is always included -->
  <div class="w-10 h-10 bg-gray-200" x-twmerge="{'bg-yellow-200': highlight}"></div>
  <button @click="highlight = !highlight">Toggle Highlight</button>
</div>
```

In contrast, the `$twMerge` magic method does not automatically include the element's original classes. It only processes the classes provided to it and returns the merged class string. All the dynamic classes need to be sent to the $twMerge magic in order for it to correctly merge them as it does not know the element original classes.

Example of `$twMerge` without preserving original classes:

```html
<div x-data="{ active: false }" class="text-gray-800">
  <!-- When using :class with $twmerge to dynamically merge classes you need to provide the base classes as well -->
  <div class="w-10 h-10" :class="$twMerge(['bg-gray-200', {'bg-yellow-200': active}])"></div>
  <button @click="active = !active">Toggle Active</button>
</div>
```

## Examples

### Basic Usage

Toggle a class based on component state using the `x-twmerge` directive:

```html
<div x-data="{ active: false }" class="p-4">
  <div class="w-24 h-24 bg-gray-200" x-twmerge="active && 'bg-blue-500'"></div>
  <button @click="active = !active">Toggle Active</button>
</div>
```

### Using Array of Classes

Pass an array of classes to `x-twmerge`:

```html
<div x-data="{ open: false }" class="p-4">
  <div x-twmerge="['bg-red-500', open && 'bg-blue-500']"></div>
  <button @click="open = !open">Toggle Open</button>
</div>
```

### Using `clsx` Object

Utilize a `clsx`-like object syntax with `x-twmerge` for more complex class logic:

```html
<div x-data="{ error: true, warning: false }" class="p-4">
  <div
    x-twmerge="{
        'text-white': true,
        'bg-red-500': error,
        'bg-yellow-500': warning && !error,
    }"></div>
  <button @click="error = !error">Toggle Error</button>
  <button @click="warning = !warning">Toggle Warning</button>
</div>
```

### `:class` with `$twMerge` Magic Method

Use `$twMerge` within the `:class` binding for computed class strings:

```html
<div x-data="{ primary: false, secondary: true }" class="p-4">
  <div
    :class="$twMerge([
        'text-base', 
        'font-semibold', 
        primary ? 'text-blue-500' : 'text-gray-800', 
        secondary && 'bg-yellow-200'
    ])"></div>
  <button @click="primary = !primary">Toggle Primary</button>
  <button @click="secondary = !secondary">Toggle Secondary</button>
</div>
```

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs-twmerge@latest/dist/alpinejs-twmerge.cdn.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM or Yarn

```shell
npm i -D alpinejs-twmerge
# or
yarn add -D alpinejs-twmerge
```

Then, integrate it into your project:

```js
import Alpine from "alpinejs";
import twmerge from "alpinejs-twmerge";

Alpine.plugin(twmerge);
window.Alpine = Alpine;
Alpine.start();
```
