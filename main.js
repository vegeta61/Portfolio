const navItems = document.querySelectorAll(".nav-item");
const typeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

typeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];
  if(this.isDeleting) {
    //remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  console.log(fullTxt);

  this.txtElement.innerHTML = '<span class="txt">' + this.txt + '</span>';
  //Type Speed
  let typeSpeed = 200;
  if(this.isDeleting) {
    typeSpeed /= 2;
  } 
  if(!this.isDeleting && this.txt === fullTxt) {
    //Pause
    typeSpeed = this.wait;
    //start deleting
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    //next word
    this.wordIndex += 1;
    typeSpeed = 300;
  }
  setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new typeWriter(txtElement, words, wait);
}