import { Controller } from "@hotwired/stimulus";
import { get } from "@rails/request.js";

export default class extends Controller {
  static targets = ["menu", "label"];
  static values = { paramName: String, turboFrame: String };

  connect() {
    document.addEventListener("dropdown:opened", this.closeMenuIfOther);
    document.addEventListener("click", this.closeOnOutsideClick);
  }
  disconnect() {
    document.removeEventListener("dropdown:opened", this.closeMenuIfOther);
    document.removeEventListener("click", this.closeOnOutsideClick);
  }

  toggle(event) {
    event.stopPropagation();
    const isOpening = this.menuTarget.classList.contains("opacity-0");
    if (isOpening) {
      document.dispatchEvent(
        new CustomEvent("dropdown:opened", { detail: { dropdown: this } }),
      );
    }
    this.menuTarget.classList.toggle("opacity-0");
    this.menuTarget.classList.toggle("pointer-events-none");
    if (isOpening) setTimeout(() => this.adjustPosition(), 10);
  }

  adjustPosition() {
    const menu = this.menuTarget;
    menu.style.right =
      menu.style.left =
      menu.style.top =
      menu.style.bottom =
        "";
    menu.style.marginBottom = "";

    const rect = menu.getBoundingClientRect();
    const padding = 8;

    if (rect.right > window.innerWidth - padding) {
      menu.style.left = "auto";
      menu.style.right = "0";
    }
    if (rect.bottom > window.innerHeight - padding) {
      menu.style.top = "auto";
      menu.style.bottom = "100%";
      menu.style.marginBottom = "8px";
    }
  }

  closeMenuIfOther = (event) => {
    if (event.detail.dropdown !== this) {
      this.menuTarget.classList.add("opacity-0", "pointer-events-none");
    }
  };

  select(event) {
    event.preventDefault();
    const value = event.currentTarget.dataset.value;
    const label = event.currentTarget.dataset.label;
    this.labelTarget.textContent = label;

    const url = new URL(window.location.href);
    url.searchParams.set(this.paramNameValue, value);

    get(url.toString(), {
      responseKind: "turbo-stream", // forces Turbo-Frame-style response (partial)
      headers: { "Turbo-Frame": this.turboFrameValue }, // needed for Turbo compatibility
    });

    this.menuTarget.classList.add("opacity-0", "pointer-events-none");
  }

  closeOnOutsideClick = (event) => {
    if (!this.element.contains(event.target)) {
      this.menuTarget.classList.add("opacity-0", "pointer-events-none");
    }
  };
}
