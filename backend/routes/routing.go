// backend/routes/routing.go
package routes

import (
    "github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
    router.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "Hello from Gin!",
        })
    })
    // 他のルートもここに追加できます
}
