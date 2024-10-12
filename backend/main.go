// backend/main.go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "Hello from Gin!"})
    })
    r.Run() // デフォルトで ":8080" で起動
}
