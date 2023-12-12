// hamburger anim

document.getElementById('hamburgerAnim').onclick = function(){
    document.getElementById('hamburgerAnim').classList.toggle('is-active');
};

// HOME VIDEO POPUP
videoPopupExists = document.getElementsByClassName('video-popup')

if (videoPopupExists.length > 0) {

	function videoStart(url) {
		const videoPopup = document.querySelector('.video-popup')
		videoPopup.classList.remove('active')
		videoPopup.innerHTML = '';
		videoPopup.classList.add('active')
		videoPopup.innerHTML = '<div class="video-container"><iframe id="heroVideo" src=' + url + '?autoplay=1&mute=1" title="Ortho keep smiling" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe></div>';
	}

	if (document.querySelector('#videoTriggerCentrala')) {
		const videoTriggerMain = document.querySelector('#videoTriggerCentrala')

		videoTriggerMain.onclick = function () {
			videoStart('https://www.youtube.com/embed/b133BJX2ELk');
		}
	}

	if (document.querySelector('#videoTriggerKontakt')) {
		const videoTriggerKontakt = document.querySelector('#videoTriggerKontakt')

		videoTriggerKontakt.onclick = function () {
			videoStart('https://www.youtube.com/embed/UOOwFFDhLnA');
		}
	}

	const videoPopup = document.querySelector('.video-popup')
	videoPopup.addEventListener("click", function (ev) {
		if (ev.composedPath()[0] === this) {
			videoPopup.classList.remove('active')
			videoPopup.innerHTML = '';
		}
	})
}