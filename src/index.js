let CheckAll = {
  handleCheckAllChangeEvent(event) {
    const checkAll = event.target;
    const childrenSelector = checkAll.getAttribute('data-children');
    const children = document.querySelectorAll(childrenSelector);
    children.forEach(el => {
      el.checked = checkAll.checked;
      el.dispatchEvent(new Event('change'));
    });
    // Set indeterminate to false when manually toggling
    checkAll.indeterminate = false;
  },

  updateCheckAllIndeterminate(checkAll) {
    const childrenSelector = checkAll.getAttribute('data-children');
    const children = document.querySelectorAll(childrenSelector);
    const checkedCount = Array.from(children).filter(el => el.checked).length;
    if (checkedCount === 0) {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    } else if (checkedCount === children.length) {
      checkAll.checked = true;
      checkAll.indeterminate = false;
    } else {
      checkAll.checked = false;
      checkAll.indeterminate = true;
    }
  },

  handleActionTriggerEnable(button) {
    if (document.querySelectorAll(
      button.getAttribute('data-checkbox') + ':checked'
    ).length) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
    document.querySelectorAll(
      button.getAttribute('data-checkbox')
    )
      .forEach(el => {

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
  },
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.checkAllElement = document.querySelectorAll('input[type=checkbox][data-children]');
      this.actionTrigger = document.querySelectorAll('[data-checkbox]');
      this.checkAllChildren = [];
      this.initCheckAll();
      this.initActionTriggers();
    });
    return this;
  },

  initCheckAll() {
    if (!this.checkAllElement.length) return;
    this.checkAllElement.forEach(checkAll => {
      checkAll.addEventListener('change', event => {
        // Always get the children for this checkAll instance
        const children = document.querySelectorAll(checkAll.getAttribute('data-children'));
        children.forEach(el => {
          el.checked = checkAll.checked;
        });
        children.forEach(el => {
          el.dispatchEvent(new Event('change'));
        });
        checkAll.indeterminate = false;
      });
      // Always get the children for this checkAll instance
      const children = document.querySelectorAll(checkAll.getAttribute('data-children'));
      if (children.length) {
        children.forEach(el => {
          el.addEventListener('change', event => {
            this.changed(event.target);
            this.updateCheckAllIndeterminate(checkAll);
          });
        });
        this.updateCheckAllIndeterminate(checkAll);
      }
    });
  },

  initActionTriggers() {
    if (!this.actionTrigger.length) return;
    this.actionTrigger.forEach(button => {
      this.handleActionTriggerEnable(button);
      button.addEventListener('click', event => {
        document.querySelectorAll(button.getAttribute('data-checkbox'))
          .forEach(input => {
            input.setAttribute('form', button.getAttribute('data-form'));
          });
      });
    });
  },
  changed(input) {
    //
  },
  onChange(callback) {
    this.changed = callback;
  }
}

window.CheckAll = CheckAll.init();

export default CheckAll;