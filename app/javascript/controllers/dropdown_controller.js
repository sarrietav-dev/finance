import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "hiddenInput", "label"];
  static values = {
    name: String,
    autosubmit: Boolean,
  };

  connect() {
    this._closeOnClickOutside = this._closeOnClickOutside.bind(this);
  }

  toggle(event) {
    // Close all other dropdowns
    document.querySelectorAll("[data-controller='dropdown']").forEach((el) => {
      if (el !== this.element) {
        const menu = el.querySelector("[data-dropdown-target='menu']");
        if (menu) menu.classList.add("hidden");
      }
    });

    this.menuTarget.classList.toggle("hidden");

    if (!this.menuTarget.classList.contains("hidden")) {
      document.addEventListener("mousedown", this._closeOnClickOutside);
    } else {
      document.removeEventListener("mousedown", this._closeOnClickOutside);
    }
  }

  _closeOnClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.menuTarget.classList.add("hidden");
      document.removeEventListener("mousedown", this._closeOnClickOutside);
    }
  }

  select(event) {
    const value = event.target.dataset.value;
    if (this.hasHiddenInputTarget) {
      this.hiddenInputTarget.value = value;
    }

    // Remove font-bold from all options
    this.menuTarget
      .querySelectorAll("button[data-action='dropdown#select']")
      .forEach((btn) => {
        btn.classList.remove("font-bold");
      });

    // Add font-bold to the selected option
    event.target.classList.add("font-bold");

    this.menuTarget.classList.add("hidden");
    document.removeEventListener("mousedown", this._closeOnClickOutside);

    this.labelTarget.textContent = event.target.textContent;

    if (!this.autosubmitValue) return;

    const form = this.element.closest("form");
    if (!form) return;
    form.requestSubmit();
  }
}
