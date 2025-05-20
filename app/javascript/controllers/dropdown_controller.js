import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "hiddenInput"];
  static values = {
    submit: Boolean,
  };

  toggle(event) {
    this.menuTarget.classList.toggle("hidden");
  }

  select(event) {
    const value = event.target.dataset.value;
    if (this.hasHiddenInputTarget) {
      this.hiddenInputTarget.value = value;
    }
    // Optionally update UI here
    this.menuTarget.classList.add("hidden");

    // Conditionally submit the form if data-dropdown-submit is true
    if (this.submitValue) {
      const form = this.element.closest("form");
      console.log('form', form);
      if (form) form.requestSubmit();
    }
  }
}
