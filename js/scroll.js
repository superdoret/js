const scrollBtn = document.querySelector('.scrollToTop');

const refreshBtn = () => {

    if (document.documentElement.scrollTop <= 50){
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block";
    }
};

refreshBtn();
scrollBtn.addEventListener("click",() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop=0; 
});

document.addEventListener("scroll", (e) => {
    refreshBtn();
});