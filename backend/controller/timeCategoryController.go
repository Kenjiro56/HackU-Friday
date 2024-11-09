package controller

import (
	// "HackU-Friday/db"
	// "HackU-Friday/models"
	// "HackU-Friday/utils"
	// "net/http"

	"github.com/gin-gonic/gin"
)

func GetTimeCategory(c *gin.Context) { //時間カテゴリの取得
	// レスポンス用のダミーデータを作成
	response := gin.H{
		"id":            2, // ダミーID
		"categori_name": "1日",
	}

	// JSON形式でデータを返す
	c.JSON(200, response)
}
