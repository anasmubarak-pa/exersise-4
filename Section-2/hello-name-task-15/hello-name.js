let namespace = document.querySelector('.entered-name')
let ct = Math.floor(Date.now()/1000)
let inputbox = document.querySelector('.ip-box')
let fflg = 1
console.log(inputbox)

document.addEventListener('keydown',function(){
    ct = Math.floor(Date.now()/1000)
    if(fflg)
    {
        setInterval(function(){
            console.log(inputbox.value)
            if(((Date.now()/1000)-ct)>2)
            {
                namespace.innerText = 'Hello ' + inputbox.value
            }
            else
            {
                console.log('Typing...')
            }
        },1000)
        fflg=0
    }
})