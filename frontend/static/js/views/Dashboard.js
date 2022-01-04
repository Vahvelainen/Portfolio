import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Leevi Vahvelainen Portfolio");
    $("#app").attr('class', 'dashboard');
  }

  async getHtml() {
    return "/static/views/Dashboard.html";
  }
}