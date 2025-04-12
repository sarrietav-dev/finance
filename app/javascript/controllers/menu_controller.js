import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["sidebar", "main"];
  static classes = ["collapsed", "collapsedMain"];
  static values = { collapsed: Boolean };

  connect() {
    const stored = localStorage.getItem("menuCollapsed");

    // Normalize to boolean
    this.collapsedValue = stored === "true";

    this.applyMenuState();
  }

  toggle() {
    this.collapsedValue = !this.collapsedValue;
    localStorage.setItem("menuCollapsed", this.collapsedValue);
    this.applyMenuState();
  }

  applyMenuState() {
    if (this.collapsedValue) {
      this.sidebarTarget.classList.add(...this.collapsedClasses);
      this.mainTarget.classList.add(...this.collapsedMainClasses);
    } else {
      this.sidebarTarget.classList.remove(...this.collapsedClasses);
      this.mainTarget.classList.remove(...this.collapsedMainClasses);
    }
  }
}
