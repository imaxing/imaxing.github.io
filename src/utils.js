export function copyText(content) {
  if (!content) return;

  let eleTextarea = document.querySelector("#tempTextarea");
  if (!eleTextarea && !navigator.clipboard) {
    eleTextarea = document.createElement("textarea");
    eleTextarea.style.width = 0;
    eleTextarea.style.position = "fixed";
    eleTextarea.style.left = "-999px";
    eleTextarea.style.top = "10px";
    document.body.appendChild(eleTextarea);
  }

  const funCopy = function (text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      eleTextarea.value = text;
      eleTextarea.select();
      document.execCommand("copy", true);
    }
  };

  funCopy(content);
}

export class WaterMask {
  constructor(props) {
    props && this.init(props);
  }

  init(options) {
    const canvas = document.createElement("canvas");
    const styleNode = document.createElement("style");
    const headNode = document.querySelector("head");

    canvas.width = 250;
    canvas.height = 80;
    styleNode.setAttribute("type", "text/css");

    document.body.appendChild(canvas);
    const context = canvas.getContext("2d");
    context.font = "15px Arial";
    context.textAlign = "center";
    context.rotate((-15 * Math.PI) / 180);
    context.fillText(options.name, canvas.width / 2, canvas.height);

    styleNode.innerHTML = `
      body.wm::after {
        position: fixed;
        content: '';
        left: -50px;
        top: -50px;
        width: 150vw;
        height: 100vh;
        transform: scale(1);
        opacity: 0.1;
        z-index: 99999999999999999;
        pointer-events: none;
        background: url(${canvas.toDataURL()}) repeat;
      }
    `;
    headNode.appendChild(styleNode);
    document.body.removeChild(canvas);
    document.body.classList.add("wm");
  }

  destroy() {
    document.body.classList.remove("wm");
  }
  toggle() {
    document.body.classList.toggle("wm");
  }
}
