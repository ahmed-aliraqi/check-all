# Check All Plugin

A simple tool used to handle check all and multi action forms.

![Check All](https://raw.githubusercontent.com/ahmed-aliraqi/check-all/master/screenshot/check-all.gif)

## Installation
- NPM
    ```bash
    npm i @ahmed-aliraqi/check-all --save-dev
    ```
    // app.js
    ```javascript
    require('@ahmed-aliraqi/check-all');
  
    CheckAll.onChange(function (el) {
        // Do something
    });
    ```
- CDN
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@ahmed-aliraqi/check-all"></script>
    <script>
        CheckAll.onChange(function (el) {
            // Do something
        });
    </script>
    ```

## Usage
```html
<div>
    <button form="edit-form"
            data-checkbox=".item-checkbox"
            data-form="edit-form">Edit Selected</button>

    <button form="delete-form"
            data-checkbox=".item-checkbox"
            data-form="delete-form">Delete Selected</button>
</div>
<br>
<table border="1" style="width: 300px">
    <tr>
        <th><input type="checkbox" data-children=".item-checkbox"></th>
        <th>Name</th>
    </tr>
    <tr>
        <th><input type="checkbox" name="items[]" value="1" class="item-checkbox"></th>
        <td>Item 1</td>
    </tr>
    <tr>
        <th><input type="checkbox" name="items[]" value="2" class="item-checkbox"></th>
        <td>Item 2</td>
    </tr>
    <tr>
        <th><input type="checkbox" name="items[]" value="3" class="item-checkbox"></th>
        <td>Item 3</td>
    </tr>
</table>

<script src="../dist/check-all.min.js"></script>
<script>
  CheckAll.onChange(function (el) {
      if (el.checked) {
        el.closest('tr').classList.add("checked");
      } else {
        el.closest('tr').classList.remove("checked");
      }
    });
</script>
```

