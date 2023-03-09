package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	database "github.com/Itsjose.s/gqlgen-todos/Database"
	"github.com/Itsjose.s/gqlgen-todos/graph"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

const defaultPort = "8080"

// func MyCors(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Access-Control-Allow-Origin", "*")
// 		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
// 		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 		w.Header().Set("content-type", "application/json;charset=UTF-8")
// 		if r.Method == "OPTIONS" {
// 			w.WriteHeader(http.StatusNoContent)
// 			return
// 		}
// 		next.ServeHTTP(w, r)
// 	})
// }

// func test(w http.ResponseWriter, r *http.Request) {
// 	db := database.GetDB()
// 	var tes []*model.Genre

// 	var err = db.Model(&tes).Select()
// 	if err != nil {
// 		fmt.Println("asd")
// 	} else {
// 		json.NewEncoder(w).Encode(&tes)
// 	}
// }

// func CreateUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	// db := database.GetDB()
// 	// var tes []*model.Genre
// 	params := mux.Vars(r)
// 	fmt.Println("test")
// 	// tes.first_name = params["first_name"]
// 	fmt.Println(params["first_name"])
// 	// var err = db.Model(&tes).Select()
// 	// if err != nil {
// 	// 	fmt.Println("asd")
// 	// } else {
// 	// 	json.NewEncoder(w).Encode(&tes)
// 	// }
// }

func main() {
	// corsOpts := cors.Options{
	// 	AllowedOrigins: []string{"*"},
	// 	AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// }

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	db := database.GetDB()
	database.MigrateSeed()
	router := mux.NewRouter()
	// handlerCors := cors.New(corsOpts).Handler(router)
	// router.Use(MyCors)
	router.Use(cors.New(cors.Options{
		AllowedOrigins:     []string{"http://localhost:3000"},
		AllowCredentials:   true,
		AllowedMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:     []string{"Content-Type", "Bearer", "Bearer ", "content-type", "Origin", "Accept", "Authorization"},
		AllowOriginFunc:    func(origin string) bool { return true },
		OptionsPassthrough: true,
		Debug:              true,
	}).Handler)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))

	// db := database.GetDB()
	// database.CreateSchema(db)
	// r := mux.NewRouter()
	// handler := cors.New(corsOpts).Handler(r)
	// // r.Use(MyCors)
	// r.HandleFunc("/Test", test)
	// r.HandleFunc("/CreateUser", CreateUser).Methods("POST")
	// log.Fatal(http.ListenAndServe(":8080", handler))

}
