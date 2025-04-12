import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["sidebar", "main"];
  static classes = ["collapsed", "collapsedMain"];
  static values = { collapsed: Boolean };

  toggle() {
    console.log(this.collapsedClasses.join(" "));
    if (this.collapsedValue) {
      this.sidebarTarget.classList.add(...this.collapsedClasses);
      this.mainTarget.classList.add(...this.collapsedMainClasses);
    } else {
      this.sidebarTarget.classList.remove(...this.collapsedClasses);
      this.mainTarget.classList.remove(...this.collapsedMainClasses);
    }

    this.collapsedValue = !this.collapsedValue;
  }
}
