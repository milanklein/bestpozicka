let interval = 200
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

if (document.getElementById('ReviewsWrapper')) {
    const flavoursContainer = document.getElementById('ReviewsWrapper');
    const flavoursScrollWidth = flavoursContainer.scrollWidth;

    window.addEventListener('load', () => {

        function reviewTimer() {
            // clearInterval(interval)
            interval = self.setInterval(() => {
                const first = document.querySelector('#ReviewsWrapper div');

                if (!isElementInViewport(first)) {
                    flavoursContainer.appendChild(first);
                    flavoursContainer.scrollTo(flavoursContainer.scrollLeft - first.offsetWidth, 0);
                }
                if (flavoursContainer.scrollLeft !== flavoursScrollWidth) {
                    flavoursContainer.scrollTo(flavoursContainer.scrollLeft + 1, 0);
                }
            }, 10);
        }

        flavoursContainer.addEventListener("mouseleave", function (event) {
            function reviewTimer() {
                clearInterval(interval)
                interval = self.setInterval(() => {
                    const first = document.querySelector('#ReviewsWrapper div');

                    if (!isElementInViewport(first)) {
                        flavoursContainer.appendChild(first);
                        flavoursContainer.scrollTo(flavoursContainer.scrollLeft - first.offsetWidth, 0);
                    }
                    if (flavoursContainer.scrollLeft !== flavoursScrollWidth) {
                        flavoursContainer.scrollTo(flavoursContainer.scrollLeft + 1, 0);
                    }
                }, 10);
            }

            reviewTimer()
        }, false);
        flavoursContainer.addEventListener("mouseover", function (event) {
            function reviewTimer() {
                clearInterval(interval)
                interval = self.setInterval(() => {
                    const first = document.querySelector('#ReviewsWrapper div');

                    if (!isElementInViewport(first)) {
                        flavoursContainer.appendChild(first);
                        flavoursContainer.scrollTo(flavoursContainer.scrollLeft - first.offsetWidth, 0);
                    }
                    if (flavoursContainer.scrollLeft !== flavoursScrollWidth) {
                        flavoursContainer.scrollTo(flavoursContainer.scrollLeft + 1, 0);
                    }
                }, 10000000);
            }

            reviewTimer()
        }, false);

        reviewTimer()

    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.right > 0;
    }
}