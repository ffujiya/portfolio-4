const container = document.querySelector('.slider-container');

const slide = (container) => {
    const upBtn = document.querySelector('.up-btn');
    const downBtn = document.querySelector('.down-btn');
    const rightSlide = document.querySelector('.right-slide');
    const leftSlide = document.querySelector('.left-slide');

    let slideCount = rightSlide.querySelectorAll('div').length;

    const firstRightSlide = rightSlide.getElementsByClassName('right-slide__item')[0];
    const lastRightSlide = rightSlide.getElementsByClassName('right-slide__item')[slideCount - 1];
    const firstLeftSlide = leftSlide.getElementsByClassName('left-slide__item')[0];
    const lastLeftSlide = leftSlide.getElementsByClassName('left-slide__item')[slideCount - 1];

    const firstRightClone = firstRightSlide.cloneNode(true);
    const lastRightClone = lastRightSlide.cloneNode(true);
    const firstLeftClone = firstLeftSlide.cloneNode(true);
    const lastLeftClone = lastLeftSlide.cloneNode(true);

    firstRightSlide.before(lastRightClone);
    lastRightSlide.after(firstRightClone);
    firstLeftSlide.before(lastLeftClone);
    lastLeftSlide.after(firstLeftClone);

    let slideIndex = 0;
    let allowTransition = true;

    leftSlide.style.top = `-${(slideCount) * 100}vh`;
    rightSlide.style.top = `-100vh`;
    let slideHeight = container.offsetHeight;

    rightSlide.classList.add('transition');
    leftSlide.classList.add('transition');


    function move() {
        rightSlide.style.transform = `translateY(${-slideHeight * slideIndex}px)`;
        leftSlide.style.transform = `translateY(${slideHeight * slideIndex}px)`;
    }

    function shiftSlide(direction, action) {

        leftSlide.classList.add('transition');
        rightSlide.classList.add('transition');

        if (allowTransition) {
            if (direction === 'down') {
                slideIndex++;
                if (slideIndex > slideCount) {
                    slideIndex = 0;
                    allowTransition = false;
                }
                move();
            } else if (direction === 'up') {
                slideIndex--;
                if (slideIndex < -1) {
                    slideIndex = slideCount - 1;
                    allowTransition = false;
                    
                }
                move();
            }
        }
         allowTransition = false;
    };


    function checkIndex() {
        rightSlide.classList.remove('transition');
        leftSlide.classList.remove('transition');

        if (slideIndex == -1) {
            slideIndex = slideCount - 1;
            move();
        }
        if (slideIndex == slideCount) {
            slideIndex = 0;
            move();
        }
        allowTransition = true;
    }

    function wheelMove(event){
        event.preventDefault();
        if(event.deltaY > 0){
            shiftSlide('up');
        }else{
            shiftSlide('down');``
        }
    }

    container.addEventListener('wheel', wheelMove);
    leftSlide.addEventListener('transitionend', checkIndex);
    upBtn.addEventListener('click', () => shiftSlide('up'));
    downBtn.addEventListener('click', () => shiftSlide('down'));
}

slide(container);
console.log('1. Повторить исходный проект  -  10 баллов');
console.log('2. Обязательный дополнительный фукционал: бесконечный слайдер  -  10 баллов');
console.log('3. Дополнительный фукционал на выбор: пролистывание слайдера колёсиком мышки  -  10 баллов');  
console.log('Всего  -  30 баллов')


