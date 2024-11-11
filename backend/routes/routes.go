package routes

import (
	"hacku-friday/controller"

	"github.com/gin-gonic/gin"
)

func DefineRoutes(r gin.IRouter) {

	auth := r.Group("/")
	{
		auth.POST("/signup", controller.CreateUser)
		auth.POST("/login", controller.Login)
		auth.GET("/allusers", controller.GetUsers)
		auth.GET("/user/:id", controller.GetUser)
		auth.DELETE("/deleteuser/:id", controller.DeleteUser)
	}

	bucketls := r.Group("/bucketls")
	{
		bucketls.POST("/add", controller.CreateBucket)
		bucketls.DELETE("/delete/:id", controller.DeleteBucket)
		bucketls.PUT("/edit/:id", controller.EditBucket)
		bucketls.GET("/getAll/:id", controller.GetBuckets)
		bucketls.GET("/popAll/:id", controller.DrawAllBucketsAll)
		bucketls.GET("/popAll/all", controller.DrawAllBucketsAll)
		bucketls.GET("/popSelect/:time_id/:user_id", controller.DrawMyBucketSelected)
		bucketls.GET("/popSelect/:time_id/all", controller.DrawAllBucketSelected)

	}

	r.GET("/timeGet/:id", controller.GetTimeCategory)
}
