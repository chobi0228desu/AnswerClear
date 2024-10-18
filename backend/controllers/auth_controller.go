package controllers

import (
    "github.com/gin-gonic/gin"
)
func PostSignup(c *gin.Context) {
    c.JSON(200, gin.H{
        "page": "signup",
    })
    c.JSON(200, gin.H{
        "page": "login",
    })
}

func PostLogin(c *gin.Context) {
    c.JSON(200, gin.H{
        "page": "signup",
    })
    c.JSON(200, gin.H{
        "page": "login",
    })
}