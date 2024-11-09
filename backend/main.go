package main

import (
	"HackU-Friday/routes"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	routes.DefineRoutes(router)
	for _, route := range router.Routes() {
		fmt.Printf("Method: %s, Path: %s\n", route.Method, route.Path)
	}

	router.Run(":8080")
}
