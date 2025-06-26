package main

import (
	"encoding/json"
	"flag"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/brianvoe/gofakeit/v5"
	"github.com/gorilla/websocket"
)

var (
	addr     = flag.String("addr", "localhost:8080", "http service address")
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

type message struct {
	ID           string
	CreatedAt    time.Time
	UpdatedAt    time.Time
	Title        string
	Attachments  []string
	Contributors []user
	Version      string
}

type user struct {
	ID   string
	Name string
}

type document struct {
	ID           string
	CreatedAt    time.Time
	UpdatedAt    time.Time
	Title        string
	Attachments  []string
	Contributors []user
	Version      string
}

func generateDocument() document {
	var attachments []string
	for j := 0; j <= 1+rand.Intn(4); j++ {
		attachments = append(attachments, gofakeit.BeerStyle())
	}

	var contributors []user
	for j := 0; j <= 1+rand.Intn(4); j++ {
		contributors = append(contributors, user{
			ID:   gofakeit.UUID(),
			Name: gofakeit.Name(),
		})
	}

	return document{
		ID:           gofakeit.UUID(),
		CreatedAt:    gofakeit.Date(),
		UpdatedAt:    gofakeit.Date(),
		Title:        gofakeit.BeerName(),
		Attachments:  attachments,
		Contributors: contributors,
		Version:      gofakeit.AppVersion(),
	}
}

func generateMessage() *message {
	doc := generateDocument()
	return &message{
		ID:           doc.ID,
		CreatedAt:    doc.CreatedAt,
		UpdatedAt:    doc.UpdatedAt,
		Title:        doc.Title,
		Attachments:  doc.Attachments,
		Contributors: doc.Contributors,
		Version:      doc.Version,
	}
}

func notifications(w http.ResponseWriter, r *http.Request) {
	addHeaders(w)
	if r.Method == "OPTIONS" {
		return
	}
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("write:", err)
		return
	}
	defer c.Close()

	for {
		msg := generateMessage()

		err = c.WriteJSON(msg)
		if err != nil {
			log.Println("write:", err)
			break
		}

		time.Sleep(time.Duration(rand.Intn(5)) * time.Second)
	}
}

func api(w http.ResponseWriter, r *http.Request) {
	addHeaders(w)
	if r.Method == "OPTIONS" {
		return
	}

	var documents []document

	for i := 0; i <= 1+rand.Intn(20); i++ {
		documents = append(documents, generateDocument())
	}

	enc := json.NewEncoder(w)
	enc.Encode(documents)
}

func addHeaders(w http.ResponseWriter) {
	w.Header().Add("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	seed := time.Now().UnixNano()
	rand.Seed(seed)
	gofakeit.Seed(seed)

	flag.Parse()
	http.HandleFunc("/notifications", notifications)
	http.HandleFunc("/documents", api)

	log.Fatal(http.ListenAndServe(*addr, nil))
}
