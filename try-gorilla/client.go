package main

import (
	"flag"
	"github.com/gorilla/websocket"
	"log"
	"net/url"
	"os"
	"os/signal"
	"time"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

func main() {
	flag.Parse()
	log.SetFlags(0)

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	u := url.URL{Scheme: "ws", Host: *addr, Path: "/echo"}
	log.Printf("connecting to %s", u.String())

	dial, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer dial.Close()

	done := make(chan struct{})

	go func() {
		defer close(done)
		for {
			_, bytes, err := dial.ReadMessage()
			if err != nil {
				log.Println("read: ", err)
				return
			}
			log.Printf("receive: %s", bytes)
		}
	}()

	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-done:
			return
		case t := <-ticker.C:
			err := dial.WriteMessage(websocket.TextMessage, []byte(t.String()))
			if err != nil {
				log.Println("write", err)
				return
			}
		case <-interrupt:
			log.Println("interrupt")
			err := dial.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("write close:", err)
				return
			}
			select {
			case <-done:
			case <-time.After(time.Second):
			}
			return
		}
	}
}
