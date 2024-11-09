package models

type TimeCategories struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	CategoryName string `gorm:"size:255;not null" json:"category_name"`
}
