package models

import (
	"actest/utils"
	"mime/multipart"
	"os"
	"strconv"
	"strings"
	"time"
)

// @Title UploadFile
// @Description 上传文件(单个)
// @Param imgFile formData file true "上传的文件"
// @Success 200 {string} 上传成功
// @Failture 404 上传失败

func UploadFile(h *multipart.FileHeader) (string, string) {

	// 创建上传路径
	now := time.Now()
	dir := "./static/uploadfile/" + strconv.Itoa(now.Year()) + "/" + strconv.Itoa(int(now.Month())) + "/" + strconv.Itoa(now.Day())
	err1 := os.MkdirAll(dir, 0755)
	var jsons map[interface{}]interface{}
	if err1 != nil {
		jsons["err"] = map[string]interface{}{"error": 1, "message": "目录权限不够"}
	}

	filename := h.Filename
	ext := utils.SubString(filename, strings.LastIndex(filename, "."), 5)
	filename = utils.GetGuid() + ext

	return dir, filename
}
