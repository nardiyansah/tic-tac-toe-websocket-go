window.addEventListener('DOMContentLoaded', () => {
  const userMark = (tile, index) => {
    tile.innerText = 'X';
  }

  const tiles = Array.from(document.querySelectorAll('.tile'));

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userMark(tile, index));
  })
})


