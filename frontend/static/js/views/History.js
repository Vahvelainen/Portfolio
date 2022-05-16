import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Past life of Leevi Vahvelainen');
  }
  
  async getHtml() {
    $('#app').attr('class', 'history');
    return '/static/views/History.html';
  }
}