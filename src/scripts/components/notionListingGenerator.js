import Base from "./_base";
export default class NotionListingGenerator extends Base {
  constructor(el) {
    super(el);
    this.log = "Start finoz/notionListingGenerator";
    this.data = {};
    this.api = this.setApi();
    this.init();
  }

  setApi() {
    return `${window.location.origin}:3000/rcp/`;
  }

  async init() {
    this.data = await this.getData();
    this.render();
  }

  async getData() {
    return await fetch(this.api).then((response) => response.json());
  }

  render() {
    this.data.results.forEach((result) => {
      let item = {
        id: result.id,
        title: result.properties.Name.title[0].plain_text,
        created_time: result.created_time,
        tags: result.properties.Tags.multi_select.map((tag) => tag.name),
        notion_url: result.url,
      };
      let mkp = this.buildItem(item);
      this.$el.insertAdjacentHTML("beforeend", mkp);
    });
    this.listenForDetail();
  }

  buildItem(data) {
    let markup = "";
    let itemclass = "item";
    let fields = this.$options.itemfields
      ? this.$options.itemfields.split(",")
      : [];
    markup += `<article data-id="${data.id}"`;
    fields.forEach((field) => {
      if (data[field]) {
        let str = data[field];
        str = str.toString().toLowerCase();
        markup += ` data-${field}="${str}"`;
      }
    });
    markup += ` class="${itemclass}">`;
    markup += `<h2 class="${itemclass}-title">${data.title}</h2>`;
    if (data.tags.length > 0) {
      markup += `<ul class="${itemclass}-tags">`;
      data.tags.forEach((tag) => {
        markup += `<li>${tag}</li>`;
      });
      markup += `</ul>`;
    }
    markup += `<div class="${itemclass}-notion_url"><a href="${data.notion_url}" target="_blank">Notion</a></div>`;
    markup += `</article>`;
    return markup;
  }

  /*  */

  listenForDetail() {
    this.$el.querySelectorAll(".item").forEach((article) => {
      article
        .querySelector(".item-title")
        .addEventListener("click", async (e) => {
          let { headings, content } = await this.getDetailData(
            article.dataset.id
          );
          this.buildHeading(headings);
          this.buildContent(content);
        });
    });
  }

  async getDetailData(id) {
    let api = `${this.api}${id}`;
    return await fetch(api).then((response) => response.json());
  }

  buildHeading(data) {
    console.log(data);
  }

  buildContent(data) {
    console.log(data);
  }
}
