<h1 align="center">Stimulus-Conductor</h1>

<p align="center">
  <b>👩‍👧‍👦 👨‍👧‍👦 : An optionated Stimulus Controller to easily manage parent/children controllers</b></br>
  <sub>Only ~0.3kb <sub>
</p>
<br />

- **Conventions**: Parent/children Stimulus controllers defined by simple conventions
- **has many** : an `items` controller has many `item` controllers
- **belongs to** : `item` controllers belong to an `items` controller
- **MIT Licensed**: free for personal and commercial use

## Getting started

This assumes that you have [Stimulus](https://stimulusjs.org/handbook/installing) already installed.

In your project just add the `stimulus-conductor` package.

```bash
$ yarn add stimulus-conductor
```

or

```bash
$ npm i stimulus-conductor
```

#### Define your html

Parent conductor is the plural of the item name

```html
<div data-controller="items">
  <div data-controller="item"></div>
  <div data-controller="item"></div>
  <div data-controller="item"></div>
</div>
```

#### Define your parent controllers by extending `stimulus-conductor`

```js
// ./controllers/items_controller.js
import Conductor from "stimulus-conductor";

// create a parent controller by extending stimulus-conductor controller
export default class extends conductor {
  connect() {
    super.connect();

    // you can access to the children controllers like this
    // this.itemControllers is an array of item stimulus controllers
    // this.itemControllers.length -> 3
  }
}
```

#### Define your children controllers by extending `stimulus-conductor`

```js
// ./controllers/item_controller.js
import Conductor from "stimulus-conductor";

// create a kid controller by extending stimulus-conductor controller
export default class extends conductor {
  connect() {
    super.connect();

    // you can access to the parent controller like this
    // this.itemsController is the stimulus controller for the parent controller
  }
}
```

## Example

An very basic todo list example is available here : [playground](https://github.com/adrienpoly/stimulus-conductor/playground)

You can start it as follow:

```bash
git clone https://github.com/adrienpoly/stimulus-conductor.git
cd stimulus-conductor
yarn install
yarn start
```

## Limitations

Currently the library makes a very simple plural of the controller name by adding a `s`at the end of the word:

- `todo` is conducted by `todos`
- `item` is conducted by `items`

more complex plurals (child/children) are not yet supported

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
