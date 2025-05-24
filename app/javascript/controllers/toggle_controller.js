import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = ["toggleable"]
  
  connect() {
    this.hide()
  }
  
  toggle() { 
    this.toggleableTarget.classList.toggle("hidden")
  }
  
  hide() {
    this.toggleableTarget.classList.add("hidden")
  }
  
  show() {
    this.toggleableTarget.classList.remove("hidden")
  }
}
