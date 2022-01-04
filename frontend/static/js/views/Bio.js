import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Story of Leevi Vahvelainen");
    $("#app").attr('class', 'bio');
  }

  async getHtml() {
    return "/static/views/Bio.html";
  }
}