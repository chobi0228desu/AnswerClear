package controllers

import (
    "github.com/gin-gonic/gin"
)
func GetTop(c *gin.Context) {
    c.JSON(200, gin.H{
        "page": "top",
    })
}