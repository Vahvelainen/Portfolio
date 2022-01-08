import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Work by Leevi Vahvelainen');
  }
  
  async getHtml() {
    $('#app').attr('class', 'work');
    return '/static/views/Work.html';
  }
}