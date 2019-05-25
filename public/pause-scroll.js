let keepScrolling = true;
let scrolldelay;

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

document.body.addEventListener('keypress', (event)=>{

    console.log(event.key);

    if(event.key != "Enter")
    {
        return;
    }
    

    keepScrolling = keepScrolling ? false : true;

    if(keepScrolling)
    {
        pageScroll();
    }
    else{
        clearTimeout(scrolldelay);
    }
}, true); 

