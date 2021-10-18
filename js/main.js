(
  function(){
    const timeboardOptions = document.querySelector(".timeboard__person__options") 
    const timeboardCardsMap = new Map([
      ['work', document.querySelector(".timeboard__card.card-work")], 
      ['play', document.querySelector(".timeboard__card.card-play")],
      ['study', document.querySelector(".timeboard__card.card-study")],
      ['exercise', document.querySelector(".timeboard__card.card-exercise")],
      ['social', document.querySelector(".timeboard__card.card-social")],
      ['selfcare', document.querySelector(".timeboard__card.card-selfcare")],
    ])
    
    for(let i of timeboardCardsMap){
      if(i[1] === undefined || i[1] === null){
        throw new Error("Elemento do timeboard com erro de referência no JS!")
      }
    }
    if(timeboardOptions !== null && timeboardOptions !== undefined){
      timeboardOptions.addEventListener('click', loadData)
    }

    async function loadData(event){
      const eventTarget = event.target
      if(eventTarget.name === "time"){
        toggleClassActive(eventTarget)
        const filter = eventTarget.value
        const data = await fetch("data.json")
        const dataJson = await data.json()
        for(let {title, timeframes} of dataJson){
          setDataOnCard(filter, title.replace(' ','').toLowerCase(), timeframes[filter])
        }
      }
    }

    function toggleClassActive(eventTarget){
      const li = eventTarget.parentNode
      for(let element of timeboardOptions.children){
        element.classList.remove('active')
      }
      li.classList.add('active')
    }
    function setDataOnCard(filter, title, timeframe){
      const card = timeboardCardsMap.get(title)
      let previousText = ""
      if(filter === "daily")
        previousText = "Yesterday - "
      else if(filter === "weekly")
        previousText = "Last Week - "
      else
        previousText = "Last Month - "
      
      card.querySelector('.hours-input').textContent = timeframe['current']
      card.querySelector('.previous-input').textContent = `${previousText}${timeframe['previous']}`
    }

  }
)()