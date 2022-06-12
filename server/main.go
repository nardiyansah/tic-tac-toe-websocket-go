package main

import (
	"flag"
	"github.com/gorilla/websocket"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{}

var tiles = []int8{0, 1, 2, 3, 4, 5, 6, 7, 8}

func serverMark(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		if r.Host == "localhost:8080" {
			return true
		}
		log.Println("host :", r.Host)
		return false
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade (error):", err)
		return
	}
	defer conn.Close()

	messageType, bytes, err := conn.ReadMessage()
	if err != nil {
		log.Println("read (error):", err)
		return
	}

	userMark, err := strconv.Atoi(string(bytes))
	if err != nil {
		log.Println("convert (error)", err)
	}

	// remove tiles which has been marked with user
	for i, v := range tiles {
		if v == int8(userMark) {
			tiles = append(tiles[:i], tiles[i+1:]...)
			break
		}
	}

	// pick random element from array tiles
	randomIndex := rand.Intn(len(tiles))
	valueAtRandIndex := strconv.Itoa(int(tiles[randomIndex]))
	tiles = append(tiles[:randomIndex], tiles[randomIndex+1:]...)

	// send server choice
	err = conn.WriteMessage(messageType, []byte(valueAtRandIndex))
	if err != nil {
		log.Println("write (error):", err)
		return
	}

}

func main() {
	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/mark", serverMark)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
