import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Leevi Vahvelainen Portfolio");
  }
  
  async getHtml() {
    $("#app").attr('class', 'dashboard');
    return "/static/views/Dashboard.html";
  }
}