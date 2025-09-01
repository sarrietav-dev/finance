import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["sidebar", "main"];
  static classes = ["collapsed", "collapsedMain"];
  static values = { collapsed: Boolean };

  connect() {
    const stored = localStorage.getItem("menuCollapsed");
    
    // Only change state if localStorage differs from current HTML state
    const shouldBeCollapsed = stored === "true";
    const isCurrentlyCollapsed = this.collapsedValue;
    
    // Sync cookie with localStorage for server-side rendering
    if (stored !== null) {
      document.cookie = `menu_collapsed=${stored}; path=/; max-age=31536000`;
    }
    
    if (shouldBeCollapsed !== isCurrentlyCollapsed) {
      this.collapsedValue = shouldBeCollapsed;
      this.applyMenuState();
    }
  }

  toggle() {
    this.collapsedValue = !this.collapsedValue;
    localStorage.setItem("menuCollapsed", this.collapsedValue);
    
    // Set cookie for server-side rendering
    document.cookie = `menu_collapsed=${this.collapsedValue}; path=/; max-age=31536000`;
    
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
