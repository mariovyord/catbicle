document.querySelector('#cats').addEventListener('click', (e) => {
	if (e.target.classList.contains('more')) {
		const btn = e.target;
		const desc = e.target.parentElement.querySelector('.description');
		if (desc.style.display === 'block') {
			desc.style.display = 'none';
			btn.textContent = 'Show more'
		} else {
			desc.style.display = 'block';
			btn.textContent = 'Hide'
		}
	}
})