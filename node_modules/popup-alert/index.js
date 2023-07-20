class Alert {
  constructor(e) {
    this.validateValue(e);
  }
  validateValue(e) {
    let {
      text: t = "this is test text",
      textColor: l = "#f1f1f1",
      bgColor: a = "#474E68",
      buttonText: r = "OK",
      buttonTextColor: s = "#f1f1f1",
      buttonBgColor: i = "#6a73a1",
    } = e;
    this.makeElement(t, l, a, r, s, i);
  }
  makeElement(e, t, l, a, r, s) {
    let i = ` <div id="alert" class="hide">
        <div class="alert-box">
            <h4 class="alert-text">${e}</h4>
            <button class="alert-button">${a}</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", i);
    let o = document.querySelector(".alert-box"),
      d = document.querySelector(".alert-text"),
      c = document.querySelector(".alert-button");
    (o.style.backgroundColor = l),
      (d.style.color = t),
      (c.style.color = r),
      (c.style.backgroundColor = s),
      c.addEventListener("click", () => {
        this.hide();
      });
  }
  show(e = { enabled: !1, time: 1e3 }) {
    let t = document.querySelector("#alert");
    t.classList.remove("hide"), e.enabled && setTimeout(this.hide, e.time);
  }
  hide() {
    let e = document.querySelector("#alert");
    e.classList.add("hide");
  }
}
