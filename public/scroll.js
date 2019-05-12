const pageScroll = () => {
    
    // console.log(`Current scroll from the top: ${window.pageYOffset}`)

    if(window.pageYOffset + window.innerHeight >= scrollHeight)
    {
        window.scrollTo(0, 0); 
        // console.log(`hit the end page y ${window.pageYOffset} window inner y ${window.innerHeight}`);
    }
    else{
        window.scrollBy(0,1);
    }

    scrolldelay = setTimeout(pageScroll,30);
}

let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

// console.log(`Scroll height is ${scrollHeight}`);



pageScroll();