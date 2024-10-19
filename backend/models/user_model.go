package models

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

type User struct {
    UserID    int    `json:"user_id"`
    Name      string `json:"name"`
    Mail      string `json:"mail"`
    Password  string `json:"password"`
    AdminFlg  int    `json:"admin_flg"`
    CreatedAt string `json:"created_at"`
    UpdatedAt string `json:"updated_at"`
}

type Profile struct {
    ProfileID   int    `json:"profile_id"`
    UserID      int    `json:"user_id"`
    Introduction string `json:"introduction"`
    IconImg      string `json:"icon_img"`
    CatchPhrase  string `json:"catch_phrase"`
    CreatedAt    string `json:"created_at"`
    UpdatedAt    string `json:"updated_at"`
}

var db *sql.DB

func InitDB(dataSourceName string) error {
    var err error
    db, err = sql.Open("mysql", dataSourceName)
    if err != nil {
        return err
    }

    if err := db.Ping(); err != nil {
        return err
    }
    return nil
}

func CreateUser(user *User, profile *Profile) error {
    query := `INSERT INTO user (name, mail, password, admin_flg) VALUES (?, ?, ?, ?)`
    result, err := db.Exec(query, user.Name, user.Mail, user.Password, user.AdminFlg)
    if err != nil {
        return fmt.Errorf("failed to create user: %w", err)
    }

    userID, err := result.LastInsertId()
    if err != nil {
        return fmt.Errorf("failed to get last insert id: %w", err)
    }

    profile.UserID = int(userID)
    profileQuery := `INSERT INTO profile (user_id, introduction, icon_img, catch_phrase) VALUES (?, ?, ?, ?)`
    _, err = db.Exec(profileQuery, profile.UserID, profile.Introduction, profile.IconImg, profile.CatchPhrase)
    if err != nil {
        return fmt.Errorf("failed to create profile: %w", err)
    }

    return nil
}
