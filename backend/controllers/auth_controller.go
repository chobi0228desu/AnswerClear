package controllers

import (
    "github.com/gin-gonic/gin"
    "answer_clear/backend/models"
)

func PostSignup(c *gin.Context) {
    var user models.User
    var profile models.Profile

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(400, gin.H{"error": "Invalid input"})
        return
    }

    // ユーザーを作成し、UserIDを取得
    userID, err := models.CreateUser(&user)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    // プロフィールを作成するためにUserIDを設定
    profile.UserID = int(userID)
    if err := models.CreateProfile(&profile); err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(200, gin.H{"message": "User and profile created successfully!"})
}
func PostLogin(c *gin.Context) {
    c.JSON(200, gin.H{
        "page": "login",
    })
}