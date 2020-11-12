(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var CheckAll = {
    handleCheckAllChangeEvent(event) {
      document.querySelectorAll(
        event.target.getAttribute('data-children')
      )
        .forEach(el => {
          el.checked = event.target.checked;

          el.dispatchEvent(new Event('change'));
        });
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
          );
        });
    },
    init() {
      document.addEventListener("DOMContentLoaded", event => {
        this.checkAllElement = document.querySelectorAll('input[type=checkbox][data-children]');
        this.actionTrigger = document.querySelectorAll('[data-checkbox]');
        this.checkAllChildren = [];
        if (this.checkAllElement.length) {
          this.checkAllElement.forEach(checkAll => {
            checkAll.addEventListener(
              'change', this.handleCheckAllChangeEvent
            );

            this.checkAllChildren = document.querySelectorAll(checkAll.getAttribute('data-children'));

            if (this.checkAllChildren.length) {

              this.checkAllChildren
                .forEach(el => {
                  el.addEventListener('change', event => {
                      this.changed(event.target);
                    }
                  );
                });
            }
          });
        }

        if (this.actionTrigger.length) {
          this.actionTrigger
            .forEach(button => {
              this.handleActionTriggerEnable(button);

              button.addEventListener('click', event => {
                document.querySelectorAll(
                  button.getAttribute('data-checkbox')
                )
                  .forEach(input => {
                    input.setAttribute('form', button.getAttribute('data-form'));
                  });
              });
            });
        }
      });

      return this;
    },
    changed(input) {
      //
    },
    onChange(callback) {
      this.changed = callback;
    }
  };

  window.CheckAll =  CheckAll.init();

})));
