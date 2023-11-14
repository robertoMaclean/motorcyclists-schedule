const createBlocks = () => {
	const hours = 12
	const startHour = 8
	const blocks = []
	for(let i = startHour; i <= startHour + hours; i++ ) {
		blocks.push({hour: i.toString() + ':00', locked: false})
		if(i !== startHour + hours) {
			blocks.push({hour: i.toString() + ':30', locked: false})
		}
	}
	return blocks;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const blocksOfTheWeek = weekDays.map(dayName => ({
	day: dayName,
	blocks: createBlocks(),
	motorcyclists: 8 
}));

const selectBlock = (event) => {
	const day = event.target.id.split('-')[0]
	const hour = event.target.id.split('-')[1]
	const blocksOfTheDay = blocksOfTheWeek.find(dayBlocks => dayBlocks.day === day)
	const block = blocksOfTheDay.blocks.find(block => block.hour === hour )
	const motorcycleCountTitle = document.getElementById('subtitle-' + day)
	if(!block.locked) {
		if(blocksOfTheDay.motorcyclists> 0) {
			block.locked = !block.locked
			blocksOfTheDay.motorcyclists--
			motorcycleCountTitle.textContent = 'Motorcyclists: ' + blocksOfTheDay.motorcyclists
			event.target.setAttribute('class', 'row block block-locked')
		} else {
			event.target.setAttribute('class', 'row block block-no-avaible')
		}
	} else if(blocksOfTheDay.motorcyclists<= 8){
			block.locked = !block.locked
			blocksOfTheDay.motorcyclists++
			motorcycleCountTitle.textContent = 'Motorcyclists: ' + blocksOfTheDay.motorcyclists
			event.target.setAttribute('class', 'row block')
	}
}

const container = document.getElementById('scheduling-container')

const createTitle = (titleType, container, text, id) => {
	const title = document.createElement(titleType)
	const textNode = document.createTextNode(text)
	title.setAttribute('id', id)
	title.appendChild(textNode)
	container.appendChild(title)
}

const createDayTitle = (container, title, id) => {
	createTitle('h2', container, title, id)
}

const createMotorcyclistsCountTitle = (container, title, id) => {
	createTitle('h3', container, title, id)
}

for(const blockOfDay of blocksOfTheWeek) {
	const blocksContainer = document.createElement('div')
	blocksContainer.setAttribute('class', 'column')
	blocksContainer.setAttribute('id', blockOfDay.day)
	createDayTitle(blocksContainer, blockOfDay.day, 'title-' + blockOfDay.day)
	createMotorcyclistsCountTitle(blocksContainer,'Motorcyclists: ' + blockOfDay.motorcyclists, 'subtitle-' + blockOfDay.day)
	container.appendChild(blocksContainer)
	for(const block of blockOfDay.blocks) {
		const id = blockOfDay.day + '-' + block.hour
		const blockElement = document.createElement('div')
		blockElement.setAttribute('id', id)
		blockElement.setAttribute('class', 'row block block-unlocked')
		blockElement.addEventListener('click', selectBlock)
		const textNode = document.createTextNode(block.hour)
		blockElement.appendChild(textNode)
		blocksContainer.appendChild(blockElement)
	}
}



