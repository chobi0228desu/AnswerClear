package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "log"
    "answer_clear/backend/models"
    "answer_clear/backend/routes"
)

func main() {
    // データベース接続の初期化
    dataSourceName := "root:root@tcp(mysql:3306)/mydb"
    if err := models.InitDB(dataSourceName); err != nil {
        log.Fatalf("failed to connect to database: %v", err)
    }

    router := gin.Default()
    router.Use(cors.Default())

    routes.SetupRoutes(router)
    router.Run() // デフォルトで ":8080" で起動
}
