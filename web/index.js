window.addEventListener('DOMContentLoaded', () => {
  const userMark = (tile, index) => {
    tile.innerText = 'X';

    websocket = new WebSocket("ws://localhost:8080/mark")

    websocket.onopen = function (event) {
      websocket.send(index);
    }

    websocket.onmessage = function (event) {
      idxServerMark = event.data;
      console.log("websocket: server choices tile number ", idxServerMark)
      tiles[idxServerMark].innerText = 'O'
    }
  }

  const tiles = Array.from(document.querySelectorAll('.tile'));

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userMark(tile, index));
  })
})


