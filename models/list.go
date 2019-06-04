package models

func GetItemList(tableName string) []string {
	// kindsNum, shopKindsMaps := ShowValues("goods_kind")
	var ItemKind []string
	// for _, kindsMap := range shopKindsMaps {
	// 	data["kind"] = kindsMap["Name"]
	// }
	_, ItemMaps := ShowValues(tableName)
	for _, Item := range ItemMaps {
		ItemKind = append(ItemKind, Item["Name"].(string))
	}
	return ItemKind
}

// func GetDrList() {
// 	madeinNum, shopMadeinMaps := ShowValues("province")
// 	for _, madeinMap := range shopMadeinMaps {
// 		fmt.Println(madeinMap["Name"])
// 	}
// 	petNum, shopPetMaps := ShowValues("pet_speci")
// 	for _, petMap := range shopPetMaps {
// 		fmt.Println(petMap["Name"])
// 	}
// }
