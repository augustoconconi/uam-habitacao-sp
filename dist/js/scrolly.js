(function () {

	let containers = document.querySelectorAll('.scrolly-container');

	for (let container of containers) {

		if (!container.classList.contains('loaded')) {

			container.classList.add('loaded')

			let carousel = container.querySelector('.swiper-container')

			let scrolly = {

				instance: scrollama(),

				container: container,
				graphic: container.querySelector('.scrolly-graphic'),
				stepsContainer: container.querySelector('.scrolly-steps-container'),
				steps: container.querySelectorAll('.scrolly-step-img'),

				swiper: new Swiper(carousel, {
					effect: 'fade',
					autoHeight: true,
					touchRatio: 0,
				}),

				handle: {

					resize: function () {

						let height = window.innerHeight

						let stepH = Math.floor(height * 1)

						for (let step of scrolly.steps) {
							step.style.height = stepH + 'px'
						}

						// let slide = container.querySelector('.swiper-slide-active iframe')
						let slide = container.querySelector('.swiper-slide-active img')
						let figureHeight = slide.offsetHeight

						let figureMarginTop = 0 + 'px'

						scrolly.graphic.style.height = 100 + 'vh'
						scrolly.graphic.style.top = 0 + 'px'

						scrolly.instance.resize()

					},

					stepEnter: function (response) {

						for (let index = 0; index < scrolly.steps.length; index++) {

							let step = scrolly.steps[index]

							if (index === response.index)
								step.classList.add('is-active')
							else
								step.classList.remove('is-active')

						}

						let graphic = response.element.dataset.graphic - 1

						scrolly.swiper.slideTo(graphic)

					}

				},

				initialize: function () {

					let offset = 0.5

					if (scrolly.container.dataset.offset)
						offset = scrolly.container.dataset.offset

					Stickyfill.add(container.querySelectorAll('.sticky'))

					scrolly.handle.resize()

					scrolly.instance.setup({
						offset: offset,
						step: '.scrolly-step-img'
					}).onStepEnter(
						scrolly.handle.stepEnter
					)

					window.addEventListener('resize', scrolly.handle.resize)

					setInterval(function () {

						scrolly.swiper.updateAutoHeight()
						scrolly.handle.resize()

					}, 500)

				}

			}

			scrolly.initialize()


		}


	}



})()