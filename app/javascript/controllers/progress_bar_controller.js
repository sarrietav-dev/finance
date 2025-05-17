import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { width: Number };

  connect() {
    this.element.style.width = "0%";

    setTimeout(() => {
      this.element.style.width = `${this.widthValue}%`;
    }, 100);
  }
}
