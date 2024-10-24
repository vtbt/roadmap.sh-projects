let acc = document.getElementsByClassName('accordion');
let i;
let j;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.nextElementSibling.style.maxHeight = null;
      this.classList.remove('active');
      return;
    }
    for (j = 0; j < acc.length; j++) {
      const nextElementSibling = acc[j].nextElementSibling;
      if (j !== i) {
        nextElementSibling.style.maxHeight = null;
        acc[j].classList.remove('active');
      }
    }

    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}
