package controller

import (
	"hacku-friday/db"
	"hacku-friday/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

func DrawMyBucketsAll(c *gin.Context) { //自分のバケットリスト全てからランダムに1つ取得
	var buckets []models.Bucket
	// URL パラメータから UserID を取得してパースする
	userIDParam := c.Param("id")
	userID, err := strconv.ParseUint(userIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// ランダムに 1 つの Bucket レコードを取得するクエリを実行
	if err := db.DB.Order("RANDOM()").Where("user_id = ?", userID).First(&buckets).Error; err != nil {
		// レコードが見つからない場合のエラーハンドリング
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No matching bucket found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	c.JSON(200, buckets)
}

func DrawAllBucketsAll(c *gin.Context) { //全バケットリスト全てからランダムに1つ取得
	var buckets []models.Bucket

	// ランダムに 1 つの Bucket レコードを取得するクエリを実行
	if err := db.DB.Order("RANDOM()").First(&buckets).Error; err != nil {
		// レコードが見つからない場合のエラーハンドリング
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No matching bucket found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	c.JSON(200, buckets)
}

func DrawMyTimeBuckets(c *gin.Context) {
	var buckets []models.Bucket

	userIDParam := c.Param("user_id")
	userID, err := strconv.ParseUint(userIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	timeIDParam := c.Param("time_id")
	timeID, err := strconv.ParseUint(timeIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid time ID"})
		return
	}

	if err := db.DB.Where("user_id = ? AND time_id = ?", userID, timeID).Find(&buckets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	c.JSON(http.StatusOK, buckets)
}

func DrawTimeBuckets(c *gin.Context) { //全バケットリストから時間指定したバケットを取得
	var buckets []models.Bucket

	timeIDParam := c.Param("time_id")
	timeID, err := strconv.ParseUint(timeIDParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid time ID"})
		return
	}

	if err := db.DB.Where("time_id = ?", timeID).Find(&buckets).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	c.JSON(200, buckets)
}

type UpdateBucketInput struct {
	BucketTitle *string `json:"bucket_title"`
	TimeID      *uint   `json:"time_id"`
	LoopFlag    *bool   `json:"loop_flag"`
	Description *string `json:"description"`
}

func EditBucket(c *gin.Context) { // バケットの編集
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	// URLパラメータで指定されたIDのBucketを取得
	var bucket models.Bucket
	if err := db.DB.First(&bucket, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bucket not found"})
		return
	}

	// リクエストボディから更新データを取得
	var input UpdateBucketInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// フィールドごとに存在するかどうかを確認し、存在する場合のみ更新
	if input.BucketTitle != nil {
		bucket.BucketTitle = *input.BucketTitle
	}
	if input.TimeID != nil {
		bucket.TimeID = *input.TimeID
	}
	if input.LoopFlag != nil {
		bucket.LoopFlag = *input.LoopFlag
	}
	if input.Description != nil {
		bucket.Description = *input.Description
	}

	// UpdatedAt フィールドを現在の時間に更新
	bucket.UpdatedAt = time.Now()

	// データベースに保存
	if err := db.DB.Save(&bucket).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update bucket"})
		return
	}

	c.JSON(http.StatusOK, bucket)
}
