import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Viewing Work");
    }

    async getHtml() {
        $('#app').attr('class', 'work');
        console.log(this.postId);
        return `/static/views/works/${this.postId}.html`;
    }
}