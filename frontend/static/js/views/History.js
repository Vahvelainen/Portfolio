import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Past life of Leevi Vahvelainen");
  }

  async getHtml() {
    return "/static/views/History.html";
  }
}