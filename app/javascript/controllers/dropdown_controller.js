import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "hiddenInput", "label", "chevron"];
  static classes = ["hidden", "open", "selected", "flip"];
  static outlets = ["dropdowns"];
  static values = {
    name: String,
    autosubmit: Boolean,
  };

  connect() {
    this._closeOnClickOutside = this._closeOnClickOutside.bind(this);
  }

  toggle() {
    // Close all other dropdowns
    this._closeOtherDropdowns();

    // Toggle current menu
    this.menuTarget.classList.contains(this.hiddenClass)
      ? this.open()
      : this.close();
  }

  _closeOtherDropdowns() {
    this.dropdownsOutlets
      .filter((dropdown) => dropdown !== this.element)
      .forEach((dropdown) => dropdown.close());
  }

  _closeOnClickOutside(event) {
    if (!this.element.contains(event.target)) this.close();
  }

  select(event) {
    const selectedButton = event.target;
    const value = selectedButton.dataset.value;

    // Update hidden input with the selected value
    if (this.hasHiddenInputTarget) {
      this.hiddenInputTarget.value = value;
    }

    // Update selected class
    this._updateSelectedClass(selectedButton);

    // Update label text
    this._setLabel(selectedButton.textContent);

    // Close the dropdown
    this.close();

    // Autosubmit if enabled
    if (this.autosubmitValue) {
      this._submitForm();
    }
  }

  _updateSelectedClass(selectedButton) {
    this.menuTarget
      .querySelectorAll("button[data-action='dropdown#select']")
      .forEach((btn) => btn.classList.remove(this.selectedClass));

    selectedButton.classList.add(this.selectedClass);
  }

  open() {
    this.menuTarget.classList.remove(this.hiddenClass);
    // Force reflow for transition
    void this.menuTarget.offsetWidth;

    // Auto-flip positioning logic
    this._adjustMenuPosition();

    this.menuTarget.classList.add(this.openClass);
    document.addEventListener("mousedown", this._closeOnClickOutside);

    // Flip the chevron if needed
    this.chevronTarget.classList.add(this.flipClass);

    // Lock body scroll on mobile
    document.body.classList.add("overflow-hidden");
  }

  close() {
    this.menuTarget.classList.remove(this.openClass);
    setTimeout(() => {
      this.menuTarget.classList.add(this.hiddenClass);
    }, 200);
    document.removeEventListener("mousedown", this._closeOnClickOutside);

    // Remove flip class from chevron
    this.chevronTarget.classList.remove(this.flipClass);

    // Unlock body scroll
    document.body.classList.remove("overflow-hidden");
  }

  _adjustMenuPosition() {
    const button = this.element.querySelector("button");
    const buttonRect = button.getBoundingClientRect();
    const menu = this.menuTarget;

    // Temporarily show menu to measure height and width
    menu.style.visibility = "hidden";
    menu.style.display = "block";
    const menuHeight = menu.offsetHeight || 200;
    const menuWidth = menu.offsetWidth || 200;
    menu.style.removeProperty("display");
    menu.style.removeProperty("visibility");

    this._flipMenuVerticalPosition(buttonRect, menuHeight);
    this._flipMenuHorizontalPosition(buttonRect, menuWidth);
  }

  _flipMenuVerticalPosition(buttonRect, menuHeight) {
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      this.menuTarget.classList.add("dropdown-menu--top");
    } else {
      this.menuTarget.classList.remove("dropdown-menu--top");
    }
  }

  _flipMenuHorizontalPosition(buttonRect, menuWidth) {
    const spaceRight = window.innerWidth - buttonRect.left;
    const spaceLeft = buttonRect.right;

    // Remove both alignment classes first
    this.menuTarget.classList.remove(
      "dropdown-menu--align-right",
      "dropdown-menu--align-left",
    );

    if (spaceRight < menuWidth && spaceLeft > spaceRight) {
      this.menuTarget.classList.add("dropdown-menu--align-right");
    } else {
      this.menuTarget.classList.add("dropdown-menu--align-left");
    }
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
