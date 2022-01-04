import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Work by Leevi Vahvelainen");
    $("#app").attr('class', 'work');
  }

  async getHtml() {
    return "/static/views/Work.html";
  }
}