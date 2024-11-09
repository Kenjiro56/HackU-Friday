package controller

import (
	// "HackU-Friday/db"
	// "HackU-Friday/models"
	// "HackU-Friday/utils"
	// "net/http"

	"github.com/gin-gonic/gin"
)

func CreateBucket(c *gin.Context) { //バケットの作成
	// リクエストボディの構造体を定義
	var requestBody struct {
		UserID      int    `json:"user_id"`
		BucketTitle string `json:"bucket_title"`
		TimeID      int    `json:"time_id"`
		LoopFlag    bool   `json:"loop_flag"`
		Description string `json:"description"`
	}

	// リクエストボディをバインド
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	// レスポンス用のダミーデータを作成
	response := gin.H{
		"id":           2, // ダミーID
		"user_id":      2, // ダミーのuser_id
		"bucket_title": "Second Object",
		"time_id":      false, // ダミーデータでbool値に変更
		"loop_flag":    requestBody.LoopFlag,
		"description":  requestBody.Description,
		"created_at":   "2024-10-29T06:11:04.528971Z", // ダミーのタイムスタンプ
		"updated_at":   "2024-10-29T06:11:04.528971Z", // ダミーのタイムスタンプ
	}

	// JSON形式でデータを返す
	c.JSON(200, response)
}

func DeleteBucket(c *gin.Context) { //バケットの削除
	bucket := gin.H{
		"message": "Bucket deleted",
	}

	c.JSON(200, bucket)
}

func EditBucket(c *gin.Context) { //バケットの編集
	var requestBody struct {
		UserID      int    `json:"user_id"`
		BucketTitle string `json:"bucket_title"`
		TimeID      int    `json:"time_id"`
		LoopFlag    bool   `json:"loop_flag"`
		Description string `json:"description"`
	}

	// リクエストボディをバインド
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	// 更新後のデータを含むダミーレスポンスを作成
	response := gin.H{
		"id":           2, // 固定ID
		"bucket_title": requestBody.BucketTitle,
		"time_id":      requestBody.TimeID,
		"loop_flag":    requestBody.LoopFlag,
		"description":  requestBody.Description,
		"created_at":   "2024-10-29T06:11:04.528971Z", // ダミーの作成日時
		"updated_at":   "2024-10-29T06:11:04.528971Z", // ダミーの更新日時
	}

	// JSON形式でレスポンスを返す
	c.JSON(200, response)

}

func GetBuckets(c *gin.Context) { //全バケットの取得
	buckets := []gin.H{
		{
			"id":           2,
			"user_id":      2,
			"bucket_title": "Second Object",
			"time_id":      false,
			"loop_flag":    true,
			"created_at":   "2024-10-29T06:11:04.528971Z",
			"updated_at":   "2024-10-29T06:11:04.528971Z",
		},
		{
			"id":           3,
			"user_id":      2,
			"bucket_title": "3 Object",
			"time_id":      false,
			"loop_flag":    true,
			"created_at":   "2024-10-29T06:11:04.528971Z",
			"updated_at":   "2024-10-29T06:11:04.528971Z",
		},
		{
			"id":           4,
			"user_id":      2,
			"bucket_title": "4 Object",
			"time_id":      false,
			"loop_flag":    true,
			"created_at":   "2024-10-29T06:11:04.528971Z",
			"updated_at":   "2024-10-29T06:11:04.528971Z",
		},
	}

	// JSON形式でダミーデータを返す
	c.JSON(200, buckets)
}

func DrawMyBucketsAll(c *gin.Context) { //自分のバケットリスト全てからランダムに1つ取得
	bucket := gin.H{
		"id":           2,
		"bucket_title": "DrawMyBucketsAll",
		"time_id":      1,
		"loop_flag":    true,
		"created_at":   "2024-10-29T06:11:04.528971Z",
		"updated_at":   "2024-10-29T06:11:04.528971Z",
	}

	c.JSON(200, bucket)
}

func DrawAllBucketsAll(c *gin.Context) { //全バケットリスト全てからランダムに1つ取得
	bucket := gin.H{
		"id":           2,
		"bucket_title": "DrawAllBucketsAll",
		"time_id":      1,
		"loop_flag":    false,
		"created_at":   "2024-10-29T06:11:04.528971Z",
		"updated_at":   "2024-10-29T06:11:04.528971Z",
	}

	c.JSON(200, bucket)
}

func DrawMyBucketSelected(c *gin.Context) { //自分のバケットリストから時間指定したバケットを取得
	bucket := gin.H{
		"id":           2,
		"bucket_title": "DrawMuBucketSelectedObject",
		"time_id":      1,
		"loop_flag":    true,
		"created_at":   "2024-10-29T06:11:04.528971Z",
		"updated_at":   "2024-10-29T06:11:04.528971Z",
	}

	c.JSON(200, bucket)
}

func DrawAllBucketSelected(c *gin.Context) { //全バケットリストから時間指定したバケットを取得
	bucket := gin.H{
		"id":           2,
		"bucket_title": "DrawAllBucketSelected Object",
		"time_id":      1,
		"loop_flag":    true,
		"created_at":   "2024-10-29T06:11:04.528971Z",
		"updated_at":   "2024-10-29T06:11:04.528971Z",
	}

	c.JSON(200, bucket)
}
