# Autocomplete-react Algolia

## Install

The `autocomplete-react` module should be available on npm soon (or maybe not?)

```shell
  yarn add autocomplete-react
```

## Usage

In order to use this React Autocomplete module for Algolia you will need an ALgolia account.
You can signup with [Algolia account here](https://www.algolia.com/users/sign_up) and create your first indexes.

Alternatively if you just want to play around with this module you can an existing data set you can simply use public data provided by algolia. You'll find predefined set of data free to use on the [algolia/dataset github repository](https://github.com/algolia/datasets)

To add an Autocomplete component to your website you will need your index name, appId and apiKey provided by Algolia. You can find those informations in your [Algolia dashboard](https://www.algolia.com/apps/_/api-keys).

### Basic usage

In your React application you can use the following code:

```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <SearchBox placeholder="Search for Products"/>
    <Index indexName="<some-index>"/>
  </AutoComplete>
```

### Display custom hits

By default `<Index>` tag will display your hits (results from search) in a list showing the name attribute.
It is likely that you will want to display your Hits differentely. To achieve this goal let's start by writing a `customHitsDisplay` function:

```javascript
  const customHitsDisplay = function(hit, key) {
    <Highlight attribute='name' hit={hit} tag="h3"/>
    <Highlight attribute='shortDescription' hit={hit} tag="span"/>
    <img src={hit.img}/>
  };
```

React needs every elements in a `map` to be populated with a key in order to identify which items have changed( see [official React doc](https://reactjs.org/docs/lists-and-keys.html)). To prevent from the React noisy warning to happen, make sure to add a `key` attribute to your custom rendering function.


Then in your `Autocomplete` component:
```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <SearchBox placeholder="Search for Products"/>
    <Index indexName="<some-index>" hit={customHitsDisplay}/>
  </AutoComplete>
```

###  Highlight results

If you want to show highlighted results you can modify:

```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <StickySearchBox>
      <SearchBox placeholder="Search for Products"/>
    </StickySearchBox>
    <Index indexName="<some-index>"/>
  </AutoComplete>
```


###  Sticky SearchBox

If you want your seachBox to stick to the top of the page while your users scroll down the page you can simply wrap your SearchBox element in a StickySearchBox component:

```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <StickySearchBox>
      <SearchBox placeholder="Search for Products"/>
    </StickySearchBox>
    <Index indexName="<some-index>"/>
  </AutoComplete>
```

###  Multi index support

This module supports for multiple indexes:

```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <SearchBox placeholder="Search for Products"/>
    <Index indexName="<some-index>"/>
    <Index indexName="<another-index>"/>
  </AutoComplete>
```

### Custom page rendering

You can arrange and style what you want to display as you which, creating nested components and overriding the current style of the library:

```javascript
  <AutoComplete
    appId="<your-appId>"
    apiKey="<your-apiKey>"
  >
    <div className='header'>
      <SearchBox style={{'border':'2px solid'}} placeholder="Search for Products"/>
    </div>
    <div className="mainIndex">
      <h1>Some title</h1>
      <Index indexName="<some-index>"/>
    </div>
    <div className="secondaryIndex">
      <div className="nestedIndexInSeveralDivs">
        <Index indexName="<another-index>"/>
      </div>
    </div>
  </AutoComplete>
```

### Autocomplete/ How does it work

Before the first rendering, under the hood the Autocomplete component populates its children elements with aditional props.

The AutoComplete element adds `appId` and `apiKey` to each of its children `Index`. It will also insert its state value as a props in each Index.

The autoComplete element will propagate an `onSearchBoxInput` function to any `SearchBox` provided in order to lift the value state up from `SearchBox` to `AutoComplete` which will then propagate this value to its `Index` children in order to reload the Hits.

Take a look at AutoComplete rendering function to get the big picture of where the magic happens.

## Contribute

Clone the current repo locally:
```shell
  git clone git@github.com:Skaelv/autocomplete-react.git
  cd autocomplete-react/
  yarn install
  yarn start
```

To run the test suit:

```shell
  yarn test
```

- Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
- Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it.
- Fork the project.
- Start a feature/bugfix branch.
- Make sure you add your exemple to the App.js file containing all examples IF necessary
- Commit and push until you are happy with your contribution.
- Make sure to add tests for it. This is important so we don't break it in a future version unintentionally.
