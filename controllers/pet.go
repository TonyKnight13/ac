package controllers

import (
	. "actest/models"
	"encoding/json"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
)

type AddPetController struct {
	BaseController
}

func (ap *AddPetController) Get() {
	if !ap.isLogin {
		ap.Redirect("/login", 302)
		return
	}
	var vmaps map[string]interface{}
	vmaps = make(map[string]interface{})

	_, speciMap := ShowValues("PetSpeci")
	_, variMap := ShowValues("PetVari")

	vmaps["speci"] = speciMap
	vmaps["vari"] = variMap

	jsons, errs := json.Marshal(vmaps)
	if errs != nil {
	}

	ap.Data["json"] = string(jsons)
	ap.Data["specis"] = speciMap
	// ap.ServeJSON()

	ap.TplName = "addpet.html"
}

func (ap *AddPetController) Post() {
	if !ap.isLogin {
		ap.Redirect("/login", 302)
		return
	}
	user := new(User)
	var err error
	account := ap.GetSession("account")
	if accountstr, ok := account.(string); ok {
		err, user = GetUserByAccount(accountstr)
		if err != nil {
			beego.Error(err)
		}
	}

	userid := user.Id

	speci := ap.GetString("speci")
	variety := ap.GetString("variety")
	sexstr := ap.GetString("sex")
	name := ap.GetString("name")
	intro := ap.GetString("intro")
	// birthString := ap.Input().Get("birth")
	birthString := ap.GetString("birth")
	partnerstr := ap.GetString("partner")

	sex, _ := strconv.ParseBool(sexstr)
	partner, _ := strconv.ParseBool(partnerstr)

	f, h, err := ap.GetFile("imgFile")
	defer f.Close()
	if err != nil {
		ap.Data["jsonErr"] = map[string]interface{}{"error": 1, "message": err}
	}
	dir, filename := UploadFile(h)
	fileURL := dir + "/" + filename
	ap.SaveToFile("imgFile", fileURL)
	ap.Data["jsonErr2"] = map[string]interface{}{"error": 0, "url": strings.Replace(dir, ".", "", 1) + "/" + filename}

	birthString += " 00:00:00"
	birth, err1 := time.Parse("2006-01-02 15:04:05", birthString)

	if err1 != nil {
		beego.Error(err1)
	}

	var newpetimg PetImg
	var newpet Pet
	newpetimg.ImgURL = fileURL
	newpetimg.Cover = true

	newpet.Sex = sex
	newpet.Variety = variety
	newpet.Speci = speci
	newpet.Partner = partner
	newpet.Intro = intro
	newpet.Birth = birth
	newpet.Name = name

	err2 := AddPetInfo(newpet, newpetimg, userid)
	if err2 != nil {
		// ap.Ctx.Redirect(302, "/login")
	}

	ap.Ctx.Redirect(302, "/")
}
