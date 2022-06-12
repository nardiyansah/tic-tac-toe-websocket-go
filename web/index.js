window.addEventListener('DOMContentLoaded', () => {
  const checkWinner = (tiles) => {
    if (
      tiles[0].innerText === 'X' &&
      tiles[1].innerText === 'X' &&
      tiles[2].innerText === 'X'
      ) {
      if (tiles[0].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[3].innerText === 'X' &&
      tiles[4].innerText === 'X' &&
      tiles[5].innerText === 'X' 
      ) {
      if (tiles[3].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[6].innerText === 'X' &&
      tiles[7].innerText === 'X' &&
      tiles[8].innerText === 'X'
      ) {
      if (tiles[6].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[0].innerText === 'X' &&
      tiles[3].innerText === 'X' &&
      tiles[6].innerText === 'X' 
      ) {
      if (tiles[0].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[1].innerText === 'X' &&
      tiles[4].innerText === 'X' &&
      tiles[7].innerText === 'X'
      ) {
      if (tiles[1].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[2].innerText === 'X' &&
      tiles[5].innerText === 'X' &&
      tiles[8].innerText === 'X'
      ) {
      if (tiles[2].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
     tiles[0].innerText === 'X' &&
     tiles[4].innerText === 'X' &&
     tiles[8].innerText === 'X') {
      if (tiles[0].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }

    if (
      tiles[2].innerText === 'X' &&
      tiles[4].innerText === 'X' &&
      tiles[6].innerText === 'X'
      ) {
      if (tiles[2].innerText === 'X') {
        alert('User win');
      } else {
        alert('Com win');
      }
    }
  }
  
  const userMark = (tile, index) => {
    tile.innerText = 'X';

    // check winner
    checkWinner(tiles)

    websocket = new WebSocket("ws://localhost:8080/mark")

    websocket.onopen = function (event) {
      websocket.send(index);
    }

    websocket.onmessage = function (event) {
      idxServerMark = event.data;
      console.log("websocket: server choices tile number ", idxServerMark)
      tiles[idxServerMark].innerText = 'O'

      // check winner
      checkWinner(tiles)
    }
  }

  const tiles = Array.from(document.querySelectorAll('.tile'));

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userMark(tile, index));
  })
})


