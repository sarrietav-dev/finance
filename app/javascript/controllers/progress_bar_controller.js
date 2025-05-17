import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    theme: String,
    total: Number,
    target: Number,
    mode: String, // "deposit" or "withdrawal"
    totalSavedId: String,
    percentageId: String,
  };

  connect() {
    this.element.style.backgroundColor = this.getThemeColor();
    this.amountInput = document.querySelector('input[name="amount"]');
    this.updateBar();
    if (this.amountInput) {
      this.amountInput.addEventListener("input", this.updateBar.bind(this));
    }
  }

  getThemeColor() {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(
        `--color-${this.themeValue}`,
      ) || this.themeValue
    );
  }

  updateBar() {
    const amount = parseFloat(this.amountInput?.value) || 0;
    let newTotal = this.totalValue;
    if (this.modeValue === "withdrawal") {
      newTotal = Math.max(this.totalValue - amount, 0);
    } else {
      newTotal = this.totalValue + amount;
    }
    const percent = Math.min((newTotal / this.targetValue) * 100, 100);
    this.element.style.width = `${percent}%`;
    this.element.style.backgroundColor = this.getThemeColor();
    this.element.style.opacity = 1;

    // Update the total saved value outside the controller's element
    if (this.hasTotalSavedIdValue) {
      const el = document.getElementById(this.totalSavedIdValue);
      if (el) {
        el.textContent = `$${newTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      }
    }

    // Update the percentage value outside the controller's element
    if (this.hasPercentageIdValue) {
      const el = document.getElementById(this.percentageIdValue);
      if (el) {
        el.textContent = `${percent.toFixed(2)} %`;
      }
    }
  }
}
