const potterySection = document.querySelector('#pottery-section')
const form = document.querySelector('form')
const plotlySection = document.querySelector('#plotly-section')

const loadPottryIndex = async () => {
    try {

        const response = await fetch('http://localhost:3000/ceramics/')
        const data = await response.json()
        console.log(data)

        data.map(i => {
            const article = document.createElement('article')
            const subHeader = document.createElement('p')
            subHeader.classList.add('subheader')
            const clayUsed = document.createElement('p')
            const size = document.createElement('p')
            const style = document.createElement('p')

            subHeader.textContent = i.piece
            clayUsed.textContent = i.clay_used
            size.textContent = i.size
            style.textContent = i.style

            article.appendChild(subHeader)

            article.appendChild(clayUsed)
            article.appendChild(size)
            article.appendChild(style)


            potterySection.appendChild(article)
        })
    } catch (error) {
        console.log(error.message)
    }
}

loadPottryIndex()



const loadPotteryVisualisation = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:3000/ceramics/visual')
        const data = await response.json()
        
        plotlySection.innerHTML = data.html
        console.log(data.html)

        // We need to run the scripts generated from the Python Microservice so we grab all the scripts from the response and execute them by adding them to the body
        const scripts = plotlySection.querySelectorAll('div > script');

      
        scripts.forEach(script => {

            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript);
        });


    } catch (error) {
        console.log(error.message)
    }
}


const date = new Date()


form.addEventListener('submit', loadPotteryVisualisation)