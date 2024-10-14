package routes

import (
    "github.com/gin-gonic/gin"
    "answer_clear/backend/controllers"
)

func SetupRoutes(router *gin.Engine) {
    homeGroup := router.Group("/homes")
    {
        homeGroup.GET("/", controllers.GetTop)
    }
}