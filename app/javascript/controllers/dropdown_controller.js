import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "hiddenInput", "label"];
  static classes = ["hidden", "open", "selected"];
  static outlets = ["dropdowns"];
  static values = {
    name: String,
    autosubmit: Boolean,
  };

  connect() {
    this._closeOnClickOutside = this._closeOnClickOutside.bind(this);
  }

  toggle() {
    this.dropdownsOutlets
      .filter(dropdown => dropdown !== this.element)
      .forEach(dropdown => dropdown.close());

    if (this.menuTarget.classList.contains(this.hiddenClass)) {
      this.open();
    } else {
      this.close();
    }
  }

  _closeOnClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.close();
    }
  }

  select(event) {
    const selectedButton = event.target;
    const value = selectedButton.dataset.value;
    if (this.hasHiddenInputTarget) {
      this.hiddenInputTarget.value = value;
    }

    // Remove selected class from all options
    this.menuTarget
      .querySelectorAll("button[data-action='dropdown#select']")
      .forEach((btn) => btn.classList.remove(this.selectedClass));

    // Add selected class to the selected option
    selectedButton.classList.add(this.selectedClass);

    this._setLabel(selectedButton.textContent);
    this.close();

    if (this.autosubmitValue) {
      this._submitForm();
    }
  }

  open() {
    this.menuTarget.classList.remove(this.hiddenClass);
    // Force reflow for transition
    void this.menuTarget.offsetWidth;
    this.menuTarget.classList.add(this.openClass);
    document.addEventListener("mousedown", this._closeOnClickOutside);
  }

  close() {
    this.menuTarget.classList.remove(this.openClass);
    setTimeout(() => {
      this.menuTarget.classList.add(this.hiddenClass);
    }, 200);
    document.removeEventListener("mousedown", this._closeOnClickOutside);
  }

  _setLabel(text) {
    if (this.hasLabelTarget) {
      this.labelTarget.textContent = text;
    }
  }

  _submitForm() {
    const form = this.element.closest("form");
    if (form) form.requestSubmit();
  }
}
