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
