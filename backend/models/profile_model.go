package models

import (
  "fmt"
)

type Profile struct {
    ProfileID    int    `json:"profile_id"`
    UserID       int    `json:"user_id"`
    Introduction string `json:"introduction"`
    IconImg      string `json:"icon_img"`
    CatchPhrase  string `json:"catch_phrase"`
    CreatedAt    string `json:"created_at"`
    UpdatedAt    string `json:"updated_at"`
}

func CreateProfile(profile *Profile) error {
    profileQuery := `INSERT INTO profile (user_id, introduction, icon_img, catch_phrase) VALUES (?, ?, ?, ?)`
    _, err := db.Exec(profileQuery, profile.UserID, profile.Introduction, profile.IconImg, profile.CatchPhrase)
    if err != nil {
        return fmt.Errorf("failed to create profile: %w", err)
    }

    return nil
}