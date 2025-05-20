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

    // Auto-flip vertical logic
    const button = this.element.querySelector('button');
    const buttonRect = button.getBoundingClientRect();
    const menu = this.menuTarget;
    // Temporarily show menu to measure height and width
    menu.style.visibility = 'hidden';
    menu.style.display = 'block';
    const menuHeight = menu.offsetHeight || 200; // fallback if not rendered
    const menuWidth = menu.offsetWidth || 200;
    menu.style.removeProperty('display');
    menu.style.removeProperty('visibility');

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      this.menuTarget.classList.add("dropdown-menu--top");
    } else {
      this.menuTarget.classList.remove("dropdown-menu--top");
    }

    // Auto-flip horizontal logic
    const spaceRight = window.innerWidth - buttonRect.left;
    const spaceLeft = buttonRect.right;

    // Remove both alignment classes first
    menu.classList.remove("dropdown-menu--align-right", "dropdown-menu--align-left");

    if (spaceRight < menuWidth && spaceLeft > spaceRight) {
      // Not enough space to the right, align right
      menu.classList.add("dropdown-menu--align-right");
    } else {
      // Default: align left
      menu.classList.add("dropdown-menu--align-left");
    }

    this.menuTarget.classList.add(this.openClass);
    document.addEventListener("mousedown", this._closeOnClickOutside);

    // Lock body scroll on mobile
    document.body.classList.add("overflow-hidden");
  }

  close() {
    this.menuTarget.classList.remove(this.openClass);
    setTimeout(() => {
      this.menuTarget.classList.add(this.hiddenClass);
    }, 200);
    document.removeEventListener("mousedown", this._closeOnClickOutside);

    // Unlock body scroll
    document.body.classList.remove("overflow-hidden");
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
