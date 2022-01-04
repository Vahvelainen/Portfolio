import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Past life of Leevi Vahvelainen");
    $("#app").attr('class', 'history');
  }

  async getHtml() {
    return "/static/views/History.html";
  }
}