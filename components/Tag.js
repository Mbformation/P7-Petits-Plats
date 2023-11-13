class Tag {
  constructor(item) {
    this.item = item;
  }
  render() {
    const tagEl = document.createElement("div");
    tagEl.textContent = `${this.item}`;
    tagEl.classList.add("tag");
    return tagEl;
  }

  appendTotal() {}
}

export default Tag;
