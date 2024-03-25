<h1 align="center">Stimulus-Conductor</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/stimulus-conductor" rel="nofollow">
    <img src="https://badge.fury.io/js/stimulus-conductor.svg" alt="npm version">
  </a>
  <a href="https://circleci.com/gh/adrienpoly/stimulus-conductor" rel="nofollow">
  <img src="https://circleci.com/gh/adrienpoly/stimulus-conductor/tree/master.svg?style=svg" alt="CircleCi build status">
  </a>
  <a href="https://codecov.io/gh/adrienpoly/stimulus-conductor">
    <img src="https://codecov.io/gh/adrienpoly/stimulus-conductor/branch/master/graph/badge.svg" alt="Coverage"/>
  </a>
</p>

<p align="center">
  <b>👩‍👧‍👦 👨‍👧‍👦 : A simple Stimulus Controller to manage Parent/Children controllers with simple conventions</b></br>
</p>
<br />

- **Conventions**: Parent/children Stimulus controllers defined by simple conventions
- **Has many** : an `items` controller has many `item` controllers
- **Belongs to** : `item` controllers belong to an `items` controller

## Getting started

This assumes that you have [Stimulus](https://stimulusjs.org/handbook/installing) already installed.

In your project just add the `stimulus-conductor` package.

```bash
yarn add stimulus-conductor
```

or

```bash
npm i stimulus-conductor
```

### Conventions

There is a single convention to remember to use this package:

> **Parent conductor is the plural of the children items name**
>
> - `todo` controllers are conducted by a `todos` controller
> - `item` controllers are conducted by an `items` controller
> - `chart` controllers are conducted by a `charts` controller

### Define your html

```html
<div data-controller="items">
  <div data-controller="item"></div>
  <div data-controller="item"></div>
  <div data-controller="item"></div>
</div>
```

### Define your parent controllers by extending `stimulus-conductor`

```js
// ./controllers/items_controller.js
import Conductor from 'stimulus-conductor'

// create a parent controller by extending stimulus-conductor controller
export default class extends Conductor {
  connect() {
    // if you overwrite connect you must call super!!!!
    super.connect()
  }

  disconnect() {
    // if you overwrite disconnect you must call super!!!!
    super.disconnect()
  }

  update() {
    // this.itemControllers is an array of item stimulus controllers
    // this.itemControllers.length -> 3
  }
}
```

> By **convention** the parent controller has a new class method `this.itemControllers` that return an array of all children controllers

### Define your children controllers by extending `stimulus-conductor`

```js
// ./controllers/item_controller.js
import Conductor from 'stimulus-conductor'

// create a kid controller by extending stimulus-conductor controller
export default class extends Conductor {
  connect() {
    // if you overwrite connect you must call super!!!!
    super.connect()

    // you can access to the parent controller like this
    // this.itemsController is the stimulus controller for the parent controller
  }
}
```

> By **convention** all children controllers have a new class method `this.itemsController` that return the parent controller

### Inflections & custom naming

Sometime plurals are not just as simple as adding a `s` at the end. You can overide the musician and conductor name by setting the static `musicianId` and `conductorId` values.

```js
// your conductor todo_controller.js
export default class extends Controller {
  static musicianId = 'todo-item'
  // ...
}

// your musicians todo-item_controller.js
export default class extends Controller {
  static conductorId = 'todo'
  // ...
}
```

## Example

An very basic todo list example is available on Glitch :

- [Todo list code ](https://glitch.com/edit/#!/stimulus-conductor)
- [Live demo ](https://stimulus-conductor.glitch.me/)

## Limitations

#### Plurals

Currently the library makes a very simple plural of the controller name by adding a `s`at the end of the word:

- `todo` is conducted by `todos`
- `item` is conducted by `items`

more complex plurals (child/children) are not yet supported

#### Nesting

Currently it only works with nested parent/children elements

## Contributing

Bug reports and pull requests are welcome.

**To contribute:**

Fork the project.

Install dependencies

`$ yarn install`

Start the test watcher

`$ yarn test:watch`

Running one-off test runs can be done with:

`$ yarn test`

You can test locally also the results with the playground project (`yarn start`)

**Then :**

👍 Write some tests

💪 Add your feature

🚀 Send a PR

## License

This package is available as open source under the terms of the MIT License.
