# Popup Alert

A Simple and Customizable JavaScript Code for Your Web Page
https://www.npmjs.com/package/popup-alert

## Installation

To begin using Popup Alert, you first need to install the package from npm. Simply run the following command:

```bash
npm i popup-alert

```

Next, you need to link the CSS and JS files to your project. Use the following code:

```html
<link rel="stylesheet" href="/node_modules/popup-alert/app.css" />
```

```html
<script src="/node_modules/popup-alert/index.js"></script>
```

## Code Explanation

Popup Alert works by creating an object of the Alert class in JavaScript. You can use the following code to create an alert:

```javascript
const alert = new Alert({
  text: "this is test text",
});
```

To display the alert, use the "show()" method:

```javascript
alert.show();
```

## Customizing

Popup Alert offers several parameters for customization. You can use the following code to customize the alert box:

```javascript
const alert = new Alert({
  text: "this is text",
  textColor: "#fff",
  bgColor: "#474e68",
  buttonText: "OK",
  buttonTextColor: "#fff",
  buttonBgColor: "#007bff",
});
```

The available parameters are:

| Parameter         | Type     | Description                |
| :---------------- | :------- | :------------------------- |
| `text`            | `string` | title of alert             |
| `textColor`       | `string` | color of title             |
| `bgColor`         | `string` | alert box background color |
| `buttonText`      | `string` | text of alert button       |
| `buttonTextColor` | `string` | button text color          |
| `buttonBgColor`   | `string` | button background color    |

If you want the alert box to automatically hide after a certain amount of time, use the following code:

```javascript
alert.show({
  enabled: true,
  time: 1000,
});
```

The "enabled" parameter is used to enable or disable the timer, and the "time" parameter is used to set the time in milliseconds before the alert box automatically hides.
