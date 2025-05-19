import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal", "backdrop"];

  connect() {
    requestAnimationFrame(() => {
      this.modalTarget.classList.add("modal-enter-active");
      this.backdropTarget.classList.add("backdrop-enter-active");
    });

    // Listen for the custom event to close the modal
    this.closeListener = () => this.close();
    document.addEventListener("modal:close", this.closeListener);
  }

  disconnect() {
    document.removeEventListener("modal:close", this.closeListener);
  }

  close() {
    // Animate out
    this.modalTarget.classList.remove("modal-enter-active");
    this.modalTarget.classList.add("modal-leave-active");
    this.backdropTarget.classList.remove("backdrop-enter-active");
    this.backdropTarget.classList.add("backdrop-leave-active");

    // Wait for animation to finish, then remove modal
    setTimeout(() => {
      const frame = this.element.closest("turbo-frame");
      if (frame) frame.innerHTML = "";
    }, 200); // Match your CSS transition duration
  }

  closeEsc(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
