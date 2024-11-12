package controller

import (
	"hacku-friday/db"
	"hacku-friday/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateBucket(c *gin.Context) { //バケットの作成
	// リクエストボディの構造体を定義
	var requestBody models.Bucket

	// リクエストボディをバインド
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}
	// ここでバインドしたrequestBodyをdbに追加
	if err := db.DB.Create(&requestBody).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	//データをレスポンスとして返す
	c.JSON(http.StatusOK, requestBody)
}

func DeleteBucket(c *gin.Context) { //バケットの削除
	id := c.Param("id")
	if err := db.DB.Delete(&models.Bucket{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Bucket deleted"})
}

func GetUserBuckets(c *gin.Context) { //全バケットの取得(現在ログインしてるuserのみ)
	var buckets []models.Bucket
	userIDParam := c.Param("id")
	//以下のコードでidが存在してるかどうかを確認してる
	userID, err := strconv.ParseUint(userIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	//userIDが一致する全データを取得してきてresponseとして返してる
	if err := db.DB.Where("user_id = ?", userID).Find(&buckets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	// JSON形式でダミーデータを返す
	c.JSON(http.StatusOK, buckets)
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
