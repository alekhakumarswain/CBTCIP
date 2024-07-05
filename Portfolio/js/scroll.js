let lastScrollTop = 0;

        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let home = document.getElementById("home");

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                document.body.classList.add("scroll-down");
            } else {
                // Scrolling up
                document.body.classList.remove("scroll-down");
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);