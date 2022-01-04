import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Story of Leevi Vahvelainen");
  }
  
  async getHtml() {
    $("#app").attr('class', 'bio');
    return "/static/views/Bio.html";
  }
}