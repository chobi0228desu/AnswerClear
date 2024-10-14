// backend/main.go
package main

import (
    "github.com/gin-gonic/gin"
    "answer_clear/backend/routes"
)

func main() {
    router := gin.Default()
    routes.SetupRoutes(router)
    router.Run() // デフォルトで ":8080" で起動
}
