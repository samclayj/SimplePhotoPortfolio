document.onclick = closeHeader;

function expandHeader(e) {
    const nav = document.querySelector('.collapsible-nav')

    if (nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
    } else {
        nav.classList.add('expanded');
    }
    e.preventDefault();
    e.stopPropagation();
}

function closeHeader() {
    const nav = document.querySelector('.collapsible-nav')
    if (nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
    }
}


