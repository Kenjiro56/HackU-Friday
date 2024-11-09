package models

import "time"

type Bucket struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	UserID      uint      `gorm:"not null" json:"user_id"`
	BucketTitle string    `gorm:"size:255;not null" json:"bucket_title"`
	TimeID      uint      `gorm:"not null" json:"time_id"`
	LoopFlag    bool      `gorm:"not null;default:false" json:"loop_flag"` //true = 繰り返す
	Description string    `gorm:"size:255;not null" json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
