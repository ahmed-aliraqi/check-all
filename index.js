class CheckAll {
  checkAllElement = document.querySelector('input[type=checkbox][data-children]');
  actionTrigger = document.querySelectorAll('[data-checkbox]');
  checkAllChildren = [];

  constructor(options) {
    options = options || {};
    this.onchange = options.onchange || this.onchange;

    if (this.checkAllElement) {
      this.checkAllChildren = document.querySelectorAll(this.checkAllElement.getAttribute('data-children'))
    }
  }

  handleCheckAllChangeEvent(event) {
    document.querySelectorAll(
      event.target.getAttribute('data-children')
    )
      .forEach(function (el) {
        el.checked = event.target.checked;

        el.dispatchEvent(new Event('change'));
      })
  }

  handleActionTriggerEnable(button) {
    document.querySelectorAll(
      button.getAttribute('data-checkbox')
    )
      .forEach(function (el) {
        el.addEventListener(
          'change',
          function (event) {
            if (event.target.checked) {
              button.disabled = false;
            } else {
              if (document.querySelectorAll(
                button.getAttribute('data-checkbox') + ':checked'
              ).length === 0) {
                button.disabled = true;
              }
            }
          }
        )
      })
  }

  onchange(el) {
  }

  init() {
    let instance = this;
    if (this.checkAllElement) {
      this.checkAllElement.addEventListener(
        'change',
        this.handleCheckAllChangeEvent
      );
    }

    if (this.checkAllChildren.length) {
      this.checkAllChildren
        .forEach(function (el) {
          el.addEventListener(
            'change',
            function (event) {
              instance.onchange(event.target)
            }
          )
        });
    }

    if (this.actionTrigger.length) {
      this.actionTrigger
        .forEach(function (button) {

          instance.handleActionTriggerEnable(button);

          button.addEventListener('click', function (event) {
            document.querySelectorAll(
              button.getAttribute('data-checkbox')
            )
              .forEach(function (input) {
                input.setAttribute('form', button.getAttribute('data-form'))
              })
          })
        })
    }
  }
}